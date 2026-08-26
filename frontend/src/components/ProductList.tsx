import './ProductList.css'
import type { Product } from '../types'

interface ProductListProps {
  products: Product[]
  onDeleteProduct: (productId: number) => void
}

function ProductList({ products, onDeleteProduct }: ProductListProps) {
  if (products.length === 0) {
    return <p>Noch keine Produkte erfasst</p>
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <h2 className="product-name">{product.name}</h2>
          <p>Preis: {product.price.toFixed(2)} CHF</p>
          <p>Bestand: {product.stock}</p>
          <p>Kategorie: {product.category.name}</p>
          <button
            type="button"
            className="delete-button"
            onClick={() => onDeleteProduct(product.id)}
          >
            Löschen
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ProductList
