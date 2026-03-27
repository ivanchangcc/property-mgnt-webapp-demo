import Link from "next/link"
import { notFound } from "next/navigation"

import { CertStatusIndicator } from "@/components/cert-status-indicator"
import { GlassCard } from "@/components/glass-card"
import { PageHeader } from "@/components/page-header"
import { StatusBadge } from "@/components/status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PROPERTY_TYPE_LABELS } from "@/lib/constants"
import { getCertStatus, getDaysUntilExpiry } from "@/lib/helpers/certificates"
import { formatAddress, formatDate, fullName } from "@/lib/helpers/formatting"
import {
  getCertificatesByProperty,
  getIssuesByProperty,
  getLandlordById,
  getPropertyById,
  getTenantById,
  properties,
} from "@/lib/mock-data"

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }))
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = getPropertyById(id)
  if (!property) notFound()

  const landlord = getLandlordById(property.landlordId)
  const issues = getIssuesByProperty(property.id)
  const certs = getCertificatesByProperty(property.id)

  return (
    <div className="space-y-6">
      <PageHeader
        title={property.name}
        description={formatAddress(property)}
      />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issues">Issues ({issues.length})</TabsTrigger>
          <TabsTrigger value="certificates">
            Certificates ({certs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <GlassCard className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Property Details</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-medium">
                  {PROPERTY_TYPE_LABELS[property.propertyType] ??
                    property.propertyType}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
                <p className="font-medium">{property.bedrooms}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Landlord</p>
                {landlord ? (
                  <Link
                    href={`/landlords/${landlord.id}`}
                    className="font-medium hover:underline"
                  >
                    {fullName(landlord)}
                  </Link>
                ) : (
                  <p className="font-medium">—</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">{property.city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Postcode</p>
                <p className="font-medium">{property.postcode}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Tenants ({property.tenants.length})
            </h2>
            {property.tenants.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No tenants assigned
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Move In</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {property.tenants.map((assignment) => {
                      const tenant = getTenantById(assignment.tenantId)
                      if (!tenant) return null
                      return (
                        <TableRow key={tenant.id}>
                          <TableCell className="font-medium">
                            {fullName(tenant)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {tenant.email}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {tenant.phone}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(assignment.moveInDate)}
                          </TableCell>
                          <TableCell>
                            {assignment.isLeadTenant ? (
                              <Badge>Lead</Badge>
                            ) : (
                              <span className="text-muted-foreground">
                                Tenant
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </GlassCard>
        </TabsContent>

        <TabsContent value="issues" className="mt-6">
          <GlassCard>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issues.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center text-muted-foreground"
                      >
                        No issues for this property
                      </TableCell>
                    </TableRow>
                  ) : (
                    issues.map((issue) => (
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
                          <StatusBadge status={issue.status} />
                        </TableCell>
                        <TableCell>
                          <PriorityBadge priority={issue.priority} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(issue.createdAt)}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <GlassCard>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate</TableHead>
                    <TableHead>Issued</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Days Left</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certs.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                      >
                        No certificates for this property
                      </TableCell>
                    </TableRow>
                  ) : (
                    certs.map((cert) => {
                      const status = getCertStatus(cert)
                      const days = getDaysUntilExpiry(cert)
                      return (
                        <TableRow key={cert.id}>
                          <TableCell className="font-medium">
                            {cert.label}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(cert.issuedDate)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(cert.expiryDate)}
                          </TableCell>
                          <TableCell>
                            <CertStatusIndicator status={status} />
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {days < 0
                              ? `Expired ${Math.abs(days)}d ago`
                              : `${days}d`}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
