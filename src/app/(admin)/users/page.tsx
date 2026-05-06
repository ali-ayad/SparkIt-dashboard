import { getUsers } from "@/services/users"
import { UsersView } from "@/features/users/users-view"

export default async function UsersPage() {
  const users = await getUsers()
  return <UsersView initialUsers={users} />
}
