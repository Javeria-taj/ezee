'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './graduation.module.css';

interface MemoryBoxProps {
  onClose: () => void;
}

interface MemoryCard {
  id: string;
  icon: string;
  title: string;
  caption: string;
  rotation: number;
  bg: string;
}

const memories: MemoryCard[] = [
  {
    id: 'first-order',
    icon: '🖨️',
    title: 'First Print',
    caption: 'The first time. You were nervous.',
    rotation: -2,
    bg: '#FAF7F1',
  },
  {
    id: 'first-resume',
    icon: '📄',
    title: 'First Resume',
    caption: 'You stayed up all night on this one.',
    rotation: 1.5,
    bg: '#EAE4DD',
  },
  {
    id: 'hackathon',
    icon: '💡',
    title: 'Hackathon',
    caption: "You didn't sleep. It was worth it.",
    rotation: -1,
    bg: '#F5EFE7',
  },
  {
    id: 'placement',
    icon: '✨',
    title: 'Placement Season',
    caption: 'The most important coffee mugs.',
    rotation: 2,
    bg: '#FAF7F1',
  },
  {
    id: 'rainy-nights',
    icon: '🌧',
    title: 'Rainy Nights',
    caption: 'The rain was loud. The notes were due.',
    rotation: -1.5,
    bg: '#EAE4DD',
  },
  {
    id: 'letters',
    icon: '✉️',
    title: 'Letters',
    caption: 'Ezi wrote you something every week.',
    rotation: 1,
    bg: '#F5EFE7',
  },
  {
    id: 'bookmarks',
    icon: '🔖',
    title: 'Bookmarks',
    caption: 'All the pages you meant to come back to.',
    rotation: -2.5,
    bg: '#FAF7F1',
  },
  {
    id: 'photos',
    icon: '📸',
    title: 'Photos',
    caption: 'The desk, back when it was clean.',
    rotation: 1.5,
    bg: '#EAE4DD',
  },
];

export default function MemoryBox({ onClose }: MemoryBoxProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className={styles.memoryBoxModal}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ type: 'spring', damping: 28, stiffness: 90 }}
      >
        {/* Wood lid strip with knobs */}
        <div className={styles.woodLid}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={styles.woodKnob} />
          ))}
        </div>

        <div style={{ padding: '2.5rem 2.5rem 3rem' }}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              fontFamily: 'Space Grotesk',
              fontSize: '0.7rem',
              color: 'rgba(42,41,40,0.38)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.4rem',
            }}>
              The memory box
            </div>
            <h2 style={{
              fontFamily: 'Instrument Sans',
              fontSize: '1.9rem',
              color: '#2A2928',
              margin: 0,
              fontWeight: 400,
            }}>
              What was inside
            </h2>
            <p style={{
              fontFamily: 'Instrument Sans',
              fontSize: '0.9rem',
              color: 'rgba(42,41,40,0.45)',
              margin: '0.4rem 0 0',
              fontStyle: 'italic',
            }}>
              Not achievements. Memories.
            </p>
          </div>

          {/* Memory cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1.8rem',
          }}>
            {memories.map((card, idx) => (
              <motion.div
                key={card.id}
                className={styles.memoryCard}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07, duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                onHoverStart={() => setHoveredId(card.id)}
                onHoverEnd={() => setHoveredId(null)}
                style={{
                  background: card.bg,
                  transform: `rotate(${hoveredId === card.id ? 0 : card.rotation}deg)`,
                  transition: 'transform 0.4s ease, box-shadow 0.3s ease',
                  boxShadow: hoveredId === card.id
                    ? '4px 10px 24px rgba(42,41,40,0.15)'
                    : '2px 4px 12px rgba(42,41,40,0.08)',
                }}
              >
                {/* Washi tape */}
                <div className={styles.memoryCardTape} />

                <div style={{ fontSize: '2rem', marginBottom: '0.7rem', marginTop: '0.4rem' }}>
                  {card.icon}
                </div>
                <div style={{
                  fontFamily: 'Instrument Sans',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  color: '#2A2928',
                  marginBottom: '0.4rem',
                }}>
                  {card.title}
                </div>
                <p style={{
                  fontFamily: 'Instrument Sans',
                  fontSize: '0.82rem',
                  color: 'rgba(42,41,40,0.55)',
                  margin: 0,
                  lineHeight: 1.55,
                  fontStyle: 'italic',
                }}>
                  {card.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
