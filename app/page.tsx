cat > app/page.tsx << 'ENDOFFILE'
'use client'
import { useState, useEffect } from 'react'
type Lang = 'tk' | 'ru' | 'tr' | 'en'
export default function Home() {
  const [lang, setLang] = useState<Lang>('tk')
  const [modal, setModal] = useState<'login' | 'register' | null>(null)
  const [s1, setS1] = useState(0)
  const [s2, setS2] = useState(0)
  const [s3, setS3] = useState(0)
  useEffect(() => {
    const animate = (target: number, set: (n: number) => void) => {
      let c = 0; const step = target / 60
      const t = setInterval(() => { c += step; if (c >= target) { c = target; clearInterval(t) } set(Math.floor(c)) }, 25)
    }
    setTimeout(() => { animate(12847, setS1); animate(342, setS2); animate(1203, setS3) }, 500)
  }, [])
  const labels: Record<Lang, Record<string, string>> = {
    tk: { tag: 'Anonim platforma', title: 'Seniň syrlaryn bu ýerde howpsuz', sub: 'Hekaýalar. Tanyşlyk. Boýun almalar. Hemmesi anonim.', cta: 'Anonim gir', explore: 'Hekaýalary gör', login: 'Gir', register: 'Anonim gir', u: 'ulanyjy', st: 'şu gün hekaýalar', on: 'onlaýn', daily: 'GÜNÜŇ SORAGY', dq: 'Iň ýakyn adamlaryňdan näme gizleýärsiň?', dp: 'Anonim jogap ber...', db: 'Anonim jogap ber', live: 'ŞU WAGT', f1: 'Üç ýyl bäri dymyp geldim. Bu gün ilkinji gezek ýazdym. Ýeňil boldy...', f2: 'Hiç duşuşmadyk adama aşyk boldym. Diňe şu ýerde gürleşýäris.', f3: 'Maşgalam bagtlydyryn öýdýär. Hakykatda näme bolýanyny hiç kim bilenok.', footer: '© 2025 — anonim · howpsuz · yzyz ýok', nomail: 'Email ýok. Telefon ýok. Diňe login we parol.', ul: 'ULANYJY ADY', pl: 'PAROL', sl: 'GIZLIN SÖZ', sp: 'diňe sen bilersiň...', na: 'Hasabyň ýokmy?', ha: 'Hasabyň barmy?' },
    ru: { tag: 'Анонимная платформа', title: 'Твои тайны здесь в безопасности', sub: 'Истории. Знакомства. Исповеди. Всё анонимно.', cta: 'Войти анонимно', explore: 'Смотреть истории', login: 'Войти', register: 'Войти анонимно', u: 'пользователей', st: 'историй сегодня', on: 'онлайн', daily: 'ВОПРОС ДНЯ', dq: 'Что вы скрываете от самых близких людей?', dp: 'Ответь анонимно...', db: 'Ответить анонимно', live: 'ПРЯМО СЕЙЧАС', f1: 'Три года я молчал об этом. Сегодня наконец написал здесь. Стало легче...', f2: 'Я влюблён в человека которого никогда не встречал. Мы общаемся только здесь.', f3: 'Семья думает что я счастлив. Никто не знает что происходит на самом деле.', footer: '© 2025 — анонимно · безопасно · без следов', nomail: 'Без email. Без телефона. Только логин и пароль.', ul: 'ЛОГИН', pl: 'ПАРОЛЬ', sl: 'СЕКРЕТНОЕ СЛОВО', sp: 'только ты знаешь...', na: 'Нет аккаунта?', ha: 'Уже есть аккаунт?' },
    tr: { tag: 'Anonim platform', title: 'Sırların burada güvende', sub: 'Hikayeler. Tanışmalar. İtiraflar. Hepsi anonim.', cta: 'Anonim giriş', explore: 'Hikayelere bak', login: 'Giriş', register: 'Anonim giriş', u: 'kullanıcı', st: 'bugün hikaye', on: 'çevrimiçi', daily: 'GÜNÜN SORUSU', dq: 'En yakınlarınızdan ne saklıyorsunuz?', dp: 'Anonim cevapla...', db: 'Anonim cevapla', live: 'ŞU AN', f1: 'Üç yıldır sustum. Bugün sonunda burada yazdım. Rahatladım...', f2: 'Hiç tanışmadığım birine aşık oldum. Sadece burada konuşuyoruz.', f3: 'Ailem mutlu olduğumu sanıyor. Gerçekte ne olduğunu kimse bilmiyor.', footer: '© 2025 — anonim · güvenli · iz yok', nomail: 'Email yok. Telefon yok. Sadece kullanıcı adı ve şifre.', ul: 'KULLANICI ADI', pl: 'ŞİFRE', sl: 'GİZLİ KELIME', sp: 'sadece sen bilirsin...', na: 'Hesabın yok mu?', ha: 'Hesabın var mı?' },
    en: { tag: 'Anonymous platform', title: 'Your secrets are safe here', sub: 'Stories. Connections. Confessions. All anonymous.', cta: 'Enter anonymously', explore: 'Browse stories', login: 'Login', register: 'Enter anonymously', u: 'users', st: 'stories today', on: 'online', daily: 'QUESTION OF THE DAY', dq: 'What are you hiding from the people closest to you?', dp: 'Answer anonymously...', db: 'Answer anonymously', live: 'RIGHT NOW', f1: 'Three years I kept silent. Today I finally wrote it here. I feel lighter...', f2: "I'm in love with someone I've never met. We only talk here.", f3: "My family thinks I'm happy. Nobody knows what's really happening.", footer: '© 2025 — anonymous · safe · no trace', nomail: 'No email. No phone. Just username and password.', ul: 'USERNAME', pl: 'PASSWORD', sl: 'SECRET WORD', sp: 'only you know...', na: 'No account?', ha: 'Already have account?' }
  }
  const l = labels[lang]
  const cards = [
    { icon: '🔥', title: { tk: 'Anonim hekaýalar', ru: 'Анонимные истории', tr: 'Anonim hikayeler', en: 'Anonymous stories' }[lang], desc: { tk: 'Hiç kimä aýdyp bilmeýän zadyňy aýt.', ru: 'Расскажи то, что не можешь рассказать никому.', tr: 'Kimseye söyleyemediğini anlat.', en: "Tell what you can't tell anyone." }[lang], badge: { tk: 'GYZGYN', ru: 'ГОРЯЧЕЕ', tr: 'SICAK', en: 'HOT' }[lang], color: '#ff6b6b', href: '/app/stories' },
    { icon: '💬', title: { tk: 'Anonim tanyşlyk', ru: 'Анонимные знакомства', tr: 'Anonim tanışma', en: 'Anonymous dating' }[lang], desc: { tk: 'Meňzeş adamlary tap. Anonim ýaz.', ru: 'Находи людей с похожими мыслями.', tr: 'Benzer düşünen insanları bul.', en: 'Find people with similar thoughts.' }[lang], badge: { tk: 'MEŞHUR', ru: 'ПОПУЛЯРНО', tr: 'POPÜLER', en: 'POPULAR' }[lang], color: '#7F77DD', href: '/dating' },
    { icon: '🤫', title: { tk: 'Boýun almalar', ru: 'Исповеди', tr: 'İtiraflar', en: 'Confessions' }[lang], desc: { tk: 'Bir syr. Anonim. Hiç kim bilmez.', ru: 'Один абзац. Одна тайна. Анонимно.', tr: 'Bir paragraf. Bir sır. Anonim.', en: 'One paragraph. One secret. Anonymous.' }[lang], badge: { tk: 'TÄZE', ru: 'НОВОЕ', tr: 'YENİ', en: 'NEW' }[lang], color: '#1D9E75', href: '/app/confessions' },
    { icon: '❓', title: { tk: 'Sorag ber', ru: 'Задай вопрос', tr: 'Soru sor', en: 'Ask a question' }[lang], desc: { tk: 'Anonim sorag ber, dogry jogap al.', ru: 'Спроси то, что стесняешься спросить вслух.', tr: 'Sesli soramadığını sor.', en: "Ask what you're afraid to ask out loud." }[lang], badge: { tk: 'MEŞHUR', ru: 'ПОПУЛЯРНО', tr: 'POPÜLER', en: 'POPULAR' }[lang], color: '#7F77DD', href: '/questions' },
    { icon: '⚡', title: { tk: 'Kim günäkär?', ru: 'Кто виноват?', tr: 'Kim suçlu?', en: "Who's guilty?" }[lang], desc: { tk: 'Ýagdaýy aýt, adamlar ses berýär.', ru: 'Опиши ситуацию — люди голосуют кто прав.', tr: 'Durumu anlat, insanlar oylar.', en: 'Describe a situation — people vote.' }[lang], badge: { tk: 'GYZGYN', ru: 'ГОРЯЧЕЕ', tr: 'SICAK', en: 'HOT' }[lang], color: '#ff6b6b', href: '/vote' },
    { icon: '📔', title: { tk: 'Anonim gündelik', ru: 'Анонимный дневник', tr: 'Anonim günlük', en: 'Anonymous diary' }[lang], desc: { tk: 'Diňe özüň üçin ýaz.', ru: 'Пиши только для себя.', tr: 'Sadece kendin için yaz.', en: 'Write only for yourself.' }[lang], badge: { tk: 'TÄZE', ru: 'НОВОЕ', tr: 'YENİ', en: 'NEW' }[lang], color: '#1D9E75', href: '/diary' },
  ]
  const feeds = [
    { code: 'A7', id: '4821', text: l.f1, likes: 47 },
    { code: 'K3', id: '2193', text: l.f2, likes: 83 },
    { code: 'M9', id: '7754', text: l.f3, likes: 124 },
  ]
  const s = { background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace' }
  return (
    <div style={{ minHeight: '100vh', background: '#07070f', color: '#EEEDFE', fontFamily: 'Noto Sans, sans-serif' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7,7,15,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(127,119,221,0.12)' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 500, letterSpacing: 2 }}>Ψ GizlinDünya</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['tk','ru','tr','en'] as Lang[]).map(lg => (
            <button key={lg} onClick={() => setLang(lg)} style={{ ...s, background: lang === lg ? '#534AB7' : 'none', border: '1px solid', borderColor: lang === lg ? '#7F77DD' : 'rgba(127,119,221,0.2)', color: lang === lg ? 'white' : '#9F9AEC', fontSize: 11, padding: '4px 10px', borderRadius: 4, letterSpacing: 1 }}>{lg.toUpperCase()}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setModal('login')} style={{ ...s, border: '1px solid rgba(127,119,221,0.2)', color: '#9F9AEC', fontSize: 12, padding: '8px 16px', borderRadius: 6 }}>{l.login}</button>
          <button onClick={() => setModal('register')} style={{ ...s, background: '#534AB7', border: '1px solid #7F77DD', color: 'white', fontSize: 12, padding: '8px 16px', borderRadius: 6 }}>{l.register}</button>
        </div>
      </nav>
      <section style={{ position: 'relative', zIndex: 1, padding: '140px 24px 80px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#5DCAA5', letterSpacing: 4, marginBottom: 24 }}>{l.tag}</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(32px,6vw,64px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>{l.title}</h1>
        <p style={{ fontSize: 16, color: '#9F9AEC', lineHeight: 1.7, marginBottom: 40 }}>{l.sub}</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setModal('register')} style={{ ...s, background: 'linear-gradient(135deg,#534AB7,#7F77DD)', color: 'white', fontSize: 13, padding: '14px 32px', borderRadius: 8, letterSpacing: 1 }}>{l.cta}</button>
          <a href="/app/stories" style={{ background: 'none', border: '1px solid rgba(127,119,221,0.25)', color: '#9F9AEC', fontFamily: 'monospace', fontSize: 13, padding: '14px 32px', borderRadius: 8, letterSpacing: 1, textDecoration: 'none' }}>{l.explore}</a>
        </div>
      </section>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 48, padding: '0 24px 40px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
        {[{ n: s1, label: l.u }, { n: s2, label: l.st }, { n: s3, label: l.on }].map((st, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#7F77DD', display: 'block' }}>{st.n.toLocaleString()}</span>
            <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#555470', letterSpacing: 2 }}>{st.label}</span>
          </div>
        ))}
      </div>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(127,119,221,0.15),transparent)', margin: '0 24px 60px' }} />
      <div style={{ textAlign: 'center', marginBottom: 40, position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px,4vw,40px)', marginBottom: 10 }}>{lang === 'tk' ? 'Bu ýerde näme bar' : lang === 'ru' ? 'Что здесь есть' : lang === 'tr' ? 'Burada ne var' : "What's here"}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, padding: '0 24px 60px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {cards.map((card, i) => (
          <a key={i} href={card.href} style={{ background: '#0d0d1a', border: '1px solid rgba(127,119,221,0.12)', borderRadius: 12, padding: 28, textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <span style={{ fontSize: 28, marginBottom: 16, display: 'block' }}>{card.icon}</span>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, marginBottom: 10 }}>{card.title}</h3>
            <p style={{ fontSize: 13, color: '#9F9AEC', lineHeight: 1.6, marginBottom: 20 }}>{card.desc}</p>
            <span style={{ fontFamily: 'monospace', fontSize: 10, padding: '4px 10px', borderRadius: 4, background: `${card.color}20`, color: card.color, border: `1px solid ${card.color}35`, letterSpacing: 1 }}>{card.badge}</span>
          </a>
        ))}
      </div>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(127,119,221,0.15),transparent)', margin: '0 24px 60px' }} />
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ background: 'linear-gradient(135deg,rgba(127,119,221,0.07),rgba(29,158,117,0.04))', border: '1px solid rgba(127,119,221,0.15)', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <p style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: 4, color: '#5DCAA5', marginBottom: 16 }}>{l.daily}</p>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(18px,3vw,26px)', marginBottom: 24, lineHeight: 1.4 }}>{l.dq}</h3>
          <textarea placeholder={l.dp} style={{ width: '100%', background: 'rgba(7,7,15,0.6)', border: '1px solid rgba(127,119,221,0.2)', color: '#EEEDFE', fontFamily: 'Noto Sans, sans-serif', fontSize: 14, padding: '14px 16px', borderRadius: 8, outline: 'none', resize: 'none', height: 80, marginBottom: 12 }} />
          <button onClick={() => setModal('register')} style={{ ...s, background: 'linear-gradient(135deg,#534AB7,#7F77DD)', color: 'white', fontSize: 13, padding: '12px 28px', borderRadius: 8, letterSpacing: 1 }}>{l.db}</button>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <div style={{ width: 8, height: 8, background: '#ff6b6b', borderRadius: '50%' }} />
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#555470', letterSpacing: 3 }}>{l.live}</span>
        </div>
        {feeds.map((feed, i) => (
          <div key={i} style={{ background: '#0d0d1a', border: '1px solid rgba(127,119,221,0.1)', borderRadius: 12, padding: 22, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#534AB7,#1D9E75)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: 10, color: 'white' }}>{feed.code}</div>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#7F77DD' }}>Anon#{feed.id}</span>
            </div>
            <p style={{ fontSize: 14, color: '#EEEDFE', lineHeight: 1.7, marginBottom: 14 }}>{feed.text}</p>
            <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#555470' }}>♡ {feed.likes}</span>
          </div>
        ))}
      </div>
      <footer style={{ borderTop: '1px solid rgba(127,119,221,0.1)', padding: '40px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#7F77DD', marginBottom: 10 }}>Ψ GizlinDünya</div>
        <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#555470' }}>{l.footer}</p>
      </footer>
      {modal && (
        <div onClick={() => setModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(7,7,15,0.92)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#0d0d1a', border: '1px solid rgba(127,119,221,0.25)', borderRadius: 16, padding: 40, width: '90%', maxWidth: 400, position: 'relative' }}>
            <button onClick={() => setModal(null)} style={{ ...s, position: 'absolute', top: 16, right: 16, color: '#555470', fontSize: 20 }}>✕</button>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 24, marginBottom: 6 }}>{modal === 'login' ? l.login : l.register}</h3>
            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#555470', letterSpacing: 1, marginBottom: 24 }}>GIZLINDUANYA · ANONIM</p>
            <div style={{ background: 'rgba(29,158,117,0.08)', border: '1px solid rgba(29,158,117,0.15)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontFamily: 'monospace', fontSize: 11, color: '#5DCAA5', lineHeight: 1.6 }}>🔒 {l.nomail}</div>
            {[{ label: l.ul, type: 'text', ph: 'anon_####' }, { label: l.pl, type: 'password', ph: '••••••••' }].map((inp, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <label style={{ fontFamily: 'monospace', fontSize: 11, color: '#9F9AEC', letterSpacing: 1, display: 'block', marginBottom: 8 }}>{inp.label}</label>
                <input type={inp.type} placeholder={inp.ph} style={{ width: '100%', background: '#07070f', border: '1px solid rgba(127,119,221,0.2)', color: '#EEEDFE', fontFamily: 'monospace', fontSize: 13, padding: '12px 14px', borderRadius: 8, outline: 'none' }} />
              </div>
            ))}
            {modal === 'register' && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontFamily: 'monospace', fontSize: 11, color: '#9F9AEC', letterSpacing: 1, display: 'block', marginBottom: 8 }}>{l.sl}</label>
                <input type="text" placeholder={l.sp} style={{ width: '100%', background: '#07070f', border: '1px solid rgba(127,119,221,0.2)', color: '#EEEDFE', fontFamily: 'monospace', fontSize: 13, padding: '12px 14px', borderRadius: 8, outline: 'none' }} />
              </div>
            )}
            <button style={{ ...s, width: '100%', background: 'linear-gradient(135deg,#534AB7,#7F77DD)', color: 'white', fontSize: 13, padding: 14, borderRadius: 8, letterSpacing: 1, marginTop: 6 }}>{modal === 'login' ? l.login : l.register}</button>
            <p style={{ textAlign: 'center', marginTop: 18, fontFamily: 'monospace', fontSize: 11, color: '#555470' }}>
              {modal === 'login' ? l.na : l.ha}{' '}
              <span onClick={() => setModal(modal === 'login' ? 'register' : 'login')} style={{ color: '#7F77DD', cursor: 'pointer' }}>{modal === 'login' ? l.register : l.login}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
ENDOFFILE