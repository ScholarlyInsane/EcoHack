import { Suspense } from "react"
import { ZonesContent } from "@/components/org/zones-content"

export default function ZonesPage() {
  return (
    <Suspense fallback={null}>
      <ZonesContent />
    </Suspense>
  )
}
