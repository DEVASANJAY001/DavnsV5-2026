import { GetStartedContent } from "@/components/get-started-content"
import { SEOHead } from "@/components/seo-head"

export default function GetStartedPage() {
  return (
    <>
      <SEOHead
        title="Get Started - Initiate Your AI Transformation Sprint | DAVNS"
        description="Launch your AI transformation with DAVNS. Fast-track roadmap development, technical feasibility analysis, and pilot deployment for enterprise systems."
        keywords="get started AI, AI discovery sprint, enterprise AI consultation, deploy AI agents, custom software development onboarding"
        canonical="/get-started"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Initiate AI Transformation - DAVNS Industries",
          "description": "Onboarding and discovery intake workflow to kick off custom AI application development and automation pilots.",
          "provider": {
            "@type": "Organization",
            "name": "DAVNS Industries",
            "url": "https://davns.com"
          }
        }}
      />
      <GetStartedContent />
    </>
  )
}

