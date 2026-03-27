import type { CertificateType, IssuePriority, IssueStatus } from "./types"

// ── Issue Status ──
export const ISSUE_STATUS_LABELS: Record<IssueStatus, string> = {
  open: "Open",
  assigned: "Assigned",
  "in-progress": "In Progress",
  reviewing: "Reviewing",
  completed: "Completed",
  closed: "Closed",
}

export const ISSUE_STATUS_COLORS: Record<IssueStatus, string> = {
  open: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  assigned: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  "in-progress":
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  reviewing:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  completed:
    "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  closed: "bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-300",
}

export const ISSUE_STATUS_ORDER: IssueStatus[] = [
  "open",
  "assigned",
  "in-progress",
  "reviewing",
  "completed",
  "closed",
]

// ── Issue Priority ──
export const ISSUE_PRIORITY_LABELS: Record<IssuePriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
}

export const ISSUE_PRIORITY_COLORS: Record<IssuePriority, string> = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800/40 dark:text-slate-300",
  medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  urgent: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
}

// ── Certificate Types ──
export const CERTIFICATE_TYPE_LABELS: Record<CertificateType, string> = {
  "gas-safety": "Gas Safety (CP12)",
  eicr: "EICR",
  epc: "EPC",
  "fire-alarm": "Fire Alarm",
  legionella: "Legionella Risk Assessment",
  asbestos: "Asbestos Survey",
  pat: "PAT Testing",
  other: "Other",
}

export const DEFAULT_CERT_EXPIRY_THRESHOLD_DAYS = 30

// ── Certificate Status ──
export type CertStatus = "valid" | "expiring" | "expired"

export const CERT_STATUS_COLORS: Record<CertStatus, string> = {
  valid: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  expiring:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  expired: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
}

export const CERT_STATUS_LABELS: Record<CertStatus, string> = {
  valid: "Valid",
  expiring: "Expiring Soon",
  expired: "Expired",
}

// ── Property Types ──
export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  house: "House",
  flat: "Flat",
  hmo: "HMO",
  commercial: "Commercial",
}
