import { MapPin, Calendar, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ZoneCollectionCardProps {
  zoneName: string
  district: string
  nextCollection: string
  collectionsCompleted: number
  totalHouseholds: number
  status: "scheduled" | "in_progress" | "completed"
}

const statusConfig = {
  scheduled: { label: "Scheduled", color: "bg-accent/10 text-accent" },
  in_progress: { label: "In Progress", color: "bg-eco-orange/10 text-eco-orange" },
  completed: { label: "Completed", color: "bg-eco-green/10 text-eco-green" },
}

export function ZoneCollectionCard({
  zoneName,
  district,
  nextCollection,
  collectionsCompleted,
  totalHouseholds,
  status,
}: ZoneCollectionCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">{zoneName}</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{district}</p>
        </div>
        <Badge variant="secondary" className={statusConfig[status].color}>
          {statusConfig[status].label}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Next Collection
          </span>
          <span className="font-medium">{nextCollection}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Truck className="h-4 w-4" />
            Completed
          </span>
          <span className="font-medium">
            {collectionsCompleted}/{totalHouseholds} households
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${(collectionsCompleted / totalHouseholds) * 100}%` }}
          />
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
        View Details
      </Button>
    </div>
  )
}
