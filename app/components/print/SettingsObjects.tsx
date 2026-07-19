'use client';

import React from 'react';
import styles from './print.module.css';

interface SettingsObjectsProps {
  paperSize: 'A4' | 'A3' | 'A5';
  binding: 'none' | 'spiral' | 'staple' | 'hardcover';
  colorMode: 'bw' | 'color' | 'custom';
  customColorPages: string;
  lamination: boolean;
  copies: number;
  onPaperSize: (v: 'A4' | 'A3' | 'A5') => void;
  onBinding: (v: 'none' | 'spiral' | 'staple' | 'hardcover') => void;
  onColorMode: (v: 'bw' | 'color' | 'custom') => void;
  onCustomColorPages: (v: string) => void;
  onLamination: (v: boolean) => void;
  onCopies: (v: number) => void;
  pageCount: number;
}

// Spiral binding rings SVG
function SpiralRings() {
  return (
    <svg width="44" height="52" viewBox="0 0 44 52">
      <rect x="8" y="2" width="28" height="48" rx="2" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <path
            d={`M 4 ${8 + i * 9} Q 0 ${8 + i * 9} 0 ${12.5 + i * 9} Q 0 ${17 + i * 9} 4 ${17 + i * 9} L 8 ${17 + i * 9} L 8 ${8 + i * 9} Z`}
            fill="#A9B59D" stroke="rgba(42,41,40,0.2)" strokeWidth="0.5"
          />
        </g>
      ))}
    </svg>
  );
}

