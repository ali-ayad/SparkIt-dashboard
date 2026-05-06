import { NextResponse } from "next/server"
import { deleteUser, getUser, updateUser } from "@/services/users"
import type { User } from "@/lib/types"

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params
  const user = await getUser(Number(id))
  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(user)
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const body = (await request.json()) as Omit<User, "id">
  const updated = await updateUser(Number(id), body)
  return NextResponse.json(updated)
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params
  await deleteUser(Number(id))
  return new NextResponse(null, { status: 204 })
}
