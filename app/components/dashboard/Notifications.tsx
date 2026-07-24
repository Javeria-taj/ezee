'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationsProps {
  onClose: () => void;
  customLetters?: EziLetter[];
}

export interface EziLetter {
  id: string;
  isRead: boolean;
  stampEmoji: string;
  message: string;
  from: string;
  date: string;
  time: string;
  pickupCode?: string;
  shopName?: string;
  itemDetails?: string;
}

const getContextualLetters = (): EziLetter[] => {
  const hour = new Date().getHours();
  const isLate = hour >= 22 || hour <= 5;
  const isMorning = hour >= 6 && hour <= 10;

  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const todayStr = now.toLocaleDateString('en-US', options);
  
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toLocaleDateString('en-US', options);

  return [
    {
      id: 'letter-1',
      isRead: false,
      stampEmoji: '☕',
      from: 'Ezi',
      message: isLate
        ? 'Still here? I made some tea. The lamp is warm. Take your time.'
        : isMorning
          ? 'Good morning. The window light is soft today. A quiet one.'
          : 'Looks peaceful in here. I\'ll stay nearby.',
      date: todayStr,
      time: '11:15 PM',
    },
    {
      id: 'letter-2',
      isRead: false,
      stampEmoji: '📮',
      from: 'Ezee Prints',
      message: 'Your notes are resting at the counter. Ezi wrapped them carefully. Whenever you\'re ready.',
      date: todayStr,
      time: '8:45 PM',
    },
    {
      id: 'letter-3',
      isRead: true,
      stampEmoji: '🌧️',
      from: 'Ezi',
      message: 'Rain sounds nice today. I left the window open a little. The plant seems to like it.',
      date: yesterdayStr,
      time: '10:15 AM',
    },
  ];
};

