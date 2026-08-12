import { motion } from "framer-motion"
import { Building2, Trophy, Users, TrendingUp } from "lucide-react"
import { College } from "@/lib/scoreboard-service"

interface CollegeLeaderboardProps {
  colleges: College[]
}

function CollegeLogo({ logoUrl, name }: { logoUrl: string; name: string }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain bg-white border border-slate-200 p-0.5 shrink-0"
        onError={(e) => {
          e.currentTarget.style.display = "none"
          e.currentTarget.nextElementSibling?.classList.remove("hidden")
        }}
      />
    )
  }
  return null
}

function CollegeInitialBadge({ name, rank }: { name: string; rank: number }) {
  const colors = [
    "bg-amber-400 text-amber-950",
    "bg-slate-300 text-slate-900",
    "bg-amber-700 text-white",
  ]
  const colorClass = rank <= 3 ? colors[rank - 1] : "bg-purple-100 text-purple-800"
  return (
    <div
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-mono font-extrabold text-sm shrink-0 ${colorClass}`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

export function PerspectiveCollegeLeaderboard({ colleges }: CollegeLeaderboardProps) {
  if (colleges.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 text-slate-400 font-mono text-sm">
            No college data yet. Results will appear here after the challenge.
          </div>
        </div>
      </section>
    )
  }

  const topThree = colleges.slice(0, 3)
  const rest = colleges.slice(3)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-mono font-bold tracking-wider uppercase mb-4">
            <Building2 className="w-3.5 h-3.5" />
            COLLEGE RANKINGS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Institution Leaderboard
          </h2>
          <p className="mt-2 text-slate-500 font-light">
            Ranked by cumulative points from all participating students
          </p>
        </div>

        {/* Top 3 podium cards */}
        {topThree.length >= 1 && (
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {/* Reorder for podium effect: 2nd, 1st, 3rd */}
            {[topThree[1], topThree[0], topThree[2]]
              .filter(Boolean)
              .map((college, visualIdx) => {
                const isFirst = college.rank === 1
                const podiumHeights = ["h-28", "h-36", "h-24"]
                const podiumH = podiumHeights[visualIdx] || "h-24"
                const rankBgMap: Record<number, string> = {
                  1: "bg-amber-400 text-amber-950",
                  2: "bg-slate-200 text-slate-700",
                  3: "bg-amber-700/80 text-white",
                }
                const cardBgMap: Record<number, string> = {
                  1: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 shadow-amber-200/50",
                  2: "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300",
                  3: "bg-gradient-to-br from-orange-50 to-amber-50 border-amber-200",
                }
                return (
                  <motion.div
                    key={college.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: college.rank * 0.08 }}
                    className={`rounded-3xl border p-6 text-center shadow-lg flex flex-col items-center gap-3 ${
                      cardBgMap[college.rank] || "bg-white border-slate-200"
                    } ${isFirst ? "ring-2 ring-amber-400/50 shadow-amber-200" : ""}`}
                  >
                    {/* Rank badge */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-extrabold text-base shrink-0 ${
                        rankBgMap[college.rank] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {college.rank === 1 ? "🥇" : college.rank === 2 ? "🥈" : "🥉"}
                    </div>

                    {/* Logo or Initial */}
                    {college.logoUrl ? (
                      <img
                        src={college.logoUrl}
                        alt={college.name}
                        className="w-16 h-16 rounded-2xl object-contain bg-white border border-slate-200 p-1"
                        onError={(e) => { e.currentTarget.src = "" }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-extrabold text-2xl text-slate-600 font-mono">
                        {college.name.charAt(0)}
                      </div>
                    )}

                    <div>
                      <div className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">{college.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{college.city}, {college.state}</div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Users className="w-3.5 h-3.5" />
                        {college.participantCount}
                      </div>
                      <div className="text-emerald-600 font-extrabold text-sm">{college.totalPoints.toFixed(0)} pts</div>
                    </div>
                  </motion.div>
                )
              })}
          </div>
        )}

        {/* Rest of colleges table */}
        {rest.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-white text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-5">Rank</th>
                    <th className="py-3.5 px-5">Institution</th>
                    <th className="py-3.5 px-5">Location</th>
                    <th className="py-3.5 px-5">Students</th>
                    <th className="py-3.5 px-5 text-right">Total Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rest.map((college) => (
                    <motion.tr
                      key={college.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="hover:bg-white transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-[11px] flex items-center justify-center">
                          #{college.rank}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          {college.logoUrl ? (
                            <img
                              src={college.logoUrl}
                              alt={college.name}
                              className="w-8 h-8 rounded-lg object-contain bg-white border border-slate-200 p-0.5 shrink-0"
                              onError={(e) => { e.currentTarget.style.display = "none" }}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                              {college.name.charAt(0)}
                            </div>
                          )}
                          <span className="font-semibold text-slate-900">{college.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 font-mono text-slate-500">{college.city}, {college.state}</td>
                      <td className="py-3.5 px-5 font-mono text-slate-700">{college.participantCount}</td>
                      <td className="py-3.5 px-5 text-right font-extrabold text-emerald-600 font-mono">
                        {college.totalPoints.toFixed(0)}
                      </td>
                    </motion.tr>
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
