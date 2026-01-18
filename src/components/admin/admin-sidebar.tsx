import { Link, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, LogOut } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = adminTranslations[language].sidebar

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    navigate("/admin/login")
  }

  const menuItems = [
    { icon: LayoutDashboard, label: t.dashboard, href: "/admin/dashboard" },
    { icon: Package, label: t.products, href: "/admin/products" },
    { icon: ShoppingCart, label: t.orders, href: "/admin/orders" },
    { icon: Users, label: t.customers, href: "/admin/customers" },
    { icon: BarChart3, label: t.analytics, href: "/admin/analytics" },
    { icon: Settings, label: t.settings, href: "/admin/settings" },
  ]

  return (
    <div className="flex h-full w-full flex-col border-e border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/admin/dashboard" className="flex items-center">
          <img
            src="/images/sparkit-logo.png"
            alt="SparkIT"
            className={cn(
              "h-16 w-auto object-contain transform transition-transform hover:scale-105",
              language === "ar" ? "object-right" : "object-left"
            )}
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              to={item.href}
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

      {/* Logout Button */}
      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>{t.logout}</span>
        </Button>
      </div>
    </div>
  )
}

