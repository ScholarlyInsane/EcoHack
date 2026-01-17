// Shared store for bids that can be verified by admin
// This simulates a database for demonstration purposes

export interface OrganizationBid {
  id: string
  organizationName: string
  organizationId: string
  zoneName: string
  zoneId: string
  district: string
  category: "dry" | "wet" | "hazardous" | "mixed"
  bidAmount: number
  proposalSummary: string
  documents: string[]
  submittedAt: Date
  status: "pending" | "approved" | "rejected"
  currentLowest?: number
}

// Initial mock bids that need admin verification
const initialBids: OrganizationBid[] = [
  {
    id: "BID-2026-001",
    organizationName: "GreenCycle Solutions",
    organizationId: "ORG-001",
    zoneName: "Zone C",
    zoneId: "zone-c",
    district: "East District",
    category: "dry",
    bidAmount: 46000,
    proposalSummary: "We propose to handle dry waste collection with our fleet of 15 electric vehicles.",
    documents: ["license.pdf", "fleet-details.pdf"],
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: "pending",
    currentLowest: 45000,
  },
  {
    id: "BID-2026-002",
    organizationName: "EcoWaste Handlers",
    organizationId: "ORG-002",
    zoneName: "Zone D",
    zoneId: "zone-d",
    district: "West District",
    category: "wet",
    bidAmount: 52000,
    proposalSummary: "Specialized in organic waste processing with composting facilities.",
    documents: ["composting-cert.pdf", "equipment.pdf"],
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: "pending",
    currentLowest: 55000,
  },
  {
    id: "BID-2026-003",
    organizationName: "SafeDispose Inc",
    organizationId: "ORG-003",
    zoneName: "Zone E",
    zoneId: "zone-e",
    district: "North District",
    category: "hazardous",
    bidAmount: 85000,
    proposalSummary: "Licensed hazardous waste handler with specialized containment vehicles.",
    documents: ["hazmat-license.pdf", "safety-cert.pdf", "insurance.pdf"],
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    status: "pending",
    currentLowest: 90000,
  },
]

// In-memory store (in real app, this would be a database)
let bids: OrganizationBid[] = [...initialBids]
let listeners: (() => void)[] = []

export const bidStore = {
  getBids: () => bids,

  getPendingBids: () => bids.filter((b) => b.status === "pending"),

  getApprovedBids: () => bids.filter((b) => b.status === "approved"),

  getBidsByOrganization: (orgId: string) => bids.filter((b) => b.organizationId === orgId),

  addBid: (bid: Omit<OrganizationBid, "id" | "submittedAt" | "status">) => {
    const newBid: OrganizationBid = {
      ...bid,
      id: `BID-2026-${String(bids.length + 1).padStart(3, "0")}`,
      submittedAt: new Date(),
      status: "pending",
    }
    bids = [...bids, newBid]
    listeners.forEach((l) => l())
    return newBid
  },

  updateBidStatus: (bidId: string, status: "approved" | "rejected") => {
    bids = bids.map((b) => (b.id === bidId ? { ...b, status } : b))
    listeners.forEach((l) => l())
  },

  subscribe: (listener: () => void) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
}
