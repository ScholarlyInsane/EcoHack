import { FileText, Building2, IndianRupee, TrendingDown } from "lucide-react"

interface BiddingStatsProps {
  totalContracts: number
  activeOrganizations: number
  totalContractValue: number
  avgSavings: number
}

export function BiddingStats({
  totalContracts,
  activeOrganizations,
  totalContractValue,
  avgSavings,
}: BiddingStatsProps) {
  const stats = [
    {
      icon: FileText,
      label: "Active Contracts",
      value: totalContracts,
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Building2,
      label: "Partner Organizations",
      value: activeOrganizations,
      color: "bg-accent/10 text-accent",
    },
    {
      icon: IndianRupee,
      label: "Total Contract Value",
      value: `₹${(totalContractValue / 10000000).toFixed(1)}Cr`,
      color: "bg-eco-green/10 text-eco-green",
    },
    {
      icon: TrendingDown,
      label: "Avg. Cost Savings",
      value: `${avgSavings}%`,
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
        </div>
      ))}
    </div>
  )
}
