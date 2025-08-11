import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { backgroundManager, SECTION_BACKGROUNDS } from '../utils/backgroundManager';

const articles = [
  {
    id: 1,
    author: "Dr. Sarah Chen",
    title: "The Science Behind Sleep Optimization: Understanding Your Sleep Patterns",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    date: "July 31, 2025",
    category: "Sleep Science",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S1087079222001046?via%3Dihub"
  },
  {
    id: 2,
    author: "Neura Research Team",
    title: "How Better Sleep Impacts Your Daily Performance and Productivity",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop",
    date: "July 29, 2025",
    category: "Performance",
    link: "https://pubmed.ncbi.nlm.nih.gov/11863237/"
  },
  {
    id: 3,
    author: "Dr. Michael Rodriguez",
    title: "Sleep Deprivation and its Effects on Appetite Regulation",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=250&fit=crop",
    date: "July 25, 2025",
    category: "Health",
    link: "https://www.sleepfoundation.org/"
  },
  {
    id: 4,
    author: "Sleep Foundation",
    title: "Sleep Regulation and Standards in Modern Healthcare",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=250&fit=crop",
    date: "July 22, 2025",
    category: "Healthcare",
    link: "https://www.researchgate.net/publication/47336734_Insufficient_Sleep_Undermines_Dietary_Efforts_to_Reduce_Adiposity"
  },
  {
    id: 5,
    author: "Neura Tech",
    title: "Continuous Sleep Monitoring: Real-time Insights for Better Rest",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    date: "July 18, 2025",
    category: "Technology",
    link: "https://www.sciencedirect.com/science/article/pii/S1389945723000990"
  },
  {
    id: 6,
    author: "Dr. Emily Watson",
    title: "Implement Smart Sleep Tracking Without Complex Infrastructure",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    date: "July 15, 2025",
    category: "Technology",
    link: "https://www.sleepfoundation.org/"
  }
];

const ArticleCard: React.FC<{ article: any; index: number }> = ({ article, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut",
        y: { duration: 0.2, ease: "easeOut" }
      }}
      style={{
        backgroundColor: "#0D3147",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        cursor: "pointer"
      }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)"
      }}
      onClick={() => window.open(article.link, '_blank')}
    >
      {/* Photo Box */}
      <div style={{
        width: "100%",
        height: "200px",
        overflow: "hidden",
        position: "relative"
      }}>
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop";
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        padding: "1.5rem",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        {/* Author Header */}
        <div style={{
          marginBottom: "0.75rem"
        }}>
          <p style={{
            color: "#F4E4BC",
            fontSize: "0.875rem",
            fontWeight: "600",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            {article.author}
          </p>
        </div>

        {/* Title */}
        <h3 style={{
          color: "#ffffff",
          fontSize: "1.25rem",
          fontWeight: "700",
          lineHeight: "1.4",
          margin: "0 0 1rem 0",
          height: "3.5rem",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {article.title}
        </h3>

        {/* Date */}
        <p style={{
          color: "#F4E4BC",
          fontSize: "0.875rem",
          margin: 0,
          opacity: 0.8
        }}>
          {article.date}
        </p>
      </div>
    </motion.div>
  );
};

const Blog: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    margin: "-100px 0px -50px 0px",
    once: false,
    amount: 0.3
  });

  useEffect(() => {
    if (containerRef.current) {
      backgroundManager.registerSection('blog', containerRef.current, SECTION_BACKGROUNDS.blog);
    }

    return () => {
      backgroundManager.unregisterSection('blog');
    };
  }, []);

  return (
    <section
      id="blog-section"
      ref={containerRef}
      className="blog-section"
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        backgroundColor: "#0D3147",
        color: "#ffffff",
        margin: 0,
        padding: "4rem 2rem"
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          textAlign: "center",
          marginBottom: "3rem"
        }}
      >
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#F4E4BC",
          marginBottom: "1rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
        }}>
          Latest Articles
        </h1>
        <p style={{
          fontSize: "1.1rem",
          color: "#F4E4BC",
          opacity: 0.8,
          margin: 0
        }}>
          Insights from sleep science experts and researchers
        </p>
      </motion.div>

      {/* Articles Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {articles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          textAlign: "center",
          marginTop: "4rem",
          padding: "2rem",
          borderTop: "1px solid rgba(244, 228, 188, 0.2)"
        }}
      >
        <p style={{
          color: "#F4E4BC",
          fontSize: "1rem",
          margin: 0,
          opacity: 0.8
        }}>
          Stay updated with the latest sleep science research
        </p>
      </motion.div>
    </section>
  );
};

export default Blog;
