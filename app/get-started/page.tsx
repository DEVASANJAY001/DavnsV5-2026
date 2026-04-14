import { Metadata } from "next"
import { GetStartedContent } from "@/components/get-started-content"

export const metadata: Metadata = {
    title: "Get Started | DAVNS Industries",
    description: "Start your journey with DAVNS Industries. Fill out our contact form to discuss your AI automation and intelligent platform needs.",
}

export default function GetStartedPage() {
    return <GetStartedContent />
}
