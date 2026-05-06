import type { Category } from "@/lib/types"

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "الهواتف الذكية",
    description: "أحدث أجهزة الهاتف المحمول وإكسسواراتها",
    image: "/modern-smartphone.png",
    status: "active",
    productsCount: 45,
  },
  {
    id: 2,
    name: "أجهزة الكمبيوتر",
    description: "أجهزة كمبيوتر قوية للعمل والترفيه",
    image: "/modern-laptop-workspace.png",
    status: "active",
    productsCount: 23,
  },
  {
    id: 3,
    name: "الصوت",
    description: "أنظمة صوتية وسماعات رأس فاخرة",
    image: "/wireless-earbuds-charging-case.png",
    status: "active",
    productsCount: 12,
  },
]
