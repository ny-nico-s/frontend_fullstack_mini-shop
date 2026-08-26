import { useEffect, useState } from 'react'
import { fetchProducts } from './api/products'
import ProductList from './components/ProductList'
import type { Product } from './types'

function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts()
      .then((loadedProducts) => {
        console.log('Produkte vom Backend:', loadedProducts)
        setProducts(loadedProducts)
      })
      .catch((error) => console.error('Laden fehlgeschlagen:', error))
  }, [])

  return (
    <main>
      <h1>MiniShop</h1>
      <ProductList products={products} />
    </main>
  )
}

export default App
