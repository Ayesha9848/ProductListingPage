// pages/api/auth/login.js
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
let users = global.__USERS__ || []
global.__USERS__ = users

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret' // set in Vercel env

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  const user = users.find(u=>u.email===email)
  if(!user) return res.status(401).json({ message:'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if(!ok) return res.status(401).json({ message:'Invalid credentials' })
  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
  return res.status(200).json({ token })
}
