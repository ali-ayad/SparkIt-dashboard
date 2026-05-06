import { mockProducts } from "@/data/products"
import type { Product } from "@/lib/types"

export async function getProducts(): Promise<Product[]> {
  return mockProducts
}

export async function getProduct(id: number): Promise<Product | null> {
  return mockProducts.find((p) => p.id === id) ?? null
}

export async function createProduct(input: Omit<Product, "id">): Promise<Product> {
  const id = Math.max(0, ...mockProducts.map((p) => p.id ?? 0)) + 1
  return { ...input, id }
}

export async function updateProduct(
  id: number,
  input: Omit<Product, "id">,
): Promise<Product> {
  return { ...input, id }
}

export async function deleteProduct(_id: number): Promise<void> {
  return
}
