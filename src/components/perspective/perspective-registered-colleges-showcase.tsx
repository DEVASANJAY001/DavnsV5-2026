import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Building2,
  Users,
  Search,
  MapPin,
  CheckCircle2,
  Trophy,
  ExternalLink,
  Filter,
  ChevronDown,
  Globe,
  X,
  ArrowUpRight,
} from "lucide-react"
import { College } from "@/lib/scoreboard-service"

interface RegisteredCollegesShowcaseProps {
  colleges: College[]
  hideStudentCounts?: boolean
}

// Distinct institutional color palettes for handcrafted card accents
const CAMPUS_PALETTES = [
  {
    bgGradient: "from-purple-500/10 via-purple-500/5 to-transparent",
    accentBorder: "group-hover:border-purple-300",
    badgeBg: "bg-purple-50 text-[#7C3AED] border-purple-200/80",
    avatarGrad: "from-[#7C3AED] to-indigo-600",
    iconColor: "text-[#7C3AED]",
  },
  {
    bgGradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    accentBorder: "group-hover:border-amber-300",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200/80",
    avatarGrad: "from-amber-500 to-orange-600",
    iconColor: "text-amber-600",
  },
  {
    bgGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    accentBorder: "group-hover:border-emerald-300",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    avatarGrad: "from-emerald-600 to-teal-700",
    iconColor: "text-emerald-600",
  },
  {
    bgGradient: "from-sky-500/10 via-sky-500/5 to-transparent",
    accentBorder: "group-hover:border-sky-300",
    badgeBg: "bg-sky-50 text-sky-800 border-sky-200/80",
    avatarGrad: "from-sky-600 to-blue-700",
    iconColor: "text-sky-600",
  },
  {
    bgGradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    accentBorder: "group-hover:border-rose-300",
    badgeBg: "bg-rose-50 text-rose-800 border-rose-200/80",
    avatarGrad: "from-rose-500 to-pink-600",
    iconColor: "text-rose-600",
  },
  {
    bgGradient: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    accentBorder: "group-hover:border-indigo-300",
    badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-200/80",
    avatarGrad: "from-indigo-600 to-violet-700",
    iconColor: "text-indigo-600",
  },
]

