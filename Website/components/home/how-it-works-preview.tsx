import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scan, CheckCircle, Coins, Truck, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Scan,
    title: "Scan",
    description: "Use your phone camera or upload an image to scan your waste item",
    color: "bg-primary text-primary-foreground",
  },
  {
    icon: CheckCircle,
    title: "Segregate",
    description: "AI identifies the waste type - Dry, Wet, or Hazardous - for proper disposal",
    color: "bg-accent text-accent-foreground",
  },
  {
    icon: Coins,
    title: "Earn",
    description: "Receive rewards and credits for every verified waste submission",
    color: "bg-eco-orange text-white",
  },
  {
    icon: Truck,
    title: "Collect",
    description: "Contracted organizations collect segregated waste from your area",
    color: "bg-eco-green text-white",
  },
]

export function HowItWorksPreview() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Simple Steps to a Greener Tomorrow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our streamlined process makes waste management effortless and rewarding
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${step.color} shadow-lg`}>
                    <step.icon className="h-10 w-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-card border-2 border-border text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild className="gap-2 bg-transparent">
            <Link href="/how-it-works">
              View Detailed Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
