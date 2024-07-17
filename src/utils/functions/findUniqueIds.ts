import { Product } from '../../types'

export const findUniqueIds = (products: Product[]): number[] => {
  const uniqueIds = new Set<number>()
  products.forEach((product) => uniqueIds.add(product.id))
  return Array.from(uniqueIds)
}
