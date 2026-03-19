import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GizlinDunya',
  description: 'Anonim platforma',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tk">
      <body style={{ margin: 0, background: '#07070f', color: '#EEEDFE' }}>
        {children}
      </body>
    </html>
  )
}
