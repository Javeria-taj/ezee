'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  isClosingTime: boolean;
}

export default function Printers({ isClosingTime }: Props) {
  return (
    <div style={{ display: 'flex', gap: '3rem', position: 'relative', zIndex: 10 }}>
      
      {/* Printer 1: The Old Veteran */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: isClosingTime ? 20 : [20, 18, 20] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '180px', height: '140px', background: '#3D3A38', borderRadius: '4px 4px 0 0',
          border: '4px solid #2A2928', borderBottom: 'none', position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}
      >
        <div style={{ position: 'absolute', top: '10px', width: '140px', height: '20px', background: '#2A2928', borderRadius: '2px' }} />
        {/* Paper feeder */}
        <div style={{ position: 'absolute', top: '-30px', width: '100px', height: '40px', background: '#F5EFE7', transform: 'perspective(100px) rotateX(20deg)', border: '1px solid #CCC' }} />
        
        {/* Brass Details */}
        <div style={{ position: 'absolute', left: '10px', top: '40px', width: '10px', height: '10px', borderRadius: '50%', background: '#D4AF37', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }} />
        <div style={{ position: 'absolute', right: '10px', top: '40px', width: '10px', height: '10px', borderRadius: '50%', background: '#D4AF37', boxShadow: 'inset 0 0 5px rgba(0,0,0,0.5)' }} />
        
        {/* Printing Slot */}
        <div style={{ position: 'absolute', bottom: '20px', width: '120px', height: '10px', background: '#111', borderRadius: '4px' }}>
          {!isClosingTime && (
            <motion.div
              animate={{ y: [0, 20], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ width: '80px', height: '30px', background: '#F5EFE7', margin: '0 auto', border: '1px solid #CCC' }}
            />
          )}
        </div>

        {isClosingTime && (
          <span style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '0.8rem', color: '#888' }}>Zzz</span>
        )}
        <span style={{ position: 'absolute', bottom: '-25px', fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: '#888' }}>THE VETERAN</span>
      </motion.div>


      {/* Printer 2: Fast Energetic */}
      <motion.div
        animate={{ x: isClosingTime ? 0 : [-1, 1, -1] }}
        transition={{ duration: 0.1, repeat: Infinity }}
        style={{
          width: '140px', height: '160px', background: '#4A4E59', borderRadius: '8px 8px 0 0',
          width: '140px', height: '160px', background: '#2C2B2A', borderRadius: '8px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '1rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isClosingTime ? '#555' : '#2196F3', boxShadow: !isClosingTime ? '0 0 10px #2196F3' : 'none' }} />
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.6rem', color: '#AAA' }}>LASER</span>
        </div>

        {/* Paper Slot */}
        <div style={{ position: 'absolute', bottom: '10px', width: '100px', height: '8px', background: '#111', borderRadius: '4px' }}>
          {!isClosingTime && (
            <motion.div
              animate={{ y: [0, 40], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
              style={{ width: '80px', height: '40px', background: '#FFF', margin: '0 auto' }}
            />
          )}
        </div>

        {/* Machine Jam Alert (Simulated occasionally) */}
        {!isClosingTime && isJammed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)', background: '#9B2C2C', color: '#FFF', padding: '2px 5px', fontSize: '0.5rem', borderRadius: '2px', fontFamily: 'Space Grotesk' }}>
            JAMMED
          </motion.div>
        )}
        
        <span style={{ position: 'absolute', bottom: '-25px', fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: '#888' }}>SPEEDSTER</span>
      </motion.div>


      {/* Printer 3: Elegant Color */}
      <motion.div
        animate={{ y: isClosingTime ? 0 : [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '160px', height: '120px', background: '#EAE5DB', borderRadius: '10px 10px 0 0',
          border: '1px solid #CCC', borderBottom: 'none', position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'
        }}
      >
        <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#00FFFF', border: '1px solid #111' }} />
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#FF00FF', border: '1px solid #111' }} />
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#FFFF00', border: '1px solid #111' }} />
          <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: '#000000', border: '1px solid #111' }} />
        </div>

        <div style={{ position: 'absolute', bottom: '15px', width: '120px', height: '5px', background: '#333', borderRadius: '2px' }}>
          {!isClosingTime && (
            <motion.div
              animate={{ x: [0, 120, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ width: '20px', height: '5px', background: '#FF00FF', borderRadius: '2px' }}
            />
          )}
        </div>

        {/* Ink Bottles next to it */}
        <div style={{ position: 'absolute', right: '-40px', bottom: '0', display: 'flex', gap: '2px' }}>
          <div style={{ width: '10px', height: '20px', background: '#00FFFF', borderRadius: '2px 2px 0 0' }} />
          <div style={{ width: '10px', height: '20px', background: '#FF00FF', borderRadius: '2px 2px 0 0' }} />
          <div style={{ width: '10px', height: '20px', background: '#FFFF00', borderRadius: '2px 2px 0 0' }} />
        </div>

        <span style={{ position: 'absolute', bottom: '-25px', fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: '#888' }}>COLOR PRO</span>
      </motion.div>

    </div>
  );
}
