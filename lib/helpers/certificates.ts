import type { CertStatus } from "../constants"
import type { Certificate } from "../types"

export function getDaysUntilExpiry(cert: Certificate): number {
  const now = new Date()
  const expiry = new Date(cert.expiryDate)
  const diffMs = expiry.getTime() - now.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

export function getCertStatus(cert: Certificate): CertStatus {
  const days = getDaysUntilExpiry(cert)
  if (days < 0) return "expired"
  if (days <= cert.expiryThresholdDays) return "expiring"
  return "valid"
}
