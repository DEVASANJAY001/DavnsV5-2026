import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Building2,
  Users,
  Trophy,
  ArrowRight,
  RefreshCw,
  Sparkles,
  Info,
  Calendar,
  ClipboardPaste,
  FileText,
} from "lucide-react"
import {
  detectDayFromFilename,
  prepareUnstopImport,
  commitUnstopImport,
  ImportSummary,
  ImportPreviewItem,
} from "@/lib/unstop-importer"
import {
  collection,
  getDocs,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import {
  calculateScores,
  emptyDayScore,
} from "@/lib/scoreboard-service"
import { getCanonicalCollege } from "@/lib/college-normalizer"
import { toast } from "sonner"

// ─── Paste Text Parser ────────────────────────────────────────────────────────

/**
 * Parses raw copy-pasted text from the Unstop leaderboard page.
 * Expected format per participant block (repeated):
 *   <rank-number>\n<Name>\nvisibility_off\n<Name>\n<College>\nSubmitted|Not Submitted\n<score|-->\n...
 *
 * Returns an array of { name, college, score (or null) } with duplicates removed.
 */
export interface PastedRow {
  name: string
  college: string
  score: number | null
}

export function parsePastedLeaderboard(text: string): PastedRow[] {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  // Lines to skip — UI chrome / icons / known garbage tokens
  const SKIP = new Set([
    "visibility_off",
    "check",
    "do_not_disturb",
    "file_download",
    "markunread",
    "settings",
    "REG",
    "R6",
    "R5",
    "R4",
    "R3",
    "R2",
    "R1",
    "Status",
    "Score",
    "Proctoring",
    "Participants",
    "Action / Status",
  ])

  const isRankLine = (l: string) => /^\d+$/.test(l)
  const isScoreLine = (l: string) => /^\d+(\.\d+)?$/.test(l)
  const isNotSubmittedScore = (l: string) => /^--$/.test(l.trim())
  const isStatusLine = (l: string) =>
    /^(Submitted|Not Submitted)$/i.test(l.trim())
  const isOutOfLine = (l: string) => /^\(Out of \d+\s*\)$/.test(l)
  const isParticipantsHeader = (l: string) => /^\d+\s+Participants$/i.test(l)

  const rows: PastedRow[] = []
  const seenKey = new Set<string>()

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    // Skip header/garbage
    if (
      SKIP.has(line) ||
      isOutOfLine(line) ||
      isParticipantsHeader(line)
    ) {
      i++
      continue
    }

    // Detect rank number — start of a participant block
    if (isRankLine(line)) {
      i++ // skip rank

      // Collect subsequent non-rank, non-skip lines until next rank
      const block: string[] = []
      while (i < lines.length && !isRankLine(lines[i])) {
        const bl = lines[i]
        if (!SKIP.has(bl) && !isOutOfLine(bl) && !isParticipantsHeader(bl)) {
          block.push(bl)
        }
        i++
      }

      // Parse the block:
      // block[0] = Name
      // block[1] = Name again (repeated) → skip
      // block[2] = College
      // block[3] = Status (Submitted / Not Submitted)
      // block[4] = Score or "--"
      if (block.length < 3) continue

      const name = block[0].trim()
      // block[1] is the repeated name — skip it
      const college = block.length >= 3 ? block[2].trim() : block[1].trim()

      // Find score: look for a float/int or "--" after status
      let score: number | null = null
      for (let bi = 3; bi < block.length; bi++) {
        if (isNotSubmittedScore(block[bi])) {
          score = null
          break
        }
        if (isScoreLine(block[bi])) {
          score = parseFloat(block[bi])
          break
        }
      }

      if (!name || !college) continue

      // Deduplicate by lowercase name + college
      const key = `${name.toLowerCase()}|${college.toLowerCase()}`
      if (seenKey.has(key)) continue
      seenKey.add(key)

      rows.push({ name, college, score })
      continue
    }

    i++
  }

  return rows
}

/**
 * Convert parsed paste rows into an ImportSummary by resolving against Firestore.
 */
