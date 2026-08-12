import {
  collection,
  doc,
  getDocs,
  writeBatch,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import {
  Participant,
  College,
  DayScore,
  calculateScores,
  emptyDayScore,
  recalculateCollegeScore,
} from "@/lib/scoreboard-service"
import { getCanonicalCollege } from "@/lib/college-normalizer"

// ─── CSV Parser Helper ───────────────────────────────────────────────────────

/**
 * Robust CSV parser that handles quotes, escaped quotes, commas inside fields, and newlines.
 */
export function parseCSV(text: string): string[][] {
  const lines: string[][] = []
  let row: string[] = []
  let inQuotes = false
  let currentField = ""

  // Normalize line endings
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n")

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i]
    const nextChar = normalized[i + 1]

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"'
          i++ // skip next quote
        } else {
          inQuotes = false
        }
      } else {
        currentField += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ",") {
        row.push(currentField.trim())
        currentField = ""
      } else if (char === "\n") {
        row.push(currentField.trim())
        if (row.length > 1 || (row.length === 1 && row[0] !== "")) {
          lines.push(row)
        }
        row = []
        currentField = ""
      } else {
        currentField += char
      }
    }
  }

  if (currentField.length > 0 || row.length > 0) {
    row.push(currentField.trim())
    if (row.length > 1 || (row.length === 1 && row[0] !== "")) {
      lines.push(row)
    }
  }

  return lines
}

// ─── Types for Import ────────────────────────────────────────────────────────

export interface ParsedCandidateRow {
  registrationId: string
  name: string
  email: string
  mobile?: string
  college: string
  course?: string
  status: string
  reportUrl?: string
  // Day score configuration
  dayScore: DayScore
}

export interface ImportPreviewItem {
  id?: string // existing Firestore ID if matched
  isNew: boolean
  registrationId: string
  name: string
  email: string
  college: string
  collegeId: string
  isNewCollege: boolean
  dayNum: 1 | 2 | 3 | 4 | 5 | 6
  dayScore: DayScore
  // Merged participant structure with updated scores
  mergedParticipant: Omit<Participant, "id" | "rank" | "addedAt" | "updatedAt">
}

export interface ImportSummary {
  dayNum: 1 | 2 | 3 | 4 | 5 | 6
  totalRows: number
  validRows: number
  newParticipantsCount: number
  existingParticipantsCount: number
  uniqueCollegesCount: number
  newCollegesCount: number
  items: ImportPreviewItem[]
}

// ─── Import Logic ────────────────────────────────────────────────────────────

/**
 * Detect Day number (1 to 6) from a filename or text
 */
export function detectDayFromFilename(filename: string): 1 | 2 | 3 | 4 | 5 | 6 {
  const match = filename.match(/day[_\-\s]*([1-6])/i)
  if (match && match[1]) {
    const num = parseInt(match[1], 10)
    if (num >= 1 && num <= 6) return num as 1 | 2 | 3 | 4 | 5 | 6
  }
  return 1
}

/**
 * Parse an Unstop CSV file and prepare a preview with calculated scores
 */
