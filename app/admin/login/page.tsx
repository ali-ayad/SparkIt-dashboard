"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { language } = useLanguage()
  const t = adminTranslations[language].auth

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Login attempted with:", email)
    // For demo purposes, any email/password will work
    if (email && password) {
      console.log("[v0] Setting admin_authenticated to true")
      localStorage.setItem("admin_authenticated", "true")
      console.log("[v0] Redirecting to /admin/dashboard")
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image src="/images/sparkit-logo.png" alt="SparkIT" width={300} height={900} className="h-12 w-auto" />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">{t.welcome}</h1>
            <p className="text-muted-foreground text-sm">{t.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@sparkit.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                {t.rememberMe}
              </Label>
            </div>

            <Button type="submit" className="w-full h-11 text-base">
              {t.loginButton}
            </Button>
          </form>
        </div>

        {/* Demo Notice */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          {language === "en" ? "Demo: Use any email and password" : "تجريبي: استخدم أي بريد إلكتروني وكلمة مرور"}
        </p>
      </div>
    </div>
  )
}
