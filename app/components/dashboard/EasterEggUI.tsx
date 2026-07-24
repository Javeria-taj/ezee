'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../AudioEngine';

interface EasterEggUIProps {
  onClose: () => void;
}

type CatLocation =
  | 'sleeping_on_letters'
  | 'on_bookshelf'
  | 'near_lamp'
  | 'outside_window'
  | 'beside_ezi'
  | 'in_cat_bed'
  | 'on_a_book';

interface LocationData {
  label: string;
  scene: React.ReactNode;
  caption: string;
}

function SleepingOnLettersCat() {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" style={{ overflow: 'visible' }}>
      {/* Letters pile */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={40 + i * 8} y={100 - i * 4} width={120} height={70}
          fill={['#EAE4DD', '#FAF7F1', '#E8E0D4'][i]}
          stroke="rgba(42,41,40,0.1)" strokeWidth="1"
          transform={`rotate(${[-3, 1, -1][i]}, 100, 135)`}
        />
      ))}
      {/* Wax seal on top letter */}
      <circle cx="100" cy="110" r="10" fill="#D48A70" opacity="0.7" />
      {/* Cat sleeping curled up */}
      <ellipse cx="105" cy="92" rx="38" ry="20" fill="#424242" />
      <circle cx="72" cy="88" r="16" fill="#424242" />
      <polygon points="62,75 70,62 78,75" fill="#424242" />
      <polygon points="72,75 80,62 88,73" fill="#424242" />
      {/* Tail curled around */}
      <path d="M 140 88 Q 160 70 148 95" fill="none" stroke="#424242" strokeWidth="8" strokeLinecap="round" />
      {/* Closed eyes */}
      <path d="M 68 88 Q 70 91 72 88" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
      <path d="M 75 87 Q 77 90 79 87" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
      {/* Zzz */}
      <text x="145" y="78" fontSize="10" fill="rgba(42,41,40,0.3)" fontFamily="Instrument Sans">z</text>
      <text x="155" y="70" fontSize="7" fill="rgba(42,41,40,0.2)" fontFamily="Instrument Sans">z</text>
    </svg>
  );
}

