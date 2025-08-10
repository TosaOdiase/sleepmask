// pages/_app.tsx
import '@/styles/globals.css'
import '../styles/hero.css';
import '../styles/gradientFade.css';
import '../styles/intro-combined.css';
import type { AppProps } from 'next/app'
import { DM_Sans } from 'next/font/google'
import { useEffect } from 'react'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
})

export default function MyApp({ Component, pageProps }: AppProps) {


  return (
    <main className={dmSans.className} style={{ 
      margin: 0, 
      padding: 0, 
      minHeight: '100vh',
      width: '100%'
    }}>
      <Component {...pageProps} />
    </main>
  )
}
