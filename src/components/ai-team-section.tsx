import { useState } from "react"
import { Sparkles } from "lucide-react"

const conversations = [
  {
    title: "Luxury Sedan Inquiry & Test Drive Booking",
    messages: [
      { text: "Hi! I'm interested in the new Premium Sedan. Do you have any in stock?", sender: "customer" },
      { text: "We have several 2024 Premium Sedans available in Black and Pearl White. Would you like to schedule a free test drive?", sender: "ai" },
      { text: "Yes! Thursday at 11am works best for me.", sender: "customer" },
      { text: "Confirmed! I've booked your test drive for Thursday at 11:00 AM and synced your profile to our sales desk.", sender: "ai" },
    ],
  },
  {
    title: "Vehicle Features & Live Financing Triage",
    messages: [
      { text: "What's the fuel economy on the Luxury SUV?", sender: "customer" },
      { text: "The 2024 Luxury SUV achieves an EPA-estimated 23 city / 28 highway MPG with standard all-wheel drive.", sender: "ai" },
      { text: "Can I get pre-approved for financing online?", sender: "customer" },
      { text: "I can start your secure 2-minute pre-approval right now with zero impact on your credit score.", sender: "ai" },
    ],
  },
  {
    title: "After-Hours Service Triage & Loaner Car",
    messages: [
      { text: "Hi, it's 11 PM. My check engine light just turned on. Can I book service?", sender: "customer" },
      { text: "I'm here 24/7. Is the light solid or flashing? I can book your intake and reserve a complimentary loaner vehicle.", sender: "ai" },
      { text: "It's solid. Please book for tomorrow morning.", sender: "customer" },
      { text: "Scheduled for tomorrow at 8:30 AM with a reserved loaner vehicle. Confirmation sent via SMS.", sender: "ai" },
    ],
  },
]

export function AITeamSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-mono mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            24/7 AGENT SIMULATION
          </div>
          <h3 className="text-2xl sm:text-4xl font-light text-slate-900 tracking-tight mb-3">
            Autonomous Conversational <span className="font-semibold italic bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">Lead Engines</span>
          </h3>
          <p className="text-slate-600 text-sm sm:text-base font-light max-w-xl mx-auto">
            Experience how our conversational models qualify buyers, book service appointments, and sync data in real time.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {conversations.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-blue-600 text-white font-semibold shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              Scenario {i + 1}
            </button>
          ))}
        </div>

        {/* Interactive Chat Console */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-slate-900">{conversations[activeTab].title}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">24/7 WHATSAPP & WEB</span>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {conversations[activeTab].messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "customer" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    m.sender === "customer"
                      ? "bg-blue-600 text-white font-medium shadow-xs"
                      : "bg-slate-50 text-slate-800 border border-slate-200/80 font-light"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
