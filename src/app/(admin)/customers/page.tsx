import { getCustomers } from "@/services/customers"
import { CustomersView } from "@/features/customers/customers-view"

export default async function CustomersPage() {
  const customers = await getCustomers()
  return <CustomersView initialCustomers={customers} />
}
