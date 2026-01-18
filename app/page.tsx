"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_authenticated") === "true"
    console.log("[v0] Home page auth check:", isAuthenticated)

    if (isAuthenticated) {
      console.log("[v0] Redirecting to dashboard")
      router.replace("/admin/dashboard")
    } else {
      console.log("[v0] Redirecting to login")
      router.replace("/admin/login")
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 text-lg text-muted-foreground">جاري التحميل...</div>
      </div>
    </div>
  )
}
