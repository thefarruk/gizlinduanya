import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || 'tk'
  const { data } = await supabase.from('profiles').select('*').eq('lang', lang).eq('is_active', true).order('created_at', { ascending: false }).limit(20)
  return NextResponse.json({ profiles: data })
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get('session')
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { anon_code, id: user_id } = JSON.parse(session.value)
  const { age, city, about, lang } = await req.json()
  const { data, error } = await supabase.from('profiles').upsert({ user_id, anon_code, age, city, about, lang: lang || 'tk', is_active: true }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, profile: data })
}
