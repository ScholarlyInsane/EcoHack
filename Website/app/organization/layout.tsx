import type React from "react"
import { OrgSidebar } from "@/components/org/org-sidebar"
import { OrgHeader } from "@/components/org/org-header"

export default function OrganizationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <OrgSidebar />
      <div className="lg:pl-64">
        <OrgHeader />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
