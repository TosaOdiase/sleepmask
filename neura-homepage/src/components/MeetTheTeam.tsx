import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { backgroundManager, SECTION_BACKGROUNDS } from '@/utils/backgroundManager';

const founders = [
  {
    name: "Alexander Meylikhov",
    title: "Co-Founder",
    image: "/images/Alexander Meylikhov.png",
    description: "Alex is a Mechanical Engineering student at CWRU. He has done research in thermal and fluid dynamics. Alex is a Co-Founder of Neura and is the team lead. A few of his favorite things are volleyball, jazz, and the arts."
  },
  {
    name: "Artem Zabarov",
    title: "Co-Founder",
    image: "/images/Artem Zabarov.png",
    description: "Art is a Computer Science student at CWRU. An expert in AI, he is the team's computer and ML wiz. Art is a Co-Founder of Neura and is leading the AI and Software team. He enjoys learning new things, spending time with his friends, and rap music."
  }
];

const coreTeam = [
  {
    name: "Ian Norfolk",
    title: "Mechanical Engineer",
    image: "/images/Ian Norfolk .png",
    description: "Ian is a Mechanical Engineering student at CWRU. He has worked as a technician in the largest university makerspace in the U.S. Ian is responsible for the design of the product and compliance with legal requirements throughout all stages of development. He enjoys skiing, playing the drums, and stargazing."
  },
  {
    name: "Kyle Porter",
    title: "Aerospace Engineer",
    image: "/images/Kyle Porter.png",
    description: "Kyle is an Aerospace Engineer at CWRU. Detail-oriented and driven engineer, Kyle is leading the prototype and circuit development teams. Kyle loves tinkering and making - from wind tunnels to 3D printers. His favorite things are hiking, teaching, and flying planes."
  },
  {
    name: "Daria Schwetsova",
    title: "Lead Neuroscience Researcher",
    image: "/images/Daria Schwetsova.png",
    description: "Daria is the lead neuroscience researcher at Neura. She specializes in cutting-edge sleep science and focuses on creating practical, user-centered tools that help people sleep better and wake up more naturally."
  }
];

const dealMakers = [
  {
    name: "Mariam Natroshvili",
    title: "Business Strategy Lead",
    image: "/images/Mariam Natroshvili.png",
    description: "Mariam is a student at the University of Pennsylvania's Wharton School studying Finance and Entrepreneurship & Innovation. At Neura, she shapes the business strategy and guides financial planning. She brings clarity to complexity and enjoys skiing, writing, and making good pasta."
  }
];

const allTeamMembers = [...founders, ...coreTeam, ...dealMakers];

const MeetTheTeam: React.FC = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const isInView = useInView(containerRef, {
    margin: "-200px 0px -100px 0px",
    once: false,
    amount: 0.3
  });

  useEffect(() => {
    if (containerRef.current) {
      backgroundManager.registerSection('team', containerRef.current, SECTION_BACKGROUNDS.team);
    }

    return () => {
      backgroundManager.unregisterSection('team');
    };
  }, []);

  const currentMember = allTeamMembers[currentIndex];

  const getCurrentSection = () => {
    if (currentIndex < founders.length) {
      return 'founders';
    } else if (currentIndex < founders.length + coreTeam.length) {
      return 'core';
    } else {
      return 'dealMakers';
    }
  };

  const getCurrentTitle = () => {
    switch (getCurrentSection()) {
      case 'founders':
        return 'Founders';
      case 'core':
        return 'Core Team';
      case 'dealMakers':
        return 'Deal Makers & Number Crunchers';
      default:
        return 'Meet the Team';
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % allTeamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + allTeamMembers.length) % allTeamMembers.length);
  };

  return (
    <section
      id="meet-the-team"
      ref={containerRef}
      className="meet-the-team-section"
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "15vh 5rem 5vh 5rem"
      }}
    >
      {/* Fixed Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          textAlign: "center",
          marginBottom: "4rem",
          marginTop: "2rem",
          position: "relative",
          zIndex: 10
        }}
      >
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "700",
          letterSpacing: "tight",
          color: "#F4E4BC",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          marginBottom: "1rem"
        }}>
          Meet the Team
        </h1>
        
        <motion.h2
          key={getCurrentSection()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#F4E4BC",
            textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
          }}
        >
          {getCurrentTitle()}
        </motion.h2>
      </motion.header>

      {/* Carousel Container */}
      <div style={{
        position: "relative",
        flex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4rem",
              maxWidth: "1200px",
              width: "100%"
            }}
          >
            {/* Left Side - Photo and Name/Position */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "0 0 400px"
              }}
            >
              {/* Large Profile Image */}
              <motion.div
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: "2rem",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
                }}
              >
                <img
                  src={currentMember.image}
                  alt={currentMember.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>

              {/* Name and Position */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  textAlign: "center"
                }}
              >
                <h2 style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#F4E4BC",
                  marginBottom: "0.5rem",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
                }}>
                  {currentMember.name}
                </h2>
                <p style={{
                  fontSize: "1.3rem",
                  fontWeight: "600",
                  color: "#F4E4BC",
                  opacity: 0.8
                }}>
                  {currentMember.title}
                </p>
              </motion.div>
            </motion.div>

            {/* Right Side - Description */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{
                flex: "1",
                maxWidth: "600px"
              }}
            >
              <p style={{
                fontSize: "1.2rem",
                lineHeight: "1.8",
                color: "#F4E4BC",
                textAlign: "left",
                opacity: 0.9
              }}>
                {currentMember.description}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          style={{
            position: "absolute",
            left: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            color: "#F4E4BC",
            border: "2px solid #F4E4BC",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "1.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(244, 228, 188, 0.1)";
            e.currentTarget.style.borderColor = "#F4E4BC";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(244, 228, 188, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#F4E4BC";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: "absolute",
            right: "-60px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            color: "#F4E4BC",
            border: "2px solid #F4E4BC",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "1.5rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(244, 228, 188, 0.1)";
            e.currentTarget.style.borderColor = "#F4E4BC";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(244, 228, 188, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "#F4E4BC";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ›
        </button>
      </div>

      {/* Dots Indicator */}
      <div style={{
        position: "absolute",
        bottom: "3rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        justifyContent: "center",
        gap: "0.5rem",
        zIndex: 10
      }}>
        {allTeamMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "none",
              background: index === currentIndex ? "#F4E4BC" : "rgba(244, 228, 188, 0.3)",
              cursor: "pointer",
              transition: "background 0.3s ease"
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default MeetTheTeam; 