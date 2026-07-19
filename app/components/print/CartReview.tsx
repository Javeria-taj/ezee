'use client';

import React, { useState } from 'react';
import styles from './print.module.css';
import { CartItem } from './PrintDesk';

interface CartReviewProps {
  cartItems: CartItem[];
  isNight: boolean;
  onDeleteItem: (id: string) => void;
  onAddMore: () => void;
  onProceed: (selectedItems: CartItem[]) => void;
}

function calculateItemCost(item: CartItem): number {
  const parsePageRanges = (rangeStr: string, total: number): Set<number> => {
    const pages = new Set<number>();
    if (!rangeStr) return pages;
    for (const part of rangeStr.split(',')) {
      const t = part.trim();
      if (t.includes('-')) {
        const [a, b] = t.split('-').map(Number);
        if (!isNaN(a) && !isNaN(b)) {
          const lo = Math.max(1, Math.min(a, b));
          const hi = Math.min(total, Math.max(a, b));
          for (let i = lo; i <= hi; i++) pages.add(i);
        }
      } else {
        const n = Number(t);
        if (!isNaN(n) && n >= 1 && n <= total) pages.add(n);
      }
    }
    return pages;
  };

  if (item.colorMode === 'custom') {
    const colorCount = parsePageRanges(item.customColorPages, item.pageCount).size;
    const bwCount = Math.max(0, item.pageCount - colorCount);
    return (colorCount * 5 + bwCount * 2) * item.copies;
  }
  return item.pageCount * item.copies * (item.colorMode === 'color' ? 5 : 2);
}

const colorLabel: Record<string, string> = {
  bw: 'B&W',
  color: 'Full Color',
  custom: 'Mixed',
};

const bindingLabel: Record<string, string> = {
  none: 'Loose',
  spiral: 'Spiral',
  staple: 'Staple',
  hardcover: 'Hard Cover',
};

export default function CartReview({
  cartItems, isNight, onDeleteItem, onAddMore, onProceed,
}: CartReviewProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(cartItems.map(item => [item.id, true]))
  );

  const toggleCheck = (id: string) =>
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const selectedItems = cartItems.filter(item => checked[item.id] !== false);
  const totalCost = selectedItems.reduce((sum, item) => sum + calculateItemCost(item), 0);
  const canProceed = selectedItems.length > 0;

  return (
    <div
      className={styles.cartReviewPhase}
      style={{
        color: isNight ? '#EAE4DD' : '#2A2928',
        background: isNight ? 'rgba(28,26,24,0.97)' : 'rgba(250,247,241,0.97)',
      }}
    >
      <button
        onClick={onAddMore}
        style={{
          position: 'absolute', top: '1.5rem', left: '2rem',
          background: 'none', border: 'none', fontFamily: 'Space Grotesk',
          fontSize: '0.85rem', color: '#7A6D8C', cursor: 'pointer', opacity: 0.8,
        }}
      >
        ← Back
      </button>

      <div className={styles.cartReviewInner}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h2
            className={styles.cartReviewHeader}
            style={{ color: isNight ? '#EAE4DD' : '#2A2928' }}
          >
            Your Cart
          </h2>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C' }}>
            {cartItems.length} {cartItems.length === 1 ? 'file' : 'files'}
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '3rem',
            fontFamily: 'Instrument Sans', fontSize: '1rem',
            color: isNight ? 'rgba(234,228,221,0.4)' : 'rgba(42,41,40,0.35)',
          }}>
            Your cart is empty.
            <br />
            <button
              onClick={onAddMore}
              style={{
                marginTop: '1rem', background: 'none', border: 'none',
                color: '#D48A70', cursor: 'pointer',
                fontFamily: 'Space Grotesk', fontSize: '0.9rem',
              }}
            >
              Add a file →
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => {
              const cost = calculateItemCost(item);
              const isChecked = checked[item.id] !== false;
              return (
                <div
                  key={item.id}
                  className={styles.cartItemRow}
                  style={{
                    opacity: isChecked ? 1 : 0.45,
                    background: isNight ? '#252320' : '#FAF7F1',
                    borderColor: isNight
                      ? 'rgba(234,228,221,0.08)'
                      : 'rgba(42,41,40,0.08)',
                  }}
                >
                  <input
                    type="checkbox"
                    className={styles.cartCheckbox}
                    checked={isChecked}
                    onChange={() => toggleCheck(item.id)}
                  />
                  <div className={styles.cartItemMeta}>
                    <span
                      className={styles.cartItemName}
                      style={{ color: isNight ? '#EAE4DD' : '#2A2928' }}
                      title={item.docName}
                    >
                      {item.docName}
                    </span>
                    <span className={styles.cartItemDetail}>
                      {item.pageCount} pgs &middot; {item.copies}&times; &middot;{' '}
                      {colorLabel[item.colorMode] ?? item.colorMode} &middot;{' '}
                      {bindingLabel[item.binding] ?? item.binding} &middot; {item.paperSize}
                    </span>
                    <span
                      className={styles.cartItemDetail}
                      style={{ color: '#A9B59D', fontSize: '0.7rem' }}
                    >
                      🏪 {item.shopName}
                    </span>
                  </div>
                  <div
                    className={styles.cartItemCost}
                    style={{ color: isNight ? '#EAE4DD' : '#2A2928' }}
                  >
                    <span>₹{cost}</span>
                    <button
                      className={styles.cartDeleteBtn}
                      onClick={() => onDeleteItem(item.id)}
                      aria-label={`Remove ${item.docName}`}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}

            <div
              className={styles.cartTotalBar}
              style={{
                background: isNight ? '#252320' : '#FAF7F1',
                borderColor: isNight
                  ? 'rgba(234,228,221,0.1)'
                  : 'rgba(42,41,40,0.1)',
              }}
            >
              <div>
                <div className={styles.cartTotalLabel}>
                  Total &middot; {selectedItems.length} selected{' '}
                  {selectedItems.length === 1 ? 'file' : 'files'}
                </div>
                <div
                  className={styles.cartTotalAmount}
                  style={{ color: isNight ? '#EAE4DD' : '#2A2928' }}
                >
                  ₹{totalCost}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'flex-end' }}>
                <button
                  className={styles.sendBtn}
                  disabled={!canProceed}
                  onClick={() => onProceed(selectedItems)}
                  style={{
                    opacity: canProceed ? 1 : 0.4,
                    cursor: canProceed ? 'pointer' : 'not-allowed',
                  }}
                >
                  Proceed to Payment →
                </button>
                <button className={styles.addToCartBtn} onClick={onAddMore}>
                  + Add Another File
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
