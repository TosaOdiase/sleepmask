import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [menuLift, setMenuLift] = useState(0);
  
  // Check if we're on the blog page
  const isOnBlogPage = typeof window !== 'undefined' && window.location.pathname === '/blog';



  // Clean up overlays when component unmounts
  useEffect(() => {
    return () => {
      setMenuLift(0);
      setIsPageTransitioning(false);
      setIsMenuOpen(false);
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
      
      {/* Three Lines Button that transforms to X */}
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          zIndex: 10000,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(10px)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1
        }}
        transition={{ 
          duration: 0.4, 
          delay: 0.6
        }}
        whileHover={{ 
          scale: 1.05,
          background: 'rgba(255,255,255,0.3)',
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Three Lines Container */}
        <div style={{
          position: 'relative',
          width: '24px',
          height: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Top Line */}
          <motion.div
            style={{
              width: '100%',
              height: '2px',
              background: '#F5E6D3',
              borderRadius: '1px'
            }}
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 8 : 0
            }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          />
          {/* Middle Line */}
          <motion.div
            style={{
              width: '100%',
              height: '2px',
              background: '#F5E6D3',
              borderRadius: '1px'
            }}
            animate={{
              opacity: isMenuOpen ? 0 : 1,
              scale: isMenuOpen ? 0 : 1
            }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          />
          {/* Bottom Line */}
          <motion.div
            style={{
              width: '100%',
              height: '2px',
              background: '#F5E6D3',
              borderRadius: '1px'
            }}
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -8 : 0
            }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          />
        </div>
      </motion.button>

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

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 100%)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `translateY(-${menuLift}vh)`,
              transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            initial={{ opacity: 0, y: '-100vh', scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: '-100vh',
              scale: 0.8
            }}
            transition={{
              duration: 0.7,
              ease: [0.4, 0.0, 0.2, 1]
            }}
          >
            {/* Mask Overlay for Sliding Effect */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: '#F5E6D3',
                zIndex: 9998,
                borderRadius: '0 0 50% 50%',
                transformOrigin: 'top'
              }}
              initial={{ 
                scaleY: 0, 
                scaleX: 0,
                borderRadius: '0 0 50% 50%'
              }}
              animate={{ 
                scaleY: isMenuOpen ? 1 : 0,
                scaleX: isMenuOpen ? 1 : 0,
                borderRadius: isMenuOpen ? '0%' : '0 0 50% 50%'
              }}
              transition={{ 
                duration: 0.15, 
                delay: 0,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            />

            {/* Menu Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0, 
                y: isMenuOpen ? 0 : -20
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2
              }}
              style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                zIndex: 10000
              }}
            >
              Menu
            </motion.div>

            {/* Menu Items Container */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem',
              alignItems: 'center',
              marginTop: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  y: isMenuOpen ? 0 : 50
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
                }}
                style={{ zIndex: 9999 }}
              >
                <button onClick={() => {
                  // Start blur effect and keep menu visible
                  setIsPageTransitioning(true);
                  document.body.classList.add('transitioning');
                  
                  // Apply blur to background content
                  setTimeout(() => {
                    document.body.classList.add('blurred');
                  }, 50);
                  
                  // After blur animation, navigate to home page and scroll to intro section
                  setTimeout(() => {
                    if (isOnBlogPage) {
                      // Navigate to home page with hash to indicate we want to scroll to intro section
                      window.location.href = '/#intro';
                    } else {
                      const introSection = document.querySelector('.intro-section');
                      if (introSection) {
                        introSection.scrollIntoView({ behavior: 'auto' });
                      }
                    }
                    
                    // Start menu lift and blur reduction
                    setTimeout(() => {
                      setMenuLift(100);
                      document.body.classList.remove('blurred');
                      
                      // Close menu after lift animation
                      setTimeout(() => {
                        setIsPageTransitioning(false);
                        setIsMenuOpen(false);
                        setMenuLift(0);
                        document.body.classList.remove('transitioning');
                      }, 600);
                    }, 1500);
                  }, 800);
                }} style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '4rem', 
                  fontWeight: '800', 
                  color: '#333', 
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#065787';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#333';
                  e.currentTarget.style.textDecoration = 'none';
                }}>
                  HOME
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  y: isMenuOpen ? 0 : 50
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
                }}
                style={{ zIndex: 9999 }}
              >
                <button onClick={() => {
                  // Start blur effect and keep menu visible
                  setIsPageTransitioning(true);
                  document.body.classList.add('transitioning');
                  
                  // Apply blur to background content
                  setTimeout(() => {
                    document.body.classList.add('blurred');
                  }, 50);
                  
                  // After blur animation, scroll to app section instantly
                  setTimeout(() => {
                    const appSection = document.getElementById('app-section');
                    if (appSection) {
                      appSection.scrollIntoView({ behavior: 'auto' });
                    }
                    
                    // Start menu lift and blur reduction
                    setTimeout(() => {
                      setMenuLift(100);
                      document.body.classList.remove('blurred');
                      
                      // Close menu after lift animation
                      setTimeout(() => {
                        setIsPageTransitioning(false);
                        setIsMenuOpen(false);
                        setMenuLift(0);
                        document.body.classList.remove('transitioning');
                      }, 600);
                    }, 1500);
                  }, 800);
                }} style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '4rem', 
                  fontWeight: '800', 
                  color: '#333', 
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#065787';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#333';
                  e.currentTarget.style.textDecoration = 'none';
                }}>
                  APP
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  y: isMenuOpen ? 0 : 50
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
                }}
                style={{ zIndex: 9999 }}
              >
                <button onClick={() => {
                  // Start blur effect and keep menu visible
                  setIsPageTransitioning(true);
                  document.body.classList.add('transitioning');
                  
                  // Apply blur to background content
                  setTimeout(() => {
                    document.body.classList.add('blurred');
                  }, 50);
                  
                  // After blur animation, scroll to science section instantly
                  setTimeout(() => {
                    const scienceSection = document.getElementById('science');
                    if (scienceSection) {
                      scienceSection.scrollIntoView({ behavior: 'auto' });
                    }
                    
                    // Start menu lift and blur reduction
                    setTimeout(() => {
                      setMenuLift(100);
                      document.body.classList.remove('blurred');
                      
                      // Close menu after lift animation
                      setTimeout(() => {
                        setIsPageTransitioning(false);
                        setIsMenuOpen(false);
                        setMenuLift(0);
                        document.body.classList.remove('transitioning');
                      }, 600);
                    }, 1500);
                  }, 800);
                }} style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '4rem', 
                  fontWeight: '800', 
                  color: '#333', 
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#065787';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#333';
                  e.currentTarget.style.textDecoration = 'none';
                }}>
                  SCIENCE
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  y: isMenuOpen ? 0 : 50
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
                }}
                style={{ zIndex: 9999 }}
              >
                <button onClick={() => {
                  // Start blur effect and keep menu visible
                  setIsPageTransitioning(true);
                  document.body.classList.add('transitioning');
                  
                  // Apply blur to background content
                  setTimeout(() => {
                    document.body.classList.add('blurred');
                  }, 50);
                  
                  // After blur animation, scroll to team section instantly
                  setTimeout(() => {
                    const teamSection = document.getElementById('meet-the-team');
                    if (teamSection) {
                      teamSection.scrollIntoView({ behavior: 'auto' });
                    }
                    
                    // Start menu lift and blur reduction
                    setTimeout(() => {
                      setMenuLift(100);
                      document.body.classList.remove('blurred');
                      
                      // Close menu after lift animation
                      setTimeout(() => {
                        setIsPageTransitioning(false);
                        setIsMenuOpen(false);
                        setMenuLift(0);
                        document.body.classList.remove('transitioning');
                      }, 600);
                    }, 1500);
                  }, 800);
                }} style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '4rem', 
                  fontWeight: '800', 
                  color: '#333', 
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#065787';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#333';
                  e.currentTarget.style.textDecoration = 'none';
                }}>
                  OUR TEAM
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0, 
                  y: isMenuOpen ? 0 : 50
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.8,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
                }}
                style={{ zIndex: 9999 }}
              >
                <button onClick={() => {
                  // Start blur effect and keep menu visible
                  setIsPageTransitioning(true);
                  document.body.classList.add('transitioning');
                  
                  // Apply blur to background content
                  setTimeout(() => {
                    document.body.classList.add('blurred');
                  }, 50);
                  
                  // After blur animation, navigate to blog page
                  setTimeout(() => {
                    window.location.href = '/blog';
                  }, 800);
                }} style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '4rem', 
                  fontWeight: '800', 
                  color: '#333', 
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#065787';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#333';
                  e.currentTarget.style.textDecoration = 'none';
                }}>
                  BLOG
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
