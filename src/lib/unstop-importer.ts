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

// ─── Time Parser Helpers ───────────────────────────────────────────────────

/**
 * Parse time string into seconds.
 * Handles formats like:
 * - "5m 17s" -> 317
 * - "8m" -> 480
 * - "45s" -> 45
 * - "1h 5m 12s" -> 3912
 * - "05:17" or "01:05:17" -> 317 / 3912
 * - "317" or 317 -> 317
 */
export function parseTimeToSeconds(val: string | number | undefined | null): number {
  if (val === undefined || val === null) return 0
  if (typeof val === "number") return Math.max(0, Math.round(val))
  const s = String(val).trim()
  if (!s || s === "-" || s === "--") return 0

  // If purely numeric
  if (/^\d+(\.\d+)?$/.test(s)) {
    return Math.max(0, Math.round(parseFloat(s)))
  }

  // Check for "Xh Ym Zs", "Xm Ys", "Xm", "Xs", "Xh"
  const hMatch = s.match(/(\d+)\s*h(?:ours?)?/i)
  const mMatch = s.match(/(\d+)\s*m(?:in(?:ute)?s?)?/i)
  const sMatch = s.match(/(\d+)\s*s(?:ec(?:ond)?s?)?/i)

  if (hMatch || mMatch || sMatch) {
    const hours = hMatch ? parseInt(hMatch[1], 10) : 0
    const mins = mMatch ? parseInt(mMatch[1], 10) : 0
    const secs = sMatch ? parseInt(sMatch[1], 10) : 0
    return hours * 3600 + mins * 60 + secs
  }

  // Check for "HH:MM:SS" or "MM:SS"
  const parts = s.split(":").map((p) => parseInt(p, 10))
  if (parts.every((p) => !isNaN(p)) && parts.length >= 2) {
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2]
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1]
    }
  }

  return 0
}

/**
 * Calculate difference in seconds between Start Time and Finish Time strings.
 * e.g. "19:30:00 2nd September 2026" and "19:35:17 2nd September 2026" -> 317
 */
export function parseTimeDifference(startStr: string, finishStr: string): number {
  if (!startStr || !finishStr) return 0

  // Standard Date parse attempt (stripping ordinal suffixes)
  const cleanStart = startStr.replace(/(\d+)(st|nd|rd|th)/gi, "$1")
  const cleanFinish = finishStr.replace(/(\d+)(st|nd|rd|th)/gi, "$1")
  const d1 = Date.parse(cleanStart)
  const d2 = Date.parse(cleanFinish)
  if (!isNaN(d1) && !isNaN(d2) && d2 >= d1) {
    return Math.round((d2 - d1) / 1000)
  }

  // Fallback: extract HH:MM:SS from both strings
  const timeRegex = /(\d{1,2}):(\d{2}):(\d{2})/
  const m1 = startStr.match(timeRegex)
  const m2 = finishStr.match(timeRegex)
  if (m1 && m2) {
    const s1 = parseInt(m1[1], 10) * 3600 + parseInt(m1[2], 10) * 60 + parseInt(m1[3], 10)
    const s2 = parseInt(m2[1], 10) * 3600 + parseInt(m2[2], 10) * 60 + parseInt(m2[3], 10)
    if (s2 >= s1) {
      return s2 - s1
    }
  }

  return 0
}

// ─── Import Logic ────────────────────────────────────────────────────────────

/**
 * Detect Day number (1 to 6) from a filename or text. Returns null if not detected.
 */
export function detectDayFromFilename(filename: string): 1 | 2 | 3 | 4 | 5 | 6 | null {
  const match = filename.match(/day[_\-\s]*([1-6])/i)
  if (match && match[1]) {
    const num = parseInt(match[1], 10)
    if (num >= 1 && num <= 6) return num as 1 | 2 | 3 | 4 | 5 | 6
  }
  return null
}