function OnBookshelfCat() {
  return (
    <svg width="240" height="170" viewBox="0 0 240 170" style={{ overflow: 'visible' }}>
      {/* Shelf board */}
      <rect x="20" y="120" width="200" height="14" fill="#8B5A2B" stroke="#5C3D1D" strokeWidth="1.5" rx="2" />
      {/* Books on shelf */}
      {[{x:30,h:60,c:'#7A6D8C'},{x:52,h:50,c:'#D48A70'},{x:76,h:65,c:'#A9B59D'},{x:100,h:55,c:'#2A2928'},{x:125,h:48,c:'#C4956A'}].map((b,i) => (
        <rect key={i} x={b.x} y={120-b.h} width="20" height={b.h} fill={b.c} stroke="rgba(42,41,40,0.15)" strokeWidth="1" rx="1" />
      ))}
      {/* Cat sitting on top of books, tail dangling */}
      <ellipse cx="170" cy="105" rx="22" ry="16" fill="#424242" />
      <circle cx="162" cy="90" r="14" fill="#424242" />
      <polygon points="153,80 160,68 167,80" fill="#424242" />
      <polygon points="163,78 170,66 177,78" fill="#424242" />
      {/* Eyes open (alert, watching) */}
      <circle cx="158" cy="90" r="3" fill="#FAF7F1" />
      <circle cx="166" cy="90" r="3" fill="#FAF7F1" />
      <circle cx="159" cy="90" r="1.5" fill="#2A2928" />
      <circle cx="167" cy="90" r="1.5" fill="#2A2928" />
      {/* Tail dangling down */}
      <path d="M 185 118 Q 195 140 190 160" fill="none" stroke="#424242" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

function NearLampCat() {
  return (
    <svg width="240" height="180" viewBox="0 0 240 180" style={{ overflow: 'visible' }}>
      {/* Lamp glow */}
      <radialGradient id="lampGlow" cx="60%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#F4D03F" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#F4D03F" stopOpacity="0" />
      </radialGradient>
      <ellipse cx="160" cy="60" rx="80" ry="60" fill="url(#lampGlow)" />
      {/* Lamp base */}
      <line x1="160" y1="100" x2="160" y2="160" stroke="#2A2928" strokeWidth="4" />
      <rect x="145" y="155" width="30" height="8" fill="#2A2928" rx="2" />
      {/* Lamp shade */}
      <path d="M 130 80 L 190 80 L 175 40 L 145 40 Z" fill="#D48A70" stroke="#2A2928" strokeWidth="2" />
      <ellipse cx="160" cy="80" rx="30" ry="6" fill="#C4956A" />
      {/* Cat curled near lamp base */}
      <ellipse cx="95" cy="150" rx="35" ry="20" fill="#424242" />
      <circle cx="64" cy="145" r="15" fill="#424242" />
      <polygon points="56,133 63,121 70,133" fill="#424242" />
      {/* Eyes half closed (drowsy warmth) */}
      <path d="M 60 145 Q 62 148 64 145" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
      <path d="M 67 144 Q 69 147 71 144" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function OutsideWindowCat() {
  return (
    <svg width="240" height="180" viewBox="0 0 240 180" style={{ overflow: 'visible' }}>
      {/* Window frame */}
      <rect x="40" y="20" width="160" height="140" fill="#EAE4DD" stroke="#2A2928" strokeWidth="3" rx="3" />
      {/* Window panes */}
      <line x1="120" y1="20" x2="120" y2="160" stroke="#2A2928" strokeWidth="2" />
      <line x1="40" y1="90" x2="200" y2="90" stroke="#2A2928" strokeWidth="2" />
      {/* Sky */}
      <rect x="42" y="22" width="77" height="67" fill="#7A9EC2" opacity="0.4" />
      <rect x="121" y="22" width="77" height="67" fill="#7A9EC2" opacity="0.4" />
      {/* Rain drops on glass */}
      {[55, 75, 95, 130, 155, 175].map((x, i) => (
        <line key={i} x1={x} y1={25 + i * 8} x2={x - 3} y2={35 + i * 8} stroke="rgba(122,158,194,0.5)" strokeWidth="1.5" />
      ))}
      {/* Ground/sill */}
      <rect x="40" y="155" width="160" height="8" fill="#8B5A2B" />
      {/* Cat sitting on windowsill, looking out */}
      <ellipse cx="70" cy="148" rx="22" ry="13" fill="#424242" />
      <circle cx="60" cy="136" r="13" fill="#424242" />
      <polygon points="52,126 58,115 64,126" fill="#424242" />
      <polygon points="60,124 66,113 72,124" fill="#424242" />
      {/* Eyes looking through glass */}
      <circle cx="56" cy="136" r="2.5" fill="#FAF7F1" />
      <circle cx="63" cy="136" r="2.5" fill="#FAF7F1" />
      <circle cx="57" cy="136" r="1.2" fill="#2A2928" />
      <circle cx="64" cy="136" r="1.2" fill="#2A2928" />
      {/* Tail wrapped around body */}
      <path d="M 88 148 Q 96 160 85 162" fill="none" stroke="#424242" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function BesideEziCat() {
  return (
    <svg width="260" height="170" viewBox="0 0 260 170" style={{ overflow: 'visible' }}>
      {/* Ezi (reading) */}
      <rect x="120" y="90" width="28" height="60" fill="#8D6E63" rx="5" />
      <ellipse cx="134" cy="76" rx="22" ry="18" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2.5" />
      <circle cx="126" cy="74" r="2.5" fill="#2A2928" />
      <circle cx="142" cy="74" r="2.5" fill="#2A2928" />
      {/* Ezi blush */}
      <ellipse cx="118" cy="79" rx="5" ry="2.5" fill="#FF8A80" opacity="0.6" />
      <ellipse cx="150" cy="79" rx="5" ry="2.5" fill="#FF8A80" opacity="0.6" />
      {/* Beret */}
      <path d="M 114 68 Q 134 56 154 68 Z" fill="#9CCC65" stroke="#2A2928" strokeWidth="1.5" />
      <circle cx="134" cy="58" r="4" fill="#C5E1A5" stroke="#2A2928" strokeWidth="1.5" />
      {/* Book */}
      <path d="M 112 102 L 134 108 L 156 102 L 134 97 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" />
      {/* Cat beside Ezi */}
      <ellipse cx="82" cy="138" rx="28" ry="16" fill="#424242" />
      <circle cx="58" cy="130" r="14" fill="#424242" />
      <polygon points="50,120 56,108 62,120" fill="#424242" />
      <polygon points="58,118 64,106 70,118" fill="#424242" />
      {/* Zzz from cat */}
      <text x="40" y="102" fontSize="9" fill="rgba(42,41,40,0.3)" fontFamily="Instrument Sans">z</text>
      <text x="30" y="95" fontSize="7" fill="rgba(42,41,40,0.2)" fontFamily="Instrument Sans">z</text>
    </svg>
  );
}

function InCatBedCat() {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" style={{ overflow: 'visible' }}>
      {/* Cat bed (round cushion) */}
      <ellipse cx="120" cy="130" rx="80" ry="30" fill="#D48A70" stroke="#C4956A" strokeWidth="2" />
      <ellipse cx="120" cy="122" rx="70" ry="22" fill="#EAE4DD" />
      {/* Fluffy rim */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        return (
          <ellipse key={i}
            cx={120 + Math.cos(angle) * 68}
            cy={122 + Math.sin(angle) * 18}
            rx="8" ry="6"
            fill="#D48A70" opacity="0.7"
          />
        );
      })}
      {/* Cat curled inside bed */}
      <ellipse cx="120" cy="118" rx="38" ry="18" fill="#424242" />
      <circle cx="92" cy="112" r="14" fill="#424242" />
      <polygon points="84,101 90,89 96,101" fill="#424242" />
      {/* Tail curled tight */}
      <path d="M 155 118 Q 165 108 158 122" fill="none" stroke="#424242" strokeWidth="7" strokeLinecap="round" />
      {/* Very closed cozy eyes */}
      <path d="M 88 112 Q 90 115 92 112" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
      <path d="M 94 111 Q 96 114 98 111" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function SittingOnBookCat() {
  return (
    <svg width="220" height="170" viewBox="0 0 220 170" style={{ overflow: 'visible' }}>
      {/* Open book */}
      <path d="M 30 110 L 110 100 L 110 165 L 30 170 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" />
      <path d="M 110 100 L 190 110 L 190 170 L 110 165 Z" fill="#EAE4DD" stroke="#2A2928" strokeWidth="1.5" />
      {/* Lines in book */}
      {[118, 126, 134, 142, 150].map(y => (
        <line key={y} x1="38" y1={y} x2="104" y2={y - 3} stroke="rgba(42,41,40,0.12)" strokeWidth="1" />
      ))}
      {/* Cat sitting on book (comfortably blocking it) */}
      <ellipse cx="110" cy="95" rx="35" ry="20" fill="#424242" />
      <circle cx="88" cy="82" r="16" fill="#424242" />
      <polygon points="79,71 86,58 93,71" fill="#424242" />
      <polygon points="87,69 94,56 101,69" fill="#424242" />
      {/* Tail over the edge of book */}
      <path d="M 140 100 Q 155 115 148 130" fill="none" stroke="#424242" strokeWidth="7" strokeLinecap="round" />
      {/* Eyes narrowed (comfortable) */}
      <path d="M 84 82 Q 86 85 88 82" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
      <path d="M 90 81 Q 92 84 94 81" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const locations: Record<CatLocation, LocationData> = {
  sleeping_on_letters: {
    label: 'On the letters',
    caption: 'Managed to fall asleep right on top of the unopened mail.',
    scene: <SleepingOnLettersCat />,
  },
  on_bookshelf: {
    label: 'Up on the bookshelf',
    caption: 'Watching everything from above. Tail dangling.',
    scene: <OnBookshelfCat />,
  },
  near_lamp: {
    label: 'Near the lamp',
    caption: 'Curled up in the warmest corner of the desk.',
    scene: <NearLampCat />,
  },
  outside_window: {
    label: 'By the window',
    caption: 'Watching the rain outside. Not moving.',
    scene: <OutsideWindowCat />,
  },
  beside_ezi: {
    label: 'Beside Ezi',
    caption: 'Fast asleep while Ezi reads. Good company.',
    scene: <BesideEziCat />,
  },
  in_cat_bed: {
    label: 'In the cat bed',
    caption: 'Exactly where the cat bed was placed. Rare.',
    scene: <InCatBedCat />,
  },
  on_a_book: {
    label: 'Sitting on a book',
    caption: 'Specifically the one you were about to read.',
    scene: <SittingOnBookCat />,
  },
};

const locationKeys = Object.keys(locations) as CatLocation[];

export default function EasterEggUI({ onClose }: EasterEggUIProps) {
  const [purrActive, setPurrActive] = useState(false);

  const [catLocation] = useState<CatLocation>(() => {
    const dayOfYear = Math.floor(Date.now() / 86400000);
    return locationKeys[dayOfYear % locationKeys.length];
  });

  const { label, scene, caption } = locations[catLocation];

  const handlePet = () => {
    audio.playWeatherCycleSound();
    setPurrActive(true);
    setTimeout(() => setPurrActive(false), 2500);
  };

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
        style={{
          background: '#FAF7F1',
          borderRadius: '8px',
          padding: '3rem 2.5rem',
          width: '460px',
          maxWidth: '95vw',
          maxHeight: '85vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 30px 60px rgba(42,41,40,0.18)',
          textAlign: 'center',
        }}
      >
        {/* Washi tape */}
        <div style={{ position: 'absolute', top: '-10px', left: '33%', transform: 'rotate(-4deg)', width: '80px', height: '22px', background: 'rgba(212, 138, 112, 0.4)', borderRadius: '2px' }} />

        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.5rem', color: 'rgba(42,41,40,0.3)', cursor: 'pointer', lineHeight: 1 }}
          aria-label="Close"
        >×</button>

        {/* Location subtitle — soft, no announcement */}
        <p style={{
          fontFamily: 'Space Grotesk', fontSize: '0.75rem',
          color: 'rgba(42,41,40,0.4)', textTransform: 'uppercase',
          letterSpacing: '0.08em', margin: '0 0 0.5rem 0',
        }}>
          Found
        </p>
        <h2 style={{
          fontFamily: 'Instrument Sans', fontSize: '1.5rem',
          color: '#2A2928', margin: '0 0 2rem 0', fontWeight: 400,
        }}>
          {label}
        </h2>

        {/* Scene */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', minHeight: '170px', alignItems: 'center' }}>
          {scene}
        </div>

        {/* Caption */}
        <p style={{
          fontFamily: 'Instrument Sans', fontSize: '0.95rem',
          color: 'rgba(42,41,40,0.55)', fontStyle: 'italic',
          margin: '0 0 2rem 0', lineHeight: 1.5,
        }}>
          {caption}
        </p>

        {/* Purr interaction */}
        <AnimatePresence>
          {purrActive && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: 'Instrument Sans', fontSize: '1rem',
                color: '#7A6D8C', fontStyle: 'italic', marginBottom: '1rem',
              }}
            >
              purrrrr...
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handlePet}
          style={{
            background: 'none', border: '1px solid rgba(42,41,40,0.15)',
            padding: '0.7rem 2rem', borderRadius: '30px',
            fontFamily: 'Space Grotesk', fontSize: '0.85rem',
            color: 'rgba(42,41,40,0.55)', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(42,41,40,0.4)'; e.currentTarget.style.color = '#2A2928'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(42,41,40,0.15)'; e.currentTarget.style.color = 'rgba(42,41,40,0.55)'; }}
        >
          🐾 Gently pet
        </button>
      </motion.div>
    </motion.div>
  );
}
