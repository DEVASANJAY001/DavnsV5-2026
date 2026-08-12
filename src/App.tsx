import { useEffect } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { AuthProvider, useAuth } from "@/context/AuthContext"
import { trackPageView } from "@/lib/analytics-tracker"

import HomePage from "@/pages/Home"
import AboutPage from "@/pages/About"
import ServicesPage from "@/pages/Services"
import SolutionsPage from "@/pages/Solutions"
import ProjectsPage from "@/pages/Projects"
import ContactPage from "@/pages/Contact"
import GetStartedPage from "@/pages/GetStarted"
import CarDealershipsPage from "@/pages/CarDealerships"
import PerspectivePage from "@/pages/Perspective"
import PerspectiveScoreboardPage from "@/pages/PerspectiveScoreboard"
import PrivacyPage from "@/pages/Privacy"
import TermsPage from "@/pages/Terms"
import NotFoundPage from "@/pages/NotFound"
import LoginPage from "@/pages/Login"
import AdminLoginPage from "@/pages/AdminLogin"
import UserDashboard from "@/pages/Dashboard"
import AdminDashboard from "@/pages/AdminDashboard"

function ScrollToTopAndTrack() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    // Non-blocking visitor telemetry log
    trackPageView(pathname)
  }, [pathname])

  return null
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          <span>AUTHENTICATING SESSION...</span>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          <span>VERIFYING SECURITY CLEARANCE...</span>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTopAndTrack />
      <Toaster position="bottom-right" theme="dark" richColors />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/perspective" element={<PerspectivePage />} />
        <Route path="/perspective-2026" element={<PerspectivePage />} />
        <Route path="/perspective/scoreboard" element={<PerspectiveScoreboardPage />} />
        <Route path="/car-dealerships" element={<CarDealershipsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}
