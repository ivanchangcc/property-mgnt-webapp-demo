import { Building2, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { GlassCard } from "@/components/glass-card"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fullName } from "@/lib/helpers/formatting"
import { isOpenIssue } from "@/lib/helpers/issues"
import {
  getLandlordById,
  getIssuesByProperty,
  getPropertiesByLandlord,
  landlords,
} from "@/lib/mock-data"
import { PROPERTY_TYPE_LABELS } from "@/lib/constants"

export function generateStaticParams() {
  return landlords.map((ll) => ({ id: ll.id }))
}

export default async function LandlordDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const landlord = getLandlordById(id)
  if (!landlord) notFound()

  const properties = getPropertiesByLandlord(landlord.id)

  return (
    <div className="space-y-6">
      <PageHeader title={fullName(landlord)} description="Landlord details" />

      <GlassCard className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{landlord.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{landlord.phone}</span>
          </div>
          {landlord.company && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{landlord.company}</span>
            </div>
          )}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {landlord.address}
        </p>
      </GlassCard>

      <div>
        <h2 className="mb-4 text-lg font-semibold">
          Properties ({properties.length})
        </h2>
        <GlassCard>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Bedrooms</TableHead>
                  <TableHead>Tenants</TableHead>
                  <TableHead>Open Issues</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {properties.map((prop) => {
                  const openIssues = getIssuesByProperty(prop.id).filter(
                    isOpenIssue
                  ).length
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
                      <TableCell>{prop.bedrooms}</TableCell>
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
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
