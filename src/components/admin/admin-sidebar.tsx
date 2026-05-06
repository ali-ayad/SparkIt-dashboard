"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  UserCog,
  ScrollText,
  BarChart3,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/lib/constants"

const menuItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", href: ROUTES.dashboard },
  { icon: Package, label: "المنتجات", href: ROUTES.products },
  { icon: Layers, label: "الفئات", href: ROUTES.categories },
  { icon: ShoppingCart, label: "الطلبات", href: ROUTES.orders },
  { icon: Users, label: "العملاء", href: ROUTES.customers },
  { icon: UserCog, label: "المستخدمون", href: ROUTES.users },
  { icon: BarChart3, label: "التحليلات", href: ROUTES.analytics },
  { icon: ScrollText, label: "سجل النشاط", href: ROUTES.logs },
  { icon: Settings, label: "الإعدادات", href: ROUTES.settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col border-e border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href={ROUTES.dashboard} className="flex items-center">
          <Image
            src="/images/sparkit-logo.png"
            alt="SparkIT"
            width={120}
            height={64}
            className="h-16 w-auto object-contain object-right transform transition-transform hover:scale-105"
            priority
          />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
