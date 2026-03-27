"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { GlassCard } from "@/components/glass-card"
import { PageHeader } from "@/components/page-header"
import { PriorityBadge } from "@/components/priority-badge"
import { StatusBadge } from "@/components/status-badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ISSUE_STATUS_LABELS,
  ISSUE_STATUS_ORDER,
  ISSUE_PRIORITY_LABELS,
} from "@/lib/constants"
import { formatDate, fullName } from "@/lib/helpers/formatting"
import { getPropertyById, getWorkerById, issues } from "@/lib/mock-data"
import type { IssuePriority, IssueStatus } from "@/lib/types"

export default function IssuesPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const filtered = issues.filter((issue) => {
    const query = search.toLowerCase()
    const matchesSearch =
      issue.title.toLowerCase().includes(query) ||
      issue.description.toLowerCase().includes(query)
    const matchesStatus =
      statusFilter === "all" || issue.status === statusFilter
    const matchesPriority =
      priorityFilter === "all" || issue.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="Issues"
        description={`${issues.length} total issues`}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search issues..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {ISSUE_STATUS_ORDER.map((s) => (
              <SelectItem key={s} value={s}>
                {ISSUE_STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {(
              Object.keys(ISSUE_PRIORITY_LABELS) as IssuePriority[]
            ).map((p) => (
              <SelectItem key={p} value={p}>
                {ISSUE_PRIORITY_LABELS[p]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <GlassCard>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Workers</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((issue) => {
                const property = getPropertyById(issue.propertyId)
                const workerNames = issue.assignedWorkerIds
                  .map((wId) => {
                    const w = getWorkerById(wId)
                    return w ? fullName(w) : null
                  })
                  .filter(Boolean)
                return (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <Link
                        href={`/issues/${issue.id}`}
                        className="font-medium hover:underline"
                      >
                        {issue.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {property ? (
                        <Link
                          href={`/properties/${property.id}`}
                          className="text-muted-foreground hover:underline"
                        >
                          {property.name}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={issue.status} />
                    </TableCell>
                    <TableCell>
                      <PriorityBadge priority={issue.priority} />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {workerNames.length > 0
                        ? workerNames.join(", ")
                        : "Unassigned"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(issue.createdAt)}
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
                    No issues found
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
