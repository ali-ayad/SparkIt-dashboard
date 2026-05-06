import { mockLogs } from "@/data/logs"
import type { LogEntry } from "@/lib/types"

export async function getLogs(): Promise<LogEntry[]> {
  return [...mockLogs].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )
}
