import { Droplets, Leaf, AlertTriangle } from "lucide-react"

const categories = [
  {
    icon: Leaf,
    name: "Dry Waste",
    description: "Paper, cardboard, plastic bottles, metal cans, glass, textiles, and other recyclable materials",
    examples: ["Newspapers", "Plastic containers", "Aluminum cans", "Glass bottles", "Cardboard boxes"],
    color: "border-eco-green bg-eco-green/5",
    iconBg: "bg-eco-green text-white",
  },
  {
    icon: Droplets,
    name: "Wet Waste",
    description: "Organic and biodegradable waste that can be composted into nutrient-rich soil",
    examples: ["Food scraps", "Fruit peels", "Vegetable waste", "Coffee grounds", "Garden waste"],
    color: "border-accent bg-accent/5",
    iconBg: "bg-accent text-white",
  },
  {
    icon: AlertTriangle,
    name: "Hazardous Waste",
    description: "Potentially dangerous materials requiring special handling and disposal procedures",
    examples: ["Batteries", "Electronics", "Chemicals", "Medical waste", "Paint & solvents"],
    color: "border-eco-red bg-eco-red/5",
    iconBg: "bg-eco-red text-white",
  },
]

export function WasteCategories() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Know Your Waste Categories</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Proper segregation is the first step towards effective waste management
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`rounded-2xl border-2 ${category.color} p-8 transition-transform hover:-translate-y-1`}
            >
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl ${category.iconBg}`}>
                <category.icon className="h-7 w-7" />
              </div>

              <h3 className="mt-6 text-xl font-semibold">{category.name}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{category.description}</p>

              <div className="mt-6">
                <p className="text-sm font-medium text-foreground mb-3">Common Examples:</p>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example) => (
                    <span
                      key={example}
                      className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-medium border border-border"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
