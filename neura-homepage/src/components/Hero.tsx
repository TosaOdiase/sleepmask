import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playing the video automatically on page load
    video.currentTime = 30;
    video.playbackRate = 1.5; // Set to 1.5x speed
    video.play();

    // Restart from 30 seconds when video ends
    const handleVideoEnd = () => {
      video.currentTime = 30;
      video.play();
    };

    video.addEventListener('ended', handleVideoEnd);
    
    return () => {
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  // Prevent scrolling up beyond the top - only when at the very top
  useEffect(() => {
    const preventScrollUp = (e: WheelEvent) => {
      // Only prevent scrolling up when we're at the very top of the page
      if (window.scrollY <= 0 && e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const preventTouchUp = (e: TouchEvent) => {
      // Only prevent touch scrolling up when at the very top
      if (window.scrollY <= 0) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Less aggressive event handling - only on specific events
    document.addEventListener('wheel', preventScrollUp, { passive: false });
    document.addEventListener('touchstart', preventTouchUp, { passive: false });

    return () => {
      document.removeEventListener('wheel', preventScrollUp);
      document.removeEventListener('touchstart', preventTouchUp);
    };
  }, []);

  // Slow down scrolling speed - only for scrolling DOWN and only when Hero is in view
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const slowScroll = (e: WheelEvent) => {
      // Only slow down scrolling when Hero section is visible (first 100vh)
      if (window.scrollY < window.innerHeight && e.deltaY > 0) { // Scrolling DOWN in Hero area
        if (isScrolling) return;
        
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        // Reduce scroll speed by 80% (make it 20% of normal speed)
        const scrollAmount = e.deltaY * 0.2;
        
        // Smooth scroll with reduced speed
        window.scrollBy({
          top: scrollAmount,
          behavior: 'smooth'
        });
        
        // Prevent default scroll behavior
        e.preventDefault();
        
        // Reset scrolling flag after animation
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 300);
      }
      // If not in Hero area or scrolling UP, do nothing - let it scroll normally
    };

    // Touch scroll slowing for mobile - only for scrolling DOWN in Hero area
    let lastTouchY = 0;
    let touchScrollTimeout: NodeJS.Timeout;

    const slowTouchScroll = (e: TouchEvent) => {
      // Only slow down touch scrolling when Hero section is visible
      if (window.scrollY >= window.innerHeight) return; // Not in Hero area
      
      const currentTouchY = e.touches[0].clientY;
      const touchDelta = lastTouchY - currentTouchY;
      lastTouchY = currentTouchY;
      
      // Only slow down scrolling DOWN (positive touchDelta means scrolling down)
      if (touchDelta > 5) { // Scrolling DOWN
        if (isScrolling) return;
        
        isScrolling = true;
        clearTimeout(touchScrollTimeout);
        
        // Reduce touch scroll speed by 80%
        const scrollAmount = touchDelta * 0.2;
        
        window.scrollBy({
          top: scrollAmount,
          behavior: 'smooth'
        });
        
        // Reset scrolling flag
        touchScrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 200);
      }
      // If scrolling UP (negative touchDelta), do nothing - let it scroll normally
    };

    document.addEventListener('wheel', slowScroll, { passive: false });
    document.addEventListener('touchmove', slowTouchScroll, { passive: false });

    return () => {
      document.removeEventListener('wheel', slowScroll);
      document.removeEventListener('touchmove', slowTouchScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(touchScrollTimeout);
    };
  }, []);

  return (
    <div className="hero">
      <Navigation />
      <h1 className="video-text">
        <video
          ref={videoRef}
          src="/videos/ink-ripple.mp4"
          muted
          playsInline
          className="video-mask"
          onLoadedMetadata={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 119; // Start at 1:59 (119 seconds)
            }
          }}
          onTimeUpdate={() => {
            if (videoRef.current && videoRef.current.currentTime >= 135) { // 2:15 = 135 seconds
              videoRef.current.currentTime = 119; // Reset to 1:59
            }
          }}
        />
        Neura
      </h1>
      <motion.h2 
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ margin: "-100px" }}
        style={{ color: "#F4E4BC" }}
      >
        Wake up at your best every morning
      </motion.h2>
    </div>
  );
};

export default Hero;
