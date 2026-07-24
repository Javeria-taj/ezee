'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useObservatoryEnvironment } from './useObservatoryEnvironment';

export default function OrderDesk() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [archived, setArchived] = useState<string[]>([]);
  const { env } = useObservatoryEnvironment();
  const [chime, setChime] = useState(false);

  // Trigger a subtle chime ripple occasionally (simulating new order arrival)
  useEffect(() => {
    const interval = setInterval(() => {
      setChime(true);
      setTimeout(() => setChime(false), 2000);
    }, 15000); // Every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const initialOrders = [
    { id: 'o1', type: 'urgent', title: 'Final Year Thesis', student: 'Aisha K.', pages: 120, rotation: -2 },
    { id: 'o2', type: 'normal', title: 'Physics Notes', student: 'Rahul M.', pages: 45, rotation: 1.5 },
    { id: 'o3', type: 'delayed', title: 'Architecture Blueprints', student: 'Zoya F.', pages: 12, rotation: -1 },
    { id: 'o4', type: 'normal', title: 'Hackathon Deck', student: 'Team Void', pages: 8, rotation: 3 },
  ];

  const orders = initialOrders.filter(o => !archived.includes(o.id));

  const archiveOrder = (id: string) => {
    setArchived([...archived, id]);
    setSelectedLetter(null);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Desk Surface */}
      <div style={{
        position: 'absolute', bottom: '-20vh', width: '120vw', height: '60vh', background: '#4A3219',
        borderRadius: '50% 50% 0 0', boxShadow: 'inset 0 20px 50px rgba(0,0,0,0.5)', zIndex: 0
      }}>
        {/* Soft Bell Chime Ripple */}
        <AnimatePresence>
          {chime && (
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
                width: '100px', height: '50px', border: '2px solid rgba(212,175,55,0.4)', borderRadius: '50%',
                pointerEvents: 'none'
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Archives Box */}
      <div style={{
        position: 'absolute', right: '10%', bottom: '20%', width: '200px', height: '100px', background: '#36220E',
        borderRadius: '4px', border: '2px solid #2A2928', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#888', letterSpacing: '0.2em' }}>ARCHIVES</span>
        <span style={{ fontFamily: 'Instrument Sans', fontSize: '1.2rem', color: '#F5EFE7' }}>{archived.length} stored</span>
      </div>

      {/* Exam Season Clutter (Stacks of paper in the background) */}
      <AnimatePresence>
        {env.isExamSeason && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', left: '10%', bottom: '30%', zIndex: 2 }}>
            <div style={{ width: '150px', height: '20px', background: '#F5EFE7', borderBottom: '1px solid #CCC', transform: 'rotate(-5deg)', position: 'absolute', bottom: 0 }} />
            <div style={{ width: '140px', height: '15px', background: '#EAE5DB', borderBottom: '1px solid #CCC', transform: 'rotate(2deg)', position: 'absolute', bottom: 10 }} />
            <div style={{ width: '160px', height: '18px', background: '#F0EBE1', borderBottom: '1px solid #CCC', transform: 'rotate(-1deg)', position: 'absolute', bottom: 20 }} />
            <span style={{ position: 'absolute', bottom: 45, left: 10, fontFamily: 'Space Grotesk', fontSize: '0.6rem', color: '#555', transform: 'rotate(-1deg)' }}>EXAM PILE</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scattered Orders (Letters) */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px', marginTop: '10vh' }}>
        <AnimatePresence>
          {orders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ y: -500, scale: 0.8, opacity: 0 }} // Letter arriving animation
              animate={{ 
                y: 0, scale: 1, opacity: 1, 
                rotateZ: [order.rotation - 1, order.rotation + 1, order.rotation - 1] 
              }}
              exit={{ x: 500, y: 200, opacity: 0, scale: 0.5, rotateZ: 90 }} // Flies to archive
              transition={{ 
                y: { type: 'spring', delay: idx * 0.2, bounce: 0.4 },
                opacity: { duration: 0.5 },
                rotateZ: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: (idx * 0.3) % 1 }
              }}
              whileHover={{ y: -10, scale: 1.05, zIndex: 20, rotateZ: order.rotation }}
              onClick={() => setSelectedLetter(order.id)}
              style={{
                background: '#F5EFE7', width: '180px', height: '240px', padding: '1.5rem',
                boxShadow: '2px 10px 20px rgba(0,0,0,0.2)', cursor: 'pointer', position: 'relative',
                borderRadius: '2px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
            >
              {order.type === 'urgent' && <div style={{ position: 'absolute', top: '10px', right: '10px', width: '24px', height: '24px', background: '#9B2C2C', borderRadius: '50%', boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)' }} />}
              {order.type === 'delayed' && <div style={{ position: 'absolute', top: '10px', left: '-5px', width: '40px', height: '15px', background: '#D4AF37', rotate: '-15deg', boxShadow: '1px 2px 4px rgba(0,0,0,0.1)' }} />}

              <div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Order #{order.id.toUpperCase()}</div>
                <h3 style={{ fontFamily: 'Instrument Sans', fontSize: '1.1rem', color: '#2A2928', margin: '0.5rem 0', fontWeight: 'bold' }}>{order.title}</h3>
                <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.9rem', color: '#555', fontStyle: 'italic', margin: 0 }}>from {order.student}</p>
              </div>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '0.5rem', fontFamily: 'Cabinet Grotesk', fontSize: '0.8rem', color: '#2A2928' }}>{order.pages} pages • Bundle</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Letter Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedLetter(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(42,41,40,0.6)', backdropFilter: 'blur(4px)', zIndex: 100 }} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#F5EFE7', padding: '3rem', width: '400px', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', borderRadius: '4px', zIndex: 101, fontFamily: 'Instrument Sans', color: '#2A2928' }}>
              <h2 style={{ fontFamily: 'Cabinet Grotesk', marginBottom: '1rem' }}>Order Details</h2>
              <p style={{ fontStyle: 'italic', color: '#555', marginBottom: '2rem' }}>&quot;We need this printed carefully. The margins are tight, but it&apos;s important.&quot;</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setSelectedLetter(null)} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid #5C3D1D', color: '#5C3D1D', cursor: 'pointer', fontFamily: 'Space Grotesk' }}>Keep on Desk</button>
                <button onClick={() => archiveOrder(selectedLetter)} style={{ flex: 1, padding: '0.8rem', background: '#5C3D1D', color: '#F5EFE7', border: 'none', cursor: 'pointer', fontFamily: 'Space Grotesk' }}>Archive Order</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
