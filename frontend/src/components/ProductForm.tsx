import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { fetchCategories } from '../api/categories'
import { createProduct } from '../api/products'
import type { Category } from '../types'
import './ProductForm.css'

interface ProductFormProps {
  onProductCreated: () => void
}

function ProductForm({ onProductCreated }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchCategories()
      .then((loadedCategories) => setCategories(loadedCategories))
      .catch(() => setFormError('Die Kategorien konnten nicht geladen werden.'))
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')
    setIsSaving(true)

    createProduct({
      name: name,
      price: Number(price),
      stock: Number(stock),
      category: { id: Number(categoryId) },
    })
      .then(() => {
        setName('')
        setPrice('')
        setStock('')
        setCategoryId('')
        onProductCreated()
      })
      .catch(() => setFormError('Das Produkt konnte nicht gespeichert werden.'))
      .finally(() => setIsSaving(false))
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Neues Produkt</h2>

      <label htmlFor="product-name">Name</label>
      <input
        id="product-name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <label htmlFor="product-price">Preis</label>
      <input
        id="product-price"
        type="number"
        step="0.05"
        min="0"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        required
      />

      <label htmlFor="product-stock">Bestand</label>
      <input
        id="product-stock"
        type="number"
        step="1"
        min="0"
        value={stock}
        onChange={(event) => setStock(event.target.value)}
        required
      />

      <label htmlFor="product-category">Kategorie</label>
      <select
        id="product-category"
        value={categoryId}
        onChange={(event) => setCategoryId(event.target.value)}
        required
      >
        <option value="">Bitte wählen</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Wird gespeichert…' : 'Produkt speichern'}
      </button>

      {formError !== '' && <p className="error-message">{formError}</p>}
    </form>
  )
}

export default ProductForm
