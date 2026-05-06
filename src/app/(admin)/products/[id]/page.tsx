import { notFound } from "next/navigation"
import { getProduct } from "@/services/products"
import { ProductDetail } from "@/features/products/product-detail"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params
  const productId = Number(id)
  if (Number.isNaN(productId)) notFound()

  const product = await getProduct(productId)
  if (!product) notFound()

  return <ProductDetail initialProduct={product} />
}
