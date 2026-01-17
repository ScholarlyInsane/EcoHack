"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  ClipboardCheck,
  Building2,
  Gavel,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  Shield,
  Leaf,
  MapPin,
  Bell,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Verify Submissions", href: "/admin/verify", icon: ClipboardCheck },
  { name: "Organizations", href: "/admin/organizations", icon: Building2 },
  { name: "Bidding Management", href: "/admin/bidding", icon: Gavel },
  { name: "Citizens", href: "/admin/citizens", icon: Users },
  { name: "Zones & Routes", href: "/admin/zones", icon: MapPin },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
]

const secondaryNav = [
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    router.push("/")
  }

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Leaf className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <span className="font-bold text-lg">BioVibe</span>
          <p className="text-xs text-muted-foreground -mt-0.5">Admin Portal</p>
        </div>
      </div>

      {/* Admin info */}
      <div className="px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Municipality Admin</p>
            <p className="text-xs text-muted-foreground">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
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
              {item.name === "Verify Submissions" && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-eco-red text-[10px] text-white">
                  12
                </span>
              )}
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

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 px-3 py-2.5 h-auto text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground mt-1"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </div>
      </nav>
    </aside>
  )
}
