"use client"

import { useState } from "react"
import { ScrollText, Search } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
  LOG_ACTION_COLOR,
  LOG_ACTION_LABEL,
  LOG_RESOURCE_LABEL,
} from "@/lib/constants"
import type { LogAction, LogEntry, LogResource } from "@/lib/types"

interface LogsViewProps {
  initialLogs: LogEntry[]
}

const ACTIONS: LogAction[] = [
  "create",
  "update",
  "delete",
  "login",
  "logout",
]
const RESOURCES: LogResource[] = [
  "product",
  "category",
  "order",
  "customer",
  "user",
  "auth",
]

const formatTimestamp = (iso: string) => {
  const date = new Date(iso)
  return date.toLocaleString("ar-EG", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export function LogsView({ initialLogs }: LogsViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState<"all" | LogAction>("all")
  const [resourceFilter, setResourceFilter] = useState<"all" | LogResource>(
    "all",
  )

  const filteredLogs = initialLogs.filter((log) => {
    const matchesSearch =
      log.actor.includes(searchQuery) ||
      log.description.includes(searchQuery)
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesResource =
      resourceFilter === "all" || log.resource === resourceFilter
    return matchesSearch && matchesAction && matchesResource
  })

  const columns: Column<LogEntry>[] = [
    {
      header: "الوقت",
      className: "px-6",
      headerClassName: "px-6",
      cell: (log) => (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatTimestamp(log.timestamp)}
        </span>
      ),
    },
    {
      header: "المستخدم",
      cell: (log) => (
        <div className="flex items-center justify-center gap-2">
          <Avatar className="h-7 w-7 border border-muted-foreground/10 bg-muted/20">
            <AvatarFallback className="bg-transparent text-primary text-[9px] font-bold uppercase">
              {log.actor
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground">
            {log.actor}
          </span>
        </div>
      ),
    },
    {
      header: "الإجراء",
      cell: (log) => (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`${LOG_ACTION_COLOR[log.action]} text-[10px] font-medium`}
          >
            {LOG_ACTION_LABEL[log.action]}
          </Badge>
        </div>
      ),
    },
    {
      header: "النوع",
      cell: (log) => (
        <span className="text-xs font-medium text-muted-foreground">
          {LOG_RESOURCE_LABEL[log.resource]}
          {log.resourceId && (
            <span className="ml-1 text-[10px] opacity-70">
              #{log.resourceId}
            </span>
          )}
        </span>
      ),
    },
    {
      header: "التفاصيل",
      className: "px-6 text-right",
      headerClassName: "px-6",
      cell: (log) => (
        <span className="text-xs text-foreground">{log.description}</span>
      ),
    },
  ]

  const isTrulyEmpty = initialLogs.length === 0
  const hasNoMatches = !isTrulyEmpty && filteredLogs.length === 0

  return (
    <DataTablePage
      title="سجل النشاط"
      searchPlaceholder="البحث في السجل..."
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      filters={
        <>
          <Select
            value={actionFilter}
            onValueChange={(value) =>
              setActionFilter(value as "all" | LogAction)
            }
          >
            <SelectTrigger className="w-[140px] bg-background/50 border-muted">
              <SelectValue placeholder="الإجراء" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الإجراءات</SelectItem>
              {ACTIONS.map((action) => (
                <SelectItem key={action} value={action}>
                  {LOG_ACTION_LABEL[action]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={resourceFilter}
            onValueChange={(value) =>
              setResourceFilter(value as "all" | LogResource)
            }
          >
            <SelectTrigger className="w-[140px] bg-background/50 border-muted">
              <SelectValue placeholder="النوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الأنواع</SelectItem>
              {RESOURCES.map((resource) => (
                <SelectItem key={resource} value={resource}>
                  {LOG_RESOURCE_LABEL[resource]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      }
    >
      {isTrulyEmpty ? (
        <EmptyState
          icon={ScrollText}
          title="لا يوجد نشاط بعد"
          description="ستظهر إجراءات المستخدمين على لوحة التحكم هنا"
        />
      ) : hasNoMatches ? (
        <EmptyState
          icon={Search}
          title="لا توجد نتائج"
          description="لا توجد سجلات تطابق البحث أو الفلاتر الحالية"
        />
      ) : (
        <DataTable columns={columns} data={filteredLogs} />
      )}
    </DataTablePage>
  )
}
