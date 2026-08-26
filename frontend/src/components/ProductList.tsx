import type { Product } from '../types'

interface ProductListProps {
  products: Product[]
}

function ProductList({ products }: ProductListProps) {
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
        </li>
      ))}
    </ul>
  )
}

export default ProductList
