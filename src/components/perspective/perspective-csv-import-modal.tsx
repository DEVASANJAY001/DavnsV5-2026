import { useState, useRef } from "react"
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
} from "lucide-react"
import {
  detectDayFromFilename,
  prepareUnstopImport,
  commitUnstopImport,
  ImportSummary,
  ImportPreviewItem,
} from "@/lib/unstop-importer"
import { toast } from "sonner"

interface PerspectiveCsvImportModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  initialTargetDay?: 1 | 2 | 3 | 4 | 5 | 6
}

export function PerspectiveCsvImportModal({
  isOpen,
  onClose,
  onSuccess,
  initialTargetDay,
}: PerspectiveCsvImportModalProps) {
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

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  if (!isOpen) return null

  const handleFileChange = async (selectedFile: File) => {
    setFile(selectedFile)
    const detected = detectDayFromFilename(selectedFile.name)
    setTargetDay(detected)

    try {
      setIsParsing(true)
      const text = await selectedFile.text()
      setFileContent(text)

      const parsed = await prepareUnstopImport(text, detected)
      setSummary(parsed)
      toast.success(`Parsed ${parsed.validRows} candidates from ${selectedFile.name}`)
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
      toast.success(`Successfully released ${summary.validRows} candidate scores to the live leaderboard!`)
      onSuccess()
      onClose()
    } catch (err: any) {
      toast.error(err.message || "Failed to release scores to leaderboard.")
    } finally {
      setIsCommitting(false)
      setProgressStatus("")
    }
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
              UNSTOP EXCEL & CSV INGESTION
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Upload Perspective Candidates & Scores
            </h2>
            <p className="text-xs text-slate-500 font-light mt-0.5">
              Upload Unstop profile exports. Calculations are performed automatically and displayed in the preview below before release.
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
          
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

              {/* Day & Score Settings Strip */}
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
              <span>Ready to release {summary.validRows} candidate records to Day {targetDay}</span>
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
                    <span>Releasing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Confirm & Release to Leaderboard</span>
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
