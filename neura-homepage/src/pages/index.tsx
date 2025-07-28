// pages/index.tsx
import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
import SleepMask from '@/components/SleepMask';
import GradientFade from '@/components/GradientFade'; // optional

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <SleepMask />
    </>
  );
}
