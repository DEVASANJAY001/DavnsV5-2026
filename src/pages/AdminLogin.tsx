import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Key,
  Sparkles,
  ArrowLeft,
  Server,
  Terminal,
  Activity,
  Cpu,
  Fingerprint,
  Radio,
  HelpCircle,
  LockKeyhole
} from "lucide-react"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { loginWithEmail, loginWithGoogle, currentUser, userProfile, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser && userProfile) {
      if (isAdmin) {
        navigate("/admin", { replace: true })
      } else {
        navigate("/dashboard", { replace: true })
      }
    }
  }, [currentUser, userProfile, isAdmin, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please enter your administrative credentials.")
      return
    }

    setIsSubmitting(true)
    try {
      await loginWithEmail(email, password)
      navigate("/admin", { replace: true })
    } catch (err: any) {
      console.error(err)
      toast.error("Authentication failed. Please verify your admin credentials.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleAdminLogin = async () => {
    try {
      setIsSubmitting(true)
      await loginWithGoogle()
      navigate("/admin", { replace: true })
    } catch (err: any) {
      console.error(err)
      if (err.code !== "auth/popup-closed-by-user" && !err.message?.includes("closed")) {
        toast.error("Google sign in failed.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-950 text-slate-100 selection:bg-purple-500/20 selection:text-purple-900">
      
      {/* ========================================================= */}
      {/* LEFT PANE: Mission Control & Security Clearance Showcase */}
      {/* ========================================================= */}
      <div className="relative w-full lg:w-[48%] xl:w-[52%] bg-gradient-to-br from-black via-[#060811] to-[#160a2b] p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-purple-950/60">
        
        {/* Cyber Hologram Glows & Scanline Grid */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-indigo-700/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#4c1d95_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />

        {/* Top Security Clearance Badge */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-purple-900/30 border border-purple-500/30 backdrop-blur-md flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 shadow-inner">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight block">DAVNS</span>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase -mt-1 block">
                ADMIN CLEARANCE
              </span>
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>LEVEL 5 VAULT</span>
          </div>
        </div>

        {/* Center Mission Control Narrative */}
        <div className="relative z-10 my-10 lg:my-auto max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-6">
            <LockKeyhole className="w-3.5 h-3.5 text-yellow-400" />
            <span>PLATFORM GOVERNANCE & TELEMETRY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
            Autonomous Operations & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">Infrastructure Matrix</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-8">
            Restricted gateway for DAVNS engineering directors, system operators, and infrastructure leads. Real-time fleet controls and audit verification.
          </p>

          {/* Security Diagnostic Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-purple-900/30 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                <Fingerprint className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Role-Based Access</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">Zero-trust cryptographic validation with session tokens.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-purple-900/30 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-yellow-300 flex items-center justify-center shrink-0 mt-0.5">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Audit Logging</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">Continuous telemetry logs stored on immutable storage.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-purple-900/30 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Fleet Clusters</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">Automated health checks across all cloud nodes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-purple-900/30 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Real-Time Routing</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">Sub-5ms ticket & telemetry state synchronization.</p>
              </div>
            </div>
          </div>

          {/* Security Terminal Simulation Pill */}
          <div className="p-4 rounded-2xl bg-black/60 border border-purple-900/40 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-purple-900/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-semibold">SECURITY VAULT PROTOCOL</span>
              </div>
              <span className="text-amber-400 font-bold">256-BIT ENCRYPTION</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div>&gt; TLS 1.3 handshake: <span className="text-emerald-400">VERIFIED</span></div>
              <div>&gt; Geo-perimeter check: <span className="text-emerald-400">PASSED</span></div>
              <div>&gt; Multi-tenant sandbox isolation: <span className="text-purple-300">ACTIVE</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Clearance Notice */}
        <div className="relative z-10 pt-6 border-t border-purple-950/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <span>NOTICE: Unauthorized access attempts are monitored & audited.</span>
          <span>© 2026 DAVNS Core</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PANE: Administrative Clearance Form Console */}
      {/* ========================================================= */}
      <div className="w-full lg:w-[52%] xl:w-[48%] min-h-[calc(100vh-2rem)] lg:min-h-screen bg-white text-slate-900 p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between relative overflow-y-auto">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between w-full mb-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-600 hover:text-slate-950 transition-colors py-2 px-3 rounded-full hover:bg-slate-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>User Portal</span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-950 px-3.5 py-1.5 rounded-full hover:bg-slate-100 transition-all"
          >
            <span>Main Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Center Admin Form */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          
          {/* Header Title */}
          <div className="mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 text-[#7C3AED] flex items-center justify-center mb-3.5 shadow-2xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#7C3AED] text-[10px] font-mono uppercase tracking-widest font-bold mb-2">
              <Lock className="w-3 h-3" />
              <span>ADMIN CLEARANCE GATEWAY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Administrative Login
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light mt-1.5">
              Authenticate with authorized DAVNS credentials to access the governance console.
            </p>
          </div>

          {/* Google Workspace SSO Button */}
          <button
            type="button"
            onClick={handleGoogleAdminLogin}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-2xs hover:shadow-xs cursor-pointer mb-5 disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google Workspace</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              OR ADMIN CREDENTIALS
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@davns.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                Master Clearance Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-950 text-white hover:bg-slate-800 rounded-2xl py-3.5 px-6 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Key className="w-4 h-4 text-[#FACC15]" />
                <span>{isSubmitting ? "Verifying Clearance..." : "Authenticate Admin Clearance"}</span>
              </button>
            </div>
          </form>

        </div>

        {/* Bottom Support Link */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1 text-slate-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clearance issues?</span>
          </div>
          <a href="mailto:admin@davns.in" className="text-[#7C3AED] hover:underline">
            Contact Engineering Lead
          </a>
        </div>

      </div>

    </div>
  )
}
