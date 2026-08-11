import {
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"

export type TicketStatus = "open" | "in-progress" | "closed"
export type TicketPriority = "low" | "medium" | "high" | "urgent"

export interface TicketMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: "user" | "admin"
  senderPhoto?: string | null
  text: string
  createdAt: any
}

export interface SupportTicket {
  id: string
  userId: string
  userEmail: string
  userName: string
  userPhoto?: string | null
  userPhone?: string
  altPhone?: string
  subject: string
  category: string
  priority: TicketPriority
  status: TicketStatus
  createdAt: any
  updatedAt: any
  lastMessage: string
  messages: TicketMessage[]
}

// Create a new support ticket with mandatory user phone
export async function createTicket(data: {
  userId: string
  userEmail: string
  userName: string
  userPhoto?: string | null
  userPhone: string
  altPhone?: string
  subject: string
  category: string
  priority: TicketPriority
  initialMessage: string
}): Promise<string> {
  const initialMsg: TicketMessage = {
    id: "msg-" + Date.now(),
    senderId: data.userId,
    senderName: data.userName,
    senderRole: "user",
    senderPhoto: data.userPhoto || null,
    text: data.initialMessage,
    createdAt: new Date().toISOString(),
  }

  const ticketData = {
    userId: data.userId,
    userEmail: data.userEmail,
    userName: data.userName,
    userPhoto: data.userPhoto || null,
    userPhone: data.userPhone,
    altPhone: data.altPhone || "",
    subject: data.subject,
    category: data.category,
    priority: data.priority,
    status: "open" as TicketStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastMessage: data.initialMessage,
    messages: [initialMsg],
  }

  const docRef = await addDoc(collection(db, "tickets"), ticketData)
  return docRef.id
}

// Send a new message in a ticket thread
export async function sendMessageInTicket(
  ticketId: string,
  message: {
    senderId: string
    senderName: string
    senderRole: "user" | "admin"
    senderPhoto?: string | null
    text: string
  },
  currentMessages: TicketMessage[],
  updateStatusTo?: TicketStatus
) {
  const newMsg: TicketMessage = {
    id: "msg-" + Date.now(),
    senderId: message.senderId,
    senderName: message.senderName,
    senderRole: message.senderRole,
    senderPhoto: message.senderPhoto || null,
    text: message.text,
    createdAt: new Date().toISOString(),
  }

  const ticketRef = doc(db, "tickets", ticketId)
  const updates: any = {
    messages: [...currentMessages, newMsg],
    lastMessage: message.text,
    updatedAt: serverTimestamp(),
  }

  if (updateStatusTo) {
    updates.status = updateStatusTo
  }

  await updateDoc(ticketRef, updates)
}

// Update ticket status
export async function updateTicketStatus(ticketId: string, status: TicketStatus) {
  const ticketRef = doc(db, "tickets", ticketId)
  await updateDoc(ticketRef, {
    status,
    updatedAt: serverTimestamp(),
  })
}

// Real-time listener for user's tickets
export function subscribeUserTickets(userId: string, callback: (tickets: SupportTicket[]) => void) {
  const q = query(collection(db, "tickets"), where("userId", "==", userId))
  return onSnapshot(q, (snapshot) => {
    const tickets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SupportTicket[]
    
    // Sort by updatedAt descending
    tickets.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis?.() || 0
      const timeB = b.updatedAt?.toMillis?.() || 0
      return timeB - timeA
    })
    
    callback(tickets)
  }, (error) => {
    console.error("Error subscribing to user tickets:", error)
  })
}

// Real-time listener for all tickets (Admin view)
export function subscribeAllTickets(callback: (tickets: SupportTicket[]) => void) {
  const q = query(collection(db, "tickets"))
  return onSnapshot(q, (snapshot) => {
    const tickets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SupportTicket[]

    tickets.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis?.() || 0
      const timeB = b.updatedAt?.toMillis?.() || 0
      return timeB - timeA
    })

    callback(tickets)
  }, (error) => {
    console.error("Error subscribing to all tickets:", error)
  })
}
