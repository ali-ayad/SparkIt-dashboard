"use client"

import { useState } from "react"
import { Edit, Eye, Search, Trash2, Users } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DataTable,
  type Column,
} from "@/components/admin/data-table"
import { DataTablePage } from "@/components/admin/data-table-page"
import { EmptyState } from "@/components/admin/empty-state"
import type { Customer } from "@/lib/types"

interface CustomersViewProps {
  initialCustomers: Customer[]
}

export function CustomersView({ initialCustomers }: CustomersViewProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCustomers = initialCustomers.filter(
    (customer) =>
      customer.name.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const columns: Column<Customer>[] = [
    {
      header: "العميل",
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
          <div className="flex flex-col text-right leading-none gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              {customer.name}
            </span>
            <span className="text-[10px] text-muted-foreground">
              ID: #{customer.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "البريد الإلكتروني",
      cell: (customer) => (
        <span className="text-xs text-muted-foreground">{customer.email}</span>
      ),
    },
    {
      header: "الطلبات",
      cell: (customer) => (
        <span className="text-sm font-medium text-foreground">
          {customer.orders}{" "}
          <span className="text-[10px] text-muted-foreground ml-0.5">
            ORDERS
          </span>
        </span>
      ),
    },
    {
      header: "إجمالي الإنفاق",
      cell: (customer) => (
        <span className="text-sm font-semibold text-foreground">
          ${customer.spent.toLocaleString("en-US")}
        </span>
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

  const isTrulyEmpty = initialCustomers.length === 0
  const hasNoMatches = !isTrulyEmpty && filteredCustomers.length === 0

  return (
    <DataTablePage
      title="العملاء"
      searchPlaceholder="البحث عن العملاء..."
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {isTrulyEmpty ? (
        <EmptyState
          icon={Users}
          title="لا يوجد عملاء بعد"
          description="سيظهر عملاؤك هنا عندما يبدأون التسوق"
        />
      ) : hasNoMatches ? (
        <EmptyState
          icon={Search}
          title="لا توجد نتائج"
          description={`لم نجد عملاء مطابقين لـ "${searchQuery}"`}
        />
      ) : (
        <DataTable columns={columns} data={filteredCustomers} />
      )}
    </DataTablePage>
  )
}
