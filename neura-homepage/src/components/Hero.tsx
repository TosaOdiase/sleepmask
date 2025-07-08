import React, { useRef, useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [targetRate, setTargetRate] = useState(1.0);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start playing the video automatically on page load
    video.currentTime = 30;
    video.play();

    const handleScroll = () => {
      if (!video) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const heroHeight = windowHeight; // Hero is 100vh

      // Calculate scroll progress through the hero section (0 to 1)
      const scrollProgress = Math.min(scrollY / heroHeight, 1);
      
      // Base playback rate (1x speed)
      let baseRate = 1.0;
      
      // Slow down on hover (0.5x speed)
      if (isHovering) {
        baseRate = 0.5;
      }
      
      // Slow down more when scrolling (additional 0.3x reduction)
      const scrollSlowdown = scrollProgress * 0.3;
      const finalRate = Math.max(baseRate - scrollSlowdown, 0.2); // Minimum 0.2x speed
      
      setTargetRate(finalRate);
    };

    // Smooth playback rate transition
    const smoothTransition = () => {
      if (!video) return;
      
      const currentRate = video.playbackRate;
      const difference = targetRate - currentRate;
      
      if (Math.abs(difference) > 0.005) {
        video.playbackRate = currentRate + (difference * 0.05); // Much smoother interpolation
        requestAnimationFrame(smoothTransition);
      } else {
        video.playbackRate = targetRate;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set playback rate
    handleScroll();
    
    // Start smooth transition
    smoothTransition();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHovering, targetRate]);

  return (
    <div className="hero">
      <h1
        className={`video-text ${isHovering ? 'playing' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src="/videos/ink-ripple.mp4"
          loop
          muted
          playsInline
          className="video-mask"
        />
        Neura
      </h1>
    </div>
  );
};

export default Hero;
