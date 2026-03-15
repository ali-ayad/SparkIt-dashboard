import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"
import { ProductModal } from "@/components/admin/ProductModal"
import { DataTablePage } from "@/components/admin/DataTablePage"
import { DataTable, type Column } from "@/components/admin/DataTable"
import type { Product } from "@/lib/types"

const initialProducts: Product[] = [
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
    hasDiscount: true,
    discountPercentage: 15,
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
    hasDiscount: false,
    discountPercentage: 0,
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
    hasDiscount: false,
    discountPercentage: 0,
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
    hasDiscount: false,
    discountPercentage: 0,
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
    hasDiscount: true,
    discountPercentage: 10,
  },
]

export default function ProductsPage() {
  const { language } = useLanguage()
  const t = adminTranslations[language].productsManagement
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((product) =>
    language === "en"
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : product.nameAr.includes(searchQuery),
  )

  const handleAddProduct = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm(language === "en" ? "Are you sure you want to delete this product?" : "هل أنت متأكد من حذف هذا المنتج؟")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...product, id: p.id } : p)))
    } else {
      const newProduct = {
        ...product,
        id: Math.max(0, ...products.map((p) => p.id || 0)) + 1,
      }
      setProducts([...products, newProduct])
    }
  }

  const columns: Column<Product>[] = [
    {
      header: language === "en" ? "Product" : "المنتج",
      className: "px-6",
      headerClassName: "px-6",
      cell: (product) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-muted bg-muted/20">
            <img
              src={product.image || "/placeholder.svg"}
              alt={language === "en" ? product.name : product.nameAr}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-foreground leading-tight">
              {language === "en" ? product.name : product.nameAr}
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5 tracking-tight font-medium uppercase">ID: #{product.id}</span>
          </div>
        </div>
      ),
    },
    {
      header: t.category,
      cell: (product) => (
        <span className="text-xs font-medium text-muted-foreground">
          {language === "en" ? product.category : product.categoryAr}
        </span>
      ),
    },
    {
      header: t.price,
      cell: (product) => <span className="text-sm font-semibold text-foreground">${product.price}</span>,
    },
    {
      header: t.stock,
      cell: (product) => (
        <span className={`text-sm font-medium ${product.stock < 10 ? "text-destructive" : "text-foreground"}`}>
          {product.stock} <span className="text-[10px] text-muted-foreground ml-0.5">UNITS</span>
        </span>
      ),
    },
    {
      header: t.status,
      cell: (product) => (
        <div className="flex justify-center">
          <Badge 
            variant="outline"
            className={product.status === "in-stock" 
              ? "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/50 text-[10px] font-medium" 
              : "text-[10px] font-medium"}
          >
            {product.status === "in-stock" ? t.inStock : t.outOfStock}
          </Badge>
        </div>
      ),
    },
    {
      header: t.actions,
      headerClassName: "px-6",
      className: "px-6",
      cell: (product) => (
        <div className="flex justify-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)} className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => product.id && handleDeleteProduct(product.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <DataTablePage
        title={t.title}
        addButtonText={t.addProduct}
        onAddClick={handleAddProduct}
        searchPlaceholder={t.searchPlaceholder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        <DataTable
          columns={columns}
          data={filteredProducts}
          emptyMessage={language === "en" ? "No products found." : "لا توجد منتجات."}
        />
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
