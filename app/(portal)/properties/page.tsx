"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { GlassCard } from "@/components/glass-card"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PROPERTY_TYPE_LABELS } from "@/lib/constants"
import { fullName } from "@/lib/helpers/formatting"
import { isOpenIssue } from "@/lib/helpers/issues"
import {
  getIssuesByProperty,
  getLandlordById,
  properties,
} from "@/lib/mock-data"

export default function PropertiesPage() {
  const [search, setSearch] = useState("")

  const filtered = properties.filter((p) => {
    const query = search.toLowerCase()
    const landlord = getLandlordById(p.landlordId)
    return (
      p.name.toLowerCase().includes(query) ||
      p.city.toLowerCase().includes(query) ||
      p.postcode.toLowerCase().includes(query) ||
      (landlord && fullName(landlord).toLowerCase().includes(query))
    )
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Properties"
        description={`${properties.length} properties managed`}
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Landlord</TableHead>
                <TableHead>Tenants</TableHead>
                <TableHead>Open Issues</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((prop) => {
                const landlord = getLandlordById(prop.landlordId)
                const openIssues =
                  getIssuesByProperty(prop.id).filter(isOpenIssue).length
                return (
                  <TableRow key={prop.id}>
                    <TableCell>
                      <Link
                        href={`/properties/${prop.id}`}
                        className="font-medium hover:underline"
                      >
                        {prop.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {PROPERTY_TYPE_LABELS[prop.propertyType] ??
                          prop.propertyType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {prop.city}
                    </TableCell>
                    <TableCell>
                      {landlord ? (
                        <Link
                          href={`/landlords/${landlord.id}`}
                          className="hover:underline"
                        >
                          {fullName(landlord)}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>{prop.tenants.length}</TableCell>
                    <TableCell>
                      {openIssues > 0 ? (
                        <Badge variant="destructive">{openIssues}</Badge>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No properties found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </GlassCard>
    </div>
  )
}
