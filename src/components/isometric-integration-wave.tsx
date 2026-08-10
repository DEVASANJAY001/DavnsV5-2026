import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkles, Globe2 } from "lucide-react"

// Country codes (ISO 3166-1 alpha-2) for enterprise markets DAVNS serves
const flagRows: { code: string; label: string }[][] = [
  [
    { code: "us", label: "United States" },
    { code: "gb", label: "United Kingdom" },
    { code: "de", label: "Germany" },
    { code: "in", label: "India" },
    { code: "jp", label: "Japan" },
    { code: "sg", label: "Singapore" },
    { code: "fr", label: "France" },
    { code: "ca", label: "Canada" },
    { code: "au", label: "Australia" },
    { code: "nl", label: "Netherlands" },
    { code: "se", label: "Sweden" },
    { code: "kr", label: "South Korea" },
  ],
  [
    { code: "br", label: "Brazil" },
    { code: "es", label: "Spain" },
    { code: "it", label: "Italy" },
    { code: "ch", label: "Switzerland" },
    { code: "ua", label: "Ukraine" },
    { code: "id", label: "Indonesia" },
    { code: "my", label: "Malaysia" },
    { code: "ph", label: "Philippines" },
    { code: "za", label: "South Africa" },
    { code: "pl", label: "Poland" },
    { code: "ae", label: "UAE" },
    { code: "sa", label: "Saudi Arabia" },
  ],
  [
    { code: "be", label: "Belgium" },
    { code: "cn", label: "China" },
    { code: "pt", label: "Portugal" },
    { code: "fi", label: "Finland" },
    { code: "dk", label: "Denmark" },
    { code: "no", label: "Norway" },
    { code: "th", label: "Thailand" },
    { code: "vn", label: "Vietnam" },
    { code: "mx", label: "Mexico" },
    { code: "at", label: "Austria" },
    { code: "cz", label: "Czech Republic" },
    { code: "gr", label: "Greece" },
  ],
  [
    { code: "hk", label: "Hong Kong" },
    { code: "il", label: "Israel" },
    { code: "hu", label: "Hungary" },
    { code: "ro", label: "Romania" },
    { code: "hr", label: "Croatia" },
    { code: "ee", label: "Estonia" },
    { code: "lv", label: "Latvia" },
    { code: "lt", label: "Lithuania" },
    { code: "cl", label: "Chile" },
    { code: "ar", label: "Argentina" },
    { code: "nz", label: "New Zealand" },
    { code: "ie", label: "Ireland" },
  ],
]

// Unique float animation profiles for smooth organic motion
const floatProfiles = [
  { y: [0, -8, 0], dur: 3.5 },
  { y: [0, -6, 0], dur: 4.2 },
  { y: [0, -10, 0], dur: 3.8 },
  { y: [0, -5, 0], dur: 4.8 },
  { y: [0, -9, 0], dur: 3.2 },
  { y: [0, -7, 0], dur: 4.5 },
]

export function IsometricIntegrationWave() {
  return (
    <section className="py-16 sm:py-28 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-700 text-xs font-mono mb-4 sm:mb-5 tracking-widest uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            Global Enterprise Reach
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto mb-4 sm:mb-6">
            We connect with your{" "}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-[#FACC15] rounded-xl -rotate-1 scale-110" />
              <span className="relative px-2">entire stack</span>
            </span>
          </h2>

          <p className="text-slate-500 text-sm sm:text-lg max-w-lg mx-auto font-light mb-6 sm:mb-8 px-2">
            Serving enterprises across 50+ countries — integrating with the platforms and legacy systems you already use.
          </p>

          <Link to="/solutions">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer bg-white shadow-sm"
            >
              Explore all integrations
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Flag Wave Grid (Mobile Optimized with Horizontal Scroll Flow) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden w-full"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 90%, transparent 100%)",
          }}
        >
          <div className="flex flex-col items-center gap-2.5 sm:gap-4 py-4 overflow-x-auto no-scrollbar">
            {flagRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex items-center gap-2.5 sm:gap-4 shrink-0"
                style={{
                  transform: `translateX(${rowIdx % 2 === 0 ? "-16px" : "16px"})`,
                }}
              >
                {row.map((item, colIdx) => {
                  const profile = floatProfiles[(rowIdx * 4 + colIdx) % floatProfiles.length]
                  const delay = (rowIdx * row.length + colIdx) * 0.04

                  return (
                    <motion.div
                      key={`${rowIdx}-${colIdx}`}
                      initial={{ opacity: 0, y: 16, scale: 0.8 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{
                        duration: 0.45,
                        delay,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      title={item.label}
                    >
                      <motion.div
                        animate={{ y: profile.y }}
                        transition={{
                          duration: profile.dur,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: delay * 1.5,
                        }}
                        whileHover={{
                          scale: 1.18,
                          rotate: 5,
                          transition: { type: "spring", stiffness: 380, damping: 14 },
                        }}
                        className="w-11 h-11 sm:w-16 sm:h-16 rounded-[14px] sm:rounded-[18px] bg-white flex items-center justify-center cursor-pointer select-none overflow-hidden p-1.5 sm:p-2 border border-slate-100/80"
                        style={{
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
                        }}
                      >
                        <img
                          src={`https://flagcdn.com/w80/${item.code}.png`}
                          srcSet={`https://flagcdn.com/w160/${item.code}.png 2x`}
                          alt={item.label}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-[8px] sm:rounded-[10px] pointer-events-none"
                        />
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom Stats Strip (2 cols on mobile, 4 on desktop) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "50+", label: "Countries served" },
            { value: "24+", label: "Enterprise integrations" },
            { value: "99.98%", label: "System uptime SLA" },
            { value: "< 4ms", label: "Data ingestion latency" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="text-center p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div className="text-xl sm:text-3xl font-extrabold text-slate-900 font-mono">{stat.value}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
