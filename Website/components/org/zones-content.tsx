"use client"

import { useState } from "react"
import { ZoneCollectionCard } from "@/components/org/zone-collection-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter } from "lucide-react"
import Link from "next/link"

const allZones = [
  {
    zoneName: "Zone A-1",
    district: "North District",
    nextCollection: "Today, 2:00 PM",
    collectionsCompleted: 145,
    totalHouseholds: 200,
    status: "in_progress" as const,
  },
  {
    zoneName: "Zone A-2",
    district: "North District",
    nextCollection: "Tomorrow, 9:00 AM",
    collectionsCompleted: 180,
    totalHouseholds: 180,
    status: "completed" as const,
  },
  {
    zoneName: "Zone B-1",
    district: "South District",
    nextCollection: "Jan 20, 10:00 AM",
    collectionsCompleted: 95,
    totalHouseholds: 250,
    status: "scheduled" as const,
  },
  {
    zoneName: "Zone B-2",
    district: "South District",
    nextCollection: "Jan 21, 8:00 AM",
    collectionsCompleted: 120,
    totalHouseholds: 180,
    status: "scheduled" as const,
  },
  {
    zoneName: "Zone C-1",
    district: "East District",
    nextCollection: "Jan 19, 3:00 PM",
    collectionsCompleted: 200,
    totalHouseholds: 200,
    status: "completed" as const,
  },
  {
    zoneName: "Zone C-2",
    district: "East District",
    nextCollection: "Today, 5:00 PM",
    collectionsCompleted: 50,
    totalHouseholds: 150,
    status: "in_progress" as const,
  },
  {
    zoneName: "Zone D-1",
    district: "West District",
    nextCollection: "Jan 22, 9:00 AM",
    collectionsCompleted: 0,
    totalHouseholds: 220,
    status: "scheduled" as const,
  },
  {
    zoneName: "Zone D-2",
    district: "West District",
    nextCollection: "Jan 22, 11:00 AM",
    collectionsCompleted: 0,
    totalHouseholds: 175,
    status: "scheduled" as const,
  },
]

export function ZonesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [districtFilter, setDistrictFilter] = useState<string>("all")

  const filteredZones = allZones.filter((zone) => {
    const matchesSearch =
      zone.zoneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.district.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || zone.status === statusFilter
    const matchesDistrict = districtFilter === "all" || zone.district === districtFilter
    return matchesSearch && matchesStatus && matchesDistrict
  })

  const districts = [...new Set(allZones.map((z) => z.district))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/organization">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Assigned Zones</h1>
          <p className="text-muted-foreground">Manage and monitor all your collection zones</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search zones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={districtFilter} onValueChange={setDistrictFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by district" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Districts</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Zones</p>
          <p className="text-2xl font-bold">{allZones.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-2xl font-bold text-eco-orange">
            {allZones.filter((z) => z.status === "in_progress").length}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Completed Today</p>
          <p className="text-2xl font-bold text-eco-green">{allZones.filter((z) => z.status === "completed").length}</p>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-sm text-muted-foreground">Scheduled</p>
          <p className="text-2xl font-bold text-accent">{allZones.filter((z) => z.status === "scheduled").length}</p>
        </div>
      </div>

      {/* Zones Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredZones.map((zone) => (
          <ZoneCollectionCard key={zone.zoneName} {...zone} />
        ))}
      </div>

      {filteredZones.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No zones found matching your criteria</p>
        </div>
      )}
    </div>
  )
}
