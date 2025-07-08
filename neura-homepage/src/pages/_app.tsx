// pages/_app.tsx
import '../styles/hero.css';
import '../styles/intropage.css';
import '../styles/gradientFade.css';
import { DM_Sans } from 'next/font/google';

import type { AppProps } from 'next/app';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-dm-sans',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={dmSans.className}>
      <Component {...pageProps} />
    </main>
  );
}
