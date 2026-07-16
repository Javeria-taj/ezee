'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PaymentsProps {
  onClose: () => void;
}

interface Transaction {
  id: string;
  date: string;
  desc: string;
  amount: number;
  type: 'credit' | 'debit';
}

export default function Payments({ onClose }: PaymentsProps) {
  const [balance] = useState(246);
  const [lastPages] = useState(2);
  const [lastCopies] = useState(1);
  const [lastTotal] = useState(4);
  const [tapped, setTapped] = useState(false);

  const transactions: Transaction[] = [
    { id: '1', date: '15 Jul', desc: 'DBMS Notes — 24pp', amount: 29, type: 'debit' },
    { id: '2', date: '12 Jul', desc: 'Added via UPI', amount: 200, type: 'credit' },
    { id: '3', date: '10 Jul', desc: 'Resume Print — 3pp', amount: 15, type: 'debit' },
    { id: '4', date: '05 Jul', desc: 'Added via UPI', amount: 100, type: 'credit' },
  ];

  const handleTapCard = () => {
    setTapped(true);
    setTimeout(() => setTapped(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 20 }}
      transition={{ type: 'spring', damping: 28, stiffness: 100 }}
      onClick={e => e.stopPropagation()}
      style={{
        background: '#F5EFE7',
        borderRadius: '8px',
        padding: '2.5rem 2rem',
        width: '720px',
        maxWidth: '95vw',
        maxHeight: '85vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 30px 60px rgba(42,41,40,0.18)',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.025) 1px, transparent 1.5px)',
        backgroundSize: '22px 22px',
      }}
    >
      {/* Washi tape */}
      <div style={{ position: 'absolute', top: '-12px', left: '22%', transform: 'rotate(-3deg)', width: '80px', height: '26px', background: 'rgba(212,175,55,.28)', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '2px' }} />

      {/* Close */}
      <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.6rem', color: 'rgba(42,41,40,0.4)', cursor: 'pointer', lineHeight: 1 }} aria-label="Close wallet">×</button>

      {/* Header */}
      <h2 style={{
        fontFamily: 'Cabinet Grotesk, Space Grotesk, sans-serif',
        fontSize: '1.8rem',
        fontWeight: 800,
        color: '#2A2928',
        letterSpacing: '-.02em',
        margin: '0 0 0.3rem 0',
      }}>The Desk Drawer</h2>

      {/* Main content — Receipt + Wallet side by side */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>

        {/* ─── LEFT: Receipt ─── */}
        <motion.div
          initial={{ rotate: -1.5 }}
          style={{
            flex: '1 1 240px',
            background: '#FFFDFB',
            borderRadius: '3px',
            padding: '2rem 1.8rem',
            position: 'relative',
            boxShadow: '2px 4px 16px rgba(42,41,40,0.1)',
            minWidth: '240px',
          }}
        >
          {/* Stamp */}
          <div style={{
            position: 'absolute', top: '-18px', left: '-12px',
            width: '48px', height: '48px',
            border: '2px dashed rgba(42,41,40,0.2)',
            borderRadius: '4px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
            fontSize: '14px',
            color: 'rgba(42,41,40,0.4)',
            transform: 'rotate(-5deg)',
            background: 'rgba(250,247,241,0.9)',
          }}>
            <span style={{ fontFamily: 'serif', fontWeight: 700, fontSize: '16px', lineHeight: 1 }}>M</span>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '7px', letterSpacing: '0.1em', marginTop: '2px' }}>POST</span>
          </div>

          <div style={{
            fontFamily: 'Space Grotesk',
            fontSize: '0.75rem',
            letterSpacing: '.15em',
            textTransform: 'uppercase' as const,
            color: '#7A6D8C',
            marginBottom: '1.2rem',
            textAlign: 'center',
          }}>RECEIPT</div>

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', fontFamily: 'Instrument Sans', fontSize: '1rem', color: '#2A2928' }}>
            <span>{lastPages} Pages</span>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600 }}>₹{lastTotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', fontFamily: 'Instrument Sans', fontSize: '1rem', color: '#2A2928' }}>
            <span>{lastCopies} Copies</span>
            <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600 }}>× {lastCopies}</span>
          </div>

          <div style={{ borderTop: '1px dashed rgba(42,41,40,0.15)', margin: '1rem 0', }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '0.5rem' }}>
            <span style={{ fontFamily: 'Instrument Sans', fontSize: '1rem', color: 'var(--ink-2, #6E665B)' }}>Total</span>
            <span style={{ fontFamily: 'Cabinet Grotesk, Space Grotesk', fontWeight: 800, fontSize: '2.2rem', color: '#2A2928', letterSpacing: '-.02em' }}>₹{lastTotal}</span>
          </div>
        </motion.div>

        {/* ─── RIGHT: Wallet with card ─── */}
        <motion.div
          initial={{ rotate: 1 }}
          style={{
            flex: '1 1 280px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            minWidth: '260px',
          }}
        >
          {/* Wallet body */}
          <div style={{
            position: 'relative',
            width: '240px',
            height: '170px',
          }}>
            {/* Leather wallet */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '140px',
              background: 'linear-gradient(180deg, #C4956B, #A3744E)',
              borderRadius: '20px 20px 24px 24px',
              boxShadow: '0 8px 24px rgba(42,41,40,0.2), inset 0 2px 4px rgba(255,255,255,0.15)',
              border: '2px solid rgba(42,41,40,0.1)',
            }}>
              {/* Stitching line */}
              <div style={{
                position: 'absolute',
                inset: '6px',
                borderRadius: '16px 16px 20px 20px',
                border: '1.5px dashed rgba(255,255,255,0.2)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Card (poking out of wallet) */}
            <motion.div
              animate={tapped ? { y: -8, scale: 1.02 } : { y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              onClick={handleTapCard}
              style={{
                position: 'absolute',
                top: '5px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '180px',
                height: '110px',
                background: 'linear-gradient(145deg, #FFFFFF, #F5F0EA)',
                borderRadius: '10px',
                padding: '12px 14px',
                boxShadow: '0 4px 14px rgba(42,41,40,0.12)',
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '9px', fontWeight: 700, letterSpacing: '.08em', color: '#2A2928', textTransform: 'uppercase' as const }}>STUDENT UPI</div>
                </div>
                {/* NFC icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A2928" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12 18c3.31 0 6-2.69 6-6s-2.69-6-6-6" opacity=".3" />
                  <path d="M12 14c1.1 0 2-.9 2-2s-.9-2-2-2" opacity=".5" />
                  <path d="M12 22c5.52 0 10-4.48 10-10S17.52 2 12 2" opacity=".15" />
                </svg>
              </div>
              {/* Chip */}
              <div style={{
                width: '28px', height: '20px',
                background: 'linear-gradient(135deg, #F4D88E, #E8C778)',
                borderRadius: '3px',
                marginTop: '8px',
                boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.1)',
              }} />
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '13px', color: 'rgba(42,41,40,0.5)', marginTop: '12px', letterSpacing: '.12em' }}>
                •••• 4092
              </div>
            </motion.div>

            {/* Coins */}
            <div style={{ position: 'absolute', right: '-8px', top: '40px', zIndex: 3 }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #E8C778, #D4AF37)',
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'grid', placeItems: 'center',
                fontFamily: 'Space Grotesk', fontSize: '11px', fontWeight: 700, color: '#7A5E20',
                boxShadow: '0 2px 6px rgba(42,41,40,0.2)',
              }}>5</div>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #E8C778, #D4AF37)',
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'grid', placeItems: 'center',
                fontFamily: 'Space Grotesk', fontSize: '9px', fontWeight: 700, color: '#7A5E20',
                boxShadow: '0 2px 6px rgba(42,41,40,0.2)',
                marginTop: '-6px', marginLeft: '14px',
              }}>1</div>
            </div>
          </div>

          <div style={{
            fontFamily: 'Instrument Sans',
            fontSize: '0.9rem',
            color: 'rgba(42,41,40,0.5)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}>Tap card to pay</div>

          {/* Balance display */}
          <div style={{
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '12px',
            padding: '0.8rem 1.5rem',
            boxShadow: 'inset 0 2px 5px rgba(42,41,40,0.1)',
            border: '1px solid rgba(42,41,40,0.08)',
            textAlign: 'center',
            width: '100%',
            maxWidth: '240px',
          }}>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: 'rgba(42,41,40,0.45)', textTransform: 'uppercase' as const, letterSpacing: '.12em' }}>Balance</div>
            <div style={{ fontFamily: 'Cabinet Grotesk, Space Grotesk', fontSize: '1.6rem', fontWeight: 800, color: '#2A2928' }}>₹{balance}</div>
          </div>
        </motion.div>
      </div>

      {/* ─── Transaction history ─── */}
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed rgba(42,41,40,0.12)' }}>
        <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: 'rgba(42,41,40,0.4)', textTransform: 'uppercase' as const, letterSpacing: '.12em', marginBottom: '1rem' }}>
          Recent activity
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {transactions.map(t => (
            <div key={t.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.6rem 0',
              borderBottom: '1px solid rgba(42,41,40,0.05)',
            }}>
              <div>
                <div style={{ fontFamily: 'Instrument Sans', fontSize: '0.9rem', color: '#2A2928' }}>{t.desc}</div>
                <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: 'rgba(42,41,40,0.4)', marginTop: '2px' }}>{t.date}</div>
              </div>
              <div style={{
                fontFamily: 'Space Grotesk',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: t.type === 'credit' ? '#7E8C6F' : '#2A2928',
              }}>
                {t.type === 'credit' ? '+' : '−'}₹{t.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '1.5rem', paddingTop: '1rem',
        borderTop: '1px dashed rgba(42,41,40,0.12)',
        fontFamily: 'Space Grotesk', fontSize: '0.8rem',
        color: 'rgba(42,41,40,0.35)', textAlign: 'center', fontStyle: 'italic',
      }}>
        &quot;Every rupee has a story.&quot;
      </div>
    </motion.div>
  );
}
