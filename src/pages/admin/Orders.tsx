import { Suspense, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTablePage } from "@/components/admin/DataTablePage"
import { DataTable, type Column } from "@/components/admin/DataTable"
import type { Order } from "@/lib/types"

const mockOrders: Order[] = [
  {
    id: "ORD-1234",
    customer: "Ahmed Hassan",
    customerAr: "أحمد حسن",
    date: "2026-01-10",
    total: 1199,
    status: "pending",
    items: 2,
  },
  {
    id: "ORD-1235",
    customer: "Sarah Johnson",
    customerAr: "سارة جونسون",
    date: "2026-01-09",
    total: 2499,
    status: "processing",
    items: 1,
  },
  {
    id: "ORD-1236",
    customer: "Mohammed Ali",
    customerAr: "محمد علي",
    date: "2026-01-09",
    total: 449,
    status: "shipped",
    items: 3,
  },
  {
    id: "ORD-1237",
    customer: "Emily Chen",
    customerAr: "إيميلي تشين",
    date: "2026-01-08",
    total: 799,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-1238",
    customer: "Omar Khalil",
    customerAr: "عمر خليل",
    date: "2026-01-08",
    total: 1899,
    status: "cancelled",
    items: 2,
  },
]

export default function OrdersPage() {
  const { language } = useLanguage()
  const t = adminTranslations[language].ordersManagement
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (language === "en"
        ? order.customer.toLowerCase().includes(searchQuery.toLowerCase())
        : order.customerAr.includes(searchQuery))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-600 border-yellow-200/50 dark:bg-yellow-950/20 dark:border-yellow-900/50"
      case "processing":
        return "bg-blue-50 text-blue-600 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-900/50"
      case "shipped":
        return "bg-purple-50 text-purple-600 border-purple-200/50 dark:bg-purple-950/20 dark:border-purple-900/50"
      case "delivered":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/50"
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-200/50 dark:bg-red-950/20 dark:border-red-900/50"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return t.pending
      case "processing":
        return t.processing
      case "shipped":
        return t.shipped
      case "delivered":
        return t.delivered
      case "cancelled":
        return t.cancelled
      default:
        return status
    }
  }

  const columns: Column<Order>[] = [
    {
      header: t.orderNumber,
      className: "px-6",
      headerClassName: "px-6",
      cell: (order) => <span className="text-sm font-semibold text-primary">{order.id}</span>,
    },
    {
      header: t.customer,
      cell: (order) => <span className="text-sm font-medium text-foreground">{language === "en" ? order.customer : order.customerAr}</span>,
    },
    {
      header: t.date,
      cell: (order) => (
        <span className="text-xs text-muted-foreground">
          {new Date(order.date).toLocaleDateString(language === "en" ? "en-US" : "ar-EG", {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
      ),
    },
    {
      header: language === "en" ? "Items" : "العناصر",
      cell: (order) => (
        <span className="text-xs font-medium text-muted-foreground">
          {order.items} <span className="text-[10px] opacity-70">ITEMS</span>
        </span>
      ),
    },
    {
      header: t.total,
      cell: (order) => <span className="text-sm font-semibold text-foreground">${order.total}</span>,
    },
    {
      header: t.status,
      cell: (order) => (
        <div className="flex justify-center">
          <Badge variant="outline" className={`${getStatusColor(order.status)} text-[10px] font-medium`}>
            {getStatusLabel(order.status)}
          </Badge>
        </div>
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
    <Suspense fallback={<div>Loading...</div>}>
      <DataTablePage
        title={t.title}
        searchPlaceholder={language === "en" ? "Search orders..." : "البحث عن الطلبات..."}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] bg-background/50 border-muted">
              <SelectValue placeholder={language === "en" ? "Status" : "الحالة"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === "en" ? "All" : "الكل"}</SelectItem>
              <SelectItem value="pending">{t.pending}</SelectItem>
              <SelectItem value="processing">{t.processing}</SelectItem>
              <SelectItem value="shipped">{t.shipped}</SelectItem>
              <SelectItem value="delivered">{t.delivered}</SelectItem>
              <SelectItem value="cancelled">{t.cancelled}</SelectItem>
            </SelectContent>
          </Select>
        }
      >
        <DataTable
          columns={columns}
          data={filteredOrders}
          emptyMessage={language === "en" ? "No orders found." : "لا توجد طلبات."}
        />
      </DataTablePage>
    </Suspense>
  )
}
