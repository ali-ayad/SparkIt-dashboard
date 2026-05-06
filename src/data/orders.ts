import type { Order } from "@/lib/types"

export const mockOrders: Order[] = [
  {
    id: "ORD-1234",
    customer: "أحمد حسن",
    date: "2026-01-10",
    total: 1199,
    status: "pending",
    items: 2,
  },
  {
    id: "ORD-1235",
    customer: "سارة جونسون",
    date: "2026-01-09",
    total: 2499,
    status: "processing",
    items: 1,
  },
  {
    id: "ORD-1236",
    customer: "محمد علي",
    date: "2026-01-09",
    total: 449,
    status: "shipped",
    items: 3,
  },
  {
    id: "ORD-1237",
    customer: "إيميلي تشين",
    date: "2026-01-08",
    total: 799,
    status: "delivered",
    items: 1,
  },
  {
    id: "ORD-1238",
    customer: "عمر خليل",
    date: "2026-01-08",
    total: 1899,
    status: "cancelled",
    items: 2,
  },
]
