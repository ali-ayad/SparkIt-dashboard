"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ROUTES } from "@/lib/constants"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate network delay for better UX feel
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // TODO: wire to real auth endpoint
    router.push(ROUTES.dashboard)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-colors"
          placeholder="name@example.com"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">كلمة المرور</Label>
          <Button variant="link" className="px-0 font-normal text-xs text-muted-foreground h-auto p-0" type="button" disabled={isLoading}>
            هل نسيت كلمة المرور؟
          </Button>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="h-12 bg-muted/50 border-transparent focus:border-primary focus:bg-background transition-colors"
          placeholder="••••••••"
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center gap-2 pt-1 pb-2">
        <Checkbox
          id="remember"
          checked={remember}
          onCheckedChange={(checked) => setRemember(checked === true)}
          disabled={isLoading}
        />
        <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer">
          تذكرني على هذا الجهاز
        </Label>
      </div>

      <Button type="submit" className="w-full h-12 text-base font-medium shadow-md transition-all hover:shadow-lg active:scale-[0.98]" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            جاري تسجيل الدخول...
          </>
        ) : (
          "تسجيل الدخول"
        )}
      </Button>
    </form>
  )
}
