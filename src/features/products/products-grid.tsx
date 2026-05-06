"use client"

import Image from "next/image"
import Link from "next/link"
import { Edit, Eye, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants"
import type { Product } from "@/lib/types"

interface ProductsGridProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export function ProductsGrid({ products, onEdit, onDelete }: ProductsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden p-0 shadow-lg ring-1 ring-border/50 transition-all duration-300 hover:shadow-primary/10 hover:-translate-y-0.5"
        >
          <div className="relative aspect-square bg-muted/20">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {product.hasDiscount && product.discountPercentage ? (
              <Badge className="absolute top-2 start-2 bg-destructive text-destructive-foreground shadow">
                -{product.discountPercentage}%
              </Badge>
            ) : null}
            <Badge
              variant="outline"
              className={`absolute top-2 end-2 text-[10px] font-medium backdrop-blur ${
                product.status === "in-stock"
                  ? "bg-emerald-50/90 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/40 dark:border-emerald-900/50"
                  : "bg-card/90"
              }`}
            >
              {product.status === "in-stock" ? "متوفر" : "غير متوفر"}
            </Badge>
          </div>

          <CardContent className="space-y-3 p-4">
            <div className="space-y-1">
              <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground">{product.category}</p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-lg font-bold text-foreground">
                  ${product.price}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {product.stock} units
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5"
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
                  onClick={() => onEdit(product)}
                  className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => product.id && onDelete(product.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
