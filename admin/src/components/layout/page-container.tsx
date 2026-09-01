import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("mx-auto flex h-full min-h-0 w-full max-w-[1400px] flex-1 flex-col", className)}>
      {children}
    </div>
  )
}
