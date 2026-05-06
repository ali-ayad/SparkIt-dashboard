"use client"

import { type ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

export interface Column<T> {
  header: ReactNode
  accessorKey?: keyof T
  cell?: (row: T) => ReactNode
  className?: string
  headerClassName?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: ReactNode
  onRowClick?: (row: T) => void
  rowClassName?: string
}

export function DataTable<T extends { id?: string | number }>({
  columns,
  data,
  emptyMessage = "لا توجد بيانات.",
  onRowClick,
  rowClassName,
}: DataTableProps<T>) {
  return (
    <Card className="overflow-hidden border-none shadow-xl bg-card ring-1 ring-border/50">
      <CardContent className="p-0 overflow-x-auto">
        <div className="w-full min-w-[800px]">
          <Table>
            <TableHeader className="bg-muted/40 border-b">
              <TableRow className="hover:bg-transparent border-none">
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={cn(
                      "font-semibold text-[11px] uppercase tracking-wider text-muted-foreground py-3 text-center",
                      column.headerClassName,
                    )}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <TableRow
                    key={row.id ?? rowIndex}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "group transition-all duration-200 border-b last:border-0",
                      onRowClick && "cursor-pointer",
                      rowClassName,
                    )}
                  >
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={colIndex}
                        className={cn("py-3 text-center", column.className)}
                      >
                        {column.cell
                          ? column.cell(row)
                          : column.accessorKey
                            ? (row[column.accessorKey] as ReactNode)
                            : null}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-48 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
