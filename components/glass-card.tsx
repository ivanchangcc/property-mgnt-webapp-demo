import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "light" | "medium" | "strong"
}

export function GlassCard({
  intensity: _intensity = "medium",
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn("bg-card border", className)}
      {...props}
    >
      {children}
    </div>
  )
}
