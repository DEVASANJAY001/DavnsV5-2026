import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Mail, MapPin, Phone, Linkedin, Twitter, Github } from "lucide-react"

const footerLinks = {
  platform: {
    title: "Platform",
    links: [
      { name: "AI Agents", href: "/services" },
      { name: "Dealership AI", href: "/car-dealerships" },
      { name: "Computer Vision", href: "/services" },
      { name: "Workflow Automation", href: "/services" },
      { name: "Mobile & Web", href: "/services" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About us", href: "/about" },
      { name: "Perspective 2026 (Live)", href: "/perspective" },
      { name: "Score Card (Leaderboard)", href: "/perspective/scoreboard" },
      { name: "Dealership AI", href: "/car-dealerships" },
      { name: "Case studies", href: "/projects" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy policy", href: "/privacy" },
      { name: "Terms of service", href: "/terms" },
      { name: "Enterprise SLA", href: "/contact" },
      { name: "Contact us", href: "/contact" },
    ],
  },
}

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="relative bg-white border-t border-slate-100 overflow-hidden">
      
      {/* ── CTA Banner ── */}
      <div className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.2),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.1),transparent_60%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Ready to build the{" "}
            <span className="text-gradient-warm">future</span>?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto font-light mb-8">
            Start your AI automation journey with a free discovery call with our senior engineers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/get-started">
              <button className="group inline-flex items-center gap-2 bg-[#FACC15] text-slate-900 hover:bg-yellow-400 rounded-full px-8 py-4 text-sm font-extrabold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-yellow">
                Start a project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 bg-white/10 text-white hover:bg-white/15 border border-white/15 rounded-full px-8 py-4 text-sm font-semibold transition-all cursor-pointer">
                Schedule a call
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Footer Body ── */}
      <div className="bg-slate-950 border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Top: Brand + Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-12 gap-10 mb-16">

            {/* Brand column (wider) */}
            <div className="col-span-2 sm:col-span-4 md:col-span-5 space-y-5">
              <Link to="/" className="inline-block">
                <img
                  src="/images/davns-logo-alt.png"
                  alt="DAVNS Industries"
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-slate-400 text-sm font-light leading-relaxed max-w-xs">
                DAVNS Industries engineers custom autonomous AI systems, computer vision inspection pipelines, and scalable enterprise software platforms.
              </p>
              <div className="space-y-2.5 text-sm text-slate-500">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-600 shrink-0" />
                  Chennai, Tamil Nadu, India
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-600 shrink-0" />
                  contact@davns.in
                </div>
              </div>
              <div className="flex items-center gap-3">
                {socials.map((s) => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/15 hover:border-white/20 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Link Columns */}
            {Object.values(footerLinks).map((col) => (
              <div key={col.title} className="col-span-1 sm:col-span-1 md:col-span-2 space-y-4">
                <div className="text-xs font-bold text-white uppercase tracking-widest font-mono">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-slate-500 hover:text-white transition-colors duration-200 font-light"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              © {new Date().getFullYear()} DAVNS Industries Pvt Ltd. All rights reserved. Founded in Chennai, India.
            </div>
            <div className="flex gap-5">
              <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Typography Watermark */}
      <div className="bg-slate-950 w-full select-none pointer-events-none overflow-hidden -mt-6">
        <div className="text-right pr-4 sm:pr-10 opacity-[0.04]">
          <span className="text-[100px] sm:text-[180px] md:text-[260px] font-extrabold tracking-tighter leading-none text-white">
            davns
          </span>
        </div>
      </div>
    </footer>
  )
}
