// components/ProductCard.js
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardImageWrapper}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.cardImage}
          loading="lazy"
        />
        {hovered && (
          <button className={styles.quickViewBtn}>Quick View</button>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle} title={product.title}>
          {product.title.length > 40
            ? product.title.slice(0, 37) + '...'
            : product.title}
        </h3>

        <p className={styles.cardCategory}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </p>

        <p className={styles.cardPrice}>₹{(product.price * 83).toFixed(0)}</p>

        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </article>
  )
}
