import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"
export async function POST(req: NextRequest) {
  const { username, secret_word, new_password } = await req.json()
  const { data: user } = await supabase.from("users").select("id,secret_word").eq("username", username.toLowerCase()).single()
  const u = user as any
  if (u.secret_word !== secret_word.toLowerCase()) return NextResponse.json({ error: "Wrong secret" }, { status: 401 })
  const password_hash = await bcrypt.hash(new_password, 10)
  await supabase.from("users").update({ password_hash }).eq("id", u.id)
  return NextResponse.json({ success: true })
}
