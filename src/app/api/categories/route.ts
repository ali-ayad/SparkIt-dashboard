import { NextResponse } from "next/server"
import { createCategory, getCategories } from "@/services/categories"
import type { Category } from "@/lib/types"

export async function GET() {
  const categories = await getCategories()
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const body = (await request.json()) as Omit<Category, "id">
  const created = await createCategory(body)
  return NextResponse.json(created, { status: 201 })
}
