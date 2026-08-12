import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Search, Users, ChevronDown, ChevronUp, Star } from "lucide-react"
import { Participant, College, getRankEmoji } from "@/lib/scoreboard-service"

interface StudentLeaderboardProps {
  participants: Participant[]
  colleges: College[]
}

function ScoreBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function PerspectiveStudentLeaderboard({ participants, colleges }: StudentLeaderboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCollege, setFilterCollege] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const collegeMap = new Map(colleges.map((c) => [c.id, c]))

  const filtered = participants.filter((p) => {
    const q = searchQuery.toLowerCase()
    const matchName = p.name.toLowerCase().includes(q)
    const matchCollege = p.college.toLowerCase().includes(q)
    const matchCollegeFilter = filterCollege === "all" || p.collegeId === filterCollege
    return (matchName || matchCollege) && matchCollegeFilter
  })

  if (participants.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-white border border-slate-200 text-slate-400 font-mono text-sm">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <div className="font-bold text-slate-700 text-lg mb-1">Scores Not Yet Published</div>
            <div>The leaderboard will go live after the challenge concludes on September 6, 2026.</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <Trophy className="w-3.5 h-3.5" />
              INDIVIDUAL RANKINGS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Student Leaderboard
            </h2>
            <p className="text-slate-500 font-light mt-1 text-sm">
              {filtered.length} of {participants.length} participants shown
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student or college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#7C3AED] shadow-sm"
              />
            </div>
            <select
              value={filterCollege}
              onChange={(e) => setFilterCollege(e.target.value)}
              className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#7C3AED] shadow-sm cursor-pointer font-mono"
            >
              <option value="all">All Colleges</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leaderboard card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-5 w-16">Rank</th>
                  <th className="py-4 px-5">Student</th>
                  <th className="py-4 px-5">Institution</th>
                  <th className="py-4 px-5">Score Breakdown</th>
                  <th className="py-4 px-5 text-right">Total Points</th>
                  <th className="py-4 px-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((participant) => {
                  const college = collegeMap.get(participant.collegeId)
                  const isExpanded = expandedId === participant.id
                  const isTop3 = participant.rank <= 3

                  return (
                    <>
                      <motion.tr
                        key={participant.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`cursor-pointer transition-colors hover:bg-slate-50/80 ${
                          isTop3 ? "bg-amber-50/30" : ""
                        }`}
                        onClick={() => setExpandedId(isExpanded ? null : participant.id)}
                      >
                        {/* Rank */}
                        <td className="py-3.5 px-5">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-extrabold text-sm ${
                              participant.rank === 1
                                ? "bg-amber-400 text-amber-950 shadow-sm"
                                : participant.rank === 2
                                ? "bg-slate-200 text-slate-800"
                                : participant.rank === 3
                                ? "bg-amber-700 text-white"
                                : "bg-slate-100 text-slate-600 text-[11px]"
                            }`}
                          >
                            {participant.rank <= 3
                              ? ["🥇", "🥈", "🥉"][participant.rank - 1]
                              : `#${participant.rank}`}
                          </div>
                        </td>

                        {/* Student */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-mono font-extrabold text-xs flex items-center justify-center shrink-0 border border-purple-200">
                              {participant.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{participant.name}</div>
                              {participant.email && (
                                <div className="text-[10px] text-slate-400 font-mono truncate max-w-[160px]">{participant.email}</div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* College */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2.5">
                            {college?.logoUrl ? (
                              <img
                                src={college.logoUrl}
                                alt={college.name}
                                className="w-7 h-7 rounded-lg object-contain bg-white border border-slate-200 p-0.5 shrink-0"
                                onError={(e) => { e.currentTarget.style.display = "none" }}
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 font-mono font-extrabold text-[10px] flex items-center justify-center shrink-0 border border-purple-100">
                                {participant.college.charAt(0)}
                              </div>
                            )}
                            <span className="text-slate-700 font-semibold text-[11px] leading-tight max-w-[160px] truncate">
                              {participant.college}
                            </span>
                          </div>
                        </td>

                        {/* Score Breakdown bars */}
                        <td className="py-3.5 px-5">
                          <div className="space-y-1.5 w-40">
                            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                              <span>Accuracy</span>
                              <span>{participant.accuracyScore.toFixed(0)}</span>
                            </div>
                            <ScoreBar value={participant.accuracyScore} max={600} color="bg-purple-500" />
                            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                              <span>Consistency</span>
                              <span>{participant.consistencyBonus.toFixed(0)}</span>
                            </div>
                            <ScoreBar value={participant.consistencyBonus} max={300} color="bg-amber-400" />
                          </div>
                        </td>

                        {/* Total Points */}
                        <td className="py-3.5 px-5 text-right">
                          <span className={`font-extrabold text-base font-mono ${
                            isTop3 ? "text-amber-600" : "text-emerald-600"
                          }`}>
                            {participant.totalPoints.toFixed(1)}
                          </span>
                          <div className="text-[9px] text-slate-400 font-mono text-right">/ 1050</div>
                        </td>

                        {/* Expand toggle */}
                        <td className="py-3.5 px-3">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </td>
                      </motion.tr>

                      {/* Expanded row — day-by-day breakdown */}
                      {isExpanded && (
                        <tr key={`${participant.id}-expand`} className="bg-purple-50/50">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="space-y-3">
                              <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                                Day-by-Day Performance
                              </div>
                              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                {[
                                  participant.day1,
                                  participant.day2,
                                  participant.day3,
                                  participant.day4,
                                  participant.day5,
                                  participant.day6,
                                ].map((day, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-white rounded-xl border border-slate-200 p-2.5 text-center shadow-2xs"
                                  >
                                    <div className="text-[9px] font-mono text-slate-400 uppercase mb-1">
                                      Day {idx + 1}
                                    </div>
                                    <div className="text-base font-extrabold text-slate-900 font-mono">
                                      {day.correct}
                                      <span className="text-[10px] text-slate-400 font-light">/30</span>
                                    </div>
                                    <div className="text-[9px] text-slate-500 mt-0.5">
                                      {day.total > 0
                                        ? `${Math.round((day.correct / 30) * 100)}% acc`
                                        : "—"}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Full score breakdown */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                                {[
                                  { label: "Accuracy", value: participant.accuracyScore, max: 600, color: "text-purple-600" },
                                  { label: "Consistency", value: participant.consistencyBonus, max: 300, color: "text-amber-600" },
                                  { label: "Completion", value: participant.completionScore, max: 120, color: "text-emerald-600" },
                                  { label: "Time Bonus", value: participant.timeBonus, max: 30, color: "text-sky-600" },
                                ].map((item) => (
                                  <div key={item.label} className="bg-white rounded-xl border border-slate-200 p-2.5 shadow-2xs">
                                    <div className="text-[9px] font-mono text-slate-400 uppercase">{item.label}</div>
                                    <div className={`text-sm font-extrabold font-mono ${item.color}`}>
                                      {item.value.toFixed(1)}
                                      <span className="text-[9px] text-slate-400 font-light">/{item.max}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 font-mono text-sm">
                      No participants match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
