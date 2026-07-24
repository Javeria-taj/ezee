'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMemorySystem } from '../print/useMemorySystem';

interface DeskUIProps {
  onClose: () => void;
}

function getEziJournalEntry(memory: ReturnType<typeof useMemorySystem>['memory']): { leftPage: string; rightPage: string[] } {
  const hour = new Date().getHours();
  const isLate = hour >= 22 || hour <= 5;
  const isMorning = hour >= 6 && hour <= 11;
  const isAfternoon = hour >= 12 && hour <= 17;
  const isGoldenHour = hour >= 17 && hour <= 20;

  let leftPage = '';

  if (memory.isLateNight || isLate) {
    leftPage = 'It\'s late. The desk lamp is the warmest thing in the room right now. I meant to go to sleep earlier, but here we are. The rain started about an hour ago — soft, not dramatic. The kind that makes you feel less alone. I made some tea. It\'s getting cold. Still, I\'ll stay.';
  } else if (isMorning) {
    leftPage = 'The morning light comes in at a low angle and catches the dust on the bookshelf. I like mornings before anything has happened. The coffee is still hot. The books are where I left them. A good start.';
  } else if (isAfternoon) {
    leftPage = 'Afternoon. Spent the last hour sorting papers. Some of them I don\'t remember printing — they must be from a different season. I left the window open a little. The plant seems to prefer it that way.';
  } else if (isGoldenHour) {
    leftPage = 'The golden hour makes everything look like a memory from years ago. The light turned the bookshelf amber. I watered the plant. A quiet, full afternoon.';
  } else {
    leftPage = 'Quiet evening. The lamp is on. The room feels smaller in a good way. Like all the things that matter are very close.';
  }

  if (memory.isExamSeason) {
    leftPage = 'Exam season. The books are everywhere. I\'ve been trying to keep the desk clear, but new ones keep appearing. The coffee mugs are multiplying. I don\'t mind. This energy feels familiar.';
  }

  const rightNotes: string[] = [];

  if (memory.visits > 5) {
    rightNotes.push('You\'ve been here a few times now. I noticed.');
  }
  if (memory.isLateNight || isLate) {
    rightNotes.push('Get some rest soon. The notes will still be here.');
  }
  if (memory.orders > 0) {
    rightNotes.push(`You\'ve printed ${memory.orders} thing${memory.orders > 1 ? 's' : ''} now. The bookshelf is filling.`);
  }
  if (memory.plantStage >= 2) {
    rightNotes.push('The plant has grown. It must like it here.');
  }
  if (memory.coffeeMugs >= 2) {
    rightNotes.push('I counted the mugs. Please drink more water.');
  }
  if (rightNotes.length === 0) {
    rightNotes.push('Take your time.');
    rightNotes.push('I\'ll stay here.');
  }

  return { leftPage, rightPage: rightNotes };
}

