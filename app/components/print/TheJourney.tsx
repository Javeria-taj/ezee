'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './journey.module.css';

interface TheJourneyProps {
  docName: string;
  shopName: string;
  isNight: boolean;
  onClose: () => void;
}

// ─── TIME OF DAY ──────────────────────────────────────────────────
function getTimeOfDay(): 'morning' | 'afternoon' | 'goldenHour' | 'rainyEvening' | 'moonlitNight' {
  const h = new Date().getHours();
  if (h >= 5 && h < 10) return 'morning';
  if (h >= 10 && h < 16) return 'afternoon';
  if (h >= 16 && h < 19) return 'goldenHour';
  if (h >= 19 && h < 23) return 'rainyEvening';
  return 'moonlitNight';
}

// ─── SEASON ───────────────────────────────────────────────────────
type Season = 'monsoon' | 'ramadan' | 'examWeek' | 'diwali' | 'christmas' | 'spring' | 'normal';
function getSeason(): Season {
  const m = new Date().getMonth(); // 0-indexed
  const d = new Date().getDate();
  // June, July, August → Monsoon
  if (m >= 5 && m <= 7) return 'monsoon';
  // March → Ramadan (approximate)
  if (m === 2) return 'ramadan';
  // April, May → Spring
  if (m >= 3 && m <= 4) return 'spring';
  // October → Diwali (late Oct)
  if (m === 9 && d >= 20) return 'diwali';
  // December → Christmas
  if (m === 11) return 'christmas';
  // Jan–Feb and Nov → check if exam season (simulate)
  if (m === 0 || m === 5 || m === 10) return 'examWeek';
  return 'normal';
}

const timeOfDayClassMap: Record<string, string> = {
  morning: styles.morning,
  afternoon: styles.afternoon,
  goldenHour: styles.goldenHour,
  rainyEvening: styles.rainyEvening,
  moonlitNight: styles.moonlitNight,
};

const isLightMode = (t: string) => t !== 'moonlitNight';

// ─── PALETTE HELPERS ──────────────────────────────────────────────
function skyColor(tod: string) {
  if (tod === 'morning') return '#FDE8C8';
  if (tod === 'afternoon') return '#D8EDD8';
  if (tod === 'goldenHour') return '#F5C87A';
  if (tod === 'rainyEvening') return '#B8C8D8';
  return '#0C1018';
}

function dotColor(tod: string) {
  return isLightMode(tod) ? 'rgba(42,41,40,0.3)' : 'rgba(234,228,221,0.3)';
}

function dotActiveColor(tod: string) {
  return isLightMode(tod) ? '#2A2928' : '#EAE4DD';
}

