import { NextResponse } from "next/server"
import { getCustomers } from "@/services/customers"

export async function GET() {
  const customers = await getCustomers()
  return NextResponse.json(customers)
}
