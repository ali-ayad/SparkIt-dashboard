
export interface Product {
  id?: number
  name: string
  nameAr: string
  category: string
  categoryAr: string
  price: number
  stock: number
  status: "in-stock" | "out-of-stock"
  image: string
  hasDiscount: boolean
  discountPercentage?: number
}

export interface Category {
  id?: number
  name: string
  nameAr: string
  description?: string
  descriptionAr?: string
  image: string
  status: "active" | "inactive"
  productsCount: number
}
