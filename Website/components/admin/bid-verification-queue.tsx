"use client"

import { useState, useEffect } from "react"
import {
  Leaf,
  Droplets,
  AlertTriangle,
  Layers,
  Check,
  X,
  Eye,
  Clock,
  Building2,
  FileText,
  IndianRupee,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { bidStore, type OrganizationBid } from "@/lib/bid-store"

const categoryConfig = {
  dry: { icon: Leaf, label: "Dry", color: "bg-primary/10 text-primary border-primary/30" },
  wet: { icon: Droplets, label: "Wet", color: "bg-accent/10 text-accent border-accent/30" },
  hazardous: {
    icon: AlertTriangle,
    label: "Hazardous",
    color: "bg-destructive/10 text-destructive border-destructive/30",
  },
  mixed: { icon: Layers, label: "Mixed", color: "bg-muted text-foreground border-border" },
}

export function BidVerificationQueue() {
  const [bids, setBids] = useState<OrganizationBid[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    // Initial load
    setBids(bidStore.getPendingBids())

    // Subscribe to changes
    const unsubscribe = bidStore.subscribe(() => {
      setBids(bidStore.getPendingBids())
    })

    return unsubscribe
  }, [])

  const handleApprove = (bidId: string) => {
    bidStore.updateBidStatus(bidId, "approved")
    setSelectedId(null)
  }

  const handleReject = (bidId: string) => {
    bidStore.updateBidStatus(bidId, "rejected")
    setSelectedId(null)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    return "Just now"
  }

  if (bids.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <p className="font-medium">All Caught Up!</p>
        <p className="text-sm text-muted-foreground mt-1">No pending bids to verify</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {bids.map((bid) => {
        const CategoryIcon = categoryConfig[bid.category].icon
        const isSelected = selectedId === bid.id
        const isBelowLowest = bid.currentLowest && bid.bidAmount < bid.currentLowest

        return (
          <div
            key={bid.id}
            className={`rounded-xl border bg-card overflow-hidden transition-all ${
              isSelected ? "border-primary shadow-md" : "border-border"
            }`}
          >
            <div className="flex items-center gap-4 p-4">
              {/* Organization icon */}
              <div className="relative h-12 w-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Building2 className="h-6 w-6 text-muted-foreground" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge variant="outline" className={`gap-1 ${categoryConfig[bid.category].color}`}>
                    <CategoryIcon className="h-3 w-3" />
                    {categoryConfig[bid.category].label}
                  </Badge>
                  {isBelowLowest && (
                    <Badge className="bg-primary/10 text-primary border-primary/30 gap-1">Lowest Bid</Badge>
                  )}
                </div>
                <p className="font-medium truncate">{bid.organizationName}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
                  <span>
                    {bid.district} - {bid.zoneName}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    {bid.bidAmount.toLocaleString()}/mo
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(bid.submittedAt)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setSelectedId(isSelected ? null : bid.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:bg-primary/10"
                  onClick={() => handleApprove(bid.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleReject(bid.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Expanded view */}
            {isSelected && (
              <div className="border-t border-border p-4 bg-muted/30">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Bid details */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Bid Amount</p>
                      <p className="font-medium text-lg flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" />
                        {bid.bidAmount.toLocaleString()}/month
                      </p>
                      {bid.currentLowest && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Current lowest: ₹{bid.currentLowest.toLocaleString()}/mo
                          {isBelowLowest && <span className="text-primary ml-1">(This is lower!)</span>}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Zone</p>
                      <p className="font-medium">
                        {bid.district} - {bid.zoneName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bid ID</p>
                      <p className="font-mono text-sm">{bid.id}</p>
                    </div>
                  </div>

                  {/* Proposal & Documents */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Proposal Summary</p>
                      <p className="text-sm">{bid.proposalSummary}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Documents ({bid.documents.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {bid.documents.map((doc, i) => (
                          <Badge key={i} variant="outline" className="gap-1 bg-background">
                            <FileText className="h-3 w-3" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 gap-1" size="sm" onClick={() => handleApprove(bid.id)}>
                        <Check className="h-4 w-4" /> Approve Bid
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 gap-1 bg-transparent"
                        size="sm"
                        onClick={() => handleReject(bid.id)}
                      >
                        <X className="h-4 w-4" /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
