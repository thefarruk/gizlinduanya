import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET — получить вопросы
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || 'tk'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('questions')
    .select(`
      id, anon_code, content, lang, created_at,
      answers(count)
    `, { count: 'exact' })
    .eq('lang', lang)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ questions: data, total: count, page })
}

// POST — задать вопрос
export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get('session')
    if (!session) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { anon_code } = JSON.parse(session.value)
    const { content, lang } = await req.json()

    if (!content || content.length < 10) {
      return NextResponse.json({ error: 'Вопрос слишком короткий' }, { status: 400 })
    }

    if (content.length > 500) {
      return NextResponse.json({ error: 'Максимум 500 символов' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('questions')
      .insert({ anon_code, content, lang: lang || 'tk' })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, question: data })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}