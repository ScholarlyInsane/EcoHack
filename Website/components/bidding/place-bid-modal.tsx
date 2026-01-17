"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Droplets,
  AlertTriangle,
  Upload,
  FileText,
  X,
  CheckCircle2,
  IndianRupee,
  Building2,
  Calendar,
  TrendingDown,
  Info,
} from "lucide-react"
import { bidStore } from "@/lib/bid-store"

type WasteCategory = "dry" | "wet" | "hazardous"

interface AvailableBid {
  id: string
  zone: string
  category: WasteCategory
  currentLowest: number
  deadline: string
  estimatedVolume: string
}

interface NewBid {
  id: string
  zone: string
  category: WasteCategory
  yourBid: number
  currentLowest: number
  deadline: string
  status: "leading" | "outbid" | "pending"
}

interface PlaceBidModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  availableBids: AvailableBid[]
  onBidPlaced?: (newBid: NewBid) => void
}

const categoryConfig = {
  dry: {
    icon: Leaf,
    label: "Dry Waste",
    color: "bg-eco-green/10 text-eco-green border-eco-green/30",
  },
  wet: {
    icon: Droplets,
    label: "Wet Waste",
    color: "bg-accent/10 text-accent border-accent/30",
  },
  hazardous: {
    icon: AlertTriangle,
    label: "Hazardous",
    color: "bg-eco-red/10 text-eco-red border-eco-red/30",
  },
}

