import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight, User, LogOut, LayoutDashboard, ShieldCheck, LifeBuoy, ChevronDown } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"

interface NavLink {
  name: string
  href: string
  badge?: string
}

const navLinks: NavLink[] = [
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement | null>(null)

  const { currentUser, userProfile, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
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
    setIsUserMenuOpen(false)
  }, [pathname])

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsUserMenuOpen(false)
    await logout()
    navigate("/")
  }

  // Calculate user initials
  const userInitials = (userProfile?.displayName || currentUser?.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3.5 sm:px-8 lg:px-12 pt-3 sm:pt-6">
      <nav
        aria-label="Main Navigation"
        className={`w-full max-w-7xl transition-all duration-300 border backdrop-blur-2xl ${
          isMobileMenuOpen
            ? "rounded-[32px] bg-white border-slate-200 shadow-2xl p-5"
            : isScrolled
            ? "rounded-full bg-white/95 border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] py-3 px-5 sm:px-10"
            : "rounded-full bg-white/85 border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-3.5 px-5 sm:px-10"
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none rounded-full shrink-0"
            aria-label="DAVNS Industries Home"
          >
            <img
              src="/images/davns-logo-alt.png"
              alt="DAVNS Industries Logo"
              className="h-7 sm:h-8 w-auto object-contain brightness-0 contrast-200 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-slate-900 font-semibold bg-slate-100"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] border border-purple-200 text-[9px] font-mono font-black tracking-wider uppercase animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Section: Auth + Project Action + Mobile Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* ── User Auth Button / Profile Avatar ── */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 py-1.5 pl-2 pr-3 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer group shadow-2xs"
                  aria-label="User Account Menu"
                >
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={userProfile?.displayName || "User"}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                      className="w-7 h-7 rounded-full object-cover border border-slate-300"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white font-mono font-bold text-xs flex items-center justify-center">
                      {userInitials}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-800 max-w-[110px] truncate hidden sm:inline">
                    {userProfile?.displayName || currentUser.email?.split("@")[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-slate-200 shadow-xl p-2 z-50 animate-fade-in-simple text-slate-800 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {userProfile?.displayName || "User"}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono truncate">
                        {currentUser.email}
                      </div>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#7C3AED]" />
                      <span>User Dashboard</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-purple-700 hover:bg-purple-50 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="px-4 sm:px-5 py-2 rounded-full border border-slate-300 hover:border-slate-400 bg-white/80 hover:bg-slate-50 text-slate-800 text-xs font-mono font-bold uppercase transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs">
                  Sign In
                </button>
              </Link>
            )}

            {/* Start a project */}
            <Link to="/get-started" className="hidden sm:inline-flex">
              <Button
                size="sm"
                className="bg-black text-white hover:bg-slate-800 rounded-full px-5 sm:px-6 py-2.5 text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
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

        {/* Mobile Full-Fill Slide-down Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-1 border-t border-slate-100 mt-4 space-y-1.5 animate-fade-in-simple w-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-black bg-slate-100 font-semibold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-[#EDE9FE] text-[#7C3AED] text-[10px] font-mono font-black">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}

            {/* User & Action Links in Mobile Drawer */}
            <div className="pt-3 border-t border-slate-100 space-y-2 mt-2">
              {currentUser ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm transition-colors"
                  >
                    <span>Go to Dashboard</span>
                    <LayoutDashboard className="w-4 h-4 text-[#7C3AED]" />
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-sm transition-colors"
                    >
                      <span>Admin Control Center</span>
                      <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-red-600 font-medium text-sm hover:bg-red-50 transition-colors"
                  >
                    <span>Sign Out</span>
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center border border-slate-300 text-slate-900 py-3 rounded-2xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Sign In / Register
                </Link>
              )}

              <Link
                to="/get-started"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-black text-white py-3.5 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm"
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
