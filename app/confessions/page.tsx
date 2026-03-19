'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Lang = 'tk' | 'ru' | 'tr' | 'en'

const t = {
  tk: { title: 'Boýun Almalar', write: 'Boýun al', placeholder: 'Bir syr... (max 300 simwol)', publish: 'Anonim çap et', empty: 'Heniz boýun alma ýok.', loading: 'Ýüklenýär...', success: 'Çap edildi!', ago_min: 'minut öň', ago_hour: 'sagat öň', ago_day: 'gün öň' },
  ru: { title: 'Исповеди', write: 'Исповедаться', placeholder: 'Один секрет... (макс 300 символов)', publish: 'Опубликовать анонимно', empty: 'Исповедей пока нет.', loading: 'Загрузка...', success: 'Опубликовано!', ago_min: 'мин назад', ago_hour: 'ч назад', ago_day: 'дн назад' },
  tr: { title: 'İtiraflar', write: 'İtiraf et', placeholder: 'Bir sır... (max 300 karakter)', publish: 'Anonim yayınla', empty: 'Henüz itiraf yok.', loading: 'Yükleniyor...', success: 'Yayınlandı!', ago_min: 'dk önce', ago_hour: 'sa önce', ago_day: 'gün önce' },
  en: { title: 'Confessions', write: 'Confess', placeholder: 'One secret... (max 300 chars)', publish: 'Publish anonymously', empty: 'No confessions yet.', loading: 'Loading...', success: 'Published!', ago_min: 'min ago', ago_hour: 'h ago', ago_day: 'd ago' },
}

function timeAgo(dateStr: string, lang: Lang) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)} ${t[lang].ago_min}`
  if (diff < 86400) return `${Math.floor(diff / 3600)} ${t[lang].ago_hour}`
  return `${Math.floor(diff / 86400)} ${t[lang].ago_day}`
}

export default function ConfessionsPage() {
  const [lang, setLang] = useState<Lang>('tk')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showWrite, setShowWrite] = useState(false)
  const [content, setContent] = useState('')
  const [toast, setToast] = useState('')
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  useEffect(() => { fetchItems() }, [lang])

  async function fetchItems() {
    setLoading(true)
    const { data } = await supabase
      .from('confessions')
      .select('*')
      .eq('lang', lang)
      .order('created_at', { ascending: false })
      .limit(50)
    setItems(data || [])
    setLoading(false)
  }

  async function publish() {
    const session = localStorage.getItem('session')
    if (!session) return showToast('Сначала войдите')
    if (content.length < 5) return showToast('Слишком коротко')
    const { anon_code } = JSON.parse(session)
    const { error } = await supabase.from('confessions').insert({ anon_code, content, lang })
    if (!error) { showToast(t[lang].success); setContent(''); setShowWrite(false); fetchItems() }
  }

  async function likeItem(id: string, currentLikes: number) {
    if (likedIds.has(id)) return
    setLikedIds(prev => new Set([...prev, id]))
    setItems(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s))
    await supabase.from('confessions').update({ likes: currentLikes + 1 }).eq('id', id)
  }

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const tr = t[lang]

  return (
    <div style={{ minHeight: '100vh', background: '#07070f', color: '#EEEDFE', fontFamily: "'Noto Sans', sans-serif", padding: '80px 0 60px' }}>
      {toast && <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#534AB7', color: 'white', padding: '12px 24px', borderRadius: 8, zIndex: 999, fontFamily: 'monospace', fontSize: 13 }}>{toast}</div>}

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px,5vw,40px)', margin: 0 }}>{tr.title}</h1>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['tk','ru','tr','en'] as Lang[]).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? '#534AB7' : 'none', border: '1px solid', borderColor: lang === l ? '#7F77DD' : 'rgba(127,119,221,0.2)', color: lang === l ? 'white' : '#9F9AEC', fontFamily: 'monospace', fontSize: 11, padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {!showWrite ? (
          <button onClick={() => setShowWrite(true)} style={{ width: '100%', background: 'rgba(127,119,221,0.06)', border: '1px dashed rgba(127,119,221,0.25)', color: '#9F9AEC', padding: 16, borderRadius: 12, cursor: 'pointer', fontFamily: 'monospace', fontSize: 13, marginBottom: 32, letterSpacing: 1 }}>
            🤫 {tr.write}
          </button>
        ) : (
          <div style={{ background: '#0d0d1a', border: '1px solid rgba(127,119,221,0.3)', borderRadius: 12, padding: 20, marginBottom: 32 }}>
            <textarea value={content} onChange={e => setContent(e.target.value.slice(0, 300))} placeholder={tr.placeholder} style={{ width: '100%', background: '#07070f', border: '1px solid rgba(127,119,221,0.2)', color: '#EEEDFE', fontFamily: "'Noto Sans', sans-serif", fontSize: 14, padding: '12px 14px', borderRadius: 8, outline: 'none', resize: 'none', height: 100, lineHeight: 1.6 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 11, color: content.length > 270 ? '#ff6b6b' : '#555470' }}>{content.length}/300</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setShowWrite(false)} style={{ background: 'none', border: '1px solid rgba(127,119,221,0.2)', color: '#555470', fontFamily: 'monospace', fontSize: 12, padding: '8px 16px', borderRadius: 6, cursor: 'pointer' }}>✕</button>
                <button onClick={publish} style={{ background: '#534AB7', border: 'none', color: 'white', fontFamily: 'monospace', fontSize: 12, padding: '8px 18px', borderRadius: 6, cursor: 'pointer' }}>{tr.publish}</button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: 'center', color: '#555470', fontFamily: 'monospace' }}>{tr.loading}</p>
        ) : items.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#555470', fontFamily: 'monospace', padding: '60px 0' }}>{tr.empty}</p>
        ) : (
          <div style={{ columns: '1', gap: 12 }}>
            {items.map(item => (
              <div key={item.id} style={{ background: '#0d0d1a', border: '1px solid rgba(127,119,221,0.1)', borderRadius: 12, padding: '20px 22px', marginBottom: 12, breakInside: 'avoid' }}>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#EEEDFE', margin: '0 0 14px', fontStyle: 'italic' }}>"{item.content}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button onClick={() => likeItem(item.id, item.likes)} style={{ background: 'none', border: 'none', color: likedIds.has(item.id) ? '#7F77DD' : '#555470', fontFamily: 'monospace', fontSize: 12, cursor: 'pointer', padding: 0 }}>
                    {likedIds.has(item.id) ? '♥' : '♡'} {item.likes}
                  </button>
                  <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#555470' }}>{timeAgo(item.created_at, lang)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}