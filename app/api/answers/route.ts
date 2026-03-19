import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const question_id = searchParams.get('question_id')
  if (!question_id) return NextResponse.json({ error: 'Missing question_id' }, { status: 400 })
  const { data } = await supabase.from('answers').select('*').eq('question_id', question_id).order('likes', { ascending: false })
  return NextResponse.json({ answers: data })
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get('session')
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { anon_code } = JSON.parse(session.value)
  const { question_id, content } = await req.json()
  if (!question_id || !content) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const { data, error } = await supabase.from('answers').insert({ question_id, anon_code, content }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true, answer: data })
}
