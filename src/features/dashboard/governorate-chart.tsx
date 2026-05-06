"use client"

import { MapPin } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { GovernorateOrders } from "@/lib/types"

interface GovernorateChartProps {
  data: GovernorateOrders[]
}

const chartConfig = {
  orders: {
    label: "الطلبات",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function GovernorateChart({ data }: GovernorateChartProps) {
  const total = data.reduce((sum, item) => sum + item.orders, 0)
  const top = [...data].sort((a, b) => b.orders - a.orders)[0]

  return (
    <Card className="ring-1 ring-border/50 shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            الطلبات حسب المحافظة
          </CardTitle>
          <CardDescription className="text-xs">
            توزيع الطلبات على المحافظات
          </CardDescription>
        </div>
        <div className="rounded-lg bg-primary/10 p-2">
          <MapPin className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="governorate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={36}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              content={
                <ChartTooltipContent
                  formatter={(value) => `${Number(value).toLocaleString("en-US")} طلب`}
                  indicator="line"
                />
              }
            />
            <Bar
              dataKey="orders"
              fill="var(--color-orders)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>

        <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs">
          <div>
            <span className="text-muted-foreground">إجمالي الطلبات</span>
            <span className="ms-2 font-semibold text-foreground">
              {total.toLocaleString("en-US")}
            </span>
          </div>
          {top && (
            <div>
              <span className="text-muted-foreground">الأعلى</span>
              <span className="ms-2 font-semibold text-primary">
                {top.governorate}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
