import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Projects", href: "/projects" },
  { name: "Dealership AI", href: "/car-dealerships" },
  { name: "Contact", href: "/contact" },
]

export function GlassmorphismNav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pt-4 sm:pt-6">
      <nav
        aria-label="Main Navigation"
        className={`w-full max-w-5xl rounded-full transition-all duration-300 border backdrop-blur-xl ${
          isScrolled
            ? "bg-white/95 border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] py-2.5 px-5 sm:px-7"
            : "bg-white/85 border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3 px-5 sm:px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo in Crisp Black */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none rounded-full"
            aria-label="DAVNS Industries Home"
          >
            <img
              src="/images/davns-logo-alt.png"
              alt="DAVNS Industries Logo"
              className="h-7 sm:h-8 w-auto object-contain brightness-0 contrast-200 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-slate-900 font-semibold bg-slate-100"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/get-started" className="hidden sm:inline-flex">
              <Button
                size="sm"
                className="bg-black text-white hover:bg-slate-800 rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              >
                <span>Start a project</span>
              </Button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 border-t border-slate-100 mt-3 space-y-1.5 animate-fade-in-simple">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-black bg-slate-100 font-semibold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
            <div className="pt-2">
              <Link
                to="/get-started"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-black text-white py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm"
              >
                Start a project
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
