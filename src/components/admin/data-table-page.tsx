"use client"

import { type ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

interface DataTablePageProps {
  title: string
  addButtonText?: string
  onAddClick?: () => void
  searchPlaceholder?: string
  searchQuery: string
  onSearchChange: (value: string) => void
  filters?: ReactNode
  children: ReactNode
}

export function DataTablePage({
  title,
  addButtonText,
  onAddClick,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  filters,
  children,
}: DataTablePageProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {title}
          </h1>
        </div>
        {onAddClick && (
          <Button
            className="gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300"
            onClick={onAddClick}
          >
            <Plus className="h-4 w-4" />
            {addButtonText}
          </Button>
        )}
      </div>

      <Card className="border-none shadow-md bg-card/40 backdrop-blur-md ring-1 ring-border/50">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="ps-9 bg-background/40 border-muted-foreground/20 focus-visible:ring-primary/30 h-10 transition-all duration-300"
              />
            </div>
            {filters && <div className="flex items-center gap-2">{filters}</div>}
          </div>
        </CardContent>
      </Card>

      {children}
    </div>
  )
}
