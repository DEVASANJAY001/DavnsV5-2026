import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  SupportTicket,
  TicketMessage,
  TicketStatus,
  TicketPriority,
  setTypingStatus,
} from "@/lib/tickets-service"
import {
  Search,
  Send,
  Plus,
  ArrowLeft,
  Phone,
  MessageSquare,
  MessageCircle,
  Info,
  CheckCheck,
  Clock,
  Sparkles,
  ShieldCheck,
  MoreHorizontal,
  Paperclip,
  Smile,
  X,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Filter,
  User,
  Zap,
  Car,
  Users,
  BarChart3,
  Settings,
  Radio,
  FileText,
  Lock,
  Tag,
  Folder,
  Layers,
  Activity,
  Maximize2,
  Check,
  Calendar,
  Laptop,
  Edit2,
  Trash2,
  CornerDownRight,
} from "lucide-react"
import { toast } from "sonner"

interface SupportChatLayoutProps {
  role: "user" | "admin"
  tickets: SupportTicket[]
  selectedTicketId: string | null
  onSelectTicket: (ticketId: string) => void
  onSendMessage: (ticketId: string, text: string) => Promise<void>
  onEditMessage?: (ticketId: string, messageId: string, newText: string) => Promise<void>
  onDeleteMessage?: (ticketId: string, messageId: string) => Promise<void>
  onUpdateStatus?: (ticketId: string, status: TicketStatus) => Promise<void>
  onOpenNewTicket?: () => void
  currentUserId: string
  currentUserName: string
  currentUserPhoto?: string | null
  isLoading?: boolean
}

// Preset Quick Tags for Support Chat Header
const DEFAULT_TAGS = [
  "AI Integration",
  "Computer Vision",
  "DAVNS Products",
  "Enterprise Lead",
]

