import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { backgroundManager, COMPONENT_BACKGROUNDS } from '@/utils/backgroundManager';

const ComingSoon: React.FC = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      backgroundManager.registerSection('coming-soon', containerRef.current, COMPONENT_BACKGROUNDS.ComingSoon);
    }

    return () => {
      backgroundManager.unregisterSection('coming-soon');
    };
  }, []);



  return (
    <section 
      className="coming-soon-section"
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <motion.div
        className="text-container-coming-soon"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "50px 0px -50px 0px", amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          color: "#F4E4BC",
          fontSize: "1.5rem",
          textAlign: "center",
          margin: "0",
          maxWidth: "1200px"
        }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            color: "#F4E4BC",
            fontSize: "4rem",
            fontWeight: "bold",
            marginBottom: "3rem",
            textAlign: "center"
          }}
        >
          Coming Soon
        </motion.h1>
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          You'll be able to connect with{" "}
        </motion.span>
                          <motion.span
          initial={{
            opacity: 0,
            scale: 0.5,
            rotateX: -30,
            filter: "blur(8px)"
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)"
          }}
          viewport={{ once: false }}
          transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1,
              scale: { duration: 0.4, ease: "easeOut" },
              rotateX: { duration: 0.3, ease: "easeOut" },
              filter: { duration: 0.2, ease: "easeOut" }
            }}
          style={{
            display: "inline-block",
            position: "relative",
            fontSize: "2.2rem",
            fontWeight: "700",
            color: "#FFFFFF",
            transformStyle: "preserve-3d",
            margin: "0 0.8rem"
          }}
        >
          friends
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: false }}
            transition={{ 
              duration: 0.4, 
              delay: 0.8,
              ease: "easeOut"
            }}
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "0",
              height: "3px",
              background: "linear-gradient(90deg, #FFFFFF, #F4E4BC)",
              borderRadius: "2px",
              boxShadow: "0 0 12px rgba(255, 255, 255, 0.6)"
            }}
          ></motion.div>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          , view their{" "}
        </motion.span>
        <motion.span 
          initial={{ 
            opacity: 0, 
            scale: 0.5, 
            rotateX: -30,
            filter: "blur(8px)"
          }}
          whileInView={{ 
            opacity: 1, 
            scale: 1, 
            rotateX: 0,
            filter: "blur(0px)"
          }}
          viewport={{ once: false }}
                      transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1,
              scale: { duration: 0.4, ease: "easeOut" },
              rotateX: { duration: 0.3, ease: "easeOut" },
              filter: { duration: 0.2, ease: "easeOut" }
            }}
          style={{
            display: "inline-block",
            position: "relative",
            fontSize: "2.2rem",
            fontWeight: "700",
            color: "#FFFFFF",
            transformStyle: "preserve-3d",
            margin: "0 0.8rem"
          }}
        >
          sleep stats
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: false }}
            transition={{ 
              duration: 0.4, 
              delay: 0.8,
              ease: "easeOut"
            }}
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "0",
              height: "3px",
              background: "linear-gradient(90deg, #FFFFFF, #F4E4BC)",
              borderRadius: "2px",
              boxShadow: "0 0 12px rgba(255, 255, 255, 0.6)"
            }}
          ></motion.div>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          , and compete on a{" "}
        </motion.span>
        <motion.span 
          initial={{ 
            opacity: 0, 
            scale: 0.5, 
            rotateX: -30,
            filter: "blur(8px)"
          }}
          whileInView={{ 
            opacity: 1, 
            scale: 1, 
            rotateX: 0,
            filter: "blur(0px)"
          }}
          viewport={{ once: false }}
                      transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.1,
              scale: { duration: 0.4, ease: "easeOut" },
              rotateX: { duration: 0.3, ease: "easeOut" },
              filter: { duration: 0.2, ease: "easeOut" }
            }}
          style={{
            display: "inline-block",
            position: "relative",
            fontSize: "2.2rem",
            fontWeight: "700",
            color: "#FFFFFF",
            transformStyle: "preserve-3d",
            margin: "0 0.8rem"
          }}
        >
          fun leaderboard
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: false }}
            transition={{ 
              duration: 0.4, 
              delay: 0.8,
              ease: "easeOut"
            }}
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "0",
              height: "3px",
              background: "linear-gradient(90deg, #FFFFFF, #F4E4BC)",
              borderRadius: "2px",
              boxShadow: "0 0 12px rgba(255, 255, 255, 0.6)"
            }}
          ></motion.div>
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          .
        </motion.span>
      </motion.div>
    </section>
  );
};

export default ComingSoon;
