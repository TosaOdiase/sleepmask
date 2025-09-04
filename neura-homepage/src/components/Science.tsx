import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { backgroundManager, COMPONENT_BACKGROUNDS } from '@/utils/backgroundManager';

const Science: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-200px 0px -100px 0px",
    once: false,
    amount: 0.3
  });

  useEffect(() => {
    if (containerRef.current) {
      backgroundManager.registerSection('science', containerRef.current, COMPONENT_BACKGROUNDS.Science);
    }

    return () => {
      backgroundManager.unregisterSection('science');
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    // Reset all underlines to initial state
    const highlightedPhrases = document.querySelectorAll('.highlighted-phrase');
    highlightedPhrases.forEach((phrase) => {
      const afterElement = phrase as HTMLElement;
      if (afterElement.style) {
        afterElement.style.setProperty('--phrase-index', '0');
      }
    });

    // Trigger underline animations with staggered timing
    highlightedPhrases.forEach((phrase, index) => {
      const afterElement = phrase as HTMLElement;
      if (afterElement.style) {
        afterElement.style.setProperty('--phrase-index', index.toString());
      }
    });

    // Force animation restart by temporarily removing the class and re-adding it
    const scienceSection = document.querySelector('.science-section');
    if (scienceSection) {
      scienceSection.classList.remove('science-section');
      setTimeout(() => {
        scienceSection.classList.add('science-section');
      }, 10);
    }
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="science-section"
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
      {/* Background Sleep Mask */}
      <motion.div
        initial={{ filter: "blur(0px)", opacity: 0.8 }}
        animate={isInView ? { filter: "blur(3px)", opacity: 0.15 } : { filter: "blur(0px)", opacity: 0.8 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        viewport={{ once: true }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1000px",
          height: "1000px",
          zIndex: 0
        }}
      >
        <img 
          src="/images/sleep-mask.png"
          alt="Sleep Mask"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "brightness(0) invert(1)"
          }}
        />
      </motion.div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1.5, delay: 1.0 }}
        viewport={{ once: true }}
        style={{
          color: "#ffffff",
          fontSize: "4rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "6vh",
          position: "relative",
          zIndex: 1
        }}
      >
        Behind the Mask
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        viewport={{ once: true }}
        style={{
          color: "#ffffff",
          fontSize: "1.8rem",
          lineHeight: "1.6",
          textAlign: "center",
          maxWidth: "900px",
          position: "relative",
          zIndex: 1
        }}
      >
        <br />
        <br />
        <br />
        <span className="highlighted-phrase" data-phrase-index="0" style={{ color: "#F4E4BC", fontWeight: "bold" }}>Neura</span> uses four <span className="highlighted-phrase" data-phrase-index="1" style={{ color: "#F4E4BC", fontWeight: "bold" }}>powerful sensors</span> to understand your sleep in real time, helping us wake you up at the <span className="highlighted-phrase" data-phrase-index="2" style={{ color: "#F4E4BC", fontWeight: "bold" }}>perfect moment</span>.<br /><br />Each sensor tracks a different part of your body's <span className="highlighted-phrase" data-phrase-index="3" style={{ color: "#F4E4BC", fontWeight: "bold" }}>sleep patterns</span>, working together to give you <span className="highlighted-phrase" data-phrase-index="4" style={{ color: "#F4E4BC", fontWeight: "bold" }}>better mornings</span> and <span className="highlighted-phrase" data-phrase-index="5" style={{ color: "#F4E4BC", fontWeight: "bold" }}>deeper rest</span>.
      </motion.p>
    </section>
  );
};

export default Science;
