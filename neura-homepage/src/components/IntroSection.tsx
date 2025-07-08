import React from "react";
import { motion } from "framer-motion";

const IntroSection = () => {
  return (
    <section className="intro-section">
      <div className="intro-grid">
        {/* Left: Headline */}
        <div className="headline-block">
          <motion.h2
            className="headline-line"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <em className="em-large">Wake up</em>
          </motion.h2>

          <motion.h2
            className="headline-line"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="em-light">at your</span>{" "}
            <em className="em-large">best</em>
          </motion.h2>

          <motion.h2
            className="headline-line"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <em className="em-red">every morning.</em>
          </motion.h2>
        </div>

        {/* Right: Paragraphs */}
        <div className="paragraph-block">
          <motion.p
            className="intro-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            You know those mornings – you slept a full 8 hours but still feel slow
            and tired? It takes forever to feel fully awake, and that grogginess
            sticks with you all day. <strong>That's where <em>Neura</em> comes in.</strong>
          </motion.p>

          <motion.p
            className="intro-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Neura is a <em>smart sleep mask</em> that helps you wake up feeling refreshed.
            It understands your sleep cycles and gently wakes you at the right moment.
            It also uses a <em>natural sunrise light</em> to bring you out of sleep – calmly and naturally.
          </motion.p>

          <motion.p
            className="intro-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            So every morning, you <em>start your day at your best.</em>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
