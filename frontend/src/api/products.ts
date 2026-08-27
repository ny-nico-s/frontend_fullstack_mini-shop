import type { NewProduct, Product } from '../types'
import { requestJson, requestWithoutResponseBody } from './client'

export function fetchProducts(): Promise<Product[]> {
  return requestJson<Product[]>('/products')
}

export function createProduct(newProduct: NewProduct): Promise<Product> {
  return requestJson<Product>('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  })
}

export function deleteProduct(productId: number): Promise<void> {
  return requestWithoutResponseBody('/products/' + productId, { method: 'DELETE' })
}

export function updateProduct(productId: number, product: NewProduct): Promise<Product> {
  return requestJson<Product>('/products/' + productId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
}
