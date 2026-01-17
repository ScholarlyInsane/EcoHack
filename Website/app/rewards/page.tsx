"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WalletCard } from "@/components/rewards/wallet-card"
import { TransactionList } from "@/components/rewards/transaction-list"
import { StatsGrid } from "@/components/rewards/stats-grid"
import { RedemptionOptions } from "@/components/rewards/redemption-options"
import { Leaderboard } from "@/components/rewards/leaderboard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Scan, History, Trophy } from "lucide-react"
import { mockCitizenUser, handleLogout } from "@/lib/mock-user"

// Mock data
const walletData = {
  balance: 2450,
  pendingRewards: 125,
  lifetimeEarnings: 8750,
}

const statsData = {
  totalScans: 342,
  dryWaste: 198,
  wetWaste: 112,
  hazardousWaste: 32,
  currentStreak: 15,
  rank: "Gold",
}

const transactions = [
  {
    id: "1",
    type: "submission" as const,
    status: "completed" as const,
    amount: 10,
    description: "Plastic Bottle",
    date: "Today, 2:30 PM",
    category: "dry" as const,
  },
  {
    id: "2",
    type: "submission" as const,
    status: "pending" as const,
    amount: 15,
    description: "Battery Pack",
    date: "Today, 11:15 AM",
    category: "hazardous" as const,
  },
  {
    id: "3",
    type: "bonus" as const,
    status: "completed" as const,
    amount: 50,
    description: "Weekly Streak Bonus",
    date: "Yesterday",
  },
  {
    id: "4",
    type: "submission" as const,
    status: "completed" as const,
    amount: 8,
    description: "Food Scraps",
    date: "Yesterday",
    category: "wet" as const,
  },
  {
    id: "5",
    type: "redemption" as const,
    status: "completed" as const,
    amount: -200,
    description: "Metro Pass Redemption",
    date: "Jan 15, 2026",
  },
]

const leaderboardData = [
  { rank: 1, name: "Sarah K.", points: 15420 },
  { rank: 2, name: "Raj M.", points: 14890 },
  { rank: 3, name: "Priya S.", points: 13250 },
  { rank: 4, name: "John D.", points: 12100 },
  { rank: 5, name: "You", points: 8750 },
]

export default function RewardsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header user={mockCitizenUser} onLogout={handleLogout} />
      <main className="flex-1 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Rewards & Wallet</h1>
              <p className="mt-1 text-muted-foreground">Track your earnings and redeem rewards</p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/scan">
                <Scan className="h-4 w-4" />
                Scan to Earn
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Wallet */}
              <WalletCard
                balance={walletData.balance}
                pendingRewards={walletData.pendingRewards}
                lifetimeEarnings={walletData.lifetimeEarnings}
              />

              {/* Stats */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
                <StatsGrid {...statsData} />
              </div>

              {/* Transactions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Recent Activity
                  </h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                  </Button>
                </div>
                <TransactionList transactions={transactions} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Redemption */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Redeem Credits</h2>
                <RedemptionOptions />
              </div>

              {/* Leaderboard */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Top Contributors
                </h2>
                <Leaderboard entries={leaderboardData} currentUserId="You" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
