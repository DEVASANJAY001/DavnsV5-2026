import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff, Key, Sparkles } from "lucide-react"
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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-purple-500/20 selection:text-purple-900 flex flex-col justify-between">
      <GlassmorphismNav />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-36 pb-20 relative overflow-hidden">
        {/* Ambient Subtle Light Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(237,233,254,0.7),transparent_70%)] pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-slate-200 rounded-[36px] p-7 sm:p-9 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            {/* Top Shield Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 text-[#7C3AED] flex items-center justify-center mx-auto mb-3.5 shadow-2xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#7C3AED] text-[10px] font-mono uppercase tracking-widest font-bold mb-2">
                <Lock className="w-3 h-3" />
                ADMIN CLEARANCE PORTAL
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                DAVNS Admin Portal
              </h1>
              <p className="text-xs text-slate-500 font-light mt-1">
                Authorized engineering & platform governance login
              </p>
            </div>

            {/* Google Admin Login */}
            <button
              type="button"
              onClick={handleGoogleAdminLogin}
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-2xs cursor-pointer mb-5 disabled:opacity-50"
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
              <span>Sign in with Google Workspace</span>
            </button>

            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                OR ADMIN CREDENTIALS
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                  Admin Email
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
                  Master Password
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
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
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
                  <Key className="w-4 h-4 text-[#FACC15]" />
                  <span>{isSubmitting ? "Verifying clearance..." : "Authenticate Admin"}</span>
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <Link to="/login" className="hover:text-slate-900 transition-colors">
                ← User Login
              </Link>
              <Link to="/" className="hover:text-slate-900 transition-colors">
                Back to Website
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
