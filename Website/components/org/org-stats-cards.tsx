import { FileText, MapPin, Truck, TrendingUp } from "lucide-react"

interface OrgStatsCardsProps {
  activeContracts: number
  assignedZones: number
  collectionsThisMonth: number
  monthlyRevenue: number
}

export function OrgStatsCards({
  activeContracts,
  assignedZones,
  collectionsThisMonth,
  monthlyRevenue,
}: OrgStatsCardsProps) {
  const stats = [
    {
      icon: FileText,
      label: "Active Contracts",
      value: activeContracts,
      change: "+2 this quarter",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: MapPin,
      label: "Assigned Zones",
      value: assignedZones,
      change: "Across 3 districts",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Truck,
      label: "Collections (MTD)",
      value: collectionsThisMonth,
      change: "+12% vs last month",
      color: "bg-eco-green/10 text-eco-green",
    },
    {
      icon: TrendingUp,
      label: "Monthly Revenue",
      value: `₹${(monthlyRevenue / 100000).toFixed(1)}L`,
      change: "On track",
      color: "bg-eco-orange/10 text-eco-orange",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          <p className="text-xs text-eco-green mt-2">{stat.change}</p>
        </div>
      ))}
    </div>
  )
}