export async function prepareUnstopImport(
  csvContent: string,
  targetDay: 1 | 2 | 3 | 4 | 5 | 6,
  defaultScores?: { correct: number; total: number; timeSecs: number }
): Promise<ImportSummary> {
  const rows = parseCSV(csvContent)
  if (rows.length < 2) {
    throw new Error("CSV file does not contain enough data or header row.")
  }

  const header = rows[0].map((h) => h.toLowerCase().replace(/['"_\s]/g, ""))

  // Column index finders
  const findCol = (...keywords: string[]) => {
    return header.findIndex((h) =>
      keywords.some((k) => h.includes(k.toLowerCase().replace(/['"_\s]/g, "")))
    )
  }

  const regIdIdx = findCol("registrationid", "regid", "candidateid", "id")
  const nameIdx = findCol("candidatename", "name", "fullname", "studentname")
  const emailIdx = findCol("candidateemail", "email", "teamleadersemail")
  const collegeIdx = findCol(
    "candidateorganisation",
    "organisation",
    "organization",
    "college",
    "institution",
    "university"
  )
  const mobileIdx = findCol("candidatemobile", "mobile", "phone", "contact")
  const statusIdx = findCol("status", "attemptstatus", "result")
  const scoreIdx = findCol("score", "marks", "correctanswers", "correct")
  const timeIdx = findCol("timetaken", "duration", "timesecs", "time")
  const totalIdx = findCol("totalquestions", "questions", "total")

  if (nameIdx === -1 && emailIdx === -1) {
    throw new Error("Could not find Candidate Name or Email column in the uploaded CSV.")
  }

  // Fetch existing participants and colleges from Firestore for matching
  const pSnap = await getDocs(collection(db, "perspective_participants"))
  const existingParticipants = pSnap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Participant, "id">),
  }))

  const cSnap = await getDocs(collection(db, "perspective_colleges"))
  const existingColleges = cSnap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<College, "id">),
  }))

  // Map for fast matching
  const emailToParticipant = new Map<string, typeof existingParticipants[0]>()
  const regIdToParticipant = new Map<string, typeof existingParticipants[0]>()

  existingParticipants.forEach((p) => {
    if (p.email) emailToParticipant.set(p.email.toLowerCase().trim(), p)
    if (p.unstopId) regIdToParticipant.set(p.unstopId.toLowerCase().trim(), p)
  })

  // Normalize college names
  const normalizeCollege = (cName: string) =>
    cName
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim()

  const collegeNameToId = new Map<string, string>()
  existingColleges.forEach((c) => {
    collegeNameToId.set(normalizeCollege(c.name), c.id)
  })

  const previewItems: ImportPreviewItem[] = []
  const newCollegesSet = new Set<string>()
  const allCollegesSet = new Set<string>()

  let newPCount = 0
  let existingPCount = 0

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row || row.length === 0 || row.every((c) => !c.trim())) continue

    const regId = regIdIdx !== -1 && row[regIdIdx] ? row[regIdIdx].trim() : ""
    const name = nameIdx !== -1 && row[nameIdx] ? row[nameIdx].trim() : "Student"
    const email = emailIdx !== -1 && row[emailIdx] ? row[emailIdx].trim().toLowerCase() : ""
    const collegeRaw =
      collegeIdx !== -1 && row[collegeIdx] && row[collegeIdx].trim() !== "-"
        ? row[collegeIdx].trim()
        : "Independent / Other"
    const status = statusIdx !== -1 && row[statusIdx] ? row[statusIdx].trim() : "Completed"

    // Parse score or use defaults
    let correct = defaultScores?.correct ?? 0
    let total = defaultScores?.total ?? 30
    let timeSecs = defaultScores?.timeSecs ?? 1200

    if (scoreIdx !== -1 && row[scoreIdx] && !isNaN(Number(row[scoreIdx]))) {
      correct = Math.min(30, Math.max(0, Number(row[scoreIdx])))
    }
    if (totalIdx !== -1 && row[totalIdx] && !isNaN(Number(row[totalIdx]))) {
      total = Math.min(30, Math.max(0, Number(row[totalIdx])))
    }
    if (timeIdx !== -1 && row[timeIdx] && !isNaN(Number(row[timeIdx]))) {
      timeSecs = Math.max(0, Number(row[timeIdx]))
    }

    // If status says Not Attempted and no custom score was provided
    if (status.toLowerCase().includes("not attempted") && !defaultScores) {
      correct = 0
      total = 0
      timeSecs = 0
    } else if (status.toLowerCase().includes("completed") && !defaultScores && scoreIdx === -1) {
      // Default placeholder if completed: 24/30
      correct = 24
      total = 30
      timeSecs = 1200
    }

    const dayScore: DayScore = { correct, total, timeSecs }

    // Resolve canonical college name & location
    const canonical = getCanonicalCollege(collegeRaw)
    const collegeClean = canonical.canonicalName
    const normC = normalizeCollege(collegeClean)

    allCollegesSet.add(collegeClean)
    let collegeId = collegeNameToId.get(normC) || ""
    let isNewCollege = false

    if (!collegeId) {
      isNewCollege = true
      newCollegesSet.add(collegeClean)
      // temporary mock ID for preview
      collegeId = `new_college_${normC}`
    }

    // Check if participant already exists in Firestore
    const existingP =
      (email && emailToParticipant.get(email)) ||
      (regId && regIdToParticipant.get(regId.toLowerCase()))

    const isNew = !existingP
    if (isNew) {
      newPCount++
    } else {
      existingPCount++
    }

    // Prepare day scores
    const dayKey = `day${targetDay}` as const
    const blank = emptyDayScore()

    const baseParticipant: Omit<Participant, "id" | "rank" | "addedAt" | "updatedAt"> = existingP
      ? {
          name: existingP.name || name,
          email: existingP.email || email,
          college: existingP.college || collegeRaw,
          collegeId: existingP.collegeId || collegeId,
          unstopId: existingP.unstopId || regId,
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
          email,
          college: collegeRaw,
          collegeId,
          unstopId: regId,
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

    // Calculate updated scores
    const calculated = calculateScores(baseParticipant)
    const mergedParticipant = {
      ...baseParticipant,
      ...calculated,
    }

    previewItems.push({
      id: existingP?.id,
      isNew,
      registrationId: regId,
      name,
      email,
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
    totalRows: rows.length - 1,
    validRows: previewItems.length,
    newParticipantsCount: newPCount,
    existingParticipantsCount: existingPCount,
    uniqueCollegesCount: allCollegesSet.size,
    newCollegesCount: newCollegesSet.size,
    items: previewItems,
  }
}

/**
 * Commit the prepared preview items to Firestore.
 * Handles auto-creation of new colleges, creation/update of participants,
 * and updates college aggregate points.
 */
export async function commitUnstopImport(
  summary: ImportSummary,
  onProgress?: (progressText: string) => void
): Promise<{ success: boolean; importedCount: number }> {
  const { items } = summary
  if (items.length === 0) return { success: true, importedCount: 0 }

  onProgress?.("Creating missing colleges...")

  // 1. First, create any new colleges that don't exist yet
  const cSnap = await getDocs(collection(db, "perspective_colleges"))
  const existingCollegesMap = new Map<string, string>() // normalized name -> doc id

  const normalizeCollege = (cName: string) =>
    cName
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim()

  cSnap.docs.forEach((d) => {
    existingCollegesMap.set(normalizeCollege(d.data().name), d.id)
  })

  // Identify colleges to create
  const collegesToCreate = new Set<string>()
  items.forEach((item) => {
    const norm = normalizeCollege(item.college)
    if (!existingCollegesMap.has(norm)) {
      collegesToCreate.add(item.college)
    }
  })

  // Batch create new colleges
  if (collegesToCreate.size > 0) {
    const collegeBatch = writeBatch(db)
    collegesToCreate.forEach((cName) => {
      const canonical = getCanonicalCollege(cName)
      const newRef = doc(collection(db, "perspective_colleges"))
      existingCollegesMap.set(normalizeCollege(canonical.canonicalName), newRef.id)
      collegeBatch.set(newRef, {
        name: canonical.canonicalName,
        city: canonical.city || "Tamil Nadu",
        state: canonical.state || "India",
        logoUrl: canonical.logoUrl || "",
        totalPoints: 0,
        participantCount: 0,
        rank: 0,
        addedAt: serverTimestamp(),
      })
    })
    await collegeBatch.commit()
  }

  // 2. Commit participants in batches of up to 400 (Firestore limit is 500)
  onProgress?.("Saving participants and computing rankings...")
  const affectedCollegeIds = new Set<string>()
  const BATCH_SIZE = 400

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const chunk = items.slice(i, i + BATCH_SIZE)
    const batch = writeBatch(db)

    chunk.forEach((item) => {
      const realCollegeId = existingCollegesMap.get(normalizeCollege(item.college)) || item.collegeId
      affectedCollegeIds.add(realCollegeId)

      const payload = {
        ...item.mergedParticipant,
        collegeId: realCollegeId,
        updatedAt: serverTimestamp(),
      }

      if (item.id) {
        // Update existing participant
        const pRef = doc(db, "perspective_participants", item.id)
        batch.update(pRef, payload)
      } else {
        // Create new participant
        const pRef = doc(collection(db, "perspective_participants"))
        batch.set(pRef, {
          ...payload,
          rank: 0,
          addedAt: serverTimestamp(),
        })
      }
    })

    await batch.commit()
    onProgress?.(`Saved ${Math.min(i + BATCH_SIZE, items.length)} of ${items.length} participants...`)
  }

  // 3. Recalculate college scores for all affected colleges
  onProgress?.("Updating institution leaderboards...")
  for (const collegeId of affectedCollegeIds) {
    if (collegeId) {
      await recalculateCollegeScore(collegeId)
    }
  }

  onProgress?.("Import completed successfully!")
  return { success: true, importedCount: items.length }
}
