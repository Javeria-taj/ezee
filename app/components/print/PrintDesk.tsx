'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './print.module.css';
import EziPrinter from './EziPrinter';
import DocumentSheet, { detectDocType, DocumentType } from './DocumentSheet';
import SettingsObjects from './SettingsObjects';
import PrintCityShops, { SHOPS } from './PrintCityShops';
import SacredPrinter from './SacredPrinter';
import PrintTicket from './PrintTicket';
import SignatureMoment from './SignatureMoment';
import PaymentDesk from './PaymentDesk';
import TheJourney from './TheJourney';
import { useMemorySystem } from './useMemorySystem';
import CartReview from './CartReview';

export type ColorMode = 'bw' | 'color' | 'custom';

export interface CartItem {
  id: string;
  docName: string;
  pageCount: number;
  docType: DocumentType;
  paperSize: 'A4' | 'A3' | 'A5';
  binding: 'none' | 'spiral' | 'staple' | 'hardcover';
  colorMode: ColorMode;
  customColorPages: string;
  lamination: boolean;
  copies: number;
  shopId: string;
  shopName: string;
}

type Phase = 'upload' | 'settings' | 'shop' | 'cartReview' | 'payment' | 'printing' | 'ticket' | 'signature' | 'done';

interface PrintDeskProps {
  onClose: () => void;
  isNight?: boolean;
}

// Get time-based Ezi state
function getEziState(isNight: boolean): 'makingCoffee' | 'organizingPapers' | 'adjustingBookmarks' | 'idle' {
  const hour = new Date().getHours();
  if (isNight || hour >= 22 || hour < 6) return 'idle';
  if (hour < 10) return 'makingCoffee';
  if (hour < 16) return 'organizingPapers';
  return 'adjustingBookmarks';
}

// Ambient dust particles
function DustLayer() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={styles.dustParticle}
          style={{
            width: `${1.5 + (i % 3)}px`,
            height: `${1.5 + (i % 3)}px`,
            left: `${8 + i * 11}%`,
            top: `${20 + (i * 7) % 60}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${7 + i * 1.5}s`,
            '--dx': `${((i % 2 === 0) ? 1 : -1) * (20 + i * 5)}px`,
            '--dy': `${-30 - i * 8}px`,
          } as React.CSSProperties}
        />
      ))}
    </>
  );
}

// Ambient window with curtains
function AmbientWindow({ isNight }: { isNight: boolean }) {
  return (
    <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', opacity: 0.6, pointerEvents: 'none', zIndex: 0 }}>
      <svg width="120" height="90" viewBox="0 0 120 90">
        {/* Frame */}
        <rect x="2" y="2" width="116" height="86" rx="4" fill={isNight ? 'rgba(12,18,28,0.8)' : 'rgba(169,200,220,0.25)'} stroke="rgba(42,41,40,0.2)" strokeWidth="2.5" />
        <line x1="61" y1="2" x2="61" y2="88" stroke="rgba(42,41,40,0.2)" strokeWidth="2.5" />
        <line x1="2" y1="45" x2="118" y2="45" stroke="rgba(42,41,40,0.2)" strokeWidth="2.5" />
        {/* Left curtain */}
        <path d="M 2 2 Q 18 24 10 46 Q 18 68 2 88" fill="rgba(212,138,112,0.25)" className={styles.curtain} />
        {/* Right curtain */}
        <path d="M 118 2 Q 102 24 110 46 Q 102 68 118 88" fill="rgba(212,138,112,0.25)" className={styles.curtainRight} />
        {/* Night: stars / Day: sun */}
        {isNight ? (
          <>
            <circle cx="30" cy="22" r="1.5" fill="rgba(234,228,221,0.8)" />
            <circle cx="52" cy="15" r="1" fill="rgba(234,228,221,0.6)" />
            <circle cx="80" cy="20" r="1.5" fill="rgba(234,228,221,0.8)" />
            <circle cx="96" cy="28" r="1" fill="rgba(234,228,221,0.5)" />
            <circle cx="40" cy="35" r="1" fill="rgba(234,228,221,0.4)" />
            {/* Moon */}
            <path d="M 58 30 Q 64 22 70 30 Q 64 36 58 30" fill="rgba(244,208,63,0.5)" />
          </>
        ) : (
          <>
            {/* Clouds */}
            <ellipse cx="35" cy="18" rx="14" ry="6" fill="rgba(250,247,241,0.8)" />
            <ellipse cx="28" cy="22" rx="9" ry="5" fill="rgba(250,247,241,0.7)" />
            <ellipse cx="85" cy="14" rx="16" ry="7" fill="rgba(250,247,241,0.8)" />
          </>
        )}
      </svg>
    </div>
  );
}