async function preparePasteImport(
  rows: PastedRow[],
  targetDay: 1 | 2 | 3 | 4 | 5 | 6
): Promise<ImportSummary> {
  if (rows.length === 0) throw new Error("No valid participants found in pasted text.")

  // Fetch existing Firestore data
  const pSnap = await getDocs(collection(db, "perspective_participants"))
  const existingParticipants = pSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))

  const cSnap = await getDocs(collection(db, "perspective_colleges"))
  const existingColleges = cSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))

  const normalizeC = (s: string) =>
    s.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim()

  const nameToParticipant = new Map<string, any>()
  existingParticipants.forEach((p) => {
    nameToParticipant.set(p.name.toLowerCase().trim(), p)
  })

  const collegeNameToId = new Map<string, string>()
  existingColleges.forEach((c) => {
    collegeNameToId.set(normalizeC(c.name), c.id)
  })

  const previewItems: ImportPreviewItem[] = []
  const newCollegesSet = new Set<string>()
  const allCollegesSet = new Set<string>()
  let newPCount = 0
  let existingPCount = 0

  const dayKey = `day${targetDay}` as const
  const blank = emptyDayScore()

  for (const row of rows) {
    const { name, college: collegeRaw, score } = row

    const canonical = getCanonicalCollege(collegeRaw)
    const collegeClean = canonical.canonicalName
    const normC = normalizeC(collegeClean)

    allCollegesSet.add(collegeClean)
    let collegeId = collegeNameToId.get(normC) || ""
    let isNewCollege = false
    if (!collegeId) {
      isNewCollege = true
      newCollegesSet.add(collegeClean)
      collegeId = `new_college_${normC}`
    }

    const existingP = nameToParticipant.get(name.toLowerCase().trim())
    const isNew = !existingP
    isNew ? newPCount++ : existingPCount++

    // Convert Unstop display score → internal day score.
    // Unstop awards 10 points per correct answer (max 300 for 30 Qs).
    // So: correct = round(score / 10), clamped to [0, 30].
    // timeSecs is unknown from paste; use 1800s (30 min) as neutral default.
    const correct = score !== null ? Math.min(30, Math.max(0, Math.round(score / 10))) : 0
    const dayScore = score !== null
      ? { correct, total: 30, timeSecs: 1800 }
      : { correct: 0, total: 0, timeSecs: 0 }

    const baseParticipant: any = existingP
      ? {
          name: existingP.name || name,
          email: existingP.email || "",
          college: existingP.college || collegeRaw,
          collegeId: existingP.collegeId || collegeId,
          unstopId: existingP.unstopId || "",
          day1: existingP.day1 || { ...blank },
          day2: existingP.day2 || { ...blank },
          day3: existingP.day3 || { ...blank },
          day4: existingP.day4 || { ...blank },
          day5: existingP.day5 || { ...blank },
          day6: existingP.day6 || { ...blank },
          accuracyScore: existingP.accuracyScore || 0,
          consistencyBonus: existingP.consistencyBonus || 0,
          completionScore: existingP.completionScore || 0,
          timeBonus: existingP.timeBonus || 0,
          totalPoints: existingP.totalPoints || 0,
          isVerified: true,
          [dayKey]: dayScore,
        }
      : {
          name,
          email: "",
          college: collegeRaw,
          collegeId,
          unstopId: "",
          day1: { ...blank },
          day2: { ...blank },
          day3: { ...blank },
          day4: { ...blank },
          day5: { ...blank },
          day6: { ...blank },
          accuracyScore: 0,
          consistencyBonus: 0,
          completionScore: 0,
          timeBonus: 0,
          totalPoints: 0,
          isVerified: true,
          [dayKey]: dayScore,
        }

    const calculated = calculateScores(baseParticipant)
    const mergedParticipant = { ...baseParticipant, ...calculated }

    previewItems.push({
      id: existingP?.id,
      isNew,
      registrationId: "",
      name,
      email: existingP?.email || "",
      college: collegeRaw,
      collegeId,
      isNewCollege,
      dayNum: targetDay,
      dayScore,
      mergedParticipant,
    })
  }

  return {
    dayNum: targetDay,
    totalRows: rows.length,
    validRows: previewItems.length,
    newParticipantsCount: newPCount,
    existingParticipantsCount: existingPCount,
    uniqueCollegesCount: allCollegesSet.size,
    newCollegesCount: newCollegesSet.size,
    items: previewItems,
  }
}

