import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Footer } from "@/components/footer"
import { PhoneInputWithCountry } from "@/components/ui/phone-input-with-country"
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react"
import { toast } from "sonner"

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login"
  const [mode, setMode] = useState<"login" | "register">(initialMode)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  
  // Phone numbers state
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
    } catch (err: any) {
      toast.error("Failed to send reset link. Please check the email address.")
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500/20 selection:text-purple-900 flex flex-col justify-between">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(237,233,254,0.7),transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-lg relative z-10">
          
          {/* Card Container - Transparent & Merged with Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-transparent border-0 shadow-none p-2 sm:p-4 relative"
          >
            {/* Top Logo / Brand Accent */}
            <div className="text-center mb-6">
              <Link to="/" className="inline-block mb-3 transition-transform hover:scale-105">
                <img
                  src="/images/davns-logo-alt.png"
                  alt="DAVNS Industries"
                  className="h-8 w-auto mx-auto brightness-0 contrast-200"
                />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {mode === "login" ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
                {mode === "login"
                  ? "Sign in to access your dashboard, support desk, & tools"
                  : "Join DAVNS Industries enterprise intelligence network"}
              </p>
            </div>

            {/* Mode Switcher Pill */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-6 text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                  mode === "login"
                    ? "bg-white text-slate-900 shadow-xs"
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
                    ? "bg-white text-slate-900 shadow-xs"
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
              className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-2xs hover:shadow-xs cursor-pointer mb-5 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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

            {/* Divider without background */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                OR WITH EMAIL
              </span>
              <div className="flex-1 h-px bg-slate-200" />
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
                  Email Address <span className="text-red-500">*</span>
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
                    label="Primary Phone Number"
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
                    placeholder="Optional backup contact"
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
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
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
                  className="w-full bg-slate-950 text-white hover:bg-slate-800 rounded-full py-3.5 px-6 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Processing..." : mode === "login" ? "Sign In to Account" : "Create Free Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

          </motion.div>

        </div>
      </main>

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
                  className="flex-1 py-2.5 rounded-full border border-slate-200 text-xs font-mono font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-slate-950 text-white text-xs font-mono font-bold hover:bg-slate-800"
                >
                  Send Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
