import { useEffect, useState } from 'react'
import { fetchProducts } from './api/products'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import type { Product } from './types'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  function loadProducts() {
    fetchProducts()
      .then((loadedProducts) => {
        console.log('Produkte vom Backend:', loadedProducts)
        setProducts(loadedProducts)
        setErrorMessage('')
      })
      .catch(() => {
        setErrorMessage('Die Produkte konnten nicht geladen werden. Läuft das Backend auf http://localhost:8080?')
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <main>
      <h1>MiniShop</h1>
      <ProductForm onProductCreated={loadProducts} />
      {isLoading && <p>Wird geladen…</p>}
      {!isLoading && errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
      {!isLoading && errorMessage === '' && <ProductList products={products} />}
    </main>
  )
}

export default App
