"use client"

import { useState } from "react"
import { PendingBidsList } from "@/components/org/pending-bids-list"
import { PlaceBidModal } from "@/components/bidding/place-bid-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Plus, TrendingUp, TrendingDown, Clock } from "lucide-react"
import Link from "next/link"

type WasteCategory = "dry" | "wet" | "hazardous"

interface NewBid {
  id: string
  zone: string
  category: WasteCategory
  yourBid: number
  currentLowest: number
  deadline: string
  status: "leading" | "outbid" | "pending"
}

const initialBids: NewBid[] = [
  {
    id: "BID-2026-001",
    zone: "East District - Zone C",
    category: "dry",
    yourBid: 46000,
    currentLowest: 45000,
    deadline: "Feb 28",
    status: "outbid",
  },
  {
    id: "BID-2026-003",
    zone: "Central District",
    category: "hazardous",
    yourBid: 82000,
    currentLowest: 82000,
    deadline: "Mar 10",
    status: "leading",
  },
  {
    id: "BID-2026-008",
    zone: "North District - Zone A",
    category: "wet",
    yourBid: 38000,
    currentLowest: 38000,
    deadline: "Mar 5",
    status: "leading",
  },
  {
    id: "BID-2026-009",
    zone: "South District - Zone B",
    category: "dry",
    yourBid: 55000,
    currentLowest: 52000,
    deadline: "Mar 15",
    status: "outbid",
  },
  {
    id: "BID-2026-010",
    zone: "West District - Zone E",
    category: "wet",
    yourBid: 42000,
    currentLowest: 44000,
    deadline: "Mar 20",
    status: "leading",
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

export function BidsContent() {
  const [bids, setBids] = useState(initialBids)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isBidModalOpen, setIsBidModalOpen] = useState(false)

  const handleBidPlaced = (newBid: NewBid) => {
    setBids((prev) => [newBid, ...prev])
  }

  const filteredBids = bids.filter((bid) => {
    const matchesSearch =
      bid.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || bid.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const leadingBids = filteredBids.filter((b) => b.status === "leading")
  const outbidBids = filteredBids.filter((b) => b.status === "outbid")
  const pendingBids = filteredBids.filter((b) => b.status === "pending")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/organization">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Bids</h1>
            <p className="text-muted-foreground">Track and manage all your active bids</p>
          </div>
        </div>
        <Button className="gap-2" onClick={() => setIsBidModalOpen(true)}>
          <Plus className="h-4 w-4" />
          Place New Bid
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Bids</p>
          <p className="text-2xl font-bold">{bids.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 border-eco-green/30">
          <div className="flex items-center gap-2 text-sm text-eco-green mb-1">
            <TrendingUp className="h-4 w-4" />
            Leading
          </div>
          <p className="text-2xl font-bold text-eco-green">{leadingBids.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 border-eco-red/30">
          <div className="flex items-center gap-2 text-sm text-eco-red mb-1">
            <TrendingDown className="h-4 w-4" />
            Outbid
          </div>
          <p className="text-2xl font-bold text-eco-red">{outbidBids.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            Pending
          </div>
          <p className="text-2xl font-bold">{pendingBids.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bids..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="dry">Dry Waste</SelectItem>
            <SelectItem value="wet">Wet Waste</SelectItem>
            <SelectItem value="hazardous">Hazardous</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({filteredBids.length})</TabsTrigger>
          <TabsTrigger value="leading">Leading ({leadingBids.length})</TabsTrigger>
          <TabsTrigger value="outbid">Outbid ({outbidBids.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filteredBids.length > 0 ? (
            <PendingBidsList bids={filteredBids} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No bids found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="leading">
          {leadingBids.length > 0 ? (
            <PendingBidsList bids={leadingBids} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No leading bids</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="outbid">
          {outbidBids.length > 0 ? (
            <PendingBidsList bids={outbidBids} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No outbid bids - you're doing great!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <PlaceBidModal
        open={isBidModalOpen}
        onOpenChange={setIsBidModalOpen}
        availableBids={availableBids}
        onBidPlaced={handleBidPlaced}
      />
    </div>
  )
}
