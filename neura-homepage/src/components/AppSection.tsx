import React, { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const AppSection: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "100px 0px -50px 0px",
    once: false,
    amount: 0.3
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // CSS gradient from lighter blue to navy blue


  return (
    <section 
      ref={containerRef}
      className="app-section"
      style={{
        minHeight: "150vh",
        width: "100vw",
        position: "relative",
        paddingBottom: "200px"
      }}
    >
      {/* Left side content */}
      <div 
        style={{
          position: "absolute",
          top: "35%", // Moved higher from 50% to 35%
          left: "10%",
          transform: "translateY(-50%)"
        }}
      >
        <motion.div
          className="app-content"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            textAlign: "left",
            maxWidth: "1000px"
          }}
        >
          {/* Introducing text */}
          <motion.div
            initial={{ 
              opacity: 0, 
              y: 30
            }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0
            } : { 
              opacity: 0, 
              y: 30
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut",
              delay: 0.1
            }}
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              margin: "0 0 1rem 0",
              lineHeight: "1.2",
              color: "#FFFFFF",
              textShadow: "2px 2px 8px rgba(0,0,0,0.6), 4px 4px 12px rgba(0,0,0,0.4)",
              background: "transparent",
              transformStyle: "preserve-3d"
            }}
          >
            Introducing
          </motion.div>

          <motion.div
            initial={{ 
              opacity: 0, 
              y: 50
            }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0
            } : { 
              opacity: 0, 
              y: 50
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut",
              delay: 0.2
            }}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                fontSize: "10rem",
                fontWeight: "bold",
                margin: "0 !important",
                lineHeight: "1.2",
                color: "#F4E4BC",
                textShadow: "2px 2px 8px rgba(0,0,0,0.6), 4px 4px 12px rgba(0,0,0,0.4)",
                background: "transparent",
                transformStyle: "preserve-3d"
              }}
            >
              &nbsp;&nbsp;Neura
            </div>
            
            <div
              style={{
                fontSize: "10rem",
                fontWeight: "bold",
                margin: "0 !important",
                lineHeight: "1.2",
                color: "#F4E4BC",
                textShadow: "2px 2px 8px rgba(0,0,0,0.6), 4px 4px 12px rgba(0,0,0,0.4)",
                paddingLeft: "60px",
                background: "transparent",
                transformStyle: "preserve-3d"
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;Sleep
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side mobile app image */}
      <motion.div
        initial={{ 
          opacity: 0, 
          y: 50
        }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0
        } : { 
          opacity: 0, 
          y: 50
        }}
        transition={{ 
          duration: 0.4, 
          ease: "easeOut"
        }}
        style={{
          position: "absolute",
          top: "8%", // Moved down from 5% to 25%
          right: "-2%",
          transform: "translateY(-50%)",
          width: "393px",
          height: "852px",
          zIndex: 1,
          perspective: "1000px"
        }}
      >
        <img 
          src="/images/neura-app-mask-page.png" 
          alt="Neura Sleep Mask Settings Page"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "45px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            background: "transparent"
          }}
        />
      </motion.div>
    </section>
  );
};

export default AppSection;
