"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Droplets, AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react"

type WasteCategory = "dry" | "wet" | "hazardous"

interface ClassificationResultProps {
  imageData: string
  category: WasteCategory
  confidence: number
  itemName: string
  onReset: () => void
  onConfirm: () => void
}

const categoryConfig = {
  dry: {
    icon: Leaf,
    label: "Dry Waste",
    color: "bg-eco-green",
    lightColor: "bg-eco-green/10",
    textColor: "text-eco-green",
    borderColor: "border-eco-green",
    description: "This item is recyclable and should be disposed in the dry waste bin.",
    tips: ["Ensure the item is clean and dry", "Remove any food residue", "Flatten cardboard boxes"],
  },
  wet: {
    icon: Droplets,
    label: "Wet Waste",
    color: "bg-accent",
    lightColor: "bg-accent/10",
    textColor: "text-accent",
    borderColor: "border-accent",
    description: "This is organic/biodegradable waste that can be composted.",
    tips: ["Separate from dry waste", "Can be used for composting", "Keep in covered containers"],
  },
  hazardous: {
    icon: AlertTriangle,
    label: "Hazardous Waste",
    color: "bg-eco-red",
    lightColor: "bg-eco-red/10",
    textColor: "text-eco-red",
    borderColor: "border-eco-red",
    description: "This item requires special handling. Do not mix with regular waste.",
    tips: ["Store separately from other waste", "Contact local collection center", "Never dispose in regular bins"],
  },
}

export function ClassificationResult({
  imageData,
  category,
  confidence,
  itemName,
  onReset,
  onConfirm,
}: ClassificationResultProps) {
  const config = categoryConfig[category]
  const Icon = config.icon

  return (
    <div className="space-y-6">
      {/* Image preview */}
      <div className="relative rounded-xl overflow-hidden border border-border">
        <img
          src={imageData || "/placeholder.svg"}
          alt="Scanned waste item"
          className="w-full aspect-video object-cover"
        />
        <div
          className={`absolute top-4 right-4 flex items-center gap-2 rounded-full ${config.color} px-4 py-2 text-white font-medium`}
        >
          <Icon className="h-5 w-5" />
          {config.label}
        </div>
      </div>

      {/* Classification details */}
      <div className={`rounded-xl border-2 ${config.borderColor} ${config.lightColor} p-6`}>
        <div className="flex items-start gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${config.color} text-white`}>
            <Icon className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{itemName}</h3>
              <span className={`text-sm font-medium ${config.textColor}`}>
                {Math.round(confidence * 100)}% confident
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{config.description}</p>

            {/* Confidence bar */}
            <div className="mt-4">
              <div className="h-2 w-full rounded-full bg-background">
                <div
                  className={`h-2 rounded-full ${config.color} transition-all duration-500`}
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 border-t border-border/50 pt-6">
          <h4 className="flex items-center gap-2 text-sm font-medium mb-3">
            <Info className="h-4 w-4" />
            Disposal Tips
          </h4>
          <ul className="space-y-2">
            {config.tips.map((tip) => (
              <li key={tip} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className={`h-4 w-4 ${config.textColor} flex-shrink-0`} />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={onReset} className="flex-1 gap-2 bg-transparent">
          <XCircle className="h-4 w-4" />
          Scan Different Item
        </Button>
        <Button onClick={onConfirm} className="flex-1 gap-2">
          <CheckCircle className="h-4 w-4" />
          Confirm & Submit
        </Button>
      </div>

      {/* Manual override notice */}
      <div className="rounded-lg bg-muted/50 p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Not accurate?{" "}
          <button className="text-primary font-medium hover:underline">Request manual verification</button> by
          authorities.
        </p>
      </div>
    </div>
  )
}
