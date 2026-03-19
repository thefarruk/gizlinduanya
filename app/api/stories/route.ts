import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET — получить истории
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || 'tk'
  const category = searchParams.get('category') || 'story'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('stories')
    .select('id, anon_code, content, category, likes, views, created_at', { count: 'exact' })
    .eq('lang', lang)
    .eq('category', category)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ stories: data, total: count, page })
}

// POST — создать историю
export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get('session')
    if (!session) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { anon_code } = JSON.parse(session.value)
    const { content, category, lang } = await req.json()

    if (!content || content.length < 10) {
      return NextResponse.json({ error: 'Текст слишком короткий' }, { status: 400 })
    }

    if (content.length > 2000) {
      return NextResponse.json({ error: 'Текст слишком длинный (максимум 2000)' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('stories')
      .insert({ anon_code, content, category: category || 'story', lang: lang || 'tk' })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, story: data })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}