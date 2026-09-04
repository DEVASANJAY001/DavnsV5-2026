import { CarDealershipsContent } from "@/components/car-dealerships-content"
import { SEOHead } from "@/components/seo-head"

export default function CarDealershipsPage() {
  return (
    <>
      <SEOHead
        title="Clutch 1.0 - Autonomous AI Sales & Operations for Car Dealerships | DAVNS"
        description="Transform car dealership sales with Clutch 1.0 AI. Automated 24/7 lead qualification, instant test-drive scheduling via WhatsApp & Web, CRM sync, and inventory intelligence."
        keywords="car dealership AI, automotive AI sales agent, Clutch 1.0, auto dealer CRM integration, WhatsApp test drive booking, dealership lead qualification, auto retail automation"
        canonical="/car-dealerships"
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Clutch 1.0 Automotive AI",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Cloud / Web / WhatsApp",
          "description": "Autonomous conversational AI sales assistant for automobile dealerships that qualifies buyers, schedules test drives, and syncs directly into CRM systems.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Custom dealership pilot & enterprise rollout"
          },
          "provider": {
            "@type": "Organization",
            "name": "DAVNS Industries",
            "url": "https://davns.com"
          }
        }}
      />
      <CarDealershipsContent />
    </>
  )
}

