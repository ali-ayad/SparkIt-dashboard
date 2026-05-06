import type {
  LogAction,
  LogResource,
  OrderStatus,
  UserRole,
} from "@/lib/types"

export const ROUTES = {
  dashboard: "/dashboard",
  products: "/products",
  categories: "/categories",
  orders: "/orders",
  customers: "/customers",
  users: "/users",
  logs: "/logs",
  analytics: "/analytics",
  settings: "/settings",
} as const

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "قيد الانتظار",
  processing: "قيد المعالجة",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغى",
}

export const ORDER_STATUS_COLOR: Record<OrderStatus, string> = {
  pending:
    "bg-yellow-50 text-yellow-600 border-yellow-200/50 dark:bg-yellow-950/20 dark:border-yellow-900/50",
  processing:
    "bg-blue-50 text-blue-600 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-900/50",
  shipped:
    "bg-purple-50 text-purple-600 border-purple-200/50 dark:bg-purple-950/20 dark:border-purple-900/50",
  delivered:
    "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/50",
  cancelled:
    "bg-red-50 text-red-600 border-red-200/50 dark:bg-red-950/20 dark:border-red-900/50",
}

export const USER_ROLE_LABEL: Record<UserRole, string> = {
  "super-admin": "مسؤول رئيسي",
  admin: "مسؤول",
  editor: "محرر",
  viewer: "مشاهد",
}

export const USER_ROLE_COLOR: Record<UserRole, string> = {
  "super-admin":
    "bg-rose-50 text-rose-600 border-rose-200/50 dark:bg-rose-950/20 dark:border-rose-900/50",
  admin:
    "bg-blue-50 text-blue-600 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-900/50",
  editor:
    "bg-purple-50 text-purple-600 border-purple-200/50 dark:bg-purple-950/20 dark:border-purple-900/50",
  viewer:
    "bg-muted text-muted-foreground border-border",
}

export const LOG_ACTION_LABEL: Record<LogAction, string> = {
  create: "إنشاء",
  update: "تحديث",
  delete: "حذف",
  login: "تسجيل دخول",
  logout: "تسجيل خروج",
}

export const LOG_ACTION_COLOR: Record<LogAction, string> = {
  create:
    "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/50",
  update:
    "bg-blue-50 text-blue-600 border-blue-200/50 dark:bg-blue-950/20 dark:border-blue-900/50",
  delete:
    "bg-red-50 text-red-600 border-red-200/50 dark:bg-red-950/20 dark:border-red-900/50",
  login:
    "bg-muted text-muted-foreground border-border",
  logout:
    "bg-muted text-muted-foreground border-border",
}

export const LOG_RESOURCE_LABEL: Record<LogResource, string> = {
  product: "منتج",
  category: "فئة",
  order: "طلب",
  customer: "عميل",
  user: "مستخدم",
  auth: "مصادقة",
}
