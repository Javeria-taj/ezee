'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './graduation.module.css';
import MemoryBox from './MemoryBox';
import FinalLetter from './FinalLetter';

// ─── Dust particles ──────────────────────────────────────────
interface DustParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

function useDustParticles(count: number): DustParticle[] {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 37) % 100,
      y: (i * 53) % 100,
      size: 2 + ((i * 3) % 4),
      duration: 14 + ((i * 5) % 12),
      delay: -((i * 7) % 20),
      driftX: (((i * 11) % 100) / 100 - 0.5) * 60,
      driftY: -(20 + ((i * 13) % 50)),
    }));
  }, [count]);
}

// ─── Bird SVG ────────────────────────────────────────────────
function Bird({ delay, y }: { delay: number; y: number }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: `${y}%`,
        left: 0,
        width: '24px',
        height: '14px',
        pointerEvents: 'none',
        zIndex: 5,
      }}
      animate={{ x: ['calc(-5vw)', 'calc(110vw)'] }}
      transition={{
        duration: 18 + (delay % 8),
        delay,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 6 + (delay % 8),
      }}
    >
      <svg width="24" height="14" viewBox="0 0 24 14">
        <path
          d="M 0 7 Q 4 3 7 7 Q 11 3 14 7"
          fill="none"
          stroke="rgba(92,61,29,0.5)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 14 7 Q 18 3 21 7 Q 25 3 28 7"
          fill="none"
          stroke="rgba(92,61,29,0.5)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