/**
 * Parse an Unstop CSV file and prepare a preview with calculated scores.
 * Fully supports:
 * - Unstop Assessment Scoresheets (Regn Id, Effective Score out of 300, Best Time "5m 17s", Number of Questions Attempted)
 * - Standard Unstop exports with raw question counts or percentages
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

  const rawHeader = rows[0]
  const header = rawHeader.map((h) => h.toLowerCase().replace(/['"_\s\-()]/g, ""))

  // Helper to match column index by exact match or substring
  const findCol = (...keywords: string[]) => {
    // 1. Exact match first
    for (const kw of keywords) {
      const cleanKw = kw.toLowerCase().replace(/['"_\s\-()]/g, "")
      const exactIdx = header.findIndex((h) => h === cleanKw)
      if (exactIdx !== -1) return exactIdx
    }
    // 2. Substring match
    for (const kw of keywords) {
      const cleanKw = kw.toLowerCase().replace(/['"_\s\-()]/g, "")
      const subIdx = header.findIndex((h) => h.includes(cleanKw))
      if (subIdx !== -1) return subIdx
    }
    return -1
  }

  const regIdIdx = findCol(
    "regnid",
    "registrationid",
    "candidateid",
    "regid",
    "unstopid",
    "userid",
    "regnno",
    "registrationnumber",
    "id"
  )
  const nameIdx = findCol(
    "candidatesname",
    "candidatename",
    "fullname",
    "studentname",
    "participantname",
    "username",
    "name"
  )
  const emailIdx = findCol(
    "candidatesemail",
    "candidateemail",
    "teamleadersemail",
    "emailaddress",
    "useremail",
    "email",
    "mail"
  )
  const collegeIdx = findCol(
    "candidatesorganisation",
    "candidatesorganization",
    "candidateorganisation",
    "candidateorganization",
    "organisation",
    "organization",
    "college",
    "institution",
    "university",
    "institute",
    "school"
  )
  const statusIdx = findCol("status", "attemptstatus", "result", "evaluationstatus")

  // Score column finders
  const effectiveScoreIdx = findCol(
    "effectivescoreoutof300",
    "effectivescore",
    "scoreoutof300",
    "effectivemarks"
  )
  const totalScoreIdx = findCol("totalscore", "totalmarks")
  const percentageScoreIdx = findCol("percentagescore", "percentage", "pctscore")
  const correctAnswersIdx = findCol("correctanswers", "correctquestions", "correctcount", "correct")
  const genericScoreIdx = findCol("score", "marks", "points")

  // Questions count finders
  const attemptedIdx = findCol(
    "numberofquestionsattempted",
    "questionsattempted",
    "attemptedquestions",
    "questionsanswered",
    "attempted"
  )
  const assignedIdx = findCol(
    "numberofquestionsassigned",
    "totalquestions",
    "questionsassigned",
    "assignedquestions",
    "totalassigned",
    "questions",
    "total"
  )

  // Time finders
  const bestTimeIdx = findCol("besttime", "timetaken", "duration", "timesecs", "time")
  const startTimeIdx = findCol("starttime")
  const finishTimeIdx = findCol("finishtime", "endtime", "completiontime")

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

    // 1. Determine assigned questions limit (usually 30)
    let assignedQuestions = 30
    if (assignedIdx !== -1 && row[assignedIdx] && !isNaN(Number(row[assignedIdx]))) {
      const parsedAssigned = Number(row[assignedIdx])
      if (parsedAssigned > 0) assignedQuestions = parsedAssigned
    }

    // 2. Determine questions attempted (DayScore.total, 0-30)
    let total = defaultScores?.total ?? assignedQuestions
    if (!defaultScores && attemptedIdx !== -1 && row[attemptedIdx] && !isNaN(Number(row[attemptedIdx]))) {
      total = Math.min(assignedQuestions, Math.max(0, Number(row[attemptedIdx])))
    }

    // 3. Determine correct answers (DayScore.correct, 0-30)
    let correct = defaultScores?.correct ?? 0
    if (!defaultScores) {
      if (correctAnswersIdx !== -1 && row[correctAnswersIdx] && !isNaN(Number(row[correctAnswersIdx]))) {
        correct = Math.min(assignedQuestions, Math.max(0, Number(row[correctAnswersIdx])))
      } else if (effectiveScoreIdx !== -1 && row[effectiveScoreIdx] && !isNaN(Number(row[effectiveScoreIdx]))) {
        const val = Number(row[effectiveScoreIdx])
        // In Unstop assessment scoresheet: 30 questions * 10 marks = 300 points max
        if (val > assignedQuestions) {
          correct = Math.min(assignedQuestions, Math.max(0, Math.round(val / 10)))
        } else {
          correct = Math.min(assignedQuestions, Math.max(0, Math.round(val)))
        }
      } else if (totalScoreIdx !== -1 && row[totalScoreIdx] && !isNaN(Number(row[totalScoreIdx]))) {
        const val = Number(row[totalScoreIdx])
        if (val > assignedQuestions) {
          correct = Math.min(assignedQuestions, Math.max(0, Math.round(val / 10)))
        } else {
          correct = Math.min(assignedQuestions, Math.max(0, Math.round(val)))
        }
      } else if (percentageScoreIdx !== -1 && row[percentageScoreIdx] && !isNaN(Number(row[percentageScoreIdx]))) {
        const pct = Number(row[percentageScoreIdx])
        correct = Math.min(assignedQuestions, Math.max(0, Math.round((pct / 100) * assignedQuestions)))
      } else if (genericScoreIdx !== -1 && row[genericScoreIdx] && !isNaN(Number(row[genericScoreIdx]))) {
        const val = Number(row[genericScoreIdx])
        if (val > assignedQuestions) {
          correct = Math.min(assignedQuestions, Math.max(0, Math.round(val / 10)))
        } else {
          correct = Math.min(assignedQuestions, Math.max(0, Math.round(val)))
        }
      } else if (status.toLowerCase().includes("completed")) {
        // Fallback default if completed with no score columns
        correct = 24
      }
    }

    // 4. Determine time taken in seconds (DayScore.timeSecs)
    let timeSecs = defaultScores?.timeSecs ?? 1200
    if (!defaultScores) {
      if (bestTimeIdx !== -1 && row[bestTimeIdx]) {
        const parsedTime = parseTimeToSeconds(row[bestTimeIdx])
        if (parsedTime > 0) timeSecs = parsedTime
      } else if (startTimeIdx !== -1 && finishTimeIdx !== -1 && row[startTimeIdx] && row[finishTimeIdx]) {
        const diff = parseTimeDifference(row[startTimeIdx], row[finishTimeIdx])
        if (diff > 0) timeSecs = diff
      }
    }

    // 5. If status is Not Attempted and no custom score was provided
    if (status.toLowerCase().includes("not attempted") && !defaultScores) {
      correct = 0
      total = 0
      timeSecs = 0
    } else if (total === 0 && correct === 0) {
      timeSecs = 0
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
