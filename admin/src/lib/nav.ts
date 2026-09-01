import type { LucideIcon } from "lucide-react"
import { LayoutDashboard, Settings } from "lucide-react"

export type NavItem = {
  name: string
  href: string
  icon: LucideIcon
}

export type NavSection = {
  id: string
  title: string
  collapsible?: boolean
  items: NavItem[]
}

/** Product nav. Replace items; do not invent a second sidebar. */
export const APP_TITLE = "Admin"

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "overview",
    title: "Overview",
    items: [{ name: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    id: "system",
    title: "System",
    items: [{ name: "Settings", href: "/settings", icon: Settings }],
  },
]
