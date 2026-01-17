"use client"

import { Wallet, ArrowDownLeft, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WalletCardProps {
  balance: number
  pendingRewards: number
  lifetimeEarnings: number
}

export function WalletCard({ balance, pendingRewards, lifetimeEarnings }: WalletCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 lg:p-8 text-primary-foreground">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wallet-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wallet-pattern)" />
        </svg>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-primary-foreground/70">EcoWallet</p>
              <p className="font-medium">My Balance</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
            Withdraw
          </Button>
        </div>

        <div className="mb-8">
          <p className="text-4xl lg:text-5xl font-bold">{balance.toLocaleString()}</p>
          <p className="text-sm text-primary-foreground/70 mt-1">Credits</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownLeft className="h-4 w-4 text-eco-yellow" />
              <span className="text-xs text-primary-foreground/70">Pending</span>
            </div>
            <p className="text-lg font-semibold">+{pendingRewards}</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-eco-green-light" />
              <span className="text-xs text-primary-foreground/70">Lifetime</span>
            </div>
            <p className="text-lg font-semibold">{lifetimeEarnings.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
