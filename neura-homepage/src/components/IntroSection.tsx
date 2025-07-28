import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const IntroSection = () => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <section className="intro-section">
      {/* NAVIGATION BAR */}
      <motion.nav
        className="intro-navbar"
        style={{
          position: 'absolute',
          top: '2rem', // Changed from 0.5rem to 2rem
          left: '10%',
          transform: 'translateX(-50%)',
          width: '1200px',
          padding: 0,
          background: 'transparent',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          border: '3px solid green' // TEST
        }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/science">Science</Link></li>
          <li><Link href="/team">Our Team</Link></li>
        </ul>
      </motion.nav>

      {/* MAIN INTRO CONTENT */}
      <div 
        className="intro-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '4rem',
          width: '100%',
          maxWidth: '1600px',
          marginTop: '12rem', // Changed from 35rem to 12rem
          paddingLeft: '4rem', // Added padding to move content right
          border: '5px solid orange' // TEST
        }}
      >
        {/* Left: Sleep Mask SVG */}
        <div className="headline-block">
          <motion.div
            className="intro-sleepmask-container"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="intro-mask-interactive-wrapper">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src="/images/mask-sleep-svgrepo-com.svg"
                  alt="Neura Sleep Mask"
                  width={700}
                  height={350}
                  className="intro-eyemask-image"
                />
              </motion.div>

              {/* Left circular button - EOG Electrode */}
              <div
                className="intro-circular-button intro-left-button"
                onMouseEnter={() => setHoveredArea('left')}
                onMouseLeave={() => setHoveredArea(null)}
              >
                {hoveredArea === 'left' && (
                  <motion.div
                    className="intro-hover-label intro-left-label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="intro-popup-content">
                      <div className="intro-popup-header">
                        <span className="intro-popup-icon">⚡</span>
                        <span className="intro-popup-title">EOG Sensor</span>
                      </div>
                      <p className="intro-popup-description">
                        Tracks eye movements during REM sleep.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Center circular button - Heart Rate Sensor */}
              <div
                className="intro-circular-button intro-center-button"
                onMouseEnter={() => setHoveredArea('center')}
                onMouseLeave={() => setHoveredArea(null)}
              >
                {hoveredArea === 'center' && (
                  <motion.div
                    className="intro-hover-label intro-center-label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="intro-popup-content">
                      <div className="intro-popup-header">
                        <span className="intro-popup-icon">❤️</span>
                        <span className="intro-popup-title">Heart Rate Sensor</span>
                      </div>
                      <p className="intro-popup-description">
                        Monitors heart rate changes during sleep stages.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right circular button - Temperature Sensor */}
              <div
                className="intro-circular-button intro-right-button"
                onMouseEnter={() => setHoveredArea('right')}
                onMouseLeave={() => setHoveredArea(null)}
              >
                {hoveredArea === 'right' && (
                  <motion.div
                    className="intro-hover-label intro-right-label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="intro-popup-content">
                      <div className="intro-popup-header">
                        <span className="intro-popup-icon">🌡️</span>
                        <span className="intro-popup-title">Temperature Sensor</span>
                      </div>
                      <p className="intro-popup-description">
                        Tracks skin temperature changes during sleep.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Smaller Paragraphs */}
        <div className="paragraph-block">
          <motion.h2
            className="intro-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Our Smart Sleeping Mask
          </motion.h2>
          
          <motion.p
            className="intro-text intro-text-small"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            You know those mornings – you slept a full 8 hours but <strong style={{ color: '#E34234' }}>still feel slow and tired</strong>? <strong style={{ color: '#E34234' }}>That's where Neura comes in</strong>.
          </motion.p>

          <motion.p
            className="intro-text intro-text-small"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Neura is a <strong style={{ color: '#E34234' }}>smart sleep mask</strong> that <strong style={{ color: '#E34234' }}>understands your sleep cycles</strong> and gently <strong style={{ color: '#E34234' }}>wakes you at the right moment</strong>.
          </motion.p>

          <motion.p
            className="intro-text intro-text-small"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            So every morning, you start your day at your <strong style={{ color: '#E34234' }}>best</strong>.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
