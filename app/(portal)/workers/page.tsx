"use client"

import { Search } from "lucide-react"
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
import { fullName } from "@/lib/helpers/formatting"
import { workers } from "@/lib/mock-data"

export default function WorkersPage() {
  const [search, setSearch] = useState("")

  const filtered = workers.filter((w) => {
    const query = search.toLowerCase()
    return (
      fullName(w).toLowerCase().includes(query) ||
      w.specialties.some((s) => s.toLowerCase().includes(query))
    )
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Workers"
        description={`${workers.length} repair workers`}
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search workers or specialties..."
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
                <TableHead>Specialties</TableHead>
                <TableHead>Available</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((worker) => (
                <TableRow key={worker.id}>
                  <TableCell className="font-medium">
                    {fullName(worker)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {worker.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {worker.phone}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {worker.specialties.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {worker.available ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Unavailable</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
                  >
                    No workers found
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
