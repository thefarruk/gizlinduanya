'use client'

import { useState } from 'react'

export default function StoriesPage() {
  const [stories] = useState([])
  return (
    <main style={{ minHeight: '100vh', background: '#07070f', color: '#EEEDFE', padding: '100px 24px', fontFamily: 'monospace' }}>
      <h1>Stories</h1>
    </main>
  )
}
