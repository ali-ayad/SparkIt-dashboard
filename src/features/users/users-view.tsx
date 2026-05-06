"use client"

import { useState } from "react"
import { Edit, Search, Trash2, UserCog, Users as UsersIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DataTable,
  type Column,
} from "@/components/admin/data-table"
import { DataTablePage } from "@/components/admin/data-table-page"
import { EmptyState } from "@/components/admin/empty-state"
import { UserModal } from "@/features/users/user-modal"
import { useConfirm } from "@/components/confirm-dialog"
import { USER_ROLE_COLOR, USER_ROLE_LABEL } from "@/lib/constants"
import {
  createUser,
  deleteUser,
  updateUser,
} from "@/services/users"
import type { User } from "@/lib/types"

interface UsersViewProps {
  initialUsers: User[]
}

const formatLastLogin = (iso?: string) => {
  if (!iso) return "—"
  return new Date(iso).toLocaleDateString("ar-EG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function UsersView({ initialUsers }: UsersViewProps) {
  const confirm = useConfirm()
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAdd = () => {
    setEditingUser(null)
    setIsModalOpen(true)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    const ok = await confirm({
      title: "حذف المستخدم",
      description:
        "هل أنت متأكد من حذف هذا المستخدم؟ سيفقد الوصول إلى لوحة التحكم.",
      confirmLabel: "حذف",
      variant: "destructive",
    })
    if (!ok) return
    const previous = users
    setUsers((prev) => prev.filter((u) => u.id !== id))
    try {
      await deleteUser(id)
    } catch {
      setUsers(previous)
    }
  }

  const handleSave = async (input: User) => {
    if (editingUser?.id) {
      const id = editingUser.id
      const previous = users
      const optimistic: User = { ...input, id }
      setUsers((prev) => prev.map((u) => (u.id === id ? optimistic : u)))
      try {
        const updated = await updateUser(id, input)
        setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)))
      } catch {
        setUsers(previous)
      }
    } else {
      const tempId = -Date.now()
      const previous = users
      const optimistic: User = { ...input, id: tempId }
      setUsers((prev) => [...prev, optimistic])
      try {
        const created = await createUser(input)
        setUsers((prev) =>
          prev.map((u) => (u.id === tempId ? created : u)),
        )
      } catch {
        setUsers(previous)
      }
    }
  }

  const columns: Column<User>[] = [
    {
      header: "المستخدم",
      className: "px-6",
      headerClassName: "px-6",
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-muted-foreground/10 bg-muted/20">
            <AvatarFallback className="bg-transparent text-primary text-[10px] font-bold uppercase">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-right leading-none gap-0.5">
            <span className="text-sm font-semibold text-foreground">
              {user.name}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "الدور",
      cell: (user) => (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`${USER_ROLE_COLOR[user.role]} text-[10px] font-medium`}
          >
            {USER_ROLE_LABEL[user.role]}
          </Badge>
        </div>
      ),
    },
    {
      header: "الحالة",
      cell: (user) => (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={
              user.status === "active"
                ? "bg-emerald-50 text-emerald-600 border-emerald-200/50 dark:bg-emerald-950/20 dark:border-emerald-900/50 text-[10px] font-medium"
                : "text-[10px] font-medium"
            }
          >
            {user.status === "active" ? "نشط" : "غير نشط"}
          </Badge>
        </div>
      ),
    },
    {
      header: "آخر دخول",
      cell: (user) => (
        <span className="text-xs text-muted-foreground">
          {formatLastLogin(user.lastLogin)}
        </span>
      ),
    },
    {
      header: "الإجراءات",
      headerClassName: "px-6",
      className: "px-6",
      cell: (user) => (
        <div className="flex justify-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(user)}
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(user.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const isTrulyEmpty = users.length === 0
  const hasNoMatches = !isTrulyEmpty && filteredUsers.length === 0

  return (
    <>
      <DataTablePage
        title="إدارة المستخدمين"
        addButtonText="دعوة مستخدم"
        onAddClick={handleAdd}
        searchPlaceholder="البحث عن المستخدمين..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      >
        {isTrulyEmpty ? (
          <EmptyState
            icon={UsersIcon}
            title="لا يوجد مستخدمون بعد"
            description="ابدأ بإضافة فريقك ومنحهم الصلاحيات المناسبة"
            action={{
              label: "دعوة مستخدم",
              onClick: handleAdd,
              icon: UserCog,
            }}
          />
        ) : hasNoMatches ? (
          <EmptyState
            icon={Search}
            title="لا توجد نتائج"
            description={`لم نجد مستخدمين مطابقين لـ "${searchQuery}"`}
          />
        ) : (
          <DataTable columns={columns} data={filteredUsers} />
        )}
      </DataTablePage>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        user={editingUser}
      />
    </>
  )
}
