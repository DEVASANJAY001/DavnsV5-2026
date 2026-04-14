"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import Aurora from "@/components/Aurora"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send } from "lucide-react"
import { motion } from "framer-motion"

export function GetStartedContent() {
    return (
        <div className="min-h-screen bg-black overflow-hidden selection:bg-white/20">
            <main className="min-h-screen relative overflow-hidden">
                <div className="fixed inset-0 w-full h-full">
                    <Aurora
                        colorStops={["#475569", "#64748b", "#475569"]}
                        amplitude={1.2}
                        blend={0.6}
                        speed={0.8}
                    />
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    <GlassmorphismNav />

                    <div className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
                        <div className="max-w-4xl w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                                {/* Left Side: Info */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight text-balance">
                                            Let's Build the <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent italic">Future</span> Together
                                        </h1>
                                        <p className="text-lg text-slate-300 leading-relaxed text-balance">
                                            Ready to transform your business with intelligent platforms? Our team of experts is here to help you navigate the next generation of automation and AI.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">Email Us</h3>
                                                <div className="space-y-1 mt-1">
                                                    <a href="mailto:davnsindustries@outlook.com" className="block text-slate-400 hover:text-white transition-colors text-sm">
                                                        davnsindustries@outlook.com
                                                    </a>
                                                    <a href="mailto:davnsindustries@hotmail.com" className="block text-slate-400 hover:text-white transition-colors text-sm">
                                                        davnsindustries@hotmail.com
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                                <MessageSquare className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold">Quick Support</h3>
                                                <p className="text-slate-400 text-sm mt-1">Our AI-powered support is available 24/7 to answer your preliminary questions.</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Right Side: Form */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] shadow-2xl space-y-6"
                                >
                                    <div className="space-y-2 mb-4">
                                        <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                                        <p className="text-slate-400 text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                                            <Input
                                                placeholder="John Doe"
                                                className="bg-white/5 border-white/10 rounded-xl py-6 focus:ring-white/20 focus:border-white/30 text-white placeholder:text-slate-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="bg-white/5 border-white/10 rounded-xl py-6 focus:ring-white/20 focus:border-white/30 text-white placeholder:text-slate-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300 ml-1">Message</label>
                                            <Textarea
                                                placeholder="Tell us about your project..."
                                                className="bg-white/5 border-white/10 rounded-2xl min-h-[120px] focus:ring-white/20 focus:border-white/30 text-white placeholder:text-slate-500"
                                            />
                                        </div>

                                        <Button className="w-full bg-white text-black hover:bg-slate-100 rounded-xl py-6 text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] group">
                                            Send Message
                                            <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </Button>
                                    </div>
                                </motion.div>

                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            </main>
        </div>
    )
}
