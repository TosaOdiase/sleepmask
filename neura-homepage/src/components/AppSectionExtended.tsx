import React, { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { backgroundManager, COMPONENT_BACKGROUNDS } from '@/utils/backgroundManager';

const AppSectionExtended: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-200px 0px -100px 0px",
    once: false,
    amount: 0.1
  });



  useEffect(() => {
    if (containerRef.current) {
      backgroundManager.registerSection('app-extended', containerRef.current, COMPONENT_BACKGROUNDS.AppSectionExtended);
    }

    return () => {
      backgroundManager.unregisterSection('app-extended');
    };
  }, []);

  useEffect(() => {
    // Wait for the text container to be visible first
    const textContainer = document.querySelector('.text-container-extended');
    if (!textContainer) return;

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Text is visible, now trigger highlights with delay
            const highlightElements = document.querySelectorAll('.highlight-animate-extended');
            highlightElements.forEach((el, index) => {
              // Remove existing class first to reset animation
              el.classList.remove('in-view');
              setTimeout(() => {
                el.classList.add('in-view');
              }, 600 + (index * 200));
            });
          } else {
            // When exiting view, remove the class to reset for next time
            const highlightElements = document.querySelectorAll('.highlight-animate-extended');
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
      className="app-section-extended"
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative"
      }}
    >
      {/* Left side - Neura app home page */}
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
          duration: 1.0, 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.1
        }}
        style={{
          position: "absolute",
          top: "15%",
          left: "15%",
          transform: "translateY(-50%)",
          width: "350px",
          height: "750px"
        }}
      >
        <img 
          src="/images/neura-app-home-page.png" 
          alt="Neura App Home Page"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "30px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }}
        />
      </motion.div>

      {/* Right side - Text content */}
      <motion.div 
        className="text-container-extended"
        initial={{ 
          opacity: 0, 
          x: 50,
          filter: "blur(5px)"
        }}
        whileInView={{ 
          opacity: 1, 
          x: 0,
          filter: "blur(0px)"
        }}
        viewport={{ once: false, margin: "50px 0px -50px 0px", amount: 0.3 }}
        transition={{ 
          duration: 1.0, 
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.2
        }}
        style={{
          position: "absolute",
          top: "35%",
          right: "5%",
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
          Set your preferred{" "}
          <span 
            className="highlight-animate-extended"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}
          >
            wake-up window
          </span>
          , and we will choose the{" "}
          <span 
            className="highlight-animate-extended"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "3rem",
              fontWeight: "700",
              color: "#FFFFFF",
              paddingLeft: "40px"
            }}
          >
            best time to wake you
          </span>
          {" "}based on your{" "}
          <span 
            className="highlight-animate-extended"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "2.2rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}
          >
            sleep stage
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
          You can also view your personalized{" "}
          <span 
            className="highlight-animate-extended"
            style={{
              display: "inline-block",
              position: "relative",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#FFFFFF"
            }}
          >
            Sleep Score
          </span>
          {" "}for the night.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AppSectionExtended; 