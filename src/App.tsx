import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import HomePage from "@/pages/Home"
import AboutPage from "@/pages/About"
import ServicesPage from "@/pages/Services"
import SolutionsPage from "@/pages/Solutions"
import ProjectsPage from "@/pages/Projects"
import ContactPage from "@/pages/Contact"
import GetStartedPage from "@/pages/GetStarted"
import CarDealershipsPage from "@/pages/CarDealerships"
import PrivacyPage from "@/pages/Privacy"
import TermsPage from "@/pages/Terms"
import NotFoundPage from "@/pages/NotFound"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="bottom-right" theme="dark" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/car-dealerships" element={<CarDealershipsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
