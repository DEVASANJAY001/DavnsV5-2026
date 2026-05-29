"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Globe, Sparkles } from "lucide-react"

// Google Play Icon SVG
const PlayStoreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M17.523 15.3l-2.613-2.613 2.613-2.613c1.378.788 2.378 2.213 2.378 3.863s-1 3.075-2.378 3.863zm-4.025-4.025L3.488 2.225A1.5 1.5 0 0 0 3 3.325v17.35a1.5 1.5 0 0 0 .488 1.1l10.01-10.01c0-.025 0-.05.025-.075l-.025-.025zm1.5-1.5l2.625-2.625-9.613-5.462a1.5 1.5 0 0 0-1.5 0l8.488 8.088zm0 4.45L8.987 22.313c.438.25.962.25 1.488 0l9.625-5.463-5.088-5.075z"
    />
  </svg>
)

export function ClientsProductsSection() {
  const [activeTab, setActiveTab] = useState<"clients" | "products">("clients")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("clients-products")
    if (section) {
      observer.observe(section)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="clients-products"
      className="min-h-screen flex flex-col items-center justify-center relative py-20 md:py-32 px-4 md:px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 text-balance">
            Trusted by Innovators &{" "}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto text-balance mb-8">
            We collaborate with forward-thinking companies and organizations to build intelligent platforms, scalable
            systems, and real-world solutions.
          </p>

          {/* Switch Design */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-1 mb-12">
            <button
              onClick={() => setActiveTab("clients")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === "clients"
                  ? "bg-white text-black shadow-lg"
                  : "text-white hover:text-white/80"
                }`}
            >
              Our Clients
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === "products"
                  ? "bg-white text-black shadow-lg"
                  : "text-white hover:text-white/80"
                }`}
            >
              Our Products
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={`transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {activeTab === "clients" && (
            <div className="space-y-16">
              {/* Clients Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 justify-items-center max-w-2xl mx-auto">
                {[
                  "Intecalic",
                  "Kushan Elevators",
                  "Sriviiyengar Foods",
                  "Motor Guardians",
                  "Vasantham Honey",
                  "Darkline Art",
                ].map((company, index) => (
                  <Card
                    key={index}
                    className="w-full h-24 bg-white/5 border-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="text-center px-4">
                      <p className="text-white/70 text-sm font-medium">{company}</p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Support Text */}
              <div className="text-center">
                <p className="text-lg text-gray-300 mb-8">
                  From startups to industrial environments, our solutions power innovation across multiple domains.
                </p>

                {/* Strong Line */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Building long-term partnerships through innovation, reliability, and performance.
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                  {["AI & Automation", "Industrial Solutions", "Software Development", "Product Innovation", "Research & Development"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/20 text-white/70 text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>

                {/* CTA */}
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl font-semibold text-white">Want to work with DAVNS Industries?</p>
                  <Link href="/get-started">
                    <Button className="bg-white text-black rounded-full px-8 py-3 text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                      Become a Client
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="text-center mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Products</h3>
                <p className="text-sm text-gray-400">Innovative solutions developed by DAVNS Industries</p>
              </div>

              <div className="space-y-4">
                {/* Product 1: Split */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-md p-4 sm:p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 shadow-xl rounded-2xl">
                  <div className="flex flex-row items-center justify-between gap-4 w-full">
                    {/* Left Side: Logo & Title */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      <Image
                        src="/images/split.png"
                        alt="Split Logo"
                        width={64}
                        height={64}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg shrink-0 transition-transform duration-500 hover:scale-105"
                      />
                      <div className="text-left">
                        <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">Split</h4>
                        <p className="text-emerald-400 font-semibold mt-0.5 tracking-wider text-[9px] sm:text-[10px] uppercase">Now Available</p>
                      </div>
                    </div>

                    {/* Right Side: Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0 items-end sm:items-center">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.davnsindusrties.split"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-auto"
                      >
                        <Button className="bg-white hover:bg-gray-100 text-black font-semibold px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-105 shadow-md text-[10px] sm:text-xs">
                          <PlayStoreIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                          <span>Play Store</span>
                        </Button>
                      </a>
                      <a
                        href="https://split.davns.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-auto"
                      >
                        <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white font-semibold px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-105 text-[10px] sm:text-xs">
                          <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Open Web App</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>

                {/* Product 2: Coming Soon */}
                <Card className="bg-white/[0.02] border-dashed border-white/10 backdrop-blur-md p-4 sm:p-5 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 shadow-xl rounded-2xl">
                  <div className="flex flex-row items-center justify-between gap-4 w-full">
                    {/* Left Side: Logo Placeholder & Title */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 relative bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-inner group">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white/30 group-hover:text-white/50 transition-colors" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-lg sm:text-xl font-bold text-white/50 tracking-tight leading-tight">Next Project</h4>
                        <p className="text-yellow-500/80 font-semibold mt-0.5 tracking-wider text-[9px] sm:text-[10px] uppercase">Coming Soon</p>
                      </div>
                    </div>

                    {/* Right Side: Stay Tuned Label */}
                    <div className="shrink-0 text-right">
                      <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/5 bg-white/[0.02] text-white/30 font-semibold text-[9px] sm:text-xs tracking-wider uppercase">
                        Stay Tuned
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
