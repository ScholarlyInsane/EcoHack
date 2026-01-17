"use client"

import { useState, useEffect } from "react"
import { AdminStats } from "@/components/admin/admin-stats"
import { VerificationQueue } from "@/components/admin/verification-queue"
import { OrganizationApprovalList } from "@/components/admin/organization-approval-list"
import { WasteFlowChart } from "@/components/admin/waste-flow-chart"
import { BidVerificationQueue } from "@/components/admin/bid-verification-queue"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { bidStore } from "@/lib/bid-store"

// Mock data for waste submissions
const pendingSubmissions = [
  {
    id: "SUB-001",
    citizenName: "Rahul Sharma",
    category: "dry" as const,
    itemName: "Plastic Bottle (1L)",
    imageUrl: "/plastic-bottle.png",
    submittedAt: "10 mins ago",
    confidence: 94,
    zone: "North District - Zone A",
  },
  {
    id: "SUB-002",
    citizenName: "Priya Patel",
    category: "hazardous" as const,
    itemName: "Used Battery Pack",
    imageUrl: "/battery-still-life.png",
    submittedAt: "25 mins ago",
    confidence: 87,
    zone: "Central District",
  },
  {
    id: "SUB-003",
    citizenName: "Amit Kumar",
    category: "wet" as const,
    itemName: "Food Waste",
    imageUrl: "/overflowing-bin-food-waste.png",
    submittedAt: "1 hour ago",
    confidence: 91,
    zone: "South District - Zone B",
  },
]

const pendingOrganizations = [
  {
    id: "ORG-001",
    name: "CleanCity Waste Management",
    registrationNumber: "CIN-U90001MH2024PTC123456",
    location: "Mumbai, Maharashtra",
    appliedFor: ["Dry Waste", "Wet Waste"],
    documentsSubmitted: 8,
    totalDocuments: 10,
    appliedAt: "2 days ago",
    status: "pending" as const,
  },
  {
    id: "ORG-002",
    name: "HazMat Solutions Pvt Ltd",
    registrationNumber: "CIN-U90002DL2024PTC789012",
    location: "Delhi NCR",
    appliedFor: ["Hazardous Waste"],
    documentsSubmitted: 10,
    totalDocuments: 10,
    appliedAt: "5 days ago",
    status: "pending" as const,
  },
]

const wasteFlowData = [
  { category: "dry" as const, collected: 850, processed: 720, pending: 130, trend: 12 },
  { category: "wet" as const, collected: 620, processed: 580, pending: 40, trend: 8 },
  { category: "hazardous" as const, collected: 95, processed: 80, pending: 15, trend: -3 },
]

export default function AdminDashboard() {
  const [pendingBidsCount, setPendingBidsCount] = useState(0)

  useEffect(() => {
    setPendingBidsCount(bidStore.getPendingBids().length)
    const unsubscribe = bidStore.subscribe(() => {
      setPendingBidsCount(bidStore.getPendingBids().length)
    })
    return unsubscribe
  }, [])

  const statsData = {
    pendingVerifications: 12,
    activeOrganizations: 120,
    registeredCitizens: 50000,
    monthlyPayments: 4850000,
    wasteCollected: 2450,
    activeAlerts: pendingBidsCount > 0 ? 3 + pendingBidsCount : 3,
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Municipality Waste Management Overview</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <AdminStats {...statsData} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Pending Verifications</h2>
            </div>

            <Tabs defaultValue="bids" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="bids" className="gap-2">
                  Organization Bids
                  {pendingBidsCount > 0 && (
                    <span className="h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {pendingBidsCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="waste" className="gap-2">
                  Waste Submissions
                  <span className="h-5 min-w-5 px-1 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">
                    {pendingSubmissions.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bids">
                <BidVerificationQueue />
              </TabsContent>

              <TabsContent value="waste">
                <VerificationQueue submissions={pendingSubmissions} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Organization approvals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Organization Approvals</h2>
              <Button variant="ghost" size="sm" className="text-primary gap-1" asChild>
                <Link href="/admin/organizations">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <OrganizationApprovalList organizations={pendingOrganizations} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Waste flow */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">Waste Flow (This Month)</h3>
            <WasteFlowChart data={wasteFlowData} />
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/admin/bidding">Manage Bidding</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/admin/payments">Process Payments</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/admin/zones">Configure Zones</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/admin/reports">Generate Reports</Link>
              </Button>
            </div>
          </div>

          {/* System alerts */}
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
            <h3 className="font-semibold text-destructive mb-3">System Alerts ({3 + pendingBidsCount})</h3>
            <div className="space-y-3 text-sm">
              {pendingBidsCount > 0 && (
                <div className="flex items-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    {pendingBidsCount} organization bid{pendingBidsCount > 1 ? "s" : ""} pending verification
                  </p>
                </div>
              )}
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                <p className="text-muted-foreground">Collection delay reported in Zone B-2</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <p className="text-muted-foreground">2 organizations pending document verification</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                <p className="text-muted-foreground">Bidding deadline approaching for 3 zones</p>
              </div>
            </div>
            <Button size="sm" className="w-full mt-4" asChild>
              <Link href="/admin/alerts">View All Alerts</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
