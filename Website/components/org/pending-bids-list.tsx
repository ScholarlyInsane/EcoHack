import { Leaf, Droplets, AlertTriangle, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PendingBid {
  id: string
  zone: string
  category: "dry" | "wet" | "hazardous"
  yourBid: number
  currentLowest: number
  deadline: string
  status: "leading" | "outbid" | "pending"
}

interface PendingBidsListProps {
  bids: PendingBid[]
}

const categoryIcons = {
  dry: Leaf,
  wet: Droplets,
  hazardous: AlertTriangle,
}

const categoryColors = {
  dry: "bg-eco-green/10 text-eco-green",
  wet: "bg-accent/10 text-accent",
  hazardous: "bg-eco-red/10 text-eco-red",
}

const statusConfig = {
  leading: { label: "Leading", color: "bg-eco-green/10 text-eco-green" },
  outbid: { label: "Outbid", color: "bg-eco-red/10 text-eco-red" },
  pending: { label: "Pending", color: "bg-muted text-muted-foreground" },
}

export function PendingBidsList({ bids }: PendingBidsListProps) {
  return (
    <div className="space-y-3">
      {bids.map((bid) => {
        const CategoryIcon = categoryIcons[bid.category]
        return (
          <div key={bid.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${categoryColors[bid.category]}`}
                >
                  <CategoryIcon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{bid.zone}</h4>
                  <p className="text-xs text-muted-foreground">{bid.id}</p>
                </div>
              </div>
              <Badge variant="secondary" className={statusConfig[bid.status].color}>
                {statusConfig[bid.status].label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <p className="text-muted-foreground">Your Bid</p>
                <p className="font-semibold">₹{bid.yourBid.toLocaleString()}/mo</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Lowest</p>
                <p className={`font-semibold ${bid.status === "outbid" ? "text-eco-red" : "text-eco-green"}`}>
                  ₹{bid.currentLowest.toLocaleString()}/mo
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Ends {bid.deadline}
              </div>
              {bid.status === "outbid" && (
                <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                  Update Bid <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