// ─── AMBIENT CLOUDS ───────────────────────────────────────────────
function Clouds({ tod }: { tod: string }) {
  const night = tod === 'moonlitNight';
  const fill = night ? 'rgba(28,26,24,0.7)' : 'rgba(250,247,241,0.88)';
  const clouds = [
    { cx: 15, cy: 12, rx: 7, ry: 3, dur: 55 },
    { cx: 50, cy: 8,  rx: 10, ry: 4, dur: 80 },
    { cx: 80, cy: 14, rx: 6,  ry: 2.5, dur: 65 },
  ];
  return (
    <>
      {clouds.map((c, i) => (
        <div
          key={i}
          className={styles.cloud}
          style={{
            top: `${c.cy}%`,
            left: `${c.cx - 10}%`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${i * -14}s`,
          }}
        >
          <svg width="140" height="55" viewBox="0 0 140 55">
            <ellipse cx="70" cy="30" rx={c.rx * 7} ry={c.ry * 6} fill={fill} />
            <ellipse cx={50} cy={28} rx={c.rx * 4.5} ry={c.ry * 5} fill={fill} />
            <ellipse cx={90} cy={29} rx={c.rx * 5} ry={c.ry * 4.5} fill={fill} />
          </svg>
        </div>
      ))}
    </>
  );
}

// ─── BIRDS ────────────────────────────────────────────────────────
function Birds({ tod }: { tod: string }) {
  if (tod === 'moonlitNight') return null;
  const color = 'rgba(42,41,40,0.35)';
  return (
    <>
      {[{ top: '18%', dur: 22, delay: 0 }, { top: '22%', dur: 28, delay: -10 }].map((b, i) => (
        <div
          key={i}
          className={styles.bird}
          style={{ top: b.top, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
        >
          <svg width="32" height="14" viewBox="0 0 32 14">
            <path d="M 0 7 Q 8 0 14 7" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 14 7 Q 20 0 32 7" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </>
  );
}

// ─── DUST PARTICLES ───────────────────────────────────────────────
function Dust({ tod }: { tod: string }) {
  const night = tod === 'moonlitNight';
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`${styles.dust} ${night ? styles.dustNight : ''}`}
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            left: `${8 + i * 14}%`,
            top: `${30 + (i * 7) % 40}%`,
            animationDuration: `${9 + i * 2}s`,
            animationDelay: `${i * 1.5}s`,
            ['--dx' as string]: `${(i % 2 === 0 ? 1 : -1) * (25 + i * 8)}px`,
            ['--dy' as string]: `${-35 - i * 10}px`,
          }}
        />
      ))}
    </>
  );
}

// ─── MONSOON RAIN ─────────────────────────────────────────────────
function MonsoonRain() {
  return (
    <div className={styles.monsoonRain}>
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className={styles.raindrop}
          style={{
            left: `${(i / 18) * 100}%`,
            top: 0,
            animationDuration: `${0.6 + (i % 5) * 0.15}s`,
            animationDelay: `${(i * 0.08) % 0.8}s`,
            height: `${10 + i % 8}px`,
          }}
        />
      ))}
    </div>
  );
}

// ─── DIWALI LANTERNS ─────────────────────────────────────────────
function DiwaliLanterns() {
  const positions = [12, 28, 44, 60, 76, 90];
  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '60px', pointerEvents: 'none', zIndex: 5 }}
      viewBox="0 0 800 60"
      preserveAspectRatio="none"
    >
      <path d={`M 0 10 Q 400 35 800 10`} fill="none" stroke="rgba(42,41,40,0.25)" strokeWidth="1.5" />
      {positions.map((pct, i) => {
        const x = (pct / 100) * 800;
        const y = 10 + Math.sin((pct / 100) * Math.PI) * 14;
        return (
          <g key={i} transform={`translate(${x}, ${y})`} className={styles.lantern}>
            <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(42,41,40,0.3)" strokeWidth="1" />
            <rect x="-8" y="5" width="16" height="22" rx="2" fill="#D48A70" />
            <rect x="-8" y="5" width="16" height="3" fill="#A87A51" />
            <rect x="-8" y="24" width="16" height="3" fill="#A87A51" />
            <circle cx="0" cy="16" r="5" fill="rgba(244,208,63,0.85)" className={styles.ramadanLantern} />
          </g>
        );
      })}
    </svg>
  );
}

// ─── RAMADAN LANTERNS ─────────────────────────────────────────────
function RamadanLanterns() {
  const positions = [10, 25, 40, 55, 70, 85];
  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '70px', pointerEvents: 'none', zIndex: 5 }}
      viewBox="0 0 800 70"
      preserveAspectRatio="none"
    >
      <path d={`M 0 10 Q 400 35 800 10`} fill="none" stroke="rgba(42,41,40,0.25)" strokeWidth="1.5" />
      {positions.map((pct, i) => {
        const x = (pct / 100) * 800;
        const y = 10 + Math.sin((pct / 100) * Math.PI) * 14;
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(42,41,40,0.4)" strokeWidth="1" />
            <path d="M -6 8 Q 0 0 6 8 Z" fill="#C4956A" stroke="rgba(42,41,40,0.2)" strokeWidth="0.8" />
            <polygon points="-6,8 6,8 4,26 -4,26" fill="rgba(250,247,241,0.9)" stroke="rgba(42,41,40,0.2)" strokeWidth="0.8" />
            <rect x="-4" y="26" width="8" height="3" fill="#C4956A" rx="0.5" />
            <circle cx="0" cy="17" r="4.5" fill="#F4D03F" className={styles.ramadanLantern} style={{ filter: 'drop-shadow(0 0 5px #F4D03F)' }} />
          </g>
        );
      })}
    </svg>
  );
}

// ─── CHRISTMAS TWINKLES ──────────────────────────────────────────
function ChristmasTwinkles() {
  const colors = ['#F4D03F', '#D48A70', '#A9B59D', '#7A6D8C', '#FAF7F1'];
  return (
    <>
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className={styles.twinkleStar}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: colors[i % colors.length],
            left: `${(i / 14) * 90 + 5}%`,
            top: `${10 + (i % 3) * 8}%`,
            animationDuration: `${1.2 + (i % 4) * 0.5}s`,
            animationDelay: `${(i * 0.18) % 1.5}s`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

// ─── SPRING BLOSSOMS ─────────────────────────────────────────────
function SpringBlossoms() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={styles.blossom}
          style={{
            left: `${(i / 8) * 90 + 5}%`,
            top: '-20px',
            animationDuration: `${7 + i * 1.2}s`,
            animationDelay: `${(i * 0.9) % 5}s`,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            {[0, 72, 144, 216, 288].map((deg, j) => (
              <ellipse
                key={j}
                cx={5 + 3 * Math.cos((deg * Math.PI) / 180)}
                cy={5 + 3 * Math.sin((deg * Math.PI) / 180)}
                rx="2.2"
                ry="1.4"
                transform={`rotate(${deg} 5 5)`}
                fill="rgba(212,138,112,0.65)"
              />
            ))}
          </svg>
        </div>
      ))}
    </>
  );
}

// ─── EXAM WEEK STICKY NOTES ───────────────────────────────────────
function ExamStickyNotes() {
  const notes = ['Study hard!', 'You can do it ✓', 'Almost there'];
  const colors = ['#F4D03F', '#A9B59D', '#D48A70'];
  return (
    <>
      {notes.map((text, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${15 + i * 12}%`,
            left: `${4 + i * 3}%`,
            width: '52px',
            height: '50px',
            background: colors[i],
            transform: `rotate(${-10 + i * 8}deg)`,
            boxShadow: '2px 3px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            opacity: 0.75,
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '7px', color: '#2A2928', textAlign: 'center', lineHeight: 1.3 }}>
            {text}
          </span>
        </div>
      ))}
    </>
  );
}

