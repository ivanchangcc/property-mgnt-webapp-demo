import type { Landlord, Property, Tenant, Worker } from "../types"

export function fullName(
  person: Pick<Landlord | Tenant | Worker, "firstName" | "lastName">
): string {
  return `${person.firstName} ${person.lastName}`
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatAddress(property: Property): string {
  const parts = [
    property.addressLine1,
    property.addressLine2,
    property.city,
    property.postcode,
  ].filter(Boolean)
  return parts.join(", ")
}

export function formatRelativeDate(isoDate: string): string {
  const now = new Date()
  const date = new Date(isoDate)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return formatDate(isoDate)
}
