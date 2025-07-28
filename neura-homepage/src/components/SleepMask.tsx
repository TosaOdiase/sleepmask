import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SleepMask: React.FC = () => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <motion.section 
      className="sleepmask-section"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.3 }}
      viewport={{ margin: "-200px" }}
    >
      <motion.div
        className="eyemask-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ margin: "-100px" }}
      >
        <div className="mask-interactive-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ margin: "-50px" }}
          >
            <Image
              src="/images/mask-sleep-svgrepo-com.svg"
              alt="Neura Sleep Mask"
              width={800}
              height={400}
              className="eyemask-image"
            />
          </motion.div>
          
          {/* Left circular button - EOG Electrode */}
          <div 
            className="circular-button left-button"
            onMouseEnter={() => setHoveredArea('left')}
            onMouseLeave={() => setHoveredArea(null)}
          >
            {hoveredArea === 'left' && (
              <motion.div 
                className="hover-label left-label"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="popup-content">
                  <div className="popup-header">
                    <span className="popup-icon">⚡</span>
                    <span className="popup-title">EOG Sensor</span>
                  </div>
                  <p className="popup-description">
                    The EOG sensor tracks your eye movements. Fast eye movement means you're in REM sleep - the dreaming stage.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Center circular button - Sunrise Lamp */}
          <div 
            className="circular-button center-button"
            onMouseEnter={() => setHoveredArea('center')}
            onMouseLeave={() => setHoveredArea(null)}
          >
            {hoveredArea === 'center' && (
              <motion.div 
                className="hover-label center-label"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="popup-content">
                  <div className="popup-header">
                    <span className="popup-icon">❤️</span>
                    <span className="popup-title">Heart Rate Sensor</span>
                  </div>
                  <p className="popup-description">
                    Your heart rate naturally changes during different sleep stages. By tracking it, we can better understand how deeply you're sleeping.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right circular button - Heart Rate + Temperature Sensor */}
          <div 
            className="circular-button right-button"
            onMouseEnter={() => setHoveredArea('right')}
            onMouseLeave={() => setHoveredArea(null)}
          >
            {hoveredArea === 'right' && (
              <motion.div 
                className="hover-label right-label"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="popup-content">
                  <div className="popup-header">
                    <span className="popup-icon">🌡️</span>
                    <span className="popup-title">Temperature Sensor</span>
                  </div>
                  <p className="popup-description">
                    A temperature sensor tracks small changes in your skin temperature while you sleep. These changes can help tell what stage of sleep you're in – like light sleep, deep sleep, or REM.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SleepMask;
