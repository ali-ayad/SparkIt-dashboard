import { getLogs } from "@/services/logs"
import { LogsView } from "@/features/logs/logs-view"

export default async function LogsPage() {
  const logs = await getLogs()
  return <LogsView initialLogs={logs} />
}
