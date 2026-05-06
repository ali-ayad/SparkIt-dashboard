import { NextResponse } from "next/server"
import { createProduct, getProducts } from "@/services/products"
import type { Product } from "@/lib/types"

export async function GET() {
  const products = await getProducts()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = (await request.json()) as Omit<Product, "id">
  const created = await createProduct(body)
  return NextResponse.json(created, { status: 201 })
}
