import { Badge } from "@/components/ui/badge"
import {
  CERT_STATUS_COLORS,
  CERT_STATUS_LABELS,
  type CertStatus,
} from "@/lib/constants"
import { cn } from "@/lib/utils"

interface CertStatusIndicatorProps {
  status: CertStatus
  className?: string
}

export function CertStatusIndicator({
  status,
  className,
}: CertStatusIndicatorProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(CERT_STATUS_COLORS[status], className)}
    >
      {CERT_STATUS_LABELS[status]}
    </Badge>
  )
}
