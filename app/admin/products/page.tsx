"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    nameAr: "آيفون 15 برو ماكس",
    category: "Smartphones",
    categoryAr: "الهواتف الذكية",
    price: 1199,
    stock: 45,
    status: "in-stock",
    image: "/modern-smartphone.png",
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    nameAr: "ماك بوك برو 16 بوصة",
    category: "Laptops",
    categoryAr: "أجهزة الكمبيوتر",
    price: 2499,
    stock: 23,
    status: "in-stock",
    image: "/modern-laptop-workspace.png",
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    nameAr: "إيربودز برو 2",
    category: "Audio",
    categoryAr: "الصوت",
    price: 249,
    stock: 120,
    status: "in-stock",
    image: "/wireless-earbuds-charging-case.png",
  },
  {
    id: 4,
    name: "Apple Watch Ultra",
    nameAr: "ساعة أبل الترا",
    category: "Wearables",
    categoryAr: "الأجهزة القابلة للارتداء",
    price: 799,
    stock: 0,
    status: "out-of-stock",
    image: "/modern-smartwatch.png",
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    nameAr: "آيباد برو 12.9 بوصة",
    category: "Tablets",
    categoryAr: "الأجهزة اللوحية",
    price: 1099,
    stock: 34,
    status: "in-stock",
    image: "/modern-tablet-display.png",
  },
]

export default function ProductsPage() {
  const { language } = useLanguage()
  const t = adminTranslations[language].productsManagement
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = mockProducts.filter((product) =>
    language === "en"
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : product.nameAr.includes(searchQuery),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t.addProduct}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "All Products" : "جميع المنتجات"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "en" ? "Product" : "المنتج"}</TableHead>
                  <TableHead>{t.category}</TableHead>
                  <TableHead>{t.price}</TableHead>
                  <TableHead>{t.stock}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead className="text-right">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={language === "en" ? product.name : product.nameAr}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span className="font-medium">{language === "en" ? product.name : product.nameAr}</span>
                      </div>
                    </TableCell>
                    <TableCell>{language === "en" ? product.category : product.categoryAr}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={product.status === "in-stock" ? "default" : "destructive"}>
                        {product.status === "in-stock" ? t.inStock : t.outOfStock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
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
