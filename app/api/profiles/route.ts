import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET — получить анкеты
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || 'tk'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20
  const offset = (page - 1) * limit

  const { data, error, count } = await supabase
    .from('profiles')
    .select('id, anon_code, age, city, about, interests, created_at', { count: 'exact' })
    .eq('lang', lang)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ profiles: data, total: count, page })
}

// POST — создать или обновить анкету
export async function POST(req: NextRequest) {
  try {
    const session = req.cookies.get('session')
    if (!session) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { anon_code, id: user_id } = JSON.parse(session.value)
    const { age, city, about, interests, lang } = await req.json()

    if (!about || about.length < 10) {
      return NextResponse.json({ error: 'Расскажите о себе (мин 10 символов)' }, { status: 400 })
    }

    if (age && (age < 16 || age > 99)) {
      return NextResponse.json({ error: 'Некорректный возраст' }, { status: 400 })
    }

    // Проверяем есть ли уже анкета
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('anon_code', anon_code)
      .single()

    let result
    if (existing) {
      // Обновить
      result = await supabase
        .from('profiles')
        .update({ age, city, about, interests, lang: lang || 'tk', is_active: true })
        .eq('anon_code', anon_code)
        .select()
        .single()
    } else {
      // Создать
      result = await supabase
        .from('profiles')
        .insert({ user_id, anon_code, age, city, about, interests, lang: lang || 'tk' })
        .select()
        .single()
    }

    if (result.error) throw result.error

    return NextResponse.json({ success: true, profile: result.data })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}

// DELETE — скрыть анкету
export async function DELETE(req: NextRequest) {
  try {
    const session = req.cookies.get('session')
    if (!session) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
    }

    const { anon_code } = JSON.parse(session.value)

    await supabase
      .from('profiles')
      .update({ is_active: false })
      .eq('anon_code', anon_code)

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}