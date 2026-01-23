
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CategoryModal } from "@/components/admin/CategoryModal"
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <Button className="gap-2" onClick={handleAddCategory}>
          <Plus className="h-4 w-4" />
          {t.addCategory}
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

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "All Categories" : "جميع الفئات"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === "en" ? "Category" : "الفئة"}</TableHead>
                  <TableHead>{t.productsCount}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead className="text-right">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={category.image || "/placeholder.svg"}
                          alt={language === "en" ? category.name : category.nameAr}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{language === "en" ? category.name : category.nameAr}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {language === "en" ? category.description : category.descriptionAr}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{category.productsCount}</TableCell>
                    <TableCell>
                      <Badge variant={category.status === "active" ? "default" : "destructive"}>
                        {category.status === "active" ? t.active : t.inactive}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => category.id && handleDeleteCategory(category.id)}>
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

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </div>
  )
}
