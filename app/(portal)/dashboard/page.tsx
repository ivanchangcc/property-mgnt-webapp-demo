import { AlertCircle, Building2, FileWarning, Users } from "lucide-react"
import Link from "next/link"

import { CertStatusIndicator } from "@/components/cert-status-indicator"
import { PageHeader } from "@/components/page-header"
import { StatCard } from "@/components/stat-card"
import { StatusBadge } from "@/components/status-badge"
import { GlassCard } from "@/components/glass-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCertStatus, getDaysUntilExpiry } from "@/lib/helpers/certificates"
import { formatDate } from "@/lib/helpers/formatting"
import { isOpenIssue } from "@/lib/helpers/issues"
import {
  certificates,
  getPropertyById,
  issues,
  landlords,
  properties,
} from "@/lib/mock-data"

export default function DashboardPage() {
  const openIssuesCount = issues.filter(isOpenIssue).length
  const expiringCerts = certificates.filter((c) => {
    const status = getCertStatus(c)
    return status === "expiring" || status === "expired"
  })
  const recentIssues = [...issues]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your property management portfolio"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Open Issues"
          value={openIssuesCount}
          icon={AlertCircle}
          description="Require attention"
        />
        <StatCard
          label="Expiring Certificates"
          value={expiringCerts.length}
          icon={FileWarning}
          description="Within threshold"
        />
        <StatCard
          label="Landlords"
          value={landlords.length}
          icon={Users}
        />
        <StatCard
          label="Properties"
          value={properties.length}
          icon={Building2}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent Issues</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentIssues.map((issue) => {
                  const property = getPropertyById(issue.propertyId)
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
                      <TableCell className="text-muted-foreground">
                        {property?.name ?? "—"}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={issue.status} />
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(issue.createdAt)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Expiring Certificates
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiringCerts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No certificates expiring soon
                    </TableCell>
                  </TableRow>
                ) : (
                  expiringCerts.map((cert) => {
                    const property = getPropertyById(cert.propertyId)
                    const status = getCertStatus(cert)
                    const days = getDaysUntilExpiry(cert)
                    return (
                      <TableRow key={cert.id}>
                        <TableCell className="font-medium">
                          {cert.label}
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/properties/${cert.propertyId}`}
                            className="text-muted-foreground hover:underline"
                          >
                            {property?.name ?? "—"}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <CertStatusIndicator status={status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {days < 0
                            ? `Expired ${Math.abs(days)}d ago`
                            : `${days}d remaining`}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
