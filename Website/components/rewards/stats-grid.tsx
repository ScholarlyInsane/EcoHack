import { Leaf, Droplets, AlertTriangle, Target, Flame, Award } from "lucide-react"

interface StatsGridProps {
  totalScans: number
  dryWaste: number
  wetWaste: number
  hazardousWaste: number
  currentStreak: number
  rank: string
}

export function StatsGrid({ totalScans, dryWaste, wetWaste, hazardousWaste, currentStreak, rank }: StatsGridProps) {
  const stats = [
    { label: "Total Scans", value: totalScans, icon: Target, color: "bg-primary/10 text-primary" },
    { label: "Dry Waste", value: dryWaste, icon: Leaf, color: "bg-eco-green/10 text-eco-green" },
    { label: "Wet Waste", value: wetWaste, icon: Droplets, color: "bg-accent/10 text-accent" },
    { label: "Hazardous", value: hazardousWaste, icon: AlertTriangle, color: "bg-eco-red/10 text-eco-red" },
    { label: "Day Streak", value: currentStreak, icon: Flame, color: "bg-eco-orange/10 text-eco-orange" },
    { label: "Rank", value: rank, icon: Award, color: "bg-eco-yellow/20 text-eco-orange" },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
          <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-lg ${stat.color} mb-3`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
