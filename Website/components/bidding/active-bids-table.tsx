"use client"

import { Leaf, Droplets, AlertTriangle, Building2, Clock, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type WasteCategory = "dry" | "wet" | "hazardous"
type BidStatus = "open" | "closing_soon" | "closed" | "awarded"

interface Bid {
  id: string
  zone: string
  category: WasteCategory
  status: BidStatus
  currentLowest: number
  totalBids: number
  deadline: string
  estimatedVolume: string
}

interface ActiveBidsTableProps {
  bids: Bid[]
}

const categoryConfig = {
  dry: {
    icon: Leaf,
    label: "Dry Waste",
    color: "bg-eco-green/10 text-eco-green border-eco-green/30",
  },
  wet: {
    icon: Droplets,
    label: "Wet Waste",
    color: "bg-accent/10 text-accent border-accent/30",
  },
  hazardous: {
    icon: AlertTriangle,
    label: "Hazardous",
    color: "bg-eco-red/10 text-eco-red border-eco-red/30",
  },
}

const statusConfig = {
  open: { label: "Open", color: "bg-eco-green/10 text-eco-green" },
  closing_soon: { label: "Closing Soon", color: "bg-eco-orange/10 text-eco-orange" },
  closed: { label: "Closed", color: "bg-muted text-muted-foreground" },
  awarded: { label: "Awarded", color: "bg-primary/10 text-primary" },
}

export function ActiveBidsTable({ bids }: ActiveBidsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Zone</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Lowest Bid</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Participants</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Deadline</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Volume</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {bids.map((bid) => {
            const CategoryIcon = categoryConfig[bid.category].icon

            return (
              <tr key={bid.id} className="hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{bid.zone}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant="outline" className={`gap-1.5 ${categoryConfig[bid.category].color}`}>
                    <CategoryIcon className="h-3.5 w-3.5" />
                    {categoryConfig[bid.category].label}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Badge variant="secondary" className={statusConfig[bid.status].color}>
                    {statusConfig[bid.status].label}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-primary">₹{bid.currentLowest.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground">/month</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{bid.totalBids} bids</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{bid.deadline}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">{bid.estimatedVolume}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
