import { Badge } from "@/components/ui/badge"
import { ISSUE_STATUS_COLORS, ISSUE_STATUS_LABELS } from "@/lib/constants"
import type { IssueStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: IssueStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(ISSUE_STATUS_COLORS[status], className)}
    >
      {ISSUE_STATUS_LABELS[status]}
    </Badge>
  )
}
