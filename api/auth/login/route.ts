import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Введите логин и пароль' }, { status: 400 })
    }

    // Поиск пользователя
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, password_hash, anon_code')
      .eq('username', username.toLowerCase())
      .single()

    if (error || !user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 })
    }

    // Проверка пароля
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
    }

    // Обновить last_seen
    await supabase
      .from('users')
      .update({ last_seen: new Date().toISOString() })
      .eq('id', user.id)

    const response = NextResponse.json({
      success: true,
      user: { username: user.username, anon_code: user.anon_code }
    })

    response.cookies.set('session', JSON.stringify({
      id: user.id,
      username: user.username,
      anon_code: user.anon_code
    }), {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 30
    })

    return response

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}