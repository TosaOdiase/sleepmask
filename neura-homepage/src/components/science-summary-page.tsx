import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { backgroundManager, COMPONENT_BACKGROUNDS } from '@/utils/backgroundManager';

const ScienceSummaryPage: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-200px 0px -100px 0px",
    once: false,
    amount: 0.3
  });

  useEffect(() => {
    if (containerRef.current) {
      backgroundManager.registerSection('science-summary', containerRef.current, COMPONENT_BACKGROUNDS.ScienceSummaryPage);
    }

    return () => {
      backgroundManager.unregisterSection('science-summary');
    };
  }, []);

  // Add highlight animation effect
  useEffect(() => {
    // Wait for the text container to be visible first
    const textContainer = document.querySelector('.text-container');
    if (!textContainer) return;

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Text is visible, now trigger highlights with delay
            const highlightElements = document.querySelectorAll('.highlight-animate-summary');
            highlightElements.forEach((el, index) => {
              // Remove existing class first to reset animation
              el.classList.remove('in-view');
              setTimeout(() => {
                el.classList.add('in-view');
              }, 1000 + (index * 300));
            });
          } else {
            // When exiting view, remove the class to reset for next time
            const highlightElements = document.querySelectorAll('.highlight-animate-summary');
            highlightElements.forEach((el) => {
              el.classList.remove('in-view');
            });
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    textObserver.observe(textContainer);

    return () => textObserver.disconnect();
  }, []);



  return (
    <section
      ref={containerRef}
      className="science-summary-page-section"
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
      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1.5, delay: 1.0 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "1200px",
          textAlign: "center"
        }}
      >
        {/* Header */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: "4rem",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
            marginBottom: "6vh"
          }}
        >
          How it all comes together
        </h1>
        <br />
        <br />
        <br />
        {/* Description with Underline Animations */}
        <motion.p
          className="text-container"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            fontSize: "1.8rem",
            lineHeight: "1.6",
            color: "#ffffff",
            maxWidth: "900px",
            textAlign: "center",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
          }}
        >
          Neura doesn't just collect data -{" "}
          <span style={{ color: "#ffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            we analyze it in real time.
          </span>
          <br /><br />
          By{" "}
          <span style={{ color: "#ffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            combining movement, temperature, heart rate, and eye activity
          </span>
          , we{" "}
          <span style={{ color: "#ffffff", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            know exactly when you're in light sleep.
          </span>
          <br /><br />
          That's the perfect time to wake you up gently, using light, so you{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.8, rotateX: 90, filter: "blur(4px)", y: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateX: 0, filter: "blur(0px)", y: 0 } : { opacity: 0, scale: 0.8, rotateX: 90, filter: "blur(4px)", y: 50 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            style={{ color: "#F4E4BC", fontWeight: "bold", fontSize: "2.2rem", textShadow: "3px 3px 6px rgba(0,0,0,0.4)" }}
          >
            feel alert, not groggy.
          </motion.span>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ScienceSummaryPage; 