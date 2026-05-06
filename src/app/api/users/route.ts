import { NextResponse } from "next/server"
import { createUser, getUsers } from "@/services/users"
import type { User } from "@/lib/types"

export async function GET() {
  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = (await request.json()) as Omit<User, "id">
  const created = await createUser(body)
  return NextResponse.json(created, { status: 201 })
}
