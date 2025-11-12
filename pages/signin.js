// pages/signin.js
import { useState } from 'react'
import Router from 'next/router'

export default function SignIn(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState(null)

  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/auth/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ email, password })
    })
    const data = await res.json()
    if(res.ok){
      // store token (for demo only: localStorage)
      localStorage.setItem('token', data.token)
      Router.push('/')
    }else setErr(data.message)
  }

  return (
    <div style={{maxWidth:420, margin:'40px auto', padding:20}}>
      <h2>Sign in</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required/>
        <button type="submit">Sign in</button>
        {err && <p style={{color:'red'}}>{err}</p>}
      </form>
    </div>
  )
}
