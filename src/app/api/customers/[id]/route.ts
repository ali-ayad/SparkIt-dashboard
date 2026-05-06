import { NextResponse } from "next/server"
import { getCustomer } from "@/services/customers"

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const customer = await getCustomer(Number(id))
  if (!customer) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(customer)
}
