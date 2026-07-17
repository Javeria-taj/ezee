'use client';

import React, { useEffect, useState } from 'react';
import styles from './print.module.css';

interface SignatureMomentProps {
  shopName: string;
  isNight: boolean;
  onComplete: () => void;
}

function PaperAirplane({ color = '#FAF7F1' }: { color?: string }) {
  return (
    <svg width="60" height="50" viewBox="0 0 60 50">
      {/* Plane body */}
      <path d="M 0 25 L 60 0 L 42 50 L 28 30 Z" fill={color} stroke="rgba(42,41,40,0.2)" strokeWidth="1.5" />
      {/* Wing fold */}
      <path d="M 28 30 L 42 50 L 48 32 Z" fill="rgba(42,41,40,0.08)" />
      {/* Center line */}
      <path d="M 28 30 L 60 0" stroke="rgba(42,41,40,0.15)" strokeWidth="0.8" />
    </svg>
  );
}

// Tiny city skyline
function PrintCity({ shopName }: { shopName: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="xMidYMax meet" style={{ display: 'block' }}>
      {/* Sky tint */}
      <rect x="0" y="0" width="800" height="200" fill="rgba(169,181,157,0.08)" />

      {/* Street */}
      <rect x="0" y="160" width="800" height="40" fill="rgba(42,41,40,0.08)" />
      {/* Street lamps */}
      {[60, 180, 300, 500, 620, 740].map((x, i) => (
        <g key={i}>
          <rect x={x} y={110} width={4} height={50} fill="rgba(42,41,40,0.3)" />
          <ellipse cx={x + 2} cy={106} rx={12} ry={8} fill="rgba(244,208,63,0.3)" />
          <ellipse cx={x + 2} cy={106} rx={4} ry={3} fill="#F4D03F" opacity="0.6" />
        </g>
      ))}

      {/* Buildings */}
      {/* Cozy Prints (always visible) */}
      <rect x="80" y="60" width="80" height="100" rx="4" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1.5" />
      <path d="M 75 62 L 120 38 L 165 62 Z" fill="#A9B59D" />
      {/* Windows lit up */}
      {[[88,72],[112,72],[88,92],[112,92]].map(([wx,wy],i) => (
        <rect key={i} x={wx} y={wy} width="16" height="12" rx="1" fill="rgba(244,208,63,0.4)" stroke="rgba(42,41,40,0.1)" strokeWidth="0.5" />
      ))}
      <text x="120" y="152" textAnchor="middle" fontFamily="Space Grotesk" fontSize="7" fill="rgba(42,41,40,0.5)" fontWeight="600">Cozy Prints</text>

      {/* Speedy Press */}
      <rect x="210" y="80" width="70" height="80" rx="2" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1.5" />
      <rect x="206" y="76" width="78" height="8" rx="1" fill="#D48A70" />
      {[0,1,2].map(i => (
        <rect key={i} x={216 + i*18} y={88} width={14} height={18} rx={1} fill="rgba(212,138,112,0.2)" stroke="rgba(42,41,40,0.1)" strokeWidth="0.5" />
      ))}
      <text x="245" y="152" textAnchor="middle" fontFamily="Space Grotesk" fontSize="7" fill="rgba(42,41,40,0.5)" fontWeight="600">Speedy Press</text>

      {/* Student Hub — taller, busier */}
      <rect x="330" y="50" width="100" height="110" rx="3" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1.5" />
      <path d="M 325 52 L 380 28 L 435 52 Z" fill="#7A6D8C" />
      {[[338,62],[362,62],[386,62],[338,82],[362,82],[386,82],[338,102],[362,102],[386,102]].map(([wx,wy],i) => (
        <rect key={i} x={wx} y={wy} width="14" height="10" rx="1" fill="rgba(122,109,140,0.25)" stroke="rgba(42,41,40,0.08)" strokeWidth="0.5" />
      ))}
      <text x="380" y="152" textAnchor="middle" fontFamily="Space Grotesk" fontSize="7" fill="rgba(42,41,40,0.5)" fontWeight="600">Student Hub</text>

      {/* Prestige Bindery — tallest, grandest */}
      <rect x="490" y="30" width="90" height="130" rx="6" fill="#2A2928" />
      <rect x="494" y="34" width="82" height="122" rx="5" fill="none" stroke="#C4956A" strokeWidth="1" />
      {[[500,44],[540,44],[500,62],[540,62],[500,80],[540,80],[500,98],[540,98]].map(([wx,wy],i) => (
        <rect key={i} x={wx} y={wy} width="30" height="12" rx="1" fill="rgba(196,149,106,0.15)" stroke="rgba(196,149,106,0.3)" strokeWidth="0.5" />
      ))}
      <text x="535" y="152" textAnchor="middle" fontFamily="Space Grotesk" fontSize="7" fill="rgba(42,41,40,0.5)" fontWeight="600">Prestige Bindery</text>

      {/* Extra background buildings */}
      <rect x="640" y="90" width="50" height="70" rx="2" fill="rgba(234,228,221,0.6)" />
      <rect x="700" y="100" width="60" height="60" rx="2" fill="rgba(234,228,221,0.5)" />
      <rect x="20" y="100" width="45" height="60" rx="2" fill="rgba(234,228,221,0.5)" />

      {/* Clouds */}
      <ellipse cx="150" cy="20" rx="35" ry="12" fill="rgba(250,247,241,0.7)" />
      <ellipse cx="185" cy="18" rx="22" ry="9" fill="rgba(250,247,241,0.6)" />
      <ellipse cx="600" cy="15" rx="40" ry="14" fill="rgba(250,247,241,0.7)" />
      <ellipse cx="640" cy="12" rx="25" ry="10" fill="rgba(250,247,241,0.6)" />

      {/* Birds near city */}
      <path d="M 400 25 Q 408 18 412 25" fill="none" stroke="rgba(42,41,40,0.3)" strokeWidth="1.5" />
      <path d="M 412 25 Q 416 18 424 25" fill="none" stroke="rgba(42,41,40,0.3)" strokeWidth="1.5" />

      {/* Highlighted/glowing shop based on selected */}
      {shopName === 'Cozy Prints' && (
        <rect x="78" y="58" width="84" height="104" rx="5" fill="none" stroke="#A9B59D" strokeWidth="3" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
        </rect>
      )}
      {shopName === 'Speedy Press' && (
        <rect x="208" y="74" width="74" height="84" rx="3" fill="none" stroke="#D48A70" strokeWidth="3" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
        </rect>
      )}
      {shopName === 'Student Hub' && (
        <rect x="328" y="48" width="104" height="114" rx="4" fill="none" stroke="#7A6D8C" strokeWidth="3" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
        </rect>
      )}
      {shopName === 'Prestige Bindery' && (
        <rect x="488" y="28" width="94" height="134" rx="7" fill="none" stroke="#C4956A" strokeWidth="3" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
        </rect>
      )}
    </svg>
  );
}

