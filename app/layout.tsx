import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GizlinDünya — Anonim Platforma',
  description: 'Anonim stories, confessions, and connections',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=IBM+Plex+Mono:wght@300;400;500&family=Noto+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '14px 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', background: 'rgba(7,7,15,0.9)',
          backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(127,119,221,0.12)'
        }}>
          <a href="/" style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 500, color: '#EEEDFE', textDecoration: 'none', letterSpacing: 2 }}>
            Ψ GizlinDünya
          </a>
          <div style={{ display: 'flex', gap: 6 }}>
            <a href="/stories" style={{ color: '#9F9AEC', textDecoration: 'none', fontFamily: 'monospace', fontSize: 13, padding: '6px 12px', border: '1px solid rgba(127,119,221,0.15)', borderRadius: 6 }}>📖</a>
            <a href="/confessions" style={{ color: '#9F9AEC', textDecoration: 'none', fontFamily: 'monospace', fontSize: 13, padding: '6px 12px', border: '1px solid rgba(127,119,221,0.15)', borderRadius: 6 }}>🤫</a>
            <a href="/questions" style={{ color: '#9F9AEC', textDecoration: 'none', fontFamily: 'monospace', fontSize: 13, padding: '6px 12px', border: '1px solid rgba(127,119,221,0.15)', borderRadius: 6 }}>❓</a>
            <a href="/dating" style={{ color: '#9F9AEC', textDecoration: 'none', fontFamily: 'monospace', fontSize: 13, padding: '6px 12px', border: '1px solid rgba(127,119,221,0.15)', borderRadius: 6 }}>💬</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