// Staple SVG
function StapleIcon() {
  return (
    <svg width="44" height="52" viewBox="0 0 44 52">
      <rect x="2" y="8" width="40" height="36" rx="2" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
      <rect x="6" y="14" width="32" height="1.5" fill="rgba(42,41,40,0.2)" />
      <rect x="6" y="18" width="28" height="1.5" fill="rgba(42,41,40,0.2)" />
      <rect x="6" y="22" width="30" height="1.5" fill="rgba(42,41,40,0.2)" />
      {/* Staple */}
      <path d="M 15 6 L 15 12 L 29 12 L 29 6" stroke="#7A6D8C" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Hardcover SVG
function HardcoverIcon() {
  return (
    <svg width="44" height="52" viewBox="0 0 44 52">
      {/* Hard spine */}
      <rect x="0" y="2" width="8" height="48" rx="1" fill="#2A2928" />
      {/* Hard cover */}
      <rect x="7" y="2" width="36" height="48" rx="2" fill="#7A6D8C" />
      <rect x="10" y="6" width="30" height="40" rx="1" fill="#FAF7F1" />
      <rect x="12" y="12" width="26" height="1.5" fill="rgba(42,41,40,0.15)" />
      <rect x="12" y="16" width="22" height="1.5" fill="rgba(42,41,40,0.15)" />
    </svg>
  );
}

// Ink bottle SVG
function InkBottle({ color, isColor, isMixed }: { color: string; isColor: boolean; isMixed?: boolean }) {
  return (
    <svg width="36" height="52" viewBox="0 0 36 52" style={{ display: 'block' }}>
      {/* Cap */}
      <rect x="12" y="2" width="12" height="8" rx="3" fill="rgba(42,41,40,0.7)" />
      {/* Neck */}
      <rect x="15" y="10" width="6" height="8" fill="rgba(42,41,40,0.3)" />
      {/* Body */}
      {isMixed ? (
        <>
          <clipPath id="splitClip">
            <rect x="4" y="18" width="28" height="28" rx="4" />
          </clipPath>
          <g clipPath="url(#splitClip)">
            <rect x="4" y="18" width="14" height="28" fill="#2A2928" />
            <rect x="18" y="18" width="14" height="28" fill="#D48A70" />
          </g>
          <rect x="4" y="18" width="28" height="28" rx="4" fill="none" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
        </>
      ) : (
        <rect x="4" y="18" width="28" height="28" rx="4" fill={color} stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
      )}
      {/* Label */}
      <rect x="7" y="24" width="22" height="14" rx="2" fill="rgba(255,255,255,0.5)" />
      {/* Ink level */}
      {isMixed ? (
        <g clipPath="url(#splitClip)">
          <rect x="4" y="30" width="14" height="16" fill="#2A2928" opacity="0.7" />
          <rect x="18" y="30" width="14" height="16" fill="#D48A70" opacity="0.7" />
        </g>
      ) : (
        <rect x="4" y={isColor ? 30 : 38} width="28" height={isColor ? 16 : 8} rx="4" fill={color} opacity="0.7" />
      )}
    </svg>
  );
}

// Lamination overlay sheet
function LaminationSheet({ active }: { active: boolean }) {
  return (
    <svg width="50" height="64" viewBox="0 0 50 64">
      {/* Base paper */}
      <rect x="2" y="8" width="42" height="54" rx="2" fill="#EAE4DD" stroke="rgba(42,41,40,0.1)" strokeWidth="1" />
      {/* Transparent overlay (lamination) */}
      {active && (
        <rect
          x="2" y="8" width="42" height="54" rx="2"
          fill="rgba(169, 200, 220, 0.25)"
          stroke="rgba(100,180,220,0.4)"
          strokeWidth="1.5"
        />
      )}
      {/* Shine line */}
      {active && (
        <path d="M 6 12 Q 18 18 8 28" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" fill="none" />
      )}
      {/* Lines */}
      <rect x="6" y="18" width="30" height="1.5" fill="rgba(42,41,40,0.15)" />
      <rect x="6" y="23" width="26" height="1.5" fill="rgba(42,41,40,0.15)" />
      <rect x="6" y="28" width="28" height="1.5" fill="rgba(42,41,40,0.15)" />
    </svg>
  );
}

export default function SettingsObjects({
  paperSize, binding, colorMode, customColorPages, lamination, copies,
  onPaperSize, onBinding, onColorMode, onCustomColorPages, onLamination, onCopies,
  pageCount
}: SettingsObjectsProps) {

  const paperDimensions: Record<'A4' | 'A3' | 'A5', { w: number; h: number }> = {
    A4: { w: 40, h: 56 },
    A3: { w: 52, h: 72 },
    A5: { w: 30, h: 42 },
  };

  return (
    <div className={styles.settingsSection}>

      {/* Paper Size */}
      <div>
        <p className={styles.settingsLabel}>Paper Size</p>
        <div className={styles.settingsRow}>
          {(['A4', 'A3', 'A5'] as const).map(size => {
            const { w, h } = paperDimensions[size];
            return (
              <div
                key={size}
                className={`${styles.paperOption} ${paperSize === size ? styles.selected : ''}`}
                onClick={() => onPaperSize(size)}
              >
                <div className={styles.paperOptionInner} style={{ width: `${w}px`, height: `${h}px` }}>
                  {/* Paper lines */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} style={{ position: 'absolute', left: '6px', right: '6px', top: `${12 + i * 8}px`, height: '1px', background: 'rgba(42,41,40,0.1)' }} />
                  ))}
                  <span className={styles.paperOptionLabel}>{size}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Mode — ink bottles */}
      <div>
        <p className={styles.settingsLabel}>Color Mode</p>
        <div className={styles.settingsRow}>
          <div
            className={`${styles.inkBottle} ${colorMode === 'bw' ? styles.selected : ''}`}
            onClick={() => onColorMode('bw')}
          >
            <InkBottle color="#2A2928" isColor={false} />
            <span className={styles.inkBottleLabel}>B&W</span>
          </div>
          <div
            className={`${styles.inkBottle} ${colorMode === 'color' ? styles.selected : ''}`}
            onClick={() => onColorMode('color')}
          >
            <InkBottle color="#D48A70" isColor={true} />
            <span className={styles.inkBottleLabel}>Color</span>
          </div>
          <div
            className={`${styles.inkBottle} ${colorMode === 'custom' ? styles.selected : ''}`}
            onClick={() => onColorMode('custom')}
          >
            <InkBottle color="#7A6D8C" isColor={true} isMixed={true} />
            <span className={styles.inkBottleLabel}>Mixed</span>
          </div>
          {/* Swatch dots */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignSelf: 'center', marginLeft: '4px' }}>
            {['#D48A70','#A9B59D','#7A6D8C','#2A2928'].map(c => (
              <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
            ))}
          </div>
        </div>
      </div>

      {/* Mixed mode page input */}
      {colorMode === 'custom' && (
        <div style={{ marginTop: '14px', animation: 'fadeIn 0.3s ease-in-out' }}>
          <p className={styles.settingsLabel} style={{ fontSize: '0.85rem', marginBottom: '6px' }}>Specify Color Pages (1 to {pageCount})</p>
          <input
            type="text"
            placeholder="e.g. 1, 3-5, 8"
            value={customColorPages}
            onChange={(e) => onCustomColorPages(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle, rgba(42,41,40,0.15))',
              background: 'var(--bg-primary, #FAF7F1)',
              color: 'var(--text-primary, #2A2928)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        </div>
      )}

      {/* Binding — actual objects */}
      <div>
        <p className={styles.settingsLabel}>Binding</p>
        <div className={styles.settingsRow}>
          {[
          { value: 'none' as const, label: 'None', icon: null },
            { value: 'spiral' as const, label: 'Spiral', icon: <SpiralRings /> },
            { value: 'staple' as const, label: 'Staple', icon: <StapleIcon /> },
            { value: 'hardcover' as const, label: 'Hard', icon: <HardcoverIcon /> },
          ].map(({ value, label, icon }) => (
            <div
              key={value}
              className={`${styles.bindingOption} ${binding === value ? styles.selected : ''}`}
              onClick={() => onBinding(value)}
            >
              {icon ?? (
                <svg width="44" height="52" viewBox="0 0 44 52">
                  <rect x="6" y="8" width="32" height="36" rx="2" fill="#EAE4DD" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
                  <rect x="10" y="14" width="24" height="1.5" fill="rgba(42,41,40,0.15)" />
                  <rect x="10" y="18" width="20" height="1.5" fill="rgba(42,41,40,0.15)" />
                </svg>
              )}
              <span className={styles.bindingLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lamination — transparent overlay sheet */}
      <div>
        <p className={styles.settingsLabel}>Lamination</p>
        <div
          onClick={() => onLamination(!lamination)}
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '1rem' }}
        >
          <LaminationSheet active={lamination} />
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', fontWeight: 700, color: lamination ? '#A9B59D' : '#7A6D8C' }}>
              {lamination ? 'Applied ✓' : 'Tap to apply'}
            </div>
            <div style={{ fontFamily: 'Instrument Sans', fontSize: '0.75rem', color: 'rgba(122,109,140,0.7)' }}>
              Transparent gloss overlay
            </div>
          </div>
        </div>
      </div>

      {/* Copies — paper stack grows visually */}
      <div>
        <p className={styles.settingsLabel}>Copies</p>
        <div className={styles.copiesCounter}>
          <button className={styles.copiesBtn} onClick={() => onCopies(Math.max(1, copies - 1))}>−</button>
          <span className={styles.copiesValue}>{copies}</span>
          <button className={styles.copiesBtn} onClick={() => onCopies(Math.min(200, copies + 1))}>+</button>

          {/* Visual paper stack */}
          <div className={styles.paperStackVisual}>
            <svg width="50" height={Math.min(12 + copies * 0.8, 60)} viewBox={`0 0 50 ${Math.min(12 + copies * 0.8, 60)}`}>
              {Array.from({ length: Math.min(Math.ceil(copies / 10), 6) }).map((_, i, arr) => (
                <rect
                  key={i}
                  x={2 - i * 0.5}
                  y={arr.length * 8 - i * 8}
                  width={46 + i}
                  height={10}
                  rx={1}
                  fill={i % 2 === 0 ? '#FAF7F1' : '#F0EDE8'}
                  stroke="rgba(42,41,40,0.08)"
                  strokeWidth="0.5"
                  style={{ filter: `drop-shadow(0 ${i * 0.5}px ${i}px rgba(42,41,40,0.04))` }}
                />
              ))}
            </svg>
          </div>

          {copies > 50 && (
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.7rem', color: '#D48A70' }}>
              Heavy stack! Ezi will need help 💪
            </span>
          )}
        </div>
      </div>

    </div>
  );
}
