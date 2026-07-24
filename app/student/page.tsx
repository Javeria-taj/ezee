'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import styles from './student.module.css';
import Notifications, { EziLetter } from '@/app/components/dashboard/Notifications';
import Settings from '@/app/components/dashboard/Settings';
import Payments from '@/app/components/dashboard/Payments';
import EziTip from '@/app/components/dashboard/EziTip';
import Onboarding from '@/app/components/dashboard/Onboarding';
import DeskStickers from '@/app/components/dashboard/DeskStickers';

/* =====================================================================
   TYPE DEFINITIONS
   ===================================================================== */
type Phase = 'desk' | 'slip' | 'shops' | 'send' | 'journey' | 'done';
type ActiveModal = 'none' | 'notifications' | 'settings' | 'wallet' | 'cart';

interface CartItem {
  id: string;
  fileName: string;
  fileSize: number;
  pages: number;
  mode: 'bw' | 'color' | 'custom';
  customColorPages: string;
  size: 'a4' | 'a3';
  binding: 'none' | 'staple' | 'spiral' | 'hardcover';
  copies: number;
  shop: ShopDef;
  totalCost: number;
  urgent?: boolean;
}


interface ShopDef {
  id: string;
  name: string;
  pers: string;
  eta: [number, number];
  accent: string;
}

export interface ShelfFile {
  title: string;
  pages: number;
  shop: string;
  at: number;
  cost?: number;
  saved?: number;
}

/* =====================================================================
   CONSTANTS
   ===================================================================== */
const SHOPS: ShopDef[] = [
  { id: 'central',  name: 'Campus Central Print', pers: '“The dependable one.”',        eta: [8, 12],  accent: '#7E8C6F' },
  { id: 'nightowl', name: 'Night Owl Copies',     pers: '“Open when nothing else is.”', eta: [15, 20], accent: '#7A6D8C' },
  { id: 'morning',  name: 'Morning Star Press',   pers: '“Colour that sings.”',         eta: [10, 14], accent: '#C2674A' },
];

const BIND: Record<string, number> = { none: 0, staple: 5, spiral: 35, hardcover: 120 };
const BINDL: Record<string, string> = { none: 'Loose sheets', staple: 'Stapled', spiral: 'Spiral bound', hardcover: 'Hard cover' };
export const SPINES = ['#8C6C5A', '#7A6D8C', '#7E8C6F', '#B8912E', '#C2674A', '#5C6B73'];

/* =====================================================================
   HELPERS
   ===================================================================== */
function isNightNow() { const h = new Date().getHours(); return h >= 19 || h < 6; }
function shortName(n: string) { return n.length > 26 ? n.slice(0, 23) + '…' : n; }
function mkCode() {
  const a = 'ABCDEFGHJKMNPQRSTUVWXYZ', n = '23456789';
  return a[Math.floor(Math.random() * a.length)] + n[Math.floor(Math.random() * n.length)] + n[Math.floor(Math.random() * n.length)];
}
function guessPages(f: File | { name: string; size: number }) {
  const kbPer = /pdf$/i.test(f.name) ? 46 : /docx?$/i.test(f.name) ? 30 : /pptx?$/i.test(f.name) ? 120 : 50;
  return Math.min(400, Math.max(1, Math.round(f.size / 1024 / kbPer)));
}

/* Memory persistence (same localStorage keys as the rest of the app) */
const MEM = {
  get orders() { return typeof window !== 'undefined' ? +(localStorage.getItem('ezee_print_orders') || '0') : 0; },
  set orders(v: number) { if (typeof window !== 'undefined') localStorage.setItem('ezee_print_orders', String(v)); },
  get pages() { return typeof window !== 'undefined' ? +(localStorage.getItem('ezee_print_pages') || '0') : 0; },
  set pages(v: number) { if (typeof window !== 'undefined') localStorage.setItem('ezee_print_pages', String(v)); },
  get plant() { const p = typeof window !== 'undefined' ? +(localStorage.getItem('ezee_print_plant') || '1') : 1; return Math.min(3, Math.max(1, p)); },
  set plant(v: number) { if (typeof window !== 'undefined') localStorage.setItem('ezee_print_plant', String(Math.min(3, v))); },
  get files(): ShelfFile[] { try { return JSON.parse(localStorage.getItem('ezee_print_files') || '[]'); } catch { return []; } },
  set files(v: ShelfFile[]) { if (typeof window !== 'undefined') localStorage.setItem('ezee_print_files', JSON.stringify(v.slice(-14))); },
  get visited() { return typeof window !== 'undefined' ? localStorage.getItem('ezee_visited') === 'true' : false; },
  set visited(v: boolean) { if (typeof window !== 'undefined') localStorage.setItem('ezee_visited', String(v)); },
};

/* =====================================================================
   EZI CHARACTER SVG
   ===================================================================== */
function eziSVG(mood: string, night: boolean) {
  const eyes: Record<string, string> = {
    calm: `<circle cx="84" cy="104" r="5" fill="#2A2928"/><circle cx="116" cy="104" r="5" fill="#2A2928"/>`,
    curious: `<circle cx="84" cy="102" r="7" fill="#2A2928"/><circle cx="86" cy="100" r="2.4" fill="#FAF7F1"/><circle cx="116" cy="102" r="7" fill="#2A2928"/><circle cx="118" cy="100" r="2.4" fill="#FAF7F1"/>`,
    happy: `<path d="M74 105 Q84 95 90 105" stroke="#2A2928" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M110 105 Q116 95 126 105" stroke="#2A2928" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    sleepy: `<path d="M76 105 Q84 109 92 105" stroke="#2A2928" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M108 105 Q116 109 124 105" stroke="#2A2928" stroke-width="3.5" fill="none" stroke-linecap="round"/>`,
  };
  const mouth = mood === 'happy'
    ? `<path d="M94 123 Q100 133 106 123" stroke="#2A2928" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : mood === 'sleepy'
    ? `<ellipse cx="100" cy="125" rx="4" ry="5" fill="#2A2928" opacity=".7"/>`
    : `<path d="M96 124 Q100 127 104 124" stroke="#2A2928" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  const hat = night
    ? `<g transform="translate(0,-6)"><path d="M60 45 C80 15 130 15 140 45 C158 66 168 104 178 116 C184 122 183 132 173 131 C163 130 158 116 149 98 C139 70 110 40 80 50 Z" fill="#7A6D8C"/><ellipse cx="100" cy="45" rx="40" ry="10" fill="#EAE4DD"/><circle cx="177" cy="125" r="8" fill="#EAE4DD"/></g>`
    : `<g transform="translate(12,-9) rotate(-10 100 40)"><ellipse cx="100" cy="40" rx="34" ry="14" fill="#A9B59D"/><path d="M100 26 L102 19 L98 19 Z" fill="#A9B59D"/></g><g transform="translate(128,44) rotate(45)"><rect width="7" height="34" rx="2" fill="#F4D03F"/><polygon points="0,34 7,34 3.5,43" fill="#E5E7E9"/><polygon points="2,39 5,39 3.5,43" fill="#2A2928"/><rect y="-4" width="7" height="4" rx="1" fill="#E74C3C"/></g>`;
  const zzz = mood === 'sleepy' ? `<text x="150" y="36" font-family="Space Grotesk" font-size="15" fill="#9A9183">z</text><text x="163" y="22" font-family="Space Grotesk" font-size="19" fill="#9A9183">z</text>` : '';
  return `<svg viewBox="0 0 200 250" width="92" height="112">${zzz}
    <g>
      <path d="M100 30 C140 30 170 80 180 150 C185 190 160 230 100 230 C40 230 15 190 20 150 C30 80 60 30 100 30 Z" fill="#2A2928"/>
      <ellipse cx="100" cy="108" rx="58" ry="44" fill="#FAF7F1"/>
      ${eyes[mood] || eyes.calm}
      <ellipse cx="66" cy="120" rx="11" ry="7" fill="#D48A70" opacity=".55"/>
      <ellipse cx="134" cy="120" rx="11" ry="7" fill="#D48A70" opacity=".55"/>
      ${mouth}
      <path d="M60 148 C80 162 120 162 140 148 C145 158 135 172 100 177 C65 172 55 158 60 148 Z" fill="#7A6D8C"/>
      <path d="M125 158 Q135 182 120 196 Q110 182 125 158 Z" fill="#7A6D8C"/>
      ${hat}
    </g></svg>`;
}