// Desk lamp
function DeskLamp({ isNight }: { isNight: boolean }) {
  return (
    <div style={{ position: 'absolute', top: '0', left: '1rem', pointerEvents: 'none', zIndex: 0 }}>
      <svg width="80" height="120" viewBox="0 0 80 120">
        {/* Glow when night */}
        {isNight && (
          <ellipse cx="40" cy="85" rx="50" ry="30" fill="rgba(244,208,63,0.12)" />
        )}
        {/* Arm */}
        <path d="M 30 110 L 30 80 Q 30 60 50 50 Q 65 44 68 30" stroke="#C4956A" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Base */}
        <ellipse cx="30" cy="112" rx="18" ry="5" fill="#C4956A" stroke="rgba(42,41,40,0.2)" strokeWidth="1" />
        <rect x="24" y="106" width="12" height="8" rx="2" fill="#C4956A" />
        {/* Shade */}
        <path d="M 50 30 Q 68 18 82 26 L 76 48 Q 62 42 48 52 Z" fill="#D48A70" stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
        {/* Light glow */}
        {isNight && (
          <>
            <ellipse cx="64" cy="40" rx="30" ry="20" fill="rgba(244,208,63,0.08)" />
            <circle cx="65" cy="38" r="4" fill="rgba(244,208,63,0.5)" />
          </>
        )}
      </svg>
    </div>
  );
}

