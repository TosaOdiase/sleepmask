import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const Science4Panel: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [hasScrolledThroughSection, setHasScrolledThroughSection] = useState(false);
  const isInView = useInView(containerRef, {
    margin: "-10% 0px -50% 0px", // More targeted to center of screen
    once: true,
    amount: 0.3 // Wait until 50% is visible before activating horizontal scroll
  });

  // Load localStorage value after mount to prevent hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('hasScrolledThroughSection') === 'true';
      if (storedValue !== hasScrolledThroughSection) {
        setHasScrolledThroughSection(storedValue);
      }
    }
  }, [hasScrolledThroughSection]);



  // Scroll sensitivity and steps
  const SENSOR_COUNT = 4;
  
  const MAX_SCROLL_POSITION = 120; // Changed from 200 to 120 - more compact for 6-unit delays
  // Each section: 6 units reveal + 6 units delay + 6 units overlap = 18 units per sensor
  const SCROLL_STEPS_PER_SENSOR = 30; // 120 / 4 = 30 per section, divided into 18 + 12 buffer
  const scrollStep = 0.5; // Increased from 1 to 3 for more responsive reverse scrolling


  // Handle horizontal scroll only when section is in view
  useEffect(() => {
    // Don't add event listeners if section is not in view or animation is complete
    if (!isInView || scrollPosition >= MAX_SCROLL_POSITION) {
      return;
    }

    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Check if we're actually on the 4-panel section (lower part)
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Only apply scroll rules when the section is more prominently in view (lower part)
      // This means the top of the section should be in the lower third of the viewport
      const isOnSection = rect.top < viewportHeight * 0.2 && rect.bottom > viewportHeight * 0.2;
      
      // If we're not on the section, don't interfere with scrolling at all
      if (!isOnSection) {
        return;
      }
      
      // Once animation is complete (100%), don't interfere with scrolling at all
      if (scrollPosition >= MAX_SCROLL_POSITION) {
        setHasScrolledThroughSection(true);
        localStorage.setItem('hasScrolledThroughSection', 'true');
        return; // Don't prevent default, let browser handle normal scrolling
      }
      
      // If we're at the top and can scroll up, allow default scroll behavior for previous page navigation
      if (scrollPosition <= 0 && e.deltaY < 0 && hasScrolledThroughSection) {
        return; // Allow default behavior to scroll to the previous page
      }

      // Handle reverse scrolling when we're at the start but haven't been through the section yet
      if (scrollPosition <= 0 && e.deltaY < 0 && !hasScrolledThroughSection) {
        e.preventDefault();
        e.stopPropagation();
        setScrollPosition(MAX_SCROLL_POSITION); // Force horizontal scroll
        return;
      }

      // Prevent default behavior and stop propagation for horizontal scroll
      e.preventDefault();
      e.stopPropagation();

      // Avoid multiple scroll events firing too quickly
      if (isScrolling) return;
      isScrolling = true;

      // Mark that we've scrolled through the section
      if (scrollPosition > 0) {
        setHasScrolledThroughSection(true);
        localStorage.setItem('hasScrolledThroughSection', 'true');
      }

      // Translate vertical scroll to horizontal sensor movement
      const scrollDirection = e.deltaY > 0 ? 1 : -1;

      // Use functional update to get current scrollPosition value
      setScrollPosition(prevPosition => {
        const newPosition = Math.max(0, Math.min(MAX_SCROLL_POSITION, prevPosition + (scrollDirection * scrollStep)));
        // Ensure we never exceed MAX_SCROLL_POSITION to stop animations at 100%
        return Math.min(newPosition, MAX_SCROLL_POSITION);
      });

      // Reset scrolling flag after a delay
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Check if we're actually on the 4-panel section (lower part)
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Only apply scroll rules when the section is more prominently in view (lower part)
      // This means the top of the section should be in the lower third of the viewport
      const isOnSection = rect.top < viewportHeight * 0.3 && rect.bottom > viewportHeight * 0.2;
      
      // If we're not on the section, don't interfere with scrolling at all
      if (!isOnSection) {
        return;
      }
      
      // Once animation is complete (100%), don't interfere with scrolling at all
      if (scrollPosition >= MAX_SCROLL_POSITION) {
        setHasScrolledThroughSection(true);
        localStorage.setItem('hasScrolledThroughSection', 'true');
        return; // Don't prevent default, let browser handle normal scrolling
      }
      
      // If we're at the top and can scroll up, allow default scroll behavior for previous page navigation
      if (scrollPosition <= 0 && hasScrolledThroughSection) {
        return; // Allow default behavior to scroll to the previous page
      }

      // Handle reverse scrolling when we're at the start but haven't been through the section yet
      if (scrollPosition <= 0 && !hasScrolledThroughSection) {
        e.preventDefault();
        e.stopPropagation();
        setScrollPosition(MAX_SCROLL_POSITION); // Force horizontal scroll
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();
      
      if (isScrolling) return;
      isScrolling = true;
      
      // Mark that we've scrolled through the section
      if (scrollPosition > 0) {
        setHasScrolledThroughSection(true);
        localStorage.setItem('hasScrolledThroughSection', 'true'); // Persist to localStorage
      }
      
      const touch = e.touches[0];
      const touchDelta = touch.clientX * 0.01; // Touch sensitivity for horizontal movement
      
      // Use functional update to get current scrollPosition value
      setScrollPosition(prevPosition => {
        const newPosition = Math.max(0, Math.min(MAX_SCROLL_POSITION, prevPosition + touchDelta));
        return newPosition;
      });
      
      // Reset scrolling flag after a delay
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    // Add event listeners with capture to ensure they're handled first
    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });

    return () => {
      document.removeEventListener('wheel', handleWheel, { capture: true });
      document.removeEventListener('touchmove', handleTouchMove, { capture: true });
      clearTimeout(scrollTimeout);
    };
  }, [isInView, scrollPosition]); // Added scrollPosition back to dependencies to react to completion

  // Calculate current sensor index based on scroll position - FIXED
  const getCurrentSensorIndex = () => {
    // Calculate the base sensor index
    const baseSensorIndex = Math.floor(scrollPosition / SCROLL_STEPS_PER_SENSOR);
    
    // If we're in a delay phase, stay on the current sensor
    const currentSensorEnd = (baseSensorIndex + 1) * SCROLL_STEPS_PER_SENSOR;
    const delayPhase = 3; // Exactly 3 scroll units for delay
    const nextSensorTrigger = currentSensorEnd + delayPhase;
    
    // If we're in the delay phase, don't advance to next sensor yet
    if (scrollPosition >= currentSensorEnd && scrollPosition < nextSensorTrigger) {
      return baseSensorIndex; // Stay on current sensor during delay
    }
    
    return Math.min(baseSensorIndex, SENSOR_COUNT - 1);
  };
  
  const currentSensorIndex = getCurrentSensorIndex();
  
  // Calculate checkpoint-based progress (only grows when reaching sensor checkpoints)
  const getCheckpointProgress = () => {
    const currentSensorStart = currentSensorIndex * SCROLL_STEPS_PER_SENSOR;
    const currentSensorEnd = (currentSensorIndex + 1) * SCROLL_STEPS_PER_SENSOR;
    
    // If we're at the start of a sensor, show previous progress
    if (scrollPosition <= currentSensorStart) {
      return (currentSensorIndex / SENSOR_COUNT) * 100;
    }
    
    // If we're at the end of a sensor, show full progress for that sensor
    if (scrollPosition >= currentSensorEnd) {
      return ((currentSensorIndex + 1) / SENSOR_COUNT) * 100;
    }
    
    // Calculate progress within current sensor (smooth transition)
    const progressWithinSensor = (scrollPosition - currentSensorStart) / SCROLL_STEPS_PER_SENSOR;
    const baseProgress = (currentSensorIndex / SENSOR_COUNT) * 100;
    const sensorProgress = (1 / SENSOR_COUNT) * 100 * progressWithinSensor;
    
    return baseProgress + sensorProgress;
  };
  
  const progressPercentage = getCheckpointProgress();

  // Define sensors array
  const sensors = [
    {
      name: "Temperature Sensor",
      icon: "/images/temperature.svg",
      description: "A temperature sensor tracks small changes in your skin temperature while you sleep. These changes can help tell what stage of sleep you're in – like light sleep, deep sleep, or REM."
    },
    {
      name: "Heart Rate Sensor",
      icon: "/images/heart rate sensor.svg", 
      description: "Your heart rate naturally changes during different sleep stages. By tracking it, we can better understand how deeply you're sleeping."
    },
    {
      name: "Accelerometer",
      icon: "/images/accelerometer.svg",
      description: "An accelerometer senses your movements while you sleep. Tossing, turning, or staying still all give clues about your sleep stage."
    },
    {
      name: "EOG Sensor",
      icon: "/images/eog sensor.svg",
      description: "The EOG sensor tracks your eye movements. Fast eye movement means you're in REM sleep - the dreaming stage."
    }
  ];

  // Calculate visibility for progressive grid layout
  const getProgressiveGridVisibility = (sensorIndex: number) => {
    // Clamp scroll position to prevent animations from continuing past 100%
    const clampedScrollPosition = Math.min(scrollPosition, MAX_SCROLL_POSITION);
    
    // Each sensor gets its own scroll section
    const sensorStart = sensorIndex * (MAX_SCROLL_POSITION / 4); // 0, 30, 60, 90
    const sensorEnd = (sensorIndex + 1) * (MAX_SCROLL_POSITION / 4); // 30, 60, 90, 120
    
    if (clampedScrollPosition <= sensorStart) {
      return 0; // Sensor not visible yet
    }
    
    if (clampedScrollPosition >= sensorEnd) {
      return 1; // Sensor fully visible
    }
    
    // Calculate visibility within sensor's scroll range
    const progressWithinSensor = (clampedScrollPosition - sensorStart) / (sensorEnd - sensorStart);
    return Math.min(progressWithinSensor, 1);
  };

  // Get visibility for each sensor
  const sensorVisibilities = sensors.map((_, index) => getProgressiveGridVisibility(index));

  // Calculate grid layout based on visible sensors
  const getGridLayout = () => {
    const visibleSensors = sensorVisibilities.map((visibility, index) => ({
      index,
      visibility,
      isVisible: visibility > 0
    })).filter(sensor => sensor.isVisible);
    
    return visibleSensors;
  };

  const gridLayout = getGridLayout();

  // If there's an error, show a simple fallback
  if (hasError) {
    return (
      <section
        className="science-4-panel-section"
        style={{
          minHeight: "100vh",
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "5vh 5rem",
          background: "transparent"
        }}
      >
        <h2 style={{ color: "#ffffff", fontSize: "3rem", marginBottom: "2rem" }}>
          Our Powerful Sensors
        </h2>
        <p style={{ color: "#ffffff", fontSize: "1.2rem", textAlign: "center" }}>
          Temperature, Heart Rate, Accelerometer, and EOG sensors working together to understand your sleep.
        </p>
      </section>
    );
  }

  // Sensor names for progress bar labels
  const sensorNames = ["Temperature", "Heart Rate", "Accelerometer", "EOG"];

  return (
    <section
      ref={containerRef}
      className="science-4-panel-section"
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5vh 5rem"
      }}
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          color: "#ffffff",
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          marginBottom: "4vh"
        }}
      >
        Our Powerful Sensors
      </motion.h2>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{
          width: "100%",
          maxWidth: "500px",
          marginBottom: "4vh",
          marginTop: "-2vh"
        }}
      >
        <div style={{
          width: "100%",
          height: "4px",
          backgroundColor: "rgba(244, 228, 188, 0.2)",
          borderRadius: "2px",
          margin: "0.5rem 0",
          position: "relative",
          overflow: "hidden"
        }}>
          <motion.div
            style={{
              height: "100%",
              backgroundColor: "#F4E4BC",
              borderRadius: "2px",
              width: "100%"
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut",
              type: "spring",
              stiffness: 150,
              damping: 15
            }}
          />
        </div>
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.3rem",
          color: "#F4E4BC",
          fontSize: "0.65rem",
          opacity: 0.8
        }}>
          {sensorNames.map((name, index) => (
            <span
              key={index}
              style={{
                opacity: index === currentSensorIndex ? 1 : 0.5,
                fontWeight: index === currentSensorIndex ? "bold" : "normal",
                transition: "all 0.3s ease"
              }}
            >
              {name}
            </span>
          ))}
        </div>
        

        

        

        

      </motion.div>

      {/* Progressive Grid Sensor Layout */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          marginTop: "-2rem"
        }}
      >
        {/* 2x2 Grid Container */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "2rem",
          width: "100%",
          height: "100%",
          maxWidth: "800px"
        }}>
          {/* Sensor 1 - Top Left */}
          <motion.div
            key="sensor-0"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: sensorVisibilities[0],
              scale: 0.8 + (sensorVisibilities[0] * 0.2),
              y: 50 - (sensorVisibilities[0] * 50)
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "1.5rem",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <motion.img
              src={sensors[0].icon}
              alt={sensors[0].name}
              style={{ 
                width: "80px",
                height: "80px",
                marginBottom: "1rem",
                filter: "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(750%) hue-rotate(359deg) brightness(103%) contrast(107%)"
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 0.8 + (sensorVisibilities[0] * 0.2) }}
              transition={{ duration: 0.2, delay: 0.05 }}
            />
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sensorVisibilities[0], y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                fontWeight: "600"
              }}
            >
              {sensors[0].name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sensorVisibilities[0], y: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              style={{
                color: "#F5E6D3",
                fontSize: "0.9rem",
                lineHeight: "1.4"
              }}
            >
              {sensors[0].description}
            </motion.p>
          </motion.div>

          {/* Sensor 2 - Top Right */}
          <motion.div
            key="sensor-1"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: sensorVisibilities[1],
              scale: 0.8 + (sensorVisibilities[1] * 0.2),
              y: 50 - (sensorVisibilities[1] * 50)
            }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "1.5rem",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <motion.img
              src={sensors[1].icon}
              alt={sensors[1].name}
              style={{ 
                width: "80px",
                height: "80px",
                marginBottom: "1rem",
                filter: "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(750%) hue-rotate(359deg) brightness(103%) contrast(107%)"
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 0.8 + (sensorVisibilities[1] * 0.2) }}
              transition={{ duration: 0.2, delay: 0.1 }}
            />
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sensorVisibilities[1], y: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                fontWeight: "600"
              }}
            >
              {sensors[1].name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sensorVisibilities[1], y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              style={{
                color: "#F5E6D3",
                fontSize: "0.9rem",
                lineHeight: "1.4"
              }}
            >
              {sensors[1].description}
            </motion.p>
          </motion.div>

          {/* Sensor 3 - Bottom Left */}
          <motion.div
            key="sensor-2"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: sensorVisibilities[2],
              scale: 0.8 + (sensorVisibilities[2] * 0.2),
              y: 50 - (sensorVisibilities[2] * 50)
            }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "1.5rem",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <motion.img
              src={sensors[2].icon}
              alt={sensors[2].name}
              style={{ 
                width: "80px",
                height: "80px",
                marginBottom: "1rem",
                filter: "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(750%) hue-rotate(359deg) brightness(103%) contrast(107%)"
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 0.8 + (sensorVisibilities[2] * 0.2) }}
              transition={{ duration: 0.2, delay: 0.15 }}
            />
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sensorVisibilities[2], y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                fontWeight: "600"
              }}
            >
              {sensors[2].name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sensorVisibilities[2], y: 0 }}
              transition={{ duration: 0.2, delay: 0.25 }}
              style={{
                color: "#F5E6D3",
                fontSize: "0.9rem",
                lineHeight: "1.4"
              }}
            >
              {sensors[2].description}
            </motion.p>
          </motion.div>

          {/* Sensor 4 - Bottom Right */}
          <motion.div
            key="sensor-3"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: sensorVisibilities[3],
              scale: 0.8 + (sensorVisibilities[3] * 0.2),
              y: 50 - (sensorVisibilities[3] * 50)
            }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.15 }}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "1.5rem",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <motion.img
              src={sensors[3].icon}
              alt={sensors[3].name}
              style={{ 
                width: "80px",
                height: "80px",
                marginBottom: "1rem",
                filter: "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(750%) hue-rotate(359deg) brightness(103%) contrast(107%)"
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 0.8 + (sensorVisibilities[3] * 0.2) }}
              transition={{ duration: 0.2, delay: 0.2 }}
            />
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sensorVisibilities[3], y: 0 }}
              transition={{ duration: 0.2, delay: 0.25 }}
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                marginBottom: "0.5rem",
                fontWeight: "600"
              }}
            >
              {sensors[3].name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: sensorVisibilities[3], y: 0 }}
              transition={{ duration: 0.2, delay: 0.3 }}
              style={{
                color: "#F5E6D3",
                fontSize: "0.9rem",
                lineHeight: "1.4"
              }}
            >
              {sensors[3].description}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Science4Panel; 