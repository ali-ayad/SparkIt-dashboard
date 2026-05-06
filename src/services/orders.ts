import { mockOrders } from "@/data/orders"
import type { Order } from "@/lib/types"

export async function getOrders(): Promise<Order[]> {
  return mockOrders
}

export async function getOrder(id: string): Promise<Order | null> {
  return mockOrders.find((o) => o.id === id) ?? null
}
