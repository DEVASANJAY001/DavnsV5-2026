import {
  collection,
  doc,
  getDocs,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Participant, College, recalculateCollegeScore } from "@/lib/scoreboard-service"

// ─── Known Institutional Aliases & Canonical Names ──────────────────────────

interface CollegeRule {
  canonicalName: string
  defaultCity: string
  defaultState: string
  logoUrl?: string
  keywords: string[]
}

const KNOWN_COLLEGE_RULES: CollegeRule[] = [
  {
    canonicalName: "SRM Easwari Engineering College (SRMEEC)",
    defaultCity: "Chennai",
    defaultState: "Tamil Nadu",
    keywords: ["easwari", "srmeec", "srm easwari"],
  },
  {
    canonicalName: "R.M.K. College of Engineering and Technology (RMKCET)",
    defaultCity: "Thiruvallur",
    defaultState: "Tamil Nadu",
    keywords: ["rmkcet", "r.m.k. college of engineering", "rmk college of engineering"],
  },
  {
    canonicalName: "RMK Engineering College (RMKEC)",
    defaultCity: "Thiruvallur",
    defaultState: "Tamil Nadu",
    keywords: ["rmkec", "rmk engineering college"],
  },
  {
    canonicalName: "Women's Christian College (WCC)",
    defaultCity: "Chennai",
    defaultState: "Tamil Nadu",
    keywords: ["women's christian", "womens christian", "wcc"],
  },
  {
    canonicalName: "Saveetha Engineering College (SEC)",
    defaultCity: "Chennai",
    defaultState: "Tamil Nadu",
    keywords: ["saveetha", "sec"],
  },
  {
    canonicalName: "SRM Institute of Science and Technology (SRMIST)",
    defaultCity: "Chennai",
    defaultState: "Tamil Nadu",
    keywords: ["srm university", "srm institute of science", "srmist"],
  },
  {
    canonicalName: "Amity University",
    defaultCity: "Noida",
    defaultState: "Uttar Pradesh",
    keywords: ["amity university", "amity", "au, noida"],
  },
  {
    canonicalName: "Jadavpur University",
    defaultCity: "Kolkata",
    defaultState: "West Bengal",
    keywords: ["jadavpur university", "jadavpur", "ju, kolkata"],
  },
  {
    canonicalName: "SSN College of Engineering (SSN)",
    defaultCity: "Chennai",
    defaultState: "Tamil Nadu",
    keywords: ["ssn college", "ssn"],
  },
  {
    canonicalName: "Loyola College",
    defaultCity: "Chennai",
    defaultState: "Tamil Nadu",
    keywords: ["loyola"],
  },
  {
    canonicalName: "Anna University (CEG)",
    defaultCity: "Chennai",
    defaultState: "Tamil Nadu",
    keywords: ["anna university", "college of engineering, guindy", "ceg"],
  },
  {
    canonicalName: "Vellore Institute of Technology (VIT)",
    defaultCity: "Vellore",
    defaultState: "Tamil Nadu",
    keywords: ["vellore institute of technology", "vit university", "vit"],
  },
  {
    canonicalName: "Sathyabama Institute of Science and Technology",
    defaultCity: "Chennai",
    defaultState: "Tamil Nadu",
    keywords: ["sathyabama"],
  },
  {
    canonicalName: "St. Joseph's College of Engineering",
    defaultCity: "Chennai",
    defaultState: "Tamil Nadu",
    keywords: ["st. joseph's college of engineering", "st josephs engineering", "st. joseph"],
  },
]

/**
 * Clean and canonicalize an institution name.
 * Handles known rule matches, cleans acronyms, removes location suffixes.
 */
