"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import type { MonthlyProfit } from "@/lib/types"

interface ProfitChartProps {
  data: MonthlyProfit[]
}

const chartConfig = {
  profit: {
    label: "الربح",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ProfitChart({ data }: ProfitChartProps) {
  const total = data.reduce((sum, item) => sum + item.profit, 0)

  const last = data[data.length - 1]?.profit ?? 0
  const previous = data[data.length - 2]?.profit ?? 0
  const trendPct =
    previous > 0 ? ((last - previous) / previous) * 100 : 0
  const trendUp = trendPct >= 0

  return (
    <Card className="ring-1 ring-border/50 shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            الأرباح الشهرية
          </CardTitle>
          <CardDescription className="text-xs">
            مجموع الأرباح خلال آخر 12 شهراً
          </CardDescription>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            ${total.toLocaleString("en-US")}
          </div>
          <div
            className={`mt-1 flex items-center justify-end gap-1 text-xs font-medium ${trendUp ? "text-emerald-600" : "text-destructive"}`}
          >
            <TrendingUp
              className={`h-3 w-3 ${trendUp ? "" : "rotate-180"}`}
            />
            <span>
              {trendUp ? "+" : ""}
              {trendPct.toFixed(1)}% عن الشهر السابق
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-profit)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-profit)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={48}
              tickFormatter={(value: number) => `$${value / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toLocaleString("en-US")}`}
                  indicator="line"
                />
              }
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="var(--color-profit)"
              strokeWidth={2}
              fill="url(#profitGradient)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
