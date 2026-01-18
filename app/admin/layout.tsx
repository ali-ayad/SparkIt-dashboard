"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsChecking(false)
      return
    }

    // Check authentication
    const authenticated = localStorage.getItem("admin_authenticated") === "true"
    console.log("[v0] Auth check in layout:", { authenticated, pathname })

    if (!authenticated) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }

    setIsChecking(false)
  }, [pathname, router])

  // Don't show sidebar/header on login page
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-muted-foreground">جاري التحميل...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
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
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
