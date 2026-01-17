"use client"

import { Leaf, Droplets, AlertTriangle, ArrowUpRight, Gift, CheckCircle, Clock, XCircle } from "lucide-react"

type TransactionType = "submission" | "withdrawal" | "bonus" | "redemption"
type TransactionStatus = "completed" | "pending" | "rejected"
type WasteCategory = "dry" | "wet" | "hazardous"

interface Transaction {
  id: string
  type: TransactionType
  status: TransactionStatus
  amount: number
  description: string
  date: string
  category?: WasteCategory
}

interface TransactionListProps {
  transactions: Transaction[]
}

const typeConfig = {
  submission: { icon: CheckCircle, label: "Waste Submission" },
  withdrawal: { icon: ArrowUpRight, label: "Withdrawal" },
  bonus: { icon: Gift, label: "Bonus Reward" },
  redemption: { icon: ArrowUpRight, label: "Redemption" },
}

const statusConfig = {
  completed: { icon: CheckCircle, color: "text-eco-green", bg: "bg-eco-green/10" },
  pending: { icon: Clock, color: "text-eco-orange", bg: "bg-eco-orange/10" },
  rejected: { icon: XCircle, color: "text-eco-red", bg: "bg-eco-red/10" },
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

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-3">
      {transactions.map((tx) => {
        const TypeIcon = typeConfig[tx.type].icon
        const StatusIcon = statusConfig[tx.status].icon
        const CategoryIcon = tx.category ? categoryIcons[tx.category] : null

        return (
          <div
            key={tx.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-muted/50 transition-colors"
          >
            {/* Icon */}
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                tx.category ? categoryColors[tx.category] : "bg-muted text-muted-foreground"
              }`}
            >
              {CategoryIcon ? <CategoryIcon className="h-6 w-6" /> : <TypeIcon className="h-6 w-6" />}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium truncate">{tx.description}</p>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${statusConfig[tx.status].bg} ${statusConfig[tx.status].color}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {tx.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{tx.date}</p>
            </div>

            {/* Amount */}
            <div className="text-right">
              <p className={`font-semibold ${tx.amount >= 0 ? "text-eco-green" : "text-foreground"}`}>
                {tx.amount >= 0 ? "+" : ""}
                {tx.amount} Credits
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
