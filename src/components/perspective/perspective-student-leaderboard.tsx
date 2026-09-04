import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Trophy, Building2 } from "lucide-react"
import { Participant, College } from "@/lib/scoreboard-service"

interface StudentLeaderboardProps {
  participants: Participant[]
  colleges: College[]
  onViewInstitutions?: () => void
}

export function PerspectiveStudentLeaderboard({
  participants,
  colleges,
  onViewInstitutions,
}: StudentLeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCollege, setFilterCollege] = useState("all")

  const collegeMap = new Map(colleges.map((c) => [c.id, c]))

  // Limit to Top 30 students as requested
  const top30Participants = [...participants]
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 30)

  const filtered = top30Participants.filter((p) => {
    const q = searchQuery.toLowerCase().trim()
    const matchName = p.name.toLowerCase().includes(q)
    const matchCollege = p.college.toLowerCase().includes(q)
    const matchCollegeFilter = filterCollege === "all" || p.collegeId === filterCollege
    return (matchName || matchCollege) && matchCollegeFilter
  })

  const top1 = top30Participants.find((p) => p.rank === 1) || top30Participants[0]
  const top2 = top30Participants.find((p) => p.rank === 2) || top30Participants[1]
  const top3 = top30Participants.find((p) => p.rank === 3) || top30Participants[2]

  const topThreeStudents = [
    {
      student: top2,
      rank: 2,
      label: "2ND PLACE",
      medal: "🥈",
      heightClass: "min-h-[250px] sm:min-h-[290px]",
      borderClass: "border-slate-300 bg-gradient-to-b from-slate-100/80 via-slate-50 to-white shadow-sm",
      rankBadge: "bg-slate-200 text-slate-800 font-bold",
      ptColor: "text-slate-800",
    },
    {
      student: top1,
      rank: 1,
      label: "CHAMPION",
      medal: "🥇",
      heightClass: "min-h-[290px] sm:min-h-[340px] -mt-3 sm:-mt-5",
      borderClass: "border-2 border-amber-400 bg-gradient-to-b from-amber-50/90 via-amber-50/30 to-white shadow-xl shadow-amber-500/10",
      rankBadge: "bg-[#FACC15] text-slate-950 font-black shadow-xs",
      ptColor: "text-amber-600",
    },
    {
      student: top3,
      rank: 3,
      label: "3RD PLACE",
      medal: "🥉",
      heightClass: "min-h-[220px] sm:min-h-[260px]",
      borderClass: "border-amber-200 bg-gradient-to-b from-orange-50/70 via-amber-50/20 to-white shadow-sm",
      rankBadge: "bg-amber-100 text-amber-900 font-bold",
      ptColor: "text-amber-800",
    },
  ].filter((item) => Boolean(item.student))

  // For the table: when filtering/searching, show all matching top 30; otherwise show ranks 4 to 30
  const isFiltering = searchQuery.length > 0 || filterCollege !== "all"
  const tableParticipants = isFiltering
    ? filtered
    : top30Participants.filter((p) => p.rank > 3)

  if (participants.length === 0) {
    return (
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 text-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-slate-500 font-mono text-xs">
            Student individual scores will be published after verification.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="students-leaderboard" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-slate-50/70 text-slate-900 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest uppercase text-[#7C3AED] mb-1.5">
              <Trophy className="w-3.5 h-3.5" />
              TOP 30 CANDIDATE RANKINGS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Students Leaderboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top 30 performing candidates across all participating institutions
            </p>
          </div>

          {onViewInstitutions && (
            <button
              onClick={onViewInstitutions}
              className="self-start sm:self-auto text-[#7C3AED] hover:text-purple-800 font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 hover:underline py-1"
            >
              <Building2 className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>View Institution Leaderboard ↑</span>
            </button>
          )}
        </div>

        {/* ── TOP 3 STUDENTS PODIUM (When not filtering) ── */}
        {!isFiltering && topThreeStudents.length > 0 && (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-end mb-10 pt-4">
            {topThreeStudents.map(({ student, rank, label, medal, heightClass, borderClass, rankBadge, ptColor }) => {
              if (!student) return null
              const isRank1 = rank === 1
              const college = collegeMap.get(student.collegeId)
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: rank * 0.08 }}
                  className={`rounded-2xl sm:rounded-3xl border p-3 sm:p-5 flex flex-col justify-between text-center relative overflow-hidden transition-all ${borderClass} ${heightClass}`}
                >
                  {/* Header rank chip */}
                  <div className="flex flex-col items-center gap-1">
                    <span className={`inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-wider ${rankBadge}`}>
                      <span>{medal}</span>
                      <span className="hidden xs:inline">{label}</span>
                    </span>
                  </div>

                  {/* Student Avatar & Info */}
                  <div className="my-auto py-2 flex flex-col items-center">
                    <div
                      className={`${
                        isRank1 ? "w-14 h-14 sm:w-18 sm:h-18 text-xl sm:text-2xl" : "w-10 h-10 sm:w-14 sm:h-14 text-sm sm:text-lg"
                      } rounded-full bg-purple-50 border ${
                        isRank1 ? "border-amber-400 text-amber-700" : "border-purple-200 text-[#7C3AED]"
                      } flex items-center justify-center font-mono font-extrabold mb-2 shadow-2xs`}
                    >
                      {student.name.charAt(0).toUpperCase()}
                    </div>

                    <h3 className={`font-bold text-slate-900 line-clamp-1 leading-snug px-1 ${
                      isRank1 ? "text-xs sm:text-base font-extrabold" : "text-[11px] sm:text-sm"
                    }`}>
                      {student.name}
                    </h3>

                    <div className="text-[9px] sm:text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1 mt-1 truncate max-w-full">
                      {college?.logoUrl && (
                        <img
                          src={college.logoUrl}
                          alt=""
                          className="w-3 h-3 rounded object-contain inline-block shrink-0 bg-white"
                          onError={(e) => { e.currentTarget.style.display = "none" }}
                        />
                      )}
                      <span className="truncate">{student.college}</span>
                    </div>
                  </div>

                  {/* Bottom Points */}
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-center text-[10px] sm:text-xs font-mono">
                    <span className={`font-black text-xs sm:text-base ${ptColor}`}>
                      {student.totalPoints.toFixed(0)} <span className="text-[9px] sm:text-xs font-normal">pts</span>
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* ── PERFECTLY FITTED FILTER & SEARCH TOOLBAR ── */}
        <div className="w-full bg-white rounded-2xl border border-slate-200 p-2 sm:p-2.5 shadow-2xs mb-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search candidate name or college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all font-medium"
              />
            </div>

            {/* All Institutions Dropdown */}
            <div className="w-full sm:w-64 shrink-0">
              <select
                value={filterCollege}
                onChange={(e) => setFilterCollege(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono outline-none focus:bg-white focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all cursor-pointer font-medium"
              >
                <option value="all">All Institutions ({colleges.length})</option>
                {colleges.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── STUDENTS COMPACT TABLE: ONLY RANK, NAME, COLLEGE, POINTS ── */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
          <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
            <span className="font-bold uppercase tracking-wider text-[10px] sm:text-xs text-slate-700">
              {isFiltering ? `FILTERED RESULTS (${tableParticipants.length})` : "CANDIDATE STANDINGS (RANKS 4+)"}
            </span>
            <span className="text-[10px] text-slate-400">
              Showing top 30
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 min-w-[480px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-4 w-16 text-center">Rank</th>
                  <th className="py-2.5 px-4">Student Name</th>
                  <th className="py-2.5 px-4 text-center w-28">Points</th>
                  <th className="py-2.5 px-4">College Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableParticipants.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500 font-mono text-xs">
                      No candidates found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  tableParticipants.map((p) => {
                    const college = collegeMap.get(p.collegeId)
                    return (
                      <tr key={p.id} className="hover:bg-purple-50/30 transition-colors">
                        {/* Rank */}
                        <td className="py-2.5 px-4 text-center font-mono">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold ${
                            p.rank === 1
                              ? "bg-amber-400 text-slate-950"
                              : p.rank === 2
                              ? "bg-slate-200 text-slate-800"
                              : p.rank === 3
                              ? "bg-amber-100 text-amber-900"
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            #{p.rank}
                          </span>
                        </td>

                        {/* Student Name */}
                        <td className="py-2.5 px-4 font-semibold text-slate-900">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-50 border border-purple-200 text-[#7C3AED] font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                              {p.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xs sm:text-sm">{p.name}</span>
                          </div>
                        </td>

                        {/* Total Points */}
                        <td className="py-2.5 px-4 text-center font-mono font-bold text-[#7C3AED] text-xs sm:text-sm">
                          {p.totalPoints.toFixed(0)} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                        </td>

                        {/* College Name */}
                        <td className="py-2.5 px-4 text-slate-600 font-medium text-xs">
                          <div className="flex items-center gap-1.5 truncate max-w-[280px]">
                            {college?.logoUrl && (
                              <img
                                src={college.logoUrl}
                                alt=""
                                className="w-4 h-4 rounded object-contain inline-block shrink-0 bg-white"
                                onError={(e) => { e.currentTarget.style.display = "none" }}
                              />
                            )}
                            <span className="truncate">{p.college}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
