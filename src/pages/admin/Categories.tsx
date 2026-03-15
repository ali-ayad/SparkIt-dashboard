import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye } from "lucide-react"
import { CategoryModal } from "@/components/admin/CategoryModal"
import { DataTablePage } from "@/components/admin/DataTablePage"
import { DataTable, type Column } from "@/components/admin/DataTable"
import type { Category } from "@/lib/types"

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Smartphones",
    nameAr: "الهواتف الذكية",
    description: "Latest mobile devices and accessories",
    descriptionAr: "أحدث أجهزة الهاتف المحمول وإكسسواراتها",
    image: "/modern-smartphone.png",
    status: "active",
    productsCount: 45,
  },
  {
    id: 2,
    name: "Laptops",
    nameAr: "أجهزة الكمبيوتر",
    description: "Powerful computing for work and play",
    descriptionAr: "أجهزة كمبيوتر قوية للعمل والترفيه",
    image: "/modern-laptop-workspace.png",
    status: "active",
    productsCount: 23,
  },
  {
    id: 3,
    name: "Audio",
    nameAr: "الصوت",
    description: "Premium sound systems and headphones",
    descriptionAr: "أنظمة صوتية وسماعات رأس فاخرة",
    image: "/wireless-earbuds-charging-case.png",
    status: "active",
    productsCount: 12,
  },
]

export default function CategoriesPage() {
  const { language } = useLanguage()
  const t = adminTranslations[language].categoriesManagement
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const filteredCategories = categories.filter((category) =>
    language === "en"
      ? category.name.toLowerCase().includes(searchQuery.toLowerCase())
      : category.nameAr.includes(searchQuery),
  )

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDeleteCategory = (id: number) => {
    if (confirm(language === "en" ? "Are you sure you want to delete this category?" : "هل أنت متأكد من حذف هذه الفئة؟")) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  const handleSaveCategory = (category: Category) => {
    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? { ...category, id: c.id } : c)))
    } else {
      const newCategory = {
        ...category,
        id: Math.max(0, ...categories.map((c) => c.id || 0)) + 1,
      }
      setCategories([...categories, newCategory])
    }
  }

  const columns: Column<Category>[] = [
    {
      header: language === "en" ? "Category" : "الفئة",
      className: "px-6",
      headerClassName: "px-6",
      cell: (category) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg border border-muted bg-muted/20">
            <img
              src={category.image || "/placeholder.svg"}
              alt={language === "en" ? category.name : category.nameAr}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-foreground leading-tight">
              {language === "en" ? category.name : category.nameAr}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: t.productsCount,
      cell: (category) => (
        <span className="text-sm font-medium text-foreground">
          {category.productsCount} <span className="text-[10px] text-muted-foreground ml-0.5">PRODUCTS</span>
        </span>
      ),
    },
    {
      header: t.status,
      cell: (category) => (
        <div className="flex justify-center">
          <Badge 
            variant="outline"
            className={category.status === "active" 
              ? "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/50 text-[10px] font-medium" 
              : "text-[10px] font-medium"}
          >
            {category.status === "active" ? t.active : t.inactive}
          </Badge>
        </div>
      ),
    },
    {
      header: t.actions,
      headerClassName: "px-6",
      className: "px-6",
      cell: (category) => (
        <div className="flex justify-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)} className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => category.id && handleDeleteCategory(category.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors">
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
        addButtonText={t.addCategory}
        onAddClick={handleAddCategory}
        searchPlaceholder={t.searchPlaceholder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        <DataTable
          columns={columns}
          data={filteredCategories}
          emptyMessage={language === "en" ? "No categories found." : "لا توجد فئات."}
        />
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
