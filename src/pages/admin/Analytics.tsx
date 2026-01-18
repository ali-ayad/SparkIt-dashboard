
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function AnalyticsPage() {
  const { language } = useLanguage()

  const metrics = [
    {
      title: language === "en" ? "Revenue Growth" : "نمو الإيرادات",
      value: "+12.5%",
      change: "+2.3%",
      trend: "up",
    },
    {
      title: language === "en" ? "Conversion Rate" : "معدل التحويل",
      value: "3.24%",
      change: "+0.8%",
      trend: "up",
    },
    {
      title: language === "en" ? "Average Order Value" : "متوسط قيمة الطلب",
      value: "$127.50",
      change: "-1.2%",
      trend: "down",
    },
    {
      title: language === "en" ? "Customer Retention" : "الاحتفاظ بالعملاء",
      value: "84.2%",
      change: "+5.1%",
      trend: "up",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{language === "en" ? "Analytics" : "التحليلات"}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div
                  className={`flex items-center gap-1 text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                >
                  {metric.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{language === "en" ? "Sales Overview" : "نظرة عامة على المبيعات"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            {language === "en" ? "Chart visualization would go here" : "سيتم عرض الرسم البياني هنا"}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

