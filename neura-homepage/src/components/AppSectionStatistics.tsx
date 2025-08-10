import React, { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { backgroundManager, COMPONENT_BACKGROUNDS } from '@/utils/backgroundManager';

const AppSectionStatistics: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-200px 0px -100px 0px",
    once: false,
    amount: 0.1
  });

  useEffect(() => {
    if (containerRef.current) {
      backgroundManager.registerSection('app-statistics', containerRef.current, COMPONENT_BACKGROUNDS.AppSectionStatistics);
    }

    return () => {
      backgroundManager.unregisterSection('app-statistics');
    };
  }, []);

  useEffect(() => {
    // Wait for the text container to be visible first
    const textContainer = document.querySelector('.text-container-stats');
    if (!textContainer) return;

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Text is visible, now trigger highlights with delay
            const highlightElements = document.querySelectorAll('.highlight-animate-stats');
            highlightElements.forEach((el, index) => {
              // Remove existing class first to reset animation
              el.classList.remove('in-view');
              setTimeout(() => {
                el.classList.add('in-view');
              }, 1000 + (index * 300));
            });
          } else {
            // When exiting view, remove the class to reset for next time
            const highlightElements = document.querySelectorAll('.highlight-animate-stats');
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
      className="app-section-statistics"
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative"
      }}
    >
      {/* Left side - Text content */}
      <motion.div 
        className="text-container-stats"
        initial={{ 
          opacity: 0, 
          x: -50,
          filter: "blur(5px)"
        }}
        whileInView={{ 
          opacity: 1, 
          x: 0,
          filter: "blur(0px)"
        }}
        viewport={{ once: false, margin: "50px 0px -50px 0px", amount: 0.3 }}
        transition={{ 
          duration: 1.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.4
        }}
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          transform: "translateY(-50%)",
          maxWidth: "700px",
          textAlign: "left"
        }}
      >
        <motion.p 
          style={{
            color: "#F4E4BC",
            fontSize: "2rem",
            lineHeight: "1.6",
            marginBottom: "2rem",
            fontWeight: "600"
          }}
        >
          See detailed data from{" "}
          <span 
            className="highlight-animate-stats"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}
          >
            previous nights
          </span>
          {" "}and track how your{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span 
            className="highlight-animate-stats"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "3rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}
          >
            sleep is improving
          </span>
          {" "}over{" "}
          <span 
            className="highlight-animate-stats"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}
          >
            time
          </span>
          .
        </motion.p>
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        
        <motion.p 
          style={{
            color: "#F4E4BC",
            fontSize: "2rem",
            lineHeight: "1.6",
            fontWeight: "600"
          }}
        >
          You can also view your{" "}
          <span 
            className="highlight-animate-stats"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}
          >
            personalized insights
          </span>
          {" "}for the night.
        </motion.p>
      </motion.div>

      {/* Right side - Neura app stats page */}
      <motion.div 
        initial={{ 
          opacity: 0, 
          scale: 0.8, 
          y: 50,
          filter: "blur(5px)"
        }}
        whileInView={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          filter: "blur(0px)"
        }}
        viewport={{ once: false, margin: "50px 0px -50px 0px", amount: 0.3 }}
        transition={{ 
          duration: 1.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2
        }}
        style={{
          position: "absolute",
          top: "30%",
          right: "15%",
          transform: "translateY(-50%)",
          width: "350px",
          height: "750px"
        }}
      >
        <img 
          src="/images/neura-app-stats-page.png" 
          alt="Neura App Statistics Page"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "30px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }}
        />
      </motion.div>
    </section>
  );
};

export default AppSectionStatistics; 