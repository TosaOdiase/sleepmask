import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  
  // Check if we're on the blog page
  const isOnBlogPage = typeof window !== 'undefined' && window.location.pathname === '/blog';

  // Clean up overlays when component unmounts
  useEffect(() => {
    return () => {
      setIsPageTransitioning(false);
      document.body.classList.remove('transitioning', 'blurred');
    };
  }, []);

  return (
    <>
      {/* CSS Animation for Rising Effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes riseUp {
            from {
              opacity: 0;
              transform: translateY(100px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .rise-up-animation {
            animation: riseUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
          
          .page-transition-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: 9997;
            pointer-events: none;
            transition: backdrop-filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          /* Apply blur to body when transitioning */
          body.transitioning {
            filter: blur(0px);
            transition: filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          
          body.transitioning.blurred {
            filter: blur(20px);
          }
        `
      }} />
      
      {/* Sticky Top Menu Bar */}
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#F5E6D3', // Papyrus yellow
          zIndex: 10000,
          padding: '1rem 2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)'
        }}
        initial={{ opacity: 0, y: -100 }}
        animate={{ 
          opacity: 1, 
          y: 0
        }}
        transition={{ 
          duration: 0.4, 
          delay: 0.6
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Logo/Brand */}
          <motion.div
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#333',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            NEURA
          </motion.div>

          {/* Menu Items */}
          <div style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
                        <motion.button
              onClick={() => {
                // Start blur effect
                setIsPageTransitioning(true);
                document.body.classList.add('transitioning');
                
                // Apply blur to background content
                setTimeout(() => {
                  document.body.classList.add('blurred');
                }, 50);
                
                // After blur animation, navigate to home page and scroll to intro section
                setTimeout(() => {
                  if (isOnBlogPage) {
                    window.location.href = '/#intro';
                  } else {
                    const introSection = document.querySelector('.intro-section');
                    if (introSection) {
                      introSection.scrollIntoView({ behavior: 'auto' });
                    }
                  }
                  
                  // Remove blur and close transition
                  setTimeout(() => {
                    document.body.classList.remove('blurred');
                    setIsPageTransitioning(false);
                    document.body.classList.remove('transitioning');
                  }, 800);
                }, 800);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1a1a1a', // Darker color
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF'
              }}
              transition={{ duration: 0.2 }}
            >
              HOME
            </motion.button>

            <motion.button
              onClick={() => {
                setIsPageTransitioning(true);
                document.body.classList.add('transitioning');
                
                setTimeout(() => {
                  document.body.classList.add('blurred');
                }, 50);
                
                setTimeout(() => {
                  if (isOnBlogPage) {
                    window.location.href = '/#app';
                  } else {
                    const appSection = document.getElementById('app-section');
                    if (appSection) {
                      appSection.scrollIntoView({ behavior: 'auto' });
                    }
                  }
                  
                  setTimeout(() => {
                    document.body.classList.remove('blurred');
                    setIsPageTransitioning(false);
                    document.body.classList.remove('transitioning');
                  }, 800);
                }, 800);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF'
              }}
              transition={{ duration: 0.2 }}
            >
              APP
            </motion.button>

            <motion.button
              onClick={() => {
                setIsPageTransitioning(true);
                document.body.classList.add('transitioning');
                
                setTimeout(() => {
                  document.body.classList.add('blurred');
                }, 50);
                
                setTimeout(() => {
                  if (isOnBlogPage) {
                    window.location.href = '/#science';
                  } else {
                    const scienceSection = document.getElementById('science');
                    if (scienceSection) {
                      scienceSection.scrollIntoView({ behavior: 'auto' });
                    }
                  }
                  
                  setTimeout(() => {
                    document.body.classList.remove('blurred');
                    setIsPageTransitioning(false);
                    document.body.classList.remove('transitioning');
                  }, 800);
                }, 800);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF'
              }}
              transition={{ duration: 0.2 }}
            >
              SCIENCE
            </motion.button>

            <motion.button
              onClick={() => {
                setIsPageTransitioning(true);
                document.body.classList.add('transitioning');
                
                setTimeout(() => {
                  document.body.classList.add('blurred');
                }, 50);
                
                setTimeout(() => {
                  if (isOnBlogPage) {
                    window.location.href = '/#team';
                  } else {
                    const teamSection = document.getElementById('meet-the-team');
                    if (teamSection) {
                      teamSection.scrollIntoView({ behavior: 'auto' });
                    }
                  }
                  
                  setTimeout(() => {
                    document.body.classList.remove('blurred');
                    setIsPageTransitioning(false);
                    document.body.classList.remove('transitioning');
                  }, 800);
                }, 800);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF'
              }}
              transition={{ duration: 0.2 }}
            >
              OUR TEAM
            </motion.button>

            <motion.button
              onClick={() => {
                setIsPageTransitioning(true);
                document.body.classList.add('transitioning');
                
                setTimeout(() => {
                  document.body.classList.add('blurred');
                }, 50);
                
                setTimeout(() => {
                  window.location.href = '/blog';
                }, 800);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#1a1a1a',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '4px'
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF'
              }}
              transition={{ duration: 0.2 }}
            >
              BLOG
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Page Transition Overlay - Background Blur Effect */}
      <AnimatePresence>
        {isPageTransitioning && (
          <motion.div
            className="page-transition-overlay"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
