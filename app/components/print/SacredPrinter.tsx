'use client';

import React, { useEffect, useRef } from 'react';
import styles from './print.module.css';
import EziPrinter from './EziPrinter';

interface SacredPrinterProps {
  isNight: boolean;
  copies: number;
  docNames: string[];
  onDone: () => void;
}

// Ambient rain drops
function RainWindow() {
  return (
    <svg
      width="160"
      height="120"
      viewBox="0 0 160 120"
      style={{ position: 'absolute', top: '1rem', right: '2rem', opacity: 0.7 }}
    >
      {/* Window frame */}
      <rect x="2" y="2" width="156" height="116" rx="4" fill="rgba(169,200,220,0.2)" stroke="rgba(42,41,40,0.25)" strokeWidth="3" />
      {/* Window cross */}
      <line x1="81" y1="2" x2="81" y2="118" stroke="rgba(42,41,40,0.25)" strokeWidth="3" />
      <line x1="2" y1="60" x2="158" y2="60" stroke="rgba(42,41,40,0.25)" strokeWidth="3" />
      {/* Curtain left */}
      <path d="M 2 2 Q 20 30 10 60 Q 22 90 2 118" fill="rgba(212,138,112,0.2)" stroke="rgba(212,138,112,0.3)" strokeWidth="1" />
      {/* Curtain right */}
      <path d="M 158 2 Q 140 30 150 60 Q 138 90 158 118" fill="rgba(212,138,112,0.2)" stroke="rgba(212,138,112,0.3)" strokeWidth="1" />
      {/* Rain drops */}
      {[15, 30, 50, 70, 90, 110, 130, 145].map((x, i) => (
        <g key={i} style={{ animation: `${styles.rainDrop} ${0.7 + i * 0.1}s linear infinite`, animationDelay: `${i * 0.09}s` }}>
          <line
            x1={x} y1={-20 + (i % 3) * 10} x2={x + 5} y2={-4 + (i % 3) * 10}
            stroke="rgba(169,200,220,0.6)" strokeWidth="1.5" strokeLinecap="round"
          />
        </g>
      ))}
      {/* Sky blurred scene */}
      <rect x="4" y="4" width="73" height="54" rx="2" fill="rgba(169,200,220,0.12)" />
      <rect x="84" y="4" width="72" height="54" rx="2" fill="rgba(169,200,220,0.12)" />
    </svg>
  );
}

