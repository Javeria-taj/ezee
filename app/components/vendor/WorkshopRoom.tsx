'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Reorder } from 'framer-motion';

/* ───────────────────────────────────────────────
   EZEE UNIVERSE — Workshop (Vendor) Dashboard
   Ported 1:1 from ezee-workbench-prototype.html
   Login page is untouched — this is the post-auth view.
─────────────────────────────────────────────── */

// ── Tiny icon renderer ────────────────────────────────────────────────────────
const ICONS: Record<string, string> = {
  bench: 'M3 9h18M3 9l1.5-4h15L21 9M5 9v10h14V9M9 13h6',
  printer: 'M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 14h12v8H6z',
  box: 'M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8',
  coin: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  star: 'M12 2l3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9z',
  stock: 'M3 3h18v4H3zM5 7v14h14V7M9 11h6',
  check: 'M20 6L9 17l-5-5',
  x: 'M18 6L6 18M6 6l12 12',
  menu: 'M3 12h18M3 6h18M3 18h18',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  hand: 'M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8v-1a2 2 0 0 0-4 0',
  play: 'M5 3l14 9-14 9V3z',
  flame: 'M12 2s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3s3 2 4-6z',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.17V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 14H4.5a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 11 4.6V4.5a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 2.82 1.17l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 11h.1a2 2 0 0 1 0 4h-.1z',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
};

function Ic({ name, size }: { name: string; size?: number | string }) {
  return (
    <svg width={size || '100%'} height={size || '100%'} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}>
      <path d={ICONS[name] || ''} />
    </svg>
  );
}

// ── Ezi SVG ─────────────────────────────────────────────────────────────────
function eziSVG(mood: 'calm' | 'focused' | 'happy' | 'sleepy', isNight: boolean) {
  const eyes: Record<string, string> = {
    calm: '<circle cx="84" cy="104" r="5.5" fill="#2A2928"/><circle cx="85.6" cy="102.4" r="1.6" fill="#fff"/><circle cx="116" cy="104" r="5.5" fill="#2A2928"/><circle cx="117.6" cy="102.4" r="1.6" fill="#fff"/>',
    focused: '<circle cx="84" cy="104" r="5.5" fill="#2A2928"/><circle cx="85.6" cy="102.4" r="1.6" fill="#fff"/><circle cx="116" cy="104" r="5.5" fill="#2A2928"/><circle cx="117.6" cy="102.4" r="1.6" fill="#fff"/>',
    happy: '<path d="M74 105 Q84 95 90 105" stroke="#2A2928" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M110 105 Q116 95 126 105" stroke="#2A2928" stroke-width="4" fill="none" stroke-linecap="round"/>',
    sleepy: '<path d="M76 105 Q84 109 92 105" stroke="#2A2928" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M108 105 Q116 109 124 105" stroke="#2A2928" stroke-width="3.5" fill="none" stroke-linecap="round"/>',
  };
  const mouth = mood === 'happy'
    ? '<path d="M94 123 Q100 133 106 123" stroke="#2A2928" stroke-width="3" fill="none" stroke-linecap="round"/>'
    : mood === 'sleepy'
    ? '<ellipse cx="100" cy="125" rx="4" ry="5" fill="#2A2928" opacity=".7"/>'
    : '<path d="M96 124 Q100 127 104 124" stroke="#2A2928" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  const zzz = mood === 'sleepy'
    ? '<text x="150" y="40" font-family="Space Grotesk" font-size="16" fill="#9A9183">z</text><text x="162" y="26" font-family="Space Grotesk" font-size="20" fill="#9A9183">z</text>'
    : '';
  const hat = isNight
    ? `<g transform="translate(0,-6)"><path d="M60 45 C80 15 130 15 140 45 C158 66 168 104 178 116 C184 122 183 132 173 131 C163 130 158 116 149 98 C139 70 110 40 80 50 Z" fill="#7A6D8C"/><ellipse cx="100" cy="45" rx="40" ry="10" fill="#EAE4DD"/><circle cx="177" cy="125" r="8" fill="#EAE4DD"/></g>`
    : `<g transform="translate(12,-9) rotate(-10 100 40)"><ellipse cx="100" cy="40" rx="34" ry="14" fill="#A9B59D"/><path d="M100 26 L102 19 L98 19 Z" fill="#7E8C6F"/></g><g transform="translate(128,44) rotate(45)"><rect width="7" height="34" rx="2" fill="#F4D03F"/><polygon points="0,34 7,34 3.5,43" fill="#E5E7E9"/><polygon points="2,39 5,39 3.5,43" fill="#2A2928"/><rect y="-4" width="7" height="4" rx="1" fill="#E74C3C"/></g>`;
  return `<svg viewBox="0 0 200 250" width="74" height="90">
    <defs><filter id="ss2" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#2A2928" flood-opacity=".15"/></filter></defs>
    ${zzz}
    <g filter="url(#ss2)">
      <!-- Body -->
      <path d="M100 30 C140 30 170 80 180 150 C185 190 160 230 100 230 C40 230 15 190 20 150 C30 80 60 30 100 30 Z" fill="#2A2928"/>
      <!-- Cup Handle on the right -->
      <path d="M150 90 C188 90 205 110 202 135 C199 160 180 172 145 165 L145 150 C170 150 185 140 185 135 C185 125 174 112 150 110 Z" fill="#2A2928"/>
      <!-- Face -->
      <ellipse cx="100" cy="108" rx="58" ry="44" fill="#FAF7F1"/>
      ${eyes[mood] || eyes.calm}
      <ellipse cx="66" cy="120" rx="11" ry="7" fill="#D48A70" opacity=".55"/>
      <ellipse cx="134" cy="120" rx="11" ry="7" fill="#D48A70" opacity=".55"/>
      ${mouth}
      <!-- Purple muffler/scarf -->
      <path d="M60 148 C80 162 120 162 140 148 C145 158 135 172 100 177 C65 172 55 158 60 148 Z" fill="#7A6D8C"/>
      <path d="M125 158 Q135 182 120 196 Q110 182 125 158 Z" fill="#7A6D8C"/>
      ${hat}
    </g>
  </svg>`;
}

// ── Data types ────────────────────────────────────────────────────────────────
interface Order {
  id: string; student: string; avatar: string; color: string;
  title: string; pages: number; mode: 'bw' | 'color'; binding: 'none' | 'staple' | 'spiral' | 'softbound';
  copies: number; urgent: boolean; paid: boolean; payLabel: string;
  status: 'new' | 'printing' | 'ready' | 'done' | 'rejected';
  station: string | null; progress: number;
  createdAt: number; pickup: string | null; price: number;
}
interface Station { id: string; name: string; sub: string; job: string | null; }
interface StockItem { nm: string; v: number; cls: 'ok' | 'low' | 'crit'; unit: string; }
interface Toast { id: number; msg: string; icon: string; kind: string; }

// ── Student pool & factories ──────────────────────────────────────────────────
const STUDENT_POOL: [string,string,number,string,string,number,string,string,number][] = [
  ['Aisha Khan','Final Year Thesis',120,'bw','spiral',1,'AK','#7A6D8C',1],
  ['Rahul Menon','DBMS Lab Record',46,'bw','staple',2,'RM','#7E8C6F',0],
  ['Zoya Fernandes','Architecture Sheets',12,'color','none',1,'ZF','#C2674A',1],
  ['Team Void','Hackathon Deck',18,'color','none',4,'TV','#B8912E',0],
  ['Sneha Rao','Resume — Placement',2,'color','none',6,'SR','#7A6D8C',1],
  ['Imran Sheikh','Maths Unit 3 Notes',34,'bw','staple',1,'IS','#7E8C6F',0],
  ['Divya Nair','Project Report',88,'bw','softbound',2,'DN','#C2674A',0],
  ['Karthik B','Seminar Handout',6,'bw','none',30,'KB','#B8912E',0],
  ['Meghana S','Internship Certificate',1,'color','none',3,'MS','#7A6D8C',0],
  ['Faiz Ahmed','Wedding Card Proof',1,'color','none',1,'FA','#C2674A',1],
];

function priceOf(o: Pick<Order,'pages'|'mode'|'binding'|'copies'>) {
  const per = o.mode === 'color' ? 5 : 1.2;
  const bind = { none: 0, staple: 5, spiral: 35, softbound: 80 }[o.binding];
  return Math.round((o.pages * per + bind) * o.copies);
}
function mkPickup() {
  const a = 'ABCDEFGHJKMNPQRSTUVWXYZ', n = '23456789';
  return a[Math.floor(Math.random()*a.length)]+n[Math.floor(Math.random()*n.length)]+n[Math.floor(Math.random()*n.length)];
}

let SEQ = 25;
function newOrder(forceStatus?: Order['status']): Order {
  const t = STUDENT_POOL[Math.floor(Math.random()*STUDENT_POOL.length)];
  const o: Partial<Order> = {
    id: 'A'+(SEQ++), student: t[0], avatar: t[6], color: t[7], title: t[1],
    pages: t[2], mode: t[3] as 'bw'|'color', binding: t[4] as Order['binding'], copies: t[5],
    urgent: !!t[8], paid: true,
    status: forceStatus || 'new', station: null, progress: 0,
    createdAt: Date.now() - (forceStatus ? Math.random()*2.4e6 : 0),
    pickup: null,
  };
  o.price = priceOf(o as Order);
  o.payLabel = 'Paid';
  return o as Order;
}

function initOrders(): Order[] {
  const orders: Order[] = [
    newOrder('new'), newOrder('new'), newOrder('new'),
    newOrder('printing'), newOrder('printing'),
    newOrder('ready'), newOrder('done'), newOrder('done'), newOrder('done'),
  ];
  orders.forEach(o => {
    if (o.status === 'printing') o.progress = Math.random()*0.7+0.1;
    if (o.status === 'ready' || o.status === 'done') o.pickup = mkPickup();
  });
  return orders;
}

function initStations(): Station[] {
  return [
    { id: 'veteran', name: 'The Veteran', sub: 'Heavy mono · binding', job: null },
    { id: 'speedster', name: 'Speedster', sub: 'Fast mono runs', job: null },
    { id: 'colorpro', name: 'Color Pro', sub: 'CMYK · sheets', job: null },
  ];
}

