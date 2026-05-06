import type {
  DashboardStats,
  GovernorateOrders,
  MonthlyProfit,
  RecentOrder,
  TopProduct,
} from "@/lib/types"

const stats: DashboardStats = {
  totalRevenue: 45231,
  totalOrders: 1234,
  totalProducts: 456,
  activeCustomers: 892,
}

const recentOrders: RecentOrder[] = [
  { id: "ORD-1234", customer: "أحمد حسن", amount: 1199, status: "pending", time: "منذ دقيقتين" },
  { id: "ORD-1233", customer: "سارة جونسون", amount: 2499, status: "processing", time: "منذ 15 دقيقة" },
  { id: "ORD-1232", customer: "محمد علي", amount: 449, status: "completed", time: "منذ ساعة" },
  { id: "ORD-1231", customer: "إيميلي تشين", amount: 799, status: "completed", time: "منذ ساعتين" },
]

const topProducts: TopProduct[] = [
  { name: "آيفون 15 برو ماكس", sold: 145, revenue: 173855, trend: "+12%" },
  { name: "ماك بوك برو 16 بوصة", sold: 89, revenue: 222411, trend: "+8%" },
  { name: "إيربودز برو 2", sold: 256, revenue: 63744, trend: "+24%" },
  { name: "آيباد برو 12.9 بوصة", sold: 67, revenue: 73633, trend: "+5%" },
]

const monthlyProfit: MonthlyProfit[] = [
  { month: "يناير", profit: 8400 },
  { month: "فبراير", profit: 9200 },
  { month: "مارس", profit: 7800 },
  { month: "أبريل", profit: 11400 },
  { month: "مايو", profit: 12800 },
  { month: "يونيو", profit: 10500 },
  { month: "يوليو", profit: 13900 },
  { month: "أغسطس", profit: 14200 },
  { month: "سبتمبر", profit: 12100 },
  { month: "أكتوبر", profit: 15600 },
  { month: "نوفمبر", profit: 17800 },
  { month: "ديسمبر", profit: 19400 },
]

const governorateOrders: GovernorateOrders[] = [
  { governorate: "الرياض", orders: 412 },
  { governorate: "جدة", orders: 318 },
  { governorate: "الدمام", orders: 187 },
  { governorate: "مكة", orders: 142 },
  { governorate: "المدينة", orders: 96 },
  { governorate: "تبوك", orders: 64 },
]

export async function getDashboardStats(): Promise<DashboardStats> {
  return stats
}

export async function getRecentOrders(): Promise<RecentOrder[]> {
  return recentOrders
}

export async function getTopProducts(): Promise<TopProduct[]> {
  return topProducts
}

export async function getMonthlyProfit(): Promise<MonthlyProfit[]> {
  return monthlyProfit
}

export async function getGovernorateOrders(): Promise<GovernorateOrders[]> {
  return governorateOrders
}
