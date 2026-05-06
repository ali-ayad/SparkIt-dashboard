"use client"

import { useState } from "react"
import { Edit, Eye, Search, ShoppingCart, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DataTable,
  type Column,
} from "@/components/admin/data-table"
import { DataTablePage } from "@/components/admin/data-table-page"
import { EmptyState } from "@/components/admin/empty-state"
import {
  ORDER_STATUS_COLOR,
  ORDER_STATUS_LABEL,
} from "@/lib/constants"
import type { Order, OrderStatus } from "@/lib/types"

interface OrdersViewProps {
  initialOrders: Order[]
}

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]

export function OrdersView({ initialOrders }: OrdersViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all")

  const filteredOrders = initialOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns: Column<Order>[] = [
    {
      header: "طلب رقم",
      className: "px-6",
      headerClassName: "px-6",
      cell: (order) => (
        <span className="text-sm font-semibold text-primary">{order.id}</span>
      ),
    },
    {
      header: "العميل",
      cell: (order) => (
        <span className="text-sm font-medium text-foreground">
          {order.customer}
        </span>
      ),
    },
    {
      header: "التاريخ",
      cell: (order) => (
        <span className="text-xs text-muted-foreground">
          {new Date(order.date).toLocaleDateString("ar-EG", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      header: "العناصر",
      cell: (order) => (
        <span className="text-xs font-medium text-muted-foreground">
          {order.items}{" "}
          <span className="text-[10px] opacity-70">ITEMS</span>
        </span>
      ),
    },
    {
      header: "المجموع",
      cell: (order) => (
        <span className="text-sm font-semibold text-foreground">
          ${order.total}
        </span>
      ),
    },
    {
      header: "الحالة",
      cell: (order) => (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`${ORDER_STATUS_COLOR[order.status]} text-[10px] font-medium`}
          >
            {ORDER_STATUS_LABEL[order.status]}
          </Badge>
        </div>
      ),
    },
    {
      header: "الإجراءات",
      headerClassName: "px-6",
      className: "px-6",
      cell: () => (
        <div className="flex justify-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const isTrulyEmpty = initialOrders.length === 0
  const hasNoMatches = !isTrulyEmpty && filteredOrders.length === 0

  return (
    <DataTablePage
      title="إدارة الطلبات"
      searchPlaceholder="البحث عن الطلبات..."
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      filters={
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as "all" | OrderStatus)
          }
        >
          <SelectTrigger className="w-[150px] bg-background/50 border-muted">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status}>
                {ORDER_STATUS_LABEL[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      {isTrulyEmpty ? (
        <EmptyState
          icon={ShoppingCart}
          title="لا توجد طلبات بعد"
          description="ستظهر طلبات العملاء هنا بمجرد استلامها"
        />
      ) : hasNoMatches ? (
        <EmptyState
          icon={Search}
          title="لا توجد نتائج"
          description="لا توجد طلبات تطابق البحث أو الفلتر الحالي"
        />
      ) : (
        <DataTable columns={columns} data={filteredOrders} />
      )}
    </DataTablePage>
  )
}
