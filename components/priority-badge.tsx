import { Badge } from "@/components/ui/badge"
import { ISSUE_PRIORITY_COLORS, ISSUE_PRIORITY_LABELS } from "@/lib/constants"
import type { IssuePriority } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PriorityBadgeProps {
  priority: IssuePriority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(ISSUE_PRIORITY_COLORS[priority], className)}
    >
      {ISSUE_PRIORITY_LABELS[priority]}
    </Badge>
  )
}