interface PerspectiveCsvImportModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  initialTargetDay?: 1 | 2 | 3 | 4 | 5 | 6
  /** When true: registers participants only — no day assignment or scoring */
  participantsOnly?: boolean
}

export function PerspectiveCsvImportModal({
  isOpen,
  onClose,
  onSuccess,
  initialTargetDay,
  participantsOnly = false,
}: PerspectiveCsvImportModalProps) {
  // Input mode: "file" for CSV/Excel upload, "paste" for copy-paste
  const [inputMode, setInputMode] = useState<"file" | "paste">("file")

  const [file, setFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>("")
  const [targetDay, setTargetDay] = useState<1 | 2 | 3 | 4 | 5 | 6>(initialTargetDay || 1)
  const [defaultCorrect, setDefaultCorrect] = useState<number>(24)
  const [defaultTotal, setDefaultTotal] = useState<number>(30)
  const [defaultTimeSecs, setDefaultTimeSecs] = useState<number>(1200)

  const [isParsing, setIsParsing] = useState(false)
  const [summary, setSummary] = useState<ImportSummary | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCommitting, setIsCommitting] = useState(false)
  const [progressStatus, setProgressStatus] = useState("")

  // Update targetDay when initialTargetDay prop changes
  useEffect(() => {
    if (initialTargetDay) {
      setTargetDay(initialTargetDay)
    }
  }, [initialTargetDay, isOpen])

  // Paste mode state
  const [pasteText, setPasteText] = useState("")
  const [parsedPasteRows, setParsedPasteRows] = useState<PastedRow[]>([])
  const [pasteParseError, setPasteParseError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  if (!isOpen) return null

  const handleFileChange = async (selectedFile: File) => {
    setFile(selectedFile)
    const detectedFilenameDay = detectDayFromFilename(selectedFile.name)
    const activeDay = participantsOnly ? 1 : (detectedFilenameDay || targetDay || initialTargetDay || 1)
    setTargetDay(activeDay)

    try {
      setIsParsing(true)
      const text = await selectedFile.text()
      setFileContent(text)

      // In participantsOnly mode: import with zeroed scores (registration only)
      const parsed = participantsOnly
        ? await prepareUnstopImport(text, 1, { correct: 0, total: 0, timeSecs: 0 })
        : await prepareUnstopImport(text, activeDay)
      setSummary(parsed)
      toast.success(`Parsed ${parsed.validRows} participants from ${selectedFile.name}`)
    } catch (err: any) {
      toast.error(err.message || "Failed to parse CSV file.")
      setSummary(null)
    } finally {
      setIsParsing(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const handleDayChange = async (newDay: 1 | 2 | 3 | 4 | 5 | 6) => {
    setTargetDay(newDay)
    if (fileContent) {
      setIsParsing(true)
      try {
        const parsed = await prepareUnstopImport(fileContent, newDay)
        setSummary(parsed)
      } catch (err) {
        // silently ignore
      } finally {
        setIsParsing(false)
      }
    }
  }

  const handleApplyDefaultScore = async () => {
    if (!fileContent) return
    setIsParsing(true)
    try {
      const parsed = await prepareUnstopImport(fileContent, targetDay, {
        correct: defaultCorrect,
        total: defaultTotal,
        timeSecs: defaultTimeSecs,
      })
      setSummary(parsed)
      toast.success(`Applied score defaults to all ${parsed.validRows} candidates.`)
    } catch (err: any) {
      toast.error(err.message || "Failed to update preview.")
    } finally {
      setIsParsing(false)
    }
  }

  const handleConfirmRelease = async () => {
    if (!summary || summary.items.length === 0) return
    setIsCommitting(true)
    try {
      await commitUnstopImport(summary, (status) => setProgressStatus(status))
      toast.success(
        participantsOnly
          ? `Successfully registered ${summary.validRows} participants!`
          : `Successfully released ${summary.validRows} candidate scores to the live leaderboard!`
      )
      onSuccess()
      onClose()
    } catch (err: any) {
      toast.error(err.message || "Failed to import participants.")
    } finally {
      setIsCommitting(false)
      setProgressStatus("")
    }
  }

  // ── Paste Mode Handlers ──

  const handleParsePaste = async () => {
    setPasteParseError(null)
    if (!pasteText.trim()) {
      setPasteParseError("Please paste participant data first.")
      return
    }
    setIsParsing(true)
    try {
      const rows = parsePastedLeaderboard(pasteText)
      if (rows.length === 0) {
        setPasteParseError("Could not detect any participants. Make sure to copy the full leaderboard table from Unstop.")
        setParsedPasteRows([])
        setSummary(null)
      } else {
        // In participantsOnly mode, zero out all scores before building import summary
        const normalizedRows = participantsOnly
          ? rows.map(r => ({ ...r, score: null }))
          : rows
        setParsedPasteRows(normalizedRows)
        const importSummary = await preparePasteImport(normalizedRows, targetDay)
        setSummary(importSummary)
        toast.success(
          participantsOnly
            ? `Parsed ${rows.length} participants \u2014 no scores assigned.`
            : `Parsed ${rows.length} participants (${rows.filter(r => r.score !== null).length} submitted).`
        )
      }
    } catch (err: any) {
      setPasteParseError(err.message || "Failed to parse pasted data.")
      setSummary(null)
    } finally {
      setIsParsing(false)
    }
  }


  const handleClearPaste = () => {
    setPasteText("")
    setParsedPasteRows([])
    setSummary(null)
    setPasteParseError(null)
  }

  const switchMode = (mode: "file" | "paste") => {
    setInputMode(mode)
    // Reset shared state when switching modes
    setSummary(null)
    setFile(null)
    setFileContent("")
    setPasteText("")
    setParsedPasteRows([])
    setPasteParseError(null)
    setSearchQuery("")
  }

  const filteredItems = summary
    ? summary.items.filter((item) => {
        const q = searchQuery.toLowerCase()
        return (
          item.name.toLowerCase().includes(q) ||
          item.college.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.registrationId.toLowerCase().includes(q)
        )
      })
    : []

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fade-in-simple">
      <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-5xl w-full shadow-2xl border border-slate-200 relative max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#7C3AED] text-[10px] font-mono font-bold uppercase mb-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              {participantsOnly ? "PARTICIPANT REGISTRATION" : "UNSTOP PARTICIPANT INGESTION"}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {participantsOnly ? "Register Participants" : "Add Participants & Scores"}
            </h2>
            <p className="text-xs text-slate-500 font-light mt-0.5">
              {participantsOnly
                ? "Upload or paste the Unstop participants list to register them. No scores will be assigned — use the Daily Marks tab for scoring."
                : "Upload a CSV/Excel export from Unstop, or paste the leaderboard data directly. Duplicates are automatically skipped."}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isCommitting}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center gap-1 pt-4 pb-2 shrink-0">
          <button
            onClick={() => switchMode("file")}
            disabled={isCommitting}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              inputMode === "file"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Upload CSV / Excel
          </button>
          <button
            onClick={() => switchMode("paste")}
            disabled={isCommitting}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              inputMode === "paste"
                ? "bg-[#7C3AED] text-white shadow-sm"
                : "bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            Paste Data
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">

          {/* ── FILE UPLOAD MODE ── */}
          {inputMode === "file" && (
            <>
          {/* File Upload Zone */}
          {!summary ? (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-purple-200 hover:border-[#7C3AED] bg-purple-50/40 hover:bg-purple-50/80 rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls,text/csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0])
                  }
                }}
              />
              <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#7C3AED] border border-purple-100">
                {isParsing ? (
                  <RefreshCw className="w-7 h-7 animate-spin" />
                ) : (
                  <Upload className="w-7 h-7" />
                )}
              </div>
              <div>
                <div className="text-base font-bold text-slate-900">
                  {isParsing ? "Parsing Unstop Data..." : "Choose or drag your Unstop CSV export file here"}
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  Supports .csv, .xlsx (e.g. PERSPECTIVE_____Day_1_..._NoFilters.csv)
                </div>
              </div>
            </div>
          ) : (
            /* Uploaded State & Controls */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7C3AED] flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm truncate max-w-[280px] sm:max-w-md">
                      {file?.name}
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      {summary.validRows} candidates parsed • Auto-detected: Day {targetDay}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={() => {
                      setSummary(null)
                      setFile(null)
                      setFileContent("")
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-white text-[11px] font-bold"
                  >
                    Change File
                  </button>
                </div>
              </div>

              {/* Day & Score Settings Strip — hidden in participants-only mode */}
              {!participantsOnly && (
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-800">Assign To Round:</span>
                  <div className="flex items-center gap-1">
                    {([1, 2, 3, 4, 5, 6] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleDayChange(d)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          targetDay === d
                            ? "bg-[#7C3AED] text-white shadow-xs"
                            : "bg-white text-slate-700 hover:bg-purple-100 border border-purple-100"
                        }`}
                      >
                        Day {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="text-slate-600">Apply Batch Score:</span>
                  <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-xl border border-purple-100">
                    <span className="text-slate-400">Correct:</span>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={defaultCorrect}
                      onChange={(e) => setDefaultCorrect(Number(e.target.value) || 0)}
                      className="w-10 text-center font-bold text-slate-900 outline-none"
                    />
                    <span className="text-slate-400">/30</span>
                  </div>
                  <button
                    onClick={handleApplyDefaultScore}
                    className="px-3 py-1 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold cursor-pointer"
                  >
                    Recalculate All
                  </button>
                </div>
              </div>
              )}

              {/* Summary Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                    TOTAL CANDIDATES
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">
                    {summary.validRows}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-purple-600 uppercase">
                    NEW STUDENTS
                  </div>
                  <div className="text-2xl font-extrabold text-purple-600 font-mono mt-0.5">
                    {summary.newParticipantsCount}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-amber-600 uppercase">
                    EXISTING UPDATED
                  </div>
                  <div className="text-2xl font-extrabold text-amber-600 font-mono mt-0.5">
                    {summary.existingParticipantsCount}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase">
                    COLLEGES DETECTED
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-0.5">
                    {summary.uniqueCollegesCount}{" "}
                    <span className="text-xs text-slate-400 font-normal">
                      ({summary.newCollegesCount} new)
                    </span>
                  </div>
                </div>
              </div>

              {/* Search Filter in Preview */}
              <div className="flex items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter preview list..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <span className="text-xs font-mono text-slate-400 shrink-0">
                  Showing {filteredItems.length} of {summary.validRows} candidates
                </span>
              </div>

              {/* Preview Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                  <table className="w-full text-left text-xs min-w-[700px]">
                    <thead className="sticky top-0 bg-slate-100/95 backdrop-blur-sm z-10">
                      <tr className="border-b border-slate-200 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        <th className="py-2.5 px-4 w-10">#</th>
                        <th className="py-2.5 px-4">Candidate</th>
                        <th className="py-2.5 px-4">Institution</th>
                        <th className="py-2.5 px-4">Day {targetDay} Score</th>
                        <th className="py-2.5 px-4">Accuracy</th>
                        <th className="py-2.5 px-4 text-right">Computed Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredItems.map((item, idx) => {
                        const p = item.mergedParticipant
                        return (
                          <tr key={item.registrationId || idx} className="hover:bg-purple-50/30 transition-colors">
                            <td className="py-2 px-4 font-mono text-[11px] text-slate-400">
                              {idx + 1}
                            </td>
                            <td className="py-2 px-4">
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{item.name}</span>
                                {item.isNew ? (
                                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-purple-100 text-[#7C3AED]">
                                    NEW
                                  </span>
                                ) : (
                                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-amber-100 text-amber-800">
                                    MERGE
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                {item.email || item.registrationId}
                              </div>
                            </td>
                            <td className="py-2 px-4">
                              <span className="font-semibold text-slate-700 block truncate max-w-[200px]">
                                {item.college}
                              </span>
                              {item.isNewCollege && (
                                <span className="text-[9px] font-mono text-emerald-600">
                                  + Auto-creates college
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-4 font-mono">
                              <span className="font-bold text-slate-900">{item.dayScore.correct}</span>
                              <span className="text-slate-400 text-[10px]">/30 correct</span>
                            </td>
                            <td className="py-2 px-4 font-mono text-purple-600 font-bold">
                              {p.accuracyScore.toFixed(0)} pts
                            </td>
                            <td className="py-2 px-4 text-right font-extrabold text-emerald-600 font-mono text-sm">
                              {p.totalPoints.toFixed(1)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
            </>
          )}

          {/* ── PASTE MODE ── */}
          {inputMode === "paste" && (
            <div className="space-y-4">

              {/* Instructions */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <strong>How to paste:</strong> Go to the Unstop hackathon participants page, select all the text on screen (Ctrl+A or drag), then copy (Ctrl+C) and paste it below.{" "}
                  {participantsOnly
                    ? "The tool will extract names and colleges \u2014 no scores will be assigned."
                    : "The tool will automatically extract names, colleges, and scores \u2014 and skip duplicates."}
                </div>
              </div>

              {/* Day Selector — hidden in participants-only mode */}
              {!participantsOnly && (
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="font-bold text-slate-700">Assign to Round:</span>
                <div className="flex items-center gap-1">
                  {([1, 2, 3, 4, 5, 6] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setTargetDay(d)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        targetDay === d
                          ? "bg-[#7C3AED] text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-purple-100 border border-slate-200"
                      }`}
                    >
                      Day {d}
                    </button>
                  ))}
                </div>
              </div>
              )}


              {/* Paste Textarea */}
              {!summary ? (
                <div className="space-y-3">
                  <div className="relative">
                    <textarea
                      value={pasteText}
                      onChange={(e) => {
                        setPasteText(e.target.value)
                        setPasteParseError(null)
                      }}
                      placeholder={`Paste the copied Unstop participant list here...\n\nExample:\n191 Participants\n1\nDeva Dharshini S\nvisibility_off\nDeva Dharshini S\nSRM Easwari Engineering College...\nSubmitted\n287.37\n...`}
                      rows={12}
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#7C3AED] text-xs text-slate-900 font-mono outline-none resize-none transition-all placeholder:text-slate-300"
                    />
                    {pasteText && (
                      <button
                        onClick={handleClearPaste}
                        className="absolute top-3 right-3 p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-all cursor-pointer"
                        title="Clear paste area"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {pasteParseError && (
                    <div className="flex items-center gap-2 text-xs text-rose-600 font-mono bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {pasteParseError}
                    </div>
                  )}

                  <button
                    onClick={handleParsePaste}
                    disabled={isParsing || !pasteText.trim()}
                    className="w-full py-3 rounded-2xl bg-[#7C3AED] hover:bg-purple-700 text-white font-mono text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isParsing ? (
                      <><RefreshCw className="w-4 h-4 animate-spin" /><span>Parsing...</span></>
                    ) : (
                      <><ClipboardPaste className="w-4 h-4" /><span>Parse & Preview Participants</span></>
                    )}
                  </button>
                </div>
              ) : (
                /* Paste Preview (reuses same summary UI as file mode) */
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 text-slate-700">
                      <ClipboardPaste className="w-4 h-4 text-[#7C3AED]" />
                      <span><strong className="text-slate-900">{summary.validRows}</strong> participants parsed from pasted text</span>
                      <span className="text-slate-400">• {parsedPasteRows.filter(r => r.score !== null).length} submitted</span>
                    </div>
                    <button
                      onClick={handleClearPaste}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-white text-[11px] font-bold cursor-pointer"
                    >
                      Clear & Re-paste
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ── SHARED PREVIEW (shown when summary exists in paste mode) ── */}
          {inputMode === "paste" && summary && (
            <div className="space-y-4">

              {/* Summary Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">TOTAL</div>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono mt-0.5">{summary.validRows}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-purple-600 uppercase">NEW STUDENTS</div>
                  <div className="text-2xl font-extrabold text-purple-600 font-mono mt-0.5">{summary.newParticipantsCount}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-amber-600 uppercase">EXISTING</div>
                  <div className="text-2xl font-extrabold text-amber-600 font-mono mt-0.5">{summary.existingParticipantsCount}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase">COLLEGES</div>
                  <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-0.5">
                    {summary.uniqueCollegesCount}{" "}
                    <span className="text-xs text-slate-400 font-normal">({summary.newCollegesCount} new)</span>
                  </div>
                </div>
              </div>

              {/* Search Filter */}
              <div className="flex items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter preview list..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#7C3AED]"
                  />
                </div>
                <span className="text-xs font-mono text-slate-400 shrink-0">
                  {filteredItems.length} of {summary.validRows}
                </span>
              </div>

              {/* Preview Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="overflow-x-auto max-h-[280px] overflow-y-auto">
                  <table className="w-full text-left text-xs min-w-[600px]">
                    <thead className="sticky top-0 bg-slate-100/95 backdrop-blur-sm z-10">
                      <tr className="border-b border-slate-200 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                        <th className="py-2.5 px-4 w-10">#</th>
                        <th className="py-2.5 px-4">Candidate</th>
                        <th className="py-2.5 px-4">Institution</th>
                        <th className="py-2.5 px-4">Status</th>
                        <th className="py-2.5 px-4 text-right">Computed Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredItems.map((item, idx) => {
                        const p = item.mergedParticipant
                        return (
                          <tr key={item.registrationId || `paste-${idx}`} className="hover:bg-purple-50/30 transition-colors">
                            <td className="py-2 px-4 font-mono text-[11px] text-slate-400">{idx + 1}</td>
                            <td className="py-2 px-4">
                              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span>{item.name}</span>
                                {item.isNew ? (
                                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-purple-100 text-[#7C3AED]">NEW</span>
                                ) : (
                                  <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-amber-100 text-amber-800">MERGE</span>
                                )}
                              </div>
                              {item.email && (
                                <div className="text-[10px] text-slate-400 font-mono">{item.email}</div>
                              )}
                            </td>
                            <td className="py-2 px-4">
                              <span className="font-semibold text-slate-700 block truncate max-w-[200px]">{item.college}</span>
                              {item.isNewCollege && (
                                <span className="text-[9px] font-mono text-emerald-600">+ Auto-creates college</span>
                              )}
                            </td>
                            <td className="py-2 px-4">
                              {item.dayScore.total > 0 ? (
                                <span className="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">Submitted</span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 text-[10px] font-mono">Not Submitted</span>
                              )}
                            </td>
                            <td className="py-2 px-4 text-right font-extrabold text-emerald-600 font-mono text-sm">
                              {p.totalPoints.toFixed(1)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-mono text-slate-500">
            {isCommitting ? (
              <span className="flex items-center gap-2 text-[#7C3AED] font-bold animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                {progressStatus || "Releasing scores..."}
              </span>
            ) : summary ? (
              <span>
                {participantsOnly
                  ? `Ready to register ${summary.validRows} participants (no scores assigned)`
                  : `Ready to release ${summary.validRows} candidate records to Day ${targetDay}`}
              </span>
            ) : (
              <span>Select an Unstop CSV or Excel export to begin.</span>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              disabled={isCommitting}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 font-mono text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </button>
            {summary && (
              <button
                onClick={handleConfirmRelease}
                disabled={isCommitting || summary.items.length === 0}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-[#FACC15] hover:bg-yellow-400 text-slate-950 font-mono text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isCommitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-950" />
                    <span>{participantsOnly ? "Registering..." : "Releasing..."}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>{participantsOnly ? "Register Participants" : "Confirm & Release to Leaderboard"}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
