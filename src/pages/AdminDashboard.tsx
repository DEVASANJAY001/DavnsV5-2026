import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { useAuth, UserProfile } from "@/context/AuthContext"
import {
  SupportTicket,
  subscribeAllTickets,
  sendMessageInTicket,
  editMessageInTicket,
  deleteMessageInTicket,
  updateTicketStatus,
  TicketStatus,
} from "@/lib/tickets-service"
import { fetchAdminVisitorStats, VisitorStats, VisitRecord } from "@/lib/analytics-tracker"
import {
  subscribeParticipants,
  subscribeColleges,
  addParticipant,
  updateParticipant,
  deleteParticipant,
  addCollege,
  updateCollege,
  deleteCollege,
  toggleCollegeVisibility,
  toggleParticipantVisibility,
  subscribePerspectiveConfig,
  updatePerspectiveConfig,
  recalculateAllParticipantScores,
  calculateScores,
  emptyDayScore,
  Participant,
  College,
  DayScore,
  PerspectiveConfig,
} from "@/lib/scoreboard-service"
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { PhoneInputWithCountry } from "@/components/ui/phone-input-with-country"
import { SupportChatLayout } from "@/components/chat/SupportChatLayout"
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
  Trophy,
  Plus,
  Pencil,
  Trash2,
  Building2,
  Star,
  Target,
  GraduationCap,
  Upload,
  FileSpreadsheet,
  Sparkles,
  EyeOff,
} from "lucide-react"
import { PerspectiveCsvImportModal } from "@/components/perspective/perspective-csv-import-modal"
import { mergeDuplicateColleges } from "@/lib/college-normalizer"
import { toast } from "sonner"

