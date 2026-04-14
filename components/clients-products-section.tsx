"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Products</h3>
                <p className="text-lg text-gray-300">Coming soon - innovative solutions we&apos;re building</p>
              </div>

              {/* Empty Grid for Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Card
                    key={num}
                    className="h-64 bg-white/5 border-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="text-center">
                      <p className="text-white/40 text-sm">Product {num}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