export default function DeskUI({ onClose }: DeskUIProps) {
  const { memory } = useMemorySystem();
  const { leftPage, rightPage } = useMemo(() => getEziJournalEntry(memory), [memory]);

  // Sticky note colors – muted and handcrafted
  const stickyColors = ['#F4D03F', '#D48A70', '#A9B59D', '#EAE4DD'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 20 }}
      transition={{ type: 'spring', damping: 28, stiffness: 100 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        background: 'rgba(42, 41, 40, 0.25)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        className="mobile-col-1"
        style={{
          background: '#F5EFE7',
          borderRadius: '8px',
          width: '780px',
          maxWidth: '95vw',
          maxHeight: '90vh',
          position: 'relative',
          boxShadow: '0 30px 60px rgba(42,41,40,0.18)',
          overflow: 'hidden',
          overflowY: 'auto',
          display: 'flex',
        }}
      >
        {/* Journal spine */}
        <div className="mobile-hide" style={{
          width: '18px', flexShrink: 0,
          background: 'linear-gradient(to right, #C4956A, #8B5A2B)',
          boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.2)',
        }} />

        {/* Left journal page */}
        <div style={{
          flex: 1.1,
          padding: '3rem 2rem 3rem 2.5rem',
          background: '#FAF7F1',
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(42,41,40,0.07) 32px)',
          backgroundSize: '100% 32px',
          position: 'relative',
        }}>
          {/* Red margin line */}
          <div style={{
            position: 'absolute', left: '2rem', top: 0, bottom: 0,
            width: '1.5px', background: 'rgba(212,138,112,0.35)',
            pointerEvents: 'none',
          }} />

          {/* Washi tape on top corner */}
          <div style={{ position: 'absolute', top: '-8px', left: '25%', transform: 'rotate(-3deg)', width: '75px', height: '22px', background: 'rgba(212, 138, 112, 0.3)', borderRadius: '2px' }} />

          <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.72rem', color: 'rgba(42,41,40,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>
            Ezi&apos;s Journal
          </div>

          <p style={{
            fontFamily: 'Instrument Sans',
            fontSize: '1.05rem',
            lineHeight: 1.9,
            color: '#2A2928',
            margin: 0,
            fontStyle: 'italic',
            paddingLeft: '0.5rem',
          }}>
            {leftPage}
          </p>

          {/* Coffee ring stain */}
          <div style={{
            position: 'absolute', bottom: '3rem', right: '3rem',
            width: '55px', height: '55px', borderRadius: '50%',
            border: '2.5px solid rgba(139,90,43,0.09)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '2.8rem', right: '2.8rem',
            width: '40px', height: '40px', borderRadius: '50%',
            border: '1.5px solid rgba(139,90,43,0.06)',
            pointerEvents: 'none',
          }} />

          {/* Folded bookmark corner */}
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 0, height: 0,
            borderBottom: '40px solid #D48A70',
            borderLeft: '40px solid transparent',
            opacity: 0.4,
          }} />
        </div>

        {/* Right journal page — sticky notes from Ezi */}
        <div style={{
          flex: 0.9,
          padding: '3rem 2.5rem 3rem 2rem',
          background: '#FAF7F1',
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(42,41,40,0.07) 32px)',
          backgroundSize: '100% 32px',
          position: 'relative',
        }}>
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.72rem', color: 'rgba(42,41,40,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
            Notes for you
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {rightPage.map((note, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                style={{
                  background: stickyColors[idx % stickyColors.length],
                  padding: '1rem 1.2rem',
                  transform: `rotate(${idx % 2 === 0 ? -1.5 : 2}deg)`,
                  boxShadow: '2px 4px 12px rgba(42,41,40,0.1)',
                  fontSize: '0.95rem',
                  fontFamily: 'Instrument Sans',
                  color: '#2A2928',
                  lineHeight: 1.5,
                  position: 'relative',
                }}
              >
                {/* Pin */}
                <div style={{
                  position: 'absolute', top: '-7px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#C4956A', border: '1px solid rgba(42,41,40,0.3)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                }} />
                {note}
              </motion.div>
            ))}
          </div>

          {/* Pencil illustration */}
          <div style={{ position: 'absolute', bottom: '2.5rem', right: '1.5rem', opacity: 0.25, transform: 'rotate(-25deg)' }}>
            <svg width="14" height="80" viewBox="0 0 14 80">
              <rect x="2" y="10" width="10" height="55" fill="#C4956A" rx="1" />
              <polygon points="2,65 12,65 7,80" fill="#FAF7F1" />
              <rect x="2" y="5" width="10" height="10" fill="#A9B59D" rx="1" />
              <rect x="2" y="0" width="10" height="7" fill="#D48A70" rx="1" />
            </svg>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'none', border: 'none', fontSize: '1.5rem',
              color: 'rgba(42,41,40,0.3)', cursor: 'pointer', lineHeight: 1,
            }}
            aria-label="Close journal"
          >×</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