export default function Notifications({ onClose, customLetters = [] }: NotificationsProps) {
  const [letters] = useState<EziLetter[]>(() => [
    ...customLetters,
    ...getContextualLetters(),
  ]);
  const [openLetterId, setOpenLetterId] = useState<string | null>(customLetters.length > 0 ? customLetters[0].id : null);
  const [readSet, setReadSet] = useState<Set<string>>(
    new Set(letters.filter(l => l.isRead).map(l => l.id))
  );

  const handleOpenLetter = (id: string) => {
    setOpenLetterId(id);
    setReadSet(prev => new Set([...prev, id]));
  };

  // Colors for envelope backgrounds
  const envelopeColors = ['#EAE4DD', '#FAF7F1', '#E8E0D4'];

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
      <style>{`
        .letter-modal-box {
          padding: 3rem 2.5rem !important;
        }
        @media (max-width: 600px) {
          .letter-modal-box {
            padding: 2rem 1.25rem 1.5rem !important;
            max-height: 90vh !important;
          }
          .envelope-card {
            padding: 0.9rem 1rem !important;
          }
          .unfolded-pad {
            padding: 0.9rem !important;
            margin-top: 0.8rem !important;
          }
          .unfolded-message {
            font-size: 0.95rem !important;
          }
        }
      `}</style>
      <motion.div
        className="letter-modal-box"
        style={{
          background: '#F5EFE7',
          borderRadius: '8px',
          padding: '3rem 2.5rem',
          width: '680px',
          maxWidth: '95vw',
          maxHeight: '85vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 30px 60px rgba(42,41,40,0.18)',
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.025) 1px, transparent 1.5px)',
          backgroundSize: '22px 22px',
        }}
      >
        {/* Washi tape corner */}
        <div style={{ position: 'absolute', top: '-12px', left: '18%', transform: 'rotate(-4deg)', width: '80px', height: '26px', background: 'rgba(212, 138, 112, 0.35)', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '2px' }} />

        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.6rem', color: 'rgba(42,41,40,0.4)', cursor: 'pointer', lineHeight: 1 }}
          aria-label="Close mailbox"
        >×</button>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2rem', color: '#2A2928', margin: '0 0 0.3rem 0', fontWeight: 400 }}>
            Notifications
          </h2>
          <p style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: 'rgba(42,41,40,0.45)', margin: 0, fontStyle: 'italic' }}>
            Ezi left a few things on the desk.
          </p>
        </div>

        {/* Letter Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {letters.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: 10, textAlign: 'center' }}>
              <span style={{ fontSize: 40 }}>😴</span>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: '#2A2928', margin: 0 }}>All quiet here.</p>
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: 'rgba(42,41,40,.5)', margin: 0, fontStyle: 'italic' }}>Ezi&apos;s napping. Check back later.</p>
            </div>
          )}
          {letters.map((letter, idx) => {
            const isOpen = readSet.has(letter.id);
            return (
              <motion.div
                key={letter.id}
                className="envelope-card"
                whileHover={{ y: -2, rotate: 0.5 }}
                transition={{ type: 'spring', damping: 20 }}
                onClick={() => handleOpenLetter(letter.id)}
                style={{
                  background: envelopeColors[idx % envelopeColors.length],
                  border: openLetterId === letter.id ? '1.5px solid rgba(42,41,40,0.4)' : '1px solid rgba(42,41,40,0.1)',
                  borderRadius: '4px',
                  padding: '1.2rem 1.5rem',
                  cursor: 'pointer',
                  position: 'relative',
                  transform: `rotate(${idx % 2 === 0 ? -0.5 : 0.8}deg)`,
                  boxShadow: '1px 3px 12px rgba(42,41,40,0.07)',
                }}
              >
                {/* Envelope V-fold top */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '12px',
                  background: 'rgba(0,0,0,0.03)',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '4px' }}>
                  {/* Wax seal */}
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: isOpen ? 'rgba(212,138,112,0.2)' : '#D48A70',
                    border: isOpen ? '1.5px dashed rgba(212,138,112,0.5)' : '2px solid rgba(42,41,40,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.2rem', flexShrink: 0,
                    transition: 'all 0.5s ease',
                    boxShadow: isOpen ? 'none' : '0 2px 8px rgba(212,138,112,0.4)',
                  }}>
                    {letter.stampEmoji}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Instrument Sans', fontSize: '0.8rem', color: 'rgba(42,41,40,0.5)', marginBottom: '0.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>From <span style={{ fontWeight: 'bold', color: '#2A2928' }}>{letter.from}</span></span>
                      <span style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'rgba(42,41,40,0.4)', fontFamily: 'Space Grotesk' }}>{letter.date}</span>
                    </div>
                    <p style={{
                      fontFamily: 'Instrument Sans',
                      fontSize: '0.95rem',
                      color: '#2A2928',
                      margin: 0,
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.4s ease',
                    }}>
                      {letter.message}
                    </p>
                  </div>

                  {/* Sealed indicator */}
                  {!isOpen && (
                    <div style={{
                      fontFamily: 'Space Grotesk', fontSize: '0.65rem', color: 'rgba(42,41,40,0.4)',
                      textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap',
                    }}>
                      sealed
                    </div>
                  )}
                </div>

                {/* Unfolded letter content */}
                <AnimatePresence>
                  {openLetterId === letter.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="unfolded-pad" style={{
                        marginTop: '1.2rem',
                        paddingTop: '1.2rem',
                        borderTop: '1px dashed rgba(42,41,40,0.12)',
                        background: '#FAF7F1',
                        padding: '1.2rem',
                        borderRadius: '3px',
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, rgba(42,41,40,0.07) 24px)',
                        backgroundSize: '100% 24px',
                      }}>
                        <p className="unfolded-message" style={{
                          fontFamily: 'Instrument Sans',
                          fontSize: '1.05rem',
                          lineHeight: 1.7,
                          color: '#2A2928',
                          margin: 0,
                          fontStyle: 'italic',
                        }}>
                          {letter.message}
                        </p>

                        {letter.pickupCode && (
                          <div style={{
                            marginTop: '1.2rem',
                            padding: '14px 18px',
                            background: '#FAF2E6',
                            border: '1.5px dashed #C2674A',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 2px 8px rgba(194,103,74,0.1)'
                          }}>
                            <div>
                              <div style={{ fontFamily: 'Space Grotesk', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8A7B6B', fontWeight: 600 }}>Pickup Code</div>
                              <div style={{ fontFamily: 'Space Grotesk', fontSize: '24px', fontWeight: 'bold', color: '#C2674A', letterSpacing: '2px', marginTop: '2px' }}>{letter.pickupCode}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontFamily: 'Space Grotesk', fontSize: '11px', color: '#8A7B6B' }}>Location</div>
                              <div style={{ fontFamily: 'Space Grotesk', fontSize: '13px', fontWeight: '700', color: '#2A2928', marginTop: '2px' }}>🏪 {letter.shopName || 'Print Shop'}</div>
                            </div>
                          </div>
                        )}

                        <div style={{
                          marginTop: '1rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontFamily: 'Space Grotesk',
                          fontSize: '0.8rem',
                          color: 'rgba(42,41,40,0.4)',
                          fontStyle: 'italic',
                        }}>
                          <span>{letter.date} · {letter.time}</span>
                          <span>— {letter.from}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '2rem', paddingTop: '1rem',
          borderTop: '1px dashed rgba(42,41,40,0.12)',
          fontFamily: 'Space Grotesk', fontSize: '0.8rem',
          color: 'rgba(42,41,40,0.35)', textAlign: 'center', fontStyle: 'italic',
        }}>
          &quot;Everything feels personal.&quot;
        </div>
      </motion.div>
    </motion.div>
  );
}
