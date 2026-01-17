import { Suspense } from "react"
import { VerifyContent } from "@/components/admin/verify-content"

export default function VerifySubmissionsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  )
}
