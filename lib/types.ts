// ── Entity ID types ──
export type LandlordId = string
export type PropertyId = string
export type TenantId = string
export type IssueId = string
export type CommentId = string
export type CertificateId = string
export type WorkerId = string

// ── Landlord ──
export interface Landlord {
  id: LandlordId
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  address: string
  propertyIds: PropertyId[]
  createdAt: string
}

// ── Property ──
export type PropertyType = "house" | "flat" | "hmo" | "commercial"

export interface TenantAssignment {
  tenantId: TenantId
  isLeadTenant: boolean
  moveInDate: string
  moveOutDate?: string
}

export interface Property {
  id: PropertyId
  name: string
  addressLine1: string
  addressLine2?: string
  city: string
  postcode: string
  propertyType: PropertyType
  bedrooms: number
  landlordId: LandlordId
  tenants: TenantAssignment[]
  certificateIds: CertificateId[]
  issueIds: IssueId[]
  createdAt: string
}

// ── Tenant ──
export interface Tenant {
  id: TenantId
  firstName: string
  lastName: string
  email: string
  phone: string
}

// ── Issue ──
export type IssueStatus =
  | "open"
  | "assigned"
  | "in-progress"
  | "reviewing"
  | "completed"
  | "closed"

export type IssuePriority = "low" | "medium" | "high" | "urgent"

export interface Comment {
  id: CommentId
  authorName: string
  text: string
  photoUrls: string[]
  createdAt: string
}

export interface Issue {
  id: IssueId
  title: string
  description: string
  status: IssueStatus
  priority: IssuePriority
  propertyId: PropertyId
  assignedWorkerIds: WorkerId[]
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

// ── Certificate ──
export type CertificateType =
  | "gas-safety"
  | "eicr"
  | "epc"
  | "fire-alarm"
  | "legionella"
  | "asbestos"
  | "pat"
  | "other"

export interface Certificate {
  id: CertificateId
  propertyId: PropertyId
  type: CertificateType
  label: string
  issuedDate: string
  expiryDate: string
  documentUrl?: string
  expiryThresholdDays: number
}

// ── Worker ──
export interface Worker {
  id: WorkerId
  firstName: string
  lastName: string
  email: string
  phone: string
  specialties: string[]
  available: boolean
}
