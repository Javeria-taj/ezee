'use client';

import React from 'react';

export default function MakerMemories() {
  return (
    <div style={{ position: 'absolute', top: '10vh', left: '5vw', width: '200px', height: '250px', background: '#D1C7B7', borderRadius: '4px', border: '10px solid #36220E', padding: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(92,61,29,0.2)', display: 'flex', flexDirection: 'column', zIndex: 5, transform: 'rotate(-2deg)' }}>
      
      {/* Tape on top */}
      <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%) rotate(5deg)', width: '60px', height: '25px', background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(0,0,0,0.1)' }} />

      <h3 style={{ fontFamily: 'Cabinet Grotesk', fontSize: '1.2rem', color: '#2A2928', borderBottom: '2px solid #8B5A2B', paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        Workshop Log
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#555', fontStyle: 'italic' }}>
        <div>
          <span style={{ fontWeight: 'bold', color: '#2A2928', display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.65rem' }}>LATE COFFEES</span>
          &quot;1,000 dreams printed. The placement season was heavy, but we pushed through.&quot;
        </div>
        <div>
          <span style={{ fontWeight: 'bold', color: '#2A2928', display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.65rem' }}>RAINY NIGHTS</span>
          &quot;500 resumes this week. We&apos;ve seen a lot of hope pass through these machines.&quot;
        </div>
      </div>

    </div>
  );
}
