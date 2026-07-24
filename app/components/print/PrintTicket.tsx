'use client';

import React from 'react';
import styles from './print.module.css';
import { CartItem } from './PrintDesk';

interface PrintTicketProps {
  cartItems: CartItem[];
  etaMinutes: number;
  isNight: boolean;
  onSendToShop: () => void;
}

const bindingLabels: Record<string, string> = {
  none: 'Loose Sheets',
  spiral: 'Spiral Bound',
  staple: 'Staple Bound',
  hardcover: 'Hard Cover',
};

const colorLabels: Record<string, string> = {
  bw: 'Black & White',
  color: 'Full Color',
  custom: 'Mixed Mode',
};

function EziSmall() {
  return (
    <svg width="36" height="44" viewBox="0 0 60 80">
      <ellipse cx="30" cy="16" rx="20" ry="18" fill="#2A2928" />
      <ellipse cx="30" cy="24" rx="16" ry="12" fill="#FAF7F1" />
      {/* Happy eyes */}
      <path d="M 22 22 Q 26 18 28 22" stroke="#2A2928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 32 22 Q 36 18 38 22" stroke="#2A2928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="18" cy="28" rx="5" ry="3" fill="#D48A70" opacity="0.5" />
      <ellipse cx="42" cy="28" rx="5" ry="3" fill="#D48A70" opacity="0.5" />
      <path d="M 26 31 Q 30 36 34 31" stroke="#2A2928" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Apron body */}
      <path d="M 16 34 C 24 40 36 40 44 34 C 52 56 44 76 30 76 C 16 76 8 56 16 34 Z" fill="#EAE4DD" />
      <rect x="23" y="50" width="14" height="10" rx="2" fill="rgba(42,41,40,0.08)" stroke="rgba(42,41,40,0.1)" strokeWidth="0.5" />
      {/* Arms resting softly */}
      <path d="M 16 38 C 12 45 10 50 14 60" stroke="#2A2928" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M 44 38 C 48 45 50 50 46 60" stroke="#2A2928" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function PrintTicket({
  cartItems, etaMinutes, isNight, onSendToShop,
}: PrintTicketProps) {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  // Aggregate totals for display
  const totalPages = cartItems.reduce((s, i) => s + i.pageCount * i.copies, 0);
  const shopName = cartItems[0]?.shopName ?? '';
  const multiShop = cartItems.some(i => i.shopName !== shopName);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      padding: '2rem',
      animation: `${styles.phaseIn} 0.5s ease forwards`,
    }}>
      {/* Ezi resting above the ticket */}
      <div style={{ position: 'relative' }}>
        <EziSmall />
      </div>

      {/* The Ticket */}
      <div className={styles.ticketKeepsake} style={{ background: isNight ? '#252320' : '#FAF7F1', color: isNight ? '#EAE4DD' : '#2A2928' }}>
        {/* Stamp */}
        <div className={styles.ticketStamp}>
          READY<br />✓
        </div>


        <h2 className={styles.ticketDocName} style={{ color: isNight ? '#EAE4DD' : '#2A2928' }}>
          {cartItems.length === 1 ? cartItems[0].docName : `${cartItems.length} Files`}
        </h2>

        <div className={styles.ticketDetails}>
          <span>{totalPages} Total Pages</span>
          {cartItems.map(item => (
            <span key={item.id} style={{ fontSize: '0.75em', opacity: 0.8 }}>
              {item.docName} · {item.colorMode === 'custom' && item.customColorPages ? `Mixed (Col: ${item.customColorPages})` : (colorLabels[item.colorMode] ?? item.colorMode)} · {bindingLabels[item.binding] ?? item.binding}
            </span>
          ))}
          <span>{multiShop ? 'Multiple Shops' : shopName}</span>
        </div>

        <hr className={styles.ticketDivider} />

        <p className={styles.ticketReady}>Ready In {etaMinutes} Minutes ✨</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          {/* Tiny date */}
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.72rem', color: 'rgba(122,109,140,0.6)' }}>
            {dateStr}
          </span>

          {/* Handwritten-style signature */}
          <p className={styles.ticketSignature}>
            Prepared together
          </p>
        </div>

        {/* Tiny Ezi illustration at bottom */}
        <div style={{ textAlign: 'center', marginTop: '1rem', opacity: 0.4 }}>
          <svg width="32" height="20" viewBox="0 0 32 20">
            <ellipse cx="16" cy="8" rx="10" ry="9" fill="#2A2928" />
            <ellipse cx="16" cy="11" rx="8" ry="6" fill="#FAF7F1" />
          </svg>
        </div>
      </div>

      {/* Send button */}
      <button className={styles.sendBtn} onClick={onSendToShop}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
        Send to {shopName}
      </button>

      <p style={{
        fontFamily: 'Instrument Sans, sans-serif',
        fontSize: '0.8rem',
        color: isNight ? 'rgba(234,228,221,0.5)' : 'rgba(42,41,40,0.4)',
        textAlign: 'center',
      }}>
        Screenshot this ticket — it&apos;s yours to keep ✨
      </p>
    </div>
  );
}
