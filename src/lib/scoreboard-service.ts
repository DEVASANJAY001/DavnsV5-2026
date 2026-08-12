import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
  getDoc,
  Timestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DayScore {
  correct: number   // 0–30 correct answers
  total: number     // total questions attempted (0–30)
  timeSecs: number  // time taken in seconds (0–3600 typically)
}

export interface Participant {
  id: string
  name: string
  email: string
  college: string      // display name
  collegeId: string    // Firestore college doc ID
  unstopId?: string    // optional Unstop registration ID

  // Per-day raw scores
  day1: DayScore
  day2: DayScore
  day3: DayScore
  day4: DayScore
  day5: DayScore
  day6: DayScore

  // Computed scores (auto-calculated)
  accuracyScore: number       // max 600
  consistencyBonus: number    // max 300
  completionScore: number     // max 120
  timeBonus: number           // max 30
  totalPoints: number         // sum, max 1050

  rank: number                // overall rank (1-indexed)
  isVerified: boolean
  isHidden?: boolean          // when true, hidden from public leaderboard
  addedAt: Timestamp | null
  updatedAt: Timestamp | null
}

export interface College {
  id: string
  name: string
  city: string
  state: string
  logoUrl: string      // external image URL or empty string
  websiteUrl?: string  // optional institutional website URL
  totalPoints: number  // sum of all students' totalPoints from this college
  participantCount: number
  rank: number
  isHidden?: boolean   // when true, hidden from public directory and scoreboard
  addedAt: Timestamp | null
}

// ─── Scoring Formula ─────────────────────────────────────────────────────────

/**
 * DAVNS Perspective 2026 Scoring Formula
 *
 * Factor 1 — Answer Accuracy (max 600 pts)
 *   Per day: (correct / 30) * 100  → 6 days × 100 = 600
 *
 * Factor 2 — 6-Day Consistency Bonus (max 300 pts)
 *   +50 pts for every day a student attempted ≥1 quiz
 *   Participating all 6 days = +300
 *
 * Factor 3 — Completion Ratio (max 120 pts)
 *   Per day: (attempted / 30) * 20  → 6 days × 20 = 120
 *
 * Factor 4 — Time-Weighted Index (max 30 pts, tie-breaker)
 *   Per day: max(0, 1 - timeSecs/3600) * 5  → 6 days × 5 = 30
 *   Faster correct submissions get a slight bonus
 *
 * Total Max = 600 + 300 + 120 + 30 = 1,050 points
 */
export function calculateScores(p: Omit<Participant, "id" | "accuracyScore" | "consistencyBonus" | "completionScore" | "timeBonus" | "totalPoints" | "rank" | "addedAt" | "updatedAt">) {
  const days: DayScore[] = [p.day1, p.day2, p.day3, p.day4, p.day5, p.day6]

  let accuracyScore = 0
  let consistencyBonus = 0
  let completionScore = 0
  let timeBonus = 0

  for (const day of days) {
    const questionsPerDay = 30

    // Accuracy: correct / 30 * 100
    const dayAccuracy = (Math.min(day.correct, questionsPerDay) / questionsPerDay) * 100
    accuracyScore += dayAccuracy

    // Consistency: +50 if participated (attempted ≥ 1)
    if (day.total > 0) {
      consistencyBonus += 50
    }

    // Completion: attempted / 30 * 20
    const dayCompletion = (Math.min(day.total, questionsPerDay) / questionsPerDay) * 20
    completionScore += dayCompletion

    // Time-weighted: max(0, 1 - timeSecs/3600) * 5
    const dayTime = day.total > 0 ? Math.max(0, 1 - day.timeSecs / 3600) * 5 : 0
    timeBonus += dayTime
  }

  // Round to 2 decimal places
  accuracyScore = Math.round(accuracyScore * 100) / 100
  consistencyBonus = Math.round(consistencyBonus * 100) / 100
  completionScore = Math.round(completionScore * 100) / 100
  timeBonus = Math.round(timeBonus * 100) / 100
  const totalPoints = Math.round((accuracyScore + consistencyBonus + completionScore + timeBonus) * 100) / 100

  return { accuracyScore, consistencyBonus, completionScore, timeBonus, totalPoints }
}

export function emptyDayScore(): DayScore {
  return { correct: 0, total: 0, timeSecs: 0 }
}

// ─── Participants CRUD ────────────────────────────────────────────────────────

const PARTICIPANTS_COLLECTION = "perspective_participants"
const COLLEGES_COLLECTION = "perspective_colleges"