/* Plant SVG */
export function plantSVG(stage: number) {
  const leaves = stage >= 3
    ? `<path d="M30 56 C14 46 12 28 22 16 C34 26 36 44 30 56Z" fill="#7E8C6F"/><path d="M34 56 C50 44 54 24 44 10 C30 22 28 42 34 56Z" fill="#8fa07e"/><path d="M32 58 C32 40 32 26 32 14" stroke="#5d6b52" stroke-width="3" stroke-linecap="round"/>`
    : stage === 2
    ? `<path d="M30 58 C20 50 18 38 26 30 C34 38 34 50 30 58Z" fill="#7E8C6F"/><path d="M34 58 C44 48 46 36 38 28 C30 36 30 48 34 58Z" fill="#8fa07e"/>`
    : `<path d="M32 58 C32 48 32 42 32 36" stroke="#7E8C6F" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="32" cy="33" rx="6" ry="8" fill="#8fa07e"/>`;
  return `<svg width="64" height="96" viewBox="0 0 64 96">${leaves}
    <path d="M18 58 h28 l-4 26 a6 6 0 0 1-6 5 h-8 a6 6 0 0 1-6-5 Z" fill="#A3603F"/>
    <rect x="16" y="55" width="32" height="7" rx="3" fill="#8A5034"/></svg>`;
}

/* Cat SVG */
export function catSVG(night: boolean) {
  return night
    ? `<svg width="64" height="40" viewBox="0 0 64 40"><ellipse cx="32" cy="30" rx="26" ry="12" fill="#2A2928"/><circle cx="50" cy="22" r="10" fill="#2A2928"/><path d="M44 14 l3 -7 4 6z M53 13 l4 -6 2 7z" fill="#2A2928"/><path d="M8 30 q-6 -2 -4 -9" stroke="#2A2928" stroke-width="4" fill="none" stroke-linecap="round"/><text x="52" y="10" font-family="Space Grotesk" font-size="9" fill="#9A9183">z</text></svg>`
    : `<svg width="64" height="40" viewBox="0 0 64 40"><path d="M14 38 q-8 -4 -5 -13" stroke="#D48A4A" stroke-width="4" fill="none" stroke-linecap="round"/><rect x="18" y="16" width="28" height="22" rx="10" fill="#D48A4A"/><circle cx="46" cy="16" r="10" fill="#D48A4A"/><path d="M40 8 l3 -7 4 6z M49 7 l4 -6 2 7z" fill="#D48A4A"/><circle cx="43" cy="15" r="1.7" fill="#2A2928"/><circle cx="50" cy="15" r="1.7" fill="#2A2928"/><path d="M45 19 q2 2 4 0" stroke="#2A2928" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`;
}

/* =====================================================================
   MAIN COMPONENT
   ===================================================================== */