// ─── Bookshelf (full, worn) ───────────────────────────────────
function WornBookshelf() {
  const books = [
    { x: 12, y: 20, w: 22, h: 110, fill: '#7A6D8C', rotate: 0, worn: true },
    { x: 38, y: 35, w: 26, h: 95, fill: '#D48A70', rotate: 0, worn: true },
    { x: 68, y: 15, w: 20, h: 115, fill: '#A9B59D', rotate: 0, worn: false },
    { x: 92, y: 20, w: 24, h: 110, fill: '#2A2928', rotate: 8, worn: true },
    { x: 128, y: 40, w: 22, h: 90, fill: '#C4956A', rotate: 0, worn: false },
    { x: 155, y: 10, w: 20, h: 120, fill: '#7A6D8C', rotate: 0, worn: true },
    // Middle shelf
    { x: 12, y: 170, w: 24, h: 100, fill: '#A9B59D', rotate: 0, worn: true },
    { x: 40, y: 185, w: 28, h: 85, fill: '#7A6D8C', rotate: 0, worn: false },
    { x: 72, y: 160, w: 18, h: 110, fill: '#D48A70', rotate: -10, worn: true },
    { x: 96, y: 180, w: 22, h: 90, fill: '#2A2928', rotate: 0, worn: true },
    { x: 122, y: 175, w: 24, h: 95, fill: '#C4956A', rotate: 0, worn: false },
    { x: 150, y: 165, w: 20, h: 105, fill: '#A9B59D', rotate: 5, worn: true },
    // Bottom shelf
    { x: 12, y: 320, w: 28, h: 100, fill: '#2A2928', rotate: 0, worn: true },
    { x: 44, y: 335, w: 24, h: 85, fill: '#C4956A', rotate: 4, worn: false },
    { x: 72, y: 315, w: 22, h: 105, fill: '#FAF7F1', rotate: 0, worn: true },
    { x: 98, y: 330, w: 20, h: 90, fill: '#7A6D8C', rotate: -6, worn: true },
    { x: 122, y: 320, w: 26, h: 100, fill: '#A9B59D', rotate: 0, worn: false },
    { x: 152, y: 310, w: 22, h: 110, fill: '#D48A70', rotate: 0, worn: true },
  ];

  return (
    <div className={styles.bookshelf}>
      <svg width="100%" height="100%" viewBox="0 0 200 500" preserveAspectRatio="none">
        {/* Shelf frame */}
        <rect x="5" y="5" width="190" height="490" fill="#EAE4DD" stroke="#5C3D1D" strokeWidth="4" />
        {/* Shelf boards */}
        <line x1="5" y1="145" x2="195" y2="145" stroke="#5C3D1D" strokeWidth="5" />
        <line x1="5" y1="295" x2="195" y2="295" stroke="#5C3D1D" strokeWidth="5" />
        <line x1="5" y1="445" x2="195" y2="445" stroke="#5C3D1D" strokeWidth="5" />
        {/* Books */}
        {books.map((b, i) => (
          <g key={i} transform={b.rotate ? `translate(${b.x}, ${b.y}) rotate(${b.rotate})` : undefined}>
            <rect
              x={b.rotate ? 0 : b.x}
              y={b.rotate ? 0 : b.y}
              width={b.w} height={b.h}
              fill={b.fill}
              stroke="#2A2928" strokeWidth="1.5" rx="1"
              opacity={b.worn ? 0.75 : 0.9}
            />
            {/* Book spine line */}
            {!b.rotate && (
              <line
                x1={b.x + b.w / 2} y1={b.y + 8}
                x2={b.x + b.w / 2} y2={b.y + b.h - 8}
                stroke="rgba(250,247,241,0.15)" strokeWidth="1"
              />
            )}
          </g>
        ))}
        {/* Graduation cap on top shelf */}
        <g transform="translate(160, 300)">
          {/* Cap board */}
          <rect x="-18" y="0" width="36" height="4" fill="#2A2928" stroke="#2A2928" strokeWidth="1" />
          {/* Cap dome */}
          <path d="M -8 4 L 8 4 L 8 16 L -8 16 Z" fill="#2A2928" />
          {/* Tassel */}
          <line x1="18" y1="2" x2="18" y2="20" stroke="#D48A70" strokeWidth="2" />
          <circle cx="18" cy="21" r="3" fill="#D48A70" />
        </g>
        {/* Small frame on middle shelf */}
        <rect x="155" y="165" width="30" height="26" fill="#FAF7F1" stroke="#5C3D1D" strokeWidth="2" />
        <rect x="157" y="167" width="26" height="22" fill="#D4C9BE" />
        {/* Offer letter peek */}
        <g transform="translate(155, 315)">
          <rect x="0" y="0" width="35" height="28" fill="#FAF7F1" stroke="rgba(42,41,40,0.2)" strokeWidth="1" rx="1" />
          <line x1="4" y1="6" x2="28" y2="6" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
          <line x1="4" y1="10" x2="28" y2="10" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
          <line x1="4" y1="14" x2="22" y2="14" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
          <circle cx="14" cy="22" r="3" fill="#D48A70" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

// ─── Ezi reading (peaceful) ───────────────────────────────────
function EziReading() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '22.5vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '160px',
        height: '200px',
        zIndex: 15,
      }}
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 200 250" width="100%" height="100%">
        {/* Body */}
        <path
          d="M 100 30 C 140 30, 170 80, 180 150 C 185 190, 160 230, 100 230 C 40 230, 15 190, 20 150 C 30 80, 60 30, 100 30 Z"
          fill="#2A2928"
        />
        {/* Face */}
        <ellipse cx="100" cy="110" rx="60" ry="45" fill="#FAF7F1" />
        {/* Peaceful eyes — closed/reading */}
        <path d="M 78 108 Q 85 104 92 108" stroke="#2A2928" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 108 108 Q 115 104 122 108" stroke="#2A2928" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Cheeks — warm */}
        <ellipse cx="78" cy="118" rx="8" ry="4" fill="#FF9A7A" opacity="0.4" />
        <ellipse cx="122" cy="118" rx="8" ry="4" fill="#FF9A7A" opacity="0.4" />
        {/* Beret */}
        <path d="M 60 72 Q 100 58 140 72 Z" fill="#9CCC65" stroke="#2A2928" strokeWidth="2" />
        <circle cx="100" cy="61" r="6" fill="#C5E1A5" stroke="#2A2928" strokeWidth="1.5" />
        {/* Open book in hands */}
        <path d="M 60 185 L 100 175 L 140 185 L 140 215 L 60 215 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2" />
        <line x1="100" y1="175" x2="100" y2="215" stroke="#2A2928" strokeWidth="2" />
        {/* Book lines */}
        <line x1="66" y1="192" x2="97" y2="190" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
        <line x1="66" y1="198" x2="97" y2="196" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
        <line x1="103" y1="190" x2="134" y2="192" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
        <line x1="103" y1="196" x2="134" y2="198" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
        {/* Scarf */}
        <path
          d="M 55 165 Q 100 175 145 165 Q 148 180 145 182 Q 100 192 55 182 Z"
          fill="#7A6D8C"
          stroke="#2A2928"
          strokeWidth="1.5"
        />
      </svg>
    </motion.div>
  );
}

