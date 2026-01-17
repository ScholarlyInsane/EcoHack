"use client"

import { useState } from "react"
import { Leaf, Droplets, AlertTriangle, Check, X, Eye, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Submission {
  id: string
  citizenName: string
  category: "dry" | "wet" | "hazardous"
  itemName: string
  imageUrl: string
  submittedAt: string
  confidence: number
  zone: string
}

interface VerificationQueueProps {
  submissions: Submission[]
}

const categoryConfig = {
  dry: { icon: Leaf, label: "Dry", color: "bg-eco-green/10 text-eco-green border-eco-green/30" },
  wet: { icon: Droplets, label: "Wet", color: "bg-accent/10 text-accent border-accent/30" },
  hazardous: { icon: AlertTriangle, label: "Hazardous", color: "bg-eco-red/10 text-eco-red border-eco-red/30" },
}

export function VerificationQueue({ submissions }: VerificationQueueProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="space-y-3">
      {submissions.map((submission) => {
        const CategoryIcon = categoryConfig[submission.category].icon
        const isSelected = selectedId === submission.id

        return (
          <div
            key={submission.id}
            className={`rounded-xl border bg-card overflow-hidden transition-all ${
              isSelected ? "border-primary shadow-md" : "border-border"
            }`}
          >
            <div className="flex items-center gap-4 p-4">
              {/* Image thumbnail */}
              <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={submission.imageUrl || "/placeholder.svg?height=64&width=64&query=waste item"}
                  alt={submission.itemName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className={`gap-1 ${categoryConfig[submission.category].color}`}>
                    <CategoryIcon className="h-3 w-3" />
                    {categoryConfig[submission.category].label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{submission.confidence}% confidence</span>
                </div>
                <p className="font-medium truncate">{submission.itemName}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span>{submission.citizenName}</span>
                  <span>•</span>
                  <span>{submission.zone}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {submission.submittedAt}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setSelectedId(isSelected ? null : submission.id)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-eco-green hover:bg-eco-green/10">
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-eco-red hover:bg-eco-red/10">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Expanded view */}
            {isSelected && (
              <div className="border-t border-border p-4 bg-muted/30">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={submission.imageUrl || "/placeholder.svg?height=200&width=300&query=waste item close up"}
                      alt={submission.itemName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Detected Item</p>
                      <p className="font-medium">{submission.itemName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">AI Confidence</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${submission.confidence}%` }} />
                        </div>
                        <span className="text-sm font-medium">{submission.confidence}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button className="flex-1 gap-1" size="sm">
                        <Check className="h-4 w-4" /> Approve
                      </Button>
                      <Button variant="outline" className="flex-1 gap-1 bg-transparent" size="sm">
                        <X className="h-4 w-4" /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
