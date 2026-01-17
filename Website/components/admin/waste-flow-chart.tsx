"use client"

import { Leaf, Droplets, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

interface WasteFlowData {
  category: "dry" | "wet" | "hazardous"
  collected: number
  processed: number
  pending: number
  trend: number
}

interface WasteFlowChartProps {
  data: WasteFlowData[]
}

const categoryConfig = {
  dry: { icon: Leaf, label: "Dry Waste", color: "bg-eco-green", lightColor: "bg-eco-green/20" },
  wet: { icon: Droplets, label: "Wet Waste", color: "bg-accent", lightColor: "bg-accent/20" },
  hazardous: { icon: AlertTriangle, label: "Hazardous", color: "bg-eco-red", lightColor: "bg-eco-red/20" },
}

export function WasteFlowChart({ data }: WasteFlowChartProps) {
  const maxValue = Math.max(...data.flatMap((d) => [d.collected, d.processed, d.pending]))

  return (
    <div className="space-y-6">
      {data.map((item) => {
        const config = categoryConfig[item.category]
        const Icon = config.icon
        const total = item.collected + item.processed + item.pending

        return (
          <div key={item.category} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.lightColor}`}>
                  <Icon className={`h-4 w-4 ${config.color.replace("bg-", "text-")}`} />
                </div>
                <span className="font-medium">{config.label}</span>
              </div>
              <div className="flex items-center gap-1">
                {item.trend > 0 ? (
                  <TrendingUp className="h-4 w-4 text-eco-green" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-eco-red" />
                )}
                <span className={`text-sm font-medium ${item.trend > 0 ? "text-eco-green" : "text-eco-red"}`}>
                  {item.trend > 0 ? "+" : ""}
                  {item.trend}%
                </span>
              </div>
            </div>

            {/* Stacked bar */}
            <div className="h-4 w-full rounded-full bg-muted overflow-hidden flex">
              <div
                className={`${config.color} transition-all`}
                style={{ width: `${(item.processed / total) * 100}%` }}
                title={`Processed: ${item.processed} tons`}
              />
              <div
                className={`${config.lightColor} transition-all`}
                style={{ width: `${(item.collected / total) * 100}%` }}
                title={`Collected: ${item.collected} tons`}
              />
              <div
                className="bg-muted-foreground/20 transition-all"
                style={{ width: `${(item.pending / total) * 100}%` }}
                title={`Pending: ${item.pending} tons`}
              />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Processed: {item.processed}t</span>
              <span>Collected: {item.collected}t</span>
              <span>Pending: {item.pending}t</span>
            </div>
          </div>
        )
      })}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Processed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary/30" />
          <span className="text-xs text-muted-foreground">Collected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
          <span className="text-xs text-muted-foreground">Pending</span>
        </div>
      </div>
    </div>
  )
}
