import { useEffect, useState } from 'react'
import { fetchProducts } from './api/products'
import ProductList from './components/ProductList'
import type { Product } from './types'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchProducts()
      .then((loadedProducts) => {
        console.log('Produkte vom Backend:', loadedProducts)
        setProducts(loadedProducts)
      })
      .catch(() => {
        setErrorMessage('Die Produkte konnten nicht geladen werden. Läuft das Backend auf http://localhost:8080?')
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <main>
      <h1>MiniShop</h1>
      {isLoading && <p>Wird geladen…</p>}
      {!isLoading && errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
      {!isLoading && errorMessage === '' && <ProductList products={products} />}
    </main>
  )
}

export default App
