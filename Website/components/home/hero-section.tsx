import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Scan, Recycle, Coins, Truck } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Recycle className="h-4 w-4" />
              <span>Government Smart City Initiative</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Smart Waste for a <span className="text-primary">Cleaner City</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Join the revolution in waste management. Scan your waste, ensure proper segregation, earn rewards, and
              contribute to a sustainable future. Together, we make our cities greener.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="/scan">
                  <Scan className="h-5 w-5" />
                  Start Scanning
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 bg-transparent">
                <Link href="/how-it-works">
                  Learn How It Works
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-8">
              <div>
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="mt-1 text-sm text-muted-foreground">Active Citizens</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">120+</p>
                <p className="mt-1 text-sm text-muted-foreground">Partner Organizations</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">85%</p>
                <p className="mt-1 text-sm text-muted-foreground">Waste Recycled</p>
              </div>
            </div>
          </div>

          {/* Hero illustration */}
          <div className="relative lg:pl-8">
            <div className="relative mx-auto w-full max-w-lg">
              {/* Main card */}
              <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Quick Actions</h3>
                  <span className="text-xs text-muted-foreground">BioVibe</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/scan"
                    className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/50 p-6 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Scan className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Scan Waste</span>
                  </Link>

                  <Link
                    href="/rewards"
                    className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/50 p-6 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eco-yellow/20 text-eco-orange group-hover:bg-eco-orange group-hover:text-white transition-colors">
                      <Coins className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">My Rewards</span>
                  </Link>

                  <Link
                    href="/bidding"
                    className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/50 p-6 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      <Truck className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">View Contracts</span>
                  </Link>

                  <Link
                    href="/how-it-works"
                    className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-muted/50 p-6 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-eco-green-light/30 text-eco-green group-hover:bg-eco-green group-hover:text-white transition-colors">
                      <Recycle className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">How It Works</span>
                  </Link>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 rounded-xl border border-border bg-card px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-medium">System Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