export default function AdminDashboard() {
  const { currentUser, userProfile, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<"analytics" | "tickets" | "users" | "hackathons">("analytics")
  const [selectedHackathon, setSelectedHackathon] = useState<string | null>(null)
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

  // ── Scoreboard State ──
  const [participants, setParticipants] = useState<Participant[]>([])
  const [colleges, setColleges] = useState<College[]>([])
  const [scoreboardSubTab, setScoreboardSubTab] = useState<"participants" | "marks" | "colleges">("participants")
  const [participantSearch, setParticipantSearch] = useState("")
  const [marksSelectedDay, setMarksSelectedDay] = useState<"all" | 1 | 2 | 3 | 4 | 5 | 6>("all")
  const [marksCollegeFilter, setMarksCollegeFilter] = useState<string>("all")
  const [csvModalTargetDay, setCsvModalTargetDay] = useState<1 | 2 | 3 | 4 | 5 | 6>(1)

  // Participant form state
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false)
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null)
  const [isSavingParticipant, setIsSavingParticipant] = useState(false)
  const blankDay = emptyDayScore()
  const [pForm, setPForm] = useState({
    name: "", email: "", college: "", collegeId: "", unstopId: "",
    day1: { ...blankDay }, day2: { ...blankDay }, day3: { ...blankDay },
    day4: { ...blankDay }, day5: { ...blankDay }, day6: { ...blankDay },
    isVerified: false,
    isHidden: false,
  })

  // College form state
  const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false)
  const [editingCollege, setEditingCollege] = useState<College | null>(null)
  const [isSavingCollege, setIsSavingCollege] = useState(false)
  const [cForm, setCForm] = useState({ name: "", city: "", state: "", logoUrl: "", websiteUrl: "", isHidden: false })
  const [isDeletingScoreboardId, setIsDeletingScoreboardId] = useState<string | null>(null)

  // CSV Import Modal state
  const [isCsvImportModalOpen, setIsCsvImportModalOpen] = useState(false)

  // ── Public Display Mode Config ──
  const [perspectiveConfig, setPerspectiveConfig] = useState<PerspectiveConfig>({
    displayMode: "colleges_only",
    isLeaderboardPublished: false,
  })
  const [isUpdatingDisplayMode, setIsUpdatingDisplayMode] = useState(false)
  const [isMergingColleges, setIsMergingColleges] = useState(false)

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
  }, [])

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId)

  // Subscribe to real-time scoreboard data
  useEffect(() => {
    const unsubP = subscribeParticipants((data) => setParticipants(data))
    const unsubC = subscribeColleges((data) => setColleges(data))
    const unsubCfg = subscribePerspectiveConfig((cfg) => setPerspectiveConfig(cfg))
    return () => {
      unsubP()
      unsubC()
      unsubCfg()
    }
  }, [])

  const handleToggleDisplayMode = async (mode: "colleges_only" | "leaderboard") => {
    setIsUpdatingDisplayMode(true)
    try {
      await updatePerspectiveConfig({
        displayMode: mode,
        isLeaderboardPublished: mode === "leaderboard",
        updatedBy: currentUser?.email || "admin",
      })
      toast.success(
        mode === "leaderboard"
          ? "Public view updated: LIVE LEADERBOARD (Student ranks & scores are now live)."
          : "Public view updated: REGISTERED COLLEGES (Pre-challenge directory is now shown)."
      )
    } catch (err: any) {
      console.error("Error updating display mode:", err)
      toast.error(err?.message || "Failed to update display mode.")
    } finally {
      setIsUpdatingDisplayMode(false)
    }
  }

  const handleToggleHideStudentCounts = async () => {
    const nextVal = !perspectiveConfig.hideStudentCounts
    setIsUpdatingDisplayMode(true)
    try {
      await updatePerspectiveConfig({
        hideStudentCounts: nextVal,
        updatedBy: currentUser?.email || "admin",
      })
      toast.success(
        nextVal
          ? "Public student counts are now HIDDEN on the website."
          : "Public student counts are now VISIBLE on the website."
      )
    } catch (err: any) {
      toast.error(err?.message || "Failed to update student count setting.")
    } finally {
      setIsUpdatingDisplayMode(false)
    }
  }

  const handleToggleParticipantVisibility = async (p: Participant, isHidden: boolean) => {
    try {
      await toggleParticipantVisibility(p.id, isHidden)
      toast.success(
        isHidden
          ? `"${p.name}" is now hidden from public leaderboards.`
          : `"${p.name}" is now visible on public leaderboards.`
      )
    } catch (err: any) {
      toast.error(err?.message || "Failed to update participant visibility.")
    }
  }

  const openCsvModalForDay = (day: 1 | 2 | 3 | 4 | 5 | 6) => {
    setCsvModalTargetDay(day)
    setIsCsvImportModalOpen(true)
  }

  const handleMergeDuplicates = async () => {
    if (
      !window.confirm(
        "This will automatically scan all college variations (e.g. 'Easwari', 'SRM Easwari', 'RMKCET', 'WCC', etc.), migrate all registered students into their canonical institution, and delete duplicate college records. Continue?"
      )
    ) {
      return
    }

    setIsMergingColleges(true)
    try {
      const report = await mergeDuplicateColleges()
      if (report.deletedCount > 0 || report.mergedCount > 0) {
        toast.success(
          `Successfully merged ${report.deletedCount} duplicate colleges and updated ${report.migratedParticipantsCount} student records!`
        )
      } else {
        toast.info("All institutions are already normalized with no duplicate variations found.")
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to merge colleges.")
    } finally {
      setIsMergingColleges(false)
    }
  }

  // ── Scoreboard Handlers ──

  const openAddParticipant = () => {
    const blank = emptyDayScore()
    setEditingParticipant(null)
    setPForm({
      name: "", email: "", college: "", collegeId: "", unstopId: "",
      day1: { ...blank }, day2: { ...blank }, day3: { ...blank },
      day4: { ...blank }, day5: { ...blank }, day6: { ...blank },
      isVerified: false,
      isHidden: false,
    })
    setIsParticipantModalOpen(true)
  }

  const openEditParticipant = (p: Participant) => {
    setEditingParticipant(p)
    setPForm({
      name: p.name, email: p.email, college: p.college, collegeId: p.collegeId, unstopId: p.unstopId || "",
      day1: { ...p.day1 }, day2: { ...p.day2 }, day3: { ...p.day3 }, day4: { ...p.day4 }, day5: { ...p.day5 }, day6: { ...p.day6 },
      isVerified: p.isVerified,
      isHidden: Boolean(p.isHidden),
    })
    setIsParticipantModalOpen(true)
  }

  const handleSaveParticipant = async () => {
    if (!pForm.name.trim() || !pForm.collegeId) {
      toast.error("Name and college are required.")
      return
    }
    setIsSavingParticipant(true)
    try {
      const payload = {
        name: pForm.name.trim(),
        email: pForm.email.trim(),
        college: pForm.college.trim(),
        collegeId: pForm.collegeId,
        unstopId: pForm.unstopId.trim(),
        day1: pForm.day1, day2: pForm.day2, day3: pForm.day3,
        day4: pForm.day4, day5: pForm.day5, day6: pForm.day6,
        isVerified: pForm.isVerified,
        isHidden: pForm.isHidden,
      }
      if (editingParticipant) {
        await updateParticipant(editingParticipant.id, payload)
        toast.success("Participant scores updated.")
      } else {
        await addParticipant(payload as any)
        toast.success("Participant added successfully.")
      }
      setIsParticipantModalOpen(false)
    } catch (err) {
      toast.error("Failed to save participant.")
    } finally {
      setIsSavingParticipant(false)
    }
  }

  const handleDeleteParticipant = async (p: Participant) => {
    if (!confirm(`Delete ${p.name} from the scoreboard?`)) return
    setIsDeletingScoreboardId(p.id)
    try {
      await deleteParticipant(p.id, p.collegeId)
      toast.success(`${p.name} removed from scoreboard.`)
    } catch (err) {
      toast.error("Failed to delete participant.")
    } finally {
      setIsDeletingScoreboardId(null)
    }
  }

  const openAddCollege = () => {
    setEditingCollege(null)
    setCForm({ name: "", city: "", state: "", logoUrl: "", websiteUrl: "", isHidden: false })
    setIsCollegeModalOpen(true)
  }

  const openEditCollege = (c: College) => {
    setEditingCollege(c)
    setCForm({ name: c.name, city: c.city, state: c.state, logoUrl: c.logoUrl, websiteUrl: c.websiteUrl || "", isHidden: Boolean(c.isHidden) })
    setIsCollegeModalOpen(true)
  }

  const handleToggleCollegeVisibility = async (c: College, isHidden: boolean) => {
    try {
      await toggleCollegeVisibility(c.id, isHidden)
      toast.success(
        isHidden
          ? `"${c.name}" is now hidden from public view.`
          : `"${c.name}" is now visible on public directory.`
      )
    } catch (err: any) {
      toast.error(err?.message || "Failed to update college visibility.")
    }
  }

  const handleSaveCollege = async () => {
    if (!cForm.name.trim()) {
      toast.error("College name is required.")
      return
    }
    setIsSavingCollege(true)
    try {
      const payload = {
        ...cForm,
        name: cForm.name.trim(),
        city: cForm.city.trim(),
        state: cForm.state.trim(),
        logoUrl: cForm.logoUrl.trim(),
        websiteUrl: cForm.websiteUrl.trim(),
      }
      if (editingCollege) {
        await updateCollege(editingCollege.id, payload)
        toast.success("College updated.")
      } else {
        await addCollege(payload)
        toast.success("College added.")
      }
      setIsCollegeModalOpen(false)
    } catch (err) {
      toast.error("Failed to save college.")
    } finally {
      setIsSavingCollege(false)
    }
  }

  const handleDeleteCollege = async (c: College) => {
    if (!confirm(`Delete "${c.name}" and ALL its participants?`)) return
    setIsDeletingScoreboardId(c.id)
    try {
      await deleteCollege(c.id)
      toast.success(`"${c.name}" deleted along with all its participants.`)
    } catch (err) {
      toast.error("Failed to delete college.")
    } finally {
      setIsDeletingScoreboardId(null)
    }
  }

  const handleRecalcAll = async () => {
    try {
      await recalculateAllParticipantScores()
      toast.success("All scores recalculated.")
    } catch (err) {
      toast.error("Failed to recalculate scores.")
    }
  }

  const pDayField = (day: keyof typeof pForm, field: keyof DayScore, val: string) => {
    const num = Math.max(0, Number(val) || 0)
    setPForm((prev) => ({ ...prev, [day]: { ...(prev[day] as DayScore), [field]: num } }))
  }

  const filteredParticipants = participants.filter((p) => {
    const q = participantSearch.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.college.toLowerCase().includes(q) || (p.email && p.email.toLowerCase().includes(q))
  })

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
  const handleSendMessage = async (ticketId: string, text: string) => {
    if (!text.trim() || !currentUser) return
    const ticket = tickets.find((t) => t.id === ticketId)
    if (!ticket) return

    try {
      await sendMessageInTicket(
        ticketId,
        {
          senderId: currentUser.uid,
          senderName: userProfile?.displayName || "DAVNS Operations",
          senderRole: "admin",
          senderPhoto: currentUser.photoURL || null,
          text: text.trim(),
        },
        ticket.messages || [],
        ticket.status === "open" ? "in-progress" : undefined
      )
      toast.success("Reply sent to user.")
    } catch (err) {
      toast.error("Failed to send reply.")
      throw err
    }
  }

  // Admin edit message
  const handleEditMessage = async (ticketId: string, messageId: string, newText: string) => {
    const targetTicket = tickets.find((t) => t.id === ticketId)
    if (!targetTicket) return
    await editMessageInTicket(ticketId, messageId, newText, targetTicket.messages || [])
  }

  // Admin delete message
  const handleDeleteMessage = async (ticketId: string, messageId: string) => {
    const targetTicket = tickets.find((t) => t.id === ticketId)
    if (!targetTicket) return
    await deleteMessageInTicket(ticketId, messageId, targetTicket.messages || [])
  }

  // Change ticket status
  const handleUpdateStatus = async (ticketId: string, status: TicketStatus) => {
    try {
      await updateTicketStatus(ticketId, status)
      toast.success(`Ticket marked as ${status.toUpperCase()}.`)
    } catch (err) {
      toast.error("Failed to update ticket status.")
      throw err
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

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

            {/* Hackathons */}
            <button
              onClick={() => {
                setActiveTab("hackathons")
                setIsMobileNavOpen(false)
              }}
              title="Hackathons & Competitions"
              className={`w-full flex items-center justify-between rounded-2xl transition-all cursor-pointer ${
                isExpanded ? "px-4 py-3" : "p-3 justify-center"
              } ${
                activeTab === "hackathons"
                  ? "bg-[#FACC15] text-slate-950 font-bold shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className={`flex items-center ${isExpanded ? "gap-3" : "justify-center"}`}>
                <Trophy className="w-4 h-4 shrink-0" />
                {isExpanded && <span className="truncate">HACKATHONS</span>}
              </div>
              {isExpanded && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/20 text-slate-900 font-extrabold shrink-0">
                  {participants.length}
                </span>
              )}
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
      <main
        className={`flex-1 w-full max-w-full overflow-hidden transition-all ${
          activeTab === "tickets"
            ? "p-0 h-[calc(100dvh-56px)] md:h-screen overflow-hidden flex flex-col bg-white"
            : "p-3.5 sm:p-6 lg:p-10 max-h-screen overflow-y-auto bg-slate-50"
        }`}
      >
        
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
          <div className="w-full h-full flex-1 flex flex-col">
            <SupportChatLayout
              role="admin"
              tickets={tickets}
              selectedTicketId={selectedTicketId}
              onSelectTicket={setSelectedTicketId}
              onSendMessage={handleSendMessage}
              onEditMessage={handleEditMessage}
              onDeleteMessage={handleDeleteMessage}
              onUpdateStatus={handleUpdateStatus}
              currentUserId={currentUser?.uid || ""}
              currentUserName={userProfile?.displayName || "DAVNS Operations"}
              currentUserPhoto={currentUser?.photoURL || userProfile?.photoURL}
            />
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

        {/* TAB 4: HACKATHONS & COMPETITIONS MANAGEMENT */}
        {activeTab === "hackathons" && (
          <div className="max-w-6xl mx-auto space-y-6 animate-fade-in-simple">
            {/* ── VIEW 1: HACKATHONS SELECTION HUB ── */}
            {!selectedHackathon ? (
              <div className="space-y-6">
                {/* Hub Header */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-5 h-5 text-[#7C3AED]" />
                    <span className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider">
                      COMPETITIONS & CHALLENGE CONSOLE
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Hackathons & Challenges Hub
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 font-light mt-0.5">
                    Select a competition below to manage 6-day Unstop score uploads, student participants, scorecards, colleges, and public visibility.
                  </p>
                </div>

                {/* Competitions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Card 1: DAVNS Perspective 2026 */}
                  <div className="rounded-[32px] bg-white border-2 border-purple-200/90 p-6 sm:p-7 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 via-[#FACC15]/10 to-transparent rounded-bl-full pointer-events-none" />

                    <div>
                      {/* Top Tag & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold uppercase">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          ACTIVE EVENT • SEP 1–6, 2026
                        </span>

                        <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#7C3AED] border border-purple-200 text-[10px] font-mono font-bold">
                          6-Day Challenge
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#7C3AED] transition-colors">
                        DAVNS PERSPECTIVE 2026
                      </h2>
                      <div className="text-xs font-mono font-bold text-amber-600 uppercase tracking-wider mt-0.5">
                        The Thinking Challenge
                      </div>

                      <p className="text-xs text-slate-500 font-light mt-3 leading-relaxed">
                        Multi-day national quiz challenge with 4-pillar deterministic scoring (Accuracy, Consistency, Completion, and Speed). Max score: 1,050 points.
                      </p>

                      {/* Stats Pills Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Students</div>
                          <div className="text-base font-extrabold text-[#7C3AED] font-mono mt-0.5">{participants.length}</div>
                        </div>
                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Colleges</div>
                          <div className="text-base font-extrabold text-amber-600 font-mono mt-0.5">{colleges.length}</div>
                        </div>
                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Top Score</div>
                          <div className="text-base font-extrabold text-emerald-600 font-mono mt-0.5">
                            {participants.length > 0 ? participants[0].totalPoints.toFixed(0) : "—"}
                          </div>
                        </div>
                        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                          <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Avg Score</div>
                          <div className="text-base font-extrabold text-sky-600 font-mono mt-0.5">
                            {participants.length > 0 ? (participants.reduce((s,p) => s + p.totalPoints, 0) / participants.length).toFixed(0) : "—"}
                          </div>
                        </div>
                      </div>

                      {/* Current Public View Mode indicator */}
                      <div className="mt-4 p-3 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-600 font-medium">Public Status:</span>
                        <span className="font-bold text-[#7C3AED]">
                          {perspectiveConfig.displayMode === "leaderboard" || perspectiveConfig.isLeaderboardPublished
                            ? "🏆 Live Leaderboard Published"
                            : "🏫 Registered Colleges Directory"}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedHackathon("perspective-2026")}
                        className="flex-1 py-3 px-5 rounded-2xl bg-[#7C3AED] hover:bg-purple-700 text-white font-mono text-xs font-black tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.02]"
                      >
                        <Trophy className="w-4 h-4 text-[#FACC15]" />
                        <span>Manage Challenge & Scores →</span>
                      </button>

                      <a
                        href="/perspective/scoreboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-2xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 border border-slate-200 font-mono text-xs font-bold transition-all flex items-center justify-center"
                        title="View Public Scoreboard in New Tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Card 2: Create New Hackathon / Coming Soon */}
                  <div className="rounded-[32px] bg-slate-50/60 border-2 border-dashed border-slate-200 p-6 sm:p-7 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-slate-400">
                      <Plus className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-base">New Hackathon / Competition</h3>
                    <p className="text-xs text-slate-400 font-light max-w-xs leading-relaxed">
                      Upcoming technical hackathons and competitive challenges will be listed here with independent scorecards and leaderboards.
                    </p>
                    <button
                      onClick={() => toast.info("New competition creation wizard is coming in the next release.")}
                      className="mt-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-mono text-xs font-bold transition-all cursor-pointer shadow-2xs"
                    >
                      + Create Competition
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ── VIEW 2: PERSPECTIVE 2026 DEDICATED SCOREBOARD MANAGEMENT ── */
              <div className="space-y-5 sm:space-y-6">
                {/* Back to Hub Navigation Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-[28px] border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedHackathon(null)}
                      className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Hackathons Hub</span>
                    </button>

                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#7C3AED] uppercase tracking-wider">
                        COMPETITION CONSOLE
                      </div>
                      <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                        DAVNS PERSPECTIVE 2026
                      </h1>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRecalcAll}
                      className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-xs font-mono font-bold text-slate-800 flex items-center gap-2 border border-slate-200 shadow-2xs cursor-pointer transition-all"
                      title="Recalculate all 6-day participant scores using formulas"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span>Recalc All Scores</span>
                    </button>
                    <a
                      href="/perspective/scoreboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-yellow-400 text-xs font-mono font-bold text-slate-950 flex items-center gap-2 shadow-2xs cursor-pointer transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Public View</span>
                    </a>
                  </div>
                </div>

            {/* ── Public Leaderboard Visibility & Mode Controller ── */}
            <div className="p-4 sm:p-5 rounded-[28px] bg-gradient-to-r from-purple-900/90 to-slate-900 text-white border border-purple-800/50 shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
                    PUBLIC VIEW MODE:
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black uppercase tracking-wider ${
                      perspectiveConfig.displayMode === "leaderboard" || perspectiveConfig.isLeaderboardPublished
                        ? "bg-emerald-400 text-slate-950 shadow-xs"
                        : "bg-[#FACC15] text-slate-950 shadow-xs"
                    }`}
                  >
                    {perspectiveConfig.displayMode === "leaderboard" || perspectiveConfig.isLeaderboardPublished
                      ? "🏆 LIVE LEADERBOARD (Student Ranks & Points Published)"
                      : "🏫 REGISTERED COLLEGES ONLY (Pre-Challenge Directory)"}
                  </span>

                  {perspectiveConfig.hideStudentCounts ? (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9.5px] font-mono font-bold">
                      🚫 Student Counts Hidden
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/20 text-[9.5px] font-mono">
                      ✓ Student Counts Visible
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 font-light">
                  {perspectiveConfig.displayMode === "leaderboard" || perspectiveConfig.isLeaderboardPublished
                    ? "Visitors currently see the full student rankings, podium, and calculated scores."
                    : "Visitors currently see the registered institutions directory without early rankings."}
                </p>
              </div>

              {/* Mode Toggle Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <button
                  onClick={handleToggleHideStudentCounts}
                  disabled={isUpdatingDisplayMode}
                  className={`px-3.5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                    perspectiveConfig.hideStudentCounts
                      ? "bg-rose-500 text-white border-rose-400 shadow-xs"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                  }`}
                  title="Toggle whether exact student counts appear on public pages"
                >
                  {perspectiveConfig.hideStudentCounts ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{perspectiveConfig.hideStudentCounts ? "Counts Hidden" : "Hide Student Counts"}</span>
                </button>

                <button
                  onClick={() => handleToggleDisplayMode("colleges_only")}
                  disabled={isUpdatingDisplayMode || (perspectiveConfig.displayMode === "colleges_only" && !perspectiveConfig.isLeaderboardPublished)}
                  className={`px-3.5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    perspectiveConfig.displayMode === "colleges_only" && !perspectiveConfig.isLeaderboardPublished
                      ? "bg-[#FACC15] text-slate-950 shadow-md cursor-default ring-2 ring-yellow-300"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Show Registered Colleges</span>
                </button>

                <button
                  onClick={() => handleToggleDisplayMode("leaderboard")}
                  disabled={isUpdatingDisplayMode || (perspectiveConfig.displayMode === "leaderboard" || perspectiveConfig.isLeaderboardPublished)}
                  className={`px-3.5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    perspectiveConfig.displayMode === "leaderboard" || perspectiveConfig.isLeaderboardPublished
                      ? "bg-emerald-400 text-slate-950 shadow-md cursor-default ring-2 ring-emerald-300"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Publish Leaderboard</span>
                </button>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "PARTICIPANTS", value: participants.length, color: "text-purple-600" },
                { label: "COLLEGES", value: colleges.length, color: "text-amber-600" },
                { label: "TOP SCORE", value: participants.length > 0 ? participants[0].totalPoints.toFixed(0) : "—", color: "text-emerald-600" },
                { label: "AVG SCORE", value: participants.length > 0 ? (participants.reduce((s,p) => s + p.totalPoints, 0) / participants.length).toFixed(0) : "—", color: "text-sky-600" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-[24px] bg-white border border-slate-200 shadow-2xs">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">{s.label}</div>
                  <div className={`text-2xl font-extrabold font-mono mt-1 ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Sub-tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-0">
              {[
                { id: "participants", label: `Participants (${participants.length})` },
                { id: "marks", label: `Daily Marks (Day 1–6)` },
                { id: "colleges", label: `Colleges (${colleges.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setScoreboardSubTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-t-xl font-mono text-xs font-bold capitalize transition-all cursor-pointer border-b-2 -mb-px ${
                    scoreboardSubTab === tab.id
                      ? "border-[#7C3AED] text-[#7C3AED] bg-purple-50"
                      : "border-transparent text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* PARTICIPANTS SUB-TAB */}
            {scoreboardSubTab === "participants" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search participant..."
                      value={participantSearch}
                      onChange={(e) => setParticipantSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#7C3AED] shadow-2xs"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setIsCsvImportModalOpen(true)}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-yellow-400 text-slate-950 font-mono text-xs font-black cursor-pointer transition-all shadow-sm"
                    >
                      <FileSpreadsheet className="w-4 h-4" />
                      Upload Unstop CSV / Excel
                    </button>
                    <button
                      onClick={openAddParticipant}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#7C3AED] hover:bg-purple-700 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Participant
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[850px]">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          <th className="py-3.5 px-4 w-12">Rank</th>
                          <th className="py-3.5 px-4">Student</th>
                          <th className="py-3.5 px-4">College</th>
                          <th className="py-3.5 px-4">Daily Scores (D1–D6)</th>
                          <th className="py-3.5 px-4">Accuracy / Bonus</th>
                          <th className="py-3.5 px-4 font-bold text-slate-900">Total Pts</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredParticipants.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-10 text-center text-slate-400 font-mono text-sm">
                              {participants.length === 0 ? "No participants yet. Add or import from Unstop CSV!" : "No results match your search."}
                            </td>
                          </tr>
                        ) : (
                          filteredParticipants.map((p) => {
                            const daysList = [p.day1, p.day2, p.day3, p.day4, p.day5, p.day6]
                            const daysParticipated = daysList.filter(d => d && d.total > 0).length

                            return (
                              <tr key={p.id} className={`hover:bg-slate-50/60 transition-colors ${p.isHidden ? "opacity-60 bg-slate-50/40" : ""}`}>
                                <td className="py-3 px-4">
                                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-extrabold text-[11px] ${
                                    p.rank === 1 ? "bg-amber-400 text-amber-950" : p.rank === 2 ? "bg-slate-200 text-slate-800" : p.rank === 3 ? "bg-amber-700 text-white" : "bg-slate-100 text-slate-600"
                                  }`}>
                                    {p.rank <= 3 ? ["🥇","🥈","🥉"][p.rank-1] : `#${p.rank}`}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <span>{p.name}</span>
                                    {p.isHidden && (
                                      <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 text-[8.5px] font-mono font-bold">
                                        HIDDEN
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                                    <span className="truncate max-w-[140px]">{p.email || "—"}</span>
                                    {p.unstopId && <span className="text-slate-300">• {p.unstopId}</span>}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-slate-700 font-semibold max-w-[180px] truncate" title={p.college}>
                                  {p.college}
                                </td>
                                <td className="py-3 px-4">
                                  {/* Day 1 to 6 interactive mini badges */}
                                  <div className="flex items-center gap-1">
                                    {daysList.map((d, dIdx) => {
                                      const isAttempted = d && d.total > 0
                                      return (
                                        <span
                                          key={dIdx}
                                          title={`Day ${dIdx + 1}: ${isAttempted ? `${d.correct}/${d.total} (${d.timeSecs}s)` : "Not Attempted"}`}
                                          className={`px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold ${
                                            isAttempted
                                              ? d.correct >= 25
                                                ? "bg-emerald-100 text-emerald-800"
                                                : "bg-purple-100 text-[#7C3AED]"
                                              : "bg-slate-100 text-slate-400"
                                          }`}
                                        >
                                          D{dIdx + 1}:{isAttempted ? d.correct : "—"}
                                        </span>
                                      )
                                    })}
                                  </div>
                                </td>
                                <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                                  <div>Acc: <strong className="text-purple-700">{p.accuracyScore.toFixed(0)}</strong></div>
                                  <div className="text-[10px] text-slate-400">Bonuses: +{(p.consistencyBonus + p.completionScore + p.timeBonus).toFixed(0)}</div>
                                </td>
                                <td className="py-3 px-4 font-extrabold text-emerald-600 font-mono text-sm">
                                  {p.totalPoints.toFixed(1)}
                                  <span className="text-[9px] text-slate-400 font-normal"> /1050</span>
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => handleToggleParticipantVisibility(p, !p.isHidden)}
                                      className={`px-2 py-1 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                        p.isHidden
                                          ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300"
                                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                                      }`}
                                      title={p.isHidden ? "Currently hidden from public leaderboard. Click to show." : "Currently visible. Click to hide."}
                                    >
                                      {p.isHidden ? <EyeOff className="w-3 h-3 text-slate-500" /> : <Eye className="w-3 h-3 text-emerald-600" />}
                                      <span>{p.isHidden ? "Hidden" : "Visible"}</span>
                                    </button>
                                    <button
                                      onClick={() => openEditParticipant(p)}
                                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-[#7C3AED] border border-slate-200 hover:border-purple-200 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                                    >
                                      <Pencil className="w-3 h-3" />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteParticipant(p)}
                                      disabled={isDeletingScoreboardId === p.id}
                                      className="px-2.5 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      {isDeletingScoreboardId === p.id ? "..." : "Delete"}
                                    </button>
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

            {/* ── SUB-TAB 2: DAILY MARKS & SCORES MATRIX (DAY 1–6) ── */}
            {scoreboardSubTab === "marks" && (
              <div className="space-y-6">
                {/* 6 Quick Ingestion Cards for Day 1 through Day 6 */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        Daily CSV / Excel Ingestion & Scores
                      </h3>
                      <p className="text-xs text-slate-500 font-light">
                        Upload daily quiz result files from Unstop for each day. Formula automatically merges candidate scores and calculates college totals.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {([1, 2, 3, 4, 5, 6] as const).map((dayNum) => {
                      const dayKey = `day${dayNum}` as const
                      const attemptedCount = participants.filter((p) => p[dayKey] && p[dayKey].total > 0).length
                      const totalAttemptedScores = participants.reduce((s, p) => s + (p[dayKey]?.correct || 0), 0)
                      const avgDayScore = attemptedCount > 0 ? (totalAttemptedScores / attemptedCount).toFixed(1) : "0"

                      return (
                        <div
                          key={dayNum}
                          className="rounded-3xl bg-white border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-purple-200 transition-all flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="font-extrabold text-[#7C3AED] uppercase">Round {dayNum}</span>
                              <span className="text-slate-400 font-medium">Sep {dayNum}</span>
                            </div>
                            <div className="text-lg font-extrabold font-mono text-slate-900 mt-1">
                              Day {dayNum}
                            </div>
                            <div className="text-[10.5px] font-mono text-slate-500 mt-0.5">
                              {attemptedCount} attempted
                            </div>
                            <div className="text-[9.5px] font-mono text-slate-400 mt-0.5">
                              Avg: {avgDayScore}/30
                            </div>
                          </div>

                          <button
                            onClick={() => openCsvModalForDay(dayNum)}
                            className="w-full py-2 px-2.5 rounded-xl bg-purple-50 hover:bg-[#7C3AED] text-[#7C3AED] hover:text-white font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <Upload className="w-3 h-3" />
                            <span>Upload Day {dayNum}</span>
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Day Filter & College Filter Bar */}
                <div className="bg-white p-4 rounded-[28px] border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    {/* Day selector pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
                      <button
                        onClick={() => setMarksSelectedDay("all")}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer shrink-0 ${
                          marksSelectedDay === "all"
                            ? "bg-[#7C3AED] text-white shadow-2xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        All 6 Days Matrix
                      </button>
                      {([1, 2, 3, 4, 5, 6] as const).map((dNum) => (
                        <button
                          key={dNum}
                          onClick={() => setMarksSelectedDay(dNum)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer shrink-0 ${
                            marksSelectedDay === dNum
                              ? "bg-[#7C3AED] text-white shadow-2xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          Day {dNum}
                        </button>
                      ))}
                    </div>

                    {/* College Filter */}
                    <div className="w-full sm:w-64">
                      <select
                        value={marksCollegeFilter}
                        onChange={(e) => setMarksCollegeFilter(e.target.value)}
                        className="w-full px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 outline-none focus:border-[#7C3AED]"
                      >
                        <option value="all">All Colleges ({colleges.length})</option>
                        {colleges.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Daily Scores Matrix Table */}
                <div className="bg-white rounded-[28px] border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[850px]">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          <th className="py-3.5 px-4 w-12">Rank</th>
                          <th className="py-3.5 px-4">Student & College</th>
                          {marksSelectedDay === "all" ? (
                            <>
                              <th className="py-3.5 px-3 text-center">Day 1</th>
                              <th className="py-3.5 px-3 text-center">Day 2</th>
                              <th className="py-3.5 px-3 text-center">Day 3</th>
                              <th className="py-3.5 px-3 text-center">Day 4</th>
                              <th className="py-3.5 px-3 text-center">Day 5</th>
                              <th className="py-3.5 px-3 text-center">Day 6</th>
                              <th className="py-3.5 px-3 text-center">Accuracy (/600)</th>
                              <th className="py-3.5 px-3 text-center">Consistency (/300)</th>
                            </>
                          ) : (
                            <>
                              <th className="py-3.5 px-4 text-center">Day {marksSelectedDay} Correct</th>
                              <th className="py-3.5 px-4 text-center">Day {marksSelectedDay} Total</th>
                              <th className="py-3.5 px-4 text-center">Time Taken</th>
                              <th className="py-3.5 px-4 text-center">Day Accuracy Pts</th>
                              <th className="py-3.5 px-4 text-center">Speed Bonus</th>
                            </>
                          )}
                          <th className="py-3.5 px-4 font-bold text-slate-900">Total Points</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredParticipants
                          .filter((p) => marksCollegeFilter === "all" || p.college === marksCollegeFilter)
                          .map((p) => {
                            const dScore = marksSelectedDay !== "all" ? p[`day${marksSelectedDay}` as const] : null

                            return (
                              <tr key={p.id} className={`hover:bg-slate-50/60 transition-colors ${p.isHidden ? "opacity-60 bg-slate-50/40" : ""}`}>
                                <td className="py-3 px-4">
                                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-extrabold text-[11px] ${
                                    p.rank === 1 ? "bg-amber-400 text-amber-950" : p.rank === 2 ? "bg-slate-200 text-slate-800" : p.rank === 3 ? "bg-amber-700 text-white" : "bg-slate-100 text-slate-600"
                                  }`}>
                                    {p.rank <= 3 ? ["🥇","🥈","🥉"][p.rank-1] : `#${p.rank}`}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                    <span>{p.name}</span>
                                    {p.isHidden && (
                                      <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-600 text-[8.5px] font-mono font-bold">
                                        HIDDEN
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10.5px] text-purple-700 font-mono truncate max-w-[170px]">{p.college}</div>
                                </td>

                                {marksSelectedDay === "all" ? (
                                  <>
                                    {[p.day1, p.day2, p.day3, p.day4, p.day5, p.day6].map((d, dIdx) => (
                                      <td key={dIdx} className="py-3 px-3 text-center font-mono">
                                        {d && d.total > 0 ? (
                                          <span className={`font-bold ${d.correct >= 25 ? "text-emerald-700" : "text-slate-800"}`}>
                                            {d.correct}/{d.total}
                                          </span>
                                        ) : (
                                          <span className="text-slate-300">—</span>
                                        )}
                                      </td>
                                    ))}
                                    <td className="py-3 px-3 text-center font-mono font-bold text-purple-700">
                                      {p.accuracyScore.toFixed(0)}
                                    </td>
                                    <td className="py-3 px-3 text-center font-mono font-bold text-amber-700">
                                      {p.consistencyBonus.toFixed(0)}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">
                                      {dScore && dScore.total > 0 ? `${dScore.correct} / 30` : "—"}
                                    </td>
                                    <td className="py-3 px-4 text-center font-mono text-slate-600">
                                      {dScore && dScore.total > 0 ? `${dScore.total} questions` : "Not Attempted"}
                                    </td>
                                    <td className="py-3 px-4 text-center font-mono text-slate-500">
                                      {dScore && dScore.total > 0 ? `${dScore.timeSecs}s` : "—"}
                                    </td>
                                    <td className="py-3 px-4 text-center font-mono font-bold text-purple-700">
                                      {dScore && dScore.total > 0 ? ((dScore.correct / 30) * 100).toFixed(1) : "0"}
                                    </td>
                                    <td className="py-3 px-4 text-center font-mono font-bold text-sky-600">
                                      {dScore && dScore.total > 0 && dScore.timeSecs < 900 ? "+5" : "0"}
                                    </td>
                                  </>
                                )}

                                <td className="py-3 px-4 font-extrabold text-emerald-600 font-mono text-sm">
                                  {p.totalPoints.toFixed(1)}
                                  <span className="text-[9px] text-slate-400 font-normal"> /1050</span>
                                </td>

                                <td className="py-3 px-4 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => handleToggleParticipantVisibility(p, !p.isHidden)}
                                      className={`px-2 py-1 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                        p.isHidden
                                          ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300"
                                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                                      }`}
                                      title={p.isHidden ? "Currently hidden. Click to show." : "Currently visible. Click to hide."}
                                    >
                                      {p.isHidden ? <EyeOff className="w-3 h-3 text-slate-500" /> : <Eye className="w-3 h-3 text-emerald-600" />}
                                    </button>
                                    <button
                                      onClick={() => openEditParticipant(p)}
                                      className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#7C3AED] border border-purple-200 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                                      title="Edit 6-day scores and formula recalculation"
                                    >
                                      <Pencil className="w-3 h-3" />
                                      Edit Marks
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* COLLEGES SUB-TAB */}
            {scoreboardSubTab === "colleges" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs font-mono text-slate-500">
                    Total Registered Institutions: <strong className="text-slate-900 font-bold">{colleges.length}</strong>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleMergeDuplicates}
                      disabled={isMergingColleges}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-[#7C3AED] border border-purple-200 font-mono text-xs font-bold cursor-pointer transition-all shadow-2xs disabled:opacity-50"
                      title="Merge variations like 'SRM Easwari', 'RMKCET', 'WCC' into canonical names and move all students"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {isMergingColleges ? "Merging Duplicates..." : "Merge Duplicate Colleges"}
                    </button>

                    <button
                      onClick={openAddCollege}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-[#7C3AED] hover:bg-purple-700 text-white font-mono text-xs font-bold cursor-pointer transition-all shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add College
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-[28px] border border-slate-200 shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs min-w-[600px]">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                          <th className="py-3.5 px-5">College</th>
                          <th className="py-3.5 px-5">Location</th>
                          <th className="py-3.5 px-5">Participants</th>
                          <th className="py-3.5 px-5">Total Points</th>
                          <th className="py-3.5 px-5">Rank</th>
                          <th className="py-3.5 px-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {colleges.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-10 text-center text-slate-400 font-mono text-sm">
                              No colleges yet. Add the first college!
                            </td>
                          </tr>
                        ) : (
                          colleges.map((c) => (
                            <tr key={c.id} className={`hover:bg-slate-50/60 transition-colors ${c.isHidden ? "opacity-60 bg-slate-50/40" : ""}`}>
                              <td className="py-3.5 px-5">
                                <div className="flex items-center gap-3">
                                  {c.logoUrl ? (
                                    <img src={c.logoUrl} alt={c.name} className="w-8 h-8 rounded-lg object-contain bg-white border border-slate-200 p-0.5 shrink-0" onError={(e) => { e.currentTarget.style.display="none" }} />
                                  ) : (
                                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-mono font-extrabold text-xs flex items-center justify-center shrink-0">{c.name.charAt(0)}</div>
                                  )}
                                  <div>
                                    <div className="font-bold text-slate-900 flex items-center gap-2">
                                      <span>{c.name}</span>
                                      {c.isHidden && (
                                        <span className="px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-600 text-[9px] font-mono font-bold uppercase tracking-wider">
                                          HIDDEN
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-5 font-mono text-slate-500">{c.city}, {c.state}</td>
                              <td className="py-3.5 px-5 font-mono text-slate-700">{c.participantCount}</td>
                              <td className="py-3.5 px-5 font-extrabold text-emerald-600 font-mono">{c.totalPoints.toFixed(0)}</td>
                              <td className="py-3.5 px-5">
                                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-extrabold text-[11px] ${
                                  c.rank === 1 ? "bg-amber-400 text-amber-950" : c.rank === 2 ? "bg-slate-200 text-slate-800" : c.rank === 3 ? "bg-amber-700 text-white" : "bg-slate-100 text-slate-600"
                                }`}>
                                  #{c.rank}
                                </span>
                              </td>
                              <td className="py-3.5 px-5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleToggleCollegeVisibility(c, !c.isHidden)}
                                    className={`px-2.5 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                                      c.isHidden
                                        ? "bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-300"
                                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
                                    }`}
                                    title={c.isHidden ? "Currently hidden. Click to Show." : "Currently visible. Click to Hide."}
                                  >
                                    {c.isHidden ? (
                                      <>
                                        <EyeOff className="w-3 h-3 text-slate-500" />
                                        <span>Hidden</span>
                                      </>
                                    ) : (
                                      <>
                                        <Eye className="w-3 h-3 text-emerald-600" />
                                        <span>Visible</span>
                                      </>
                                    )}
                                  </button>
                                  <button onClick={() => openEditCollege(c)} className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-[#7C3AED] border border-slate-200 hover:border-purple-200 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1">
                                    <Pencil className="w-3 h-3" />Edit
                                  </button>
                                  <button onClick={() => handleDeleteCollege(c)} disabled={isDeletingScoreboardId === c.id} className="px-2.5 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 font-mono text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1">
                                    <Trash2 className="w-3 h-3" />{isDeletingScoreboardId === c.id ? "..." : "Delete"}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
              </div>
            )}
          </div>
        )}

      </main>

      {/* ── PARTICIPANT ADD/EDIT MODAL ── */}
      {isParticipantModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in-simple">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 relative max-h-[92vh] overflow-y-auto">
            <button onClick={() => setIsParticipantModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-extrabold text-slate-900 mb-5">
              {editingParticipant ? "Edit Participant Scores" : "Add New Participant"}
            </h2>

            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Student Name *</label>
                  <input value={pForm.name} onChange={(e) => setPForm(f => ({ ...f, name: e.target.value }))} placeholder="Full Name" className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#7C3AED] bg-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Email</label>
                  <input value={pForm.email} onChange={(e) => setPForm(f => ({ ...f, email: e.target.value }))} placeholder="student@college.edu" className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#7C3AED] bg-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">College *</label>
                  <select
                    value={pForm.collegeId}
                    onChange={(e) => {
                      const selected = colleges.find(c => c.id === e.target.value)
                      setPForm(f => ({ ...f, collegeId: e.target.value, college: selected?.name || "" }))
                    }}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#7C3AED] bg-white cursor-pointer"
                  >
                    <option value="">— Select College —</option>
                    {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">Unstop ID (optional)</label>
                  <input value={pForm.unstopId} onChange={(e) => setPForm(f => ({ ...f, unstopId: e.target.value }))} placeholder="Unstop registration ID" className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#7C3AED] bg-white" />
                </div>
              </div>

              {/* Daily Scores */}
              <div>
                <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Daily Scores (Day 1–6)</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {([1,2,3,4,5,6] as const).map((dayNum) => {
                    const dayKey = `day${dayNum}` as keyof typeof pForm
                    const dayData = pForm[dayKey] as DayScore
                    return (
                      <div key={dayNum} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="text-[10px] font-mono font-bold text-slate-500 uppercase">Day {dayNum}</div>
                        <div className="space-y-1.5">
                          <div>
                            <label className="text-[9px] text-slate-400 font-mono">Correct (0-30)</label>
                            <input type="number" min={0} max={30} value={dayData.correct} onChange={(e) => pDayField(dayKey, "correct", e.target.value)} className="w-full mt-0.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#7C3AED] bg-white" />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-400 font-mono">Attempted (0-30)</label>
                            <input type="number" min={0} max={30} value={dayData.total} onChange={(e) => pDayField(dayKey, "total", e.target.value)} className="w-full mt-0.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#7C3AED] bg-white" />
                          </div>
                          <div>
                            <label className="text-[9px] text-slate-400 font-mono">Time (seconds)</label>
                            <input type="number" min={0} value={dayData.timeSecs} onChange={(e) => pDayField(dayKey, "timeSecs", e.target.value)} className="w-full mt-0.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-[#7C3AED] bg-white" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Calculated preview */}
              {(() => {
                const preview = calculateScores(pForm as any)
                return (
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div><div className="text-slate-500">Accuracy</div><div className="text-purple-700 font-extrabold text-base">{preview.accuracyScore.toFixed(1)}</div></div>
                    <div><div className="text-slate-500">Consistency</div><div className="text-amber-700 font-extrabold text-base">{preview.consistencyBonus.toFixed(1)}</div></div>
                    <div><div className="text-slate-500">Completion</div><div className="text-emerald-700 font-extrabold text-base">{preview.completionScore.toFixed(1)}</div></div>
                    <div><div className="text-slate-500">TOTAL</div><div className="text-slate-900 font-extrabold text-base">{preview.totalPoints.toFixed(1)}<span className="text-[10px] text-slate-400">/1050</span></div></div>
                  </div>
                )
              })()}

              {/* Verified & Hidden toggles */}
              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={pForm.isVerified} onChange={(e) => setPForm(f => ({ ...f, isVerified: e.target.checked }))} className="w-4 h-4 rounded accent-[#7C3AED]" />
                  <span className="text-xs text-slate-700 font-mono">Mark as admin-verified entry</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={pForm.isHidden} onChange={(e) => setPForm(f => ({ ...f, isHidden: e.target.checked }))} className="w-4 h-4 rounded accent-[#7C3AED]" />
                  <span className="text-xs text-slate-700 font-mono">Hide student from public leaderboard</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setIsParticipantModalOpen(false)} className="flex-1 py-3 rounded-full border border-slate-200 text-slate-700 font-mono text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSaveParticipant} disabled={isSavingParticipant} className="flex-1 py-3 rounded-full bg-[#7C3AED] hover:bg-purple-700 text-white font-mono text-xs font-extrabold transition-all cursor-pointer disabled:opacity-50">
                {isSavingParticipant ? "Saving..." : editingParticipant ? "Update Scores" : "Add Participant"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── COLLEGE ADD/EDIT MODAL ── */}
      {isCollegeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in-simple">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 relative">
            <button onClick={() => setIsCollegeModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            <h2 className="text-xl font-extrabold text-slate-900 mb-5">
              {editingCollege ? "Edit College" : "Add College"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">College Name *</label>
                <input value={cForm.name} onChange={(e) => setCForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. IIT Bombay" className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#7C3AED] bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">City</label>
                  <input value={cForm.city} onChange={(e) => setCForm(f => ({ ...f, city: e.target.value }))} placeholder="Mumbai" className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#7C3AED] bg-white" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">State</label>
                  <input value={cForm.state} onChange={(e) => setCForm(f => ({ ...f, state: e.target.value }))} placeholder="Maharashtra" className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-sm text-slate-900 outline-none focus:border-[#7C3AED] bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  College Logo / Emblem URL (Direct Image URL)
                </label>
                <input
                  value={cForm.logoUrl}
                  onChange={(e) => setCForm(f => ({ ...f, logoUrl: e.target.value }))}
                  placeholder="https://example.com/logo.png (or from Wikimedia / College website)"
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-mono text-slate-900 outline-none focus:border-[#7C3AED] bg-white"
                />
                <p className="text-[10px] text-slate-400 font-mono mt-1">
                  Paste the direct URL to the college logo (PNG, JPG, SVG, WebP). Displays on the institution leaderboard.
                </p>
                {cForm.logoUrl && (
                  <div className="mt-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <img
                      src={cForm.logoUrl}
                      alt="preview"
                      className="w-12 h-12 rounded-xl object-contain border border-slate-200 bg-white p-1 shrink-0"
                      onError={(e) => { e.currentTarget.style.display="none" }}
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">Logo Preview Active</div>
                      <div className="text-[10px] text-slate-400 font-mono truncate max-w-xs">{cForm.logoUrl}</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  College Website / Portal URL (optional)
                </label>
                <input
                  value={cForm.websiteUrl}
                  onChange={(e) => setCForm(f => ({ ...f, websiteUrl: e.target.value }))}
                  placeholder="https://srmeaswari.ac.in or https://rmkcet.ac.in"
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-mono text-slate-900 outline-none focus:border-[#7C3AED] bg-white"
                />
                <p className="text-[10px] text-slate-400 font-mono mt-1">
                  Visitors on the scoreboard and directory can click through to the official institution website.
                </p>
              </div>

              {/* Hide from public toggle */}
              <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={cForm.isHidden}
                  onChange={(e) => setCForm((f) => ({ ...f, isHidden: e.target.checked }))}
                  className="w-4 h-4 rounded accent-[#7C3AED]"
                />
                <span className="text-xs text-slate-700 font-mono">
                  Hide this college from public scoreboard / directory
                </span>
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setIsCollegeModalOpen(false)} className="flex-1 py-3 rounded-full border border-slate-200 text-slate-700 font-mono text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer">
                Cancel
              </button>
              <button onClick={handleSaveCollege} disabled={isSavingCollege} className="flex-1 py-3 rounded-full bg-[#7C3AED] hover:bg-purple-700 text-white font-mono text-xs font-extrabold transition-all cursor-pointer disabled:opacity-50">
                {isSavingCollege ? "Saving..." : editingCollege ? "Update College" : "Add College"}
              </button>
            </div>
          </div>
        </div>
      )}

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

      {/* ── PERSPECTIVE CSV IMPORT MODAL ── */}
      <PerspectiveCsvImportModal
        isOpen={isCsvImportModalOpen}
        onClose={() => setIsCsvImportModalOpen(false)}
        initialTargetDay={csvModalTargetDay}
        onSuccess={() => {
          setIsCsvImportModalOpen(false)
          toast.success("CSV Import completed successfully!")
        }}
      />

    </div>
  )
}
