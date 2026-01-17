import { Suspense } from "react"
import { BidsContent } from "@/components/org/bids-content"

export default function BidsPage() {
  return (
    <Suspense fallback={null}>
      <BidsContent />
    </Suspense>
  )
}
