import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || 'tk'
  const { data } = await supabase.from('questions').select('*').eq('lang', lang).order('created_at', { ascending: false }).limit(20)
  return NextResponse.json({ questions: data })
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get('session')
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { anon_code } = JSON.parse(session.value)
  const { content, lang } = await req.json()
  if (!content || content.length < 5) return NextResponse.json({ error: 'Too short' }, { status: 400 })
  const { data, error } = await supabase.from('questions').insert({ anon_code, content, lang: lang || 'tk' }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, question: data })
}