function initStock(): StockItem[] {
  return [
    { nm: 'A4 paper', v: 0.72, cls: 'ok', unit: 'reams' },
    { nm: 'A3 paper', v: 0.41, cls: 'ok', unit: 'reams' },
    { nm: 'Mono toner', v: 0.55, cls: 'ok', unit: '' },
    { nm: 'Color ink', v: 0.18, cls: 'crit', unit: '' },
    { nm: 'Spiral coils', v: 0.34, cls: 'low', unit: '' },
  ];
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const BIND_LABEL: Record<string, string> = { none: 'loose', staple: 'stapled', spiral: 'spiral', softbound: 'soft-bound' };
function waited(o: Order) {
  const m = Math.max(0, Math.round((Date.now()-o.createdAt)/60000));
  return m < 60 ? `${m}m` : `${Math.floor(m/60)}h ${m%60}m`;
}
function fmtAgo(t: number) {
  const m = Math.round((Date.now()-t)/60000);
  return m < 1 ? 'just now' : m < 60 ? `${m}m ago` : `${Math.floor(m/60)}h ago`;
}
function reclassStock(stock: StockItem[]): StockItem[] {
  return stock.map(s => ({ ...s, cls: s.v < 0.2 ? 'crit' : s.v < 0.4 ? 'low' : 'ok' }));
}

// ── CSS (injected once) ───────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');
.ws-root{
  --paper:#FAF7F1;--paper-2:#F3EDE3;--paper-3:#EAE2D4;--paper-edge:#E0D6C5;
  --ink:#2A2928;--ink-2:#5A5248;--ink-3:#9A9183;
  --terracotta:#C2674A;--terracotta-soft:#D48A70;--plum:#7A6D8C;
  --sage:#7E8C6F;--sage-soft:#A9B59D;--brass:#B8912E;--brass-soft:#D4AF37;
  --wood:#4A3219;--wood-deep:#36220E;--crimson:#9B2C2C;
  --rest:0 1px 0 rgba(255,255,255,.6) inset,0 2px 5px rgba(42,41,40,.06),0 8px 18px rgba(42,41,40,.05);
  --hover:0 1px 0 rgba(255,255,255,.7) inset,0 4px 10px rgba(42,41,40,.09),0 14px 30px rgba(42,41,40,.08);
  --press:inset 0 2px 6px rgba(42,41,40,.18);
  --well:inset 0 2px 5px rgba(42,41,40,.10);
  --spring:400ms cubic-bezier(.25,1,.5,1);--soft:400ms cubic-bezier(.25,1,.5,1);
  --r:14px;--r-sm:9px;
  font-family:'Instrument Sans',system-ui,sans-serif;color:var(--ink);
  background:
    radial-gradient(1100px 640px at 82% -6%, rgba(212, 175, 55, .22) 0%, transparent 58%),
    radial-gradient(900px 620px at 50% 118%, rgba(42, 41, 40, .20) 0%, transparent 60%),
    linear-gradient(180deg, #E9E3D6 0%, #DFD7C6 100%);
  background-attachment: fixed;
  transition: background 1.4s ease, color 1.4s ease;
  min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased;
  box-sizing:border-box;
}
.ws-root.night {
  --paper:#2E2A36;--paper-2:#23202D;--paper-3:#3E3A49;--paper-edge:#4F4A5E;
  --ink:#FAF7F1;--ink-2:#C0BAC8;--ink-3:#8A8392;
  --rest:0 1px 0 rgba(255,255,255,.05) inset,0 2px 5px rgba(0,0,0,.35),0 8px 18px rgba(0,0,0,.25);
  --hover:0 1px 0 rgba(255,255,255,.1) inset,0 4px 10px rgba(0,0,0,.45),0 14px 30px rgba(0,0,0,.35);
  --well:inset 0 2px 5px rgba(0,0,0,.4);
  background: #23202D !important;
}
.ws-root.night .ws-grain {
  display:none;
}
.ws-root.night .ws-rail {
  background:linear-gradient(180deg,rgba(30,28,38,.88),rgba(24,22,30,.72)) !important;
}
.ws-root.night .ws-topbar {
  background:linear-gradient(180deg,rgba(35,32,45,.96),rgba(35,32,45,.85)) !important;
}
.ws-root.night .ws-ezi-card,
.ws-root.night .ws-ledger,
.ws-root.night .ws-panel,
.ws-root.night .ws-stat {
  background:linear-gradient(165deg,#3A3545,#2E2A37) !important;
}
.ws-root.night .ws-clockchip,
.ws-root.night .ws-tab.on,
.ws-root.night .ws-btn.ghost,
.ws-root.night .xbtn {
  background:#3E3A49 !important;
  color:#FAF7F1 !important;
  border-color:#4F4A5E !important;
}
.ws-root.night .ws-docket {
  background:linear-gradient(180deg,#3E3A49,#2E2A36) !important;
}
.ws-root.night .ws-docket.urgent-card {
  background:linear-gradient(180deg,#4E2A2A,#3A1E1E) !important;
}
.ws-root.night .ws-stub {
  background:repeating-linear-gradient(180deg,#3A3545 0 7px,#2D2A37 7px 14px) !important;
  border-right-color:rgba(255,255,255,.08) !important;
}
.ws-root.night .ws-drawer-foot {
  background:rgba(0,0,0,.35) !important;
}
.ws-root.night .ws-nav button:hover,
.ws-root.night .ws-tab:hover {
  background:rgba(255,255,255,.05) !important;
}
.ws-root.night input,
.ws-root.night select,
.ws-root.night textarea {
  background:#23202D !important;
  color:#FAF7F1 !important;
  border:1px solid #4F4A5E !important;
}
.ws-root *{box-sizing:border-box;margin:0;padding:0}
.ws-root button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
.ws-root ::selection{background:var(--terracotta-soft);color:var(--paper)}
.ws-grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.035;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.ws-app{display:flex;height:100vh;overflow:hidden;transition:all var(--spring)}
.ws-app.ws-closed{}
/* rail */
.ws-rail{position:fixed;top:0;left:0;bottom:0;height:100vh;width:262px;padding:22px 16px;
  display:flex;flex-direction:column;gap:6px;z-index:50;
  background:linear-gradient(180deg,rgba(255,255,255,.5),rgba(243,237,227,.35));
  border-right:1px solid var(--paper-edge);backdrop-filter:blur(2px);
  overflow-y:auto;transition:width var(--spring),padding var(--spring)}
.ws-app.ws-closed .ws-rail{width:68px;padding:22px 10px}
.ws-app.ws-closed .ws-brand div,
.ws-app.ws-closed .ws-ezi-card,
.ws-app.ws-closed .ws-nav span:not(.ic),
.ws-app.ws-closed .ws-rail .ws-toggle span {
  display:none;
}
.ws-app.ws-closed .ws-brand { justify-content:center !important; }
.ws-app.ws-closed .ws-nav button { justify-content: center; padding: 12px 0; }
.ws-brand{display:flex;align-items:center;gap:10px;padding:4px 8px 14px}
.ws-seal{width:34px;height:34px;border-radius:10px;flex:none;
  background:linear-gradient(160deg,var(--ink),#3c3a37);color:var(--paper);
  display:grid;place-items:center;box-shadow:var(--rest);font-family:'Space Grotesk';font-weight:700;font-size:15px;position:relative}
.ws-seal::after{content:"";position:absolute;inset:3px;border:1px solid rgba(250,247,241,.18);border-radius:7px}
.ws-brand b{font-family:'Space Grotesk';letter-spacing:-.02em;font-size:16px}
.ws-brand small{display:block;font-size:10px;color:var(--ink-3);letter-spacing:.16em;text-transform:uppercase;margin-top:1px}
.ws-ezi-card{margin:6px 4px 14px;padding:14px 12px 12px;border-radius:var(--r);
  background:linear-gradient(165deg,#fffdf8,#efe7d9);
  box-shadow:var(--rest);border:1px solid var(--paper-edge);text-align:center;position:relative;overflow:hidden}
.ws-ezi-glow{position:absolute;top:-30px;left:50%;transform:translateX(-50%);width:120px;height:120px;
  background:radial-gradient(circle,rgba(212,175,55,.28),transparent 68%);opacity:.3;pointer-events:none}
.ws-ezi-say{position:relative;z-index:1;margin-top:4px;font-size:12px;color:var(--ink-2);min-height:30px;line-height:1.35;transition:opacity var(--soft)}
.ws-ezi-breathe{animation:ws-breathe 5.5s ease-in-out infinite;position:relative;z-index:1}
@keyframes ws-breathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes ws-chime{0%{box-shadow:0 0 0 0 rgba(122,109,140,.5)}100%{box-shadow:0 0 0 16px rgba(122,109,140,0)}}
.ws-chiming{animation:ws-chime 1.4s ease-out}
.ws-nav{display:flex;flex-direction:column;gap:2px;margin-top:2px}
.ws-nav button{display:flex;align-items:center;gap:11px;padding:9px 11px;border-radius:10px;
  font-size:14.5px;color:var(--ink-2);font-weight:600;transition:background var(--soft),color var(--soft);
  text-align:left;width:100%}
.ws-nav button .ic{width:20px;height:20px;flex:none;color:var(--ink-2);transition:color var(--soft)}
.ws-nav button:hover{background:rgba(42,41,40,.045);color:var(--ink)}
.ws-nav button.on{background:linear-gradient(120deg,rgba(122,109,140,.16),rgba(122,109,140,.07));color:var(--ink);box-shadow:var(--rest)}
.ws-nav button.on .ic{color:var(--plum)}
.ws-count{margin-left:auto;font-family:'Space Grotesk';font-size:11px;font-weight:600;min-width:20px;height:20px;padding:0 5px;
  display:grid;place-items:center;border-radius:6px;background:rgba(42,41,40,.06);color:var(--ink-2)}
.ws-nav button.on .ws-count{background:var(--plum);color:#fff}
.ws-rail-foot{display:flex;flex-direction:column;gap:8px;padding:8px 6px 2px;border-top:1px solid var(--paper-edge);margin-top:6px}
.ws-toggle{display:flex;align-items:center;justify-content:space-between;font-size:12.5px;color:var(--ink-2);padding:6px 6px}
.ws-sw{width:40px;height:23px;border-radius:20px;background:var(--paper-3);box-shadow:var(--well);position:relative;transition:background var(--spring);flex:none}
.ws-sw::after{content:"";position:absolute;top:2.5px;left:2.5px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:var(--rest);transition:transform var(--spring)}
.ws-sw.on{background:var(--sage)}.ws-sw.on::after{transform:translateX(17px)}
.ws-sw.brass.on{background:var(--brass)}
/* main */
.ws-main{flex:1;height:100vh;overflow-y:auto;margin-left:262px;min-width:0;display:flex;flex-direction:column;transition:margin-left var(--spring)}
.ws-app.ws-closed .ws-main{margin-left:68px}
.ws-topbar{position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:16px;
  padding:14px 26px;border-bottom:1px solid var(--paper-edge);
  background:linear-gradient(180deg,rgba(250,247,241,.92),rgba(250,247,241,.78));backdrop-filter:blur(8px)}
.ws-topbar h1{font-family:'Space Grotesk';font-size:19px;letter-spacing:-.02em;font-weight:600}
.ws-sub{font-size:12px;color:var(--ink-3);margin-top:1px}
.ws-clockchip{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--ink-2);
  padding:7px 12px;border-radius:10px;background:#fff;box-shadow:var(--rest);border:1px solid var(--paper-edge)}
.ws-clockchip .mono{font-weight:600;color:var(--ink);font-family:'Space Grotesk'}
.ws-openchip{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;padding:7px 13px;border-radius:10px;
  background:linear-gradient(160deg,#fff,#f1ece2);box-shadow:var(--rest);border:1px solid var(--paper-edge)}
.ws-openchip .dot{width:8px;height:8px;border-radius:50%;background:var(--sage);box-shadow:0 0 0 3px rgba(126,140,111,.18)}
.ws-openchip.closed .dot{background:var(--ink-3);box-shadow:0 0 0 3px rgba(154,145,131,.18)}
.ws-canvas{padding:22px 26px 60px;max-width:1340px;width:100%}
/* stats */
.ws-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.ws-stat{padding:14px 15px;border-radius:var(--r);background:linear-gradient(165deg,#fffdf8,#f1ebdf);box-shadow:var(--rest);border:1px solid var(--paper-edge);position:relative;overflow:hidden}
.ws-stat .label{font-family:'Space Grotesk';text-transform:uppercase;letter-spacing:.14em;font-size:10.5px;font-weight:600;color:var(--ink-3);margin-bottom:7px}
.ws-stat .big{font-family:'Space Grotesk';font-size:27px;font-weight:600;letter-spacing:-.03em;line-height:1}
.ws-stat .big small{font-size:14px;color:var(--ink-3);font-weight:500}
.ws-stat .trail{font-size:11.5px;color:var(--ink-2);margin-top:5px}
.ws-edge{position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:3px}
/* work layout */
.ws-work{display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start}
/* tabs */
.ws-tabs{display:flex;gap:4px;margin-bottom:16px;flex-wrap:wrap}
.ws-tab{display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:10px;font-size:13px;font-weight:600;
  color:var(--ink-2);background:transparent;transition:all var(--soft);font-family:'Space Grotesk'}
.ws-tab:hover{background:rgba(42,41,40,.05)}
.ws-tab.on{background:#fff;color:var(--ink);box-shadow:var(--rest);border:1px solid var(--paper-edge)}
.ws-tab .pill{font-size:11px;min-width:19px;height:19px;padding:0 5px;border-radius:6px;display:grid;place-items:center;
  background:rgba(42,41,40,.08);color:var(--ink-2)}
.ws-tab.on .pill{background:var(--ink);color:#fff}
/* queue */
.ws-queue{display:flex;flex-direction:column;gap:13px}
.ws-docket{position:relative;display:grid;grid-template-columns:64px 1fr auto;
  background:linear-gradient(180deg,#fffdf8,#f7f1e6);
  border:1px solid var(--paper-edge);border-radius:var(--r);
  box-shadow:var(--rest);overflow:hidden;cursor:pointer;
  transition:box-shadow var(--spring),transform var(--spring),border-color var(--soft);
  animation:ws-dropin var(--spring) both}
@keyframes ws-dropin{from{opacity:0;transform:translateY(10px) rotate(-.4deg)}to{opacity:1;transform:none}}
.ws-docket:hover{box-shadow:var(--hover);transform:translateY(-2px)}
.ws-docket.sel{border-color:var(--plum);box-shadow:var(--hover),0 0 0 1px var(--plum)}
.ws-docket.urgent-card{background:linear-gradient(180deg,#fde4d8,#f1ccbb)}
.ws-stub{position:relative;background:repeating-linear-gradient(180deg,#efe6d6 0 7px,#e9dfcd 7px 14px);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;padding:10px 6px;
  border-right:2px dashed rgba(42,41,40,.16)}
.ws-stub .code{font-family:'Space Grotesk';font-weight:700;font-size:13px;letter-spacing:.02em;color:var(--ink);
  writing-mode:vertical-rl;transform:rotate(180deg)}
.ws-stub .hole{position:absolute;width:11px;height:11px;border-radius:50%;background:var(--paper);box-shadow:var(--well);right:-6px}
.ws-stub .hole.t{top:11px}.ws-stub .hole.b{bottom:11px}
.ws-dbody{padding:13px 15px;min-width:0;display:flex;flex-direction:column;gap:6px}
.ws-drow1{display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.ws-dtitle{font-family:'Space Grotesk';font-weight:600;font-size:15.5px;letter-spacing:-.01em;color:var(--ink)}
.ws-dwho{font-size:12.5px;color:var(--ink-2)}
.ws-dspec{font-size:12.5px;color:var(--ink-2);display:flex;align-items:center;gap:7px;flex-wrap:wrap}
.ws-dspec .x{color:var(--ink-3)}
.ws-dmeta{display:flex;align-items:center;gap:12px;margin-top:1px;font-size:12px;color:var(--ink-3)}
.ws-dact{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:8px;padding:13px 15px 13px 6px}
.ws-price{font-family:'Space Grotesk';font-weight:700;font-size:17px;letter-spacing:-.02em}
/* stamp */
.ws-stamp{position:absolute;top:9px;right:104px;font-family:'Space Grotesk';font-weight:700;font-size:10px;
  letter-spacing:.16em;text-transform:uppercase;padding:3px 8px;border-radius:5px;transform:rotate(-4deg);
  border:1.5px solid currentColor;opacity:.82}
.ws-stamp.s-new{color:var(--plum)}.ws-stamp.s-printing{color:var(--brass)}.ws-stamp.s-ready{color:var(--sage)}
.ws-stamp.s-done{color:var(--ink-3)}.ws-stamp.s-urgent{color:var(--terracotta)}
/* tags */
.ws-tag{display:inline-flex;align-items:center;gap:5px;font-family:'Space Grotesk';font-size:10.5px;font-weight:600;
  text-transform:uppercase;letter-spacing:.08em;padding:3px 8px;border-radius:6px;background:rgba(42,41,40,.05);color:var(--ink-2)}
.ws-tag.urgent{background:rgba(194,103,74,.13);color:var(--terracotta)}
.ws-tag.color{background:rgba(122,109,140,.13);color:var(--plum)}
/* pay */
.ws-pay{font-weight:600}
.ws-pay.paid{color:var(--sage)}.ws-pay.cod{color:var(--brass)}
/* buttons */
.ws-btn{display:inline-flex;align-items:center;gap:7px;padding:8px 15px;border-radius:9px;font-size:13px;font-weight:600;
  font-family:'Space Grotesk';box-shadow:var(--rest);transition:transform 90ms ease,box-shadow var(--soft),background var(--soft);
  border:1px solid transparent;white-space:nowrap;cursor:pointer}
.ws-btn:active{transform:translateY(1px);box-shadow:var(--press)}
.ws-btn.primary{background:linear-gradient(165deg,#34322e,var(--ink));color:var(--paper)}
.ws-btn.sage{background:linear-gradient(165deg,#8a9a78,var(--sage));color:#fff}
.ws-btn.brass{background:linear-gradient(165deg,#c79e36,var(--brass));color:#fff}
.ws-btn.terra{background:linear-gradient(165deg,#d07a5c,var(--terracotta));color:#fff}
.ws-btn.ghost{background:#fff;color:var(--ink-2);border-color:var(--paper-edge)}
.ws-btn.ghost:hover{color:var(--ink)}
.ws-btn.sm{padding:6px 11px;font-size:12px}
.ws-btn.icon-only{padding:6px!important;width:34px!important;height:34px!important;flex:none!important}
/* side panels */
.ws-side{display:flex;flex-direction:column;gap:16px;position:sticky;top:84px}
.ws-panel{border-radius:var(--r);background:linear-gradient(165deg,#fffdf8,#f1ebdf);box-shadow:var(--rest);border:1px solid var(--paper-edge);overflow:hidden}
.ws-panel h3{font-family:'Space Grotesk';font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);
  padding:13px 15px 0;font-weight:600}
.ws-pbody{padding:12px 15px 15px}
.ws-station{display:flex;align-items:center;gap:11px;padding:10px 0;border-bottom:1px dashed var(--paper-edge)}
.ws-station:last-child{border-bottom:none}
.ws-st-icon{width:34px;height:34px;flex:none;border-radius:9px;display:grid;place-items:center;background:var(--paper-3);box-shadow:var(--well);color:var(--ink-2)}
.ws-station.busy .ws-st-icon{background:linear-gradient(160deg,#e7cf86,#d4af37);color:#5a4710;box-shadow:var(--rest)}
.ws-st-main{flex:1;min-width:0}
.ws-st-name{font-family:'Space Grotesk';font-weight:600;font-size:13px}
.ws-st-job{font-size:11.5px;color:var(--ink-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ws-st-idle{font-size:11.5px;color:var(--ink-3)}
.ws-bar{height:5px;border-radius:4px;background:var(--paper-3);box-shadow:var(--well);margin-top:5px;overflow:hidden}
.ws-bar>i{display:block;height:100%;border-radius:4px;background:linear-gradient(90deg,var(--brass-soft),var(--brass));transition:width 600ms linear}
.ws-bar.ok>i{background:linear-gradient(90deg,var(--sage-soft),var(--sage))}
.ws-bar.low>i{background:linear-gradient(90deg,#d8a25c,var(--brass))}
.ws-bar.crit>i{background:linear-gradient(90deg,#cf7a5c,var(--terracotta))}
.ws-stock-row{display:flex;align-items:center;gap:10px;padding:8px 0}
.ws-stock-row .nm{font-size:13px;font-weight:500;flex:1}
.ws-stock-row .ws-bar{width:88px;margin:0}
.ws-stock-row .v{font-family:'Space Grotesk';font-size:11.5px;font-weight:600;color:var(--ink-2);width:34px;text-align:right}
.ws-stock-warn{margin-top:10px;padding:9px 11px;border-radius:9px;background:rgba(194,103,74,.10);color:var(--terracotta);
  font-size:12px;display:flex;gap:8px;align-items:flex-start;line-height:1.4}
/* empty */
.ws-empty{text-align:center;padding:46px 20px;color:var(--ink-3)}
.ws-empty b{display:block;font-family:'Space Grotesk';color:var(--ink-2);font-size:15px;margin-bottom:3px}
/* drawer */
.ws-scrim{position:fixed;inset:0;background:rgba(42,41,40,.32);backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity var(--soft);z-index:70}
.ws-scrim.on{opacity:1;pointer-events:auto}
.ws-drawer{position:fixed;top:0;right:-460px;width:440px;max-width:92vw;height:100vh;z-index:80;
  background:linear-gradient(180deg,var(--paper),var(--paper-2));box-shadow:-20px 0 50px rgba(42,41,40,.18);
  border-left:1px solid var(--paper-edge);transition:right var(--spring);display:flex;flex-direction:column}
.ws-drawer.on{right:0}
.ws-drawer-head{padding:18px 20px 14px;border-bottom:1px solid var(--paper-edge);display:flex;align-items:flex-start;gap:12px}
.ws-drawer-head .xbtn{margin-left:auto;width:32px;height:32px;border-radius:8px;background:#fff;box-shadow:var(--rest);display:grid;place-items:center;color:var(--ink-2)}
.ws-drawer-body{padding:18px 20px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:16px}
.ws-kv{display:grid;grid-template-columns:108px 1fr;gap:8px 12px;font-size:13.5px}
.ws-kv .k{color:var(--ink-3);font-family:'Space Grotesk';font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding-top:2px}
.ws-kv .v{color:var(--ink);font-weight:500}
.ws-bill{border-top:1px dashed var(--paper-edge);padding-top:13px;display:flex;flex-direction:column;gap:7px;font-size:13.5px}
.ws-bill .ln{display:flex;justify-content:space-between;color:var(--ink-2)}
.ws-bill .ln.tot{border-top:1px solid var(--paper-edge);padding-top:8px;margin-top:3px;color:var(--ink);font-weight:700;font-family:'Space Grotesk';font-size:16px}
.ws-timeline{display:flex;flex-direction:column;gap:0}
.ws-tl{display:flex;gap:11px;padding-bottom:14px;position:relative}
.ws-tl:not(:last-child)::before{content:"";position:absolute;left:6px;top:16px;bottom:0;width:1.5px;background:var(--paper-edge)}
.ws-tl .dot{width:13px;height:13px;border-radius:50%;flex:none;margin-top:2px;background:var(--paper-3);box-shadow:var(--well)}
.ws-tl.done .dot{background:var(--sage);box-shadow:0 0 0 3px rgba(126,140,111,.16)}
.ws-tl .ttext b{font-family:'Space Grotesk';font-size:13px;font-weight:600;display:block}
.ws-tl .ttext small{font-size:11.5px;color:var(--ink-3)}
.ws-drawer-foot{padding:14px 20px;border-top:1px solid var(--paper-edge);display:flex;gap:9px;background:rgba(255,255,255,.4)}
.ws-drawer-foot .ws-btn{flex:1;justify-content:center}
.ws-pickup{display:flex;align-items:center;gap:12px;padding:13px 15px;border-radius:11px;
  background:linear-gradient(160deg,#f0f3ea,#e6ecdb);box-shadow:var(--well);border:1px solid rgba(126,140,111,.3)}
.ws-pickup .lbl{flex:1}.ws-pickup .lbl small{display:block;color:var(--sage);font-weight:600}
.ws-pickup .pc{font-family:'Space Grotesk';font-weight:700;font-size:26px;letter-spacing:.18em;color:var(--ink)}
.ws-doc-preview{aspect-ratio:1/1.1;border-radius:11px;background:repeating-linear-gradient(135deg,#fff 0 14px,#f6f0e6 14px 28px);
  box-shadow:var(--well);border:1px solid var(--paper-edge);display:grid;place-items:center;color:var(--ink-3);position:relative;overflow:hidden}
.ws-doc{width:58%;height:74%;background:#fff;box-shadow:var(--rest);border-radius:3px;padding:14px;display:flex;flex-direction:column;gap:6px;transform:rotate(-1.5deg)}
.ws-doc i{display:block;height:4px;border-radius:2px;background:var(--paper-3)}
.ws-doc i:first-child{width:60%;height:7px;background:var(--ink-3)}
/* toasts */
.ws-toasts{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);z-index:120;display:flex;flex-direction:column;gap:8px;align-items:center}
.ws-toast{display:flex;align-items:center;gap:10px;padding:11px 17px;border-radius:11px;font-size:13.5px;font-weight:500;
  background:linear-gradient(160deg,#34322e,var(--ink));color:var(--paper);box-shadow:var(--hover);
  animation:ws-toastin var(--spring) both}
.ws-toast.good{--ic:var(--sage-soft)}.ws-toast.warn{--ic:var(--brass-soft)}
@keyframes ws-toastin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
/* ledger */
.ws-ledger{border-radius:var(--r);background:linear-gradient(165deg,#fffdf8,#f1ebdf);box-shadow:var(--rest);border:1px solid var(--paper-edge);overflow:hidden;margin-bottom:18px}
.ws-ledger-head{padding:14px 17px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--paper-edge)}
.ws-ledger-head h3{font-family:'Space Grotesk';font-size:15px;font-weight:600;letter-spacing:-.01em}
.ws-two-col{display:grid;grid-template-columns:1fr 360px;gap:18px;align-items:start}
@media(max-width:820px){.ws-two-col{grid-template-columns:1fr;}}
.ws-owl-card{border-radius:var(--r);background:linear-gradient(165deg,#34322e,#26241f);color:var(--paper);box-shadow:var(--hover);padding:18px;position:relative;overflow:hidden}
.ws-owl-card .ws-insight{font-size:14px;line-height:1.55;margin-top:8px;color:#efe9df}
.ws-label{font-family:'Space Grotesk';text-transform:uppercase;letter-spacing:.14em;font-size:10.5px;font-weight:600;color:var(--ink-3)}
.ws-badge{display:inline-flex;align-items:center;gap:6px;font-family:'Space Grotesk';font-size:11px;font-weight:600;padding:4px 9px;border-radius:7px}
.ws-badge .d{width:6px;height:6px;border-radius:50%}
.ws-badge.ok{background:rgba(126,140,111,.14);color:var(--sage)}.ws-badge.ok .d{background:var(--sage)}
.ws-badge.pend{background:rgba(184,145,46,.15);color:var(--brass)}.ws-badge.pend .d{background:var(--brass)}
.ws-badge.susp{background:rgba(155,44,44,.12);color:var(--crimson)}.ws-badge.susp .d{background:var(--crimson)}
table.ws-table{width:100%;border-collapse:collapse;font-size:13.5px}
table.ws-table thead th{font-family:'Space Grotesk';font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);
  text-align:left;padding:10px 17px;font-weight:600;border-bottom:1px solid var(--paper-edge)}
table.ws-table tbody td{padding:13px 17px;border-bottom:1px solid rgba(224,214,197,.55);vertical-align:middle}
table.ws-table tbody tr{transition:background var(--soft)}
table.ws-table tbody tr:hover{background:rgba(42,41,40,.025)}
table.ws-table tbody tr:last-child td{border-bottom:none}
.ws-rowact{display:flex;gap:7px;justify-content:flex-end}
.ws-tick{display:flex;gap:11px;padding:11px 0;border-bottom:1px dashed var(--paper-edge);font-size:13px;align-items:center}
.ws-tick:last-child{border-bottom:none}
.ws-tick .tk-main{flex:1;min-width:0}.ws-tick .tk-main b{font-weight:600;display:block;font-size:13.5px}
.ws-tick .tk-main small{color:var(--ink-3);font-size:11.5px}
/* ── WorkshopRoom Mobile — all inside @media, desktop untouched ── */
@media(max-width:820px){
  .ws-app,.ws-app.ws-closed{display:flex!important;flex-direction:column!important;height:auto!important;overflow:visible!important}
  
  /* Make the sidebar a static top header */
  .ws-rail{position:static!important;width:100%!important;height:auto!important;min-height:auto!important;border:none!important;padding:0!important;flex-shrink:0}
  
  /* Top brand header */
  .ws-brand{display:flex!important;justify-content:center!important;padding:16px!important;border-bottom:1px solid var(--paper-edge)!important}
  .ws-brand button[aria-label="Workshop Brand"]{cursor:default!important} /* no need to toggle sidebar on mobile */
  .ws-brand button[aria-label="Close sidebar"]{display:none!important} /* hide close button */
  .ws-app.ws-closed .ws-brand div{display:block!important}
  
  /* Hide unnecessary sidebar items */
  .ws-ezi-card{display:none!important}
  .ws-rail-foot{display:none!important}
  
  /* Bottom Navigation */
  .ws-nav{position:fixed!important;bottom:0!important;left:0!important;right:0!important;height:64px!important;background:rgba(255,255,255,.96)!important;backdrop-filter:blur(10px)!important;border-top:1px solid var(--paper-edge)!important;z-index:9000!important;display:flex!important;flex-direction:row!important;justify-content:space-around!important;align-items:center!important;padding:0 8px!important;margin:0!important;gap:0!important}
  
  .ws-nav button{flex:1!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;height:100%!important;border-radius:0!important;background:none!important;gap:4px!important;padding:0!important;font-size:10px!important;color:var(--ink-3)!important;position:relative!important;white-space:nowrap!important}
  .ws-nav button.on{color:var(--ink)!important}
  .ws-nav button.on .ic{color:var(--terracotta)!important}
  .ws-nav button .ic{width:17px!important;height:17px!important}
  
  /* Ensure closed-state hiding of labels doesn't apply on mobile nav */
  .ws-app.ws-closed .ws-nav span:not(.ic){display:inline!important}
  .ws-app.ws-closed .ws-nav button{justify-content:center!important;padding:0!important}
  
  /* Nav badge (count) */
  .ws-count{position:absolute!important;top:8px!important;right:calc(50% - 20px)!important;padding:2px 5px!important;font-size:9px!important}
  
  /* Main content area */
  .ws-main{margin-left:0!important;height:auto!important;overflow-y:visible!important;min-height:0!important;overflow-x:hidden;padding-bottom:80px!important} /* padding for bottom nav */
  
  /* Topbar (Title, clock, toggles) */
  .ws-topbar{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;gap:12px!important;justify-content:flex-start!important;padding:16px!important;align-items:center!important}
  .ws-topbar > div:first-child{width:100%!important} /* Title full width */
  .ws-topbar > div:nth-child(2){display:none!important} /* Hide spacer */
  .ws-sub{display:none!important}
  
  /* Toggles & Chips */
  .ws-clockchip{font-size:12px!important;padding:6px 12px!important;border-radius:12px!important}
  
  /* Work canvas */
  .ws-canvas{padding:16px 12px!important}
  
  /* Stats grid */
  .ws-stats{grid-template-columns:1fr 1fr!important;gap:10px!important}
  .ws-stat{padding:14px!important}
  .ws-stat .big{font-size:24px!important}
  
  /* Queue tabs & grid */
  .ws-work{grid-template-columns:1fr!important}
  .ws-side{display:none!important}
  .ws-queue{gap:12px!important}
  
  /* Docket cards (Orders) */
  .ws-docket{display:flex!important;flex-direction:column!important;gap:10px!important;padding:14px!important}
  .ws-stub{display:none!important}
  .ws-dbody{padding:0!important;min-width:0!important;gap:4px!important}
  .ws-drow1{padding-right:75px!important}
  .ws-dact{flex-direction:row!important;justify-content:space-between!important;align-items:center!important;width:100%!important;padding:10px 0 0 0!important;margin-top:0!important;border-top:1px dashed var(--paper-edge)!important}
  .ws-stamp{top:12px!important;right:12px!important}
  
  /* Tables (Stations / Stock) */
  .ws-ledger{overflow-x:auto!important;-webkit-overflow-scrolling:touch}
  table.ws-table{min-width:480px}
  .ws-table-wrap{overflow-x:auto!important;-webkit-overflow-scrolling:touch}
  .ws-ledger-head{flex-wrap:wrap!important;gap:8px!important}
  
  /* Drawer (Order details overlay) */
  .ws-drawer{width:100%!important;max-width:100vw!important}
}
@media(max-width:480px){
  .ws-stats{grid-template-columns:1fr 1fr!important;gap:8px!important}
  .ws-stat .big{font-size:20px!important}
  .ws-stat .trail{display:none!important}
  .ws-tabs{flex-wrap:wrap!important;gap:6px!important}
  .ws-tab{padding:8px 12px!important;font-size:12.5px!important}
  .ws-dact .ws-btn{flex:1!important;justify-content:center!important}
}

@media (min-width: 821px) {
  /* Scale up layout & spacing */
  .ws-main {
    padding: 0 !important; /* Reset wrapper padding, spacing is handled by topbar/canvas */
    margin-left: 280px !important;
    height: 100vh !important;
    overflow-y: auto !important;
  }
  .ws-app.ws-closed .ws-main {
    margin-left: 96px !important;
  }
  .ws-canvas {
    padding: 30px 40px 80px !important;
    max-width: 1440px !important;
  }
  
  /* Sidebar (opened vs closed sizes) */
  .ws-rail {
    width: 280px !important;
    padding: 24px 20px !important;
    gap: 22px !important;
    z-index: 50 !important;
  }
  .ws-app.ws-closed .ws-rail {
    width: 96px !important;
    padding: 24px 14px !important;
  }
  
  /* Sidebar brand & nav */
  .ws-brand b {
    font-size: 19px !important;
  }
  .ws-brand small {
    font-size: 11px !important;
  }
  .ws-nav button {
    font-size: 16px !important;
    padding: 11px 13px !important;
    gap: 14px !important;
  }
  .ws-nav button .ic {
    width: 24px !important;
    height: 24px !important;
  }
  
  /* Topbar */
  .ws-topbar {
    padding: 18px 40px !important;
    gap: 24px !important;
  }
  .ws-topbar h1 {
    font-size: 24px !important;
  }
  .ws-sub {
    font-size: 14px !important;
  }
  .ws-clockchip {
    font-size: 14.5px !important;
    padding: 9px 15px !important;
  }

  /* Stats cards */
  .ws-stats {
    gap: 20px !important;
    margin-bottom: 30px !important;
  }
  .ws-stat {
    padding: 20px 22px !important;
  }
  .ws-stat .label {
    font-size: 12px !important;
    margin-bottom: 10px !important;
  }
  .ws-stat .big {
    font-size: 36px !important;
  }
  .ws-stat .big small {
    font-size: 16px !important;
  }
  .ws-stat .trail {
    font-size: 13.5px !important;
    margin-top: 8px !important;
  }

  /* Workspace Layout & Tabs */
  .ws-work {
    grid-template-columns: 1fr 360px !important;
    gap: 28px !important;
  }
  .ws-tabs {
    gap: 6px !important;
    margin-bottom: 20px !important;
  }
  .ws-tab {
    font-size: 15px !important;
    padding: 10px 18px !important;
  }
  .ws-tab .pill {
    font-size: 12px !important;
    min-width: 22px !important;
    height: 22px !important;
  }

  /* Docket cards (Orders) */
  .ws-queue {
    gap: 16px !important;
  }
  .ws-dbody {
    gap: 8px !important;
    padding: 16px 20px !important;
  }
  .ws-dtitle {
    font-size: 18.5px !important;
  }
  .ws-dwho {
    font-size: 14.5px !important;
  }
  .ws-dspec {
    font-size: 14.5px !important;
    gap: 9px !important;
  }
  .ws-dmeta {
    font-size: 13.5px !important;
    gap: 16px !important;
    margin-top: 3px !important;
  }
  .ws-dact {
    padding: 16px 20px 16px 8px !important;
    gap: 12px !important;
  }
  .ws-price {
    font-size: 20px !important;
  }
  .ws-stamp {
    font-size: 11px !important;
    padding: 4px 10px !important;
    right: 120px !important;
  }

  /* General buttons & tables */
  .ws-btn {
    font-size: 15px !important;
    padding: 10px 18px !important;
  }
  table.ws-table th, table.ws-table td {
    font-size: 15px !important;
    padding: 14px 16px !important;
  }
  .ws-ledger-head h3 {
    font-size: 18px !important;
  }
  .ws-btn.icon-only {
    width: 40px !important;
    height: 40px !important;
    padding: 8px !important;
  }
  .ws-avatar {
    width: 40px !important;
    height: 40px !important;
  }
}

/* Custom modal styles */
.ws-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(42, 41, 40, 0.45);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ws-fadein 0.25s ease-out;
}

@keyframes ws-fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

.ws-modal-card {
  background: var(--paper);
  border: 1px solid var(--paper-edge);
  border-radius: var(--r);
  box-shadow: 0 20px 50px rgba(42, 41, 40, 0.15);
  padding: 24px 28px;
  width: 420px;
  max-width: 90vw;
  animation: ws-popin 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  background-image: radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px);
  background-size: 16px 16px;
}

@keyframes ws-popin {
  from { transform: scale(0.95) translateY(10px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

.ws-modal-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 19px;
  font-weight: 600;
  color: var(--ink);
  margin: 0 0 10px 0;
}

.ws-modal-message {
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.5;
  margin: 0 0 24px 0;
}

.ws-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.ws-modal-btn {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 9px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.ws-modal-btn.cancel {
  background: linear-gradient(165deg, #34322e, var(--ink));
  color: var(--paper);
}

.ws-modal-btn.cancel:hover {
  transform: translateY(-1px);
  box-shadow: var(--hover);
}

.ws-modal-btn.confirm {
  background: transparent;
  color: #7A6D8C;
  border: none;
}

.ws-modal-btn.confirm:hover {
  color: var(--ink);
}

.ws-modal-btn.confirm.destructive {
  background: transparent;
  color: var(--crimson);
  border: none;
}

.ws-modal-btn.confirm.destructive:hover {
  color: #c2674a;
}

/* Night Mode Modal Overrides */
.ws-root.night .ws-modal-card {
  background: var(--paper);
  border-color: var(--paper-edge);
  background-image: radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px);
}

.ws-root.night .ws-modal-btn.cancel {
  background: #3E3A49;
  color: #FAF7F1;
  border: 1px solid var(--paper-edge);
}

.ws-root.night .ws-modal-btn.cancel:hover {
  background: var(--paper-edge);
  color: var(--ink);
}

.ws-root.night .ws-modal-btn.confirm {
  color: #8A8392 !important;
}

.ws-root.night .ws-modal-btn.confirm:hover {
  color: #FAF7F1 !important;
}

.ws-root.night .ws-modal-btn.confirm.destructive {
  color: #ff8b8b !important;
}

.ws-root.night .ws-modal-btn.confirm.destructive:hover {
  color: #FAF7F1 !important;
}
}
`;

// ── Toast ─────────────────────────────────────────────────────────────────────
function ToastEl({ t, onRemove }: { t: Toast; onRemove: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(t.id), 3200);
    return () => clearTimeout(timer);
  }, [t.id, onRemove]);
  return (
    <div className={`ws-toast ${t.kind}`}>
      <Ic name={t.icon || 'bell'} size={17} />
      <span>{t.msg}</span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function WorkshopRoom() {
  const [orders, setOrders] = useState<Order[]>(() => initOrders());
  const [stations, setStations] = useState<Station[]>(() => initStations());
  const [stock, setStock] = useState<StockItem[]>(() => reclassStock(initStock()));
  const [section, setSection] = useState<string>('queue');
  const [vendorTab, setVendorTab] = useState<string>('new');
  const [shopOpen, setShopOpen] = useState(true);
  const [night, setNight] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [drawerOrder, setDrawerOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [clock, setClock] = useState('—');
  const [wx, setWx] = useState('☀');
  const [eziMoodState, setEziMoodState] = useState<'calm'|'focused'|'happy'|'sleepy'>('calm');
  const [eziSay, setEziSay] = useState('Quiet bench. I\'ll keep the trays tidy.');
  const [earnedToday, setEarnedToday] = useState(1290);
  const [doneCount, setDoneCount] = useState(3);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    actionLabel: string;
    cancelLabel: string;
    isDestructive: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    actionLabel: '',
    cancelLabel: 'Cancel',
    isDestructive: false,
    onConfirm: () => {}
  });
  const [pickupPromptModal, setPickupPromptModal] = useState<{
    isOpen: boolean;
    orderId: string;
    studentName: string;
    pickupHint: string;
    value: string;
  }>({
    isOpen: false,
    orderId: '',
    studentName: '',
    pickupHint: '',
    value: '',
  });

  const triggerConfirm = (title: string, message: string, actionLabel: string, cancelLabel: string, isDestructive: boolean, onConfirm: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      actionLabel,
      cancelLabel,
      isDestructive,
      onConfirm
    });
  };

  const [mounted, setMounted] = useState(false);

  const [isEditingShop, setIsEditingShop] = useState(false);
  const [shopDetails, setShopDetails] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ezee_shop_details');
      if (stored) {
        try { return JSON.parse(stored); } catch { }
      }
    }
    return {
      id: 'WK-1024',
      name: 'Morning Star Press',
      email: 'morningstar@ezee.prints',
      college: 'Ezee Institute of Technology',
      joined: 'March 2026',
      location: 'Admin block'
    };
  });

  const saveShopDetails = (newDetails: typeof shopDetails) => {
    setShopDetails(newDetails);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ezee_shop_details', JSON.stringify(newDetails));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('night', night);
    }
  }, [night]);

  // Assign printing orders to stations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStations(prev => {
        const updated = prev.map(s => ({ ...s, job: null as string | null }));
        const printing = orders.filter(o => o.status === 'printing');
        printing.forEach((o, i) => {
          const s = updated[i % 3];
          if (s) { s.job = o.id; o.station = s.id; }
        });
        return updated;
      });
    }, 0);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inject global CSS once
  useEffect(() => {
    if (document.getElementById('ws-style')) return;
    const el = document.createElement('style');
    el.id = 'ws-style'; el.textContent = CSS;
    document.head.appendChild(el);
  }, []);

  // Clock tick
  useEffect(() => {
    const tick = () => {
      const d = new Date(), h = d.getHours();
      setClock(d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }));
      setWx(h >= 17 || h < 6 ? '🌙' : h >= 15 ? '🌤' : h < 8 ? '🌅' : '☀');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Progress loop
  useEffect(() => {
    const id = setInterval(() => {
      if (!shopOpen) return;
      setOrders(prev => {
        let changed = false;
        const updated = prev.map(o => {
          if (o.status !== 'printing') return o;
          changed = true;
          const newProgress = Math.min(1, o.progress + (o.id.endsWith('0') ? 0.06 : 0.045) + Math.random()*0.02);
          if (newProgress >= 1) {
            // Mark ready
            const pickup = mkPickup();
            addToast(`#${o.id} ready — code ${pickup}`, 'bell', 'good');
            setStations(prev2 => prev2.map(s => s.job === o.id ? { ...s, job: null } : s));
            setStock(prev2 => reclassStock(prev2.map((s, i) => {
              if (i === 0) return { ...s, v: Math.max(0.05, s.v - 0.01*o.copies) };
              if (i === 3 && o.mode === 'color') return { ...s, v: Math.max(0, s.v - 0.02) };
              return s;
            })));
            return { ...o, status: 'ready' as const, progress: 1, pickup };
          }
          return { ...o, progress: newProgress };
        });
        return changed ? updated : prev;
      });
    }, 1400);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopOpen]);

  // New order arrivals
  useEffect(() => {
    const id = setInterval(() => {
      if (!shopOpen) return;
      setOrders(prev => {
        if (prev.filter(o => o.status === 'new').length >= 6) return prev;
        const o = newOrder('new');
        setEziMoodState('focused');
        setEziSay(o.urgent ? `Rush order in — ${o.student.split(' ')[0]} needs it fast.` : `New slip from ${o.student.split(' ')[0]}.`);
        addToast(`New order #${o.id} from ${o.student}`, 'bell');
        return [...prev, o];
      });
    }, 22000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopOpen]);

  // Ezi mood
  useEffect(() => {
    const printing = orders.filter(o => o.status === 'printing').length;
    const waiting = orders.filter(o => o.status === 'new').length;
    const nextMood = !shopOpen ? 'sleepy' : (printing >= 2 || waiting >= 4) ? 'focused' : 'calm';
    const timer = setTimeout(() => {
      setEziMoodState(prev => prev === nextMood ? prev : nextMood);
    }, 0);
    return () => clearTimeout(timer);
  }, [orders, shopOpen]);

  const addToast = useCallback((msg: string, icon: string, kind = '') => {
    setToasts(prev => [...prev, { id: prev.length + 1, msg, icon, kind }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Actions
  function accept(id: string) {
    const freeStation = stations.find(s => !s.job);
    if (!freeStation) { addToast('All presses are busy — finish a run first', 'printer', 'warn'); return; }
    assignToStation(id, freeStation.id);
    closeDrawer();
  }

  function assignToStation(orderId: string, stationId: string) {
    const targetStation = stations.find(s => s.id === stationId);
    if (!targetStation) return;
    if (targetStation.job) {
      addToast(`${targetStation.name} is currently busy`, 'alert', 'warn');
      return;
    }
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'printing' as const, station: targetStation.id, progress: 0.02 } : o));
    setStations(prev => prev.map(s => s.id === targetStation.id ? { ...s, job: orderId } : s));
    addToast(`#${orderId} dropped on ${targetStation.name}`, 'play', 'good');
    setEziMoodState('focused');
  }

  function markReady(id: string) {
    const pickup = mkPickup();
    setOrders(prev => prev.map(o => {
      if (o.id !== id) return o;
      addToast(`#${o.id} ready — code ${pickup}`, 'bell', 'good');
      return { ...o, status: 'ready' as const, progress: 1, pickup };
    }));
    setStations(prev => prev.map(s => s.job === id ? { ...s, job: null } : s));
    closeDrawer();
  }

  function handOver(id: string, code: string) {
    const o = orders.find(x => x.id === id);
    if (!o) return false;
    if (code && code.toUpperCase() !== o.pickup) {
      addToast('Pickup code doesn\'t match', 'x', 'warn');
      return false;
    }
    setOrders(prev => prev.map(x => x.id === id ? { ...x, status: 'done' as const } : x));
    setEarnedToday(p => p + o.price);
    setDoneCount(p => p + 1);
    setEziMoodState('happy');
    setEziSay(`Handed #${id} to ${o.student.split(' ')[0]}. 🌱`);
    addToast(`Handed to ${o.student} · +₹${o.price}`, 'check', 'good');
    setActiveId(null); setDrawerOrder(null);
    return true;
  }

  function reject(id: string) {
    setOrders(prev => prev.filter(o => o.id !== id));
    addToast(`#${id} declined`, 'x', 'warn');
    setActiveId(null); setDrawerOrder(null);
  }

  function openDrawer(id: string) {
    const o = orders.find(x => x.id === id);
    if (!o) return;
    setActiveId(id); setDrawerOrder(o);
  }

  function closeDrawer() { setActiveId(null); setDrawerOrder(null); }

  // EZI lines
  const eziLines: Record<string, string[]> = {
    calm: ["Quiet bench. I'll keep the trays tidy.", "Three slips waiting. No rush — they're paid.", "Coffee's still warm. We're in good shape."],
    focused: ["Veteran's mid-run. I'll flag jams.", "Steady now — Speedster's flying.", "Heads down. We'll clear this by close."],
    happy: ["Handed over. Another one home.", "That thesis is off to graduation. 🌱", "Pickup matched. Nice work."],
    sleepy: ["Shop's shut. I'll dim the lamps.", "Resting the presses. See you at open.", "Goodnight, bench."],
  };

  const eziSayText = eziSay || eziLines[eziMoodState]?.[0] || '';

  const navItems = [
    ['bench', 'The Workbench', 'queue'],
    ['printer', 'Stations', 'stations'],
    ['stock', 'Stock room', 'stock'],
    ['coin', 'Earnings', 'earnings'],
    ['star', 'Reviews', 'reviews'],
    ['gear', 'Shop settings', 'settings'],
  ];

  const TITLES: Record<string, [string, string]> = {
    queue: ['The Workbench', 'Everything waiting, printing, and ready — on one bench.'],
    stations: ['Stations', 'Your three presses and what each is running.'],
    stock: ['Stock room', 'Paper, toner, ink and coils at a glance.'],
    earnings: ['Earnings', 'What came in today, and what settles to you.'],
    reviews: ['Reviews', 'What students say after pickup.'],
    settings: ['Shop settings', 'Hours, services, and pricing.'],
  };
  const [pageTitle, pageSub] = TITLES[section] || TITLES.queue;

  const counts = {
    new: orders.filter(o => o.status === 'new').length,
    printing: orders.filter(o => o.status === 'printing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    done: orders.filter(o => o.status === 'done').length,
  };

  // ── Render helpers ──────────────────────────────────────────────────────────
  function Stat({ label, big, unit, color, trail }: { label: string; big: string; unit?: string; color: string; trail: string }) {
    return (
      <div className="ws-stat">
        <div className="ws-edge" style={{ background: color }} />
        <div className="label">{label}</div>
        <div className="big">{big}{unit && <small>{unit}</small>}</div>
        <div className="trail">{trail}</div>
      </div>
    );
  }

  function StatusStamp({ o }: { o: Order }) {
    if (o.status === 'new') return o.urgent
      ? <span className="ws-stamp s-urgent">Rush · New</span>
      : <span className="ws-stamp s-new">New</span>;
    if (o.status === 'printing') return <span className="ws-stamp s-printing">Printing</span>;
    if (o.status === 'ready') return <span className="ws-stamp s-ready">Ready</span>;
    return <span className="ws-stamp s-done">Picked up</span>;
  }

  function PrimaryAction({ o }: { o: Order }) {
    if (o.status === 'new') return (
      <button className={`ws-btn sm ${o.urgent ? 'terra' : 'primary'}`}
        onClick={e => { e.stopPropagation(); accept(o.id); }}>
        <Ic name="play" size={15} /> Accept &amp; print
      </button>
    );
    if (o.status === 'printing') return (
      <button className="ws-btn sm sage" onClick={e => { e.stopPropagation(); markReady(o.id); }}>
        <Ic name="check" size={15} /> Mark ready
      </button>
    );
    if (o.status === 'ready') return (
      <button className="ws-btn sm brass" onClick={e => { e.stopPropagation(); openDrawer(o.id); }}>
        <Ic name="hand" size={15} /> Hand over
      </button>
    );
    return <span className="ws-label" style={{ color: 'var(--ink-3)' }}>Done</span>;
  }

  function Docket({ o }: { o: Order }) {
    const isUrgentNew = o.status === 'new' && o.urgent;
    return (
      <article
        className={`ws-docket${isUrgentNew ? ' urgent-card' : ''}${activeId === o.id ? ' sel' : ''}`}
        draggable={o.status === 'new'}
        onDragStart={(e) => {
          e.dataTransfer.setData('text/plain', o.id);
          e.dataTransfer.effectAllowed = 'move';
          e.currentTarget.style.opacity = '0.5';
        }}
        onDragEnd={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onClick={() => openDrawer(o.id)}>
        <div className="ws-stub">
          <span className="hole t" />
          <span className="hole b" />
          <span className="code">#{o.id}</span>
        </div>
        <StatusStamp o={o} />
        <div className="ws-dbody">
          <div className="ws-drow1">
            <span className="ws-dtitle">{o.title}</span>
            {o.mode === 'color' && <span className="ws-tag color">Colour</span>}
            {isUrgentNew && (
              <span className="ws-tag urgent">
                <Ic name="flame" size={12} /> Rush
              </span>
            )}
          </div>
          <div className="ws-dwho">for <b>{o.student}</b></div>
          <div className="ws-dspec">
            {o.pages}pp <span className="x">·</span> {o.mode === 'color' ? 'Colour' : 'B/W'} <span className="x">·</span> {BIND_LABEL[o.binding]} <span className="x">·</span> ×{o.copies}
          </div>
          <div className="ws-dmeta">
            <span className="ws-pay paid">Paid</span>
            <span>{o.status === 'done' ? 'collected' : `waiting ${waited(o)}`}</span>
            {o.status === 'printing' && <span className="mono" style={{ fontFamily: 'Space Grotesk' }}>{Math.round(o.progress * 100)}%</span>}
            {o.status === 'ready' && <span className="mono" style={{ fontFamily: 'Space Grotesk' }}>code {o.pickup}</span>}
          </div>
        </div>
        <div className="ws-dact">
          <span className="ws-price">₹{o.price}</span>
          <PrimaryAction o={o} />
        </div>
      </article>
    );
  }

  function StationsPanel() {
    return (
      <div className="ws-panel">
        <h3>Stations</h3>
        <div className="ws-pbody">
          {stations.map(s => {
            const job = s.job ? orders.find(o => o.id === s.job) : null;
            return (
              <div 
                key={s.id} 
                className={`ws-station${job ? ' busy' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault(); // Necessary to allow dropping
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const orderId = e.dataTransfer.getData('text/plain');
                  if (orderId) assignToStation(orderId, s.id);
                }}
              >
                <div className="ws-st-icon"><Ic name="printer" size={16} /></div>
                <div className="ws-st-main">
                  <div className="ws-st-name">{s.name}</div>
                  {job ? (
                    <>
                      <div className="ws-st-job">#{job.id} · {job.title}</div>
                      <div className="ws-bar"><i style={{ width: `${Math.round(job.progress*100)}%` }} /></div>
                    </>
                  ) : (
                    <div className="ws-st-idle">Idle · {s.sub}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function StockPanel() {
    const crit = stock.find(s => s.cls === 'crit');
    return (
      <div className="ws-panel">
        <h3>Stock room</h3>
        <div className="ws-pbody">
          {stock.map(s => (
            <div key={s.nm} className="ws-stock-row">
              <span className="nm">{s.nm}</span>
              <div className={`ws-bar ${s.cls}`}><i style={{ width: `${Math.round(s.v*100)}%` }} /></div>
              <span className="v">{Math.round(s.v*100)}%</span>
            </div>
          ))}
          {crit && (
            <div className="ws-stock-warn">
              <Ic name="alert" size={16} />
              <span><b>{crit.nm}</b> is running low. Colour jobs may stall — reorder before the afternoon rush.</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderQueueView() {
    const list = orders.filter(o => o.status === vendorTab)
      .sort((a, b) => (Number(b.urgent) - Number(a.urgent)) || (a.createdAt - b.createdAt));
    return (
      <>
        <div className="ws-stats">
          <Stat label="In the queue" big={String(counts.new)} color="var(--plum)" trail={counts.new ? `oldest waiting ${waited(orders.filter(o=>o.status==='new').sort((a,b)=>a.createdAt-b.createdAt)[0]||{createdAt:0} as Order)}` : 'all clear'} />
          <Stat label="On the presses" big={String(counts.printing)} color="var(--brass)" trail={`${counts.printing} of 3 stations busy`} />
          <Stat label="Ready for pickup" big={String(counts.ready)} color="var(--sage)" trail={counts.ready ? 'shelf is filling' : 'shelf empty'} />
          <Stat label="Earned today" big={`₹${earnedToday.toLocaleString('en-IN')}`} color="var(--ink)" trail={`${doneCount} orders handed over`} />
        </div>
        <div className="ws-work">
          <div>
            <div className="ws-tabs">
              {(['new','printing','ready','done'] as const).map(k => (
                <button key={k} className={`ws-tab${vendorTab===k?' on':''}`} onClick={() => setVendorTab(k)}>
                  {k==='done'?'Picked up':k.charAt(0).toUpperCase()+k.slice(1)}
                  <span className="pill">{counts[k]}</span>
                </button>
              ))}
            </div>
            {list.length ? (
              <Reorder.Group 
                axis="y" 
                values={list} 
                onReorder={(newOrder) => {
                  const otherOrders = orders.filter(o => o.status !== vendorTab);
                  setOrders([...newOrder, ...otherOrders]);
                }} 
                className="ws-queue" 
                style={{ listStyle: 'none', padding: 0, margin: 0 }}
              >
                {list.map(o => (
                  <Reorder.Item key={o.id} value={o} style={{ position: 'relative' }}>
                    <Docket o={o} />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            ) : (
              <div className="ws-empty">
                <Ic name="bench" size={54} />
                <b>{vendorTab==='new'?'Nothing waiting':vendorTab==='printing'?'No active runs':vendorTab==='ready'?'Shelf is empty':'Nothing collected yet'}</b>
                {vendorTab==='new'?'New orders land here with a soft chime.':vendorTab==='printing'?'Accept an order to put it on a press.':vendorTab==='ready'?'Finished jobs wait here for pickup.':'Handed-over orders are archived here.'}
              </div>
            )}
          </div>
          <div className="ws-side">
            <StationsPanel />
            <StockPanel />
          </div>
        </div>
      </>
    );
  }

  function renderStationsPage() {
    return (
      <div className="ws-ledger">
        <div className="ws-ledger-head"><h3>Presses</h3></div>
        <div style={{ padding: '6px 17px 14px' }}>
          {stations.map(s => {
            const job = s.job ? orders.find(o => o.id === s.job) : null;
            return (
              <div 
                key={s.id} 
                className={`ws-station${job?' busy':''}`} 
                style={{ padding: '16px 0' }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const orderId = e.dataTransfer.getData('text/plain');
                  if (orderId) assignToStation(orderId, s.id);
                }}
              >
                <div className="ws-st-icon" style={{ width: 44, height: 44 }}><Ic name="printer" size={20} /></div>
                <div className="ws-st-main">
                  <div className="ws-st-name" style={{ fontSize: 15 }}>{s.name}</div>
                  {job ? (
                    <>
                      <div className="ws-st-job">Running #{job.id} — {job.title} · {job.pages}pp ×{job.copies}</div>
                      <div className="ws-bar"><i style={{ width: `${Math.round(job.progress*100)}%` }} /></div>
                    </>
                  ) : (
                    <div className="ws-st-idle">Idle and ready · {s.sub}</div>
                  )}
                </div>
                <span className={`ws-badge ${job?'pend':'ok'}`}><span className="d" />{job?'Busy':'Free'}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function renderStockPage() {
    return (
      <div className="ws-ledger">
        <div className="ws-ledger-head">
          <h3>Stock room</h3><div style={{ flex: 1 }} />
          <button className="ws-btn ghost sm"><Ic name="box" size={15} /> Log a delivery</button>
        </div>
        <table className="ws-table">
          <thead><tr><th>Item</th><th>Level</th><th>Status</th><th /></tr></thead>
          <tbody>
            {stock.map(s => (
              <tr key={s.nm}>
                <td><b style={{ fontFamily: 'Space Grotesk' }}>{s.nm}</b></td>
                <td style={{ width: 200 }}><div className={`ws-bar ${s.cls}`} style={{ width: 160 }}><i style={{ width: `${Math.round(s.v*100)}%` }} /></div></td>
                <td><span className={`ws-badge ${s.cls==='ok'?'ok':s.cls==='low'?'pend':'susp'}`}><span className="d" />{s.cls==='ok'?'Healthy':s.cls==='low'?'Low':'Critical'}</span></td>
                <td className="ws-rowact"><button className="ws-btn ghost sm">Reorder</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderEarningsPage() {
    return (
      <>
        <div className="ws-stats">
          <Stat label="Today" big={`₹${earnedToday.toLocaleString('en-IN')}`} color="var(--sage)" trail={`${doneCount} orders`} />
          <Stat label="This week" big="₹9,640" color="var(--ink)" trail="+12% vs last" />
          <Stat label="Next payout" big="₹8,676" color="var(--brass)" trail="settles Friday" />
        </div>
        <div className="ws-ledger">
          <div className="ws-ledger-head"><h3>Recent settlements</h3></div>
          <table className="ws-table">
            <thead><tr><th>Date</th><th>Orders</th><th>Gross</th><th>Fee</th><th>Net to you</th><th>Status</th></tr></thead>
            <tbody>
              {[['Fri 13 Jun','38','₹9,210','₹921','₹8,289'],['Fri 6 Jun','41','₹10,040','₹1,004','₹9,036'],['Fri 30 May','29','₹6,720','₹672','₹6,048']].map(r => (
                <tr key={r[0]}><td className="mono">{r[0]}</td><td>{r[1]}</td><td className="mono">{r[2]}</td>
                  <td className="mono" style={{ color: 'var(--ink-3)' }}>{r[3]}</td><td className="mono"><b>{r[4]}</b></td>
                  <td><span className="ws-badge ok"><span className="d" />Settled</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function renderReviewsPage() {
    const revs = [
      ['Sneha Rao', 5, 'Resume printed in 10 minutes, crisp colour. Lifesaver before the interview.'],
      ['Rahul Menon', 5, 'Lab record binding was neat. Will come back.'],
      ['Karthik B', 4, 'Slight wait during the rush but quality was great.'],
    ];
    return (
      <>
        <div className="ws-stats">
          <Stat label="Rating" big="4.8" unit="/5" color="var(--brass)" trail="from 214 pickups" />
          <Stat label="This month" big="46" color="var(--sage)" trail="reviews" />
          <Stat label="Reply rate" big="92%" color="var(--ink)" trail="keep it up" />
          <Stat label="Repeat students" big="61%" color="var(--plum)" trail="came back" />
        </div>
        <div className="ws-ledger">
          <div className="ws-ledger-head"><h3>Latest reviews</h3></div>
          <div style={{ padding: '4px 17px 8px' }}>
            {revs.map(r => (
              <div key={r[0] as string} className="ws-tick">
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--plum)', display: 'grid', placeItems: 'center', fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 12, color: '#fff', flexShrink: 0 }}>
                  {(r[0] as string).split(' ').map(x => x[0]).join('')}
                </div>
                <div className="tk-main">
                  <b>{r[0]} <span style={{ color: 'var(--brass)' }}>{'★'.repeat(r[1] as number)}</span></b>
                  <small style={{ fontSize: 13, color: 'var(--ink-2)' }}>{r[2]}</small>
                </div>
                <button className="ws-btn ghost sm">Reply</button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  function renderSettingsPage() {
    return (
      <div className="ws-two-col">
        <div>
          {/* Shop Information */}
          <div className="ws-ledger" style={{ marginBottom: '18px' }}>
            <div className="ws-ledger-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Shop Information</h3>
              <button 
                onClick={() => {
                  if (isEditingShop) {
                    saveShopDetails(shopDetails);
                  }
                  setIsEditingShop(!isEditingShop);
                }} 
                style={{ fontSize: '13px', color: 'var(--terracotta)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {isEditingShop ? 'Save' : 'Edit'}
              </button>
            </div>
            <div style={{ padding: '14px 17px' }}>
              {isEditingShop ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', fontFamily: 'Space Grotesk' }}>Shop Name</label>
                    <input 
                      type="text" 
                      value={shopDetails.name} 
                      onChange={e => setShopDetails({ ...shopDetails, name: e.target.value })}
                      style={{ padding: '8px', border: '1px solid var(--paper-edge)', borderRadius: '6px', fontSize: '13px', background: '#fff', color: 'var(--ink)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', fontFamily: 'Space Grotesk' }}>Partner Email</label>
                    <input 
                      type="email" 
                      value={shopDetails.email} 
                      onChange={e => setShopDetails({ ...shopDetails, email: e.target.value })}
                      style={{ padding: '8px', border: '1px solid var(--paper-edge)', borderRadius: '6px', fontSize: '13px', background: '#fff', color: 'var(--ink)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', fontFamily: 'Space Grotesk' }}>Location</label>
                    <input 
                      type="text" 
                      value={shopDetails.location || ''} 
                      onChange={e => setShopDetails({ ...shopDetails, location: e.target.value })}
                      style={{ padding: '8px', border: '1px solid var(--paper-edge)', borderRadius: '6px', fontSize: '13px', background: '#fff', color: 'var(--ink)', outline: 'none' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="ws-kv">
                  <span className="k">Shop ID</span>
                  <span className="v mono" style={{ fontFamily: 'Space Grotesk' }}>{shopDetails.id}</span>
                  <span className="k">Shop Name</span>
                  <span className="v">{shopDetails.name}</span>
                  <span className="k">Email</span>
                  <span className="v">{shopDetails.email}</span>
                  <span className="k">College</span>
                  <span className="v">{shopDetails.college}</span>
                  <span className="k">Joined</span>
                  <span className="v">{shopDetails.joined}</span>
                  <span className="k">Location</span>
                  <span className="v">{shopDetails.location || 'Admin block'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Hours & Status */}
          <div className="ws-ledger" style={{ marginBottom: '18px' }}>
            <div className="ws-ledger-head"><h3>Hours &amp; status</h3></div>
            <div style={{ padding: '14px 17px' }}>
              {[['Accept new orders', true], ['Auto-assign to free press', true], ['Pause colour jobs (ink low)', false]].map(([label, on]) => (
                <div key={label as string} className="ws-toggle">
                  <span>{label as string}</span>
                  <button className={`ws-sw${on ? ' on' : ''}`} onClick={e => (e.currentTarget as HTMLButtonElement).classList.toggle('on')} />
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="ws-ledger" style={{ marginBottom: '18px' }}>
            <div className="ws-ledger-head"><h3>Pricing</h3></div>
            <table className="ws-table"><tbody>
              <tr><td>B/W per page</td><td className="ws-rowact"><span className="mono" style={{ fontFamily: 'Space Grotesk' }}>₹1.20</span></td></tr>
              <tr><td>Colour per page</td><td className="ws-rowact"><span className="mono" style={{ fontFamily: 'Space Grotesk' }}>₹5.00</span></td></tr>
              <tr><td>Spiral binding</td><td className="ws-rowact"><span className="mono" style={{ fontFamily: 'Space Grotesk' }}>₹35</span></td></tr>
              <tr><td>Soft binding</td><td className="ws-rowact"><span className="mono" style={{ fontFamily: 'Space Grotesk' }}>₹80</span></td></tr>
            </tbody></table>
          </div>

          {/* Support & Help */}
          <div className="ws-ledger" style={{ marginBottom: '18px' }}>
            <div className="ws-ledger-head"><h3>Support & Help</h3></div>
            <div style={{ padding: '14px 17px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={() => window.open('mailto:help@ezee.edu', '_blank')}
                style={{ width: '100%', padding: '12px', background: night ? 'rgba(255, 255, 255, 0.08)' : '#f5efe7', border: night ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--paper-edge)', borderRadius: '8px', color: night ? '#FAF7F1' : '#232221', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '13.5px' }}
              >
                💡 Help Center
              </button>
              <button 
                onClick={() => window.open('mailto:support@ezee.edu', '_blank')}
                style={{ width: '100%', padding: '12px', background: night ? 'rgba(255, 255, 255, 0.08)' : '#f5efe7', border: night ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--paper-edge)', borderRadius: '8px', color: night ? '#FAF7F1' : '#232221', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '13.5px' }}
              >
                🎧 Contact Support
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="ws-ledger">
            <div className="ws-ledger-head"><h3>Account Actions</h3></div>
            <div style={{ padding: '14px 17px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={() => {
                  triggerConfirm(
                    'Sign Out',
                    'Are you sure you want to sign out from the workshop?',
                    'Yes, logout',
                    'Stay here',
                    false,
                    () => {
                      document.cookie = "ezee_vendor_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      window.location.href = '/workshop/login';
                    }
                  );
                }}
                 style={{ width: '100%', padding: '12px', background: night ? 'rgba(255, 255, 255, 0.08)' : '#f5efe7', border: night ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--paper-edge)', borderRadius: '8px', color: night ? '#FAF7F1' : '#232221', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '13.5px' }}
              >
                🚪 Sign Out
              </button>
              <button 
                onClick={() => {
                  triggerConfirm(
                    'Delete Account',
                    'Are you sure you want to permanently delete this shop workshop account? This cannot be undone.',
                    'Delete everything',
                    'Keep my memories',
                    true,
                    () => {
                      document.cookie = "ezee_vendor_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      window.location.href = '/workshop/login';
                    }
                  );
                }}
                style={{ width: '100%', padding: '12px', background: night ? 'rgba(255, 99, 99, 0.12)' : 'rgba(155, 44, 44, 0.08)', border: night ? '1px solid rgba(255, 99, 99, 0.35)' : '1px solid rgba(155, 44, 44, 0.25)', borderRadius: '8px', color: night ? '#ff8b8b' : 'var(--crimson)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '13.5px' }}
              >
                🗑️ Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="ws-owl-card">
          <div className="ws-label" style={{ color: 'rgba(250,247,241,.55)' }}>Ezi&apos;s note</div>
          <div className="ws-insight">Your colour ink is at <b>18%</b>. Three colour jobs are queued today — consider pausing colour or reordering so nothing stalls mid-run.</div>
        </div>
      </div>
    );
  }

  function renderDrawerContent() {
    if (!drawerOrder) return null;
    const o = drawerOrder;
    const per = o.mode === 'color' ? 5 : 1.2;
    const bind = { none: 0, staple: 5, spiral: 35, softbound: 80 }[o.binding];
    const printCost = Math.round(o.pages*per*o.copies);
    const bindCost = bind * o.copies;
    const steps = [
      ['Order placed', true, fmtAgo(o.createdAt)],
      ['Accepted by shop', o.status !== 'new', o.status !== 'new' ? 'on a press' : ''],
      ['Printed & finished', o.status === 'ready' || o.status === 'done', (o.status === 'ready' || o.status === 'done') ? 'on the shelf' : ''],
      ['Handed over', o.status === 'done', o.status === 'done' ? 'collected' : ''],
    ];

    function Footer() {
      if (o.status === 'new') return (
        <>
          <button className="ws-btn ghost" onClick={() => reject(o.id)}><Ic name="x" size={15} /> Decline</button>
          <button className={`ws-btn ${o.urgent?'terra':'primary'}`} onClick={() => accept(o.id)}><Ic name="play" size={15} /> Accept &amp; print</button>
        </>
      );
      if (o.status === 'printing') return (
        <>
          <button className="ws-btn ghost" onClick={closeDrawer}>Keep printing</button>
          <button className="ws-btn sage" onClick={() => markReady(o.id)}><Ic name="check" size={15} /> Mark ready</button>
        </>
      );
      if (o.status === 'ready') return (
        <>
          <button className="ws-btn ghost" onClick={closeDrawer}>Close</button>
          <button className="ws-btn brass" onClick={() => {
            setPickupPromptModal({
              isOpen: true,
              orderId: o.id,
              studentName: o.student.split(' ')[0],
              pickupHint: o.pickup || '',
              value: '',
            });
          }}><Ic name="hand" size={15} /> Confirm pickup</button>
        </>
      );
      return <button className="ws-btn ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={closeDrawer}>Close</button>;
    }

    return (
      <>
        <div className="ws-drawer-head">
          <div>
            <div className="ws-label">Order #{o.id}</div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: 19, fontWeight: 600, letterSpacing: '-.025em', marginTop: 3 }}>{o.title}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>for {o.student}</div>
          </div>
          <button className="xbtn" onClick={closeDrawer}><Ic name="x" size={17} /></button>
        </div>
        <div className="ws-drawer-body">
          {o.status === 'ready' && (
            <div className="ws-pickup">
              <div className="lbl">
                <div className="ws-label" style={{ color: 'var(--sage)' }}>Pickup code</div>
                <small style={{ color: 'var(--sage)', fontWeight: 600 }}>read it back from the student</small>
              </div>
              <div className="pc">{o.pickup}</div>
            </div>
          )}
          <div className="ws-doc-preview">
            <div className="ws-doc"><i /><i /><i /><i style={{ width: '80%' }} /><i style={{ width: '65%' }} /></div>
          </div>
          <div className="ws-kv">
            <span className="k">Student</span><span className="v">{o.student}</span>
            <span className="k">Pages</span><span className="v">{o.pages} pages</span>
            <span className="k">Colour</span><span className="v">{o.mode === 'color' ? 'Full colour' : 'Black & white'}</span>
            <span className="k">Binding</span><span className="v" style={{ textTransform: 'capitalize' }}>{BIND_LABEL[o.binding]}</span>
            <span className="k">Copies</span><span className="v">×{o.copies}</span>
            <span className="k">Payment</span><span className="v">Paid online</span>
          </div>
          <div className="ws-bill">
            <div className="ln"><span>Printing ({o.pages}pp {o.mode==='color'?'colour':'b/w'} ×{o.copies})</span><span className="mono" style={{ fontFamily: 'Space Grotesk' }}>₹{printCost}</span></div>
            {bindCost > 0 && <div className="ln"><span>Binding</span><span className="mono" style={{ fontFamily: 'Space Grotesk' }}>₹{bindCost}</span></div>}
            <div className="ln tot"><span>Total</span><span>₹{o.price}</span></div>
          </div>
          <div>
            <div className="ws-label" style={{ marginBottom: 10 }}>Timeline</div>
            <div className="ws-timeline">
              {steps.map(([label, done, note]) => (
                <div key={label as string} className={`ws-tl${done?' done':''}`}>
                  <span className="dot" />
                  <div className="ttext">
                    <b>{label as string}</b>
                    {note && <small>{note as string}</small>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ws-drawer-foot"><Footer /></div>
      </>
    );
  }

  function toggleOpen() {
    setShopOpen(p => {
      const next = !p;
      addToast(next ? 'Shop is open — accepting orders' : 'Shop closed — Ezi is resting', next ? 'bench' : 'clock');
      return next;
    });
  }

  // ── Render ────────────────────────────────────────────────────────────────
  if (!mounted) return (
    <div className="ws-root" style={{ opacity: 0.6, pointerEvents: 'none', animation: 'ws-breathe 2s infinite' }}>
      <div className="ws-app">
        <aside className="ws-rail" style={{ padding: '22px 16px' }}>
          <div style={{ height: 34, width: 120, background: 'rgba(42,41,40,.08)', borderRadius: 10, marginBottom: 20 }} />
          <div style={{ height: 120, width: '100%', background: 'rgba(42,41,40,.05)', borderRadius: 14, marginBottom: 20 }} />
          <div style={{ height: 34, width: '100%', background: 'rgba(42,41,40,.05)', borderRadius: 10, marginBottom: 8 }} />
          <div style={{ height: 34, width: '100%', background: 'rgba(42,41,40,.05)', borderRadius: 10, marginBottom: 8 }} />
        </aside>
        <main className="ws-main">
          <div className="ws-topbar" style={{ height: 73 }}>
            <div style={{ height: 24, width: 200, background: 'rgba(42,41,40,.08)', borderRadius: 6 }} />
          </div>
          <div className="ws-canvas" style={{ padding: '22px 26px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
              <div style={{ height: 80, background: 'rgba(42,41,40,.05)', borderRadius: 14 }} />
              <div style={{ height: 80, background: 'rgba(42,41,40,.05)', borderRadius: 14 }} />
              <div style={{ height: 80, background: 'rgba(42,41,40,.05)', borderRadius: 14 }} />
              <div style={{ height: 80, background: 'rgba(42,41,40,.05)', borderRadius: 14 }} />
            </div>
            <div style={{ height: 400, width: '100%', background: 'rgba(42,41,40,.03)', borderRadius: 14 }} />
          </div>
        </main>
      </div>
    </div>
  );

  return (
    <div className={`ws-root ${night ? 'night' : ''}`}>
      <div className="ws-grain" />
      <div className={`ws-app ${isMenuOpen ? '' : 'ws-closed'}`}>
        {/* RAIL */}
        <aside className="ws-rail">
          <div className="ws-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '4px 8px 14px' }}>
            <button 
              onClick={() => { if (!isMenuOpen) setIsMenuOpen(true); }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: !isMenuOpen ? 'pointer' : 'default', border: 'none', background: 'none', padding: 0 }}
              aria-label="Workshop Brand"
              disabled={isMenuOpen}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Ezee Logo" style={{ height: 34, width: 'auto', objectFit: 'contain', borderRadius: '22%' }} />
              <div><small>Workshop</small></div>
            </button>
            {isMenuOpen && (
              <button 
                onClick={() => setIsMenuOpen(false)}
                style={{ padding: '4px', cursor: 'pointer', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'none' }}
                aria-label="Close sidebar"
              >
                <Ic name="x" size={20} />
              </button>
            )}
          </div>

          <div className="ws-ezi-card">
            <div className="ws-ezi-glow" />
            <div className="ws-ezi-breathe" dangerouslySetInnerHTML={{ __html: eziSVG(eziMoodState, night) }} />
            <div className="ws-ezi-say">{eziSayText}</div>
          </div>

          <nav className="ws-nav">
            {navItems.map(([ic, label, key]) => (
              <button key={key} className={section === key ? 'on' : ''} onClick={() => setSection(key)}>
                <span className="ic"><Ic name={ic} /></span>
                <span>{label}</span>
                {key === 'queue' && <span className="ws-count">{counts.new}</span>}
              </button>
            ))}
          </nav>

          <div style={{ flex: 1 }} />
        </aside>

        {/* MAIN */}
        <main className="ws-main">
          <div className="ws-topbar">
            <div>
              <h1>{pageTitle}</h1>
              <div className="ws-sub">{pageSub}</div>
            </div>
            <div style={{ flex: 1 }} />
            <div className="ws-clockchip">
              <span>{wx}</span>
              <span className="mono">{clock}</span>
            </div>
            {/* Shop status toggle */}
            <div className="ws-clockchip" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 12px' }}>
              <span style={{ fontWeight: 600, color: 'var(--ink)', fontFamily: 'Space Grotesk' }}>Shop Status</span>
              <button className={`ws-sw${shopOpen ? ' on' : ''}`} onClick={toggleOpen} aria-label="Toggle shop status" />
              <span style={{ minWidth: '28px', fontSize: '12px', fontWeight: 700, color: shopOpen ? 'var(--sage)' : 'var(--ink-3)', fontFamily: 'Space Grotesk' }}>
                {shopOpen ? 'ON' : 'OFF'}
              </span>
            </div>
            {/* Lamp (night toggle) */}
            <button
              className="ws-btn icon-only"
              style={{ 
                position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                cursor: 'pointer', padding: '6px', borderRadius: '50%', border: 'none', background: 'none',
                width: '34px', height: '34px', color: 'var(--ink)'
              }}
              title="Lamp"
              onClick={() => {
                const next = !night;
                setNight(next);
                addToast(next ? 'Lamp on. The workshop goes golden.' : 'Lamp off. Daylight it is.', 'clock');
              }}
            >
              <span 
                style={{ 
                  position: 'absolute', inset: 0, borderRadius: '50%', 
                  background: 'radial-gradient(circle, rgba(212, 175, 55, .45), transparent 70%)', 
                  opacity: night ? 1 : 0, transition: 'opacity 0.8s ease', pointerEvents: 'none' 
                }} 
              />
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M8 3h8l3 8H5l3-8zM12 11v7M8 21h8" />
              </svg>
            </button>

            {/* Profile Avatar Button */}
            <div 
              className="ws-avatar"
              onClick={() => setSection('settings')}
              style={{ 
                width: '34px', height: '34px', borderRadius: '50%', 
                background: 'var(--plum)', color: '#FAF7F1', 
                display: 'grid', placeItems: 'center', cursor: 'pointer', 
                fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px',
                boxShadow: 'var(--rest)', marginLeft: '4px'
              }}
              title="Shop Settings"
            >
              {shopDetails.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="ws-canvas">
            {section === 'queue' && renderQueueView()}
            {section === 'stations' && renderStationsPage()}
            {section === 'stock' && renderStockPage()}
            {section === 'earnings' && renderEarningsPage()}
            {section === 'reviews' && renderReviewsPage()}
            {section === 'settings' && renderSettingsPage()}
          </div>
        </main>
      </div>

      {/* Scrim */}
      <div className={`ws-scrim${drawerOrder ? ' on' : ''}`} onClick={closeDrawer} />

      {/* Drawer */}
      <aside className={`ws-drawer${drawerOrder ? ' on' : ''}`}>
        {renderDrawerContent()}
      </aside>

      {/* Toasts */}
      <div className="ws-toasts">
        {toasts.map(t => <ToastEl key={t.id} t={t} onRemove={removeToast} />)}
      </div>

      {/* Custom Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="ws-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setConfirmModal(prev => ({ ...prev, isOpen: false })); }}>
          <div className="ws-modal-card">
            <h3 className="ws-modal-title">{confirmModal.title}</h3>
            <p className="ws-modal-message">{confirmModal.message}</p>
            <div className="ws-modal-actions">
              <button className="ws-modal-btn cancel" onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}>{confirmModal.cancelLabel}</button>
              <button 
                className={`ws-modal-btn confirm ${confirmModal.isDestructive ? 'destructive' : 'primary'}`} 
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal(prev => ({ ...prev, isOpen: false }));
                }}
              >
                {confirmModal.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Custom Pickup Prompt Modal */}
      {pickupPromptModal.isOpen && (
        <div 
          className="ws-modal-overlay" 
          onClick={e => { if (e.target === e.currentTarget) setPickupPromptModal(prev => ({ ...prev, isOpen: false })); }}
        >
          <div className="ws-modal-card" style={{ maxWidth: 420 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: night ? 'rgba(212, 175, 55, 0.18)' : 'rgba(184, 145, 46, 0.14)',
                color: 'var(--brass)', display: 'grid', placeItems: 'center',
                fontSize: 20, flexShrink: 0
              }}>
                <Ic name="hand" size={20} />
              </div>
              <div>
                <h3 className="ws-modal-title" style={{ margin: 0, fontSize: 18 }}>Confirm Pickup</h3>
                <p className="ws-modal-message" style={{ margin: '2px 0 0', fontSize: 13.5 }}>
                  Ask <b>{pickupPromptModal.studentName}</b> for their pickup code:
                </p>
              </div>
            </div>

            <div style={{
              background: night ? 'rgba(255, 255, 255, 0.05)' : 'rgba(42, 41, 40, 0.04)',
              border: night ? '1px solid rgba(255,255,255,0.08)' : '1px solid var(--paper-edge)',
              padding: '10px 14px', borderRadius: 8,
              fontSize: 13, color: 'var(--brass)', fontFamily: 'Space Grotesk',
              fontWeight: 600, margin: '14px 0 16px'
            }}>
              💡 (hint: {pickupPromptModal.pickupHint})
            </div>

            <form onSubmit={e => {
              e.preventDefault();
              if (pickupPromptModal.value.trim()) {
                const ok = handOver(pickupPromptModal.orderId, pickupPromptModal.value.trim());
                if (ok !== false) {
                  setPickupPromptModal(prev => ({ ...prev, isOpen: false }));
                }
              }
            }}>
              <input
                type="text"
                autoFocus
                placeholder="e.g. C44"
                value={pickupPromptModal.value}
                onChange={e => setPickupPromptModal(prev => ({ ...prev, value: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 9,
                  border: night ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--paper-edge)',
                  background: night ? 'rgba(0,0,0,0.25)' : '#fff',
                  color: night ? '#FAF7F1' : '#2A2928',
                  fontFamily: 'Space Grotesk',
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  outline: 'none',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
                  marginBottom: 18
                }}
              />

              <div className="ws-modal-actions">
                <button 
                  type="button" 
                  className="ws-modal-btn cancel" 
                  onClick={() => setPickupPromptModal(prev => ({ ...prev, isOpen: false }))}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="ws-modal-btn confirm primary"
                  disabled={!pickupPromptModal.value.trim()}
                  style={{
                    opacity: !pickupPromptModal.value.trim() ? 0.6 : 1,
                    cursor: !pickupPromptModal.value.trim() ? 'not-allowed' : 'pointer'
                  }}
                >
                  Verify &amp; Hand Over
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