// Memory visuals: Books, Mugs, Clock, Lanterns, Sticky Notes
function MemoryVisuals({ isNight, visits, orders, isFestival, isExamSeason, totalPages }: { isNight: boolean, visits: number, orders: number, isFestival: boolean, isExamSeason: boolean, totalPages: number }) {
  const booksCount = Math.min(1 + Math.floor(totalPages / 50), 6);
  const mugsCount = Math.min(1 + Math.floor(visits / 3), 3);
  const plantScale = Math.min(1 + (orders * 0.05), 1.3);

  // Calculate clock hands
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30;
  const minuteAngle = minutes * 6 + (seconds / 60) * 6;
  const secondAngle = seconds * 6;

  return (
    <>
      {/* Ticking Clock */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '16rem', pointerEvents: 'none', zIndex: 0 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill={isNight ? '#252320' : '#FAF7F1'} stroke="rgba(42,41,40,0.2)" strokeWidth="2" />
          <circle cx="20" cy="20" r="2" fill="#D48A70" />
          {/* Hour hand */}
          <line x1="20" y1="20" x2="20" y2="10" stroke="#2A2928" strokeWidth="2" strokeLinecap="round" transform={`rotate(${hourAngle} 20 20)`} />
          {/* Minute hand */}
          <line x1="20" y1="20" x2="20" y2="6" stroke="#2A2928" strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${minuteAngle} 20 20)`} />
          {/* Second hand */}
          <line x1="20" y1="20" x2="20" y2="4" stroke="#D48A70" strokeWidth="1" strokeLinecap="round" transform={`rotate(${secondAngle} 20 20)`} />
        </svg>
      </div>

      {/* Stack of books (based on totalPages) */}
      <div style={{ position: 'absolute', top: '2rem', right: '12rem', pointerEvents: 'none', zIndex: 0 }}>
        <svg width="80" height={40 + booksCount * 12} viewBox={`0 0 80 ${40 + booksCount * 12}`}>
          {Array.from({ length: booksCount }).map((_, i) => {
            const colors = ['#A9B59D', '#7A6D8C', '#D48A70', '#8B6340', '#C4956A', '#2A2928'];
            const c = colors[i % colors.length];
            const y = (booksCount - i - 1) * 10;
            return (
              <g key={i} transform={`translate(${i % 2 === 0 ? 0 : 4}, ${y + 20}) rotate(${i % 2 === 0 ? -1 : 1})`}>
                {/* Book spine */}
                <rect x="0" y="0" width="70" height="12" rx="2" fill={c} stroke="rgba(42,41,40,0.15)" strokeWidth="1" />
                {/* Pages edge */}
                <rect x="2" y="1" width="66" height="10" fill="rgba(255,255,255,0.1)" />
                {/* Decoration */}
                <line x1="10" y1="2" x2="10" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <line x1="60" y1="2" x2="60" y2="10" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Coffee Mugs (based on visits) */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '16rem', pointerEvents: 'none', zIndex: 0 }}>
        {Array.from({ length: mugsCount }).map((_, i) => (
          <svg key={i} width="40" height="40" viewBox="0 0 50 60" style={{ position: 'absolute', left: `${i * 25}px`, bottom: `${i * 5}px`, transform: `rotate(${i * 15 - 10}deg)` }}>
            <path d="M 5 20 L 5 46 Q 5 54 25 54 Q 45 54 45 46 L 45 20 Z" fill="#EAE4DD" stroke="rgba(42,41,40,0.2)" strokeWidth="1.5" />
            <path d="M 45 28 Q 56 28 56 36 Q 56 44 45 44" fill="none" stroke="rgba(42,41,40,0.2)" strokeWidth="1.5" />
            <ellipse cx="25" cy="21" rx="20" ry="5" fill={i === 0 ? "#C4956A" : "rgba(42,41,40,0.1)"} />
          </svg>
        ))}
      </div>

      {/* Exam Season Sticky Notes */}
      {isExamSeason && (
        <>
          <div style={{ position: 'absolute', top: '30%', left: '4%', transform: 'rotate(-12deg)', zIndex: 0 }}>
            <svg width="40" height="40"><rect width="40" height="40" fill="#F4D03F" opacity="0.9" filter="drop-shadow(2px 2px 2px rgba(0,0,0,0.1))" /><line x1="5" y1="10" x2="30" y2="10" stroke="#2A2928" strokeWidth="1.5" opacity="0.5" /><line x1="5" y1="20" x2="25" y2="20" stroke="#2A2928" strokeWidth="1.5" opacity="0.5" /></svg>
          </div>
          <div style={{ position: 'absolute', bottom: '15%', right: '8%', transform: 'rotate(8deg)', zIndex: 0 }}>
            <svg width="40" height="40"><rect width="40" height="40" fill="#A9B59D" opacity="0.9" filter="drop-shadow(2px 2px 2px rgba(0,0,0,0.1))" /><line x1="5" y1="15" x2="35" y2="15" stroke="#2A2928" strokeWidth="1.5" opacity="0.5" /></svg>
          </div>
        </>
      )}

      {/* Festival Lanterns */}
      {isFestival && (
        <div style={{ position: 'absolute', top: '0', right: '2rem', zIndex: 0 }}>
          <svg width="120" height="40" viewBox="0 0 120 40">
            <path d="M 0 5 Q 60 20 120 5" fill="none" stroke="rgba(42,41,40,0.3)" strokeWidth="1" />
            {[20, 60, 100].map((x, i) => (
              <g key={i} transform={`translate(${x}, ${7 + (i === 1 ? 5 : 0)})`}>
                <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(42,41,40,0.3)" strokeWidth="1" />
                <rect x="-8" y="5" width="16" height="20" rx="2" fill="#D48A70" />
                <rect x="-8" y="5" width="16" height="3" fill="#A87A51" />
                <rect x="-8" y="22" width="16" height="3" fill="#A87A51" />
                <circle cx="0" cy="15" r="4" fill="rgba(244,208,63,0.8)" />
              </g>
            ))}
          </svg>
        </div>
      )}

      {/* Tiny growing plant */}
      <div style={{ position: 'absolute', top: '10rem', left: '2rem', transform: `scale(${plantScale})`, transformOrigin: 'bottom center', zIndex: 0 }}>
        <svg width="40" height="60" viewBox="0 0 40 60">
          <path d="M 20 60 L 20 30" stroke="#8BA382" strokeWidth="2" strokeLinecap="round" />
          <path d="M 20 45 Q 12 40 10 32" stroke="#8BA382" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 20 38 Q 28 32 30 24" stroke="#8BA382" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="10" cy="32" rx="6" ry="10" fill="#A9B59D" transform="rotate(-30 10 32)" />
          <ellipse cx="30" cy="24" rx="6" ry="10" fill="#A9B59D" transform="rotate(30 30 24)" />
          <ellipse cx="20" cy="20" rx="8" ry="12" fill="#A9B59D" />
          <rect x="12" y="52" width="16" height="8" rx="1" fill="#C4956A" />
        </svg>
      </div>
    </>
  );
}

export default function PrintDesk({ onClose, isNight = false }: PrintDeskProps) {
  const [phase, setPhase] = useState<Phase>('upload');
  const [dragOver, setDragOver] = useState(false);
  const [docName, setDocName] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [docType, setDocType] = useState<DocumentType>('general');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // Items selected from cart for the current payment
  const [activeCartItems, setActiveCartItems] = useState<CartItem[]>([]);

  // Settings state (for current item being configured)
  const [paperSize, setPaperSize] = useState<'A4' | 'A3' | 'A5'>('A4');
  const [binding, setBinding] = useState<'none' | 'spiral' | 'staple' | 'hardcover'>('none');
  const [colorMode, setColorMode] = useState<ColorMode>('bw');
  const [customColorPages, setCustomColorPages] = useState('');
  const [lamination, setLamination] = useState(false);
  const [copies, setCopies] = useState(1);
  const [selectedShop, setSelectedShop] = useState('cozy');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const eziState = getEziState(isNight);
  const [orderNum] = useState(() => Math.floor(2000 + Math.random() * 800));

  const { memory, trackOrder } = useMemorySystem();

  // Clock tick trigger to re-render MemoryVisuals every second
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFile = useCallback((file: File) => {
    const name = file.name.replace(/\.[^.]+$/, '');
    setDocName(name);
    // Estimate page count from file size (rough heuristic: 80KB per page for PDF)
    const estimated = Math.max(1, Math.round(file.size / 81920));
    setPageCount(Math.min(estimated, 300));
    setDocType(detectDocType(file.name));
    setPhase('settings');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const shop = SHOPS.find(s => s.id === selectedShop) ?? SHOPS[0];
  const etaMinutes = Math.floor((shop.etaMin + shop.etaMax) / 2);

  // Reset current-item state (after adding to cart)
  const resetCurrentItem = useCallback(() => {
    setDocName('');
    setPageCount(0);
    setPaperSize('A4');
    setBinding('none');
    setColorMode('bw');
    setCustomColorPages('');
    setLamination(false);
    setCopies(1);
    setSelectedShop('cozy');
    setPhase('upload');
  }, []);

  const handleAddToCart = useCallback(() => {
    const newItem: CartItem = {
      id: String(Date.now()),
      docName, pageCount, docType,
      paperSize, binding, colorMode, customColorPages,
      lamination, copies,
      shopId: selectedShop,
      shopName: shop.name,
    };
    setCartItems(prev => [...prev, newItem]);
    resetCurrentItem();
  }, [docName, pageCount, docType, paperSize, binding, colorMode, customColorPages, lamination, copies, selectedShop, shop.name, resetCurrentItem]);

  const canProceedToShop = phase === 'settings';
  const canAddToCart = phase === 'shop';

  return (
    <div className={`${styles.printDesk} ${isNight ? styles.nightMode : ''}`}>

      {/* Top bar */}
      <div className={styles.topBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Phase breadcrumb */}
          <span className={styles.topBarTitle}>
            {phase === 'upload' ? 'The Desk' :
             phase === 'settings' ? 'Preparing' :
             phase === 'shop' ? 'Choose Your Shop' :
             phase === 'cartReview' ? 'Your Cart' :
             phase === 'payment' ? 'Payment' :
             phase === 'printing' ? 'Printing…' :
             phase === 'ticket' ? 'It’s Ready' :
             phase === 'signature' ? 'On Its Way' : 'Done'}
          </span>
          {(phase === 'settings' || phase === 'shop') && (
            <button
              onClick={() => setPhase(p => p === 'shop' ? 'settings' : 'upload')}
              style={{ background: 'none', border: 'none', fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C', cursor: 'pointer', opacity: 0.7 }}
            >
              ← back
            </button>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Cart badge button */}
          {cartItems.length > 0 && phase !== 'cartReview' && phase !== 'payment' && phase !== 'printing' && phase !== 'ticket' && phase !== 'signature' && phase !== 'done' && (
            <button
              className={styles.cartBtn}
              onClick={() => setPhase('cartReview')}
              aria-label={`View cart (${cartItems.length} files)`}
            >
              🛒 Cart
              <span className={styles.cartBadge} key={cartItems.length}>{cartItems.length}</span>
            </button>
          )}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close Print Studio">×</button>
        </div>
      </div>

      {/* Sacred printer phase — full overlay */}
      {phase === 'printing' && (
        <SacredPrinter
          isNight={isNight}
          copies={activeCartItems.reduce((s, i) => s + i.copies, 0)}
          docNames={activeCartItems.map(i => i.docName)}
          onDone={() => setPhase('ticket')}
        />
      )}

      {/* Payment Drawer phase — full overlay */}
      {phase === 'payment' && (
        <PaymentDesk
          cartItems={activeCartItems}
          isNight={isNight}
          onPay={() => setPhase('printing')}
          onBack={() => setPhase('cartReview')}
        />
      )}

      {/* Signature moment — full overlay */}
      {phase === 'signature' && (
        <SignatureMoment
          shopName={activeCartItems[0]?.shopName ?? ''}
          isNight={isNight}
          onComplete={() => {
            activeCartItems.forEach(item =>
              trackOrder(item.docName, item.docType, item.pageCount, item.copies, item.binding, item.shopName, isNight)
            );
            setPhase('done');
          }}
        />
      )}

      {/* The Journey — Post-order atmospheric experience */}
      {phase === 'done' && (
        <TheJourney
          docName={activeCartItems.length === 1 ? activeCartItems[0].docName : `${activeCartItems.length} files`}
          shopName={activeCartItems[0]?.shopName ?? ''}
          isNight={isNight}
          onClose={onClose}
        />
      )}

      {/* Cart Review phase */}
      {phase === 'cartReview' && (
        <CartReview
          cartItems={cartItems}
          isNight={isNight}
          onDeleteItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
          onAddMore={() => setPhase('upload')}
          onProceed={(selected) => {
            setActiveCartItems(selected);
            setPhase('payment');
          }}
        />
      )}  

      {/* Main desk — visible during upload, settings, shop, ticket */}
      {(phase === 'upload' || phase === 'settings' || phase === 'shop' || phase === 'ticket') && (
        <div className={styles.deskSurface}>
          <DustLayer />
          <AmbientWindow isNight={isNight} />
          <DeskLamp isNight={isNight} />
          <MemoryVisuals isNight={isNight} {...memory} totalPages={memory.totalPrintedPages} />

          {/* Cloud shadow drifting */}
          <div className={styles.cloudShadow} />

          <div className={`${styles.deskContent} mobile-stack`}>

            {/* LEFT — main interaction area */}
            <div className={styles.deskLeft}>

              {/* UPLOAD PHASE */}
              {phase === 'upload' && (
                <>
                  <div
                    className={`${styles.uploadZone} ${dragOver ? styles.dragOver : ''}`}
                    onDragEnter={e => { e.preventDefault(); setDragOver(true); }}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    aria-label="Upload document"
                    onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg"
                      style={{ display: 'none' }}
                      onChange={handleFileInput}
                    />

                    {/* Decorative paper clip SVG */}
                    <svg
                      style={{ position: 'absolute', top: '-18px', right: '30px', width: '24px', height: '52px', transform: 'rotate(12deg)', opacity: 0.5 }}
                      viewBox="0 0 24 52"
                    >
                      <path d="M 12 44 L 12 10 Q 12 2 20 2 Q 28 2 28 18 L 28 48 Q 28 60 12 60 Q -4 60 -4 38 L -4 14" fill="none" stroke="#7A6D8C" strokeWidth="3" strokeLinecap="round" />
                    </svg>

                    {/* Large paper icon — SVG not emoji */}
                    <svg width="64" height="80" viewBox="0 0 64 80" style={{ opacity: dragOver ? 0.9 : 0.45, transition: 'opacity 0.3s' }}>
                      <rect x="4" y="4" width="56" height="72" rx="4" fill="#FAF7F1" stroke="rgba(42,41,40,0.2)" strokeWidth="2" />
                      {/* Page fold */}
                      <path d="M 44 4 L 60 20 L 44 20 Z" fill="rgba(42,41,40,0.06)" />
                      <path d="M 44 4 L 60 20 L 44 20 L 44 4" stroke="rgba(42,41,40,0.15)" strokeWidth="1.5" fill="none" />
                      {/* Lines */}
                      {[0,1,2,3,4].map(i => (
                        <rect key={i} x="12" y={28 + i * 8} width={i % 3 === 0 ? 28 : 36} height="1.5" rx="1" fill="rgba(42,41,40,0.12)" />
                      ))}
                      {/* Arrow down */}
                      <path d="M 32 52 L 32 64 M 26 58 L 32 64 L 38 58" stroke="rgba(42,41,40,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>

                    <p className={styles.uploadHint}>
                      Drop your document here
                    </p>
                    <p className={styles.uploadSubhint}>
                      PDF, DOC, PPT, or image · Let&apos;s prepare it together
                    </p>
                  </div>

                  {/* Ezi on the side */}
                  <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '90px', height: '125px' }}>
                    <EziPrinter state={eziState} isNight={isNight} copies={1} />
                  </div>
                </>
              )}

              {/* SETTINGS + SHOP PHASE — document sheet on left */}
              {(phase === 'settings' || phase === 'shop') && (
                <DocumentSheet
                  name={docName}
                  pageCount={pageCount}
                  docType={docType}
                  copies={copies}
                />
              )}

              {/* TICKET PHASE */}
              {phase === 'ticket' && (
                <PrintTicket
                  orderNum={orderNum}
                  cartItems={activeCartItems}
                  etaMinutes={etaMinutes}
                  isNight={isNight}
                  onSendToShop={() => setPhase('signature')}
                />
              )}
            </div>

            {/* RIGHT — settings or shop selection */}
            <div className={styles.deskRight}>
              {phase === 'settings' && (
                <>
                  <SettingsObjects
                    paperSize={paperSize}
                    binding={binding}
                    colorMode={colorMode}
                    customColorPages={customColorPages}
                    lamination={lamination}
                    copies={copies}
                    pageCount={pageCount}
                    onPaperSize={setPaperSize}
                    onBinding={setBinding}
                    onColorMode={setColorMode}
                    onCustomColorPages={setCustomColorPages}
                    onLamination={setLamination}
                    onCopies={setCopies}
                  />
                  {canProceedToShop && (
                    <button
                      className={styles.sendBtn}
                      onClick={() => setPhase('shop')}
                      style={{ marginTop: 'auto', alignSelf: 'stretch', justifyContent: 'center' }}
                    >
                      Choose a Shop →
                    </button>
                  )}
                </>
              )}

              {phase === 'shop' && (
                <>
                  <p className={styles.settingsLabel} style={{ marginBottom: '0.5rem' }}>
                    Where should Ezi deliver it?
                  </p>
                  <PrintCityShops
                    selected={selectedShop}
                    onSelect={setSelectedShop}
                  />
                  {canAddToCart && (
                    <button
                      className={styles.addToCartBtn}
                      onClick={handleAddToCart}
                      style={{ marginTop: 'auto' }}
                    >
                      + Add to Cart
                    </button>
                  )}
                  {cartItems.length > 0 && (
                    <button
                      className={styles.sendBtn}
                      onClick={() => setPhase('cartReview')}
                      style={{ marginTop: '0.5rem', alignSelf: 'stretch', justifyContent: 'center' }}
                    >
                      Review Cart ({cartItems.length}) →
                    </button>
                  )}
                </>
              )}

              {phase === 'ticket' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', height: '100%' }}>
                  <p className={styles.settingsLabel}>Order Summary</p>
                  {activeCartItems.map(item => (
                    <div key={item.id} style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(42,41,40,0.1)', paddingBottom: '0.4rem' }}>
                        <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C' }}>{item.docName}</span>
                        <span style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#2A2928', fontWeight: 600 }}>{item.pageCount} pgs &times; {item.copies}</span>
                      </div>
                    </div>
                  ))}
                  {[
                    { label: 'Shop', val: activeCartItems[0]?.shopName ?? '' },
                    { label: 'Ready in', val: `~${etaMinutes} min` },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(42,41,40,0.1)', paddingBottom: '0.4rem' }}>
                      <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C' }}>{label}</span>
                      <span style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#2A2928', fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
