import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DataTablePage } from "@/components/admin/DataTablePage"
import { DataTable, type Column } from "@/components/admin/DataTable"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Customer } from "@/lib/types"

const mockCustomers: Customer[] = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@example.com", orders: 12, spent: 3450 },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", orders: 8, spent: 2100 },
  { id: 3, name: "Mohammed Ali", email: "mohammed@example.com", orders: 15, spent: 5200 },
  { id: 4, name: "Emily Chen", email: "emily@example.com", orders: 5, spent: 1800 },
  { id: 5, name: "Omar Khalil", email: "omar@example.com", orders: 20, spent: 6700 },
]

export default function CustomersPage() {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = mockCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const columns: Column<Customer>[] = [
    {
      header: language === "en" ? "Customer" : "العميل",
      className: "px-6",
      headerClassName: "px-6",
      cell: (customer) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-muted-foreground/10 bg-muted/20">
            <AvatarFallback className="bg-transparent text-primary text-[10px] font-bold uppercase">
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left leading-none gap-0.5">
            <span className="text-sm font-semibold text-foreground">{customer.name}</span>
            <span className="text-[10px] text-muted-foreground">ID: #{customer.id}</span>
          </div>
        </div>
      ),
    },
    {
      header: language === "en" ? "Email" : "البريد الإلكتروني",
      cell: (customer) => (
        <span className="text-xs text-muted-foreground">
          {customer.email}
        </span>
      ),
    },
    {
      header: language === "en" ? "Orders" : "الطلبات",
      cell: (customer) => (
        <span className="text-sm font-medium text-foreground">
          {customer.orders} <span className="text-[10px] text-muted-foreground ml-0.5">ORDERS</span>
        </span>
      ),
    },
    {
      header: language === "en" ? "Total Spent" : "إجمالي الإنفاق",
      cell: (customer) => (
        <span className="text-sm font-semibold text-foreground">
          ${customer.spent.toLocaleString()}
        </span>
      ),
    },
    {
      header: language === "en" ? "Actions" : "الإجراءات",
      headerClassName: "px-6",
      className: "px-6",
      cell: () => (
        <div className="flex justify-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <DataTablePage
      title={language === "en" ? "Customers" : "العملاء"}
      searchPlaceholder={language === "en" ? "Search customers..." : "البحث عن العملاء..."}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      <DataTable
        columns={columns}
        data={filteredCustomers}
        emptyMessage={language === "en" ? "No customers found." : "لا توجد عملاء."}
      />
    </DataTablePage>
  )
}
