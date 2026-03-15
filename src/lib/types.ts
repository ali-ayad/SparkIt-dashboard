
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

export interface Order {
  id: string
  customer: string
  customerAr: string
  date: string
  total: number
  status: "delivered" | "processing" | "shipped" | "pending" | "cancelled"
  items: number
}

export interface Customer {
  id: number
  name: string
  email: string
  orders: number
  spent: number
  image?: string
}