export function SupportChatLayout({
  role,
  tickets,
  selectedTicketId,
  onSelectTicket,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onUpdateStatus,
  onOpenNewTicket,
  currentUserId,
  currentUserName,
  currentUserPhoto,
  isLoading = false,
}: SupportChatLayoutProps) {
  // Navigation & View state
  const [mobileView, setMobileView] = useState<"list" | "chat">("list")
  const [inboxTab, setInboxTab] = useState<"my" | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(role === "admin")

  // Input & Message state
  const [inputText, setInputText] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [activeTags, setActiveTags] = useState<string[]>(DEFAULT_TAGS)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Message Editing state
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState("")
  const [isSavingEdit, setIsSavingEdit] = useState(false)

  // Internal Notes State (Admin diagnostics)
  const [ticketNotes, setTicketNotes] = useState<{ [ticketId: string]: string[] }>({
    default: ["Customer inquiring regarding model integration and real-time response time."],
  })
  const [newNoteText, setNewNoteText] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)

  // Profile Drawer Accordion Open States
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    notes: true,
    userDetails: false,
    chatHistory: false,
    channelTimeline: false,
    members: false,
    visitorInfo: false,
    integrations: false,
  })

  const chatScrollRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  // Dynamic mobile viewport & keyboard handler
  const [viewportHeight, setViewportHeight] = useState<number | null>(null)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return

    const handleResize = () => {
      const vv = window.visualViewport
      if (!vv) return
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        setViewportHeight(vv.height)
        const keyboardActive = vv.height < window.innerHeight - 80
        setIsKeyboardOpen(keyboardActive)

        if (keyboardActive && chatScrollRef.current) {
          setTimeout(() => {
            if (chatScrollRef.current) {
              chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
            }
          }, 80)
        }
      } else {
        setViewportHeight(null)
        setIsKeyboardOpen(false)
      }
    }

    const handleScroll = () => {
      if (window.visualViewport && window.innerWidth < 768) {
        window.scrollTo(0, 0)
      }
    }

    window.visualViewport.addEventListener("resize", handleResize)
    window.visualViewport.addEventListener("scroll", handleScroll)
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize)
      window.visualViewport?.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Filter tickets for Inbox
  const filteredTickets = tickets.filter((ticket) => {
    // Inbox tab filter:
    if (inboxTab === "my") {
      if (ticket.status === "closed") return false
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      const matchSubject = ticket.subject?.toLowerCase().includes(q)
      const matchCategory = ticket.category?.toLowerCase().includes(q)
      const matchUser = ticket.userName?.toLowerCase().includes(q)
      const matchEmail = ticket.userEmail?.toLowerCase().includes(q)
      const matchPhone = ticket.userPhone?.toLowerCase().includes(q)
      const matchLastMsg = ticket.lastMessage?.toLowerCase().includes(q)
      return matchSubject || matchCategory || matchUser || matchEmail || matchPhone || matchLastMsg
    }
    return true
  })

  // Current active ticket (fallback gracefully)
  const activeTicket =
    tickets.find((t) => t.id === selectedTicketId) ||
    filteredTickets.find((t) => t.id === selectedTicketId) ||
    (filteredTickets.length > 0 ? filteredTickets[0] : tickets[0])

  // Switch to chat view on mobile when a ticket is selected
  const handleSelectTicket = (id: string) => {
    onSelectTicket(id)
    setMobileView("chat")
  }

  // Real-time opposite typing indicators (filter out current user & active within 5s)
  const now = Date.now()
  const oppositeTypingUsers = activeTicket?.typing
    ? Object.entries(activeTicket.typing)
        .filter(([uid, data]) => uid !== currentUserId && data && (now - (data.updatedAt || 0) < 5000))
        .map(([_, data]) => data.name)
    : []

  // Scroll to bottom smoothly when messages change, ticket is selected, or opposite user is typing
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [activeTicket?.messages, activeTicket?.id, mobileView, oppositeTypingUsers.length])

  // Send message
  const handleSend = async (customText?: string) => {
    const textToSend = (customText || inputText).trim()
    if (!textToSend || !activeTicket || isSending) return

    // Immediately clear typing state when sending
    if (currentUserId) {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
      setTypingStatus(activeTicket.id, currentUserId, currentUserName, false)
    }

    setIsSending(true)
    try {
      await onSendMessage(activeTicket.id, textToSend)
      if (!customText) {
        setInputText("")
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto"
        }
      }
    } catch (err) {
      toast.error("Failed to send message")
    } finally {
      setIsSending(false)
    }
  }

  // Handle Input Change with real-time Firestore typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    e.target.style.height = "auto"
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`

    // Broadcast live typing status to Firestore
    if (activeTicket && currentUserId) {
      setTypingStatus(activeTicket.id, currentUserId, currentUserName, true)

      if (typingTimerRef.current) clearTimeout(typingTimerRef.current)
      typingTimerRef.current = setTimeout(() => {
        if (activeTicket && currentUserId) {
          setTypingStatus(activeTicket.id, currentUserId, currentUserName, false)
        }
      }, 3000)
    }
  }

  // Keyboard shortcut: Enter to send, Shift+Enter for new line
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Edit Message Handlers
  const handleStartEdit = (msg: TicketMessage) => {
    setEditingMessageId(msg.id)
    setEditingText(msg.text)
  }

  const handleSaveEdit = async (msgId: string) => {
    if (!editingText.trim() || !activeTicket || isSavingEdit) return
    setIsSavingEdit(true)
    try {
      if (onEditMessage) {
        await onEditMessage(activeTicket.id, msgId, editingText.trim())
      }
      setEditingMessageId(null)
      toast.success("Message edited successfully")
    } catch (err) {
      toast.error("Failed to edit message")
    } finally {
      setIsSavingEdit(false)
    }
  }

  const handleDeleteMessage = async (msgId: string) => {
    if (!activeTicket) return
    if (!window.confirm("Are you sure you want to delete this message?")) return

    try {
      if (onDeleteMessage) {
        await onDeleteMessage(activeTicket.id, msgId)
        toast.success("Message deleted")
      }
    } catch (err) {
      toast.error("Failed to delete message")
    }
  }

  // Safe time formatting
  const formatTime = (dateVal?: any) => {
    if (!dateVal) return "Recently"
    try {
      let date: Date
      if (typeof dateVal?.toDate === "function") {
        date = dateVal.toDate()
      } else if (typeof dateVal?.toMillis === "function") {
        date = new Date(dateVal.toMillis())
      } else if (dateVal instanceof Date) {
        date = dateVal
      } else {
        date = new Date(dateVal)
      }
      if (isNaN(date.getTime())) return "Recently"
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } catch {
      return "Recently"
    }
  }

  // Safe full date formatting
  const formatFullDate = (dateVal?: any) => {
    if (!dateVal) return "Today"
    try {
      let date: Date
      if (typeof dateVal?.toDate === "function") {
        date = dateVal.toDate()
      } else if (typeof dateVal?.toMillis === "function") {
        date = new Date(dateVal.toMillis())
      } else if (dateVal instanceof Date) {
        date = dateVal
      } else {
        date = new Date(dateVal)
      }
      if (isNaN(date.getTime())) return "Today"
      return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
    } catch {
      return "Today"
    }
  }

  // Toggle Accordions
  const toggleAccordion = (key: string) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  // User initials
  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  // Clean WhatsApp link
  const getWhatsAppLink = (phoneStr?: string) => {
    if (!phoneStr) return null
    const cleaned = phoneStr.replace(/[^0-9]/g, "")
    if (!cleaned) return null
    return `https://wa.me/${cleaned}`
  }

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  // Add internal note
  const handleAddNote = () => {
    if (!newNoteText.trim() || !activeTicket) return
    const ticketId = activeTicket.id
    setTicketNotes((prev) => ({
      ...prev,
      [ticketId]: [...(prev[ticketId] || []), newNoteText.trim()],
    }))
    setNewNoteText("")
    setIsAddingNote(false)
    toast.success("Internal staff note recorded")
  }

  const currentTicketNotes = activeTicket
    ? ticketNotes[activeTicket.id] || [
        `Customer opened ticket regarding ${activeTicket.category || "General Inquiry"}.`,
      ]
    : []

  return (
    <div className="w-full h-full flex flex-row overflow-hidden bg-white border-0 rounded-none relative font-sans antialiased text-slate-800">
      
      {/* ══════════════════════════════════════════════════════════════════
          COLUMN 1: INBOX CHATS LIST SIDEBAR (WHITE / LIGHT GRAY)
          ══════════════════════════════════════════════════════════════════ */}
      <div
        className={`w-full md:w-80 lg:w-[320px] shrink-0 border-r border-slate-200 bg-white flex flex-col h-full transition-all duration-300 ${
          mobileView === "chat" ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Top Tabs Bar */}
        <div className="px-4 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4 text-xs font-bold font-sans">
            <button
              onClick={() => setInboxTab("my")}
              className={`transition-colors cursor-pointer pb-0.5 ${
                inboxTab === "my"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Active ({tickets.filter((t) => t.status !== "closed").length})
            </button>
            <button
              onClick={() => setInboxTab("all")}
              className={`transition-colors cursor-pointer pb-0.5 ${
                inboxTab === "all"
                  ? "text-[#7C3AED] border-b-2 border-[#7C3AED] font-black"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              All Chats ({tickets.length})
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isSearchOpen ? "bg-violet-100 text-[#7C3AED]" : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              }`}
              title="Search Chats"
            >
              <Search className="w-4 h-4" />
            </button>
            {onOpenNewTicket && role === "user" && (
              <button
                onClick={onOpenNewTicket}
                className="p-1.5 rounded-lg text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-xs cursor-pointer"
                title="Create New Support Ticket"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Smooth Expandable Search Input */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="px-3 py-2.5 bg-slate-50 border-b border-slate-200 overflow-hidden"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by client, issue, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:border-[#7C3AED] transition-all"
                  autoFocus
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversations Cards List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredTickets.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
              <p>No chat conversations found.</p>
              {onOpenNewTicket && role === "user" && (
                <button
                  onClick={onOpenNewTicket}
                  className="mt-2 px-3.5 py-1.5 rounded-full bg-[#7C3AED] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  New Ticket
                </button>
              )}
            </div>
          ) : (
            filteredTickets.map((ticket) => {
              const isSelected = activeTicket?.id === ticket.id
              const lastMsg = ticket.messages?.[ticket.messages.length - 1]
              const lastMsgText = lastMsg?.text || ticket.lastMessage || "Ticket thread initiated"
              const contactName = role === "admin" ? ticket.userName : "DAVNS Engineering"

              return (
                <div
                  key={ticket.id}
                  onClick={() => handleSelectTicket(ticket.id)}
                  className={`p-3.5 transition-all cursor-pointer flex items-start gap-3 relative ${
                    isSelected
                      ? "bg-violet-50/80 border-l-4 border-l-[#7C3AED]"
                      : "hover:bg-slate-50 border-l-4 border-l-transparent"
                  }`}
                >
                  {/* Customer Avatar */}
                  <div className="relative shrink-0 mt-0.5">
                    {ticket.userPhoto && role === "admin" ? (
                      <img
                        src={ticket.userPhoto}
                        alt={ticket.userName}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-2xs ${
                          ticket.status === "open"
                            ? "bg-amber-500"
                            : ticket.status === "in-progress"
                            ? "bg-[#7C3AED]"
                            : "bg-emerald-600"
                        }`}
                      >
                        {getInitials(contactName)}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>

                  {/* Chat Information */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {contactName}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {formatTime(lastMsg?.createdAt || ticket.updatedAt || ticket.createdAt)}
                      </span>
                    </div>

                    {/* Subject / Category */}
                    <div className="text-[11px] font-medium text-slate-700 truncate">
                      {ticket.subject}
                    </div>

                    {/* Last Message Preview */}
                    <div className="text-[11px] text-slate-400 truncate">
                      {lastMsg?.senderId === currentUserId ? "You: " : ""}
                      {lastMsgText}
                    </div>

                    {/* Pill Badges (Unassigned, In Progress, Resolved) */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                          ticket.status === "open"
                            ? "bg-amber-100 text-amber-800"
                            : ticket.status === "in-progress"
                            ? "bg-violet-100 text-[#7C3AED]"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {ticket.status === "open"
                          ? "Open"
                          : ticket.status === "in-progress"
                          ? "In Progress"
                          : "Resolved"}
                      </span>

                      <span
                        onClick={(e) => {
                          e.stopPropagation()
                          setSearchQuery(ticket.category)
                          setIsSearchOpen(true)
                        }}
                        className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors truncate max-w-[120px] cursor-pointer"
                        title={`Filter by ${ticket.category}`}
                      >
                        {ticket.category}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          COLUMN 2: CENTER MAIN CHAT TIMELINE (CLEAN WHITE CANVAS)
          ══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          height: viewportHeight ? `${viewportHeight}px` : undefined,
          maxHeight: viewportHeight ? `${viewportHeight}px` : undefined,
        }}
        className={`flex-1 w-full max-w-full flex flex-col h-full bg-white relative overflow-hidden transition-[height] duration-150 ${
          mobileView === "list" ? "hidden md:flex" : "flex"
        }`}
      >
        {activeTicket ? (
          <>
            {/* Sticky Top Header Bar */}
            <div className="sticky top-0 z-20 shrink-0 px-3 sm:px-6 py-2.5 sm:py-3 bg-white border-b border-slate-200 flex items-center justify-between gap-2 w-full max-w-full overflow-hidden">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {/* Mobile Back Button */}
                <button
                  onClick={() => setMobileView("list")}
                  className="md:hidden p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {/* Customer / Support Photo */}
                <div className="relative shrink-0">
                  {activeTicket.userPhoto && role === "admin" ? (
                    <img
                      src={activeTicket.userPhoto}
                      alt={activeTicket.userName}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {getInitials(activeTicket.userName)}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>

                {/* Title & Status */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {role === "admin" ? activeTicket.userName : activeTicket.subject}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 font-sans truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">{activeTicket.category}</span>
                  </p>
                </div>
              </div>

              {/* Right Header Actions */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* Assigned to Dropdown Capsule (Tablet/Desktop only) */}
                <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-xs font-sans text-slate-600">
                  <span>Assigned to</span>
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <div className="w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[9px] flex items-center justify-center font-bold">
                      D
                    </div>
                    <span>{role === "admin" ? currentUserName : "DAVNS AI Operations"}</span>
                  </div>
                </div>

                {/* Quick WhatsApp / Call icons (ADMIN ONLY) */}
                {role === "admin" && activeTicket.userPhone && (
                  <div className="flex items-center gap-1">
                    <a
                      href={getWhatsAppLink(activeTicket.userPhone) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 border border-emerald-200 flex items-center justify-center"
                      title="Chat on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a
                      href={`tel:${activeTicket.userPhone.replace(/\s+/g, "")}`}
                      className="hidden sm:flex p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 items-center justify-center"
                      title="Call Customer"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Info Toggle Icon (ADMIN ONLY - Desktop/Tablet) */}
                {role === "admin" && (
                  <button
                    onClick={() => setIsProfilePanelOpen(!isProfilePanelOpen)}
                    className={`hidden lg:flex w-8 h-8 rounded-xl border items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                      isProfilePanelOpen
                        ? "bg-[#7C3AED] text-white border-[#7C3AED]"
                        : "text-slate-500 border-slate-300 hover:bg-slate-100"
                    }`}
                    title="Toggle Customer Diagnostics Panel"
                  >
                    i
                  </button>
                )}
              </div>
            </div>

            {/* Chat Message Scroll Area */}
            <div
              ref={chatScrollRef}
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-4 bg-white w-full max-w-full overscroll-contain p-3 sm:p-6"
            >
              {/* Date Pill Divider */}
              <div className="flex justify-center my-1 sm:my-2">
                <span className="px-3.5 py-0.5 sm:py-1 rounded-full border border-slate-200 text-[10px] sm:text-[11px] font-sans text-slate-500 bg-white shadow-2xs">
                  {formatFullDate(activeTicket.createdAt)}
                </span>
              </div>

              {/* Initial Inquiry System Box */}
              <div className="flex justify-center">
                <div className="max-w-md w-full p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-bold text-[#7C3AED] uppercase tracking-wider">TICKET SPECIFICATION</span>
                    <span>{formatTime(activeTicket.createdAt)}</span>
                  </div>
                  <div className="font-bold text-slate-900">{activeTicket.subject}</div>
                  <div className="text-slate-500 text-[11px] flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>Category: <strong>{activeTicket.category}</strong></span>
                    <span>•</span>
                    <span>Priority: <strong className="text-[#7C3AED]">{activeTicket.priority.toUpperCase()}</strong></span>
                  </div>
                </div>
              </div>

              {/* Messages Loop */}
              {activeTicket.messages?.map((msg, index) => {
                const isMe = msg.senderId === currentUserId
                const senderPhoto = msg.senderPhoto || (isMe ? currentUserPhoto : activeTicket.userPhoto)
                const isEditing = editingMessageId === msg.id

                return (
                  <motion.div
                    key={msg.id || index}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`group flex gap-2 sm:gap-3 max-w-[84%] sm:max-w-[76%] ${
                      isMe ? "ml-auto flex-row-reverse" : "mr-auto"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="shrink-0 mt-1">
                      {senderPhoto ? (
                        <img
                          src={senderPhoto}
                          alt={msg.senderName}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div
                          className={`w-7 h-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center ${
                            isMe ? "bg-slate-800" : "bg-[#7C3AED]"
                          }`}
                        >
                          {getInitials(msg.senderName)}
                        </div>
                      )}
                    </div>

                    {/* Bubble Content */}
                    <div className={`space-y-1 ${isMe ? "text-right" : "text-left"} min-w-0 max-w-full`}>
                      {/* Name + Timestamp + Actions Header */}
                      <div className="text-[10px] font-sans text-slate-400 flex items-center gap-1.5 sm:gap-2 justify-inherit">
                        <span className="font-bold text-slate-700">
                          {isMe ? "You" : msg.senderName}
                        </span>
                        <span>{formatTime(msg.createdAt)}</span>
                        {msg.editedAt && (
                          <span className="italic text-slate-400">(edited)</span>
                        )}

                        {/* Hover Action Buttons (Edit / Delete / Copy) */}
                        {(isMe || role === "admin") && !isEditing && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ml-1">
                            <button
                              onClick={() => handleStartEdit(msg)}
                              className="p-1 rounded text-slate-400 hover:text-[#7C3AED] hover:bg-violet-50 cursor-pointer"
                              title="Edit message"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                              title="Delete message"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Editing Mode Inline */}
                      {isEditing ? (
                        <div className="p-2.5 rounded-2xl bg-white border-2 border-[#7C3AED] space-y-2 text-left shadow-md">
                          <textarea
                            rows={2}
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full text-xs sm:text-sm text-slate-900 outline-none resize-none"
                            autoFocus
                          />
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingMessageId(null)}
                              className="px-2.5 py-1 rounded-lg text-xs text-slate-500 hover:bg-slate-100 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(msg.id)}
                              disabled={isSavingEdit || !editingText.trim()}
                              className="px-3 py-1 rounded-lg bg-[#7C3AED] text-white text-xs font-bold hover:bg-[#6D28D9] cursor-pointer disabled:opacity-40"
                            >
                              {isSavingEdit ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* DAVNS Website Theme Bubble: Electric Violet Gradient vs Soft Slate */
                        <div
                          className={`p-2.5 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed break-words [word-break:break-word] overflow-hidden text-left ${
                            isMe
                              ? "bg-slate-100 text-slate-900 border border-slate-200/80 rounded-tr-xs ml-auto"
                              : "bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-tl-xs shadow-xs font-sans"
                          }`}
                        >
                          {msg.text}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}

              {/* Real-Time Cross-User Typing Indicator */}
              <AnimatePresence>
                {oppositeTypingUsers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="flex items-center gap-2 text-slate-400 text-xs py-1"
                  >
                    <div className="px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200/80 flex items-center gap-2 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-bounce" style={{ animationDelay: "300ms" }} />
                      <span className="text-[11px] font-semibold text-[#7C3AED]">
                        {oppositeTypingUsers.join(", ")} {oppositeTypingUsers.length > 1 ? "are" : "is"} typing...
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Rich Tag & Input Container (Sticky Bottom) */}
            <div className="sticky bottom-0 z-20 shrink-0 p-2.5 sm:p-4 bg-white border-t border-slate-200 space-y-2 w-full max-w-full overflow-hidden pb-[max(0.625rem,env(safe-area-inset-bottom))]">
              {/* Tag Chips Row above input (ADMIN ONLY) */}
              {role === "admin" && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-sans text-slate-500">
                  <span className="text-slate-400 font-bold shrink-0">🔍</span>
                  {activeTags.map((tag, idx) => (
                    <span
                      key={idx}
                      onClick={() => {
                        setSearchQuery(tag)
                        setIsSearchOpen(true)
                      }}
                      className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-violet-50 hover:text-[#7C3AED] border border-slate-200/80 flex items-center gap-1 shrink-0 cursor-pointer select-none active:scale-95 transition-all"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveTags(activeTags.filter((_, i) => i !== idx))
                        }}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={() => setActiveTags([...activeTags, `Topic-${activeTags.length + 1}`])}
                    className="text-[#7C3AED] font-bold hover:underline shrink-0 text-[10px] cursor-pointer"
                  >
                    + Add Tag
                  </button>
                </div>
              )}

              {/* Input Textarea & Right Buttons */}
              <div className="relative border border-slate-200 rounded-2xl p-2 sm:p-2.5 bg-white focus-within:border-[#7C3AED] transition-all">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder="Type a message, use '/' to add a saved reply..."
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    setTimeout(() => {
                      if (chatScrollRef.current) {
                        chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
                      }
                      if (textareaRef.current) {
                        textareaRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
                      }
                    }, 120)
                  }}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 resize-none outline-none pr-14 sm:pr-16 max-h-[100px]"
                />

                {/* Send Button & Emoji */}
                <div className="absolute right-2 sm:right-3 top-2 sm:top-2.5 flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setInputText((prev) => prev + " 😊")}
                    className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    title="Insert Emoji"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={isSending || !inputText.trim()}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer shadow-xs active:scale-95 shrink-0"
                    title="Send Message"
                  >
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Bottom Toolbar Icons */}
                <div className="flex items-center gap-2 sm:gap-3 pt-2 border-t border-slate-100 text-slate-400 text-xs overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => toast.info("Attachment uploading will be enabled in upcoming update.")}
                    className="hover:text-slate-700 cursor-pointer p-1 shrink-0"
                    title="Add Attachment"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button type="button" className="hover:text-slate-700 font-serif font-bold text-xs cursor-pointer p-1 shrink-0" title="Formatting">
                    Aa
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSend("📋 Detailed logs and diagnostic data are being inspected.")}
                    className="hover:text-slate-700 cursor-pointer p-1 shrink-0"
                    title="Diagnostic Snippet"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSend("🚘 AI Fleet Vision telemetry node initialized.")}
                    className="hover:text-slate-700 cursor-pointer p-1 shrink-0"
                    title="AI Fleet Telemetry"
                  >
                    <Car className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSend("👋 Hello, our engineering team is actively investigating this request.")}
                    className="hover:text-[#7C3AED] cursor-pointer text-xs font-bold text-[#7C3AED] p-1 flex items-center shrink-0"
                    title="Saved Reply: Quick Acknowledgment"
                  >
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    <span className="hidden sm:inline">Quick Reply</span>
                  </button>
                  {role === "admin" && (
                    <button
                      type="button"
                      onClick={() => setIsAddingNote(true)}
                      className="hover:text-slate-700 cursor-pointer ml-auto p-1 shrink-0"
                      title="Add Internal Staff Note"
                    >
                      <Lock className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <MessageSquare className="w-10 h-10 text-slate-300 mb-2" />
            <h3 className="text-sm font-bold text-slate-700">Select a conversation</h3>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Choose a support ticket from the inbox on the left to start messaging.
            </p>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          COLUMN 3: RIGHT CUSTOMER PROFILE & CRM PANEL (ADMIN ONLY)
          ══════════════════════════════════════════════════════════════════ */}
      {role === "admin" && (
        <AnimatePresence>
          {isProfilePanelOpen && activeTicket && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "320px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:flex flex-col h-full bg-gradient-to-b from-[#18122B] via-[#0F0E17] to-[#18122B] text-white shrink-0 border-l border-violet-950/60 overflow-y-auto no-scrollbar font-sans select-none"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-violet-200">
                  <User className="w-4 h-4 text-[#A78BFA]" />
                  <span>Client Diagnostics</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(activeTicket.id, "Ticket ID")}
                    className="hover:opacity-80 cursor-pointer p-1 text-white/70 hover:text-white"
                    title="Copy Ticket ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsProfilePanelOpen(false)}
                    className="hover:opacity-80 text-xs font-bold cursor-pointer p-1 text-white/70 hover:text-white"
                    title="Collapse Profile Panel"
                  >
                    ∧
                  </button>
                </div>
              </div>

              {/* Customer Primary Data Fields */}
              <div className="p-4 space-y-3 text-xs border-b border-white/10">
                <div>
                  <div className="text-[10px] text-violet-300/70 uppercase font-mono tracking-wider">Client Name</div>
                  <div className="font-bold text-sm text-white">{activeTicket.userName}</div>
                </div>

                <div>
                  <div className="text-[10px] text-violet-300/70 uppercase font-mono tracking-wider">Email Address</div>
                  <div className="text-white/90 font-mono text-[11px] break-all">{activeTicket.userEmail}</div>
                </div>

                <div>
                  <div className="text-[10px] text-violet-300/70 uppercase font-mono tracking-wider">Direct Phone</div>
                  <div className="text-white font-mono font-bold flex items-center justify-between">
                    <span>{activeTicket.userPhone || "+91 Contact on File"}</span>
                    {activeTicket.userPhone && (
                      <div className="flex items-center gap-1">
                        <a
                          href={getWhatsAppLink(activeTicket.userPhone) || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-all"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${activeTicket.userPhone.replace(/\s+/g, "")}`}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                          title="Call Number"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {activeTicket.altPhone && (
                  <div>
                    <div className="text-[10px] text-violet-300/70 uppercase font-mono tracking-wider">Backup Phone</div>
                    <div className="text-white font-mono">{activeTicket.altPhone}</div>
                  </div>
                )}

                <div>
                  <div className="text-[10px] text-violet-300/70 uppercase font-mono tracking-wider">Service Pipeline</div>
                  <div className="text-violet-200 font-medium">{activeTicket.category || "AI Integration"}</div>
                </div>

                <div>
                  <div className="text-[10px] text-violet-300/70 uppercase font-mono tracking-wider">Assigned Lead</div>
                  <div className="text-white font-medium">{currentUserName}</div>
                </div>

                <div>
                  <div className="text-[10px] text-violet-300/70 uppercase font-mono tracking-wider">Stage & Resolution</div>
                  <div className="font-bold flex items-center gap-1.5 text-white">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activeTicket.status === "open"
                          ? "bg-amber-400 animate-pulse"
                          : activeTicket.status === "in-progress"
                          ? "bg-violet-400 animate-pulse"
                          : "bg-emerald-400"
                      }`}
                    />
                    <span>
                      {activeTicket.status === "closed"
                        ? "Resolved & Verified"
                        : activeTicket.status === "in-progress"
                        ? "In Active Engineering"
                        : "Fresh Ingestion"}
                    </span>
                  </div>
                </div>

                {/* Admin Status Changer */}
                {onUpdateStatus && (
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <div className="text-[10px] text-violet-300/70 uppercase font-mono">Resolution State</div>
                    <div className="grid grid-cols-3 gap-1 text-[9px] font-mono font-bold">
                      <button
                        onClick={() => onUpdateStatus(activeTicket.id, "open")}
                        className={`py-1.5 rounded-lg uppercase transition-all cursor-pointer ${
                          activeTicket.status === "open"
                            ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                      >
                        Open
                      </button>
                      <button
                        onClick={() => onUpdateStatus(activeTicket.id, "in-progress")}
                        className={`py-1.5 rounded-lg uppercase transition-all cursor-pointer ${
                          activeTicket.status === "in-progress"
                            ? "bg-[#7C3AED] text-white font-black shadow-xs"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                      >
                        In Prog
                      </button>
                      <button
                        onClick={() => onUpdateStatus(activeTicket.id, "closed")}
                        className={`py-1.5 rounded-lg uppercase transition-all cursor-pointer ${
                          activeTicket.status === "closed"
                            ? "bg-emerald-500 text-slate-950 font-black shadow-xs"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                      >
                        Resolved
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible CRM Accordions */}
              <div className="flex-1 divide-y divide-white/10 text-xs font-medium">
                
                {/* Note Accordion */}
                <div>
                  <button
                    onClick={() => toggleAccordion("notes")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-400" />
                      <span>Internal Notes</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px]">
                        {currentTicketNotes.length}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        accordionOpen.notes ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {accordionOpen.notes && (
                    <div className="px-4 pb-3 pt-1 text-[11px] text-white/90 font-light space-y-2">
                      {currentTicketNotes.map((note, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-white/10 border border-white/10 leading-relaxed">
                          {note}
                        </div>
                      ))}

                      {isAddingNote ? (
                        <div className="space-y-1.5 pt-1">
                          <textarea
                            rows={2}
                            placeholder="Type internal note..."
                            value={newNoteText}
                            onChange={(e) => setNewNoteText(e.target.value)}
                            className="w-full p-2 rounded-xl bg-white/15 text-white text-xs outline-none placeholder-white/50 border border-violet-500/40"
                          />
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={handleAddNote}
                              className="px-2.5 py-1 rounded-lg bg-[#7C3AED] text-white text-[10px] font-bold cursor-pointer"
                            >
                              Save Note
                            </button>
                            <button
                              onClick={() => setIsAddingNote(false)}
                              className="px-2 py-1 text-white/70 hover:text-white text-[10px] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsAddingNote(true)}
                          className="text-[10px] text-violet-300 hover:text-white underline cursor-pointer"
                        >
                          + Add Staff Note
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* User Details Accordion */}
                <div>
                  <button
                    onClick={() => toggleAccordion("userDetails")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-violet-400" />
                      <span>Client Details</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        accordionOpen.userDetails ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {accordionOpen.userDetails && (
                    <div className="px-4 pb-3 text-[11px] space-y-1.5 text-white/80">
                      <div className="flex justify-between">
                        <span className="text-white/50">User ID:</span>
                        <span className="font-mono">{activeTicket.userId.substring(0, 10)}...</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Tier:</span>
                        <span>Enterprise Partner</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Region:</span>
                        <span>+91 / India</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat History Accordion */}
                <div>
                  <button
                    onClick={() => toggleAccordion("chatHistory")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-violet-400" />
                      <span>Thread History</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        accordionOpen.chatHistory ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {accordionOpen.chatHistory && (
                    <div className="px-4 pb-3 text-[11px] space-y-1.5 text-white/80">
                      <div className="flex justify-between">
                        <span className="text-white/50">Total Messages:</span>
                        <span>{activeTicket.messages?.length || 1} exchanged</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Initiated:</span>
                        <span>{formatFullDate(activeTicket.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Last Response:</span>
                        <span>{formatTime(activeTicket.updatedAt || activeTicket.createdAt)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Channel Timeline Accordion */}
                <div>
                  <button
                    onClick={() => toggleAccordion("channelTimeline")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-violet-400" />
                      <span>Event Timeline</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        accordionOpen.channelTimeline ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {accordionOpen.channelTimeline && (
                    <div className="px-4 pb-3 text-[11px] space-y-2 text-white/80">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Ticket Created ({formatTime(activeTicket.createdAt)})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-violet-400" />
                        <span>Assigned to DAVNS Engineering</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>Status: {activeTicket.status.toUpperCase()}</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </div>
  )
}
