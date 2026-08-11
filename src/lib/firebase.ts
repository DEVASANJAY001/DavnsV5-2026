import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, initializeFirestore } from "firebase/firestore"
import { getAnalytics, isSupported } from "firebase/analytics"

// Firebase configuration using environment variables with secure fallback defaults
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAQWMvUug1oqmlPpMQnAkkNlsguXU4Np2U",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "davns-2873c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "davns-2873c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "davns-2873c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "497616898975",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:497616898975:web:4ce3d4170c2653e1a10baa",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-6TFN7S3570",
}

// Google OAuth Client ID
export const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "497616898975-t851td768roou8bq3ua21qlh823bb7ji.apps.googleusercontent.com"

// Initialize Firebase (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Auth instance
export const auth = getAuth(app)

// Firestore singleton with robust fallback to prevent HMR / IndexedDB connection resets
let firestoreDb: any
try {
  firestoreDb = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  })
} catch (_) {
  firestoreDb = getFirestore(app)
}
export const db = firestoreDb

// Google Auth Provider configured with OAuth settings
export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account",
})
googleProvider.addScope("email")
googleProvider.addScope("profile")

// Analytics (browser support check)
export let analytics: ReturnType<typeof getAnalytics> | null = null
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app)
    }
  }).catch(() => {})
}

export default app
