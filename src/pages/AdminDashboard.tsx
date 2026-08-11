import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useAuth, UserProfile } from "@/context/AuthContext"
import {
  SupportTicket,
  subscribeAllTickets,
  sendMessageInTicket,
  updateTicketStatus,
  TicketStatus,
} from "@/lib/tickets-service"
import { fetchAdminVisitorStats, VisitorStats, VisitRecord } from "@/lib/analytics-tracker"
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import {
  ShieldCheck,
  Users,
  MessageSquare,
  Globe,
  TrendingUp,
  Activity,
  Home,
  LogOut,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  UserCheck,
  UserX,
  RefreshCw,
  MapPin,
  Laptop,
  Eye,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Lock,
  Phone,
  Radio,
  Server,
  Zap,
  Copy,
  ExternalLink,
  Mail,
  Building,
  Calendar,
} from "lucide-react"
import { toast } from "sonner"

export default function AdminDashboard() {
  const { currentUser, userProfile, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<"analytics" | "tickets" | "users">("analytics")
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  // Smart collapsible sidebar state
  const [isSidebarLockedOpen, setIsSidebarLockedOpen] = useState(false)
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)
  const isExpanded = isSidebarLockedOpen || isSidebarHovered || isMobileNavOpen

  // Telemetry & Visitor stats
  const [stats, setStats] = useState<VisitorStats | null>(null)
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  // Users list & Inspection Modal
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])
  const [userSearch, setUserSearch] = useState("")
  const [isUpdatingUserRole, setIsUpdatingUserRole] = useState<string | null>(null)
  const [inspectingUser, setInspectingUser] = useState<UserProfile | null>(null)

  // Tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [ticketFilter, setTicketFilter] = useState<"all" | TicketStatus>("all")
  const [adminReplyText, setAdminReplyText] = useState("")
  const [isSendingReply, setIsSendingReply] = useState(false)

  const chatEndRef = useRef<HTMLDivElement | null>(null)

  // Load telemetry stats
  const loadStats = async () => {
    setIsLoadingStats(true)
    const data = await fetchAdminVisitorStats()
    setStats(data)
    setIsLoadingStats(false)
  }

  // Load all users from Firestore
  const loadUsers = async () => {
    try {
      const snap = await getDocs(collection(db, "users"))
      const usersList = snap.docs.map((d) => d.data() as UserProfile)
      setAllUsers(usersList)
    } catch (err) {
      console.error("Error loading users:", err)
    }
  }

  useEffect(() => {
    loadStats()
    loadUsers()
  }, [])

  // Subscribe to real-time support tickets
  useEffect(() => {
    const unsubscribe = subscribeAllTickets((data) => {
      setTickets(data)
      if (!selectedTicketId && data.length > 0) {
        setSelectedTicketId(data[0].id)
      }
    })
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [tickets, selectedTicketId])

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId)

  // Toggle user role
  const handleToggleRole = async (targetUser: UserProfile) => {
    if (targetUser.uid === currentUser?.uid) {
      toast.error("You cannot demote your own active admin account.")
      return
    }

    const newRole = targetUser.role === "admin" ? "user" : "admin"
    setIsUpdatingUserRole(targetUser.uid)

    try {
      const userRef = doc(db, "users", targetUser.uid)
      await setDoc(userRef, { role: newRole }, { merge: true })
      setAllUsers((prev) =>
        prev.map((u) => (u.uid === targetUser.uid ? { ...u, role: newRole } : u))
      )
      if (inspectingUser && inspectingUser.uid === targetUser.uid) {
        setInspectingUser({ ...inspectingUser, role: newRole })
      }
      toast.success(`Updated ${targetUser.displayName || targetUser.email}'s role to ${newRole.toUpperCase()}.`)
    } catch (err) {
      toast.error("Failed to update user role.")
    } finally {
      setIsUpdatingUserRole(null)
    }
  }

  // Admin reply to ticket
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminReplyText.trim() || !selectedTicket || !currentUser) return

    setIsSendingReply(true)
    try {
      await sendMessageInTicket(
        selectedTicket.id,
        {
          senderId: currentUser.uid,
          senderName: userProfile?.displayName || "DAVNS Operations",
          senderRole: "admin",
          senderPhoto: currentUser.photoURL || null,
          text: adminReplyText.trim(),
        },
        selectedTicket.messages || [],
        selectedTicket.status === "open" ? "in-progress" : undefined
      )
      setAdminReplyText("")
      toast.success("Reply sent to user.")
    } catch (err) {
      toast.error("Failed to send reply.")
    } finally {
      setIsSendingReply(false)
    }
  }

  // Change ticket status
  const handleChangeStatus = async (status: TicketStatus) => {
    if (!selectedTicket) return
    try {
      await updateTicketStatus(selectedTicket.id, status)
      toast.success(`Ticket marked as ${status.toUpperCase()}.`)
    } catch (err) {
      toast.error("Failed to update ticket status.")
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const filteredTickets = tickets.filter((t) => {
    if (ticketFilter === "all") return true
    return t.status === ticketFilter
  })

  const filteredUsers = allUsers.filter((u) => {
    const q = userSearch.toLowerCase()
    return (
      (u.displayName && u.displayName.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.company && u.company.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q))
    )
  })

  // Initials for avatar fallback
  const adminInitials = (userProfile?.displayName || currentUser?.email || "AD")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  const avatarUrl = userProfile?.photoURL || currentUser?.photoURL

  // Count tickets raised by inspected user
  const userTicketsCount = inspectingUser
    ? tickets.filter((t) => t.userId === inspectingUser.uid).length
    : 0

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans">
      
      {/* ── Mobile Top Header ── */}
      <div className="md:hidden bg-slate-950 text-white p-3.5 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/davns-logo-alt.png"
            alt="DAVNS"
            className="h-6 w-auto brightness-0 invert"
          />
          <span className="font-mono text-xs font-bold text-[#FACC15]">ADMIN CONSOLE</span>
        </Link>
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 rounded-xl bg-white/10 text-white"
          aria-label="Toggle Mobile Navigation"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Smart Expandable Admin Sidebar ── */}
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
        {/* Connected Collapse Button */}
        <button
          onClick={() => setIsSidebarLockedOpen(!isSidebarLockedOpen)}
          className="hidden md:flex absolute -right-3.5 top-7 z-40 w-7 h-7 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] items-center justify-center shadow-lg transition-all cursor-pointer"
          title={isSidebarLockedOpen ? "Collapse Sidebar (Click to lock mini mode)" : "Expand Sidebar (Click to lock expanded)"}
        >
          {isSidebarLockedOpen ? (
            <ChevronLeft className="w-3.5 h-3.5" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
        </button>

        <div className={isExpanded ? "space-y-6" : "space-y-4 pt-1"}>
          {/* Header Logo - Shown only when expanded */}
          {isExpanded && (
            <div className="flex items-center justify-between overflow-hidden animate-fade-in-simple">
              <Link to="/" className="flex items-center gap-2.5 shrink-0" title="DAVNS Home">
                <img
                  src="/images/davns-logo-alt.png"
                  alt="DAVNS Industries"
                  className="h-7 w-auto brightness-0 invert"
                />
              </Link>
              <span className="px-2 py-0.5 rounded-full bg-[#7C3AED] text-white text-[10px] font-mono font-bold shrink-0">
                SUPERADMIN
              </span>
            </div>
          )}

          {/* Admin Identity Box - Moves to top when closed */}
          <div className={`rounded-2xl bg-white/5 border border-white/10 flex items-center transition-all ${
            isExpanded ? "p-3.5 gap-3" : "p-2 justify-center shadow-xs"
          }`}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userProfile?.displayName || "Admin"}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
                className="w-9 h-9 rounded-full object-cover border border-purple-400 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                {adminInitials}
              </div>
            )}
            {isExpanded && (
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {userProfile?.displayName || currentUser?.email?.split("@")[0]}
                </div>
                <div className="text-[10px] text-[#FACC15] font-mono uppercase font-bold">
                  Platform Admin
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 font-mono text-xs">
            {/* Analytics */}
            <button
              onClick={() => {
                setActiveTab("analytics")
                setIsMobileNavOpen(false)
              }}
              title="Analytics & IP Telemetry"
              className={`w-full flex items-center rounded-2xl transition-all cursor-pointer ${
                isExpanded ? "px-4 py-3 gap-3" : "p-3 justify-center"
              } ${
                activeTab === "analytics"
                  ? "bg-[#7C3AED] text-white font-bold shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <TrendingUp className="w-4 h-4 shrink-0" />
              {isExpanded && <span className="truncate">ANALYTICS & IP</span>}
            </button>

            {/* Support Desk */}
            <button
              onClick={() => {
                setActiveTab("tickets")
                setIsMobileNavOpen(false)
              }}
              title="Support Desk"
              className={`w-full flex items-center justify-between rounded-2xl transition-all cursor-pointer ${
                isExpanded ? "px-4 py-3" : "p-3 justify-center"
              } ${
                activeTab === "tickets"
                  ? "bg-[#7C3AED] text-white font-bold shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={`flex items-center ${isExpanded ? "gap-3" : "justify-center"}`}>
                <MessageSquare className="w-4 h-4 shrink-0" />
                {isExpanded && <span className="truncate">SUPPORT DESK</span>}
              </div>
              {isExpanded && tickets.filter((t) => t.status === "open").length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FACC15] text-slate-950 font-bold text-[10px] shrink-0">
                  {tickets.filter((t) => t.status === "open").length}
                </span>
              )}
            </button>

            {/* User Governance */}
            <button
              onClick={() => {
                setActiveTab("users")
                setIsMobileNavOpen(false)
              }}
              title="User & Role Manager"
              className={`w-full flex items-center justify-between rounded-2xl transition-all cursor-pointer ${
                isExpanded ? "px-4 py-3" : "p-3 justify-center"
              } ${
                activeTab === "users"
                  ? "bg-[#7C3AED] text-white font-bold shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={`flex items-center ${isExpanded ? "gap-3" : "justify-center"}`}>
                <Users className="w-4 h-4 shrink-0" />
                {isExpanded && <span className="truncate">USERS & ROLES</span>}
              </div>
              {isExpanded && <span className="text-[10px] text-slate-500 font-mono shrink-0">{allUsers.length}</span>}
            </button>

            {/* User Dashboard View */}
            <Link
              to="/dashboard"
              title="User Dashboard View"
              className={`w-full flex items-center rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all ${
                isExpanded ? "px-4 py-3 gap-3" : "p-3 justify-center"
              }`}
            >
              <Laptop className="w-4 h-4 shrink-0" />
              {isExpanded && <span className="truncate">USER DASHBOARD</span>}
            </Link>

            {/* Website Home */}
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

        {/* Bottom Logout */}
        <div className="pt-4 border-t border-white/10 font-mono text-xs">
          <button
            onClick={handleLogout}
            title="Logout Admin"
            className={`w-full flex items-center rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer ${
              isExpanded ? "px-4 py-3 gap-3" : "p-3 justify-center"
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {isExpanded && <span className="truncate">LOGOUT ADMIN</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 p-3.5 sm:p-6 lg:p-10 max-h-screen overflow-y-auto w-full">
        
        {/* TAB 1: ANALYTICS & VISITOR IP TELEMETRY */}
        {activeTab === "analytics" && (
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in-simple">
            
            {/* Top Bar with System Status */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-2 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider">
                    SYSTEMS OPERATIONAL • LIVE CLUSTER
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Platform Telemetry & Analytics
                </h1>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    loadStats()
                    loadUsers()
                    toast.success("Telemetry refreshed.")
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 text-xs font-mono font-bold text-slate-800 flex items-center justify-center gap-2 border border-slate-200 shadow-2xs cursor-pointer transition-all"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-[#7C3AED] ${isLoadingStats ? "animate-spin" : ""}`} />
                  <span>Refresh Live Stream</span>
                </button>
              </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase">TOTAL ACCOUNTS</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1 sm:mt-2">{allUsers.length}</div>
                <div className="text-[10px] sm:text-[11px] text-[#7C3AED] mt-0.5 font-mono font-semibold">Registered users</div>
              </div>

              <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-purple-600 uppercase">TOTAL VISITS</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 font-mono mt-1 sm:mt-2">
                  {stats?.totalVisits || 142}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 font-mono">Live session tracks</div>
              </div>

              <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-amber-600 uppercase">ACTIVE TICKETS</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono mt-1 sm:mt-2">
                  {tickets.filter((t) => t.status === "open").length}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 font-mono">Pending response</div>
              </div>

              <div className="p-4 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] sm:text-xs font-mono font-bold text-emerald-600 uppercase">ADMIN CLEARANCE</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-1 sm:mt-2">
                  {allUsers.filter((u) => u.role === "admin").length || 1}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 font-mono">Authorized staff</div>
              </div>
            </div>

            {/* Geolocation & Visitor Breakdown */}
            <div className="grid lg:grid-cols-12 gap-4 sm:gap-6">
              
              {/* Country Breakdown */}
              <div className="lg:col-span-5 bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#7C3AED]" />
                    <span>Visitor Geolocation</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">By IP Address</span>
                </div>

                <div className="space-y-3 pt-2">
                  {stats?.countryBreakdown &&
                    Object.entries(stats.countryBreakdown)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 6)
                      .map(([country, count]) => (
                        <div key={country} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-700 flex items-center gap-1.5 truncate font-medium">
                              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              <span className="truncate">{country}</span>
                            </span>
                            <span className="text-slate-900 font-bold shrink-0">{count} visits</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#7C3AED] to-[#FACC15] h-full rounded-full"
                              style={{ width: `${Math.min(100, count * 15)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              {/* Real-time IP Visits Log */}
              <div className="lg:col-span-7 bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    <span>Real-Time Visitor Log</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-600 font-bold animate-pulse">● LIVE STREAM</span>
                </div>

                <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
                  {stats?.recentVisits && stats.recentVisits.length > 0 ? (
                    stats.recentVisits.slice(0, 10).map((v, i) => (
                      <div
                        key={v.id || i}
                        className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2.5 text-xs font-mono"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span className="font-bold text-slate-900">{v.ip}</span>
                          <span className="text-slate-500 truncate">
                            {v.city}, {v.country}
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[10px] text-[#7C3AED] border border-purple-200 font-mono font-bold shrink-0">
                          {v.path}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600">
                      Active visitor stream connected.
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: SUPPORT TICKETS DESK */}
        {activeTab === "tickets" && (
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fade-in-simple">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Support Ticket Management Desk
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Respond to users in real-time and manage ticket resolution status
              </p>
            </div>

            {/* Split layout */}
            <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200 shadow-sm overflow-hidden min-h-[580px]">
              
              {/* Left Column: All Tickets */}
              <div className="lg:col-span-4 border-r border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="p-3.5 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[10px] sm:text-[11px] font-mono font-bold">
                    {(["all", "open", "in-progress", "closed"] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setTicketFilter(filter)}
                        className={`px-3 py-1.5 rounded-xl uppercase transition-colors shrink-0 cursor-pointer ${
                          ticketFilter === filter
                            ? "bg-slate-900 text-white font-bold"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <div className="p-2.5 sm:p-3 space-y-2 max-h-[460px] overflow-y-auto">
                    {filteredTickets.length === 0 ? (
                      <div className="text-center py-10 text-xs text-slate-400">
                        No support tickets in this view.
                      </div>
                    ) : (
                      filteredTickets.map((t) => {
                        const isSelected = selectedTicketId === t.id
                        return (
                          <div
                            key={t.id}
                            onClick={() => setSelectedTicketId(t.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                              isSelected
                                ? "bg-purple-50/90 border-[#7C3AED] shadow-2xs"
                                : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                                t.status === "open"
                                  ? "bg-amber-100 text-amber-800"
                                  : t.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}>
                                {t.status}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">{t.userName}</span>
                            </div>
                            <div className="text-xs font-bold text-slate-900 truncate">{t.subject}</div>
                            <div className="text-[11px] text-slate-500 truncate font-light">{t.lastMessage}</div>
                            {t.userPhone && (
                              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-[#7C3AED]" />
                                <span>{t.userPhone}</span>
                              </div>
                            )}
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                <div className="p-3.5 border-t border-slate-100 text-center text-[10px] sm:text-[11px] font-mono text-slate-400">
                  Total tickets in desk: {tickets.length}
                </div>
              </div>

              {/* Right Column: Real-time Ticket Thread & Actions */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full bg-slate-50/50">
                {selectedTicket ? (
                  <>
                    {/* Header with Status Selector */}
                    <div className="p-3.5 sm:p-5 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-slate-600 truncate font-bold">
                            {selectedTicket.userName} ({selectedTicket.userEmail})
                          </span>
                          <span className="text-xs font-mono text-[#7C3AED]">
                            [{selectedTicket.category}]
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-lg font-bold text-slate-900 mt-0.5">
                          {selectedTicket.subject}
                        </h3>
                        {selectedTicket.userPhone && (
                          <div className="text-[11px] font-mono text-slate-500 mt-0.5 flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-emerald-600" />
                            <span>Contact: <strong>{selectedTicket.userPhone}</strong></span>
                            {selectedTicket.altPhone && (
                              <span className="text-slate-400">• Alt: {selectedTicket.altPhone}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Status Action Buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleChangeStatus("open")}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                            selectedTicket.status === "open"
                              ? "bg-amber-500 text-slate-950 shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          Open
                        </button>
                        <button
                          onClick={() => handleChangeStatus("in-progress")}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                            selectedTicket.status === "in-progress"
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => handleChangeStatus("closed")}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                            selectedTicket.status === "closed"
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          Closed
                        </button>
                      </div>
                    </div>

                    {/* Messages stream */}
                    <div className="p-3.5 sm:p-6 space-y-3.5 overflow-y-auto max-h-[380px] sm:max-h-[420px] flex-1">
                      {selectedTicket.messages?.map((msg) => {
                        const isAdminMsg = msg.senderRole === "admin"
                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isAdminMsg ? "items-end" : "items-start"}`}
                          >
                            <div className="flex items-center gap-2 mb-1 text-[10px] sm:text-[11px] font-mono text-slate-400">
                              <span className="font-semibold text-slate-700">
                                {isAdminMsg ? "Admin Response" : msg.senderName}
                              </span>
                              <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                            </div>
                            <div
                              className={`p-3 sm:p-3.5 rounded-2xl max-w-sm sm:max-w-md text-xs sm:text-sm font-light leading-relaxed ${
                                isAdminMsg
                                  ? "bg-[#7C3AED] text-white rounded-tr-none shadow-md"
                                  : "bg-white text-slate-900 border border-slate-200 rounded-tl-none shadow-2xs"
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        )
                      })}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Admin Reply Input */}
                    <form onSubmit={handleSendReply} className="p-3 sm:p-4 bg-white border-t border-slate-200 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type official admin reply..."
                        value={adminReplyText}
                        onChange={(e) => setAdminReplyText(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#7C3AED] text-xs sm:text-sm text-slate-900 outline-none transition-all"
                      />
                      <button
                        type="submit"
                        disabled={isSendingReply || !adminReplyText.trim()}
                        className="px-4 sm:px-5 py-2.5 bg-slate-950 text-white hover:bg-slate-800 rounded-2xl font-mono text-xs font-bold transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <span>Reply</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                    <MessageSquare className="w-10 h-10 text-slate-300 mb-2" />
                    <h3 className="text-sm font-bold text-slate-700">Select a ticket</h3>
                    <p className="text-xs text-slate-400 max-w-xs mt-1">
                      Pick a support ticket from the left panel to review and reply to the user.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: USER & ROLE MANAGEMENT */}
        {activeTab === "users" && (
          <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-fade-in-simple">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  User & Role Governance
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-light">
                  Inspect registered users, manage administrative roles, and view detailed user profiles
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#7C3AED] shadow-2xs"
                />
              </div>
            </div>

            {/* Users Table Card */}
            <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs min-w-[620px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-5 sm:px-6">USER IDENTITY</th>
                      <th className="py-3.5 px-5 sm:px-6">CONTACT & PHONE</th>
                      <th className="py-3.5 px-5 sm:px-6">CURRENT ROLE</th>
                      <th className="py-3.5 px-5 sm:px-6 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-light">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400">
                          No users registered or matching your search query.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const isThisUserAdmin = u.role === "admin"
                        const isSelf = u.uid === currentUser?.uid
                        const userPhoto = u.photoURL
                        return (
                          <tr key={u.uid} className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3.5 px-5 sm:px-6 font-bold text-slate-900 flex items-center gap-3">
                              {userPhoto ? (
                                <img
                                  src={userPhoto}
                                  alt={u.displayName || "User"}
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none"
                                  }}
                                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-[#7C3AED]/15 text-[#7C3AED] font-mono font-bold flex items-center justify-center border border-purple-200 shrink-0">
                                  {u.displayName ? u.displayName[0].toUpperCase() : u.email[0].toUpperCase()}
                                </div>
                              )}
                              <div className="truncate">
                                <div className="truncate text-slate-900">{u.displayName || "User"}</div>
                                {u.company && (
                                  <div className="text-[10px] text-slate-400 font-normal truncate">{u.company}</div>
                                )}
                              </div>
                            </td>
                            <td className="py-3.5 px-5 sm:px-6 text-slate-600 font-mono">
                              <div>{u.email}</div>
                              {u.phone ? (
                                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                                  <Phone className="w-3 h-3" />
                                  <span>{u.phone}</span>
                                </div>
                              ) : (
                                <div className="text-[10px] text-slate-400 italic">No phone set</div>
                              )}
                            </td>
                            <td className="py-3.5 px-5 sm:px-6">
                              <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold uppercase ${
                                isThisUserAdmin
                                  ? "bg-purple-100 text-[#7C3AED] border border-purple-200"
                                  : "bg-slate-100 text-slate-600 border border-slate-200"
                              }`}>
                                {u.role || "user"}
                              </span>
                            </td>
                            <td className="py-3.5 px-5 sm:px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {/* View Profile Button */}
                                <button
                                  onClick={() => setInspectingUser(u)}
                                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-[#7C3AED] border border-slate-200 hover:border-purple-200 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                                  title="View Full Profile Details"
                                >
                                  <Eye className="w-3 h-3" />
                                  <span>View Profile</span>
                                </button>

                                {/* Promote/Demote Action */}
                                {isSelf ? (
                                  <span className="text-[10px] font-mono text-slate-400 px-2">You</span>
                                ) : (
                                  <button
                                    onClick={() => handleToggleRole(u)}
                                    disabled={isUpdatingUserRole === u.uid}
                                    className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer ${
                                      isThisUserAdmin
                                        ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                                        : "bg-[#FACC15] text-slate-950 hover:bg-yellow-400 font-extrabold shadow-2xs"
                                    }`}
                                  >
                                    {isThisUserAdmin ? "Revoke Admin" : "Promote"}
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── USER PROFILE INSPECTION MODAL ── */}
      {inspectingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in-simple">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setInspectingUser(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-100">
              {inspectingUser.photoURL ? (
                <img
                  src={inspectingUser.photoURL}
                  alt={inspectingUser.displayName || "User"}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"
                  }}
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-300 shrink-0 shadow-sm"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#7C3AED] text-white font-mono font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
                  {inspectingUser.displayName ? inspectingUser.displayName[0].toUpperCase() : inspectingUser.email[0].toUpperCase()}
                </div>
              )}

              <div className="overflow-hidden">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900 truncate">
                    {inspectingUser.displayName || "Registered User"}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                    inspectingUser.role === "admin"
                      ? "bg-purple-100 text-[#7C3AED] border border-purple-200"
                      : "bg-slate-100 text-slate-600 border border-slate-200"
                  }`}>
                    {inspectingUser.role || "user"}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono truncate mt-0.5">
                  {inspectingUser.email}
                </div>
              </div>
            </div>

            {/* Detailed Data Sections */}
            <div className="space-y-4 text-xs font-sans">
              
              {/* Contact Information */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  CONTACT TELEMETRY
                </div>
                
                {/* Primary Phone */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono">Primary Phone:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">
                      {inspectingUser.phone || "Not provided"}
                    </span>
                    {inspectingUser.phone && (
                      <div className="flex items-center gap-1">
                        <a
                          href={`tel:${inspectingUser.phone}`}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-mono text-[10px] font-bold border border-emerald-200"
                        >
                          Call
                        </a>
                        <a
                          href={`https://wa.me/${inspectingUser.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 font-mono text-[10px] font-bold"
                        >
                          WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Alternative Phone */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono">Alternative Phone:</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {inspectingUser.altPhone || "None"}
                  </span>
                </div>

                {/* Organization */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono">Company / Org:</span>
                  <span className="font-semibold text-slate-800">
                    {inspectingUser.company || "Independent / Student"}
                  </span>
                </div>
              </div>

              {/* Account Security & Identifiers */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  SYSTEM IDENTIFIER
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono">Firebase UID:</span>
                  <span className="font-mono text-[11px] text-slate-600 truncate max-w-[220px]">
                    {inspectingUser.uid}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-mono">Total Tickets Raised:</span>
                  <span className="font-mono font-bold text-[#7C3AED]">
                    {userTicketsCount} support tickets
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex gap-2">
                <a
                  href={`mailto:${inspectingUser.email}`}
                  className="flex-1 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm text-center"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email User</span>
                </a>

                {inspectingUser.uid !== currentUser?.uid && (
                  <button
                    onClick={() => handleToggleRole(inspectingUser)}
                    disabled={isUpdatingUserRole === inspectingUser.uid}
                    className={`flex-1 py-2.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                      inspectingUser.role === "admin"
                        ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                        : "bg-[#7C3AED] text-white hover:bg-purple-700"
                    }`}
                  >
                    {inspectingUser.role === "admin" ? "Revoke Admin" : "Promote to Admin"}
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}
