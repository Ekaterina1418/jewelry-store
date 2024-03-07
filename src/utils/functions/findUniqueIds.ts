import { Product } from '../../types'

export const findUniqueIds = (products: Product[]): string[] => {
  const uniqueIds = new Set<string>()
  products.forEach((product) => uniqueIds.add(product.id))
  return Array.from(uniqueIds)
}
