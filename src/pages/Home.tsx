import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_authenticated") === "true"
    console.log("[v0] Home page auth check:", isAuthenticated)

    if (isAuthenticated) {
      console.log("Redirecting to dashboard")
      navigate("/admin/dashboard", { replace: true })
    } else {
      console.log("Redirecting to login")
      navigate("/admin/login", { replace: true })
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 text-lg text-muted-foreground">جاري التحميل...</div>
      </div>
    </div>
  )
}

