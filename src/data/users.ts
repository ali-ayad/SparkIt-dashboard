import type { User } from "@/lib/types"

export const mockUsers: User[] = [
  {
    id: 1,
    name: "علي عياد",
    email: "ali@sparkit.com",
    role: "super-admin",
    status: "active",
    lastLogin: "2026-05-06T09:12:00Z",
  },
  {
    id: 2,
    name: "محمد العتيبي",
    email: "mohammed@sparkit.com",
    role: "admin",
    status: "active",
    lastLogin: "2026-05-05T18:43:00Z",
  },
  {
    id: 3,
    name: "نورا حسن",
    email: "noura@sparkit.com",
    role: "editor",
    status: "active",
    lastLogin: "2026-05-06T07:55:00Z",
  },
  {
    id: 4,
    name: "خالد العلي",
    email: "khaled@sparkit.com",
    role: "editor",
    status: "inactive",
    lastLogin: "2026-04-28T14:02:00Z",
  },
  {
    id: 5,
    name: "ليلى محمود",
    email: "layla@sparkit.com",
    role: "viewer",
    status: "active",
    lastLogin: "2026-05-04T11:20:00Z",
  },
]
