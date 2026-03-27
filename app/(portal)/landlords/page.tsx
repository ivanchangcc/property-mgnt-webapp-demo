"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { GlassCard } from "@/components/glass-card"
import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fullName } from "@/lib/helpers/formatting"
import { landlords } from "@/lib/mock-data"

export default function LandlordsPage() {
  const [search, setSearch] = useState("")

  const filtered = landlords.filter((ll) => {
    const name = fullName(ll).toLowerCase()
    const query = search.toLowerCase()
    return (
      name.includes(query) ||
      ll.email.toLowerCase().includes(query) ||
      ll.company?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Landlords"
        description={`${landlords.length} landlords managed`}
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search landlords..."
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Properties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((ll) => (
                <TableRow key={ll.id}>
                  <TableCell>
                    <Link
                      href={`/landlords/${ll.id}`}
                      className="font-medium hover:underline"
                    >
                      {fullName(ll)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {ll.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {ll.phone}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {ll.company ?? "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    {ll.propertyIds.length}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No landlords found
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
