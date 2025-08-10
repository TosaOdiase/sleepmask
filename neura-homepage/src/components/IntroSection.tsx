import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const IntroSection = () => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

  return (
    <section className="intro-section" style={{ paddingTop: "0" }}>
      {/* Title - Centered across entire page */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        top: "2rem",
        zIndex: 10
      }}>
        <motion.div
          initial={{ 
            opacity: 0, 
            y: 100, 
            scale: 0.5, 
            rotateX: -30,
            filter: "blur(8px)"
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotateX: 0,
            filter: "blur(0px)"
          }}
          viewport={{ once: false }}
          transition={{ 
            duration: 1.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3,
            scale: { duration: 1.2, ease: "easeOut" },
            rotateX: { duration: 1.0, ease: "easeOut" },
            filter: { duration: 0.8, ease: "easeOut" }
          }}
          style={{
            fontSize: "4.5rem",
            fontWeight: "bold",
            lineHeight: "1.2",
            color: "#F4E4BC",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            background: "transparent",
            transformStyle: "preserve-3d",
            textAlign: "center",
            whiteSpace: "nowrap"
          }}
        >
          Smart Sleep Mask
        </motion.div>
      </div>

      {/* MAIN INTRO CONTENT */}
      <div 
        className="intro-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          width: '100%',
          maxWidth: '1600px',
          padding: '0 4rem',
          position: 'relative',
          marginTop: '8rem'
        }}
      >
        {/* Left: SVG */}
        <div className="headline-block" style={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "center",
          width: "100%",
          textAlign: "center",
          position: "relative"
        }}>

          {/* SVG Container */}
          <motion.div
            className="intro-sleepmask-container"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            style={{ marginTop: "0rem" }}
          >
            <div className="intro-mask-interactive-wrapper">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.4 }}
              >
                <Image
                  src="/images/mask-sleep-svgrepo-com.svg"
                  alt="Neura Sleep Mask"
                  width={700}
                  height={350}
                  className="intro-eyemask-image"
                  style={{
                    filter: "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(750%) hue-rotate(359deg) brightness(103%) contrast(107%)"
                  }}
                />
              </motion.div>

              {/* Left circular button - EOG Electrode */}
              <div
                className="intro-circular-button intro-left-button"
                onMouseEnter={() => setHoveredArea('left')}
                onMouseLeave={() => setHoveredArea(null)}
                style={{
                  borderColor: "#0D3147",
                  backgroundColor: "#0D3147",
                  width: "45px",
                  height: "45px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 0 0 rgba(244, 228, 188, 0)",
                  left: "4%",
                  top: "64%",
                  transform: "none"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#F4E4BC";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(244, 228, 188, 0.6)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#0D3147";
                  e.currentTarget.style.borderColor = "#0D3147";
                  e.currentTarget.style.boxShadow = "0 0 0 rgba(244, 228, 188, 0)";
                }}
              />

              {/* Center circular button - Heart Rate Sensor */}
              <div
                className="intro-circular-button intro-center-button"
                onMouseEnter={() => setHoveredArea('center')}
                onMouseLeave={() => setHoveredArea(null)}
                style={{
                  borderColor: "#0D3147",
                  backgroundColor: "#0D3147",
                  width: "45px",
                  height: "45px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 0 0 rgba(244, 228, 188, 0)",
                  transform: "translate(-50%, -60%)",
                  left: "52%",
                  top: "48%"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#F4E4BC";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(244, 228, 188, 0.6)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#0D3147";
                  e.currentTarget.style.borderColor = "#0D3147";
                  e.currentTarget.style.boxShadow = "0 0 0 rgba(244, 228, 188, 0)";
                }}
              />

              {/* Right circular button - Temperature Sensor */}
              <div
                className="intro-circular-button intro-right-button"
                onMouseEnter={() => setHoveredArea('right')}
                onMouseLeave={() => setHoveredArea(null)}
                style={{
                  borderColor: "#0D3147",
                  backgroundColor: "#0D3147",
                  width: "45px",
                  height: "45px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 0 0 rgba(244, 228, 188, 0)",
                  transform: "translateY(-50%)",
                  right: "3%",
                  top: "67%"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#F4E4BC";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(244, 228, 188, 0.6)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#0D3147";
                  e.currentTarget.style.borderColor = "#0D3147";
                  e.currentTarget.style.boxShadow = "0 0 0 rgba(244, 228, 188, 0)";
                }}
              />
            </div>
          </motion.div>

        </div>

        {/* Right: Text Content */}
        <div className="text-container" style={{ 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center", 
          alignItems: "flex-start",
          width: "100%",
          height: "500px",
          position: "relative"
        }}>
          {/* Default Subtitle */}
          {!hoveredArea && (
            <motion.p
              className="intro-text intro-text-small"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              style={{
                fontSize: "3rem",
                lineHeight: "1.6",
                color: "#F4E4BC",
                maxWidth: "600px",
                textAlign: "left",
                position: "absolute",
                top: "25%",
                transform: "translateY(-50%)"
              }}
            >
              Wake up feeling refreshed, not groggy.<br />Our mask wakes you at the <span style={{ color: "#ffffff", fontWeight: "bold" }}>perfect</span> moment.
            </motion.p>
          )}

          {/* Sensor Information (when hovering) */}
          {hoveredArea && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "2rem",
                position: "absolute",
                top: "35%",
                transform: "translateY(-50%)"
              }}
            >
              {/* Sensor Header */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#F4E4BC",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  margin: "0",
                  lineHeight: "1.2"
                }}
              >
                {hoveredArea === 'left' && 'EOG Sensor'}
                {hoveredArea === 'center' && 'Heart Rate Sensor'}
                {hoveredArea === 'right' && 'Temperature Sensor'}
              </motion.h2>

              {/* Sensor Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{
                  fontSize: "1.8rem",
                  lineHeight: "1.6",
                  color: "#ffffff",
                  margin: "0",
                  maxWidth: "600px",
                  opacity: 0.9
                }}
              >
                {hoveredArea === 'left' && 'Tracks eye movements during REM sleep to monitor sleep quality and detect dream phases.'}
                {hoveredArea === 'center' && 'Monitors heart rate changes during sleep stages to analyze sleep patterns and stress levels.'}
                {hoveredArea === 'right' && 'Tracks skin temperature changes during sleep to optimize sleep environment and comfort.'}
              </motion.p>
            </motion.div>
          )}
        </div>


      </div>
    </section>
  );
};

export default IntroSection;