export default function SignatureMoment({ shopName, isNight, onComplete }: SignatureMomentProps) {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Paper airplane animation takes ~4s (reduced for faster transition)
    const t = setTimeout(() => {
      setShowMessage(true);
      setTimeout(onComplete, 500);
    }, 500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div
      className={styles.signatureMoment}
      style={{
        background: isNight
          ? 'linear-gradient(180deg, #0D0C0B 0%, #1C1A18 60%, #252320 100%)'
          : 'linear-gradient(180deg, #E8F4F0 0%, #F5F0E8 60%, #FAF7F1 100%)',
      }}
    >
      {/* Clouds background */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40%' }} viewBox="0 0 800 200" preserveAspectRatio="xMidYMax meet">
        {[
          { cx: 100, cy: 60, rx: 50, ry: 20 },
          { cx: 135, cy: 52, rx: 32, ry: 14 },
          { cx: 400, cy: 40, rx: 60, ry: 22 },
          { cx: 450, cy: 32, rx: 38, ry: 16 },
          { cx: 650, cy: 55, rx: 44, ry: 18 },
        ].map((c, i) => (
          <ellipse key={i} {...c} fill={isNight ? 'rgba(28,26,24,0.8)' : 'rgba(250,247,241,0.85)'} />
        ))}
        {/* Birds */}
        {[[200, 80], [220, 70], [450, 55], [470, 50]].map(([x, y], i) => (
          <g key={i}>
            <path d={`M ${x} ${y} Q ${x+7} ${y-6} ${x+12} ${y}`} fill="none" stroke={isNight ? 'rgba(234,228,221,0.4)' : 'rgba(42,41,40,0.3)'} strokeWidth="1.5" />
          </g>
        ))}
      </svg>

      {/* Flying paper airplane */}
      <div className={styles.flyingAirplane}>
        <PaperAirplane color={isNight ? '#EAE4DD' : '#FAF7F1'} />
      </div>

      {/* Street lamps animation — pass by */}
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className={styles.movingLamp}
          style={{
            left: `${20 + i * 30}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${8 + i * 3}s`,
          }}
        >
          <div className={styles.movingLampBulb} />
        </div>
      ))}

      {/* Print City at bottom */}
      <div className={styles.signatureCity}>
        <PrintCity shopName={shopName} />
      </div>

      {/* Final message */}
      {showMessage && (
        <div className={styles.signatureMessage}>
          <h2 className={styles.signatureHeadline} style={{ color: isNight ? '#EAE4DD' : '#2A2928' }}>
            Your notes are on their way ✨
          </h2>
          <p className={styles.signatureSubline}>
            Ezi is staying with them until they're ready.
          </p>
          <p style={{ fontFamily: 'Instrument Sans, sans-serif', fontSize: '0.8rem', color: 'rgba(122,109,140,0.7)', marginTop: '0.5rem', fontStyle: 'italic' }}>
            You're not waiting alone.
          </p>
        </div>
      )}
    </div>
  );
}
