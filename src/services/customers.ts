import { mockCustomers } from "@/data/customers"
import type { Customer } from "@/lib/types"

export async function getCustomers(): Promise<Customer[]> {
  return mockCustomers
}

export async function getCustomer(id: number): Promise<Customer | null> {
  return mockCustomers.find((c) => c.id === id) ?? null
}
