import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { PhoneInputWithCountry } from "@/components/ui/phone-input-with-country"
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  Server,
  Cpu,
  ArrowLeft,
  HelpCircle,
  LockKeyhole,
  Globe2,
  CheckCircle2
} from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login"
  const [mode, setMode] = useState<"login" | "register">(initialMode)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  
  // Phone numbers state for registration
  const [phone, setPhone] = useState("")
  const [dialCode, setDialCode] = useState("+91")
  const [altPhone, setAltPhone] = useState("")
  const [altDialCode, setAltDialCode] = useState("+91")

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetOpen, setIsResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState("")

  const { loginWithEmail, registerWithEmail, loginWithGoogle, currentUser, userProfile, isAdmin, resetPassword, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect on login: Admin -> /admin, Standard User -> /dashboard (or previous requested page)
  useEffect(() => {
    if (currentUser && !loading) {
      const isUserAdmin = Boolean(
        isAdmin ||
        userProfile?.role === "admin" ||
        (currentUser.email && ["contact@davns.in", "admin@davns.in", "devas@davns.in"].includes(currentUser.email.toLowerCase()))
      )

      if (isUserAdmin) {
        navigate("/admin", { replace: true })
      } else {
        const from = (location.state as any)?.from?.pathname
        if (from && from !== "/login" && from !== "/admin/login" && from !== "/admin") {
          navigate(from, { replace: true })
        } else {
          navigate("/dashboard", { replace: true })
        }
      }
    }
  }, [currentUser, userProfile, isAdmin, loading, navigate, location])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please enter both email and password.")
      return
    }

    setIsSubmitting(true)
    try {
      if (mode === "register") {
        if (!fullName.trim()) {
          toast.error("Please enter your full name.")
          setIsSubmitting(false)
          return
        }
        if (!phone.trim()) {
          toast.error("Please enter your primary phone number.")
          setIsSubmitting(false)
          return
        }

        const fullPrimaryPhone = `${dialCode} ${phone.trim()}`
        const fullAltPhone = altPhone.trim() ? `${altDialCode} ${altPhone.trim()}` : ""

        await registerWithEmail(email, password, fullName.trim(), fullPrimaryPhone, fullAltPhone)
      } else {
        await loginWithEmail(email, password)
        const isEmailAdmin = ["contact@davns.in", "admin@davns.in", "devas@davns.in"].includes(email.trim().toLowerCase())
        if (isEmailAdmin) {
          navigate("/admin", { replace: true })
          return
        }
      }
    } catch (err: any) {
      console.error(err)
      let msg = "Authentication failed. Please check your credentials."
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        msg = "Invalid email or password."
      } else if (err.code === "auth/email-already-in-use") {
        msg = "This email is already registered. Please sign in instead."
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters."
      }
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true)
      await loginWithGoogle()
    } catch (err: any) {
      console.error(err)
      if (err.code !== "auth/popup-closed-by-user" && !err.message?.includes("closed")) {
        toast.error("Google sign in failed. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resetEmail) {
      toast.error("Please enter your registered email.")
      return
    }
    try {
      await resetPassword(resetEmail)
      setIsResetOpen(false)
      setResetEmail("")
      toast.success("Password reset email sent! Check your inbox.")
    } catch (err: any) {
      toast.error("Failed to send reset link. Please verify the email address.")
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-950 text-slate-100 selection:bg-purple-500/20 selection:text-purple-900">
      
      {/* ========================================================= */}
      {/* LEFT PANE: Full-Screen Enterprise Showcase (Desktop/Tablet) */}
      {/* ========================================================= */}
      <div className="relative w-full lg:w-[48%] xl:w-[52%] bg-gradient-to-br from-slate-950 via-[#070b14] to-[#120a24] p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80">
        
        {/* Ambient Glows & Cybernetic Grid */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

        {/* Top Header inside Left Pane */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
              <img
                src="/images/davns-logo-alt.png"
                alt="DAVNS Industries"
                className="h-full w-auto object-contain brightness-0 invert"
              />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight block">DAVNS</span>
              <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase -mt-1 block">
                Enterprise Cloud
              </span>
            </div>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Systems Operational 99.99%</span>
            <span className="sm:hidden">Online</span>
          </div>
        </div>

        {/* Center Dynamic Brand Narrative */}
        <div className="relative z-10 my-10 lg:my-auto max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>UNIFIED CLIENT & PROJECT MATRIX v5.4</span>
          </div>

          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
            {mode === "login" ? (
              <>
                Accelerating <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-amber-300">Intelligent Architecture</span> for Modern Leaders
              </>
            ) : (
              <>
                Build, Deploy & Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-amber-300">Enterprise Systems</span> with Velocity
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-400 font-light leading-relaxed mb-8">
            Access your unified client dashboard, real-time project milestones, automated support desk, and direct engineering collaboration.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Live Telemetry</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">Real-time status on all active tickets and deliverables.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-yellow-300 flex items-center justify-center shrink-0 mt-0.5">
                <LockKeyhole className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Zero-Trust Security</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">AES-256 encrypted transit & role-based cloud permissions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Direct Engineering</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">Seamless escalation to lead architects & tech advisors.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Autonomous AI Core</h4>
                <p className="text-xs text-slate-400 font-light mt-0.5">Automated workflow tracking & predictive optimization.</p>
              </div>
            </div>
          </div>

          {/* Real-Time Telemetry Node Badge */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <Globe2 className="w-4 h-4 text-purple-400" />
              <span className="text-slate-300">Cluster Node:</span>
              <span className="text-white font-semibold">Asia-South (IN-MUM-01)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">4ms</span>
              <span className="text-slate-500">|</span>
              <span className="text-purple-300">TLS 1.3</span>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Compliance Seal */}
        <div className="relative z-10 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> SOC-2 Type II
            </span>
            <span>•</span>
            <span>ISO/IEC 27001</span>
            <span>•</span>
            <span>GDPR Ready</span>
          </div>
          <span>© 2026 DAVNS Industries</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT PANE: Interactive Full-Screen Authentication Console */}
      {/* ========================================================= */}
      <div className="w-full lg:w-[52%] xl:w-[48%] min-h-[calc(100vh-2rem)] lg:min-h-screen bg-white text-slate-900 p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between relative overflow-y-auto">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between w-full mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-600 hover:text-slate-950 transition-colors py-2 px-3 rounded-full hover:bg-slate-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Website</span>
          </Link>

          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#7C3AED] bg-purple-50 hover:bg-purple-100 border border-purple-200/80 px-3.5 py-1.5 rounded-full transition-all"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Clearance</span>
          </Link>
        </div>

        {/* Center Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          
          {/* Header Title */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              {mode === "login" ? "Welcome back" : "Create client account"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light mt-1.5">
              {mode === "login"
                ? "Enter your credentials to access your unified portal & project desk."
                : "Join the DAVNS enterprise intelligence network in seconds."}
            </p>
          </div>

          {/* Mode Switcher Pill */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6 text-xs font-mono font-bold">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                mode === "register"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
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
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              OR WITH EMAIL
            </span>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Alex Turner"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                Work Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 text-sm text-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            {/* Phone Numbers for Registration */}
            {mode === "register" && (
              <>
                <PhoneInputWithCountry
                  label="Primary Contact Number"
                  required={true}
                  value={phone}
                  onChange={setPhone}
                  selectedDialCode={dialCode}
                  onDialCodeChange={setDialCode}
                  placeholder="98765 43210"
                />

                <PhoneInputWithCountry
                  label="Alternative Phone Number"
                  required={false}
                  optionalBadge={true}
                  value={altPhone}
                  onChange={setAltPhone}
                  selectedDialCode={altDialCode}
                  onDialCodeChange={setAltDialCode}
                  placeholder="Optional secondary contact"
                />
              </>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700">
                  Password <span className="text-red-500">*</span>
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => setIsResetOpen(true)}
                    className="text-xs text-[#7C3AED] hover:underline font-light cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
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

            {mode === "register" && (
              <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                By creating an account, you agree to DAVNS{" "}
                <Link to="/terms" className="text-[#7C3AED] hover:underline">Terms of Service</Link> and{" "}
                <Link to="/privacy" className="text-[#7C3AED] hover:underline">Privacy Policy</Link>.
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-950 text-white hover:bg-slate-800 rounded-2xl py-3.5 px-6 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                <span>{isSubmitting ? "Processing Request..." : mode === "login" ? "Sign In to Console" : "Initialize Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Support Link */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1 text-slate-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need assistance?</span>
          </div>
          <Link to="/contact" className="text-[#7C3AED] hover:underline">
            Contact Support Desk
          </Link>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {isResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in-simple">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Reset Password</h3>
            <p className="text-xs text-slate-500 font-light mb-4">
              Enter your account email to receive a password reset link.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm outline-none focus:border-[#7C3AED]"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsResetOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-semibold hover:bg-slate-50 text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-mono font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Send Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
