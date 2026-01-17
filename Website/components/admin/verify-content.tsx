"use client"

import { useState, useEffect } from "react"
import { ClipboardCheck, FileText, Gavel, Search, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BidVerificationQueue } from "@/components/admin/bid-verification-queue"
import { VerificationQueue } from "@/components/admin/verification-queue"
import { bidStore } from "@/lib/bid-store"

const mockWasteSubmissions = [
  {
    id: "WS-001",
    citizenName: "Rahul Sharma",
    category: "dry" as const,
    itemName: "Plastic Bottles (x5)",
    imageUrl: "/pile-of-plastic-bottles.png",
    submittedAt: "2 hours ago",
    confidence: 94,
    zone: "Zone A-1",
  },
  {
    id: "WS-002",
    citizenName: "Priya Patel",
    category: "wet" as const,
    itemName: "Food Scraps",
    imageUrl: "/food-scraps.jpg",
    submittedAt: "3 hours ago",
    confidence: 87,
    zone: "Zone A-2",
  },
  {
    id: "WS-003",
    citizenName: "Amit Kumar",
    category: "hazardous" as const,
    itemName: "Used Batteries",
    imageUrl: "/assorted-batteries.png",
    submittedAt: "5 hours ago",
    confidence: 91,
    zone: "Zone B-1",
  },
]

export function VerifyContent() {
  const [activeTab, setActiveTab] = useState("bids")
  const [searchQuery, setSearchQuery] = useState("")
  const [bidCount, setBidCount] = useState(0)

  useEffect(() => {
    setBidCount(bidStore.getPendingBids().length)
    const unsubscribe = bidStore.subscribe(() => {
      setBidCount(bidStore.getPendingBids().length)
    })
    return unsubscribe
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardCheck className="h-6 w-6 text-primary" />
            Verify Submissions
          </h1>
          <p className="text-muted-foreground mt-1">
            Review and approve organization bids and citizen waste submissions
          </p>
        </div>
        <Button variant="outline" className="gap-2 bg-card">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Gavel className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{bidCount}</p>
              <p className="text-sm text-muted-foreground">Pending Bids</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockWasteSubmissions.length}</p>
              <p className="text-sm text-muted-foreground">Waste Submissions</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-eco-red/10 flex items-center justify-center">
              <ClipboardCheck className="h-5 w-5 text-eco-red" />
            </div>
            <div>
              <p className="text-2xl font-bold">{bidCount + mockWasteSubmissions.length}</p>
              <p className="text-sm text-muted-foreground">Total Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by organization, citizen, or zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-card">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted/50">
          <TabsTrigger value="bids" className="gap-2">
            <Gavel className="h-4 w-4" />
            Organization Bids
            {bidCount > 0 && (
              <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground px-1">
                {bidCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="waste" className="gap-2">
            <FileText className="h-4 w-4" />
            Waste Submissions
            <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-muted-foreground/20 text-[10px] px-1">
              {mockWasteSubmissions.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bids" className="mt-4">
          <BidVerificationQueue />
        </TabsContent>

        <TabsContent value="waste" className="mt-4">
          <VerificationQueue submissions={mockWasteSubmissions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
