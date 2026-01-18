
import { Suspense, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockOrders = [
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

function OrdersContent() {
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
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-400"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950/30 dark:text-gray-400"
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={language === "en" ? "Search orders..." : "البحث عن الطلبات..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder={language === "en" ? "Filter by status" : "تصفية حسب الحالة"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === "en" ? "All Status" : "جميع الحالات"}</SelectItem>
                <SelectItem value="pending">{t.pending}</SelectItem>
                <SelectItem value="processing">{t.processing}</SelectItem>
                <SelectItem value="shipped">{t.shipped}</SelectItem>
                <SelectItem value="delivered">{t.delivered}</SelectItem>
                <SelectItem value="cancelled">{t.cancelled}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "All Orders" : "جميع الطلبات"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.orderNumber}</TableHead>
                  <TableHead>{t.customer}</TableHead>
                  <TableHead>{t.date}</TableHead>
                  <TableHead>{language === "en" ? "Items" : "العناصر"}</TableHead>
                  <TableHead>{t.total}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead className="text-right">{language === "en" ? "Actions" : "الإجراءات"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{language === "en" ? order.customer : order.customerAr}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString(language === "en" ? "en-US" : "ar-EG")}
                    </TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="font-medium">${order.total}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          {t.viewDetails}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <Suspense fallback={null}>
      <OrdersContent />
    </Suspense>
  )
}

