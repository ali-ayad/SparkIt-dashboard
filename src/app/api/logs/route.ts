import { NextResponse } from "next/server"
import { getLogs } from "@/services/logs"

export async function GET() {
  const logs = await getLogs()
  return NextResponse.json(logs)
}
