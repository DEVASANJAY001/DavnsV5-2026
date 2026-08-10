import { Bot, Workflow, Eye, Smartphone, ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

const services = [
  {
    id: "agents",
    icon: Bot,
    title: "Autonomous Conversational Agents",
    subtitle: "24/7 Sales, Booking & Customer Triage",
    description:
      "Custom AI agents that communicate naturally across WhatsApp, Web, and SMS. They qualify inbound prospects, schedule appointments, and sync data directly to your CRM without human delay.",
    deliverables: [
      "Official WhatsApp Business API integration",
      "Live multi-channel lead qualification",
      "Real-time CRM synchronization (Salesforce, Zoho, HubSpot)",
      "Seamless human escalation with full chat context",
    ],
    accentColor: "blue",
    href: "/solutions",
  },
  {
    id: "automation",
    icon: Workflow,
    title: "Intelligent Workflow Automation",
    subtitle: "Eliminate Repetitive Manual Operations",
    description:
      "Connect disconnected platforms and automate time-consuming processes. From PDF invoice parsing to multi-system data reconciliation, we engineer zero-touch digital workflows.",
    deliverables: [
      "Intelligent document OCR & structured data extraction",
      "Automated multi-system API webhooks & triggers",
      "Legacy software & database connectors",
      "Real-time operational alerts & reporting",
    ],
    accentColor: "indigo",
    href: "/services",
  },
  {
    id: "vision",
    icon: Eye,
    title: "Industrial Computer Vision",
    subtitle: "Automated Optical Quality Control",
    description:
      "Deploy smart optical inspection systems on factory floors and assembly lines. Catch microscopic manufacturing defects, verify packaging, and enhance workplace safety in real time.",
    deliverables: [
      "Sub-millimeter defect detection algorithms",
      "High-speed 4K camera inspection on edge GPUs",
      "Automated reject sorting & line triggers",
      "Visual quality analytics & compliance logs",
    ],
    accentColor: "emerald",
    href: "/services",
  },
  {
    id: "apps",
    icon: Smartphone,
    title: "Custom Web & Mobile Platforms",
    subtitle: "High-Performance Software Tailored to You",
    description:
      "We design and build bespoke web platforms and native mobile apps from the ground up. Fast, accessible, and engineered with modern design systems to scale with your business.",
    deliverables: [
      "Modern React 19 & Vite web applications",
      "Cross-platform React Native iOS & Android apps",
      "Scalable cloud backends (FastAPI, Node, PostgreSQL)",
      "Intuitive design systems & frictionless UX",
    ],
    accentColor: "purple",
    href: "/projects",
  },
]

export function CoreServicesSection() {
  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden bg-slate-50/50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-mono mb-4 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            WHAT WE ENGINEER
          </div>

          <h2 className="text-3xl sm:text-5xl font-light text-slate-900 tracking-tight mb-4 text-balance">
            Bespoke Software &{" "}
            <span className="font-semibold italic bg-gradient-to-r from-slate-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">
              AI Capabilities
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            We partner with growing startups and established enterprises to design, build, and deploy intelligent software that solves real operational bottlenecks.
          </p>
        </div>

        {/* 4 Clean, Spacious Service Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <div
                key={service.id}
                className="group relative bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:border-blue-300 hover:shadow-[0_12px_40px_rgba(37,99,235,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 leading-snug">{service.title}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="border-t border-slate-100 pt-5 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold block mb-3">
                      KEY DELIVERABLES
                    </span>
                    <ul className="space-y-2.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-light">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Learn more about this solution</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
