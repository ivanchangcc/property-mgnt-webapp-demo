import { getCertStatus } from "../helpers/certificates"
import type {
  Certificate,
  Issue,
  Landlord,
  Property,
  Tenant,
  Worker,
} from "../types"
import { certificates } from "./certificates"
import { issues } from "./issues"
import { landlords } from "./landlords"
import { properties } from "./properties"
import { tenants } from "./tenants"
import { workers } from "./workers"

// ── Re-exports ──
export { certificates, issues, landlords, properties, tenants, workers }

// ── Lookup helpers ──
export function getLandlordById(id: string): Landlord | undefined {
  return landlords.find((l) => l.id === id)
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id)
}

export function getTenantById(id: string): Tenant | undefined {
  return tenants.find((t) => t.id === id)
}

export function getWorkerById(id: string): Worker | undefined {
  return workers.find((w) => w.id === id)
}

export function getIssueById(id: string): Issue | undefined {
  return issues.find((i) => i.id === id)
}

export function getCertificateById(id: string): Certificate | undefined {
  return certificates.find((c) => c.id === id)
}

// ── Relationship helpers ──
export function getPropertiesByLandlord(landlordId: string): Property[] {
  return properties.filter((p) => p.landlordId === landlordId)
}

export function getIssuesByProperty(propertyId: string): Issue[] {
  return issues.filter((i) => i.propertyId === propertyId)
}

export function getCertificatesByProperty(propertyId: string): Certificate[] {
  return certificates.filter((c) => c.propertyId === propertyId)
}

// ── Aggregate helpers ──
export function getOpenIssuesCount(): number {
  return issues.filter(
    (i) => i.status !== "completed" && i.status !== "closed"
  ).length
}

export function getExpiringCertificates(): Certificate[] {
  return certificates.filter((c) => {
    const status = getCertStatus(c)
    return status === "expiring" || status === "expired"
  })
}
