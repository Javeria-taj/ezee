'use client';

import React from 'react';

const TIPS = [
  { icon: '🌙', text: 'Pro tip: Upload your files the night before. Morning Ezi is ready when you are.' },
  { icon: '📎', text: 'Spiral binding lasts 4× longer on your most-used notebooks. Worth the ₹35.' },
  { icon: '🎨', text: 'Colour prints for presentation slides only — saves you ₹40 on a 100-page doc.' },
  { icon: '⚡', text: 'The fastest shops open at 7am. Beat the morning rush by uploading at night.' },
  { icon: '📁', text: 'Merge all your chapters into one PDF before uploading. Ezi will keep the pages in order.' },
  { icon: '☕', text: 'Night Owl Copies is open till 2am. Deadlines are not a reason to panic anymore.' },
  { icon: '💡', text: 'A4 fits 2 slides per page in "handout" mode — great for revision notes.' },
  { icon: '🖨️', text: 'Your longest print job ever? 342 pages. You survived. You always do.' },
  { icon: '🌿', text: 'Black & white printing saves trees and your wallet. Reserve colour for the cover page.' },
  { icon: '🔔', text: 'Enable notifications to get a ping the moment your prints are warm and waiting.' },
  { icon: '📅', text: 'Plan your prints 24 hours before submission. Future you will write a thank-you letter.' },
  { icon: '✨', text: 'Hard cover binding = instant confidence. Professors notice the effort.' },
];

interface EziTipProps {
  style?: React.CSSProperties;
}

export default function EziTip({ style }: EziTipProps) {
  // Same tip all day, new one tomorrow — based on date
  const [tip] = useState(() => {
    const now = new Date();
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
    );
    return TIPS[dayOfYear % TIPS.length];
  });

  return (
    <div
      style={{
        position: 'relative',
        background: '#F0C79B',
        borderRadius: 12,
        padding: '14px 16px 14px 14px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        boxShadow: '2px 3px 10px rgba(42,41,40,.12), inset 0 0 0 1px rgba(255,255,255,.3)',
        ...style,
      }}
    >
      {/* Tape strip at top */}
      <div
        style={{
          position: 'absolute',
          top: -8,
          left: '50%',
          transform: 'translateX(-50%) rotate(-1.5deg)',
          width: 56,
          height: 16,
          background: 'rgba(255,255,255,.55)',
          borderRadius: 3,
          border: '1px solid rgba(200,160,100,.25)',
        }}
      />
      <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1, marginTop: 1 }}>{tip.icon}</span>
      <div>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: '#7a5a2a',
            margin: '0 0 4px',
          }}
        >
          Ezi&apos;s tip of the day
        </p>
        <p
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 13,
            lineHeight: 1.5,
            color: '#3a2c14',
            margin: 0,
          }}
        >
          {tip.text}
        </p>
      </div>
    </div>
  );
}