export function PerspectiveRegisteredCollegesShowcase({
  colleges,
  hideStudentCounts = false,
}: RegisteredCollegesShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string>("all")

  // Extract unique cities for the filter dropdown
  const availableCities = useMemo(() => {
    const set = new Set<string>()
    colleges.forEach((c) => {
      if (c.city && c.city.trim() && c.city !== "Tamil Nadu") {
        set.add(c.city.trim())
      }
    })
    return Array.from(set).sort()
  }, [colleges])

  const filteredColleges = useMemo(() => {
    return colleges.filter((c) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.city && c.city.toLowerCase().includes(q)) ||
        (c.state && c.state.toLowerCase().includes(q))

      const matchesCity =
        selectedCity === "all" ||
        (c.city && c.city.toLowerCase().trim() === selectedCity.toLowerCase().trim())

      return matchesSearch && matchesCity
    })
  }, [colleges, searchQuery, selectedCity])

  const totalParticipants = colleges.reduce((sum, c) => sum + (c.participantCount || 0), 0)

  return (
    <div className="space-y-8 sm:space-y-12 pb-16">
      
      {/* ── Editorial Header ── */}
      <section className="relative pt-24 sm:pt-32 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white overflow-hidden">
        {/* Atmospheric gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.22),transparent_65%)] pointer-events-none" />
        <div className="absolute -top-24 right-0 w-[450px] h-[450px] bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[350px] h-[350px] bg-[#FACC15]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Phase Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] sm:text-xs font-mono font-bold text-[#FACC15] mb-5 backdrop-blur-md shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CAMPUS DIRECTORY • ASSESSMENT ACTIVE</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            Participating Institutions &{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#FACC15] rounded-xl sm:rounded-2xl -rotate-1 scale-105" />
              <span className="relative px-2 sm:px-3 text-slate-950">Colleges</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3.5 sm:mt-4 text-xs sm:text-base md:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed px-2"
          >
            A verified directory of academic institutions whose students are stepping forward for the <strong className="text-white font-medium">DAVNS Perspective 2026 Thinking Challenge</strong>.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-2xl mx-auto mt-6 sm:mt-8 px-2"
          >
            <div className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center backdrop-blur-sm">
              <div className="text-xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                {colleges.length}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                Institutions
              </div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center backdrop-blur-sm">
              <div className="text-xl sm:text-3xl font-extrabold text-[#7C3AED] font-mono">
                {hideStudentCounts ? "Active" : totalParticipants}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                {hideStudentCounts ? "Verified Entry" : "Students"}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center backdrop-blur-sm">
              <div className="text-xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                100%
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                Free Entry
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Search & Filter Controls ── */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-2xs">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search college, city, or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#7C3AED] transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Clean Filter Dropdown Selector */}
          <div className="relative shrink-0">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full sm:w-auto appearance-none pl-9 pr-9 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-mono font-bold text-slate-800 outline-none focus:border-[#7C3AED] transition-colors shadow-2xs cursor-pointer"
            >
              <option value="all">Filter: All Cities ({colleges.length})</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Counter Info Strip */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-slate-500 mt-2.5 px-2">
          <span>
            Showing <strong className="text-slate-900 font-bold">{filteredColleges.length}</strong> of {colleges.length} registered institutions
          </span>
          <span className="hidden sm:inline text-slate-400">
            Scores release post-assessment
          </span>
        </div>
      </section>

      {/* ── 2-Column Mobile Grid of Handcrafted College Cards ── */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {filteredColleges.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center text-slate-500">
            <Building2 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 text-slate-300" />
            <div className="font-bold text-slate-900 text-sm sm:text-base mb-1">No colleges match your search</div>
            <p className="text-xs text-slate-400 font-light">
              Try searching with a different campus name or resetting the city filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
            {filteredColleges.map((college, idx) => {
              const palette = CAMPUS_PALETTES[idx % CAMPUS_PALETTES.length]
              const studentCount = college.participantCount || 0

              return (
                <motion.div
                  key={college.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.25) }}
                  className={`group relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-purple-300 p-3 sm:p-5 md:p-6 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden bg-gradient-to-b ${palette.bgGradient}`}
                >
                  {/* Top Row: Crest / Logo + Website Link if available */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5 sm:mb-3.5">
                      {/* Logo / Crest Frame */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 shadow-2xs p-1 sm:p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                        {college.logoUrl ? (
                          <img
                            src={college.logoUrl}
                            alt={college.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                              e.currentTarget.nextElementSibling?.classList.remove("hidden")
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full rounded-lg sm:rounded-xl bg-gradient-to-br ${palette.avatarGrad} text-white font-mono font-black text-sm sm:text-lg flex items-center justify-center ${
                            college.logoUrl ? "hidden" : ""
                          }`}
                        >
                          {college.name.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      {/* Official Website Link if configured */}
                      {college.websiteUrl ? (
                        <a
                          href={college.websiteUrl.startsWith("http") ? college.websiteUrl : `https://${college.websiteUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 sm:p-1.5 rounded-lg bg-slate-100/80 hover:bg-purple-100 text-slate-500 hover:text-[#7C3AED] transition-colors cursor-pointer"
                          title="Visit official college website"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      ) : null}
                    </div>

                    {/* College Title */}
                    <h3 className="text-xs sm:text-sm md:text-[1.02rem] font-extrabold text-slate-900 leading-snug tracking-tight group-hover:text-[#7C3AED] transition-colors line-clamp-2">
                      {college.name}
                    </h3>

                    {/* Location Tag */}
                    <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 font-mono mt-1 sm:mt-1.5 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {[college.city, college.state].filter(Boolean).join(", ") || "Tamil Nadu, India"}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Strip: Simplified, concise representation */}
                  <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3.5 border-t border-slate-100/90 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg ${palette.badgeBg} flex items-center justify-center shrink-0`}>
                        {hideStudentCounts ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Users className="w-3 h-3" />
                        )}
                      </div>
                      <div className="font-bold text-slate-900 font-mono text-[10.5px] sm:text-xs leading-none">
                        {hideStudentCounts ? "Verified" : `${studentCount} Students`}
                      </div>
                    </div>

                    {college.websiteUrl ? (
                      <a
                        href={college.websiteUrl.startsWith("http") ? college.websiteUrl : `https://${college.websiteUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9.5px] sm:text-[10px] font-mono font-bold text-slate-400 hover:text-[#7C3AED] flex items-center gap-0.5 transition-colors"
                      >
                        <span className="hidden sm:inline">Website</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <div className="text-[9.5px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide group-hover:text-[#7C3AED] flex items-center gap-0.5 transition-colors">
                        <span className="hidden sm:inline">DAVNS</span>
                        <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    )}
                  </div>

                </motion.div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Official Post-Assessment Announcement Strip ── */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-slate-900 text-white border border-slate-800 p-4 sm:p-7 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/30 text-[9.5px] sm:text-[10px] font-mono font-bold uppercase">
              <Trophy className="w-3 h-3" />
              SCORES RELEASE TIMELINE
            </div>
            <h4 className="text-sm sm:text-lg font-extrabold text-white">
              Official Leaderboard & Institutional Trophies
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl">
              Following completion of the 6-day challenge rounds, verified scores and institutional awards will be published live on this portal.
            </p>
          </div>

          <div className="shrink-0">
            <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 font-mono text-[11px] sm:text-xs text-amber-300 font-bold">
              Challenge Window: Sep 1 – Sep 6, 2026
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
