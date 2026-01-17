"use client"

import { Button } from "@/components/ui/button"
import { ShoppingBag, Zap, Ticket, Gift, ArrowRight } from "lucide-react"

const redemptionOptions = [
  {
    icon: ShoppingBag,
    title: "Partner Stores",
    description: "Redeem credits at eco-friendly partner stores",
    discount: "Up to 20% off",
    color: "bg-eco-green/10 text-eco-green",
  },
  {
    icon: Zap,
    title: "Utility Bills",
    description: "Pay electricity and water bills with credits",
    discount: "1:1 value",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Ticket,
    title: "Public Transport",
    description: "Get metro and bus passes with your rewards",
    discount: "10% bonus",
    color: "bg-eco-orange/10 text-eco-orange",
  },
  {
    icon: Gift,
    title: "Gift Cards",
    description: "Convert to popular gift cards",
    discount: "From 500 credits",
    color: "bg-primary/10 text-primary",
  },
]

export function RedemptionOptions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {redemptionOptions.map((option) => (
        <div
          key={option.title}
          className="group rounded-xl border border-border bg-card p-5 hover:border-primary hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${option.color}`}>
              <option.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{option.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-medium text-primary">{option.discount}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Redeem <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
