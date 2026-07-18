"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Layers, Globe, Zap, Hexagon, Square, Triangle, Circle } from "lucide-react"

const GeometricLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Simple geometric shape */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute inset-0 border border-white/20 rounded-xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            rotate: { duration: 12, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute inset-4 border border-white/10 rounded-lg"
        />

        {/* Pulsing center dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]"
            />
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white/40 font-medium tracking-[0.4em] uppercase text-[10px]"
      >
        Loading
      </motion.p>
    </div>
  )
}

export function NavigationTransition() {
  const pathname = usePathname()
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (link && link.href && link.href.startsWith(window.location.origin)) {
        const url = new URL(link.href)

        if (url.pathname !== pathname && !url.hash && !link.hasAttribute("download") && link.target !== "_blank") {
          // If in development mode, route instantly without showing overlay, as Next compiles on demand
          if (process.env.NODE_ENV !== "production") {
            return;
          }
          
          e.preventDefault()
          setIsTransitioning(true)

          // Navigate after animation has started
          setTimeout(() => {
            router.push(url.pathname)
          }, 150) // Reduced from 800ms for faster, snappy page loading
        }
      }
    }

    document.addEventListener("click", handleLinkClick)
    return () => document.removeEventListener("click", handleLinkClick)
  }, [pathname, router])

  useEffect(() => {
    if (pathname !== previousPathname.current) {
      // Small delay to ensure the new page is ready to fade in
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100) // Reduced from 300ms for faster transition resolution
      previousPathname.current = pathname
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-black backdrop-blur-xl flex items-center justify-center z-[9999] pointer-events-auto"
        >
          <GeometricLoader />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
