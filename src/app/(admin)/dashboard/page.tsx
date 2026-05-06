import {
  getDashboardStats,
  getGovernorateOrders,
  getMonthlyProfit,
  getRecentOrders,
  getTopProducts,
} from "@/services/dashboard"
import { DashboardView } from "@/features/dashboard/dashboard-view"

export default async function DashboardPage() {
  const [stats, recentOrders, topProducts, monthlyProfit, governorateOrders] =
    await Promise.all([
      getDashboardStats(),
      getRecentOrders(),
      getTopProducts(),
      getMonthlyProfit(),
      getGovernorateOrders(),
    ])

  return (
    <DashboardView
      stats={stats}
      recentOrders={recentOrders}
      topProducts={topProducts}
      monthlyProfit={monthlyProfit}
      governorateOrders={governorateOrders}
    />
  )
}
