export type ProductStatus = "in-stock" | "out-of-stock"
export type CategoryStatus = "active" | "inactive"
export type OrderStatus = "delivered" | "processing" | "shipped" | "pending" | "cancelled"

export interface Product {
  id?: number
  name: string
  category: string
  price: number
  stock: number
  status: ProductStatus
  image: string
  hasDiscount: boolean
  discountPercentage?: number
}

export interface Category {
  id?: number
  name: string
  description?: string
  image: string
  status: CategoryStatus
  productsCount: number
}

export interface Order {
  id: string
  customer: string
  date: string
  total: number
  status: OrderStatus
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

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  activeCustomers: number
}

export interface RecentOrder {
  id: string
  customer: string
  amount: number
  status: "pending" | "processing" | "completed"
  time: string
}

export interface TopProduct {
  name: string
  sold: number
  revenue: number
  trend: string
}

export interface MonthlyProfit {
  month: string
  profit: number
}

export interface GovernorateOrders {
  governorate: string
  orders: number
}

export type UserRole = "super-admin" | "admin" | "editor" | "viewer"
export type UserStatus = "active" | "inactive"

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  lastLogin?: string
  image?: string
}

export type LogAction = "create" | "update" | "delete" | "login" | "logout"
export type LogResource =
  | "product"
  | "category"
  | "order"
  | "customer"
  | "user"
  | "auth"

export interface LogEntry {
  id: number
  timestamp: string
  actor: string
  action: LogAction
  resource: LogResource
  resourceId?: string
  description: string
}
