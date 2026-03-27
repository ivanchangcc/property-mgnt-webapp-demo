import type { Certificate } from "../types"

export const certificates: Certificate[] = [
  // prop-001: 14 Elm Street, Flat 2
  {
    id: "cert-001",
    propertyId: "prop-001",
    type: "gas-safety",
    label: "Gas Safety (CP12)",
    issuedDate: "2025-04-10",
    expiryDate: "2026-04-10",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-002",
    propertyId: "prop-001",
    type: "eicr",
    label: "EICR",
    issuedDate: "2023-06-01",
    expiryDate: "2026-06-01",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-003",
    propertyId: "prop-001",
    type: "epc",
    label: "EPC",
    issuedDate: "2021-03-15",
    expiryDate: "2031-03-15",
    expiryThresholdDays: 60,
  },

  // prop-002: 27 Baker Road
  {
    id: "cert-004",
    propertyId: "prop-002",
    type: "gas-safety",
    label: "Gas Safety (CP12)",
    issuedDate: "2025-05-20",
    expiryDate: "2026-05-20",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-005",
    propertyId: "prop-002",
    type: "epc",
    label: "EPC",
    issuedDate: "2020-08-01",
    expiryDate: "2030-08-01",
    expiryThresholdDays: 60,
  },
  {
    id: "cert-006",
    propertyId: "prop-002",
    type: "fire-alarm",
    label: "Fire Alarm",
    issuedDate: "2025-10-01",
    expiryDate: "2026-10-01",
    expiryThresholdDays: 30,
  },

  // prop-003: 9 Highgate Hill
  {
    id: "cert-007",
    propertyId: "prop-003",
    type: "gas-safety",
    label: "Gas Safety (CP12)",
    issuedDate: "2025-03-01",
    expiryDate: "2026-03-01",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-008",
    propertyId: "prop-003",
    type: "eicr",
    label: "EICR",
    issuedDate: "2022-01-10",
    expiryDate: "2027-01-10",
    expiryThresholdDays: 30,
  },

  // prop-004: 55 Brixton Road
  {
    id: "cert-009",
    propertyId: "prop-004",
    type: "gas-safety",
    label: "Gas Safety (CP12)",
    issuedDate: "2025-06-15",
    expiryDate: "2026-06-15",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-010",
    propertyId: "prop-004",
    type: "pat",
    label: "PAT Testing",
    issuedDate: "2025-01-20",
    expiryDate: "2026-01-20",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-011",
    propertyId: "prop-004",
    type: "legionella",
    label: "Legionella Risk Assessment",
    issuedDate: "2024-11-01",
    expiryDate: "2026-11-01",
    expiryThresholdDays: 30,
  },

  // prop-005: 12 Camden Passage
  {
    id: "cert-012",
    propertyId: "prop-005",
    type: "gas-safety",
    label: "Gas Safety (CP12)",
    issuedDate: "2025-02-10",
    expiryDate: "2026-04-01",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-013",
    propertyId: "prop-005",
    type: "epc",
    label: "EPC",
    issuedDate: "2019-05-01",
    expiryDate: "2029-05-01",
    expiryThresholdDays: 60,
  },

  // prop-006: 3 Westbourne Terrace (HMO - more certs)
  {
    id: "cert-014",
    propertyId: "prop-006",
    type: "gas-safety",
    label: "Gas Safety (CP12)",
    issuedDate: "2025-08-01",
    expiryDate: "2026-08-01",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-015",
    propertyId: "prop-006",
    type: "fire-alarm",
    label: "Fire Alarm",
    issuedDate: "2025-07-15",
    expiryDate: "2026-07-15",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-016",
    propertyId: "prop-006",
    type: "asbestos",
    label: "Asbestos Survey",
    issuedDate: "2024-02-01",
    expiryDate: "2026-02-01",
    expiryThresholdDays: 30,
  },

  // prop-007: 18 Commercial Street
  {
    id: "cert-017",
    propertyId: "prop-007",
    type: "epc",
    label: "EPC",
    issuedDate: "2022-06-01",
    expiryDate: "2032-06-01",
    expiryThresholdDays: 60,
  },
  {
    id: "cert-018",
    propertyId: "prop-007",
    type: "asbestos",
    label: "Asbestos Survey",
    issuedDate: "2023-03-01",
    expiryDate: "2026-03-01",
    expiryThresholdDays: 30,
  },

  // prop-008: 41 Wilmslow Road
  {
    id: "cert-019",
    propertyId: "prop-008",
    type: "gas-safety",
    label: "Gas Safety (CP12)",
    issuedDate: "2025-09-01",
    expiryDate: "2026-09-01",
    expiryThresholdDays: 30,
  },
  {
    id: "cert-020",
    propertyId: "prop-008",
    type: "eicr",
    label: "EICR",
    issuedDate: "2024-06-01",
    expiryDate: "2029-06-01",
    expiryThresholdDays: 30,
  },
]