export function getCanonicalCollege(rawName: string): {
  canonicalName: string
  city: string
  state: string
  logoUrl?: string
} {
  if (!rawName || rawName.trim() === "-" || rawName.trim() === "") {
    return {
      canonicalName: "Independent / Other",
      city: "Tamil Nadu",
      state: "India",
    }
  }

  const trimmed = rawName.trim()
  const lower = trimmed.toLowerCase()

  // 1. Check known rules first
  for (const rule of KNOWN_COLLEGE_RULES) {
    if (rule.keywords.some((k) => lower.includes(k))) {
      return {
        canonicalName: rule.canonicalName,
        city: rule.defaultCity,
        state: rule.defaultState,
        logoUrl: rule.logoUrl,
      }
    }
  }

  // 2. Generic cleaning:
  // Remove trailing location suffixes like ", Chennai", ", Tamil Nadu", ", India"
  let cleaned = trimmed
    .replace(/,\s*(chennai|tamil nadu|india|ramapuram|thiruvallur|noida|kolkata|mumbai|delhi|bangalore|bengaluru|hyderabad|puduvayal|pallipattu|porur|manappakkam)\b/gi, "")
    .replace(/,\s*(tamil nadu|india)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()

  return {
    canonicalName: cleaned || trimmed,
    city: "Tamil Nadu",
    state: "India",
  }
}

// ─── Automatic Merge & Migration Engine ─────────────────────────────────────

export interface MergeReport {
  success: boolean
  mergedCount: number
  deletedCount: number
  migratedParticipantsCount: number
  details: string[]
}

/**
 * Scans all colleges and participants in Firestore, groups duplicates by their
 * canonical college identity, migrates all participants to the primary canonical
 * college, deletes duplicate college documents, and recalculates scores.
 */
export async function mergeDuplicateColleges(
  onProgress?: (msg: string) => void
): Promise<MergeReport> {
  onProgress?.("Fetching colleges and participants...")

  const cSnap = await getDocs(collection(db, "perspective_colleges"))
  const pSnap = await getDocs(collection(db, "perspective_participants"))

  const colleges = cSnap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<College, "id">),
  }))

  const participants = pSnap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Participant, "id">),
  }))

  if (colleges.length === 0) {
    return {
      success: true,
      mergedCount: 0,
      deletedCount: 0,
      migratedParticipantsCount: 0,
      details: ["No colleges found in database."],
    }
  }

  // Group colleges by canonical name
  const canonicalGroups = new Map<string, typeof colleges>()

  colleges.forEach((c) => {
    const { canonicalName } = getCanonicalCollege(c.name)
    const existing = canonicalGroups.get(canonicalName) || []
    existing.push(c)
    canonicalGroups.set(canonicalName, existing)
  })

  let totalMerged = 0
  let totalDeleted = 0
  let totalMigrated = 0
  const details: string[] = []

  const affectedCanonicalIds: string[] = []

  onProgress?.("Identifying duplicate clusters...")

  for (const [canonicalName, group] of canonicalGroups.entries()) {
    // Determine the primary college document for this group:
    // Prefer doc that already has a logoUrl, or highest participantCount, or the first one
    group.sort((a, b) => {
      if (a.logoUrl && !b.logoUrl) return -1
      if (!a.logoUrl && b.logoUrl) return 1
      return (b.participantCount || 0) - (a.participantCount || 0)
    })

    const primary = group[0]
    const duplicates = group.slice(1)
    const { city, state } = getCanonicalCollege(canonicalName)

    // Check if primary needs name or city standardization
    const needsUpdate =
      primary.name !== canonicalName ||
      (!primary.city && city) ||
      (!primary.state && state)

    if (needsUpdate || duplicates.length > 0) {
      totalMerged++
      affectedCanonicalIds.push(primary.id)

      // Update primary college with canonical name
      const primaryBatch = writeBatch(db)
      primaryBatch.update(doc(db, "perspective_colleges", primary.id), {
        name: canonicalName,
        city: primary.city || city,
        state: primary.state || state,
        updatedAt: serverTimestamp(),
      })
      await primaryBatch.commit()

      const duplicateIds = new Set(duplicates.map((d) => d.id))

      // Migrate participants from duplicates (or whose college name differs) to primary
      const participantsToMigrate = participants.filter(
        (p) =>
          duplicateIds.has(p.collegeId) ||
          (p.collegeId === primary.id && p.college !== canonicalName) ||
          getCanonicalCollege(p.college).canonicalName === canonicalName
      )

      if (participantsToMigrate.length > 0) {
        const BATCH_SIZE = 400
        for (let i = 0; i < participantsToMigrate.length; i += BATCH_SIZE) {
          const chunk = participantsToMigrate.slice(i, i + BATCH_SIZE)
          const pBatch = writeBatch(db)

          chunk.forEach((p) => {
            pBatch.update(doc(db, "perspective_participants", p.id), {
              collegeId: primary.id,
              college: canonicalName,
              updatedAt: serverTimestamp(),
            })
          })

          await pBatch.commit()
          totalMigrated += chunk.length
        }
      }

      // Delete duplicate college docs
      if (duplicates.length > 0) {
        const delBatch = writeBatch(db)
        duplicates.forEach((d) => {
          delBatch.delete(doc(db, "perspective_colleges", d.id))
          totalDeleted++
        })
        await delBatch.commit()

        details.push(
          `Merged ${duplicates.length} duplicate(s) into "${canonicalName}" (${participantsToMigrate.length} students moved)`
        )
      } else if (needsUpdate) {
        details.push(`Standardized name to "${canonicalName}"`)
      }
    }
  }

  // Recalculate scores for all affected canonical colleges
  onProgress?.("Recalculating institutional points and counts...")
  for (const cId of affectedCanonicalIds) {
    await recalculateCollegeScore(cId)
  }

  onProgress?.("Cleanup and migration complete!")

  return {
    success: true,
    mergedCount: totalMerged,
    deletedCount: totalDeleted,
    migratedParticipantsCount: totalMigrated,
    details,
  }
}
