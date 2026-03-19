import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET — получить исповеди
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || 'tk'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 30
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('confessions')
    .select('id, anon_code, content, likes, created_at', { count: 'exact' })
    .eq('lang', lang)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ confessions: data, total: count, page })
}

// POST — создать исповедь
export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get('session')
    if (!session) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { anon_code } = JSON.parse(session.value)
    const { content, lang } = await req.json()

    if (!content || content.length < 5) {
      return NextResponse.json({ error: 'Текст слишком короткий' }, { status: 400 })
    }

    if (content.length > 300) {
      return NextResponse.json({ error: 'Максимум 300 символов' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('confessions')
      .insert({ anon_code, content, lang: lang || 'tk' })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, confession: data })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

// PATCH — лайк исповеди
export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json()

    const { data: item } = await supabase
      .from('confessions')
      .select('likes')
      .eq('id', id)
      .single()

    if (!item) return NextResponse.json({ error: 'Не найдено' }, { status: 404 })

    const { error } = await supabase
      .from('confessions')
      .update({ likes: item.likes + 1 })
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true, likes: item.likes + 1 })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}