import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Leaf, Target, Users, TrendingUp, Globe, Award, Heart } from "lucide-react"

const stats = [
  { value: "50,000+", label: "Active Citizens" },
  { value: "120+", label: "Partner Organizations" },
  { value: "15", label: "Cities Covered" },
  { value: "85%", label: "Recycling Rate" },
]

const values = [
  {
    icon: Globe,
    title: "Environmental Responsibility",
    description:
      "Every action we take is guided by our commitment to protecting and preserving our planet for future generations.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We believe in the power of collective action. When communities unite, real change happens.",
  },
  {
    icon: Award,
    title: "Transparency & Trust",
    description: "Open bidding, verified submissions, and public dashboards ensure accountability at every level.",
  },
  {
    icon: Heart,
    title: "Inclusive Participation",
    description: "From citizens to corporations, everyone has a role to play in building sustainable cities.",
  },
]

const milestones = [
  { year: "2022", title: "Platform Launch", description: "EcoCollect launched as a pilot program in 3 cities" },
  { year: "2023", title: "National Expansion", description: "Expanded to 10 cities with 20,000+ registered users" },
  { year: "2024", title: "AI Integration", description: "Introduced AI-powered waste classification system" },
  {
    year: "2025",
    title: "Full Scale Operations",
    description: "Operating in 15 cities with transparent bidding system",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
                  <Leaf className="h-4 w-4" />
                  <span>About EcoCollect</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
                  Building Sustainable Cities, One Waste Item at a Time
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  EcoCollect is a government-backed smart waste management initiative designed to revolutionize how
                  cities handle waste. Through technology, incentives, and community participation, we're creating
                  cleaner, greener urban environments.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border bg-card p-6 text-center">
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="rounded-2xl border border-border bg-card p-8 lg:p-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Target className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-2xl font-bold">Our Mission</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  To transform urban waste management through technology-driven solutions that empower citizens,
                  incentivize proper waste segregation, and create transparent systems for waste collection and
                  processing.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-8 lg:p-12">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-2xl font-bold">Our Vision</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  A future where every city achieves 100% waste segregation at source, where recycling is the norm, and
                  where citizens actively participate in building sustainable communities through smart waste management
                  practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Core Values</h2>
              <p className="mt-4 text-lg text-muted-foreground">The principles that guide everything we do</p>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Journey</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Key milestones in our mission to transform waste management
              </p>
            </div>
            <div className="mt-16 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden lg:block" />
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                  >
                    <div className={`flex-1 ${index % 2 === 1 ? "lg:text-left" : "lg:text-right"}`}>
                      <div className="rounded-xl border border-border bg-card p-6 inline-block">
                        <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                        <h3 className="mt-2 text-lg font-semibold">{milestone.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold z-10">
                      {index + 1}
                    </div>
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Be Part of the Change</h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Join EcoCollect today and help us build a cleaner, greener future for our cities.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">Join as Citizen</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10"
              >
                <Link href="/login/organization">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
