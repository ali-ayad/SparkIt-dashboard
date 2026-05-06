import { NextResponse } from "next/server"
import {
  deleteCategory,
  getCategory,
  updateCategory,
} from "@/services/categories"
import type { Category } from "@/lib/types"

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const category = await getCategory(Number(id))
  if (!category) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(category)
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as Omit<Category, "id">
  const updated = await updateCategory(Number(id), body)
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params
  await deleteCategory(Number(id))
  return new NextResponse(null, { status: 204 })
}
