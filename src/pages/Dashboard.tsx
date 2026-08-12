import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import {
  SupportTicket,
  createTicket,
  sendMessageInTicket,
  editMessageInTicket,
  deleteMessageInTicket,
  subscribeUserTickets,
  TicketStatus,
  TicketPriority,
} from "@/lib/tickets-service"
import { PhoneInputWithCountry } from "@/components/ui/phone-input-with-country"
import { SupportChatLayout } from "@/components/chat/SupportChatLayout"
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  User,
  LogOut,
  Plus,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Menu,
  X,
  Search,
  Filter,
  LifeBuoy,
  Building,
  Phone,
  Mail,
  HelpCircle,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react"
import { toast } from "sonner"

export default function UserDashboard() {
  const { currentUser, userProfile, isAdmin, logout, updateProfileData, loading } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<"overview" | "support" | "profile">("overview")
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  // Smart collapsible sidebar state
  const [isSidebarLockedOpen, setIsSidebarLockedOpen] = useState(false)
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const isExpanded = isSidebarLockedOpen || isSidebarHovered || isMobileNavOpen

  // Google Login / Missing Phone Number Prompt Modal
  const [isPhonePromptOpen, setIsPhonePromptOpen] = useState(false)
  const [promptPhone, setPromptPhone] = useState("")
  const [promptDialCode, setPromptDialCode] = useState("+91")
  const [promptAltPhone, setPromptAltPhone] = useState("")
  const [promptAltDialCode, setPromptAltDialCode] = useState("+91")
  const [isSavingPromptPhone, setIsSavingPromptPhone] = useState(false)

  // Tickets state
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  // New Ticket Modal State
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [newSubject, setNewSubject] = useState("")
  const [newCategory, setNewCategory] = useState("AI Agents & Integration")
  const [newPriority, setNewPriority] = useState<TicketPriority>("medium")
  const [newTicketPhone, setNewTicketPhone] = useState("")
  const [newTicketDialCode, setNewTicketDialCode] = useState("+91")
  const [newTicketAltPhone, setNewTicketAltPhone] = useState("")
  const [newTicketAltDialCode, setNewTicketAltDialCode] = useState("+91")
  const [newInitialMsg, setNewInitialMsg] = useState("")
  const [isCreatingTicket, setIsCreatingTicket] = useState(false)

  // Profile Edit State
  const [editName, setEditName] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editDialCode, setEditDialCode] = useState("+91")
  const [editAltPhone, setEditAltPhone] = useState("")
  const [editAltDialCode, setEditAltDialCode] = useState("+91")
  const [editCompany, setEditCompany] = useState("")
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  const chatEndRef = useRef<HTMLDivElement | null>(null)

  // Check if user has no phone number set (trigger prompt ONLY after 5s if still missing)
  useEffect(() => {
    let timer: any = null

    if (!loading && userProfile) {
      const hasPhone = Boolean(userProfile.phone && userProfile.phone.trim().length > 0)
      if (!hasPhone) {
        // Smooth 5-second delay after entering dashboard
        timer = setTimeout(() => {
          setIsPhonePromptOpen(true)
        }, 5000)
      } else {
        setIsPhonePromptOpen(false)
      }
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [userProfile, loading])

  // Sync profile fields
  useEffect(() => {
    if (userProfile) {
      setEditName(userProfile.displayName || "")
      setEditCompany(userProfile.company || "")

      if (userProfile.phone) {
        // Parse dial code if exists
        const parts = userProfile.phone.split(" ")
        if (parts.length > 1 && parts[0].startsWith("+")) {
          setEditDialCode(parts[0])
          setEditPhone(parts.slice(1).join(" "))
          setNewTicketDialCode(parts[0])
          setNewTicketPhone(parts.slice(1).join(" "))
        } else {
          setEditPhone(userProfile.phone)
          setNewTicketPhone(userProfile.phone)
        }
      }

      if (userProfile.altPhone) {
        const altParts = userProfile.altPhone.split(" ")
        if (altParts.length > 1 && altParts[0].startsWith("+")) {
          setEditAltDialCode(altParts[0])
          setEditAltPhone(altParts.slice(1).join(" "))
          setNewTicketAltDialCode(altParts[0])
          setNewTicketAltPhone(altParts.slice(1).join(" "))
        } else {
          setEditAltPhone(userProfile.altPhone)
          setNewTicketAltPhone(userProfile.altPhone)
        }
      }
    }
  }, [userProfile])

  // Subscribe to real-time user tickets
  useEffect(() => {
    if (!currentUser) return
    const unsubscribe = subscribeUserTickets(currentUser.uid, (data) => {
      setTickets(data)
      setSelectedTicketId((prev) => {
        if (prev && data.some((t) => t.id === prev)) {
          return prev
        }
        return data.length > 0 ? data[0].id : null
      })
    })
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [currentUser])

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [tickets, selectedTicketId])

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId)

  // Handle Google Login Phone Prompt Submit
  const handleSavePromptPhone = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!promptPhone.trim()) {
      toast.error("Please enter a valid primary phone number.")
      return
    }

    setIsSavingPromptPhone(true)
    try {
      const fullPrimary = `${promptDialCode} ${promptPhone.trim()}`
      const fullAlt = promptAltPhone.trim() ? `${promptAltDialCode} ${promptAltPhone.trim()}` : ""
      await updateProfileData({
        phone: fullPrimary,
        altPhone: fullAlt,
      })
      setIsPhonePromptOpen(false)
      toast.success("Phone number verified and saved!")
    } catch (err) {
      toast.error("Failed to save phone number.")
    } finally {
      setIsSavingPromptPhone(false)
    }
  }

  // Send message in ticket thread
  const handleSendMessage = async (ticketId: string, text: string) => {
    if (!text.trim() || !currentUser) return
    const targetTicket = tickets.find((t) => t.id === ticketId)
    if (!targetTicket) return

    try {
      await sendMessageInTicket(
        ticketId,
        {
          senderId: currentUser.uid,
          senderName: userProfile?.displayName || currentUser.email?.split("@")[0] || "User",
          senderRole: "user",
          senderPhoto: currentUser.photoURL || null,
          text: text.trim(),
        },
        targetTicket.messages || []
      )
    } catch (err) {
      toast.error("Failed to send message.")
      throw err
    }
  }

  // Edit message in ticket thread
  const handleEditMessage = async (ticketId: string, messageId: string, newText: string) => {
    const targetTicket = tickets.find((t) => t.id === ticketId)
    if (!targetTicket) return
    await editMessageInTicket(ticketId, messageId, newText, targetTicket.messages || [])
  }

  // Delete message in ticket thread
  const handleDeleteMessage = async (ticketId: string, messageId: string) => {
    const targetTicket = tickets.find((t) => t.id === ticketId)
    if (!targetTicket) return
    await deleteMessageInTicket(ticketId, messageId, targetTicket.messages || [])
  }

  // Create Ticket with Mandatory Phone Number
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSubject.trim() || !newInitialMsg.trim() || !currentUser) {
      toast.error("Please fill in subject and description.")
      return
    }

    if (!newTicketPhone.trim()) {
      toast.error("Please enter your primary contact phone number.")
      return
    }

    const fullPrimary = `${newTicketDialCode} ${newTicketPhone.trim()}`
    const fullAlt = newTicketAltPhone.trim() ? `${newTicketAltDialCode} ${newTicketAltPhone.trim()}` : ""

    setIsCreatingTicket(true)
    try {
      const ticketId = await createTicket({
        userId: currentUser.uid,
        userEmail: currentUser.email || "",
        userName: userProfile?.displayName || currentUser.email?.split("@")[0] || "User",
        userPhoto: currentUser.photoURL || null,
        userPhone: fullPrimary,
        altPhone: fullAlt,
        subject: newSubject.trim(),
        category: newCategory,
        priority: newPriority,
        initialMessage: newInitialMsg.trim(),
      })

      // Also update profile phone if it was empty
      if (!userProfile?.phone) {
        updateProfileData({ phone: fullPrimary, altPhone: fullAlt }).catch(() => {})
      }

      toast.success("Support ticket created! Our engineering team will respond shortly.")
      setIsNewTicketOpen(false)
      setNewSubject("")
      setNewInitialMsg("")
      setSelectedTicketId(ticketId)
      setActiveTab("support")
    } catch (err) {
      toast.error("Failed to create ticket.")
    } finally {
      setIsCreatingTicket(false)
    }
  }

  // Save Profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)
    try {
      const fullPrimary = editPhone.trim() ? `${editDialCode} ${editPhone.trim()}` : ""
      const fullAlt = editAltPhone.trim() ? `${editAltDialCode} ${editAltPhone.trim()}` : ""

      await updateProfileData({
        displayName: editName.trim(),
        phone: fullPrimary,
        altPhone: fullAlt,
        company: editCompany.trim(),
      })
    } catch (err) {
      toast.error("Failed to update profile.")
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  // User initials
  const userInitials = (userProfile?.displayName || currentUser?.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* ── Mobile Top Header ── */}
      <div className="md:hidden bg-slate-950 text-white p-3.5 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/davns-logo-alt.png"
            alt="DAVNS Industries"
            className="h-6 w-auto brightness-0 invert"
          />
          <span className="font-mono text-xs font-bold text-[#FACC15]">DASHBOARD</span>
        </Link>
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 rounded-xl bg-white/10 text-white"
          aria-label="Toggle Mobile Navigation"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Smart Expandable Sidebar Navigation ── */}
      <aside
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={`fixed md:sticky top-0 left-0 z-30 h-screen bg-slate-950 text-white flex flex-col justify-between border-r border-slate-800 transition-all duration-300 ${
          isExpanded ? "w-72 p-6" : "w-20 p-3.5"
        } ${
          isMobileNavOpen
            ? "translate-x-0 !w-72 !p-6"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* ── Connected Sidebar Lock/Collapse Button ── */}
        <button
          onClick={() => setIsSidebarLockedOpen(!isSidebarLockedOpen)}
          className="hidden md:flex absolute -right-3.5 top-7 z-40 w-7 h-7 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] items-center justify-center shadow-lg transition-all cursor-pointer"
          title={isSidebarLockedOpen ? "Collapse Sidebar (Click to lock mini mode)" : "Expand Sidebar (Click to lock expanded)"}
          aria-label="Toggle Sidebar Lock"
        >
          {isSidebarLockedOpen ? (
            <ChevronLeft className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
        </button>

        <div className={isExpanded ? "space-y-6" : "space-y-4 pt-1"}>
          
          {/* Brand Logo - Shown ONLY when expanded */}
          {isExpanded && (
            <div className="flex items-center justify-between overflow-hidden animate-fade-in-simple">
              <Link to="/" className="flex items-center gap-2.5 shrink-0" title="DAVNS Home">
                <img
                  src="/images/davns-logo-alt.png"
                  alt="DAVNS Industries"
                  className="h-7 w-auto brightness-0 invert"
                />
              </Link>
              {isAdmin && (
                <Link to="/admin" title="Admin Control Center">
                  <span className="px-2 py-0.5 rounded-full bg-[#7C3AED] text-white text-[10px] font-mono font-bold shrink-0">
                    ADMIN
                  </span>
                </Link>
              )}
            </div>
          )}

          {/* User Profile Capsule - Moves to top when closed */}
          <div className={`rounded-2xl bg-white/5 border border-white/10 flex items-center transition-all ${
            isExpanded ? "p-3.5 gap-3" : "p-2 justify-center shadow-xs"
          }`}>
            {(currentUser?.photoURL || userProfile?.photoURL) ? (
              <img
                src={currentUser?.photoURL || userProfile?.photoURL || ""}
                alt={userProfile?.displayName || "User"}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
                className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#7C3AED] text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                {userInitials}
              </div>
            )}
            {isExpanded && (
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {userProfile?.displayName || currentUser?.email?.split("@")[0]}
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate">
                  {currentUser?.email}
                </div>
              </div>
            )}
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5 font-mono text-xs">
            {/* Overview */}
            <button
              onClick={() => {
                setActiveTab("overview")
                setIsMobileNavOpen(false)
              }}
              title="Overview"
              className={`w-full flex items-center rounded-2xl transition-all cursor-pointer ${
                isExpanded ? "px-4 py-3 gap-3" : "p-3 justify-center"
              } ${
                activeTab === "overview"
                  ? "bg-[#FACC15] text-slate-950 font-bold shadow-yellow"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              {isExpanded && <span className="truncate">OVERVIEW</span>}
            </button>

            {/* Help Center */}
            <button
              onClick={() => {
                setActiveTab("support")
                setIsMobileNavOpen(false)
              }}
              title="Help Center & Live Chat"
              className={`w-full flex items-center justify-between rounded-2xl transition-all cursor-pointer ${
                isExpanded ? "px-4 py-3" : "p-3 justify-center"
              } ${
                activeTab === "support"
                  ? "bg-[#FACC15] text-slate-950 font-bold shadow-yellow"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={`flex items-center ${isExpanded ? "gap-3" : "justify-center"}`}>
                <MessageSquare className="w-4 h-4 shrink-0" />
                {isExpanded && <span className="truncate">HELP CENTER</span>}
              </div>
              {isExpanded && tickets.filter((t) => t.status === "open" || t.status === "in-progress").length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#7C3AED] text-white text-[10px] font-bold shrink-0">
                  {tickets.filter((t) => t.status === "open" || t.status === "in-progress").length}
                </span>
              )}
            </button>

            {/* Profile */}
            <button
              onClick={() => {
                setActiveTab("profile")
                setIsMobileNavOpen(false)
              }}
              title="Profile & Settings"
              className={`w-full flex items-center rounded-2xl transition-all cursor-pointer ${
                isExpanded ? "px-4 py-3 gap-3" : "p-3 justify-center"
              } ${
                activeTab === "profile"
                  ? "bg-[#FACC15] text-slate-950 font-bold shadow-yellow"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              {isExpanded && <span className="truncate">PROFILE SETTINGS</span>}
            </button>

            {/* Admin Console shortcut if admin */}
            {isAdmin && (
              <Link
                to="/admin"
                title="Admin Control Center"
                className={`w-full flex items-center rounded-2xl text-purple-300 hover:text-white hover:bg-purple-900/30 transition-all font-bold ${
                  isExpanded ? "px-4 py-3 gap-3" : "p-3 justify-center"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#7C3AED] shrink-0" />
                {isExpanded && <span className="truncate">ADMIN CONSOLE</span>}
              </Link>
            )}

            {/* Home Link */}
            <Link
              to="/"
              title="Main Website"
              className={`w-full flex items-center rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all ${
                isExpanded ? "px-4 py-3 gap-3" : "p-3 justify-center"
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              {isExpanded && <span className="truncate">MAIN WEBSITE</span>}
            </Link>
          </nav>
        </div>

        {/* Bottom Logout Action */}
        <div className="pt-4 border-t border-white/10 font-mono text-xs">
          <button
            onClick={handleLogout}
            title="Logout"
            className={`w-full flex items-center rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer ${
              isExpanded ? "px-4 py-3 gap-3" : "p-3 justify-center"
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {isExpanded && <span className="truncate">LOGOUT</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Dashboard Workspace ── */}
      <main
        className={`flex-1 w-full max-w-full overflow-hidden transition-all ${
          activeTab === "support"
            ? "p-0 h-[calc(100dvh-56px)] md:h-screen overflow-hidden flex flex-col bg-white"
            : "p-3.5 sm:p-6 lg:p-10 max-h-screen overflow-y-auto bg-slate-50"
        }`}
      >
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-simple">
            {/* Header Greeting */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Welcome, {userProfile?.displayName || "User"}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-0.5">
                  Manage your active integrations, support tickets, and account telemetry.
                </p>
              </div>
              <button
                onClick={() => setIsNewTicketOpen(true)}
                className="w-full sm:w-auto bg-[#7C3AED] hover:bg-purple-700 text-white rounded-full px-5 py-2.5 font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Support Ticket</span>
              </button>
            </div>

            {/* Stats Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase">TOTAL TICKETS</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 sm:mt-2">{tickets.length}</div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Raised inquiries</div>
              </div>

              <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-amber-600 uppercase">OPEN</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono mt-1 sm:mt-2">
                  {tickets.filter((t) => t.status === "open").length}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Awaiting review</div>
              </div>

              <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-blue-600 uppercase">IN PROGRESS</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono mt-1 sm:mt-2">
                  {tickets.filter((t) => t.status === "in-progress").length}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Active chat sessions</div>
              </div>

              <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-emerald-600 uppercase">RESOLVED</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1 sm:mt-2">
                  {tickets.filter((t) => t.status === "closed").length}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Closed successfully</div>
              </div>
            </div>

            {/* Quick Support Banner */}
            <div className="bg-slate-950 text-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#FACC15]">
                    <Sparkles className="w-3.5 h-3.5" />
                    REAL-TIME ENGINEERING DESK
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">Need help with AI pipelines or systems?</h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-light max-w-lg">
                    Open a support ticket to start a direct, live chat with our engineering staff.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewTicketOpen(true)}
                  className="w-full sm:w-auto bg-[#FACC15] text-slate-950 hover:bg-yellow-400 px-6 py-3 rounded-full font-mono text-xs font-black uppercase tracking-wider transition-all shadow-yellow hover:scale-105 shrink-0 cursor-pointer text-center"
                >
                  Raise Ticket Now
                </button>
              </div>
            </div>

            {/* Recent Tickets Overview */}
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">Your Support Tickets</h3>
                  <p className="text-xs text-slate-500 font-light">Recent inquiries and their real-time resolution states</p>
                </div>
                <button
                  onClick={() => setActiveTab("support")}
                  className="text-xs font-mono text-[#7C3AED] hover:underline font-bold"
                >
                  View Desk →
                </button>
              </div>

              {tickets.length === 0 ? (
                <div className="text-center py-10 sm:py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                  <LifeBuoy className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <div className="text-sm font-bold text-slate-700">No support tickets found</div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Have a technical question or need assistance with your project?
                  </p>
                  <button
                    onClick={() => setIsNewTicketOpen(true)}
                    className="mt-4 px-4 py-2 rounded-full bg-slate-900 text-white font-mono text-xs font-semibold hover:bg-slate-800"
                  >
                    Create First Ticket
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5 sm:space-y-3">
                  {tickets.slice(0, 5).map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedTicketId(t.id)
                        setActiveTab("support")
                      }}
                      className="p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-purple-300 hover:bg-slate-50/70 transition-all flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                    >
                      <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                            t.status === "open"
                              ? "bg-amber-100 text-amber-800"
                              : t.status === "in-progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}>
                            {t.status}
                          </span>
                          <span className="text-xs font-mono text-slate-400 truncate">{t.category}</span>
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">{t.subject}</div>
                        <div className="text-[11px] text-slate-500 font-light truncate">{t.lastMessage}</div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: HELP CENTER & REAL-TIME SUPPORT CHAT */}
        {activeTab === "support" && (
          <div className="w-full h-full flex-1 flex flex-col">
            <SupportChatLayout
              role="user"
              tickets={tickets}
              selectedTicketId={selectedTicketId}
              onSelectTicket={setSelectedTicketId}
              onSendMessage={handleSendMessage}
              onEditMessage={handleEditMessage}
              onDeleteMessage={handleDeleteMessage}
              onOpenNewTicket={() => setIsNewTicketOpen(true)}
              currentUserId={currentUser?.uid || ""}
              currentUserName={userProfile?.displayName || currentUser?.email?.split("@")[0] || "User"}
              currentUserPhoto={currentUser?.photoURL || userProfile?.photoURL}
            />
          </div>
        )}

        {/* TAB 3: PROFILE SETTINGS */}
        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 animate-fade-in-simple">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Profile & Settings
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Manage your user credentials and contact preferences
              </p>
            </div>

            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 border border-slate-200 shadow-2xs space-y-4 sm:space-y-6">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                    Account Email
                  </label>
                  <input
                    type="email"
                    disabled
                    value={currentUser?.email || ""}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-100 text-slate-500 text-sm cursor-not-allowed"
                  />
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">Primary login identifier</span>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] text-sm text-slate-900 outline-none"
                  />
                </div>

                {/* Primary Phone */}
                <PhoneInputWithCountry
                  label="Primary Phone Number"
                  required={true}
                  value={editPhone}
                  onChange={setEditPhone}
                  selectedDialCode={editDialCode}
                  onDialCodeChange={setEditDialCode}
                />

                {/* Alternative Phone */}
                <PhoneInputWithCountry
                  label="Alternative Phone Number"
                  required={false}
                  optionalBadge={true}
                  value={editAltPhone}
                  onChange={setEditAltPhone}
                  selectedDialCode={editAltDialCode}
                  onDialCodeChange={setEditAltDialCode}
                  placeholder="Optional backup number"
                />

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise / Dealership / University"
                    value={editCompany}
                    onChange={(e) => setEditCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] text-sm text-slate-900 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="w-full bg-slate-950 text-white hover:bg-slate-800 rounded-full py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSavingProfile ? "Saving changes..." : "Save Profile Details"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* ── GOOGLE SIGN-IN / MISSING PHONE NUMBER PROMPT MODAL ── */}
      {isPhonePromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in-simple">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsPhonePromptOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Dismiss contact prompt"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              Verify Contact Number
            </h3>
            <p className="text-xs text-slate-500 font-light mb-6 leading-relaxed">
              To enable direct engineering support, WhatsApp status alerts, and ticket routing, please enter your contact number.
            </p>

            <form onSubmit={handleSavePromptPhone} className="space-y-4">
              <PhoneInputWithCountry
                label="Primary Phone Number"
                required={true}
                value={promptPhone}
                onChange={setPromptPhone}
                selectedDialCode={promptDialCode}
                onDialCodeChange={setPromptDialCode}
                placeholder="98765 43210"
              />

              <PhoneInputWithCountry
                label="Alternative Phone Number"
                required={false}
                optionalBadge={true}
                value={promptAltPhone}
                onChange={setPromptAltPhone}
                selectedDialCode={promptAltDialCode}
                onDialCodeChange={setPromptAltDialCode}
                placeholder="Optional backup contact"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingPromptPhone}
                  className="w-full bg-[#7C3AED] hover:bg-purple-700 text-white rounded-full py-3.5 text-xs font-mono font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {isSavingPromptPhone ? "Verifying & Saving..." : "Save & Continue to Dashboard"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── New Support Ticket Modal ── */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in-simple">
          <div className="bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsNewTicketOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-1">
              Create Support Ticket
            </h3>
            <p className="text-xs text-slate-500 font-light mb-5">
              Our engineering team responds in real-time.
            </p>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                  Subject / Issue Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Question regarding Computer Vision API / Clutch 1.0 setup"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-[#7C3AED]"
                  >
                    <option value="AI Agents & Integration">AI Agents & Autonomous Workflows</option>
                    <option value="Computer Vision QC">Computer Vision & Quality Inspection</option>
                    <option value="Dealership AI (Clutch)">Clutch 1.0 AI Dealership Suite</option>
                    <option value="Custom LLM Fine-Tuning">Custom LLM & Model Fine-Tuning</option>
                    <option value="API Gateway & Webhooks">API Gateway & Real-time Webhooks</option>
                    <option value="Enterprise Architecture">Enterprise Cloud & Security Architecture</option>
                    <option value="Billing & Enterprise SLA">Billing, Licensing & Enterprise SLA</option>
                    <option value="General Support">General Technical Support & Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TicketPriority)}
                    className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-[#7C3AED]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Mandatory Primary Phone & Optional Alternate Phone */}
              <div className="space-y-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <PhoneInputWithCountry
                  label="Contact Phone (Mandatory)"
                  required={true}
                  value={newTicketPhone}
                  onChange={setNewTicketPhone}
                  selectedDialCode={newTicketDialCode}
                  onDialCodeChange={setNewTicketDialCode}
                  placeholder="Primary phone number"
                />

                <PhoneInputWithCountry
                  label="Alternative Phone (Optional)"
                  required={false}
                  optionalBadge={true}
                  value={newTicketAltPhone}
                  onChange={setNewTicketAltPhone}
                  selectedDialCode={newTicketAltDialCode}
                  onDialCodeChange={setNewTicketAltDialCode}
                  placeholder="Backup phone number"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                  Message / Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your issue or technical requirement in detail..."
                  value={newInitialMsg}
                  onChange={(e) => setNewInitialMsg(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm outline-none focus:border-[#7C3AED]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTicketOpen(false)}
                  className="flex-1 py-3 rounded-full border border-slate-200 text-xs font-mono font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingTicket}
                  className="flex-1 py-3 rounded-full bg-[#7C3AED] text-white font-mono text-xs font-bold hover:bg-purple-700 disabled:opacity-50 cursor-pointer"
                >
                  {isCreatingTicket ? "Creating..." : "Submit Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
