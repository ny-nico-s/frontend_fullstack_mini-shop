import type { Category } from '../types'
import { requestJson } from './client'

export function fetchCategories(): Promise<Category[]> {
  return requestJson<Category[]>('/categories')
}
