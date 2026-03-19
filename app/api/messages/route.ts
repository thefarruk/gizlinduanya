import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const session = req.cookies.get('session')
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { anon_code } = JSON.parse(session.value)
  const { data } = await supabase.from('messages').select('*').or(`from_anon.eq.${anon_code},to_anon.eq.${anon_code}`).order('created_at', { ascending: false })
  return NextResponse.json({ messages: data })
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get('session')
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { anon_code } = JSON.parse(session.value)
  const { to_anon, content } = await req.json()
  if (!to_anon || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const { data, error } = await supabase.from('messages').insert({ from_anon: anon_code, to_anon, content }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, message: data })
}
