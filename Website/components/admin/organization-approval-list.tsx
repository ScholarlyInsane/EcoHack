import { Building2, MapPin, FileText, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Organization {
  id: string
  name: string
  registrationNumber: string
  location: string
  appliedFor: string[]
  documentsSubmitted: number
  totalDocuments: number
  appliedAt: string
  status: "pending" | "approved" | "rejected"
}

interface OrganizationApprovalListProps {
  organizations: Organization[]
}

const statusConfig = {
  pending: { label: "Pending Review", color: "bg-eco-orange/10 text-eco-orange" },
  approved: { label: "Approved", color: "bg-eco-green/10 text-eco-green" },
  rejected: { label: "Rejected", color: "bg-eco-red/10 text-eco-red" },
}

export function OrganizationApprovalList({ organizations }: OrganizationApprovalListProps) {
  return (
    <div className="space-y-3">
      {organizations.map((org) => (
        <div key={org.id} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{org.name}</h3>
                <p className="text-xs text-muted-foreground">{org.registrationNumber}</p>
              </div>
            </div>
            <Badge variant="secondary" className={statusConfig[org.status].color}>
              {statusConfig[org.status].label}
            </Badge>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{org.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {org.documentsSubmitted}/{org.totalDocuments} docs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Applied {org.appliedAt}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {org.appliedFor.map((category) => (
                <Badge key={category} variant="outline" className="text-xs bg-transparent">
                  {category}
                </Badge>
              ))}
            </div>
            {org.status === "pending" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                  <FileText className="h-3.5 w-3.5" /> View Docs
                </Button>
                <Button size="sm" className="gap-1">
                  <Check className="h-3.5 w-3.5" /> Approve
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
