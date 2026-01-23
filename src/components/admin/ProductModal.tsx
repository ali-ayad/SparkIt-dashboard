
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { Product } from "@/lib/types"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
  product?: Product | null
}

export function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const { language } = useLanguage()
  const t = adminTranslations[language].productsManagement

  const [formData, setFormData] = useState<Product>({
    name: "",
    nameAr: "",
    category: "",
    categoryAr: "",
    price: 0,
    stock: 0,
    status: "in-stock",
    image: "",
    hasDiscount: false,
    discountPercentage: 0,
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      setFormData({
        name: "",
        nameAr: "",
        category: "",
        categoryAr: "",
        price: 0,
        stock: 0,
        status: "in-stock",
        image: "",
        hasDiscount: false,
        discountPercentage: 0,
      })
    }
  }, [product, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{product ? t.editProduct : t.addProduct}</DialogTitle>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoryEn">{t.categoryEn}</Label>
              <Input
                id="categoryEn"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryAr">{t.categoryAr}</Label>
              <Input
                id="categoryAr"
                value={formData.categoryAr}
                onChange={(e) => setFormData({ ...formData, categoryAr: e.target.value })}
                required
                dir="rtl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">{t.price}</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">{t.stock}</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">{t.status}</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "in-stock" | "out-of-stock") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">{t.inStock}</SelectItem>
                <SelectItem value="out-of-stock">{t.outOfStock}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 rounded-lg border p-4 bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="hasDiscount">{t.hasDiscount}</Label>
              </div>
              <Switch
                id="hasDiscount"
                checked={formData.hasDiscount}
                onCheckedChange={(checked: boolean) => setFormData({ ...formData, hasDiscount: checked })}
              />
            </div>
            
            {formData.hasDiscount && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="discountPercentage">{t.discountPercentage}</Label>
                <div className="relative">
                  <Input
                    id="discountPercentage"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">%</span>
                </div>
              </div>
            )}
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
