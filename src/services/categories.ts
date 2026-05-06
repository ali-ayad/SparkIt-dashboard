import { mockCategories } from "@/data/categories"
import type { Category } from "@/lib/types"

export async function getCategories(): Promise<Category[]> {
  return mockCategories
}

export async function getCategory(id: number): Promise<Category | null> {
  return mockCategories.find((c) => c.id === id) ?? null
}

export async function createCategory(input: Omit<Category, "id">): Promise<Category> {
  const id = Math.max(0, ...mockCategories.map((c) => c.id ?? 0)) + 1
  return { ...input, id }
}

export async function updateCategory(
  id: number,
  input: Omit<Category, "id">,
): Promise<Category> {
  return { ...input, id }
}

export async function deleteCategory(_id: number): Promise<void> {
  return
}
