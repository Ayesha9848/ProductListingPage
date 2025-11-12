// pages/api/auth/register.js
import bcrypt from 'bcryptjs'
let users = global.__USERS__ || []
global.__USERS__ = users

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if(!email || !password) return res.status(400).json({ message: 'Missing fields' })
  if(users.find(u=>u.email===email)) return res.status(400).json({ message: 'User exists' })
  const hash = await bcrypt.hash(password, 8)
  const newUser = { id: Date.now(), email, passwordHash: hash }
  users.push(newUser)
  return res.status(201).json({ message:'ok' })
}
