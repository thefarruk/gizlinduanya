import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

function generateAnonCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'ANON#'
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export async function POST(req: NextRequest) {
  const { username, password, secret_word } = await req.json()
  if (!username || !password || !secret_word) return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  const { data: existing } = await supabase.from('users').select('id').eq('username', username.toLowerCase()).single()
  if (existing) return NextResponse.json({ error: 'Username taken' }, { status: 409 })
  const password_hash = await bcrypt.hash(password, 10)
  const anon_code = generateAnonCode()
  const { data: user, error } = await supabase.from('users').insert({ username: username.toLowerCase(), password_hash, secret_word: secret_word.toLowerCase(), anon_code }).select('id, username, anon_code').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const response = NextResponse.json({ success: true, user: { username: user.username, anon_code: user.anon_code } })
  response.cookies.set('session', JSON.stringify({ id: user.id, username: user.username, anon_code: user.anon_code }), { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 30 })
  return response
}
