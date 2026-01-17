import { ClipboardCheck, Building2, Users, IndianRupee, Recycle, AlertTriangle } from "lucide-react"

interface AdminStatsProps {
  pendingVerifications: number
  activeOrganizations: number
  registeredCitizens: number
  monthlyPayments: number
  wasteCollected: number
  activeAlerts: number
}

export function AdminStats({
  pendingVerifications,
  activeOrganizations,
  registeredCitizens,
  monthlyPayments,
  wasteCollected,
  activeAlerts,
}: AdminStatsProps) {
  const stats = [
    {
      icon: ClipboardCheck,
      label: "Pending Verifications",
      value: pendingVerifications,
      color: "bg-eco-orange/10 text-eco-orange",
      urgent: pendingVerifications > 10,
    },
    {
      icon: Building2,
      label: "Active Organizations",
      value: activeOrganizations,
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Users,
      label: "Registered Citizens",
      value: `${(registeredCitizens / 1000).toFixed(1)}K`,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: IndianRupee,
      label: "Monthly Payments",
      value: `₹${(monthlyPayments / 100000).toFixed(1)}L`,
      color: "bg-eco-green/10 text-eco-green",
    },
    {
      icon: Recycle,
      label: "Waste Collected (MTD)",
      value: `${wasteCollected} tons`,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: AlertTriangle,
      label: "Active Alerts",
      value: activeAlerts,
      color: "bg-eco-red/10 text-eco-red",
      urgent: activeAlerts > 0,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl border bg-card p-4 ${stat.urgent ? "border-eco-orange" : "border-border"}`}
        >
          <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${stat.color} mb-2`}>
            <stat.icon className="h-4 w-4" />
          </div>
          <p className="text-xl font-bold">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
