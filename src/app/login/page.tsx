import { LoginForm } from "@/features/auth/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/images/sparkit-logo.png"
            alt="SparkIT"
            width={140}
            height={64}
            className="h-16 w-auto object-contain"
            priority
          />
          <h1 className="mt-6 text-2xl font-bold text-foreground">
            مرحباً بعودتك
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            أدخل بياناتك للوصول إلى لوحة التحكم
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
