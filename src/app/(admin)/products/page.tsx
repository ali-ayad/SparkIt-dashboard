import { getProducts } from "@/services/products"
import { ProductsView } from "@/features/products/products-view"

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductsView initialProducts={products} />
}