export async function addParticipant(
  data: Omit<Participant, "id" | "accuracyScore" | "consistencyBonus" | "completionScore" | "timeBonus" | "totalPoints" | "rank" | "addedAt" | "updatedAt">
): Promise<string> {
  const scores = calculateScores(data)
  const docRef = await addDoc(collection(db, PARTICIPANTS_COLLECTION), {
    ...data,
    ...scores,
    rank: 0,
    addedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  // Update college totals
  await recalculateCollegeScore(data.collegeId)
  return docRef.id
}

export async function updateParticipant(
  id: string,
  data: Partial<Omit<Participant, "id" | "addedAt">>
): Promise<void> {
  const ref = doc(db, PARTICIPANTS_COLLECTION, id)
  
  // Re-calculate scores if day scores changed
  let updatedData: any = { ...data, updatedAt: serverTimestamp() }
  
  if (data.day1 || data.day2 || data.day3 || data.day4 || data.day5 || data.day6) {
    // Fetch current document to merge
    const snap = await getDoc(ref)
    if (snap.exists()) {
      const current = snap.data() as Participant
      const merged = { ...current, ...data }
      const scores = calculateScores(merged as any)
      updatedData = { ...updatedData, ...scores }
    }
  }
  
  await updateDoc(ref, updatedData)
  
  // Recalculate college score if collegeId changed or scores updated
  const collegeId = data.collegeId || (await getDoc(ref)).data()?.collegeId
  if (collegeId) {
    await recalculateCollegeScore(collegeId)
  }
}

export async function deleteParticipant(id: string, collegeId: string): Promise<void> {
  await deleteDoc(doc(db, PARTICIPANTS_COLLECTION, id))
  await recalculateCollegeScore(collegeId)
}

export async function toggleParticipantVisibility(id: string, isHidden: boolean): Promise<void> {
  await updateDoc(doc(db, PARTICIPANTS_COLLECTION, id), {
    isHidden,
    updatedAt: serverTimestamp(),
  })
}

export async function updateParticipantDayScore(
  participantId: string,
  collegeId: string,
  dayKey: "day1" | "day2" | "day3" | "day4" | "day5" | "day6",
  score: DayScore,
  existingParticipant: Participant
): Promise<void> {
  const updatedScores = {
    ...existingParticipant,
    [dayKey]: score,
  }
  const computed = calculateScores(updatedScores)
  await updateDoc(doc(db, PARTICIPANTS_COLLECTION, participantId), {
    [dayKey]: score,
    ...computed,
    updatedAt: serverTimestamp(),
  })
  await recalculateCollegeScore(collegeId)
}

export interface PerspectiveConfig {
  displayMode: "colleges_only" | "leaderboard"
  isLeaderboardPublished: boolean
  hideStudentCounts?: boolean // when true, hide exact participant numbers on public website
  updatedAt?: Timestamp | null
  updatedBy?: string
}

const SETTINGS_COLLECTION = "perspective_settings"
const CONFIG_DOC_ID = "config"

export function subscribePerspectiveConfig(
  callback: (config: PerspectiveConfig) => void
): () => void {
  const docRef = doc(db, SETTINGS_COLLECTION, CONFIG_DOC_ID)
  return onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as PerspectiveConfig)
    } else {
      // Default initial config: colleges_only
      callback({
        displayMode: "colleges_only",
        isLeaderboardPublished: false,
      })
    }
  })
}

