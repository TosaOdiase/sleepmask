import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

const GradientFade = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        background: 'linear-gradient(to bottom, #fdfcf7 0%, transparent 100%)',
        opacity,
      }}
    />
  );
};

export default GradientFade;
