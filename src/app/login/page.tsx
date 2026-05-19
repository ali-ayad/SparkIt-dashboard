import { LoginForm } from "@/features/auth/login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Right side (Brand / Visuals) - Hidden on smaller screens */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full bg-black/10 blur-3xl" />
        
        <div className="relative z-10 flex items-center gap-2">
          <Image
            src="/images/sparkit-logo.png"
            alt="SparkIT"
            width={140}
            height={64}
            className="h-12 w-auto object-contain brightness-0 invert"
            priority
          />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold leading-tight mb-6">
            أهلاً بك في منصة SparkIT
          </h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            الحل الأمثل لإدارة عملياتك بكفاءة وسهولة. تتبع، حلل، وطور أداءك مع أدواتنا المتقدمة.
          </p>
        </div>

        <div className="relative z-10 text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} SparkIT. جميع الحقوق محفوظة.
        </div>
      </div>

      {/* Left side (Login Form) */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-background px-8 py-12 sm:px-12 lg:px-24">
        <div className="w-full max-w-sm space-y-8">
          <div className="flex flex-col space-y-2 text-center lg:text-start">
            {/* Show logo only on mobile since desktop has it on the visual side */}
            <div className="flex lg:hidden justify-center mb-6">
              <Image
                src="/images/sparkit-logo.png"
                alt="SparkIT"
                width={140}
                height={64}
                className="h-14 w-auto object-contain"
                priority
              />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">مرحباً بعودتك</h2>
            <p className="text-sm text-muted-foreground">
              الرجاء إدخال بياناتك للوصول إلى لوحة التحكم
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
