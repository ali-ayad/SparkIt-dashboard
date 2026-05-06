import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProfitChart } from "@/features/dashboard/profit-chart"
import { GovernorateChart } from "@/features/dashboard/governorate-chart"
import type {
  DashboardStats,
  GovernorateOrders,
  MonthlyProfit,
  RecentOrder,
  TopProduct,
} from "@/lib/types"

interface DashboardViewProps {
  stats: DashboardStats
  recentOrders: RecentOrder[]
  topProducts: TopProduct[]
  monthlyProfit: MonthlyProfit[]
  governorateOrders: GovernorateOrders[]
}

const statusBadge = (status: RecentOrder["status"]) => {
  switch (status) {
    case "pending":
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30"
        >
          قيد الانتظار
        </Badge>
      )
    case "processing":
      return (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-800 dark:bg-blue-950/30"
        >
          قيد المعالجة
        </Badge>
      )
    case "completed":
      return (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 dark:bg-green-950/30"
        >
          مكتمل
        </Badge>
      )
  }
}

export function DashboardView({
  stats,
  recentOrders,
  topProducts,
  monthlyProfit,
  governorateOrders,
}: DashboardViewProps) {
  const cards = [
    {
      title: "إجمالي الإيرادات",
      value: `$${stats.totalRevenue.toLocaleString("en-US")}`,
      change: "+20.1%",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: "إجمالي الطلبات",
      value: stats.totalOrders.toLocaleString("en-US"),
      change: "+12.5%",
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "إجمالي المنتجات",
      value: stats.totalProducts.toLocaleString("en-US"),
      change: "+3.2%",
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "العملاء النشطون",
      value: stats.activeCustomers.toLocaleString("en-US"),
      change: "+15.3%",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">نظرة عامة</h1>
          <p className="text-muted-foreground mt-1">راقب أداء متجرك</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <TrendingUp className="h-4 w-4" />
          عرض التقرير
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs font-medium text-emerald-600">
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    من الشهر الماضي
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfitChart data={monthlyProfit} />
        </div>
        <GovernorateChart data={governorateOrders} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>الطلبات الأخيرة</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              عرض الكل
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.time}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-sm font-semibold">${order.amount}</p>
                    {statusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>المنتجات الأكثر مبيعاً</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              عرض الكل
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sold} مباع
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-semibold">
                      ${product.revenue.toLocaleString("en-US")}
                    </p>
                    <p className="text-xs text-emerald-600 font-medium">
                      {product.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
            >
              <Package className="h-6 w-6" />
              <span>إضافة منتج</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>عرض الطلبات</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex-col gap-2 bg-transparent"
            >
              <Users className="h-6 w-6" />
              <span>إدارة العملاء</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
