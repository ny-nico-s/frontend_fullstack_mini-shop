import { useEffect, useState } from 'react'
import { fetchProducts } from './api/products'
import ProductList from './components/ProductList'
import type { Product } from './types'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then((loadedProducts) => {
        console.log('Produkte vom Backend:', loadedProducts)
        setProducts(loadedProducts)
      })
      .catch((error) => console.error('Laden fehlgeschlagen:', error))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <main>
      <h1>MiniShop</h1>
      {isLoading ? <p>Wird geladen…</p> : <ProductList products={products} />}
    </main>
  )
}

export default App
