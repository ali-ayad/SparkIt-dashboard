"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, Eye, Layers, Search, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DataTable,
  type Column,
} from "@/components/admin/data-table"
import { DataTablePage } from "@/components/admin/data-table-page"
import { EmptyState } from "@/components/admin/empty-state"
import { CategoryModal } from "@/features/categories/category-modal"
import { useConfirm } from "@/components/confirm-dialog"
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/categories"
import type { Category } from "@/lib/types"

interface CategoriesViewProps {
  initialCategories: Category[]
}

export function CategoriesView({ initialCategories }: CategoriesViewProps) {
  const confirm = useConfirm()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const filteredCategories = categories.filter((category) =>
    category.name.includes(searchQuery),
  )

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDeleteCategory = async (id: number) => {
    const ok = await confirm({
      title: "حذف الفئة",
      description: "هل أنت متأكد من حذف هذه الفئة؟ لا يمكن التراجع عن هذا الإجراء.",
      confirmLabel: "حذف",
      variant: "destructive",
    })
    if (!ok) return
    const previous = categories
    setCategories((prev) => prev.filter((c) => c.id !== id))
    try {
      await deleteCategory(id)
    } catch {
      setCategories(previous)
    }
  }

  const handleSaveCategory = async (input: Category) => {
    if (editingCategory?.id) {
      const id = editingCategory.id
      const previous = categories
      const optimistic: Category = { ...input, id }
      setCategories((prev) => prev.map((c) => (c.id === id ? optimistic : c)))
      try {
        const updated = await updateCategory(id, input)
        setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)))
      } catch {
        setCategories(previous)
      }
    } else {
      const tempId = -Date.now()
      const previous = categories
      const optimistic: Category = { ...input, id: tempId }
      setCategories((prev) => [...prev, optimistic])
      try {
        const created = await createCategory(input)
        setCategories((prev) =>
          prev.map((c) => (c.id === tempId ? created : c)),
        )
      } catch {
        setCategories(previous)
      }
    }
  }

  const columns: Column<Category>[] = [
    {
      header: "الفئة",
      className: "px-6",
      headerClassName: "px-6",
      cell: (category) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-muted bg-muted/20">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-foreground leading-tight">
              {category.name}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "عدد المنتجات",
      cell: (category) => (
        <span className="text-sm font-medium text-foreground">
          {category.productsCount}{" "}
          <span className="text-[10px] text-muted-foreground ml-0.5">
            PRODUCTS
          </span>
        </span>
      ),
    },
    {
      header: "الحالة",
      cell: (category) => (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={
              category.status === "active"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/50 text-[10px] font-medium"
                : "text-[10px] font-medium"
            }
          >
            {category.status === "active" ? "نشط" : "غير نشط"}
          </Badge>
        </div>
      ),
    },
    {
      header: "الإجراءات",
      headerClassName: "px-6",
      className: "px-6",
      cell: (category) => (
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
            onClick={() => handleEditCategory(category)}
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => category.id && handleDeleteCategory(category.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const isTrulyEmpty = categories.length === 0
  const hasNoMatches = !isTrulyEmpty && filteredCategories.length === 0

  return (
    <>
      <DataTablePage
        title="إدارة الفئات"
        addButtonText="إضافة فئة"
        onAddClick={handleAddCategory}
        searchPlaceholder="البحث عن الفئات..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        {isTrulyEmpty ? (
          <EmptyState
            icon={Layers}
            title="لا توجد فئات بعد"
            description="نظّم منتجاتك بإنشاء أول فئة"
            action={{ label: "إضافة فئة", onClick: handleAddCategory, icon: Layers }}
          />
        ) : hasNoMatches ? (
          <EmptyState
            icon={Search}
            title="لا توجد نتائج"
            description={`لم نجد فئات مطابقة لـ "${searchQuery}"`}
          />
        ) : (
          <DataTable columns={columns} data={filteredCategories} />
        )}
      </DataTablePage>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </>
  )
}
