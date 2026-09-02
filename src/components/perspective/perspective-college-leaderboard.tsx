import { motion } from "framer-motion"
import { Building2, Users, MapPin } from "lucide-react"
import { College } from "@/lib/scoreboard-service"

interface CollegeLeaderboardProps {
  colleges: College[]
  onViewStudents?: () => void
}

export function PerspectiveCollegeLeaderboard({ colleges, onViewStudents }: CollegeLeaderboardProps) {
  if (colleges.length === 0) {
    return (
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-slate-500 font-mono text-xs">
            No institutional scores published yet.
          </div>
        </div>
      </section>
    )
  }

  // Sort colleges by rank (1, 2, 3...)
  const sortedColleges = [...colleges].sort((a, b) => a.rank - b.rank)
  const top1 = sortedColleges.find((c) => c.rank === 1) || sortedColleges[0]
  const top2 = sortedColleges.find((c) => c.rank === 2) || sortedColleges[1]
  const top3 = sortedColleges.find((c) => c.rank === 3) || sortedColleges[2]

  const topThreePodium = [
    {
      college: top2,
      rank: 2,
      label: "2ND PLACE",
      medal: "🥈",
      heightClass: "min-h-[250px] sm:min-h-[290px]",
      borderClass: "border-slate-300 bg-gradient-to-b from-slate-100/80 via-slate-50 to-white shadow-sm",
      rankBadge: "bg-slate-200 text-slate-800 font-bold",
      ptColor: "text-slate-800",
    },
    {
      college: top1,
      rank: 1,
      label: "CHAMPION",
      medal: "🥇",
      heightClass: "min-h-[290px] sm:min-h-[340px] -mt-3 sm:-mt-5",
      borderClass: "border-2 border-amber-400 bg-gradient-to-b from-amber-50/90 via-amber-50/30 to-white shadow-xl shadow-amber-500/10",
      rankBadge: "bg-[#FACC15] text-slate-950 font-black shadow-xs",
      ptColor: "text-amber-600",
    },
    {
      college: top3,
      rank: 3,
      label: "3RD PLACE",
      medal: "🥉",
      heightClass: "min-h-[220px] sm:min-h-[260px]",
      borderClass: "border-amber-200 bg-gradient-to-b from-orange-50/70 via-amber-50/20 to-white shadow-sm",
      rankBadge: "bg-amber-100 text-amber-900 font-bold",
      ptColor: "text-amber-800",
    },
  ].filter((item) => Boolean(item.college))

  const restColleges = sortedColleges.filter((c) => c.rank > 3)

  return (
    <section id="colleges-leaderboard" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest uppercase text-[#7C3AED] mb-1.5">
              <Building2 className="w-3.5 h-3.5" />
              INSTITUTIONAL RANKINGS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Institution Leaderboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Ranked by cumulative points accumulated by all participating students
            </p>
          </div>

          {onViewStudents && (
            <button
              onClick={onViewStudents}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#7C3AED] font-mono text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Users className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>View Student Leaderboard ↓</span>
            </button>
          )}
        </div>

        {/* ── TOP 3 PODIUM IN THE SAME ROW ── */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 items-end mb-10 pt-4">
          {topThreePodium.map(({ college, rank, label, medal, heightClass, borderClass, rankBadge, ptColor }) => {
            if (!college) return null
            const isRank1 = rank === 1
            return (
              <motion.div
                key={college.id}
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

                {/* College Emblem & Info */}
                <div className="my-auto py-2 flex flex-col items-center">
                  {college.logoUrl ? (
                    <img
                      src={college.logoUrl}
                      alt={college.name}
                      className={`${
                        isRank1 ? "w-14 h-14 sm:w-18 sm:h-18" : "w-10 h-10 sm:w-14 sm:h-14"
                      } rounded-xl object-contain bg-white p-1 border border-slate-200 mb-2 shadow-2xs`}
                      onError={(e) => { e.currentTarget.style.display = "none" }}
                    />
                  ) : (
                    <div
                      className={`${
                        isRank1 ? "w-14 h-14 sm:w-18 sm:h-18 text-xl sm:text-2xl" : "w-10 h-10 sm:w-14 sm:h-14 text-sm sm:text-lg"
                      } rounded-xl bg-purple-50 border border-purple-200 text-[#7C3AED] flex items-center justify-center font-mono font-extrabold mb-2 shadow-2xs`}
                    >
                      {college.name.charAt(0)}
                    </div>
                  )}

                  <h3 className={`font-bold text-slate-900 line-clamp-2 leading-snug px-1 ${
                    isRank1 ? "text-xs sm:text-base font-extrabold" : "text-[11px] sm:text-sm"
                  }`}>
                    {college.name}
                  </h3>

                  <div className="text-[9px] sm:text-[11px] text-slate-500 font-mono flex items-center justify-center gap-1 mt-1 truncate max-w-full">
                    <MapPin className="w-2.5 h-2.5 shrink-0 text-slate-400" />
                    <span className="truncate">{college.city || "Tamil Nadu"}</span>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-1 text-[10px] sm:text-xs font-mono">
                  <span className="text-slate-500 flex items-center gap-1 text-[9px] sm:text-[11px]">
                    <Users className="w-3 h-3 text-slate-400" />
                    {college.participantCount} <span className="hidden xs:inline">students</span>
                  </span>
                  <span className={`font-black text-xs sm:text-base ${ptColor}`}>
                    {college.totalPoints.toFixed(0)} <span className="text-[9px] sm:text-xs font-normal">pts</span>
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ── REMAINING COLLEGES: ONLY RANK, COLLEGE NAME, POINTS ── */}
        {restColleges.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <div className="px-4 py-2.5 bg-slate-50/90 border-b border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
              <span className="font-bold uppercase tracking-wider text-[10px] sm:text-xs text-slate-700">
                OTHER PARTICIPATING INSTITUTIONS (RANKS 4+)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 min-w-[340px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-4 w-20 text-center">Rank</th>
                    <th className="py-2.5 px-4">College Name</th>
                    <th className="py-2.5 px-4 text-right w-28">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {restColleges.map((college) => (
                    <tr key={college.id} className="hover:bg-purple-50/30 transition-colors">
                      {/* Rank */}
                      <td className="py-2.5 px-4 text-center font-mono">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold">
                          #{college.rank}
                        </span>
                      </td>

                      {/* College Name */}
                      <td className="py-2.5 px-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          {college.logoUrl ? (
                            <img
                              src={college.logoUrl}
                              alt={college.name}
                              className="w-6 h-6 rounded object-contain bg-white p-0.5 border border-slate-200 shrink-0"
                              onError={(e) => { e.currentTarget.style.display = "none" }}
                            />
                          ) : (
                            <div className="w-6 h-6 rounded bg-purple-50 border border-purple-200 text-[#7C3AED] font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                              {college.name.charAt(0)}
                            </div>
                          )}
                          <span className="text-xs sm:text-sm">{college.name}</span>
                        </div>
                      </td>

                      {/* Points */}
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-[#7C3AED] text-xs sm:text-sm">
                        {college.totalPoints.toFixed(0)} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