// ─── SEASONAL DECORATIONS ─────────────────────────────────────────
function SeasonalDecor({ season, tod }: { season: Season; tod: string }) {
  if (season === 'monsoon' || tod === 'rainyEvening') return <MonsoonRain />;
  if (season === 'diwali') return <DiwaliLanterns />;
  if (season === 'christmas') return <ChristmasTwinkles tod={tod} />;
  if (season === 'spring') return <SpringBlossoms />;
  if (season === 'ramadan') return <RamadanLanterns />;
  if (season === 'examWeek') return <ExamStickyNotes tod={tod} />;
  return null;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 1 — ARRIVAL
// Paper airplane lands. Clouds move. Ezi catches the notes.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ChapterArrival({ tod }: { docName?: string; tod: string }) {
  const light = isLightMode(tod);
  const paperColor = light ? '#FAF7F1' : '#EAE4DD';
  const inkColor = light ? '#2A2928' : '#FAF7F1';
  const skyFill = skyColor(tod);

  return (
    <div className={styles.sceneWrapper}>
      {/* Sky */}
      <div className={styles.skyLayer} style={{ background: skyFill, opacity: 0.3 }} />

      {/* Ambient */}
      <Clouds tod={tod} />
      <Birds tod={tod} />
      <Dust tod={tod} />

      {/* Paper airplane gliding in */}
      <div className={styles.airplane}>
        <svg width="80" height="64" viewBox="0 0 80 64">
          <path d="M 0 32 L 80 0 L 56 64 L 36 38 Z" fill={paperColor} stroke="rgba(42,41,40,0.18)" strokeWidth="1.5" />
          <path d="M 36 38 L 56 64 L 64 42 Z" fill="rgba(42,41,40,0.07)" />
          <path d="M 36 38 L 80 0" stroke="rgba(42,41,40,0.1)" strokeWidth="0.8" />
          {/* Tiny text lines on paper */}
          <line x1="20" y1="28" x2="50" y2="18" stroke="rgba(42,41,40,0.1)" strokeWidth="1" />
          <line x1="18" y1="32" x2="44" y2="23" stroke="rgba(42,41,40,0.08)" strokeWidth="1" />
        </svg>
      </div>

      {/* Ezi catching — simplified SVG in arrival pose */}
      <div className={styles.eziArrival}>
        <svg width="100" height="130" viewBox="0 0 120 160">
          {/* Body */}
          <path d="M 60 20 C 90 20 110 60 112 100 C 114 130 95 155 60 155 C 25 155 6 130 8 100 C 10 60 30 20 60 20 Z" fill={inkColor} />
          {/* Face */}
          <ellipse cx="60" cy="78" rx="36" ry="28" fill={light ? '#FAF7F1' : '#2A2928'} />
          {/* Happy eyes */}
          <path d="M 46 74 Q 52 68 56 74" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 64 74 Q 68 68 74 74" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Smile */}
          <path d="M 52 84 Q 60 92 68 84" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <ellipse cx="44" cy="82" rx="7" ry="4" fill="#D48A70" opacity="0.45" />
          <ellipse cx="76" cy="82" rx="7" ry="4" fill="#D48A70" opacity="0.45" />
          {/* Arms up — catching pose */}
          <path d="M 12 90 C 0 60 4 30 20 18" stroke={inkColor} strokeWidth="12" strokeLinecap="round" fill="none" />
          <path d="M 108 90 C 120 60 116 30 100 18" stroke={inkColor} strokeWidth="12" strokeLinecap="round" fill="none" />
          {/* Apron */}
          <path d="M 30 100 Q 40 118 60 120 Q 80 118 90 100" fill="rgba(234,228,221,0.35)" stroke="none" />
          {/* Goggles */}
          <circle cx="50" cy="72" r="8" fill="none" stroke={light ? '#A9B59D' : '#7A6D8C'} strokeWidth="2" />
          <circle cx="70" cy="72" r="8" fill="none" stroke={light ? '#A9B59D' : '#7A6D8C'} strokeWidth="2" />
          <line x1="58" y1="72" x2="62" y2="72" stroke={light ? '#A9B59D' : '#7A6D8C'} strokeWidth="2" />
        </svg>
      </div>

      {/* Ground line */}
      <div style={{ position: 'absolute', bottom: '25%', left: '10%', right: '10%', height: '1px', background: `rgba(${light ? '42,41,40' : '234,228,221'},0.08)` }} />

      {/* Caption */}
      <div className={styles.caption}>
        <p className={`${styles.chapterLabel} ${light ? styles.chapterDarkText : styles.chapterLightText}`}>
          Arrival
        </p>
        <p className={`${styles.chapterText} ${light ? styles.chapterDarkText : styles.chapterLightText}`}>
          Your notes arrived safely.
          <br />
          <span style={{ opacity: 0.55, fontSize: '1rem' }}>Ezi was waiting.</span>
        </p>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 2 — PREPARATION
// Warm printer lights. Ink appears. Stack grows. Coffee steam.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ChapterPreparation({ tod }: { tod: string }) {
  const light = isLightMode(tod);
  const wallFill = light ? '#EAE4DD' : '#1C1A18';
  const floorFill = light ? '#D48A70' : '#2A2928';
  const inkColor = light ? '#2A2928' : '#FAF7F1';
  const paperColor = '#FAF7F1';
  const isRaining = tod === 'rainyEvening' || tod === 'moonlitNight';

  return (
    <div className={styles.sceneWrapper}>
      <Dust tod={tod} />

      {/* Shop interior floor */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: floorFill, opacity: 0.45 }} />
      {/* Shop wall */}
      <div style={{ position: 'absolute', bottom: '30%', left: 0, right: 0, top: '35%', background: wallFill, opacity: 0.55 }} />

      {/* Window on the wall — with optional rain */}
      <div style={{ position: 'absolute', top: '15%', right: '8%', width: '180px', height: '130px' }}>
        <svg width="180" height="130" viewBox="0 0 180 130">
          <rect x="2" y="2" width="176" height="126" rx="4" fill={isRaining ? 'rgba(140,160,185,0.25)' : 'rgba(169,181,157,0.15)'} stroke={`rgba(${light ? '42,41,40' : '234,228,221'},0.2)`} strokeWidth="3" />
          <line x1="91" y1="2" x2="91" y2="128" stroke={`rgba(${light ? '42,41,40' : '234,228,221'},0.2)`} strokeWidth="2.5" />
          <line x1="2" y1="65" x2="178" y2="65" stroke={`rgba(${light ? '42,41,40' : '234,228,221'},0.2)`} strokeWidth="2.5" />
          {/* Curtains */}
          <path d="M 2 2 Q 20 30 12 65 Q 20 95 2 128" fill="rgba(212,138,112,0.2)" />
          <path d="M 178 2 Q 160 30 168 65 Q 160 95 178 128" fill="rgba(212,138,112,0.2)" />
          {/* Sky outside */}
          {tod === 'morning' && <rect x="14" y="4" width="74" height="60" fill="rgba(253,232,197,0.4)" />}
          {tod === 'afternoon' && <rect x="14" y="4" width="74" height="60" fill="rgba(216,237,216,0.3)" />}
          {tod === 'goldenHour' && <rect x="14" y="4" width="74" height="60" fill="rgba(245,200,122,0.4)" />}
          {(tod === 'rainyEvening' || tod === 'moonlitNight') && <rect x="14" y="4" width="74" height="60" fill="rgba(100,120,150,0.3)" />}
        </svg>

        {/* Rain droplets on window */}
        {isRaining && [...Array(7)].map((_, i) => (
          <div
            key={i}
            className={styles.raindrop}
            style={{
              left: `${10 + i * 12}%`,
              top: 0,
              animationDuration: `${0.65 + i * 0.1}s`,
              animationDelay: `${i * 0.12}s`,
              height: '12px',
              width: '1.5px',
              position: 'absolute',
            }}
          />
        ))}
      </div>

      {/* Printer */}
      <div style={{ position: 'absolute', bottom: '28%', left: '50%', transform: 'translateX(-55%)', width: '200px' }}>
        <svg width="200" height="130" viewBox="0 0 200 130" style={{ overflow: 'visible' }}>
          {/* Body */}
          <path d="M 20 40 L 180 40 Q 192 40 192 52 L 192 108 Q 192 118 180 118 L 20 118 Q 8 118 8 108 L 8 52 Q 8 40 20 40 Z" fill={light ? '#EAE4DD' : '#252320'} stroke={`rgba(${light ? '42,41,40' : '234,228,221'},0.2)`} strokeWidth="2" />
          {/* Top lid */}
          <path d="M 30 12 L 170 12 Q 180 12 180 22 L 180 40 L 20 40 L 20 22 Q 20 12 30 12 Z" fill={light ? '#FAF7F1' : '#1C1A18'} stroke={`rgba(${light ? '42,41,40' : '234,228,221'},0.2)`} strokeWidth="2" />
          {/* Paper stack growing (animated) */}
          <g className={styles.paperStack}>
            <rect x="55" y="-6" width="90" height="18" fill={paperColor} stroke="rgba(42,41,40,0.15)" strokeWidth="1.5" rx="1" />
            <rect x="58" y="-2" width="84" height="14" fill={paperColor} stroke="rgba(42,41,40,0.1)" strokeWidth="1" rx="1" />
            <rect x="60" y="1" width="80" height="10" fill={paperColor} rx="1" />
          </g>
          {/* Output tray */}
          <rect x="40" y="118" width="120" height="10" fill={light ? '#FAF7F1' : '#252320'} stroke={`rgba(${light ? '42,41,40' : '234,228,221'},0.15)`} strokeWidth="1.5" rx="1" />
          {/* Control panel */}
          <rect x="25" y="52" width="36" height="12" fill={light ? '#2A2928' : '#FAF7F1'} rx="2" opacity="0.7" />
          {/* Blinking lights */}
          <circle cx="162" cy="58" r="5.5" fill="#A9B59D" className={styles.printerGlow} />
          <circle cx="176" cy="58" r="5.5" fill="#F4D03F" className={styles.printerGlow} style={{ animationDelay: '0.8s' }} />
          {/* Ink meter */}
          <rect x="25" y="70" width="60" height="5" rx="2" fill="rgba(42,41,40,0.1)" />
          <rect x="25" y="70" width="42" height="5" rx="2" fill="#A9B59D" opacity="0.7" />
        </svg>
      </div>

      {/* Coffee mug with steam */}
      <div style={{ position: 'absolute', bottom: '29%', right: '18%' }}>
        <svg width="56" height="70" viewBox="0 0 56 80" style={{ overflow: 'visible' }}>
          <path d="M 8 24 L 8 60 Q 8 68 28 68 Q 48 68 48 60 L 48 24 Z" fill={light ? '#FAF7F1' : '#1C1A18'} stroke={`rgba(${light ? '42,41,40' : '234,228,221'},0.2)`} strokeWidth="1.5" />
          <path d="M 48 32 Q 58 32 58 42 Q 58 52 48 52" fill="none" stroke={`rgba(${light ? '42,41,40' : '234,228,221'},0.2)`} strokeWidth="1.5" />
          <ellipse cx="28" cy="25" rx="20" ry="5" fill="rgba(196,149,106,0.6)" />
          <path d="M 18 10 Q 14 2 22 -8" fill="none" stroke="rgba(250,247,241,0.7)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 28 8 Q 24 0 32 -10" fill="none" stroke="rgba(250,247,241,0.6)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {/* Steam divs */}
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={styles.steam}
            style={{
              left: `${14 + i * 8}px`,
              bottom: '62px',
              height: '8px',
              animationDelay: `${i * 0.9}s`,
            }}
          />
        ))}
      </div>

      {/* Ezi — sitting quietly beside printer, reading */}
      <div style={{ position: 'absolute', bottom: '27%', left: '22%' }}>
        <svg width="68" height="90" viewBox="0 0 80 110">
          {/* Body */}
          <path d="M 40 12 C 62 12 74 42 74 68 C 74 90 62 108 40 108 C 18 108 6 90 6 68 C 6 42 18 12 40 12 Z" fill={inkColor} />
          {/* Face */}
          <ellipse cx="40" cy="52" rx="24" ry="19" fill={light ? '#FAF7F1' : '#2A2928'} />
          {/* Resting/reading eyes — half closed */}
          <path d="M 30 50 Q 35 46 40 50" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="2" fill={light ? 'rgba(42,41,40,0.15)' : 'rgba(234,228,221,0.15)'} strokeLinecap="round" />
          <path d="M 40 50 Q 45 46 50 50" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="2" fill={light ? 'rgba(42,41,40,0.15)' : 'rgba(234,228,221,0.15)'} strokeLinecap="round" />
          {/* Serene mouth */}
          <path d="M 34 58 Q 40 62 46 58" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <ellipse cx="28" cy="56" rx="5" ry="3" fill="#D48A70" opacity="0.4" />
          <ellipse cx="52" cy="56" rx="5" ry="3" fill="#D48A70" opacity="0.4" />
          {/* Apron */}
          <path d="M 22 68 Q 28 82 40 84 Q 52 82 58 68" fill="rgba(234,228,221,0.3)" />
          {/* Arms — reading a book */}
          <path d="M 10 72 C 2 60 6 44 14 36" stroke={inkColor} strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M 70 72 C 78 60 74 44 66 36" stroke={inkColor} strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Tiny open book in hands */}
          <rect x="18" y="34" width="18" height="14" rx="1" fill={light ? '#FAF7F1' : '#EAE4DD'} transform="rotate(-10 18 34)" opacity="0.9" />
          <rect x="36" y="34" width="18" height="14" rx="1" fill={light ? '#FAF7F1' : '#EAE4DD'} transform="rotate(10 46 34)" opacity="0.9" />
          <line x1="36" y1="35" x2="36" y2="47" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
          {[0, 1, 2].map(i => (
            <line key={i} x1={20} y1={38 + i * 3} x2={32} y2={38 + i * 3} stroke="rgba(42,41,40,0.12)" strokeWidth="0.8" />
          ))}
          {/* Pencil behind ear */}
          <rect x="58" y="28" width="3" height="16" rx="1" fill="#F4D03F" transform="rotate(20 60 30)" />
          <path d="M 59 28 L 61 24" stroke="#D48A70" strokeWidth="1.5" strokeLinecap="round" transform="rotate(20 60 30)" />
        </svg>
      </div>

      {/* Caption */}
      <div className={styles.caption}>
        <p className={`${styles.chapterLabel} ${light ? styles.chapterDarkText : styles.chapterLightText}`}>
          Preparation
        </p>
        <p className={`${styles.chapterText} ${light ? styles.chapterDarkText : styles.chapterLightText}`}>
          Ezi is watching over them.
          <br />
          <span style={{ opacity: 0.5, fontSize: '0.95rem' }}>Nothing rushed.</span>
        </p>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 3 — CARE
