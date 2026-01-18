"use client"

import { useLanguage } from "@/lib/language-context"
import { adminTranslations } from "@/lib/translations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  const { language } = useLanguage()
  const t = adminTranslations[language].dashboard

  const stats = [
    {
      title: t.totalRevenue,
      value: "$45,231",
      change: "+20.1%",
      changeLabel: language === "en" ? "from last month" : "من الشهر الماضي",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: t.totalOrders,
      value: "1,234",
      change: "+12.5%",
      changeLabel: language === "en" ? "from last month" : "من الشهر الماضي",
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: t.totalProducts,
      value: "456",
      change: "+3.2%",
      changeLabel: language === "en" ? "from last month" : "من الشهر الماضي",
      icon: Package,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: t.activeCustomers,
      value: "892",
      change: "+15.3%",
      changeLabel: language === "en" ? "from last month" : "من الشهر الماضي",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ]

  const recentOrders = [
    {
      id: "ORD-1234",
      customer: language === "en" ? "Ahmed Hassan" : "أحمد حسن",
      amount: 1199,
      status: "pending",
      time: language === "en" ? "2 min ago" : "منذ دقيقتين",
    },
    {
      id: "ORD-1233",
      customer: language === "en" ? "Sarah Johnson" : "سارة جونسون",
      amount: 2499,
      status: "processing",
      time: language === "en" ? "15 min ago" : "منذ 15 دقيقة",
    },
    {
      id: "ORD-1232",
      customer: language === "en" ? "Mohammed Ali" : "محمد علي",
      amount: 449,
      status: "completed",
      time: language === "en" ? "1 hour ago" : "منذ ساعة",
    },
    {
      id: "ORD-1231",
      customer: language === "en" ? "Emily Chen" : "إيميلي تشين",
      amount: 799,
      status: "completed",
      time: language === "en" ? "2 hours ago" : "منذ ساعتين",
    },
  ]

  const topProducts = [
    {
      name: language === "en" ? "iPhone 15 Pro Max" : "آيفون 15 برو ماكس",
      sold: 145,
      revenue: 173855,
      trend: "+12%",
    },
    {
      name: language === "en" ? 'MacBook Pro 16"' : "ماك بوك برو 16 بوصة",
      sold: 89,
      revenue: 222411,
      trend: "+8%",
    },
    {
      name: language === "en" ? "AirPods Pro 2" : "إيربودز برو 2",
      sold: 256,
      revenue: 63744,
      trend: "+24%",
    },
    {
      name: language === "en" ? 'iPad Pro 12.9"' : "آيباد برو 12.9 بوصة",
      sold: 67,
      revenue: 73633,
      trend: "+5%",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30">
            {language === "en" ? "Pending" : "قيد الانتظار"}
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-950/30">
            {language === "en" ? "Processing" : "قيد المعالجة"}
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-950/30">
            {language === "en" ? "Completed" : "مكتمل"}
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.overview}</h1>
          <p className="text-muted-foreground mt-1">
            {language === "en" ? "Monitor your store performance" : "راقب أداء متجرك"}
          </p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <TrendingUp className="h-4 w-4" />
          {language === "en" ? "View Report" : "عرض التقرير"}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
                  <span className="text-xs text-muted-foreground">{stat.changeLabel}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.recentOrders}</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              {language === "en" ? "View all" : "عرض الكل"}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-sm font-semibold">${order.amount}</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.topProducts}</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1">
              {language === "en" ? "View all" : "عرض الكل"}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {product.sold} {language === "en" ? "sold" : "مباع"}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-semibold">${product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-emerald-600 font-medium">{product.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Quick Actions" : "إجراءات سريعة"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Package className="h-6 w-6" />
              <span>{language === "en" ? "Add Product" : "إضافة منتج"}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <ShoppingCart className="h-6 w-6" />
              <span>{language === "en" ? "View Orders" : "عرض الطلبات"}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span>{language === "en" ? "Manage Customers" : "إدارة العملاء"}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
