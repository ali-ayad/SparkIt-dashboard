import { NextResponse } from "next/server"
import { getOrder } from "@/services/orders"

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const order = await getOrder(id)
  if (!order) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(order)
}