// Binding. Bookmarks. Protective covers. Like something important.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ChapterCare({ tod }: { docName?: string; tod: string }) {
  const light = isLightMode(tod);
  const inkColor = light ? '#2A2928' : '#FAF7F1';
  const tableColor = light ? '#C4956A' : '#8B6340';

  return (
    <div className={styles.sceneWrapper}>
      <Dust tod={tod} />

      {/* Warm workbench */}
      <div style={{ position: 'absolute', bottom: '20%', left: '10%', right: '10%', height: '6px', background: tableColor, borderRadius: '3px', opacity: 0.7 }} />
      <div style={{ position: 'absolute', bottom: 0, left: '15%', right: '15%', top: '55%', background: `rgba(${light ? '180,130,80' : '42,32,22'},0.35)`, borderRadius: '0 0 4px 4px' }} />

      {/* Document stack */}
      <div style={{ position: 'absolute', bottom: '21%', left: '50%', transform: 'translateX(-60%)' }} className={styles.paperStack}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '140px',
              height: '7px',
              background: '#FAF7F1',
              border: '1px solid rgba(42,41,40,0.1)',
              borderRadius: '1px',
              marginTop: '-2px',
              transform: `rotate(${(i % 2 === 0 ? -0.5 : 0.5) * 0.8}deg)`,
              boxShadow: i === 0 ? '0 4px 12px rgba(42,41,40,0.1)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Spiral binding rings along left edge — animated sequentially */}
      <div style={{ position: 'absolute', bottom: '21%', left: 'calc(50% - 75px)', transform: 'translateX(-60%)' }}>
        {[...Array(6)].map((_, i) => (
          <svg
            key={i}
            width="20" height="16"
            viewBox="0 0 20 16"
            className={styles.bindingRing}
            style={{ animationDelay: `${i * 0.12}s`, display: 'block', marginBottom: '2px' }}
          >
            <path d="M 10 1 C 4 1 1 5 1 8 C 1 11 4 15 10 15 C 16 15 19 11 19 8 C 19 5 16 1 10 1 Z" fill="none" stroke="#7A6D8C" strokeWidth="2.5" />
          </svg>
        ))}
      </div>

      {/* Bookmark ribbon */}
      <div style={{ position: 'absolute', bottom: '22%', left: 'calc(50% - 10px)', transform: 'translateX(-50%)' }} className={styles.bookmark}>
        <svg width="18" height="40" viewBox="0 0 18 40">
          <path d="M 2 0 L 16 0 L 16 36 L 9 28 L 2 36 Z" fill="#D48A70" />
        </svg>
      </div>

      {/* Protective cover laying over */}
      <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-60%)' }} className={styles.cover}>
        <svg width="155" height="55" viewBox="0 0 155 55">
          <rect x="0" y="0" width="155" height="55" rx="3" fill="rgba(169,181,157,0.35)" stroke="rgba(42,41,40,0.12)" strokeWidth="1.5" />
          {/* Transparent overlay shimmer */}
          <rect x="5" y="5" width="145" height="45" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* Paperclips */}
      {[0, 1].map(i => (
        <div key={i} style={{ position: 'absolute', bottom: '24%', left: `calc(50% + ${-20 + i * 55}px)`, transform: 'translateX(-60%)' }}>
          <svg width="14" height="36" viewBox="0 0 14 36">
            <path d="M 7 30 L 7 6 Q 7 1 12 1 Q 17 1 17 10 L 17 32 Q 17 38 7 38 Q -3 38 -3 24 L -3 8" fill="none" stroke="#A9B59D" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      ))}

      {/* Ezi carefully attending */}
      <div style={{ position: 'absolute', bottom: '19%', left: '68%' }}>
        <svg width="60" height="80" viewBox="0 0 80 110">
          <path d="M 40 12 C 62 12 74 42 74 68 C 74 90 62 108 40 108 C 18 108 6 90 6 68 C 6 42 18 12 40 12 Z" fill={inkColor} />
          <ellipse cx="40" cy="52" rx="24" ry="19" fill={light ? '#FAF7F1' : '#2A2928'} />
          {/* Focused / concentrated eyes */}
          <path d="M 30 50 Q 35 47 40 50" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 40 50 Q 45 47 50 50" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="28" cy="56" rx="5" ry="3" fill="#D48A70" opacity="0.4" />
          <ellipse cx="52" cy="56" rx="5" ry="3" fill="#D48A70" opacity="0.4" />
          {/* Gentle smile */}
          <path d="M 35 59 Q 40 63 45 59" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Arms working carefully */}
          <path d="M 8 78 C 0 65 2 50 10 42" stroke={inkColor} strokeWidth="10" strokeLinecap="round" fill="none" />
          <path d="M 72 78 C 80 65 78 50 70 42" stroke={inkColor} strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Apron */}
          <path d="M 22 68 Q 28 82 40 84 Q 52 82 58 68" fill="rgba(234,228,221,0.3)" />
        </svg>
      </div>

      {/* Caption */}
      <div className={styles.caption}>
        <p className={`${styles.chapterLabel} ${light ? styles.chapterDarkText : styles.chapterLightText}`}>
          Care
        </p>
        <p className={`${styles.chapterText} ${light ? styles.chapterDarkText : styles.chapterLightText}`}>
          Every page, carefully bound.
          <br />
          <span style={{ opacity: 0.5, fontSize: '0.95rem', fontStyle: 'italic' }}>Like something important.</span>
        </p>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHAPTER 4 — REST
