import { Metadata } from "next"
import { CarDealershipsContent } from "@/components/car-dealerships-content"

export const metadata: Metadata = {
  title: "AI for Car Dealerships | Clutch 1.0",
  description: "Never miss another lead. Clutch 1.0 by DAVNS Industries provides AI-powered automation for Irish car dealerships to manage leads, service bookings, and customer updates 24/7.",
}

export default function CarDealershipsPage() {
  return <CarDealershipsContent />
}
