'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useObservatoryEnvironment } from './useObservatoryEnvironment';

export default function WorldBoard() {
  const { env } = useObservatoryEnvironment();

  // Ambient mock data
  const vendors = [
    { id: 'v1', x: 200, y: 150, status: 'active', name: "Ollivander's Prints" },
    { id: 'v2', x: 500, y: 250, status: 'busy', name: "The Paper Mill" },
    { id: 'v3', x: 300, y: 400, status: 'sleeping', name: "Night Owl Copies" },
    { id: 'v4', x: 600, y: 100, status: 'active', name: "Morning Star Press" },
    { id: 'v5', x: 450, y: 450, status: 'active', name: "Campus Central Print" },
  ];

  const activeAirplanes = [
    { id: 'p1', fromX: 200, fromY: 150, toX: 500, toY: 250, delay: 0 },
    { id: 'p2', fromX: 450, fromY: 450, toX: 300, toY: 400, delay: 2 },
    { id: 'p3', fromX: 500, fromY: 250, toX: 600, toY: 100, delay: 4 },
  ];

  // Map visuals based on environment
  const isNight = env.timeOfDay === 'night' || env.timeOfDay === 'sunset';
  const hasRain = env.weather === 'rain';
  const hasSnow = env.weather === 'snow';
  const mapBgColor = isNight ? '#D1C7B7' : '#F5EFE7'; // Paper cream variations

  return (
    <div style={{ position: 'relative', width: '800px', height: '600px', margin: '0 auto' }}>
      
      {/* Wooden Frame / Desk Surface underneath the map */}
      <div style={{
        position: 'absolute', inset: '-20px', background: '#36220E', borderRadius: '4px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.6)', zIndex: 0
      }} />

      {/* The Physical Paper Map */}
      <motion.div
        animate={{ rotateZ: [-0.5, 0.5, -0.5] }} // Subtle breathing of the paper
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', inset: 0,
          background: mapBgColor,
          borderRadius: '2px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2), inset 0 0 40px rgba(92,61,29,0.1)',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        {/* Paper texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
        }} />

        {/* Fold lines to make it look like a physical map */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '33%', width: '1px', background: 'rgba(92,61,29,0.1)', boxShadow: '1px 0 2px rgba(255,255,255,0.5)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '66%', width: '1px', background: 'rgba(92,61,29,0.1)', boxShadow: '1px 0 2px rgba(255,255,255,0.5)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: '1px', background: 'rgba(92,61,29,0.1)', boxShadow: '0 1px 2px rgba(255,255,255,0.5)' }} />

        {/* Ink-drawn Map Elements */}
        <svg width="100%" height="100%" viewBox="0 0 800 600" style={{ position: 'relative', zIndex: 2 }}>
          {/* Hand-drawn rivers/roads */}
          <path d="M -50 200 Q 200 150 400 300 T 850 400" fill="none" stroke="rgba(92,61,29,0.15)" strokeWidth="15" strokeLinecap="round" />
          <path d="M 100 300 L 700 300 M 400 100 L 400 500 M 200 150 L 500 250 M 300 400 L 600 100" stroke="rgba(92,61,29,0.2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ filter: 'url(#pencil)' }} />
          
          <defs>
            <filter id="pencil" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Vendors (Workshops as little ink drawings) */}
          {vendors.map((v) => (
            <g key={v.id}>
              {/* Shadow */}
              <ellipse cx={v.x} cy={v.y + 10} rx="30" ry="10" fill="rgba(92,61,29,0.1)" />
              {/* Building Base */}
              <rect x={v.x - 20} y={v.y - 20} width="40" height="30" fill="none" stroke="#5C3D1D" strokeWidth="2" />
              {/* Roof */}
              <path d={`M ${v.x - 25} ${v.y - 20} L ${v.x} ${v.y - 40} L ${v.x + 25} ${v.y - 20} Z`} fill="none" stroke="#5C3D1D" strokeWidth="2" strokeLinejoin="round" />
              
              {/* Window Glow (Lamp light inside the drawing) */}
              <motion.circle 
                cx={v.x} cy={v.y - 5} r="5" 
                fill={isNight || v.status === 'busy' ? "#D4AF37" : "transparent"} 
                initial={{ opacity: 0.6 }}
                animate={{ opacity: (isNight || v.status === 'busy') ? [0.6, 1, 0.6] : 0 }}
                transition={{ duration: ((v.x + v.y) % 2) + 2, repeat: Infinity }}
                style={{ filter: 'blur(1px)' }}
              />

              {/* Hand-written Label */}
              <text x={v.x} y={v.y + 30} fill="#5C3D1D" fontSize="12" fontFamily="Space Grotesk" textAnchor="middle" style={{ opacity: 0.8 }}>
                {v.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Paper Airplanes (Orders) */}
        {activeAirplanes.map((p) => {
          const angle = Math.atan2(p.toY - p.fromY, p.toX - p.fromX) * (180 / Math.PI);
          return (
            <motion.div
              key={p.id}
              initial={{ x: p.fromX, y: p.fromY, opacity: 0, scale: 0.5 }}
              animate={{ 
                x: [p.fromX, p.fromX + (p.toX - p.fromX)/2, p.toX, p.toX], 
                y: [p.fromY, p.fromY - 30, p.toY, p.toY], 
                opacity: [0, 1, 1, 0], scale: [0.5, 1, 0.8, 0.2] // airplane lands
              }}
              transition={{ duration: 6, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
              style={{
                position: 'absolute', top: 0, left: 0, width: '16px', height: '16px',
                rotate: angle + 45, pointerEvents: 'none', zIndex: 10,
                filter: 'drop-shadow(2px 5px 2px rgba(92,61,29,0.2))'
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M2 12L22 2L12 22L10 14L2 12Z" fill="#F5EFE7" stroke="#5C3D1D" strokeWidth="1" />
              </svg>
            </motion.div>
          );
        })}

        {/* Environmental Weather Overlays ON the map */}
        <AnimatePresence>
          {/* Cloud Shadows (Always present but slow moving) */}
          <motion.div
            key="clouds"
            animate={{ x: ['-20%', '120%'], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.1) 0%, transparent 50%)',
              width: '150%', height: '150%', top: '-25%', left: '-25%'
            }}
          />

          {hasRain && (
            <motion.div
              key="rain"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
              style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none', background: 'rgba(42, 41, 40, 0.1)' }}
            >
              {/* Subtle map wetness spots */}
              <div style={{ position: 'absolute', top: '20%', left: '30%', width: '200px', height: '150px', background: 'radial-gradient(circle, rgba(92,61,29,0.15) 0%, transparent 70%)' }} />
              <div style={{ position: 'absolute', top: '60%', left: '70%', width: '150px', height: '100px', background: 'radial-gradient(circle, rgba(92,61,29,0.1) 0%, transparent 70%)' }} />
            </motion.div>
          )}
          {hasSnow && (
            <motion.div
              key="snow"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
              style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}
            >
              {/* Snow accumulation on map */}
              <div style={{ position: 'absolute', top: '10%', left: '20%', width: '80px', height: '20px', background: '#FFF', borderRadius: '10px', opacity: 0.6, filter: 'blur(2px)' }} />
            </motion.div>
          )}
          {env.festival === 'diwali' && isNight && (
            <motion.div
              key="diwali"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}
              style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}
            >
              {Array.from({length: 15}).map((_, i) => (
                <motion.div
                  key={`diwali-${i}`}
                  animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: ((i * 17) % 2) + 1, repeat: Infinity }}
                  style={{ position: 'absolute', left: `${(i * 23) % 100}%`, top: `${(i * 37) % 100}%`, width: '4px', height: '4px', background: '#FFA500', borderRadius: '50%', boxShadow: '0 0 10px #FFA500' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Brass map weights on corners */}
      <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '30px', height: '30px', background: 'radial-gradient(circle at 30% 30%, #F3E5AB, #D4AF37, #8B6508)', borderRadius: '50%', boxShadow: '2px 4px 6px rgba(0,0,0,0.5)', zIndex: 5 }} />
      <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '30px', height: '30px', background: 'radial-gradient(circle at 30% 30%, #F3E5AB, #D4AF37, #8B6508)', borderRadius: '50%', boxShadow: '2px 4px 6px rgba(0,0,0,0.5)', zIndex: 5 }} />

    </div>
  );
}