// Coffee mug with steam
function CoffeeMug() {
  return (
    <div style={{ position: 'absolute', bottom: '2.5rem', left: '2rem' }}>
      <svg width="50" height="60" viewBox="0 0 50 60">
        {/* Mug */}
        <path d="M 5 20 L 5 46 Q 5 54 25 54 Q 45 54 45 46 L 45 20 Z" fill="#EAE4DD" stroke="rgba(42,41,40,0.2)" strokeWidth="1.5" />
        {/* Handle */}
        <path d="M 45 28 Q 56 28 56 36 Q 56 44 45 44" fill="none" stroke="rgba(42,41,40,0.2)" strokeWidth="1.5" />
        {/* Coffee liquid */}
        <ellipse cx="25" cy="21" rx="20" ry="5" fill="#C4956A" />
        {/* Mug pattern */}
        <path d="M 12 30 Q 18 26 24 30 Q 30 34 36 30" fill="none" stroke="rgba(42,41,40,0.12)" strokeWidth="1" />
        {/* Steam particles */}
        {[0, 1, 2].map(i => (
          <ellipse
            key={i}
            cx={15 + i * 10}
            cy={12 - i * 2}
            rx="2.5"
            ry="4"
            fill="rgba(250,247,241,0.6)"
            className={styles.steamParticle}
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

// Printer machine SVG
function PrinterMachine({ printing, progress }: { printing: boolean; progress: number }) {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" className={printing ? styles.printerVibrating : undefined}>
      {/* Body */}
      <rect x="20" y="40" width="200" height="100" rx="8" fill="#2A2928" />
      <rect x="24" y="44" width="192" height="92" rx="6" fill="#333" />

      {/* Front panel */}
      <rect x="24" y="100" width="192" height="36" rx="0" fill="#2A2928" />

      {/* Paper tray */}
      <rect x="60" y="130" width="120" height="8" rx="2" fill="#444" />
      <rect x="70" y="132" width="100" height="4" rx="1" fill="#555" />

      {/* Top slot — paper enters here */}
      <rect x="70" y="38" width="100" height="5" rx="2" fill="#1A1918" />
      {/* Paper entering */}
      {printing && progress < 80 && (
        <g className={styles.paperEntering}>
          <rect x="85" y="20" width="70" height="22" rx="1" fill="#FAF7F1" stroke="rgba(42,41,40,0.1)" strokeWidth="0.5" />
          {[0,1,2].map(i => (
            <line key={i} x1="91" y1={24 + i * 4} x2={91 + 40 - i * 5} y2={24 + i * 4} stroke="rgba(42,41,40,0.15)" strokeWidth="0.8" />
          ))}
        </g>
      )}
      {/* Paper exiting */}
      {printing && progress >= 60 && (
        <rect
          x="85"
          y={125 + (progress - 60) * 0.6}
          width="70"
          height="22"
          rx="1"
          fill="#FAF7F1"
          stroke="rgba(42,41,40,0.1)"
          strokeWidth="0.5"
        />
      )}

      {/* Control panel area */}
      <rect x="30" y="106" width="80" height="24" rx="3" fill="#1A1918" />

      {/* Blinking status lights */}
      <circle cx="40" cy="112" r="4.5" fill={printing ? '#A9B59D' : '#444'} className={printing ? styles.printerLight : undefined} />
      <circle cx="56" cy="112" r="4.5" fill={printing ? '#F4D03F' : '#444'} className={printing ? styles.printerLightSlow : undefined} />
      <circle cx="72" cy="112" r="4.5" fill={printing ? '#D48A70' : '#444'} className={printing ? styles.printerLight : undefined} style={{ animationDelay: '0.4s' }} />

      {/* Tiny display */}
      <rect x="40" y="118" width="62" height="10" rx="2" fill="#0D0D0D" />
      {printing && (
        <text x="71" y="126" textAnchor="middle" fontFamily="Space Grotesk" fontSize="5" fill="#A9B59D">
          {progress < 100 ? 'PRINTING...' : 'READY ✓'}
        </text>
      )}

      {/* Brand label */}
      <text x="175" y="115" textAnchor="middle" fontFamily="Instrument Sans" fontSize="6" fill="#555" fontWeight="600">EZEE</text>
      <text x="175" y="122" textAnchor="middle" fontFamily="Space Grotesk" fontSize="4" fill="#444">STUDIO</text>

      {/* Side vent lines */}
      {[0,1,2,3].map(i => (
        <line key={i} x1="198" y1={50 + i * 10} x2="212" y2={50 + i * 10} stroke="#444" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export default function SacredPrinter({ isNight, copies, docNames, onDone }: SacredPrinterProps) {
  const progressRef = useRef(0);
  const [progress, setProgress] = React.useState(0);

  // Simulate printing — slow, meaningful
  useEffect(() => {
    progressRef.current = 0;
    const duration = Math.max(copies * 8000, 8000); // 8 seconds per page
    const interval = 120;
    const steps = duration / interval;
    const increment = 100 / steps;

    let elapsed = 0;
    const timer = setInterval(() => {
      elapsed += increment;
      // Ease: slow at start, steady in middle, slow at end
      const eased = elapsed < 20
        ? elapsed * 0.4
        : elapsed > 80
        ? 80 + (elapsed - 80) * 0.5
        : elapsed;
      progressRef.current = Math.min(eased, 100);
      setProgress(progressRef.current);

      if (progressRef.current >= 100) {
        clearInterval(timer);
        setTimeout(onDone, 800);
      }
    }, interval);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstName = docNames[0] ?? 'your document';
  const waitMessages = [
    `Preparing "${firstName}"…`,
    'Warming up the printer…',
    ...docNames.slice(1).map(n => `Printing "${n}"…`),
    'Ezi is double-checking everything…',
    'Almost there…',
    'One more moment…',
  ];
  const msgIndex = Math.min(Math.floor((progress / 100) * (waitMessages.length - 1)), waitMessages.length - 1);

  let eziState: 'idle' | 'waiting' | 'success' | 'error' | 'makingCoffee' | 'organizingPapers' | 'adjustingBookmarks' | 'reading' = 'organizingPapers';
  if (progress < 20) eziState = 'makingCoffee';
  else if (progress < 80) eziState = 'organizingPapers';
  else if (progress < 100) eziState = 'adjustingBookmarks';
  else eziState = 'success';

  return (
    <div
      className={styles.sacredPrinterPhase}
      style={{ background: isNight ? 'rgba(28,26,24,0.98)' : 'rgba(250,247,241,0.98)' }}
    >
      {/* Rain window */}
      <RainWindow />

      {/* Coffee mug */}
      <CoffeeMug />

      {/* Plant */}
      <div style={{ position: 'absolute', bottom: '1rem', right: '2rem' }}>
        <svg width="50" height="80" viewBox="0 0 50 80" className={styles.plantSway}>
          <path d="M 25 80 L 25 45" stroke="#A9B59D" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="25" cy="30" rx="18" ry="22" fill="#A9B59D" />
          <ellipse cx="14" cy="38" rx="10" ry="15" fill="#8BA382" transform="rotate(-20 14 38)" />
          <ellipse cx="36" cy="38" rx="10" ry="15" fill="#8BA382" transform="rotate(20 36 38)" />
          <path d="M 25 45 Q 18 35 8 28" stroke="#8BA382" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 25 42 Q 32 33 40 26" stroke="#8BA382" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Pot */}
          <path d="M 16 72 L 34 72 L 32 80 L 18 80 Z" fill="#C4956A" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
          <rect x="14" y="70" width="22" height="4" rx="1" fill="#D4A574" />
        </svg>
      </div>

      {/* Cloud shadows */}
      <div className={styles.cloudShadow} />

      {/* Ezi interacting with the print job */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', width: '80px', height: '110px', transition: 'all 0.5s' }}>
        <EziPrinter state={eziState} isNight={isNight} copies={copies} />
      </div>

      {/* Bird flying overhead */}
      <div className={styles.bird} style={{ top: '15%', animationDelay: '3s' }} />

      {/* Main printer */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', zIndex: 10 }}>
        <PrinterMachine printing={true} progress={progress} />

        {/* Wait message — breathes */}
        <p className={styles.printerWaitMessage}>{waitMessages[msgIndex]}</p>

        {/* Ambient LED status glow */}
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle 
            cx="20" cy="20" r="8" 
            fill={progress < 100 ? "#A9B59D" : "#D48A70"} 
            style={{ 
              animation: progress < 100 ? `${styles.breathe} 2.5s ease-in-out infinite` : 'none',
              filter: `drop-shadow(0 0 6px ${progress < 100 ? "rgba(169,181,157,0.6)" : "rgba(212,138,112,0.6)"})` 
            }} 
          />
        </svg>

        {/* Dust particles floating */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={styles.dustParticle}
            style={{
              width: `${2 + i}px`,
              height: `${2 + i}px`,
              left: `${10 + i * 20}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + i * 2}s`,
              '--dx': `${(i % 2 === 0 ? 1 : -1) * 30}px`,
              '--dy': `${-40 - i * 10}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
