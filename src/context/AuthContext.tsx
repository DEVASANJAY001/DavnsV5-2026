import React, { createContext, useContext, useEffect, useState } from "react"
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, setDoc, onSnapshot, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db, googleProvider } from "@/lib/firebase"
import { toast } from "sonner"

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string | null
  role: "user" | "admin"
  phone?: string
  altPhone?: string
  company?: string
  createdAt?: any
  lastLoginAt?: any
}

interface AuthContextType {
  currentUser: User | null
  userProfile: UserProfile | null
  isAdmin: boolean
  loading: boolean
  loginWithEmail: (email: string, pass: string) => Promise<void>
  registerWithEmail: (email: string, pass: string, name: string, phone?: string, altPhone?: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Designated master admin emails that automatically get admin clearance
export const INITIAL_ADMIN_EMAILS = [
  "davnsindustries@gmail.com",
  "contact@davns.in",
  "admin@davns.in",
  "devas@davns.in",
  "devasanjay14@gmail.com",
  "devasanjaynatarajan@gmail.com",
  "admin@davns.com",
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)

      if (user) {
        setLoading(true)

        try {
          const userRef = doc(db, "users", user.uid)
          const isInitialAdmin = Boolean(
            user.email && INITIAL_ADMIN_EMAILS.includes(user.email.toLowerCase())
          )

          // Live Firestore profile listener
          unsubscribeProfile = onSnapshot(
            userRef,
            (docSnap) => {
              if (docSnap.exists()) {
                const data = docSnap.data() as UserProfile
                // Ensure photoURL from Google is synced if not present in doc
                if (user.photoURL && !data.photoURL) {
                  data.photoURL = user.photoURL
                  setDoc(userRef, { photoURL: user.photoURL }, { merge: true }).catch(() => {})
                }
                // Auto-sync admin role if email is in INITIAL_ADMIN_EMAILS
                if (isInitialAdmin && data.role !== "admin") {
                  data.role = "admin"
                  setDoc(userRef, { role: "admin" }, { merge: true }).catch(() => {})
                }
                setUserProfile(data)
              } else {
                // First-time document creation ONLY upon new signup
                const newProfile: UserProfile = {
                  uid: user.uid,
                  email: user.email || "",
                  displayName: user.displayName || user.email?.split("@")[0] || "User",
                  photoURL: user.photoURL || null,
                  role: isInitialAdmin ? "admin" : "user",
                  phone: "",
                  altPhone: "",
                  createdAt: serverTimestamp(),
                  lastLoginAt: serverTimestamp(),
                }
                setDoc(userRef, newProfile, { merge: true }).catch((err) => console.error("Error creating initial profile:", err))
                setUserProfile(newProfile)
              }
              setLoading(false)
            },
            (err) => {
              console.error("Firestore snapshot error:", err)
              setLoading(false)
            }
          )

          // Update last login timestamp ONLY without touching role or other custom fields
          setDoc(
            userRef,
            {
              lastLoginAt: serverTimestamp(),
              email: user.email || "",
              ...(user.photoURL ? { photoURL: user.photoURL } : {}),
            },
            { merge: true }
          ).catch(() => {})
        } catch (_) {
          setLoading(false)
        }
      } else {
        if (unsubscribeProfile) {
          unsubscribeProfile()
          unsubscribeProfile = null
        }
        setUserProfile(null)
        setLoading(false)
      }
    })

    return () => {
      unsubscribeAuth()
      if (unsubscribeProfile) unsubscribeProfile()
    }
  }, [])

  const loginWithEmail = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, pass)
    toast.success(`Welcome back, ${cred.user.displayName || "User"}!`)
  }

  const registerWithEmail = async (
    email: string,
    pass: string,
    name: string,
    phone?: string,
    altPhone?: string
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass)
    if (name) {
      await updateProfile(cred.user, { displayName: name }).catch(() => {})
    }
    const isInitialAdmin = Boolean(email && INITIAL_ADMIN_EMAILS.includes(email.toLowerCase()))
    const userRef = doc(db, "users", cred.user.uid)
    const newProfileData: UserProfile = {
      uid: cred.user.uid,
      email: email,
      displayName: name || email.split("@")[0],
      photoURL: cred.user.photoURL || null,
      role: isInitialAdmin ? "admin" : "user",
      phone: phone || "",
      altPhone: altPhone || "",
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    }

    await setDoc(userRef, newProfileData, { merge: true })
    setUserProfile(newProfileData)
    toast.success("Account created successfully!")
  }

  const loginWithGoogle = async () => {
    const res = await signInWithPopup(auth, googleProvider)
    const userRef = doc(db, "users", res.user.uid)

    try {
      const docSnap = await getDoc(userRef)
      if (docSnap.exists()) {
        // User already exists! DO NOT reset their role.
        await setDoc(
          userRef,
          {
            lastLoginAt: serverTimestamp(),
            email: res.user.email || "",
            ...(res.user.photoURL ? { photoURL: res.user.photoURL } : {}),
          },
          { merge: true }
        )
      } else {
        // Brand new Google signup
        const isInitialAdmin = Boolean(res.user.email && INITIAL_ADMIN_EMAILS.includes(res.user.email.toLowerCase()))
        await setDoc(
          userRef,
          {
            uid: res.user.uid,
            email: res.user.email || "",
            displayName: res.user.displayName || res.user.email?.split("@")[0] || "User",
            photoURL: res.user.photoURL || null,
            role: isInitialAdmin ? "admin" : "user",
            phone: "",
            altPhone: "",
            createdAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
          },
          { merge: true }
        )
      }
    } catch (err) {
      console.warn("Background profile sync:", err)
    }

    toast.success(`Signed in as ${res.user.displayName || res.user.email}!`)
  }

  const logout = async () => {
    await signOut(auth)
    setUserProfile(null)
  }

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!currentUser) return
    const userRef = doc(db, "users", currentUser.uid)

    await setDoc(userRef, data, { merge: true })

    if (data.displayName) {
      await updateProfile(currentUser, { displayName: data.displayName }).catch(() => {})
    }

    setUserProfile((prev) => (prev ? { ...prev, ...data } : null))
  }

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
    toast.success("Password reset instructions sent to your email.")
  }

  const isAdmin = Boolean(
    userProfile?.role === "admin" ||
    (currentUser?.email && INITIAL_ADMIN_EMAILS.includes(currentUser.email.toLowerCase()))
  )

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isAdmin,
        loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        updateProfileData,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
