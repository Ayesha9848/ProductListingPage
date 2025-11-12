// components/ProductCard.js
import styles from '../styles/Home.module.css'

export default function ProductCard({ product }) {
  return (
    <article className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.cardImage}/>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{product.title}</h3>
        <p className={styles.cardPrice}>₹{(product.price * 80).toFixed(0)}</p>
        <p className={styles.cardCategory}>{product.category}</p>
        <button className={styles.addToCart}>Add to cart</button>
      </div>
    </article>
  )
}
