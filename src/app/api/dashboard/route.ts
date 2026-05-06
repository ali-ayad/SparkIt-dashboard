import { NextResponse } from "next/server"
import {
  getDashboardStats,
  getRecentOrders,
  getTopProducts,
} from "@/services/dashboard"

export async function GET() {
  const [stats, recentOrders, topProducts] = await Promise.all([
    getDashboardStats(),
    getRecentOrders(),
    getTopProducts(),
  ])
  return NextResponse.json({ stats, recentOrders, topProducts })
}
