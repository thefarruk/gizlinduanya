import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!username || !password) return NextResponse.json({ error: 'All fields required' }, { status: 400 })
  const { data: user, error } = await supabase.from('users').select('id, username, password_hash, anon_code').eq('username', username.toLowerCase()).single()
  if (error || !user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  const response = NextResponse.json({ success: true, user: { username: user.username, anon_code: user.anon_code } })
  response.cookies.set('session', JSON.stringify({ id: user.id, username: user.username, anon_code: user.anon_code }), { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 30 })
  return response
}
