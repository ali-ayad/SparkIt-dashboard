
import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Category } from "@/lib/types"

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (category: Category) => void
  category?: Category | null
}

export function CategoryModal({ isOpen, onClose, onSave, category }: CategoryModalProps) {
  const { language } = useLanguage()
  const t = adminTranslations[language].categoriesManagement

  const [formData, setFormData] = useState<Category>({
    name: "",
    nameAr: "",
    description: "",
    descriptionAr: "",
    image: "",
    status: "active",
    productsCount: 0,
  })

  useEffect(() => {
    if (category) {
      setFormData(category)
    } else {
      setFormData({
        name: "",
        nameAr: "",
        description: "",
        descriptionAr: "",
        image: "",
        status: "active",
        productsCount: 0,
      })
    }
  }, [category, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{category ? t.editCategory : t.addCategory}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nameEn">{t.nameEn}</Label>
              <Input
                id="nameEn"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameAr">{t.nameAr}</Label>
              <Input
                id="nameAr"
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                required
                dir="rtl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptionEn">{t.descriptionEn}</Label>
            <Textarea
              id="descriptionEn"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptionAr">{t.descriptionAr}</Label>
            <Textarea
              id="descriptionAr"
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">{t.status}</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{t.active}</SelectItem>
                <SelectItem value="inactive">{t.inactive}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">{t.imageUrl}</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.png"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t.cancel}
            </Button>
            <Button type="submit">{t.save}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