// ─── Old cat sleeping ─────────────────────────────────────────
function OldCatSleeping() {
  return (
    <motion.div
      style={{
        position: 'absolute',
        bottom: '22.5vh',
        left: 'calc(50% + 100px)',
        width: '90px',
        height: '55px',
        zIndex: 14,
      }}
      animate={{ scaleY: [1, 1.015, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="100%" height="100%" viewBox="0 0 100 60">
        {/* Body — bigger, rounder (older) */}
        <ellipse cx="55" cy="38" rx="38" ry="20" fill="#424242" />
        {/* Head */}
        <circle cx="20" cy="32" r="18" fill="#424242" />
        {/* Ears */}
        <polygon points="10,16 16,4 22,16" fill="#424242" />
        <polygon points="18,16 24,4 30,16" fill="#424242" />
        {/* Very closed eyes */}
        <path d="M 14 32 Q 17 35 20 32" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
        <path d="M 21 31 Q 24 34 27 31" stroke="#FAF7F1" strokeWidth="1.5" fill="none" />
        {/* Tail curled tight */}
        <path d="M 90 38 Q 100 28 95 42 Q 90 50 82 44" fill="none" stroke="#424242" strokeWidth="8" strokeLinecap="round" />
        {/* Grey muzzle (older cat) */}
        <ellipse cx="17" cy="38" rx="6" ry="3" fill="rgba(250,247,241,0.2)" />
        {/* Zzz */}
        <text x="74" y="22" fontSize="8" fill="rgba(42,41,40,0.22)" fontFamily="Instrument Sans" fontStyle="italic">z</text>
        <text x="82" y="16" fontSize="6" fill="rgba(42,41,40,0.15)" fontFamily="Instrument Sans" fontStyle="italic">z</text>
      </svg>
    </motion.div>
  );
}

// ─── Desk objects ─────────────────────────────────────────────
function DeskObjects() {
  return (
    <svg
      style={{ position: 'absolute', bottom: '22.5vh', left: '50%', transform: 'translateX(-50%)', width: '75vw', overflow: 'visible', zIndex: 12 }}
      viewBox="0 0 1000 140"
      preserveAspectRatio="none"
    >
      {/* Coffee stain rings (faded, multiple) */}
      <circle cx="200" cy="60" r="28" fill="none" stroke="rgba(139,90,43,0.08)" strokeWidth="3" />
      <circle cx="200" cy="60" r="20" fill="none" stroke="rgba(139,90,43,0.05)" strokeWidth="2" />
      <circle cx="240" cy="75" r="18" fill="none" stroke="rgba(139,90,43,0.06)" strokeWidth="2" />

      {/* Worn stack of books */}
      <rect x="60" y="50" width="100" height="14" fill="#7A6D8C" rx="2" stroke="#2A2928" strokeWidth="1.5" opacity="0.7" />
      <rect x="65" y="37" width="95" height="14" fill="#A9B59D" rx="2" stroke="#2A2928" strokeWidth="1.5" opacity="0.7" />
      <rect x="55" y="26" width="90" height="12" fill="#D48A70" rx="2" stroke="#2A2928" strokeWidth="1.5" opacity="0.8" />

      {/* Faded sticky notes on imaginary wall above */}
      <rect x="800" y="5" width="55" height="55" fill="#F4D03F" rx="2" transform="rotate(-4, 820, 30)" opacity="0.45" />
      <rect x="870" y="10" width="50" height="50" fill="#A9B59D" rx="2" transform="rotate(3, 895, 35)" opacity="0.4" />
      <rect x="820" y="0" width="45" height="45" fill="#EAE4DD" rx="2" transform="rotate(-2, 842, 22)" opacity="0.5" />
      {/* Faded pencil lines on sticky notes */}
      <line x1="807" y1="22" x2="845" y2="18" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
      <line x1="807" y1="28" x2="845" y2="24" stroke="rgba(42,41,40,0.12)" strokeWidth="1" />

      {/* Coffee mug (the last one) */}
      <path d="M 680 30 L 680 80 L 720 80 L 720 30 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2" rx="2" />
      <path d="M 720 40 Q 740 40 740 55 Q 740 70 720 70" fill="none" stroke="#FAF7F1" strokeWidth="3" />
      {/* Steam */}
      <path d="M 692 20 Q 688 12 695 5" fill="none" stroke="rgba(250,247,241,0.5)" strokeWidth="2">
        <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Graduation cap on desk corner */}
      <g transform="translate(880, 20)">
        <rect x="-25" y="0" width="50" height="6" fill="#2A2928" rx="1" />
        <rect x="-14" y="6" width="28" height="22" fill="#2A2928" rx="2" />
        <line x1="25" y1="3" x2="25" y2="28" stroke="#D48A70" strokeWidth="2" />
        <circle cx="25" cy="30" r="4" fill="#D48A70" />
      </g>

      {/* Offer letter / diploma, slightly rolled */}
      <g transform="translate(930, 30)">
        <rect x="0" y="0" width="55" height="40" fill="#FAF7F1" stroke="rgba(42,41,40,0.15)" strokeWidth="1" rx="2" />
        <line x1="6" y1="10" x2="45" y2="10" stroke="rgba(42,41,40,0.12)" strokeWidth="1" />
        <line x1="6" y1="16" x2="45" y2="16" stroke="rgba(42,41,40,0.12)" strokeWidth="1" />
        <line x1="6" y1="22" x2="36" y2="22" stroke="rgba(42,41,40,0.12)" strokeWidth="1" />
        <circle cx="27" cy="34" r="4" fill="#D48A70" opacity="0.55" />
        {/* Ribbon */}
        <path d="M 23 30 L 27 36 L 31 30" fill="none" stroke="#D48A70" strokeWidth="1.5" opacity="0.7" />
      </g>

      {/* Hackathon badge pinned to imaginary board */}
      <g transform="translate(310, 10)">
        <circle cx="18" cy="18" r="18" fill="#7A6D8C" stroke="#2A2928" strokeWidth="1.5" opacity="0.7" />
        <text x="18" y="22" textAnchor="middle" fill="#FAF7F1" fontSize="10" fontFamily="Space Grotesk" opacity="0.9">💡</text>
      </g>
    </svg>
  );
}

// ─── Lamp SVG ─────────────────────────────────────────────────
function Lamp() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '22.5vh',
      right: '14vw',
      width: '60px',
      height: '140px',
      zIndex: 16,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 80 180" style={{ overflow: 'visible' }}>
        <path d="M 20 170 L 60 170 L 55 162 L 25 162 Z" fill="#2A2928" />
        <line x1="40" y1="162" x2="40" y2="70" stroke="#2A2928" strokeWidth="5" />
        <path d="M 15 70 L 65 70 L 52 35 L 28 35 Z" fill="#D48A70" stroke="#2A2928" strokeWidth="2" />
        <ellipse cx="40" cy="70" rx="25" ry="6" fill="#C4956A" />
        <circle cx="40" cy="74" r="7" fill="#FFF5E1" />
      </svg>
    </div>
  );
}

