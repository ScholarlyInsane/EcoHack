import { Calendar, FileCheck, Users, Award, Truck } from "lucide-react"

const timelineSteps = [
  {
    icon: Calendar,
    title: "Announcement",
    description: "Bidding period announced with zone details and requirements",
    date: "Jan 1 - Jan 15",
    status: "completed",
  },
  {
    icon: Users,
    title: "Registration",
    description: "Organizations register and submit necessary documents",
    date: "Jan 15 - Jan 31",
    status: "completed",
  },
  {
    icon: FileCheck,
    title: "Bid Submission",
    description: "Qualified organizations submit their sealed bids",
    date: "Feb 1 - Feb 28",
    status: "current",
  },
  {
    icon: Award,
    title: "Award",
    description: "Lowest bids selected and contracts awarded",
    date: "Mar 1 - Mar 15",
    status: "upcoming",
  },
  {
    icon: Truck,
    title: "Operations Begin",
    description: "Contracted organizations start waste collection",
    date: "Apr 1",
    status: "upcoming",
  },
]

export function BiddingTimeline() {
  return (
    <div className="space-y-6">
      {timelineSteps.map((step, index) => (
        <div key={step.title} className="flex gap-4">
          {/* Icon and line */}
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step.status === "completed"
                  ? "bg-eco-green border-eco-green text-white"
                  : step.status === "current"
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-border text-muted-foreground"
              }`}
            >
              <step.icon className="h-5 w-5" />
            </div>
            {index < timelineSteps.length - 1 && (
              <div className={`w-0.5 flex-1 mt-2 ${step.status === "completed" ? "bg-eco-green" : "bg-border"}`} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-8">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{step.title}</h3>
              <span
                className={`text-xs font-medium ${
                  step.status === "current" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.date}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
