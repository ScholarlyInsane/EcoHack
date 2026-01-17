"use client"

import { useState } from "react"
import { OrgStatsCards } from "@/components/org/org-stats-cards"
import { ZoneCollectionCard } from "@/components/org/zone-collection-card"
import { PendingBidsList } from "@/components/org/pending-bids-list"
import { PlaceBidModal, type NewBid } from "@/components/bidding/place-bid-modal"
import { Button } from "@/components/ui/button"
import { Plus, ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data
const statsData = {
  activeContracts: 5,
  assignedZones: 12,
  collectionsThisMonth: 847,
  monthlyRevenue: 485000,
}

const zones = [
  {
    zoneName: "Zone A-1",
    district: "North District",
    nextCollection: "Today, 2:00 PM",
    collectionsCompleted: 145,
    totalHouseholds: 200,
    status: "in_progress" as const,
  },
  {
    zoneName: "Zone A-2",
    district: "North District",
    nextCollection: "Tomorrow, 9:00 AM",
    collectionsCompleted: 180,
    totalHouseholds: 180,
    status: "completed" as const,
  },
  {
    zoneName: "Zone B-1",
    district: "South District",
    nextCollection: "Jan 20, 10:00 AM",
    collectionsCompleted: 95,
    totalHouseholds: 250,
    status: "scheduled" as const,
  },
]

const initialPendingBids = [
  {
    id: "BID-2026-001",
    zone: "East District - Zone C",
    category: "dry" as const,
    yourBid: 46000,
    currentLowest: 45000,
    deadline: "Feb 28",
    status: "outbid" as const,
  },
  {
    id: "BID-2026-003",
    zone: "Central District",
    category: "hazardous" as const,
    yourBid: 82000,
    currentLowest: 82000,
    deadline: "Mar 10",
    status: "leading" as const,
  },
]

const availableBids = [
  {
    id: "BID-2026-005",
    zone: "West District - Zone D",
    category: "dry" as const,
    currentLowest: 52000,
    deadline: "Mar 15, 2026",
    estimatedVolume: "~850 tons/month",
  },
  {
    id: "BID-2026-006",
    zone: "North District - Zone E",
    category: "wet" as const,
    currentLowest: 48000,
    deadline: "Mar 20, 2026",
    estimatedVolume: "~620 tons/month",
  },
  {
    id: "BID-2026-007",
    zone: "South District - Zone F",
    category: "hazardous" as const,
    currentLowest: 95000,
    deadline: "Mar 25, 2026",
    estimatedVolume: "~120 tons/month",
  },
]

export default function OrganizationDashboard() {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)
  const [pendingBids, setPendingBids] = useState(initialPendingBids)

  const handleBidPlaced = (newBid: NewBid) => {
    setPendingBids((prev) => [newBid, ...prev])
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, GreenCycle Solutions</p>
        </div>
        <Button className="gap-2" onClick={() => setIsBidModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Place New Bid
        </Button>
      </div>

      {/* Stats */}
      <OrgStatsCards {...statsData} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Zone collections */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Assigned Zones</h2>
              <Button variant="ghost" size="sm" className="text-primary gap-1" asChild>
                <Link href="/organization/zones">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {zones.map((zone) => (
                <ZoneCollectionCard key={zone.zoneName} {...zone} />
              ))}
            </div>
          </div>

          {/* Pending bids */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Active Bids</h2>
              <Button variant="ghost" size="sm" className="text-primary gap-1" asChild>
                <Link href="/organization/bids">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <PendingBidsList bids={pendingBids} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's schedule */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Today's Schedule</h3>
            </div>
            <div className="space-y-3">
              {initialPendingBids.map((collection, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{collection.zone}</p>
                    <p className="text-xs text-muted-foreground">{collection.type}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{collection.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/organization/collections">Log Collection</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/organization/reports">Generate Report</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/organization/support">Report Issue</Link>
              </Button>
            </div>
          </div>

          {/* Contract renewal notice */}
          <div className="rounded-xl border border-eco-orange/30 bg-eco-orange/5 p-5">
            <h3 className="font-semibold text-eco-orange mb-2">Contract Renewal</h3>
            <p className="text-sm text-muted-foreground mb-3">
              2 contracts are up for renewal in the next bidding cycle. Make sure to participate.
            </p>
            <Button size="sm" className="w-full" asChild>
              <Link href="/organization/contracts">View Contracts</Link>
            </Button>
          </div>
        </div>
      </div>

      <PlaceBidModal
        open={isBidModalOpen}
        onOpenChange={setIsBidModalOpen}
        availableBids={availableBids}
        onBidPlaced={handleBidPlaced}
      />
    </div>
  )
}
