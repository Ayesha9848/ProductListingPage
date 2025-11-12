// components/Header.js
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <Link href="/" style={styles.logo}>
          <span>🛍️ ShopSmart</span>
        </Link>
      </div>

      <nav style={styles.nav}>
        <Link href="/" style={styles.link}>
          Home
        </Link>
        <Link href="/" style={styles.link}>
          Products
        </Link>
      </nav>

      <div style={styles.right}>
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout} style={styles.authBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" style={styles.authBtnOutline}>
              Sign in
            </Link>
            <Link href="/signup" style={styles.authBtn}>
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

const styles = {
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 32px',
    background: '#fff',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  left: { flex: 1 },
  logo: {
    fontWeight: 700,
    fontSize: 20,
    textDecoration: 'none',
    color: '#111',
  },
  nav: {
    display: 'flex',
    gap: 24,
    flex: 1,
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    color: '#444',
    fontSize: 15,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 12,
  },
  authBtn: {
    background: '#ff4081',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: 6,
    border: 0,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  authBtnOutline: {
    background: '#fff',
    border: '1px solid #ff4081',
    color: '#ff4081',
    padding: '8px 14px',
    borderRadius: 6,
    textDecoration: 'none',
  },
}
