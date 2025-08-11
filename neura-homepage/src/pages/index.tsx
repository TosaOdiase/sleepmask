// pages/index.tsx
import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
import AppSection from '@/components/AppSection';
import AppSectionExtended from '@/components/AppSectionExtended';
import AppSectionStatistics from '@/components/AppSectionStatistics';
import ComingSoon from '@/components/ComingSoon';
import Science from '@/components/Science';
import Science4Panel from '@/components/science-4-panel';
import ScienceSummaryPage from '@/components/science-summary-page';

import MeetTheTeam from '@/components/MeetTheTeam';

import Navigation from '@/components/Navigation';
import { useEffect } from 'react';
import { backgroundManager, SECTION_BACKGROUNDS } from '@/utils/backgroundManager';

export default function Home() {
  useEffect(() => {
    const introSection = document.getElementById('intro-section');
    const appSection = document.getElementById('app-section');
    
    if (!introSection) {
      console.log('Intro section not found');
      return;
    }

    if (!appSection) {
      console.log('App section not found');
      return;
    }

    // Register sections with the background manager
    backgroundManager.registerSection('intro', introSection, SECTION_BACKGROUNDS.intro);
    backgroundManager.registerSection('app', appSection, SECTION_BACKGROUNDS['app-extended']);

    // Check if we have a hash in the URL and scroll to the appropriate section
    if (window.location.hash) {
      // Small delay to ensure the page is fully loaded
      setTimeout(() => {
        const hash = window.location.hash.substring(1); // Remove the #
        
        if (hash === 'intro') {
          introSection.scrollIntoView({ behavior: 'auto' });
        } else if (hash === 'app') {
          const appSection = document.getElementById('app-section');
          if (appSection) {
            appSection.scrollIntoView({ behavior: 'auto' });
          }
        } else if (hash === 'science') {
          const scienceSection = document.getElementById('science');
          if (scienceSection) {
            scienceSection.scrollIntoView({ behavior: 'auto' });
          }
        } else if (hash === 'team') {
          const teamSection = document.getElementById('meet-the-team');
          if (teamSection) {
            teamSection.scrollIntoView({ behavior: 'auto' });
          }
        }
        
        // Clear the hash from the URL
        window.history.replaceState(null, '', window.location.pathname);
      }, 100);
    }

    return () => {
      backgroundManager.unregisterSection('intro');
      backgroundManager.unregisterSection('app');
    };
  }, []);

  return (
    <>
      <Navigation />
      <Hero />
      <section id="intro-section">
        <IntroSection />
      </section>
      <div style={{ height: "200px", background: "#065787" }}></div>
      <section id="app-section">
        <AppSection />
      </section>
      <div style={{ height: "200px", background: "#0D3147" }}></div>
      <AppSectionExtended />
      <div style={{ height: "200px", background: "#0D3147" }}></div>
      <AppSectionStatistics />
      <div style={{ height: "200px", background: "#0D3147" }}></div>
      <ComingSoon />
      <div style={{ height: "200px", background: "#0D3147" }}></div>
      <section id="science">
        <Science />
      </section>
      <div style={{ height: "5px", background: "#0D3147" }}></div>
      <Science4Panel />
      <div style={{ height: "200px", background: "#0D3147" }}></div>
      <ScienceSummaryPage />
       <div style={{ height: "200px", background: "#0D3147" }}></div> 
      <section id="meet-the-team">
        <MeetTheTeam />
      </section>
    </>
  );
}
