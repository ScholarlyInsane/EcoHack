"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Coins, Clock, ArrowRight, Home, Scan } from "lucide-react"
import Link from "next/link"

interface SubmissionSuccessProps {
  submissionId: string
  estimatedReward: number
  onScanAnother: () => void
}

export function SubmissionSuccess({ submissionId, estimatedReward, onScanAnother }: SubmissionSuccessProps) {
  return (
    <div className="text-center py-8">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-eco-green/10 text-eco-green mb-6">
        <CheckCircle className="h-10 w-10" />
      </div>

      <h2 className="text-2xl font-bold">Submission Successful!</h2>
      <p className="mt-2 text-muted-foreground">Your waste scan has been submitted for verification.</p>

      <div className="mt-8 rounded-xl border border-border bg-card p-6 max-w-sm mx-auto">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Submission ID</span>
            <span className="font-mono text-sm font-medium">{submissionId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-eco-orange">
              <Clock className="h-4 w-4" />
              Pending Verification
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">Estimated Reward</span>
            <span className="inline-flex items-center gap-1.5 text-lg font-bold text-eco-green">
              <Coins className="h-5 w-5" />
              {estimatedReward} Credits
            </span>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground max-w-md mx-auto">
        You'll receive a notification once your submission is verified. Rewards will be credited to your wallet within
        24-48 hours.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" asChild className="gap-2 bg-transparent">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button onClick={onScanAnother} className="gap-2">
          <Scan className="h-4 w-4" />
          Scan Another Item
        </Button>
      </div>

      <div className="mt-8">
        <Link href="/rewards" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          View your rewards history
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
