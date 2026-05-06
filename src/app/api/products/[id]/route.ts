import { NextResponse } from "next/server"
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "@/services/products"
import type { Product } from "@/lib/types"

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const product = await getProduct(Number(id))
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(product)
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as Omit<Product, "id">
  const updated = await updateProduct(Number(id), body)
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params
  await deleteProduct(Number(id))
  return new NextResponse(null, { status: 204 })
}
