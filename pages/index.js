// pages/index.js
import Head from 'next/head'
import ProductCard from '../components/ProductCard'
import styles from '../styles/Home.module.css'

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Discover Our Products</title>
        <meta name="description" content="Product listing page (SSR)"/>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Discover Our Products</h1>
          <div className={styles.filters}>
            {/* left: categories / sort / search — minimal for now */}
            <input placeholder="Search products..." className={styles.search}/>
            <select aria-label="Sort" className={styles.select}>
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </header>

        <main className={styles.grid}>
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </main>

        <footer className={styles.footer}>
          <p>© Example Store</p>
        </footer>
      </div>
    </>
  )
}

// SSR: fetch products on server for SEO + performance
export async function getServerSideProps(context) {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()
  return { props: { products } }
}
