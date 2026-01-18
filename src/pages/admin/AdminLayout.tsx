import { useEffect, useState } from "react"
import { useNavigate, useLocation, Outlet } from "react-router-dom"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Skip auth check for login page is handled by routing now, 
    // but we can keep logic if needed for internal redirects.
    
    // Check authentication
    const authenticated = localStorage.getItem("admin_authenticated") === "true"
    console.log("[v0] Auth check in layout:", { authenticated, pathname })

    if (!authenticated && pathname !== "/admin/login") {
      navigate("/admin/login")
    } else {
      setIsAuthenticated(true)
    }

    setIsChecking(false)
  }, [pathname, navigate])

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">جاري التحميل...</div>
      </div>
    )
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 flex-shrink-0">
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