export async function updatePerspectiveConfig(
  config: Partial<PerspectiveConfig>
): Promise<void> {
  const docRef = doc(db, SETTINGS_COLLECTION, CONFIG_DOC_ID)
  await setDoc(
    docRef,
    {
      ...config,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

export function subscribeParticipants(
  callback: (participants: Participant[]) => void
): () => void {
  const q = query(collection(db, PARTICIPANTS_COLLECTION), orderBy("totalPoints", "desc"))
  return onSnapshot(q, (snap) => {
    const rawList = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Participant[]

    // Strict multi-tier tie breaker based on official score algorithm:
    // 1. Total Points DESC
    // 2. Accuracy Score DESC
    // 3. Consistency Bonus DESC
    // 4. Completion Score DESC
    // 5. Time Bonus DESC
    // 6. Name ASC
    const sorted = [...rawList].sort((a, b) => {
      const diffTotal = (b.totalPoints || 0) - (a.totalPoints || 0)
      if (Math.abs(diffTotal) > 0.001) return diffTotal

      const diffAcc = (b.accuracyScore || 0) - (a.accuracyScore || 0)
      if (Math.abs(diffAcc) > 0.001) return diffAcc

      const diffCons = (b.consistencyBonus || 0) - (a.consistencyBonus || 0)
      if (Math.abs(diffCons) > 0.001) return diffCons

      const diffComp = (b.completionScore || 0) - (a.completionScore || 0)
      if (Math.abs(diffComp) > 0.001) return diffComp

      const diffTime = (b.timeBonus || 0) - (a.timeBonus || 0)
      if (Math.abs(diffTime) > 0.001) return diffTime

      return (a.name || "").localeCompare(b.name || "")
    })

    const participants = sorted.map((p, idx) => ({
      ...p,
      rank: idx + 1,
    }))
    callback(participants)
  })
}

export async function recalculateAllParticipantScores(): Promise<void> {
  const snap = await getDocs(collection(db, PARTICIPANTS_COLLECTION))
  const batch = writeBatch(db)
  
  snap.docs.forEach((d) => {
    const data = d.data() as Participant
    const scores = calculateScores(data)
    batch.update(d.ref, { ...scores, updatedAt: serverTimestamp() })
  })
  
  await batch.commit()
  
  // Recalculate all college scores
  const collegeSnap = await getDocs(collection(db, COLLEGES_COLLECTION))
  for (const cDoc of collegeSnap.docs) {
    await recalculateCollegeScore(cDoc.id)
  }
}

// ─── Colleges CRUD ────────────────────────────────────────────────────────────

export async function addCollege(
  data: Omit<College, "id" | "totalPoints" | "participantCount" | "rank" | "addedAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLEGES_COLLECTION), {
    ...data,
    totalPoints: 0,
    participantCount: 0,
    rank: 0,
    addedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateCollege(id: string, data: Partial<Omit<College, "id" | "addedAt">>): Promise<void> {
  await updateDoc(doc(db, COLLEGES_COLLECTION, id), data)
}

export async function toggleCollegeVisibility(id: string, isHidden: boolean): Promise<void> {
  await updateDoc(doc(db, COLLEGES_COLLECTION, id), { isHidden })
}

export async function deleteCollege(id: string): Promise<void> {
  // Also delete all participants from this college
  const pSnap = await getDocs(collection(db, PARTICIPANTS_COLLECTION))
  const batch = writeBatch(db)
  pSnap.docs.forEach((d) => {
    if (d.data().collegeId === id) {
      batch.delete(d.ref)
    }
  })
  batch.delete(doc(db, COLLEGES_COLLECTION, id))
  await batch.commit()
}

export function subscribeColleges(
  callback: (colleges: College[]) => void
): () => void {
  const q = query(collection(db, COLLEGES_COLLECTION), orderBy("totalPoints", "desc"))
  return onSnapshot(q, (snap) => {
    const rawList = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as College[]

    // Multi-tier sort:
    // 1. Total Points DESC
    // 2. Participant Count DESC
    // 3. Name ASC
    const sorted = [...rawList].sort((a, b) => {
      const diffTotal = (b.totalPoints || 0) - (a.totalPoints || 0)
      if (Math.abs(diffTotal) > 0.001) return diffTotal

      const diffCount = (b.participantCount || 0) - (a.participantCount || 0)
      if (diffCount !== 0) return diffCount

      return (a.name || "").localeCompare(b.name || "")
    })

    const colleges = sorted.map((c, idx) => ({
      ...c,
      rank: idx + 1,
    }))
    callback(colleges)
  })
}

/**
 * Recalculates a college's total points and participant count
 * by aggregating all participant data for that college.
 */
export async function recalculateCollegeScore(collegeId: string): Promise<void> {
  if (!collegeId) return
  
  const pSnap = await getDocs(collection(db, PARTICIPANTS_COLLECTION))
  let totalPoints = 0
  let participantCount = 0
  
  pSnap.docs.forEach((d) => {
    const data = d.data() as Participant
    if (data.collegeId === collegeId) {
      totalPoints += data.totalPoints || 0
      participantCount += 1
    }
  })
  
  const collegeRef = doc(db, COLLEGES_COLLECTION, collegeId)
  await updateDoc(collegeRef, { totalPoints, participantCount })
}

// ─── Utility ─────────────────────────────────────────────────────────────────

export function getRankBadgeClass(rank: number): string {
  if (rank === 1) return "bg-amber-400 text-amber-950"
  if (rank === 2) return "bg-slate-300 text-slate-900"
  if (rank === 3) return "bg-amber-700 text-white"
  return "bg-slate-100 text-slate-700"
}

export function getRankEmoji(rank: number): string {
  if (rank === 1) return "🥇"
  if (rank === 2) return "🥈"
  if (rank === 3) return "🥉"
  return `#${rank}`
}
