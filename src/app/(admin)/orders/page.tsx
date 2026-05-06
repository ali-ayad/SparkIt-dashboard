import { getOrders } from "@/services/orders"
import { OrdersView } from "@/features/orders/orders-view"

export default async function OrdersPage() {
  const orders = await getOrders()
  return <OrdersView initialOrders={orders} />
}
