import type { LucideIcon } from "lucide-react"
import { GlassCard } from "./glass-card"

interface StatCardProps {
  label: string
  value: number | string
  icon: LucideIcon
  description?: string
}

export function StatCard({ label, value, icon: Icon, description }: StatCardProps) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </GlassCard>
  )
}
