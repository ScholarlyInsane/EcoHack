import { Leaf, Droplets, AlertTriangle, Building2, Calendar, MapPin, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type WasteCategory = "dry" | "wet" | "hazardous"

interface ContractCardProps {
  id: string
  zone: string
  category: WasteCategory
  organization: string
  contractValue: number
  startDate: string
  endDate: string
  status: "active" | "completed" | "upcoming"
}

const categoryConfig = {
  dry: { icon: Leaf, label: "Dry Waste", color: "bg-eco-green text-white" },
  wet: { icon: Droplets, label: "Wet Waste", color: "bg-accent text-white" },
  hazardous: { icon: AlertTriangle, label: "Hazardous", color: "bg-eco-red text-white" },
}

const statusConfig = {
  active: { label: "Active", color: "bg-eco-green/10 text-eco-green" },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground" },
  upcoming: { label: "Upcoming", color: "bg-accent/10 text-accent" },
}

export function ContractCard({
  id,
  zone,
  category,
  organization,
  contractValue,
  startDate,
  endDate,
  status,
}: ContractCardProps) {
  const CategoryIcon = categoryConfig[category].icon

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className={`px-5 py-4 ${categoryConfig[category].color}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CategoryIcon className="h-5 w-5" />
            <span className="font-medium">{categoryConfig[category].label}</span>
          </div>
          <Badge variant="secondary" className={`${statusConfig[status].color} border-0`}>
            {statusConfig[status].label}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold">{zone}</span>
        </div>

        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{organization}</span>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Contract Value</span>
            <span className="font-semibold text-primary">₹{contractValue.toLocaleString()}/mo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {startDate} - {endDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle className="h-3.5 w-3.5 text-eco-green" />
          <span>Contract ID: {id}</span>
        </div>
      </div>
    </div>
  )
}