export function PlaceBidModal({ open, onOpenChange, availableBids, onBidPlaced }: PlaceBidModalProps) {
  const [step, setStep] = useState(1)
  const [selectedBid, setSelectedBid] = useState<string>("")
  const [bidAmount, setBidAmount] = useState("")
  const [proposalSummary, setProposalSummary] = useState("")
  const [documents, setDocuments] = useState<File[]>([])
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [bidReference, setBidReference] = useState("")

  const selectedBidData = availableBids.find((b) => b.id === selectedBid)
  const isBidLower = selectedBidData && Number(bidAmount) < selectedBidData.currentLowest

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments((prev) => [...prev, ...Array.from(e.target.files!)])
    }
  }

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (selectedBidData) {
      const bidAmountNum = Number(bidAmount)

      const zoneParts = selectedBidData.zone.split(" - ")
      const district = zoneParts[0] || "Unknown District"
      const zoneName = zoneParts[1] || selectedBidData.zone

      const newStoreBid = bidStore.addBid({
        organizationName: "GreenCycle Solutions",
        organizationId: "ORG-001",
        zoneName: zoneName,
        zoneId: selectedBidData.id,
        district: district,
        category: selectedBidData.category as "dry" | "wet" | "hazardous" | "mixed",
        bidAmount: bidAmountNum,
        proposalSummary: proposalSummary,
        documents: documents.map((d) => d.name),
        currentLowest: selectedBidData.currentLowest,
      })

      setBidReference(newStoreBid.id)

      if (onBidPlaced) {
        const newBid: NewBid = {
          id: newStoreBid.id,
          zone: selectedBidData.zone,
          category: selectedBidData.category,
          yourBid: bidAmountNum,
          currentLowest: bidAmountNum < selectedBidData.currentLowest ? bidAmountNum : selectedBidData.currentLowest,
          deadline: selectedBidData.deadline.split(",")[0],
          status: "pending",
        }
        onBidPlaced(newBid)
      }
    }

    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const resetForm = () => {
    setStep(1)
    setSelectedBid("")
    setBidAmount("")
    setProposalSummary("")
    setDocuments([])
    setAgreedToTerms(false)
    setIsSuccess(false)
    setBidReference("")
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(resetForm, 300)
  }

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Bid Submitted Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Your bid for {selectedBidData?.zone} has been submitted and is pending admin verification.
            </p>
            <div className="rounded-lg bg-muted p-4 w-full mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Bid Reference</span>
                <span className="font-mono font-medium">{bidReference}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Zone</span>
                <span className="font-medium">{selectedBidData?.zone}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Bid Amount</span>
                <span className="font-semibold text-primary">₹{Number(bidAmount).toLocaleString()}/month</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/30">
                  Pending Verification
                </Badge>
              </div>
            </div>
            <Button onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Place New Bid</DialogTitle>
          <DialogDescription>Submit a competitive bid for waste collection contracts</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 py-4 border-b">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
              <span className={`text-sm hidden sm:block ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                {s === 1 ? "Select Zone" : s === 2 ? "Bid Details" : "Review & Submit"}
              </span>
              {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <Label>Select Zone to Bid On</Label>
            <div className="space-y-3">
              {availableBids
                .filter((b) => b.id !== "BID-2026-004")
                .map((bid) => {
                  const CategoryIcon = categoryConfig[bid.category].icon
                  return (
                    <div
                      key={bid.id}
                      onClick={() => setSelectedBid(bid.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedBid === bid.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{bid.zone}</span>
                            <Badge variant="outline" className={`gap-1 ${categoryConfig[bid.category].color}`}>
                              <CategoryIcon className="h-3 w-3" />
                              {categoryConfig[bid.category].label}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <TrendingDown className="h-3.5 w-3.5" />
                              Current Lowest:{" "}
                              <span className="text-foreground font-medium">
                                ₹{bid.currentLowest.toLocaleString()}/mo
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              Deadline: {bid.deadline}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Est. Volume: {bid.estimatedVolume}</div>
                        </div>
                        <div
                          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                            selectedBid === bid.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                          }`}
                        >
                          {selectedBid === bid.id && <CheckCircle2 className="h-3 w-3 text-primary-foreground" />}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setStep(2)} disabled={!selectedBid}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 py-4">
            {selectedBidData && (
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{selectedBidData.zone}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Current lowest bid:{" "}
                  <span className="text-foreground font-semibold">
                    ₹{selectedBidData.currentLowest.toLocaleString()}/month
                  </span>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="bidAmount">Your Bid Amount (per month)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="bidAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
              {bidAmount && selectedBidData && (
                <p className={`text-sm flex items-center gap-1 ${isBidLower ? "text-eco-green" : "text-eco-orange"}`}>
                  <Info className="h-3.5 w-3.5" />
                  {isBidLower
                    ? `Your bid is ₹${(selectedBidData.currentLowest - Number(bidAmount)).toLocaleString()} lower than current lowest`
                    : `Your bid is ₹${(Number(bidAmount) - selectedBidData.currentLowest).toLocaleString()} higher than current lowest`}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposal">Proposal Summary</Label>
              <Textarea
                id="proposal"
                placeholder="Briefly describe your approach, equipment, and team capacity..."
                value={proposalSummary}
                onChange={(e) => setProposalSummary(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Supporting Documents</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="doc-upload"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                />
                <label htmlFor="doc-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Click to upload documents</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Registration certificate, past experience, equipment details (PDF, DOC, JPG)
                  </p>
                </label>
              </div>
              {documents.length > 0 && (
                <div className="space-y-2 mt-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
                        <span className="text-xs text-muted-foreground">({(doc.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeDocument(index)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!bidAmount || !proposalSummary}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 py-4">
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold">Bid Summary</h3>

              <div className="grid gap-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Zone</span>
                  <span className="font-medium">{selectedBidData?.zone}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="outline" className={categoryConfig[selectedBidData?.category || "dry"].color}>
                    {categoryConfig[selectedBidData?.category || "dry"].label}
                  </Badge>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Your Bid Amount</span>
                  <span className="font-semibold text-primary">₹{Number(bidAmount).toLocaleString()}/month</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Current Lowest</span>
                  <span>₹{selectedBidData?.currentLowest.toLocaleString()}/month</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Documents Attached</span>
                  <span>{documents.length} file(s)</span>
                </div>
                <div className="py-2">
                  <span className="text-muted-foreground block mb-2">Proposal Summary</span>
                  <p className="text-sm bg-muted p-3 rounded">{proposalSummary}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                I confirm that all information provided is accurate and agree to the{" "}
                <a href="#" className="text-primary underline">
                  Bidding Terms & Conditions
                </a>
                . I understand that providing false information may result in disqualification.
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={!agreedToTerms || isSubmitting} className="min-w-[120px]">
                {isSubmitting ? "Submitting..." : "Submit Bid"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
