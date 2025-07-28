import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  return (
    <div className="hero">
      <h1 className="video-text">
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
      <motion.h2 
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ margin: "-100px" }}
      >
        Wake up at your best every morning
      </motion.h2>
    </div>
  );
};

export default Hero;