// Warm shelf. Cat sleeping. Ezi beside the notes. Only relief.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ChapterRest({ tod, onClose }: { tod: string; onClose: () => void }) {
  const light = isLightMode(tod);
  const inkColor = light ? '#2A2928' : '#FAF7F1';
  const shelfColor = light ? '#C4956A' : '#5A3A22';
  const wallColor = light ? 'rgba(234,228,221,0.4)' : 'rgba(28,24,18,0.6)';

  return (
    <div className={styles.sceneWrapper}>
      <Dust tod={tod} />

      {/* Moonbeam for night */}
      {!light && (
        <div
          className={styles.moonbeam}
          style={{
            position: 'absolute',
            top: 0,
            left: '55%',
            width: '120px',
            height: '70%',
            background: 'linear-gradient(180deg, rgba(244,208,63,0.08), transparent)',
            transform: 'rotate(-8deg)',
            transformOrigin: 'top center',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Warm wall */}
      <div style={{ position: 'absolute', inset: 0, background: wallColor }} />

      {/* Desk lamp glow */}
      <div style={{ position: 'absolute', top: '8%', left: '12%' }}>
        <svg width="100" height="160" viewBox="0 0 100 200" style={{ overflow: 'visible' }}>
          {/* Lamp glow halo */}
          <circle cx="50" cy="120" r="65" fill={light ? 'rgba(244,208,63,0.08)' : 'rgba(244,208,63,0.18)'} className={styles.lampGlowCircle} />
          <circle cx="50" cy="120" r="35" fill={light ? 'rgba(244,208,63,0.06)' : 'rgba(244,208,63,0.14)'} className={styles.lampGlowCircle} />
          {/* Lamp base */}
          <rect x="35" y="185" width="30" height="8" rx="2" fill={`rgba(${light ? '42,41,40' : '234,228,221'},0.6)`} />
          <line x1="50" y1="185" x2="50" y2="90" stroke={`rgba(${light ? '42,41,40' : '234,228,221'},0.5)`} strokeWidth="5" strokeLinecap="round" />
          {/* Shade */}
          <path d="M 18 90 L 82 90 L 68 58 L 32 58 Z" fill="#7A6D8C" opacity={light ? 0.8 : 0.9} />
          {/* Bulb */}
          <circle cx="50" cy="88" r="8" fill={light ? '#FDF5E0' : '#F4D03F'} opacity="0.85" />
        </svg>
      </div>

      {/* Wooden shelf */}
      <div style={{ position: 'absolute', bottom: '32%', left: '8%', right: '8%', height: '14px', background: shelfColor, borderRadius: '3px', boxShadow: `0 4px 12px rgba(${light ? '196,149,106' : '42,32,22'},0.4)` }} />
      {/* Shelf brackets */}
      {[12, 88].map((pct, i) => (
        <div key={i} style={{ position: 'absolute', bottom: '30%', left: `${pct}%`, width: '18px', height: '40px', background: shelfColor, opacity: 0.7, borderRadius: '2px 0 0 2px' }} />
      ))}

      {/* Printed & bound notes sitting on shelf */}
      <div style={{ position: 'absolute', bottom: '33%', left: '38%' }}>
        <svg width="90" height="70" viewBox="0 0 90 70">
          {/* Stack of pages */}
          {[...Array(4)].map((_, i) => (
            <rect
              key={i}
              x={5 + i * 2}
              y={10 - i * 2}
              width="78"
              height="55"
              rx="2"
              fill="#FAF7F1"
              stroke="rgba(42,41,40,0.1)"
              strokeWidth="1"
            />
          ))}
          {/* Spiral binding */}
          {[...Array(5)].map((_, i) => (
            <ellipse key={i} cx="12" cy={15 + i * 9} rx="5" ry="4" fill="none" stroke="#7A6D8C" strokeWidth="2" />
          ))}
          {/* Bookmark ribbon */}
          <path d="M 68 10 L 72 10 L 72 28 L 70 24 L 68 28 Z" fill="#D48A70" />
          {/* Cover text lines */}
          {[0, 1, 2].map(i => (
            <rect key={i} x="20" y={25 + i * 9} width={i === 0 ? 40 : 30} height="3" rx="1" fill="rgba(42,41,40,0.12)" />
          ))}
        </svg>
      </div>

      {/* Sticky note on the notes */}
      <div style={{ position: 'absolute', bottom: '50%', left: '50%', transform: 'translateX(-30%)' }} className={styles.stickyNote}>
        <div style={{
          width: '70px',
          height: '68px',
          background: '#F4D03F',
          boxShadow: '2px 3px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
        }}>
          <span style={{
            fontFamily: 'Instrument Sans, sans-serif',
            fontSize: '9px',
            color: '#2A2928',
            textAlign: 'center',
            lineHeight: 1.4,
          }}>
            See you soon ✨
          </span>
        </div>
      </div>

      {/* Small plant nearby */}
      <div style={{ position: 'absolute', bottom: '32%', left: '20%' }} className={styles.plant}>
        <svg width="50" height="70" viewBox="0 0 50 70">
          <path d="M 25 70 L 25 40" stroke="#8BA382" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 25 55 Q 15 48 12 36" stroke="#8BA382" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M 25 46 Q 35 38 38 26" stroke="#8BA382" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <ellipse cx="12" cy="34" rx="7" ry="12" fill="#A9B59D" transform="rotate(-35 12 34)" />
          <ellipse cx="38" cy="24" rx="7" ry="12" fill="#A9B59D" transform="rotate(35 38 24)" />
          <ellipse cx="25" cy="24" rx="9" ry="14" fill="#A9B59D" />
          <rect x="16" y="62" width="18" height="8" rx="1.5" fill="#C4956A" />
        </svg>
      </div>

      {/* Tiny sleeping cat beside the notes */}
      <div style={{ position: 'absolute', bottom: '33%', right: '18%' }}>
        <svg width="72" height="40" viewBox="0 0 90 50">
          {/* Body — curled */}
          <ellipse cx="48" cy="30" rx="32" ry="16" fill={light ? '#2A2928' : '#EAE4DD'} />
          {/* Head */}
          <circle cx="20" cy="26" r="16" fill={light ? '#2A2928' : '#EAE4DD'} />
          {/* Ears */}
          <polygon points="6,18 14,18 10,6" fill={light ? '#2A2928' : '#EAE4DD'} />
          <polygon points="20,18 28,18 24,6" fill={light ? '#2A2928' : '#EAE4DD'} />
          {/* Sleeping eyes — crescent shaped */}
          <g className={styles.catEyes}>
            <path d="M 13 24 Q 17 21 20 24" stroke={light ? '#FAF7F1' : '#2A2928'} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 20 24 Q 23 21 26 24" stroke={light ? '#FAF7F1' : '#2A2928'} strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>
          {/* Tiny nose */}
          <ellipse cx="19" cy="29" rx="2" ry="1.5" fill={light ? '#D48A70' : '#C4956A'} />
          {/* Curled tail */}
          <path d="M 80 30 Q 88 22 82 16 Q 76 10 72 18" fill="none" stroke={light ? '#2A2928' : '#EAE4DD'} strokeWidth="6" strokeLinecap="round" className={styles.catTail} />
          {/* ZZZ (sleeping) */}
          <text x="30" y="10" fontFamily="Space Grotesk" fontSize="8" fill={`rgba(${light ? '42,41,40' : '234,228,221'},0.4)`}>z</text>
          <text x="38" y="5" fontFamily="Space Grotesk" fontSize="6" fill={`rgba(${light ? '42,41,40' : '234,228,221'},0.3)`}>z</text>
        </svg>
      </div>

      {/* Ezi sitting quietly beside the notes — restful pose */}
      <div className={styles.eziSitting} style={{ position: 'absolute', bottom: '32%', right: '36%' }}>
        <svg width="55" height="72" viewBox="0 0 80 110">
          <path d="M 40 12 C 62 12 74 42 74 68 C 74 90 62 108 40 108 C 18 108 6 90 6 68 C 6 42 18 12 40 12 Z" fill={inkColor} />
          <ellipse cx="40" cy="52" rx="24" ry="19" fill={light ? '#FAF7F1' : '#2A2928'} />
          {/* Peaceful closed eyes */}
          <path d="M 30 51 Q 35 47 40 51" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="2" fill={light ? 'rgba(42,41,40,0.2)' : 'rgba(234,228,221,0.2)'} strokeLinecap="round" />
          <path d="M 40 51 Q 45 47 50 51" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="2" fill={light ? 'rgba(42,41,40,0.2)' : 'rgba(234,228,221,0.2)'} strokeLinecap="round" />
          {/* Gentle smile */}
          <path d="M 34 59 Q 40 65 46 59" stroke={light ? '#2A2928' : '#FAF7F1'} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="28" cy="56" rx="5" ry="3" fill="#D48A70" opacity="0.4" />
          <ellipse cx="52" cy="56" rx="5" ry="3" fill="#D48A70" opacity="0.4" />
          {/* Arms relaxed, sitting */}
          <path d="M 10 80 C 6 72 8 60 14 52" stroke={inkColor} strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M 70 80 C 74 72 72 60 66 52" stroke={inkColor} strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Apron */}
          <path d="M 22 68 Q 28 82 40 84 Q 52 82 58 68" fill="rgba(234,228,221,0.25)" />
        </svg>
      </div>

      {/* Caption — only relief, no celebration */}
      <div className={styles.caption}>
        <p className={`${styles.chapterLabel} ${light ? styles.chapterDarkText : styles.chapterLightText}`}>
          Rest
        </p>
        <p className={`${styles.chapterText} ${light ? styles.chapterDarkText : styles.chapterLightText}`}>
          They&apos;re ready when you are.
          <br />
          <span style={{ opacity: 0.4, fontSize: '0.88rem', fontStyle: 'italic' }}>You weren&apos;t waiting alone.</span>
        </p>
      </div>

      {/* Close button — subtle, delayed, bottom */}
      <button
        className={`${styles.closeJourney} ${!light ? styles.closeJourneyNight : ''}`}
        onClick={onClose}
        aria-label="Return to your desk"
      >
        Return to your desk
      </button>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// THE JOURNEY — MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function TheJourney({ docName, isNight, onClose }: TheJourneyProps) {
  const [chapter, setChapter] = useState(0); // 0-3
  const tod = isNight ? 'moonlitNight' : getTimeOfDay();
  const season = getSeason();

  // Chapter auto-advance — every 9 seconds, stop at 3 (Rest stays forever)
  useEffect(() => {
    if (chapter >= 3) return;
    const timer = setTimeout(() => setChapter(c => c + 1), 9000);
    return () => clearTimeout(timer);
  }, [chapter]);

  const dotColor_ = dotColor(tod);
  const dotActiveColor_ = dotActiveColor(tod);

  return (
    <div className={`${styles.journey} ${timeOfDayClassMap[tod] ?? styles.afternoon}`}>

      {/* Seasonal decorations — persistent across chapters */}
      <SeasonalDecor season={season} tod={tod} />

      {/* Chapters */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={chapter} 
          initial={{ opacity: 0, filter: 'blur(4px)' }} 
          animate={{ opacity: 1, filter: 'blur(0px)' }} 
          exit={{ opacity: 0, filter: 'blur(4px)' }} 
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%' }}
        >
          {chapter === 0 && <ChapterArrival docName={docName} tod={tod} />}
          {chapter === 1 && <ChapterPreparation tod={tod} />}
          {chapter === 2 && <ChapterCare docName={docName} tod={tod} />}
          {chapter === 3 && <ChapterRest tod={tod} onClose={onClose} />}
        </motion.div>
      </AnimatePresence>

      {/* Chapter dots — ambient, not progress */}
      <div className={styles.chapterDots}>
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`${styles.dot} ${i === chapter ? styles.dotActive : ''}`}
            style={{
              background: i === chapter ? dotActiveColor_ : dotColor_,
            }}
          />
        ))}
      </div>
    </div>
  );
}
