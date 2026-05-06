import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { ConfirmProvider } from "@/components/confirm-dialog"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConfirmProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <aside className="hidden md:flex w-56 flex-shrink-0">
          <AdminSidebar />
        </aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ConfirmProvider>
  )
}
