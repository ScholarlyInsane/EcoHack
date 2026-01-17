import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Scan, CheckCircle, Coins, Truck, Camera, Upload, QrCode, ShieldCheck, Wallet } from "lucide-react"

const detailedSteps = [
  {
    number: "01",
    title: "Scan Your Waste",
    description: "Use our intelligent scanning system to identify your waste type",
    icon: Scan,
    color: "bg-primary",
    methods: [
      { icon: Camera, label: "Camera Scan", desc: "Point your camera at the waste item" },
      { icon: Upload, label: "Image Upload", desc: "Upload a photo from your gallery" },
      { icon: QrCode, label: "QR Code", desc: "Scan QR on packaging for instant ID" },
    ],
  },
  {
    number: "02",
    title: "AI Classification",
    description: "Our AI analyzes and categorizes waste into Dry, Wet, or Hazardous",
    icon: CheckCircle,
    color: "bg-accent",
    features: [
      "Machine learning powered detection",
      "99% accuracy in waste identification",
      "Instant category suggestions",
      "Manual override option available",
    ],
  },
  {
    number: "03",
    title: "Authority Verification",
    description: "Municipal authorities verify submissions for quality assurance",
    icon: ShieldCheck,
    color: "bg-eco-blue",
    features: [
      "Real-time verification queue",
      "Quality check by officials",
      "Feedback on improper segregation",
      "Learning resources provided",
    ],
  },
  {
    number: "04",
    title: "Earn Rewards",
    description: "Receive credits in your digital wallet for verified submissions",
    icon: Coins,
    color: "bg-eco-orange",
    features: [
      "Instant credit on verification",
      "Bonus for consistent participation",
      "Redeemable at partner stores",
      "Track earnings in real-time",
    ],
  },
  {
    number: "05",
    title: "Scheduled Collection",
    description: "Contracted organizations collect segregated waste from your area",
    icon: Truck,
    color: "bg-eco-green",
    features: [
      "Zone-wise collection schedule",
      "Separate vehicles for each type",
      "Real-time tracking available",
      "Collection confirmation alerts",
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">How EcoCollect Works</h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                A simple, rewarding process that transforms waste management. Follow these steps to start making a
                difference in your community.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/scan">
                    <Scan className="h-5 w-5" />
                    Start Scanning Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Steps */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="space-y-24">
              {detailedSteps.map((step, index) => (
                <div
                  key={step.number}
                  className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-16 items-center`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl font-bold text-muted-foreground/20">{step.number}</span>
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${step.color} text-white`}>
                        <step.icon className="h-7 w-7" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold">{step.title}</h2>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{step.description}</p>

                    {step.methods && (
                      <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {step.methods.map((method) => (
                          <div key={method.label} className="rounded-xl border border-border bg-card p-4 text-center">
                            <method.icon className="h-8 w-8 mx-auto text-primary" />
                            <h4 className="mt-3 font-medium">{method.label}</h4>
                            <p className="mt-1 text-xs text-muted-foreground">{method.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {step.features && (
                      <ul className="mt-8 space-y-3">
                        {step.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="flex-1 w-full">
                    <div
                      className={`aspect-[4/3] rounded-2xl ${step.color}/10 border-2 border-dashed ${step.color.replace("bg-", "border-")}/30 flex items-center justify-center`}
                    >
                      <step.icon className={`h-24 w-24 ${step.color.replace("bg-", "text-")}/40`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of citizens already making a difference. Start scanning today and earn rewards for a
              cleaner tomorrow.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link href="/scan">
                  <Scan className="h-5 w-5" />
                  Scan Your First Item
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 bg-transparent">
                <Link href="/rewards">
                  <Wallet className="h-5 w-5" />
                  View Rewards Program
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
