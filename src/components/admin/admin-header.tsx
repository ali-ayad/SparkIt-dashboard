
import { Menu, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export function AdminHeader() {
  const { language } = useLanguage()

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side={language === "ar" ? "right" : "left"} className="p-0 w-64">
            <SheetHeader className="sr-only">
              <SheetTitle>{language === "en" ? "Navigation Menu" : "قائمة التنقل"}</SheetTitle>
              <SheetDescription>
                {language === "en" ? "Access administrative sections" : "الوصول إلى الأقسام الإدارية"}
              </SheetDescription>
            </SheetHeader>
            <AdminSidebar />
          </SheetContent>
        </Sheet>

        {/* Search */}
        <div className="hidden sm:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={language === "en" ? "Search..." : "بحث..."}
              className="h-9 ps-9 bg-background focus-visible:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="sm:hidden">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
            3
          </span>
        </Button>
      </div>
    </header>
  )
}

