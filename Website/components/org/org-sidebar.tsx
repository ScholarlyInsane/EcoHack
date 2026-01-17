"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Gavel,
  MapPin,
  Truck,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Building2,
  Leaf,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/organization", icon: LayoutDashboard },
  { name: "My Contracts", href: "/organization/contracts", icon: FileText },
  { name: "Bidding", href: "/organization/bids", icon: Gavel },
  { name: "Assigned Zones", href: "/organization/zones", icon: MapPin },
  { name: "Collections", href: "/organization/collections", icon: Truck },
  { name: "Reports", href: "/organization/reports", icon: BarChart3 },
]

const secondaryNav = [
  { name: "Settings", href: "/organization/settings", icon: Settings },
  { name: "Help & Support", href: "/organization/help", icon: HelpCircle },
]

export function OrgSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    // Clear any session data (in real app, this would call auth service)
    // Navigate to login page
    router.push("/login/organization")
  }

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Leaf className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg">BioVibe</span>
      </div>

      {/* Organization info */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">GreenCycle Solutions</p>
            <p className="text-xs text-muted-foreground">Verified Partner</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}

        <div className="pt-4 mt-4 border-t border-border">
          {secondaryNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
