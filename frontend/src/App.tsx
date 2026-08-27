import { useEffect, useState } from 'react'
import { deleteProduct, fetchProducts } from './api/products'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import type { Product } from './types'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)

  function loadProducts() {
    fetchProducts()
      .then((loadedProducts) => {
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

  function handleDeleteProduct(productId: number) {
    if (!window.confirm('Wirklich löschen?')) {
      return
    }

    deleteProduct(productId)
      .then(() => {
        setProductToEdit(null)
        loadProducts()
      })
      .catch(() => setErrorMessage('Das Produkt konnte nicht gelöscht werden.'))
  }

  function handleCreateButtonClick() {
    setProductToEdit(null)
    setIsCreateFormOpen(true)
  }

  function handleSelectProduct(product: Product) {
    setIsCreateFormOpen(false)
    setProductToEdit(product)
  }

  function handleSaved() {
    setIsCreateFormOpen(false)
    setProductToEdit(null)
    loadProducts()
  }

  return (
    <main>
      <h1>MiniShop</h1>

      {!isCreateFormOpen && productToEdit === null && (
        <button type="button" className="create-button" onClick={handleCreateButtonClick}>
          Neues Produkt erfassen
        </button>
      )}

      {isCreateFormOpen && (
        <ProductForm
          productToEdit={null}
          onSaved={handleSaved}
          onCancel={() => setIsCreateFormOpen(false)}
        />
      )}

      {productToEdit !== null && (
        <ProductForm
          key={productToEdit.id}
          productToEdit={productToEdit}
          onSaved={handleSaved}
          onCancel={() => setProductToEdit(null)}
        />
      )}

      {isLoading && <p>Wird geladen…</p>}
      {!isLoading && errorMessage !== '' && <p className="error-message">{errorMessage}</p>}
      {!isLoading && errorMessage === '' && (
        <ProductList
          products={products}
          selectedProductId={productToEdit === null ? null : productToEdit.id}
          onSelectProduct={handleSelectProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
    </main>
  )
}

export default App
