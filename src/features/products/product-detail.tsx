"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Edit,
  Layers,
  type LucideIcon,
  Package,
  Percent,
  Tag,
  Trash2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductModal } from "@/features/products/product-modal"
import { useConfirm } from "@/components/confirm-dialog"
import { deleteProduct, updateProduct } from "@/services/products"
import { ROUTES } from "@/lib/constants"
import type { Product } from "@/lib/types"

interface ProductDetailProps {
  initialProduct: Product
}

export function ProductDetail({ initialProduct }: ProductDetailProps) {
  const confirm = useConfirm()
  const router = useRouter()
  const [product, setProduct] = useState<Product>(initialProduct)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSave = async (input: Product) => {
    if (!product.id) return
    const id = product.id
    const previous = product
    const optimistic: Product = { ...input, id }
    setProduct(optimistic)
    try {
      const updated = await updateProduct(id, input)
      setProduct(updated)
    } catch {
      setProduct(previous)
    }
  }

  const handleDelete = async () => {
    if (!product.id) return
    const ok = await confirm({
      title: "حذف المنتج",
      description:
        "هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.",
      confirmLabel: "حذف",
      variant: "destructive",
    })
    if (!ok) return
    try {
      await deleteProduct(product.id)
      router.push(ROUTES.products)
    } catch {
      /* stay on page on failure */
    }
  }

  const discountedPrice =
    product.hasDiscount && product.discountPercentage
      ? Math.round(product.price * (1 - product.discountPercentage / 100))
      : null

  return (
    <>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link href={ROUTES.products} aria-label="العودة للمنتجات">
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <p className="text-xs text-muted-foreground">
                المنتجات / تفاصيل المنتج
              </p>
              <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {product.name}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <Edit className="h-4 w-4" />
              تعديل
            </Button>
            <Button
              variant="outline"
              onClick={handleDelete}
              className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              حذف
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,420px)_1fr]">
          {/* Image */}
          <Card className="self-start overflow-hidden p-0 shadow-xl ring-1 ring-border/50">
            <div className="relative aspect-square bg-muted/20">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
              />
              {product.hasDiscount && product.discountPercentage ? (
                <Badge className="absolute top-3 start-3 bg-destructive text-destructive-foreground shadow">
                  -{product.discountPercentage}%
                </Badge>
              ) : null}
            </div>
          </Card>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className={
                  product.status === "in-stock"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/50"
                    : ""
                }
              >
                {product.status === "in-stock" ? "متوفر" : "غير متوفر"}
              </Badge>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                ID: #{product.id}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="ring-1 ring-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    السعر
                  </CardTitle>
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Tag className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  {discountedPrice !== null ? (
                    <>
                      <div className="text-2xl font-bold text-foreground">
                        ${discountedPrice}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground line-through">
                        ${product.price}
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-foreground">
                      ${product.price}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="ring-1 ring-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    المخزون
                  </CardTitle>
                  <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950/30">
                    <Package className="h-4 w-4 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className={`text-2xl font-bold ${
                      product.stock < 10
                        ? "text-destructive"
                        : "text-foreground"
                    }`}
                  >
                    {product.stock}{" "}
                    <span className="text-sm font-medium text-muted-foreground">
                      وحدة
                    </span>
                  </div>
                  {product.stock > 0 && product.stock < 10 && (
                    <div className="mt-1 text-xs text-destructive">
                      مخزون منخفض
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="mt-1 text-xs text-destructive">
                      نفذ المخزون
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="ring-1 ring-border/50">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  التفاصيل
                </CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-border/60 p-0">
                <DetailRow
                  icon={Layers}
                  label="الفئة"
                  value={product.category}
                />
                <DetailRow
                  icon={Percent}
                  label="الخصم"
                  value={
                    product.hasDiscount && product.discountPercentage
                      ? `${product.discountPercentage}%`
                      : "لا يوجد"
                  }
                />
                <DetailRow
                  icon={Package}
                  label="الحالة"
                  value={
                    product.status === "in-stock" ? "متوفر" : "غير متوفر"
                  }
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        product={product}
      />
    </>
  )
}

interface DetailRowProps {
  icon: LucideIcon
  label: string
  value: string
}

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  )
}
