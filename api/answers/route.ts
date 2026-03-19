import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET — получить ответы на вопрос
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const question_id = searchParams.get('question_id')

  if (!question_id) {
    return NextResponse.json({ error: 'question_id обязателен' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('answers')
    .select('id, anon_code, content, likes, created_at')
    .eq('question_id', question_id)
    .order('likes', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ answers: data })
}

// POST — ответить на вопрос
export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get('session')
    if (!session) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { anon_code } = JSON.parse(session.value)
    const { question_id, content } = await req.json()

    if (!question_id) {
      return NextResponse.json({ error: 'question_id обязателен' }, { status: 400 })
    }

    if (!content || content.length < 2) {
      return NextResponse.json({ error: 'Ответ слишком короткий' }, { status: 400 })
    }

    if (content.length > 1000) {
      return NextResponse.json({ error: 'Максимум 1000 символов' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('answers')
      .insert({ question_id, anon_code, content })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, answer: data })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

// PATCH — лайк ответа
export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json()

    const { data: item } = await supabase
      .from('answers')
      .select('likes')
      .eq('id', id)
      .single()

    if (!item) return NextResponse.json({ error: 'Не найдено' }, { status: 404 })

    await supabase
      .from('answers')
      .update({ likes: item.likes + 1 })
      .eq('id', id)

    return NextResponse.json({ success: true, likes: item.likes + 1 })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}