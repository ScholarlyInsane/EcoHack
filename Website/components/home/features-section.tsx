import { Shield, TrendingUp, Users, FileCheck, Wallet, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Government Backed",
    description: "Official smart city initiative ensuring trust, transparency, and accountability in waste management",
  },
  {
    icon: TrendingUp,
    title: "Transparent Bidding",
    description: "Annual open bidding system for waste collection contracts with public visibility",
  },
  {
    icon: Users,
    title: "Citizen Rewards",
    description: "Earn monetary credits and rewards for proper waste segregation and submission",
  },
  {
    icon: FileCheck,
    title: "Verified Collection",
    description: "Authority-verified waste submissions ensure quality and compliance",
  },
  {
    icon: Wallet,
    title: "Digital Wallet",
    description: "Track earnings, transaction history, and redeem rewards seamlessly",
  },
  {
    icon: Globe,
    title: "Environmental Impact",
    description: "Real-time tracking of your contribution to sustainability goals",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Built for Trust & Transparency</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A comprehensive platform designed for citizens, organizations, and municipalities
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
