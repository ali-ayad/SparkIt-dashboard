import { NextResponse } from "next/server"
import { getOrders } from "@/services/orders"

export async function GET() {
  const orders = await getOrders()
  return NextResponse.json(orders)
}
