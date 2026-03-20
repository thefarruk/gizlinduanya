import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(50)
  return NextResponse.json({ profiles: data || [] })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { anon_code, about, age, city, country, gender, zodiac, height, weight, smoking, alcohol, goal, interests, lang } = body

    if (!anon_code) {
      return NextResponse.json({ error: 'anon_code required' }, { status: 400 })
    }

    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('anon_code', anon_code)
      .single()

    let result
    if (existing) {
      result = await supabase
        .from('profiles')
        .update({ about, age, city, country, gender, zodiac, height, weight, smoking, alcohol, goal, interests, lang, is_active: true })
        .eq('anon_code', anon_code)
        .select()
        .single()
    } else {
      result = await supabase
        .from('profiles')
        .insert({ anon_code, about, age, city, country, gender, zodiac, height, weight, smoking, alcohol, goal, interests, lang: lang || 'tk', is_active: true })
        .select()
        .single()
    }

    if (result.error) throw result.error
    return NextResponse.json({ success: true, profile: result.data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
