import { getCategories } from "@/services/categories"
import { CategoriesView } from "@/features/categories/categories-view"

export default async function CategoriesPage() {
  const categories = await getCategories()
  return <CategoriesView initialCategories={categories} />
}
