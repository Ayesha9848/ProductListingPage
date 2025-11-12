import { useState } from 'react'
import Router from 'next/router'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password !== confirm) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if (res.ok) {
        setSuccess(true)
        setTimeout(() => Router.push('/signin'), 1500)
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Account</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
        {success && (
          <p style={{ color: 'green', marginTop: 8 }}>Registered! Redirecting...</p>
        )}
      </form>

      <p style={{ marginTop: 20 }}>
        Already have an account?{' '}
        <a href="/signin" style={styles.link}>
          Sign in
        </a>
      </p>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 420,
    margin: '60px auto',
    padding: '32px 28px',
    border: '1px solid #eaeaea',
    borderRadius: 10,
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    background: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 24,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: '10px 12px',
    fontSize: 14,
    borderRadius: 6,
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.2s ease',
  },
  button: {
    background: '#ff4081',
    color: '#fff',
    border: 0,
    borderRadius: 6,
    padding: '10px 14px',
    fontSize: 15,
    cursor: 'pointer',
    marginTop: 6,
  },
  link: {
    color: '#ff4081',
    textDecoration: 'none',
    fontWeight: 500,
  },
}
