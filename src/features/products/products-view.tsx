"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Edit, Eye, LayoutGrid, List, Package, Search, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DataTable,
  type Column,
} from "@/components/admin/data-table"
import { DataTablePage } from "@/components/admin/data-table-page"
import { EmptyState } from "@/components/admin/empty-state"
import { ProductModal } from "@/features/products/product-modal"
import { ProductsGrid } from "@/features/products/products-grid"
import { useConfirm } from "@/components/confirm-dialog"
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/services/products"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/lib/constants"
import type { Product } from "@/lib/types"

type ViewMode = "list" | "grid"

interface ProductsViewProps {
  initialProducts: Product[]
}

export function ProductsView({ initialProducts }: ProductsViewProps) {
  const confirm = useConfirm()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((product) =>
    product.name.includes(searchQuery),
  )

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = async (id: number) => {
    const ok = await confirm({
      title: "حذف المنتج",
      description: "هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.",
      confirmLabel: "حذف",
      variant: "destructive",
    })
    if (!ok) return
    const previous = products
    setProducts((prev) => prev.filter((p) => p.id !== id))
    try {
      await deleteProduct(id)
    } catch {
      setProducts(previous)
    }
  }

  const handleSaveProduct = async (input: Product) => {
    if (editingProduct?.id) {
      const id = editingProduct.id
      const previous = products
      const optimistic: Product = { ...input, id }
      setProducts((prev) => prev.map((p) => (p.id === id ? optimistic : p)))
      try {
        const updated = await updateProduct(id, input)
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)))
      } catch {
        setProducts(previous)
      }
    } else {
      const tempId = -Date.now()
      const previous = products
      const optimistic: Product = { ...input, id: tempId }
      setProducts((prev) => [...prev, optimistic])
      try {
        const created = await createProduct(input)
        setProducts((prev) =>
          prev.map((p) => (p.id === tempId ? created : p)),
        )
      } catch {
        setProducts(previous)
      }
    }
  }

  const columns: Column<Product>[] = [
    {
      header: "المنتج",
      className: "px-6",
      headerClassName: "px-6",
      cell: (product) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-muted bg-muted/20">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-foreground leading-tight">
              {product.name}
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5 tracking-tight font-medium uppercase">
              ID: #{product.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "الفئة",
      cell: (product) => (
        <span className="text-xs font-medium text-muted-foreground">
          {product.category}
        </span>
      ),
    },
    {
      header: "السعر",
      cell: (product) => (
        <span className="text-sm font-semibold text-foreground">
          ${product.price}
        </span>
      ),
    },
    {
      header: "المخزون",
      cell: (product) => (
        <span
          className={`text-sm font-medium ${product.stock < 10 ? "text-destructive" : "text-foreground"}`}
        >
          {product.stock}{" "}
          <span className="text-[10px] text-muted-foreground ml-0.5">
            UNITS
          </span>
        </span>
      ),
    },
    {
      header: "الحالة",
      cell: (product) => (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={
              product.status === "in-stock"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/50 text-[10px] font-medium"
                : "text-[10px] font-medium"
            }
          >
            {product.status === "in-stock" ? "متوفر" : "غير متوفر"}
          </Badge>
        </div>
      ),
    },
    {
      header: "الإجراءات",
      headerClassName: "px-6",
      className: "px-6",
      cell: (product) => (
        <div className="flex justify-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Link
              href={`${ROUTES.products}/${product.id}`}
              aria-label="عرض التفاصيل"
            >
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEditProduct(product)}
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => product.id && handleDeleteProduct(product.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const isTrulyEmpty = products.length === 0
  const hasNoMatches = !isTrulyEmpty && filteredProducts.length === 0

  return (
    <>
      <DataTablePage
        title="إدارة المنتجات"
        addButtonText="إضافة منتج"
        onAddClick={handleAddProduct}
        searchPlaceholder="البحث عن المنتجات..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={
          <div className="flex items-center gap-1 rounded-md border bg-background/60 p-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              aria-label="عرض كقائمة"
              aria-pressed={viewMode === "list"}
              className={cn(
                "h-8 w-8",
                viewMode === "list" && "bg-primary/10 text-primary",
              )}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="عرض كشبكة"
              aria-pressed={viewMode === "grid"}
              className={cn(
                "h-8 w-8",
                viewMode === "grid" && "bg-primary/10 text-primary",
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        }
      >
        {isTrulyEmpty ? (
          <EmptyState
            icon={Package}
            title="لا توجد منتجات بعد"
            description="ابدأ ببناء كتالوجك بإضافة أول منتج"
            action={{ label: "إضافة منتج", onClick: handleAddProduct, icon: Package }}
          />
        ) : hasNoMatches ? (
          <EmptyState
            icon={Search}
            title="لا توجد نتائج"
            description={`لم نجد منتجات مطابقة لـ "${searchQuery}"`}
          />
        ) : viewMode === "grid" ? (
          <ProductsGrid
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ) : (
          <DataTable columns={columns} data={filteredProducts} />
        )}
      </DataTablePage>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </>
  )
}
