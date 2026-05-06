import { mockUsers } from "@/data/users"
import type { User } from "@/lib/types"

export async function getUsers(): Promise<User[]> {
  return mockUsers
}

export async function getUser(id: number): Promise<User | null> {
  return mockUsers.find((u) => u.id === id) ?? null
}

export async function createUser(input: Omit<User, "id">): Promise<User> {
  const id = Math.max(0, ...mockUsers.map((u) => u.id)) + 1
  return { ...input, id }
}

export async function updateUser(
  id: number,
  input: Omit<User, "id">,
): Promise<User> {
  return { ...input, id }
}

export async function deleteUser(_id: number): Promise<void> {
  return
}
