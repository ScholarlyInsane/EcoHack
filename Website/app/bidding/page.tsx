"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BiddingStats } from "@/components/bidding/bidding-stats"
import { ActiveBidsTable } from "@/components/bidding/active-bids-table"
import { ContractCard } from "@/components/bidding/contract-card"
import { BiddingTimeline } from "@/components/bidding/bidding-timeline"
import { PlaceBidModal } from "@/components/bidding/place-bid-modal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, ExternalLink, Plus } from "lucide-react"

// Mock data
const biddingStats = {
  totalContracts: 45,
  activeOrganizations: 120,
  totalContractValue: 125000000,
  avgSavings: 18,
}

const activeBids = [
  {
    id: "BID-2026-001",
    zone: "North District - Zone A",
    category: "dry" as const,
    status: "open" as const,
    currentLowest: 45000,
    totalBids: 8,
    deadline: "Feb 28, 2026",
    estimatedVolume: "50 tons/month",
  },
  {
    id: "BID-2026-002",
    zone: "South District - Zone B",
    category: "wet" as const,
    status: "closing_soon" as const,
    currentLowest: 38000,
    totalBids: 12,
    deadline: "Feb 15, 2026",
    estimatedVolume: "35 tons/month",
  },
  {
    id: "BID-2026-003",
    zone: "Central District",
    category: "hazardous" as const,
    status: "open" as const,
    currentLowest: 85000,
    totalBids: 5,
    deadline: "Mar 10, 2026",
    estimatedVolume: "10 tons/month",
  },
  {
    id: "BID-2026-004",
    zone: "East District - Zone C",
    category: "dry" as const,
    status: "awarded" as const,
    currentLowest: 42000,
    totalBids: 15,
    deadline: "Completed",
    estimatedVolume: "45 tons/month",
  },
]

const currentContracts = [
  {
    id: "CON-2025-042",
    zone: "North District - Zone A",
    category: "dry" as const,
    organization: "GreenCycle Solutions Pvt Ltd",
    contractValue: 48000,
    startDate: "Apr 2025",
    endDate: "Mar 2026",
    status: "active" as const,
  },
  {
    id: "CON-2025-043",
    zone: "South District - Zone B",
    category: "wet" as const,
    organization: "EcoCompost Industries",
    contractValue: 42000,
    startDate: "Apr 2025",
    endDate: "Mar 2026",
    status: "active" as const,
  },
  {
    id: "CON-2025-044",
    zone: "Central District",
    category: "hazardous" as const,
    organization: "SafeDispose Technologies",
    contractValue: 95000,
    startDate: "Apr 2025",
    endDate: "Mar 2026",
    status: "active" as const,
  },
]

export default function BiddingPage() {
  const [showBidModal, setShowBidModal] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Page header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Bidding & Contracts</h1>
              <p className="mt-1 text-muted-foreground">Transparent annual bidding for waste collection contracts</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" asChild className="gap-2 bg-transparent">
                <Link href="/bidding/guidelines">
                  <FileText className="h-4 w-4" />
                  Bidding Guidelines
                </Link>
              </Button>
              <Button onClick={() => setShowBidModal(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Place New Bid
              </Button>
            </div>
          </div>

          {/* Stats */}
          <BiddingStats {...biddingStats} />

          <div className="mt-12 grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Bids */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Active Bidding</h2>
                  <span className="text-sm text-muted-foreground">Fiscal Year 2026-27</span>
                </div>
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <ActiveBidsTable bids={activeBids} />
                </div>
              </div>

              {/* Current Contracts */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Current Contracts</h2>
                  <Button variant="ghost" size="sm" className="text-primary gap-1">
                    View All <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentContracts.map((contract) => (
                    <ContractCard key={contract.id} {...contract} />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Timeline */}
              <div>
                <h2 className="text-xl font-semibold mb-4">2026-27 Bidding Timeline</h2>
                <div className="rounded-xl border border-border bg-card p-5">
                  <BiddingTimeline />
                </div>
              </div>

              {/* Info card */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h3 className="font-semibold mb-2">For Organizations</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Register your organization to participate in the annual bidding process. Lowest bidders in each
                  category win contracts for the fiscal year.
                </p>
                <Button asChild className="w-full">
                  <Link href="/login/organization">Register Now</Link>
                </Button>
              </div>

              {/* Transparency note */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold mb-2">100% Transparent</h3>
                <p className="text-sm text-muted-foreground">
                  All bid details, contract awards, and organization performance data are publicly available. This
                  ensures fair competition and accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <PlaceBidModal open={showBidModal} onOpenChange={setShowBidModal} availableBids={activeBids} />
    </div>
  )
}
