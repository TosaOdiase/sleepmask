// pages/index.tsx
import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
import AppSection from '@/components/AppSection';
import AppSectionExtended from '@/components/AppSectionExtended';
import AppSectionStatistics from '@/components/AppSectionStatistics';
import Science from '@/components/Science';
import Science4Panel from '@/components/science-4-panel';
import ScienceSummaryPage from '@/components/science-summary-page';

import MeetTheTeam from '@/components/MeetTheTeam';

import Navigation from '@/components/Navigation';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const introSection = document.getElementById('intro-section');
    const appSection = document.getElementById('app-section');
    const scienceSection = document.getElementById('science');
    const teamSection = document.getElementById('meet-the-team');
    
    if (!introSection) {
      console.log('Intro section not found');
      return;
    }

    if (!appSection) {
      console.log('App section not found');
      return;
    }

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
  }, []);

  return (
    <>
      <Navigation />
      <Hero />
      <section id="intro-section" className="intro-section">
        <IntroSection />
      </section>
      <div className="spacer-1"></div>
      <section id="app-section" className="app-section">
        <AppSection />
      </section>
      <div className="spacer-2"></div>
      <div className="app-section-extended">
        <AppSectionExtended />
      </div>
      <div className="spacer-3"></div>
      <div className="app-section-statistics">
        <AppSectionStatistics />
      </div>
      <div className="spacer-4"></div>
      <section id="science" className="science-section">
        <Science />
      </section>
      <div className="spacer-5"></div>
      <div className="science-4-panel-section">
        <Science4Panel />
      </div>
      <div className="spacer-6"></div>
      <div className="science-summary-page-section">
        <ScienceSummaryPage />
      </div>
      <div className="spacer-7"></div> 
      <section id="meet-the-team" className="meet-the-team-section">
        <MeetTheTeam />
      </section>
    </>
  );
}