// ─── Memory Box SVG ───────────────────────────────────────────
function MemoryBoxSVG({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={styles.memoryBoxWrapper}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', damping: 20 }}
      title="The memory box"
    >
      <svg width="100" height="70" viewBox="0 0 100 70" style={{ overflow: 'visible' }}>
        {/* Box body */}
        <rect x="5" y="28" width="90" height="42" fill="#8B5A2B" stroke="#5C3D1D" strokeWidth="2" rx="3" />
        {/* Wood grain lines */}
        <line x1="5" y1="40" x2="95" y2="40" stroke="rgba(92,61,29,0.3)" strokeWidth="1" />
        <line x1="5" y1="52" x2="95" y2="52" stroke="rgba(92,61,29,0.3)" strokeWidth="1" />
        <line x1="5" y1="62" x2="95" y2="62" stroke="rgba(92,61,29,0.2)" strokeWidth="1" />
        {/* Lid */}
        <motion.g
          className={styles.memoryBoxLid}
          animate={{ rotate: hovered ? -18 : 0 }}
          style={{ transformOrigin: '5px 28px' }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <rect x="5" y="18" width="90" height="14" fill="#A0644D" stroke="#5C3D1D" strokeWidth="2" rx="2" />
          {/* Lid lines */}
          <line x1="5" y1="25" x2="95" y2="25" stroke="rgba(92,61,29,0.2)" strokeWidth="1" />
        </motion.g>
        {/* Lock clasp */}
        <rect x="43" y="22" width="14" height="10" fill="#C4956A" stroke="#5C3D1D" strokeWidth="1.5" rx="2" />
        <circle cx="50" cy="27" r="3" fill="#5C3D1D" />
        {/* Glow when hovered */}
        {hovered && (
          <ellipse cx="50" cy="50" rx="45" ry="20" fill="rgba(244,210,100,0.18)" />
        )}
      </svg>
    </motion.div>
  );
}

// ─── Final letter SVG on desk ─────────────────────────────────
function LetterOnDesk({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className={styles.letterWrapper}
      onClick={onClick}
      whileHover={{ y: -6, rotate: 1 }}
      transition={{ type: 'spring', damping: 18 }}
      title="A letter for you"
    >
      <svg width="80" height="55" viewBox="0 0 80 55" style={{ overflow: 'visible' }}>
        {/* Envelope body */}
        <rect x="2" y="10" width="76" height="44" fill="#EAE4DD" stroke="rgba(92,61,29,0.3)" strokeWidth="1.5" rx="2" />
        {/* V-flap */}
        <polygon points="2,10 78,10 40,35" fill="#D4C9BE" stroke="rgba(92,61,29,0.15)" strokeWidth="1" />
        {/* Bottom V lines */}
        <line x1="2" y1="54" x2="40" y2="32" stroke="rgba(92,61,29,0.1)" strokeWidth="1" />
        <line x1="78" y1="54" x2="40" y2="32" stroke="rgba(92,61,29,0.1)" strokeWidth="1" />
        {/* Wax seal */}
        <circle cx="40" cy="34" r="8" fill="#D48A70" stroke="rgba(92,61,29,0.2)" strokeWidth="1" />
        <text x="40" y="38" textAnchor="middle" fill="#FAF7F1" fontSize="9">✨</text>
      </svg>
    </motion.div>
  );
}

// ─── Main Last Night Room ─────────────────────────────────────
export default function LastNightRoom() {
  const [activeModal, setActiveModal] = useState<'none' | 'memory' | 'letter'>('none');
  const [mounted, setMounted] = useState(false);
  const dust = useDustParticles(28);

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.scene}>
      {/* Sky glow overlay */}
      <div className={styles.skyGlow} />

      {/* Window */}
      <div className={styles.window}>
        {/* Glass glare */}
        <div className={styles.windowGlare} />
        {/* Cross bars */}
        <div className={`${styles.windowBar} ${styles.horizontal}`} />
        <div className={`${styles.windowBar} ${styles.vertical}`} />
        {/* Birds flying through window */}
        {[0, 1, 2, 3].map(i => (
          <Bird key={i} delay={i * 4 + 2} y={15 + i * 18} />
        ))}
      </div>

      {/* Curtains */}
      <div className={styles.curtainLeft} />
      <div className={styles.curtainRight} />

      {/* Golden light spilling from window onto desk */}
      <div className={styles.lightSpill} />

      {/* Lamp glow */}
      <div className={styles.lampGlow} />

      {/* Bookshelf */}
      <WornBookshelf />

      {/* Dust particles — ultra-slow */}
      {mounted && dust.map(p => (
        <motion.div
          key={p.id}
          className={styles.dust}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [0, 0.55, 0.3, 0.55, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floor */}
      <div className={styles.floor} />

      {/* Desk face */}
      <div className={styles.deskFace} />

      {/* Desk surface */}
      <div className={styles.desk} />

      {/* Desk objects (coffee stains, books, cap, letter, sticky notes) */}
      <DeskObjects />

      {/* Lamp */}
      <Lamp />

      {/* Memory box — interactive */}
      <MemoryBoxSVG onClick={() => setActiveModal('memory')} />

      {/* Final letter — interactive */}
      <LetterOnDesk onClick={() => setActiveModal('letter')} />

      {/* Ezi reading peacefully */}
      <EziReading />

      {/* Old cat sleeping */}
      <OldCatSleeping />

      {/* Quiet hint */}
      <motion.div
        className={styles.quietHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
      >
        The wooden box and the letter are on the desk.
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'memory' && (
          <MemoryBox key="memory" onClose={() => setActiveModal('none')} />
        )}
        {activeModal === 'letter' && (
          <FinalLetter key="letter" onClose={() => setActiveModal('none')} />
        )}
      </AnimatePresence>
    </div>
  );
}