export default function StudentDesk() {
  /* --- State --- */
  const [night, setNight] = useState(false);
  const [nightOverride, setNightOverride] = useState<boolean | null>(null);
  const [clock, setClock] = useState('—');
  const [wx, setWx] = useState('☀');

  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [pages, setPages] = useState(24);
  const [mode, setMode] = useState<'bw' | 'color' | 'custom'>('bw');
  const [sided, setSided] = useState<'single' | 'double'>('single');
  const [customColorPages, setCustomColorPages] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkedCartItemIds, setCheckedCartItemIds] = useState<string[]>([]);
  const [printingItems, setPrintingItems] = useState<CartItem[]>([]);
  const [size, setSize] = useState<'a4' | 'a3'>('a4');
  const [binding, setBinding] = useState<'none' | 'staple' | 'spiral' | 'hardcover'>('none');
  const [copies, setCopies] = useState(1);
  const [slipNo, setSlipNo] = useState<number | null>(null);
  const [dynamicShop, setDynamicShop] = useState<Record<string, string> | null>(null);
  const [shop, setShop] = useState<ShopDef | null>(null);

  const [phase, setPhase] = useState<Phase>('desk');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isRush, setIsRush] = useState(false);

  const [eziMood, setEziMood] = useState('calm');
  const [eziText, setEziText] = useState('');
  const [eziVisible, setEziVisible] = useState(false);
  const [showEcoPrompt, setShowEcoPrompt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlipNo(1000 + Math.floor(Math.random() * 9000));
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('ezee_shop_details');
        if (stored) {
          try { setDynamicShop(JSON.parse(stored)); } catch {}
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  const [journeyStep, setJourneyStep] = useState(-1);
  const [barWidth, setBarWidth] = useState(0);
  const [pickupCode, setPickupCode] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);




  const [spineActive, setSpineActive] = useState(1);
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [settingsInitialTab, setSettingsInitialTab] = useState<'settings' | 'history'>('settings');
  const [notificationsList, setNotificationsList] = useState<EziLetter[]>([]);
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const [shelfFiles, setShelfFiles] = useState<ShelfFile[]>([]);
  const [shelfOrders, setShelfOrders] = useState(0);
  const [shelfPages, setShelfPages] = useState(0);
  const [plantStage, setPlantStage] = useState(1);
  const [newBookIdx, setNewBookIdx] = useState(-1);
  const [studentName, setStudentName] = useState('friend');
  const [guessNote, setGuessNote] = useState('our guess — fix it if we\'re off');
  const [cardRisen, setCardRisen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const sendBtnRef = useRef<HTMLButtonElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const eziTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const s2Ref = useRef<HTMLElement>(null);
  const pageTopRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);
  const s4NextRef = useRef<HTMLElement>(null);


  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'pay' | 'confirmed' | 'tracking' | 'ready'>('pay');
  const [confirmedOrder, setConfirmedOrder] = useState<{
    items: { fileName: string; pages: number; copies: number; mode: string; shop: ShopDef; totalCost: number; urgent?: boolean }[];
    pickupCode: string;
    totalCost: number;
    totalSaved: number;
  } | null>(null);

  /* --- Night mode --- */
  const applyNight = useCallback(() => {
    const n = nightOverride === null ? false : nightOverride;
    setNight((prev) => (prev === n ? prev : n));
    return n;
  }, [nightOverride]);

  useEffect(() => {
    const timer = setTimeout(() => applyNight(), 0);
    return () => clearTimeout(timer);
  }, [applyNight]);

  const toggleNight = () => {
    const next = !night;
    setNightOverride(next);
    toast(next ? 'Lamp on. The desk goes golden.' : 'Lamp off. Daylight it is.');
  };

  /* --- Clock tick --- */
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }));
      const h = d.getHours();
      setWx((h >= 19 || h < 6) ? '🌙' : h >= 17 ? '🌇' : h < 8 ? '🌅' : '☀');
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  /* --- Load shelf from localStorage & auth check --- */
  useEffect(() => {
    const hasCookie = typeof document !== 'undefined' && document.cookie.includes('ezee_student_session=true');
    const hasLocalSession = typeof window !== 'undefined' && localStorage.getItem('ezee_student_session') === 'true';
    if (!hasCookie && !hasLocalSession) {
      window.location.href = '/auth';
      return;
    }

    const timer = setTimeout(() => {
      setShelfFiles(prev => (JSON.stringify(prev) === JSON.stringify(MEM.files) ? prev : MEM.files));
      setShelfOrders(prev => (prev === MEM.orders ? prev : MEM.orders));
      setShelfPages(prev => (prev === MEM.pages ? prev : MEM.pages));
      setPlantStage(prev => (prev === MEM.plant ? prev : MEM.plant));
      const storedName = localStorage.getItem('ezee_student_name');
      if (storedName) setStudentName(storedName);
      if (!localStorage.getItem('ezee_onboarded')) {
        setShowOnboarding(true);
        localStorage.setItem('ezee_onboarded', 'true');
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  /* --- Greeting --- */
  const getGreeting = () => {
    const h = new Date().getHours();
    const name = studentName;
    if (h >= 22 || h < 5) return { g: `Still up, <em>${name}</em>?`, sub: "Late pages hit different. I'll stay till it's printed." };
    if (h < 11) return { g: `Morning, <em>${name}</em>.`, sub: "Coffee's warm. Put something on the desk." };
    if (h < 17) return { g: `Afternoon, <em>${name}</em>.`, sub: "Put something on the desk — I'll take care of the rest." };
    return { g: `Evening, <em>${name}</em>.`, sub: "Golden hour on the desk. Take your time." };
  };

  /* --- Ezi says --- */
  const eziSays = useCallback((text: string, mood: string, hold = 4200) => {
    setEziMood(mood);
    setEziText(text);
    setEziVisible(true);
    if (eziTimerRef.current) clearTimeout(eziTimerRef.current);
    eziTimerRef.current = setTimeout(() => {
      setEziVisible(false);
      setEziMood('calm');
    }, hold);
  }, []);

  /* --- Boot Ezi --- */
  useEffect(() => {
    const timer = setTimeout(() => {
      eziSays(isNightNow() ? "Still here? I'll stay." : 'Quiet day. The desk is yours.', 'calm', 5000);
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --- Toast --- */
  const toast = useCallback((msg: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3400);
  }, []);

  /* --- Price --- */
  const parsePageRanges = (rangeStr: string, totalPages: number) => {
    const pagesSet = new Set<number>();
    if (!rangeStr) return pagesSet;
    const parts = rangeStr.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [startStr, endStr] = trimmed.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const min = Math.max(1, Math.min(start, end));
          const max = Math.min(totalPages, Math.max(start, end));
          for (let i = min; i <= max; i++) {
            pagesSet.add(i);
          }
        }
      } else {
        const page = parseInt(trimmed, 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
          pagesSet.add(page);
        }
      }
    }
    return pagesSet;
  };

  const priceParts = () => {
    const mult = size === 'a3' ? 2 : 1;
    let print = 0;
    let per = 1.2;
    const sidedMult = sided === 'double' ? 0.75 : 1; // 25% discount for saving paper
    if (mode === 'custom') {
      const colorPagesCount = parsePageRanges(customColorPages, pages).size;
      const bwPagesCount = Math.max(0, pages - colorPagesCount);
      print = Math.round((colorPagesCount * 5 + bwPagesCount * 1.2) * mult * copies * sidedMult);
    } else {
      per = (mode === 'color' ? 5 : 1.2) * mult;
      print = Math.round(pages * per * copies * sidedMult);
    }
    const bind = BIND[binding] * copies;
    const rush = isRush ? 15 * copies : 0;
    return { print, bind, rush, total: print + bind + rush, per };
  };


  /* --- File upload --- */
  const placeFile = (f: File | { name: string; size: number }) => {
    const p = guessPages(f);
    setFileName(f.name);
    setFileSize(f.size);
    setPages(p);
    setFileUploaded(true);
    setPhase('slip');
    setSpineActive(2);
    setGuessNote('our guess — fix it if we\'re off');
    setSided('single');
    if (!MEM.visited) {
      setTimeout(() => eziSays("Ah, a new face. Welcome to the desk.", "happy", 4000), 1000);
      MEM.visited = true;
    } else {
      setTimeout(() => {
        eziSays(Math.random() > 0.5 ? "Back to the grind?" : "Desk is clear. Ready when you are.", "calm", 3500);
      }, 1000);
    }
    if (p > 40) {
      setShowEcoPrompt(true);
      eziSays(`Ooh, ${p} pages is a thick stack. Want to print double-sided to save money and a tree?`, 'curious', 8000);
    } else {
      setShowEcoPrompt(false);
      eziSays(`"${shortName(f.name)}" — good paper. Fill the slip below.`, 'curious');
    }
    setTimeout(() => s2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 450);
  };

  const resetAll = () => {
    setFileUploaded(false);
    setPhase('desk');
    setShop(null);
    setJourneyStep(-1);
    setBarWidth(0);
    setPickupCode('');
    setSpineActive(1);
    setFileName('');
    setFileSize(0);
    setPages(24);
    setMode('bw');
    setSided('single');
    setSize('a4');
    setBinding('none');
    setCopies(1);
    setIsRush(false);
    setShowEcoPrompt(false);
    setCardRisen(false);
    setShowCheckout(false);
    setOrderConfirmed(false);
    setCheckoutStep('pay');
    eziSays('Fresh start. The desk is clear.', 'calm');
  };

  const addToCart = () => {
    if (!canSend) return;
    const p = priceParts();
    const item: CartItem = {
      id: String(Date.now() + Math.random()),
      fileName,
      fileSize,
      pages,
      mode,
      customColorPages,
      size,
      binding,
      copies,
      shop: shop!,
      totalCost: p.total,
      urgent: isRush,
    };
    setCart(prev => [...prev, item]);
    setCheckedCartItemIds(prev => [...prev, item.id]);
    toast(`"${shortName(fileName)}" added to cart`);
    resetAll();
    // Scroll to top so student can add another file
    setTimeout(() => {
      pageTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };



  const handlePrintNow = () => {
    if (!canSend) return;
    // Build the pending order details so they are ready for the confirmation screen
    const p = priceParts();
    const cost = p.total;
    const saved = Math.round(cost * 0.5);
    
    setConfirmedOrder({
      items: [{ fileName, pages, copies, mode, shop: shop!, totalCost: cost, urgent: isRush }],
      pickupCode: '', // will be set after payment
      totalCost: cost,
      totalSaved: saved,
    });

    // Enter the checkout screen instead of scrolling down
    setShowCheckout(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCheckoutCart = (itemsToPrint: CartItem[]) => {
    if (itemsToPrint.length === 0) return;
    setActiveModal('none');
    setPrintingItems(itemsToPrint);
    
    // Remove printed items from cart
    setCart(prev => prev.filter(item => !itemsToPrint.some(p => p.id === item.id)));
    setCheckedCartItemIds(prev => prev.filter(id => !itemsToPrint.some(p => p.id === id)));
    
    const totalP = itemsToPrint.reduce((sum, item) => sum + item.pages * item.copies, 0);
    const totalCost = itemsToPrint.reduce((sum, item) => sum + item.totalCost, 0);
    const mainShop = itemsToPrint[0].shop;
    
    // Build confirmed order for cart items
    setConfirmedOrder({
      items: itemsToPrint,
      pickupCode: '',
      totalCost: totalCost,
      totalSaved: Math.round(totalCost * 0.5),
    });

    setFileName(itemsToPrint.length === 1 ? itemsToPrint[0].fileName : `${itemsToPrint.length} files`);
    setPages(totalP);
    setShop(mainShop);
    setCheckoutStep('pay');
    setShowCheckout(true);
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };



  const handlePayClick = () => {
    if (!canSend || phase === 'journey' || phase === 'done') return;
    setCardRisen(true);
    setTimeout(() => {
      sendSlip();
    }, 600);
  };

  /* --- Send + Journey --- */
  const sendSlip = () => {
    setPhase('journey');
    setSpineActive(5);

    // Paper plane animation
    if (sendBtnRef.current && planeRef.current) {
      const b = sendBtnRef.current.getBoundingClientRect();
      planeRef.current.style.setProperty('--fx', b.left + 'px');
      planeRef.current.style.setProperty('--fy', b.top + 'px');
      planeRef.current.classList.remove(styles.fly);
      void planeRef.current.getBoundingClientRect();
      planeRef.current.classList.add(styles.fly);
    }

    eziSays('There it goes. I love this part.', 'happy');

    // Clear old timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setJourneyStep(0);

    timersRef.current.push(setTimeout(() => {
      setOrderConfirmed(true);
      setCheckoutStep('confirmed');
    }, 1500));

    timersRef.current.push(setTimeout(() => {
      setCheckoutStep('tracking');
      const currentShopName = shop?.name || confirmedOrder?.items[0]?.shop?.name || printingItems[0]?.shop?.name || 'Shop';
      toast(`${currentShopName} accepted #${slipNo}`);
      // Progress bar
      let p = 0;
      const iv = setInterval(() => {
        p = Math.min(100, p + 9 + Math.random() * 8);
        setBarWidth(p);
        if (p >= 100) {
          clearInterval(iv);
          finishPrint();
        }
      }, 900);
    }, 4000));
  };

  const finishPrint = () => {
    setJourneyStep(4); // all done
    const code = mkCode();
    setPickupCode(code);
    
    if (confirmedOrder) {
      setConfirmedOrder(prev => prev ? { ...prev, pickupCode: code } : null);
    }
    
    // Switch directly to 'ready' since we were in 'tracking' while printing
    setCheckoutStep('ready');

    setSpineActive(6);
    setHasUnread(true);
    eziSays(`Code ${code}. Go get it while it's warm.`, 'happy', 6000);
    const currentShopName = shop?.name || confirmedOrder?.items[0]?.shop?.name || printingItems[0]?.shop?.name || 'Campus Print';
    toast(`Ready at ${currentShopName} — code ${code}`);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const itemsSummary = confirmedOrder
      ? confirmedOrder.items.map(it => `${shortName(it.fileName)} (${it.pages} pgs × ${it.copies})`).join(', ')
      : `${shortName(fileName || 'Document')} (${pages} pgs × ${copies})`;

    const totalAmt = confirmedOrder ? confirmedOrder.totalCost : priceParts().total;

    const printNotification: EziLetter = {
      id: `print-ready-${Date.now()}`,
      isRead: false,
      stampEmoji: '🖨️',
      from: currentShopName,
      message: `Your print job for ${itemsSummary} is ready for pickup at ${currentShopName}! Total Paid: ₹${totalAmt}. Please show pickup code ${code} at the counter.`,
      date: dateStr,
      time: timeStr,
      pickupCode: code,
      shopName: currentShopName,
      itemDetails: itemsSummary,
    };

    setNotificationsList(prev => [printNotification, ...prev]);
  };

  const collect = () => {
    const now = Date.now();
    const newFiles = [...shelfFiles];
    let addedPages = 0;
    let addedOrders = 0;

    if (printingItems.length > 0) {
      printingItems.forEach(item => {
        const title = item.fileName.replace(/\.[^.]+$/, '');
        const cost = item.totalCost;
        const saved = Math.round(cost * 0.5);
        newFiles.push({
          title: shortName(title),
          pages: item.pages * item.copies,
          shop: item.shop.name,
          at: now,
          cost,
          saved
        });
        addedPages += item.pages * item.copies;
        addedOrders += 1;
      });
      setPrintingItems([]);
    } else {
      const title = (fileName || 'Untitled').replace(/\.[^.]+$/, '');
      const p = priceParts();
      const cost = p.total;
      const saved = Math.round(p.total * 0.5);
      const currentShopName = shop?.name || confirmedOrder?.items[0]?.shop?.name || printingItems[0]?.shop?.name || 'Campus Central Print';
      newFiles.push({
        title: shortName(title),
        pages: pages * copies,
        shop: currentShopName,
        at: now,
        cost,
        saved
      });
      addedPages = pages * copies;
      addedOrders = 1;
    }

    const files = newFiles;
    MEM.files = files;
    MEM.orders = MEM.orders + addedOrders;
    MEM.pages = MEM.pages + addedPages;
    if (MEM.orders >= 6) MEM.plant = 3;
    else if (MEM.orders >= 2) MEM.plant = 2;

    setShelfFiles(files);
    setShelfOrders(MEM.orders);
    setShelfPages(MEM.pages);
    setPlantStage(MEM.plant);
    setNewBookIdx(files.length - 1);

    eziSays(addedOrders > 1 ? 'All files shelved successfully! 🌱' : 'Shelved. It lives here now. 🌱', 'happy', 5000);
    toast(addedOrders > 1 ? 'Files added to your shelf' : 'Added to your shelf');
    setSettingsInitialTab('history');
    setActiveModal('settings');
    setCart([]);

    setTimeout(() => {
      resetAll();
    }, 2600);
  };


  /* --- Derived --- */
  const p = priceParts();
  const { g, sub } = getGreeting();
  const canSend = Boolean((fileUploaded || confirmedOrder) && (shop || confirmedOrder?.items[0]?.shop));

  const eziMoodResolved = night && eziMood === 'calm' ? 'sleepy' : eziMood;

  const footerQuotes = ["The desk keeps the light on.", "Quiet pages, warm ink.", "Everything ages. That's the point.", "Rain sounds nice on paper."];
  const footQ = footerQuotes[new Date().getDate() % footerQuotes.length];



  /* --- Render --- */
  return (
    <div className={`${styles.deskPage} ${night ? styles.night : ''}`}>

      {/* ========== SPINE ========== */}
      {!showCheckout && (
        <div className={styles.spine}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <span key={n} className={`${styles.spineDot} ${spineActive >= n ? styles.lit : ''}`} style={{ top: `${15 + (n - 1) * 15}%` }} />
          ))}
        </div>
      )}

      {/* ========== HEADER ========== */}
      <header className={styles.header}>
        <div className={styles.wordmark}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Ezee Logo" style={{ height: 34, width: 'auto', objectFit: 'contain' }} />
        </div>
        <div className={styles.grow} />

        {/* Weather + clock chip */}
        <div className={styles.chip}>
          <span>{wx}</span>
          <span className={styles.mono}>{clock}</span>
        </div>

        {/* Header Action Buttons */}
        <div className={styles.headerActions}>
          {/* Cart (Desktop only in header) */}
          <button 
            className={`${styles.headerIcon} ${styles.desktopOnlyHeaderIcon}`} 
            style={{ position: 'relative' }}
            title="Cart" 
            onClick={() => {
              if (cart.length > 0) {
                setActiveModal('cart');
              } else {
                toast("Your cart is empty");
              }
            }}
          >
            {cart.length > 0 && (
              <span className={styles.cartBadgeCount}>{cart.length}</span>
            )}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>

          {/* Lamp (Desktop only in header) */}
          <button
            className={`${styles.headerIcon} ${styles.desktopOnlyHeaderIcon}`}
            title="Lamp"
            onClick={toggleNight}
          >
            <span className={styles.glowdot} />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 3h8l3 8H5l3-8zM12 11v7M8 21h8" /></svg>
          </button>

          {/* Notifications (Always in top header) */}
          <button className={styles.headerIcon} style={{ position: 'relative' }} title="Notifications" onClick={() => { setActiveModal('notifications'); setHasUnread(false); }}>
            {hasUnread && <span className={styles.unreadDot} />}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          {/* Avatar / Profile (Always in top header) */}
          <div className={styles.avatarCircle} title="Profile" onClick={() => { setSettingsInitialTab('settings'); setActiveModal('settings'); }}>
            {studentName === 'friend' ? '✦' : studentName.charAt(0).toUpperCase()}
          </div>
        </div>
      </header>

      {/* ========== MAIN ========== */}
      <main className={styles.main}>
        {/* page top ref */}
        <div ref={pageTopRef} />

        {/* ──── Only render desk/shops if NOT in checkout ──── */}
        {!showCheckout && (
          <>
            {/* ──── 1 · THE DESK ──── */}
            <section className={styles.hero} id="s1">
              <div className={styles.greet} dangerouslySetInnerHTML={{ __html: g }} />
              <div className={styles.greetSub}>
                <span className={styles.quill} />
                <span>{sub}</span>
              </div>

              {/* Ezi Tip of the day */}
              <EziTip style={{ marginTop: 14, maxWidth: 360 }} />

          <div className={styles.deskScene}>
            {/* Ezi perch */}
            <div className={styles.eziPerch}>
              <div className={`${styles.eziSay} ${eziVisible ? styles.on : ''}`}>
                {eziText}
                {showEcoPrompt && eziVisible && (
                  <button 
                    onClick={() => {
                      setSided('double');
                      setShowEcoPrompt(false);
                      eziSays('Done! 🌿 A tree says thank you.', 'happy', 4000);
                    }}
                    style={{ display: 'block', marginTop: '8px', background: '#A9B59D', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '0.85rem' }}
                  >
                    Yes, make it double-sided
                  </button>
                )}
              </div>
              <div className={styles.breathe} dangerouslySetInnerHTML={{ __html: eziSVG(eziMoodResolved, night) }} />
            </div>

            <div id="student-desk-area" className={styles.desk} style={{ position: 'relative' }}>
              <DeskStickers />
              {/* Dropzone */}
              {!fileUploaded && (
                <div
                  className={`${styles.dropzone} ${dragActive ? styles.drag : ''}`}
                  tabIndex={0}
                  role="button"
                  aria-label="Place a document to print"
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                  onDragOver={e => { e.preventDefault(); setDragActive(true); eziSays('Ooh — bring it here.', 'curious', 1500); }}
                  onDragEnter={e => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={e => { e.preventDefault(); setDragActive(false); const f = e.dataTransfer.files[0]; if (f) placeFile(f); }}
                >
                  <svg className={styles.dzPaper} viewBox="0 0 64 80">
                    <path d="M6 4 h38 l14 14 v58 h-52 z" fill="#fff" stroke="#D9CFBB" strokeWidth="1.5" />
                    <path d="M44 4 v14 h14" fill="#EFE8D8" stroke="#D9CFBB" strokeWidth="1.5" />
                    <line x1="14" y1="30" x2="50" y2="30" stroke="#C9BFA9" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="14" y1="40" x2="50" y2="40" stroke="#DDD4C0" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="14" y1="50" x2="42" y2="50" stroke="#DDD4C0" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <div>
                    <div className={styles.dzHint}>Tap or drop your notes on the desk</div>
                    <div className={styles.dzSub}>
                      Select a PDF, Word, PPT or Image file to print.
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className={styles.uploadBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Choose File / Document</span>
                  </button>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.txt"
                onChange={e => { if (e.target.files?.[0]) placeFile(e.target.files[0]); }}
              />

              {/* Placed sheet */}
              {fileUploaded && (
                <div className={`${styles.placed} ${styles.on}`}>
                  <div className={styles.sheet}>
                    <div className={`${styles.sheetLine} ${styles.title}`} />
                    <div className={styles.sheetLine} />
                    <div className={styles.sheetLine} />
                    <div className={styles.sheetLine} style={{ width: '82%' }} />
                    <div className={styles.sheetLine} style={{ width: '64%' }} />
                    <div className={styles.sheetCorner} />
                  </div>
                  <div className={styles.placedInfo}>
                    <div className={styles.fname}>{fileName}</div>
                    <div className={styles.fmeta}>
                      {(fileSize / 1024 / 1024).toFixed(fileSize > 1048576 ? 1 : 2)} MB · placed {new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })}
                    </div>
                    <div className={styles.pageGuess}>
                      <span className={styles.label}>Pages</span>
                      <div className={styles.stepper}>
                        <button onClick={() => { setPages(Math.max(1, pages - 1)); setGuessNote('noted.'); }} aria-label="Fewer pages">−</button>
                        <span className={`${styles.stepperVal} ${styles.mono}`}>{pages}</span>
                        <button onClick={() => { setPages(Math.min(400, pages + 1)); setGuessNote('noted.'); }} aria-label="More pages">+</button>
                      </div>
                      <span style={{ fontSize: '11.5px', color: 'var(--ink-3)' }}>{guessNote}</span>
                    </div>
                    <div className={styles.swap}>
                      <button type="button" className={styles.swapBtn} onClick={resetAll}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>Choose a different file</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ──── 2 · THE SLIP ──── */}
        <section
          ref={s2Ref}
          id="s2"
          className={`${styles.section} ${fileUploaded ? styles.unlocked : styles.locked}`}
        >
          <div className={styles.stepEyebrow}><span className={styles.stepNo}>2</span><span className={styles.label}>Fill the slip</span></div>
          <h2 className={styles.sectionTitle}>How should it feel in your hands?</h2>
          <p className={styles.lede}>Every choice writes itself onto the slip. The tally at the bottom is exactly what you&apos;ll pay — nothing hidden.</p>

          <div className={styles.slip}>
            <div className={styles.slipHead}>
              <span className={styles.slipTitle}>PRINT SLIP</span>
              <span className={styles.slipNo}>Nº {slipNo || '----'}</span>
            </div>

            {/* Colour */}
            <div className={styles.frow}>
              <div className={styles.frowQ}>Colour<small>black &amp; white is kinder to your wallet</small></div>
              <div className={styles.opts}>
                <button className={`${styles.opt} ${mode === 'bw' ? styles.on : ''}`} onClick={() => setMode('bw')}>B &amp; W <span className={styles.optPrice}>₹1.2/pg</span></button>
                <button className={`${styles.opt} ${mode === 'color' ? styles.on : ''}`} onClick={() => { setMode('color'); eziSays('Colour it is — Morning Star does it best.', 'calm', 3000); }}>Full colour <span className={styles.optPrice}>₹5/pg</span></button>
                <button className={`${styles.opt} ${mode === 'custom' ? styles.on : ''}`} onClick={() => { setMode('custom'); eziSays('Mixed mode. Tell me which pages are colour.', 'curious', 3000); }}>Mixed mode <span className={styles.optPrice}>Mixed</span></button>
              </div>
            </div>

            {/* Sides */}
            <div className={styles.frow}>
              <div className={styles.frowQ}>Sides<small>Save paper, save trees 🌿</small></div>
              <div className={styles.opts}>
                <button className={`${styles.opt} ${sided === 'single' ? styles.on : ''}`} onClick={() => setSided('single')}>Single-sided</button>
                <button className={`${styles.opt} ${sided === 'double' ? styles.on : ''}`} onClick={() => { setSided('double'); eziSays('Double sided! Good choice.', 'happy', 3000); }}>Double-sided <span className={styles.optPrice}>-25%</span></button>
              </div>
            </div>

            {/* Custom/Mixed color page ranges */}
            {mode === 'custom' && (
              <div className={styles.frow}>
                <div className={styles.frowQ}>Colour Pages<small>e.g. 1, 3-5, 8 (out of {pages})</small></div>
                <input
                  type="text"
                  placeholder="e.g. 1, 3-5, 8"
                  value={customColorPages}
                  onChange={(e) => setCustomColorPages(e.target.value)}
                  className={styles.customPagesInput}
                />
              </div>
            )}


            {/* Paper */}
            <div className={styles.frow}>
              <div className={styles.frowQ}>Paper</div>
              <div className={styles.opts}>
                <button className={`${styles.opt} ${size === 'a4' ? styles.on : ''}`} onClick={() => setSize('a4')}>A4</button>
                <button className={`${styles.opt} ${size === 'a3' ? styles.on : ''}`} onClick={() => setSize('a3')}>A3 <span className={styles.optPrice}>×2</span></button>
              </div>
            </div>

            {/* Binding */}
            <div className={styles.frow}>
              <div className={styles.frowQ}>Binding<small>how the pages hold together</small></div>
              <div className={styles.opts}>
                {(['none', 'staple', 'spiral', 'hardcover'] as const).map(b => (
                  <button
                    key={b}
                    className={`${styles.opt} ${binding === b ? styles.on : ''}`}
                    onClick={() => { setBinding(b); if (b === 'hardcover') eziSays('Hard cover? This one matters. 🌱', 'curious'); }}
                  >
                    {BINDL[b]} {b !== 'none' && <span className={styles.optPrice}>+₹{BIND[b]}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Rush Priority */}
            <div className={styles.frow}>
              <div className={styles.frowQ}>Priority Rush<small>Fast-track queue for urgent exams 🔥</small></div>
              <div className={styles.opts}>
                <button className={`${styles.opt} ${!isRush ? styles.on : ''}`} onClick={() => setIsRush(false)}>Standard</button>
                <button 
                  className={`${styles.opt} ${styles.rushOpt} ${isRush ? styles.on : ''}`} 
                  onClick={() => {
                    setIsRush(true);
                    eziSays('Rush order activated! 🔥 Ezi moves your file to the front of the queue.', 'curious', 4000);
                  }}
                >
                  🔥 Rush Order <span className={styles.optPrice}>+₹15</span>
                </button>
              </div>
            </div>

            {/* Copies */}
            <div className={styles.frow}>
              <div className={styles.frowQ}>Copies</div>
              <div className={styles.stepper}>
                <button onClick={() => setCopies(Math.max(1, copies - 1))} aria-label="Fewer copies">−</button>
                <span className={`${styles.stepperVal} ${styles.mono}`}>{copies}</span>
                <button onClick={() => setCopies(Math.min(50, copies + 1))} aria-label="More copies">+</button>
              </div>
            </div>

            {/* Tally */}
            <div className={styles.tally}>
              <div className={styles.tline}>
                <span>Printing — {pages}pp × {copies} {mode === 'color' ? 'colour' : mode === 'custom' ? 'mixed' : 'b/w'} {size.toUpperCase()}</span>
                <span className={styles.mono}>₹{p.print.toLocaleString('en-IN')}</span>
              </div>
              {p.bind > 0 && (
                <div className={styles.tline}>
                  <span>Binding — {BINDL[binding].toLowerCase()} × {copies}</span>
                  <span className={styles.mono}>₹{p.bind}</span>
                </div>
              )}
              {p.rush > 0 && (
                <div className={styles.tline}>
                  <span>🔥 Rush priority queue × {copies}</span>
                  <span className={styles.mono}>₹{p.rush}</span>
                </div>
              )}
              <div className={styles.ttotal}>
                <span className={styles.ttotalWord}>You pay</span>
                <span className={`${styles.ttotalAmt} ${styles.mono}`}>₹{p.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ──── 3 · THE SHOPS ──── */}
        <section id="s3" className={`${styles.section} ${fileUploaded ? styles.unlocked : styles.locked}`}>
          <div className={styles.stepEyebrow}><span className={styles.stepNo}>3</span><span className={styles.label}>Choose a shop</span></div>
          <h2 className={styles.sectionTitle}>Whose window will glow for you?</h2>
          <p className={styles.lede}>Three shops near campus, each with its own temperament. The time shown is until your pages are warm and ready.</p>

          <div className={styles.shops}>
            {SHOPS.map(s => {
              const locationsMap: Record<string, string> = {
                central: 'Block A · Main gate',
                nightowl: 'Hostel circle',
                morning: dynamicShop?.location || 'Admin block',
              };
              const displayName = s.id === 'morning' && dynamicShop?.name ? dynamicShop.name : s.name;
              const displayLoc = locationsMap[s.id] || 'Campus Area';
              return (
                <button
                  key={s.id}
                  className={`${styles.shop} ${shop?.id === s.id ? styles.on : ''}`}
                  style={{ '--shop-accent': s.accent } as React.CSSProperties}
                  onClick={() => {
                    const selectedShopDef = { ...s, name: displayName };
                    setShop(selectedShopDef);
                    setSpineActive(4);
                    eziSays(`${displayName}. Their window's already glowing.`, 'happy', 3000);
                    setTimeout(() => {
                      s4NextRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 350);
                  }}
                >
                  <span className={styles.picktick}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  <div className={styles.storefront}>
                    <div className={styles.awning}></div>
                    <div className={styles.shopwin}></div>
                  </div>
                  <h4>{displayName}</h4>
                  <div style={{ fontSize: '0.8rem', color: '#D48A70', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', marginTop: '2px', marginBottom: '4px' }}>
                    <span>📍 {displayLoc}</span>
                  </div>
                  <div className={styles.pers}>{s.pers}</div>
                  <div className={styles.eta}>~{s.eta[0]}–{s.eta[1]} min</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ──── 4 · NEXT STEP (ACTIONS) ──── */}
        {shop && fileUploaded && phase !== 'journey' && phase !== 'done' && (
          <section id="s4_next" ref={s4NextRef} className={styles.section}>
            <div className={styles.stepEyebrow}><span className={styles.stepNo}>4</span><span className={styles.label}>Next Step</span></div>
            <h2 className={styles.sectionTitle}>Ready to print, or save for later?</h2>
            
            <div className={styles.nextActionsCard}>
              <button className={styles.addToCartAction} onClick={addToCart}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 2 }}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                Add to Cart
              </button>
              <button className={styles.printNowAction} onClick={handlePrintNow}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 2 }}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Print Now
              </button>
            </div>
          </section>
        )}
        </>
        )}

        {/* ──── 5 · SEND & JOURNEY (CHECKOUT) ──── */}
        {showCheckout && (
          <section id="s4" className={`${styles.section} ${styles.unlocked}`} style={{ minHeight: '80vh', marginTop: 40 }}>
            {phase !== 'journey' && phase !== 'done' && (
              <button className={styles.backToDeskBtn} onClick={() => setShowCheckout(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Back to Desk
              </button>
            )}
            <div className={styles.stepEyebrow}><span className={styles.stepNo}>5</span><span className={styles.label}>Checkout</span></div>
            <h2 className={styles.sectionTitle}>Fold, and let it fly.</h2>

            {/* ---- STAGE 1: PAY ---- */}
            {checkoutStep === 'pay' && (
              <div className={styles.drawerSection}>
                <h3 className={styles.drawerTitle}>The Desk Drawer</h3>
                
                <div className={styles.drawerFlex}>
                  {/* Receipt Area */}
                  <div className={styles.receiptContainer}>
                    {/* Stamp */}
                    <div className={styles.stampWrapper}>
                      <svg className={styles.postStamp} viewBox="0 0 40 40">
                        <rect x="2" y="2" width="36" height="36" fill="#FDFBF7" stroke="#7E8C6F" strokeWidth="1.5" strokeDasharray="3 2" />
                        <path d="M 8 30 L 16 14 L 20 22 L 24 14 L 32 30" fill="none" stroke="#7E8C6F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="20" y="36" fontSize="6.5" fontFamily="Space Grotesk" fontWeight="bold" fill="#7E8C6F" textAnchor="middle" letterSpacing="1">POST</text>
                      </svg>
                    </div>

                    {/* Jagged Receipt Paper */}
                    <div className={styles.receiptPaper}>
                      <div className={styles.receiptHeader}>RECEIPT</div>
                      
                      <div className={styles.receiptRows}>
                        {confirmedOrder ? (
                          confirmedOrder.items.map((it, idx) => (
                            <div key={idx} className={styles.receiptRow}>
                              <span>{shortName(it.fileName)} ({it.pages}p × {it.copies})</span>
                              <span className={styles.mono}>₹{it.totalCost.toLocaleString('en-IN')}</span>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className={styles.receiptRow}>
                              <span>{pages} Pages</span>
                              <span className={styles.mono}>₹{p.print.toLocaleString('en-IN')}</span>
                            </div>
                            <div className={styles.receiptRow}>
                              <span>{copies} Copies</span>
                              <span className={styles.mono}>× {copies}</span>
                            </div>
                            {p.bind > 0 && (
                              <div className={styles.receiptRow}>
                                <span>Binding</span>
                                <span className={styles.mono}>₹{p.bind.toLocaleString('en-IN')}</span>
                              </div>
                            )}
                            {p.rush > 0 && (
                              <div className={styles.receiptRow}>
                                <span>🔥 Rush Order</span>
                                <span className={styles.mono}>₹{p.rush.toLocaleString('en-IN')}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      
                      <div className={styles.receiptDivider} />
                      
                      <div className={styles.receiptTotalRow}>
                        <span className={styles.receiptTotalLabel}>Total</span>
                        <span className={`${styles.receiptTotalAmt} ${styles.mono}`}>
                          ₹{(confirmedOrder ? confirmedOrder.totalCost : p.total).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Wallet Area */}
                  <div className={styles.walletArea}>
                    <div className={styles.walletWrapper}>
                      {/* Coins in background */}
                      <div className={`${styles.coin} ${styles.coin5_1}`}>5</div>
                      <div className={`${styles.coin} ${styles.coin5_2}`}>5</div>
                      <div className={`${styles.coin} ${styles.coin1}`}>1</div>

                      {/* Wallet Back */}
                      <div className={styles.walletBack} />

                      {/* Interactive Card Button */}
                      <button
                        ref={sendBtnRef}
                        className={`${styles.creditCard} ${cardRisen ? styles.risen : ''}`}
                        disabled={!canSend || phase === 'journey' || phase === 'done'}
                        onClick={handlePayClick}
                        aria-label="Pay now"
                      >
                        <div className={styles.cardHeader}>
                          <span className={styles.cardBrand}>STUDENT UPI</span>
                          <svg className={styles.wirelessIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 8a9.99 9.99 0 0 1 14 0" />
                            <path d="M7.83 10.83a6 6 0 0 1 8.34 0" />
                            <path d="M10.66 13.66a2 2 0 0 1 2.68 0" />
                          </svg>
                        </div>
                        
                        <div className={styles.cardChip}>
                          <div className={styles.chipInner} />
                        </div>
                        
                        <div className={styles.cardFooter}>
                          <span className={styles.cardNumber}>•••• 4092</span>
                          <span className={styles.payNowBadge}>PAY NOW</span>
                        </div>
                      </button>

                      {/* Wallet Front */}
                      <div className={styles.walletFront}>
                        <button
                          className={styles.walletPayBadge}
                          disabled={!canSend || phase === 'journey' || phase === 'done'}
                          onClick={handlePayClick}
                        >
                          PAY NOW
                        </button>
                      </div>
                    </div>
                    
                    <div className={styles.tapInstruction}>
                      Tap card to pay
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---- STAGE 2: ORDER CONFIRMED (ONLY) ---- */}
            {checkoutStep === 'confirmed' && (
              <div className={`${styles.orderConfirmation} ${styles.on}`} style={{ marginTop: '10vh', background: 'transparent', boxShadow: 'none', border: 'none' }}>
                <div className={styles.ocHeader} style={{ marginBottom: 0 }}>
                  <div className={styles.ocCheckIcon} style={{ transform: 'scale(1.5)', margin: '0 auto 40px' }}>
                    <svg viewBox="0 0 52 52">
                      <circle className={styles.ocCheckCircle} cx="26" cy="26" r="25" fill="none" strokeWidth="2"/>
                      <path className={styles.ocCheckPath} fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16"/>
                    </svg>
                  </div>
                  <div className={styles.ocTitle} style={{ fontSize: 32 }}>Order Confirmed!</div>
                </div>
              </div>
            )}

            {/* ---- STAGE 3: LIVE TRACKING ---- */}
            {checkoutStep === 'tracking' && confirmedOrder && (
              <div className={`${styles.orderConfirmation} ${styles.on}`} ref={confirmRef} style={{ maxWidth: 540 }}>
                {/* Animated Tracking Header */}
                <div className={styles.trackingHeader}>
                  <div className={`${styles.trackStage} ${styles.active}`}>
                    <div className={styles.trackStageIcon}>
                      <svg className={styles.animRocket} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5M12 15l-3-3a22 22 0 0 1 3.86-8.76l.64-.81a1.99 1.99 0 0 1 2.83 0l2.83 2.83a2 2 0 0 1 0 2.83l-.81.64A22 22 0 0 1 15 12z"/>
                        <path d="M15 9l-6 6"/>
                      </svg>
                    </div>
                    <div className={styles.trackStageLabel}>Sent to Shop</div>
                  </div>
                  
                  <div className={styles.trackLine}></div>
                  
                  <div className={`${styles.trackStage} ${styles.active}`}>
                    <div className={styles.trackStageIcon}>
                      <svg className={styles.animPrinter} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                        <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/>
                        <path d="M8 22h8a1 1 0 0 0 1-1v-4H7v4a1 1 0 0 0 1 1z"/>
                      </svg>
                    </div>
                    <div className={styles.trackStageLabel}>On the Press</div>
                  </div>
                  
                  <div className={styles.trackLine}></div>
                  
                  <div className={`${styles.trackStage}`}>
                    <div className={styles.trackStageIcon}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <div className={styles.trackStageLabel}>Ready</div>
                  </div>
                </div>

                <div className={styles.ocTitle} style={{ textAlign: 'center', marginTop: 16 }}>
                  Printing your order...
                </div>

                <div className={styles.ocSupport} style={{ marginTop: 64 }}>
                  Having trouble? <a href="#">Contact Support</a> or check our <a href="#">Help Center</a>.
                </div>
              </div>
            )}

            {/* ---- STAGE 4: READY & FEEDBACK ---- */}
            {checkoutStep === 'ready' && confirmedOrder && (
              <div className={`${styles.orderConfirmation} ${styles.on}`} ref={confirmRef} style={{ maxWidth: 540 }}>
                {/* Animated Tracking Header (All active) */}
                <div className={styles.trackingHeader}>
                  <div className={`${styles.trackStage} ${styles.active}`}>
                    <div className={styles.trackStageIcon}>
                      <svg className={styles.animRocket} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5M12 15l-3-3a22 22 0 0 1 3.86-8.76l.64-.81a1.99 1.99 0 0 1 2.83 0l2.83 2.83a2 2 0 0 1 0 2.83l-.81.64A22 22 0 0 1 15 12z"/>
                        <path d="M15 9l-6 6"/>
                      </svg>
                    </div>
                    <div className={styles.trackStageLabel}>Sent to Shop</div>
                  </div>
                  
                  <div className={styles.trackLine}></div>
                  
                  <div className={`${styles.trackStage} ${styles.active}`}>
                    <div className={styles.trackStageIcon}>
                      <svg className={styles.animPrinter} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                        <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/>
                        <path d="M8 22h8a1 1 0 0 0 1-1v-4H7v4a1 1 0 0 0 1 1z"/>
                      </svg>
                    </div>
                    <div className={styles.trackStageLabel}>Printed</div>
                  </div>
                  
                  <div className={styles.trackLine}></div>
                  
                  <div className={`${styles.trackStage} ${styles.readyStage}`}>
                    <div className={`${styles.trackStageIcon} ${styles.readyIcon}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <div className={styles.trackStageLabel}>Ready</div>
                  </div>
                </div>

                {/* Pickup Code details */}
                <div className={styles.ocCode} style={{ textAlign: 'center', margin: '16px 0 32px' }}>
                  Pickup Code: <span>{confirmedOrder.pickupCode}</span>
                  <div className={styles.ocShopInfo} style={{ display: 'block', marginTop: 12 }}>
                    Ready at <b>{confirmedOrder.items[0]?.shop?.name || 'Shop'}</b>{confirmedOrder.items[0]?.shop?.eta ? ` in ${confirmedOrder.items[0].shop.eta[0]}-${confirmedOrder.items[0].shop.eta[1]} mins` : ''}
                  </div>
                </div>

                <div className={styles.ocBody}>
                  <div className={styles.ocSectionTitle}>Order Details</div>
                  <div className={styles.ocList}>
                    {confirmedOrder.items.map((it, i) => (
                      <div key={i} className={styles.ocListItem}>
                        <div className={styles.ocItemLeft}>
                          <div className={styles.ocItemName}>{shortName(it.fileName)}</div>
                          <div className={styles.ocItemMeta}>{it.pages} pages • {it.copies} copies • {it.mode === 'bw' ? 'B&W' : 'Color'}</div>
                        </div>
                        <div className={styles.ocItemRight}>₹{it.totalCost.toLocaleString('en-IN')}</div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.ocSummaryCard}>
                    <div className={styles.ocSummaryRow}>
                      <span>Total Paid</span>
                      <span className={styles.ocTotalAmt}>₹{confirmedOrder.totalCost.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.ocSavedBadge}>
                      🎉 You saved ₹{confirmedOrder.totalSaved.toLocaleString('en-IN')} vs retail!
                    </div>
                  </div>
                  
                  <div className={styles.feedbackSection}>
                    <button className={styles.feedbackBtn}>📝 Share your experience</button>
                    <button className={styles.feedbackBtn}>💡 Give feedback</button>
                  </div>
                  
                  <div className={styles.ocSupport} style={{ marginTop: 24 }}>
                    Having trouble? <a href="#">Contact Support</a> or check our <a href="#">Help Center</a>.
                  </div>
                </div>
                
                <button className={styles.collectBtn} onClick={collect} style={{ marginTop: 32, width: '100%', maxWidth: 320 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  Collected — shelve it
                </button>
              </div>
            )}
        </section>
        )}


        <footer className={styles.footer}>
          <span>EZEE — print. study. repeat.</span>
          <span className={styles.footerQuote}>{footQ}</span>
        </footer>
        {/* Onboarding Overlay */}
        <AnimatePresence>
          {showOnboarding && (
            <Onboarding onComplete={() => setShowOnboarding(false)} />
          )}
        </AnimatePresence>
      </main>

      {/* ========== PAPER PLANE ========== */}
      <svg ref={planeRef} className={styles.plane} viewBox="0 0 24 24" fill="none" stroke="#2A2928" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" fill="#FAF7F1" />
      </svg>

      {/* ========== MOBILE BOTTOM NAVIGATION BAR ========== */}
      <nav className={styles.mobileBottomNav}>
        {/* Desk */}
        <button 
          className={styles.mobileNavBtn} 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Desk</span>
        </button>

        {/* History */}
        <button 
          className={styles.mobileNavBtn} 
          onClick={() => {
            setSettingsInitialTab('history');
            setActiveModal('settings');
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>History</span>
        </button>

        {/* Cart */}
        <button 
          className={styles.mobileNavBtn} 
          style={{ position: 'relative' }} 
          onClick={() => {
            if (cart.length > 0) {
              setActiveModal('cart');
            } else {
              toast("Your cart is empty");
            }
          }}
        >
          {cart.length > 0 && (
            <span className={styles.mobileNavCartBadge}>{cart.length}</span>
          )}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>Cart</span>
        </button>

        {/* Lamp */}
        <button 
          className={styles.mobileNavBtn} 
          onClick={toggleNight}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M8 3h8l3 8H5l3-8zM12 11v7M8 21h8" />
          </svg>
          <span>Lamp</span>
        </button>
      </nav>

      {/* ========== TOASTS ========== */}
      <div className={styles.toasts}>
        {toasts.map(t => (
          <div key={t.id} className={styles.toast}>{t.msg}</div>
        ))}
      </div>

      {/* ========== MODALS ========== */}
      {activeModal !== 'none' && (
        <div className={styles.modalOverlay} onClick={e => { if (e.target === e.currentTarget) setActiveModal('none'); }}>
          {activeModal === 'notifications' && (
            <Notifications
              customLetters={notificationsList}
              onClose={() => {
                setActiveModal('none');
                setHasUnread(false);
              }}
            />
          )}

          {activeModal === 'settings' && (
            <Settings
              onClose={() => setActiveModal('none')}
              initialTab={settingsInitialTab}
              shelfFiles={shelfFiles}
              plantStage={plantStage}
              newBookIdx={newBookIdx}
              night={night}
              onToggleNight={toggleNight}
              shelfOrders={shelfOrders}
              shelfPages={shelfPages}
              onToast={toast}
            />
          )}
          {activeModal === 'wallet' && <Payments onClose={() => setActiveModal('none')} />}
          
          {activeModal === 'cart' && (() => {
            const selectedCartItems = cart.filter(item => checkedCartItemIds.includes(item.id));
            const totalCost = selectedCartItems.reduce((sum, item) => sum + item.totalCost, 0);
            const isOrderDisabled = selectedCartItems.length === 0;

            return (
              <div className={styles.cartModal} onClick={e => e.stopPropagation()}>
                <div className={styles.cartModalHeader}>
                  <h3>Your Print Cart</h3>
                  <button className={styles.closeModalBtn} onClick={() => setActiveModal('none')}>✕</button>
                </div>
                <div className={styles.cartModalBody}>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--ink-3)' }}>
                      Your cart is empty. Place some notes on the desk first!
                    </div>
                  ) : (
                    <>
                      <div className={styles.cartItemsList}>
                        {cart.map(item => {
                          const isChecked = checkedCartItemIds.includes(item.id);
                          return (
                            <div key={item.id} className={styles.cartItemCard} style={{ opacity: isChecked ? 1 : 0.6 }}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  setCheckedCartItemIds(prev => 
                                    prev.includes(item.id) 
                                      ? prev.filter(id => id !== item.id) 
                                      : [...prev, item.id]
                                  );
                                }}
                                style={{ marginRight: 12, cursor: 'pointer', width: 16, height: 16 }}
                              />
                              <div className={styles.cartItemMain}>
                                <div className={styles.cartItemTitle}>{item.fileName}</div>
                                <div className={styles.cartItemMeta}>
                                  {item.pages} pgs &middot; {item.copies} copies &middot; {item.mode === 'bw' ? 'B&W' : item.mode === 'custom' ? 'Mixed' : 'Colour'} &middot; {BINDL[item.binding]} &middot; {item.size.toUpperCase()}
                                </div>
                                <div className={styles.cartItemShop}>🏪 {item.shop.name}</div>
                              </div>
                              <div className={styles.cartItemRight}>
                                <div className={styles.cartItemPrice}>₹{item.totalCost}</div>
                                <button
                                  className={styles.cartItemDelete}
                                  onClick={() => {
                                    setCart(prev => prev.filter(i => i.id !== item.id));
                                    setCheckedCartItemIds(prev => prev.filter(id => id !== item.id));
                                    toast(`"${shortName(item.fileName)}" removed`);
                                  }}
                                  title="Remove item"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className={styles.cartTotalSummary}>
                        <div className={styles.cartSummaryRow}>
                          <span>Selected Files</span>
                          <span>{selectedCartItems.length} of {cart.length}</span>
                        </div>
                        <div className={styles.cartSummaryRow} style={{ fontSize: '18px', fontWeight: 'bold', borderTop: '1.5px dashed var(--edge)', paddingTop: 12, marginTop: 12 }}>
                          <span>Total Pay</span>
                          <span>₹{totalCost}</span>
                        </div>
                      </div>

                      <div style={{ marginTop: 16 }}>
                        <button
                          className={styles.cartOrderNowBtn}
                          style={{ backgroundColor: '#C2674A', color: '#FFFFFF' }}
                          disabled={isOrderDisabled}
                          onClick={() => handleCheckoutCart(selectedCartItems)}
                        >
                          <span>Order Now · Proceed to Checkout</span>
                          <span className={styles.mono}>₹{totalCost} →</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
