import { useEffect } from 'react'
import { fetchProducts } from './api/products'

function App() {
  useEffect(() => {
    fetchProducts()
      .then((products) => console.log('Produkte vom Backend:', products))
      .catch((error) => console.error('Laden fehlgeschlagen:', error))
  }, [])

  return (
    <main>
      <h1>MiniShop</h1>
    </main>
  )
}

export default App
