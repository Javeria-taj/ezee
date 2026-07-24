'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

/* ───────────────────────────────────────────────
   EZEE UNIVERSE — Observatory (Admin) Dashboard
   Ported 1:1 from ezee-workbench-prototype.html
   Login page is untouched — this is the post-auth view.
─────────────────────────────────────────────── */

// ── Icon helper ───────────────────────────────────────────────────────────────
const ICONS: Record<string, string> = {
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z',
  printer: 'M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 14h12v8H6z',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2M5 5h14l3 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z',
  card: 'M2 7h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 11h20',
  ticket: 'M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4zM12 7v10',
  scroll: 'M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12M16 3h2a2 2 0 0 1 2 2v3M8 7h8M8 11h8M8 15h5',
  check: 'M20 6L9 17l-5-5',
  x: 'M18 6L6 18M6 6l12 12',
  menu: 'M3 12h18M3 6h18M3 18h18',
  shield: 'M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  coin: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
};

function Ic({ name, size = 18 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0 }}>
      <path d={ICONS[name] || ''} />
    </svg>
  );
}

// ── Owl SVG ───────────────────────────────────────────────────────────────────
const owlSVG = `<svg viewBox="0 0 100 100" width="96" height="96">
  <g>
    <path d="M22 42 Q50 8 78 42 L82 82 Q50 102 18 82 Z" fill="#3D3A38" stroke="#26241f" stroke-width="2"/>
    <circle cx="38" cy="48" r="13" fill="#FAF7F1"/><circle cx="62" cy="48" r="13" fill="#FAF7F1"/>
    <circle cx="38" cy="48" r="5" fill="#D4AF37"/><circle cx="62" cy="48" r="5" fill="#D4AF37"/>
    <path d="M50 56 l-5 6 h10 z" fill="#C2674A"/>
    <path d="M30 30 l8 10 M70 30 l-8 10" stroke="#26241f" stroke-width="3" stroke-linecap="round"/>
  </g>
</svg>`;

// ── Types ─────────────────────────────────────────────────────────────────────
interface Toast { id: number; msg: string; icon: string; kind: string; }
interface AuditEntry { t: string; who: string; what: string; }
interface VendorState { status: 'ok' | 'pend' | 'susp'; }

// ── Static data ───────────────────────────────────────────────────────────────
const VENDORS_DATA: [string, string, string, number, string, number, string, string, string, number][] = [
  ['Campus Central Print', 'Block A · Main gate', 'ok', 4, 'High', 4.8, '₹9,210', 'CC', '#7E8C6F', 1],
  ['Night Owl Copies', 'Hostel circle', 'ok', 3, 'Med', 4.6, '₹6,040', 'NO', '#7A6D8C', 1],
  ['The Paper Mill', 'Library basement', 'pend', 2, '—', 0, '—', 'PM', '#B8912E', 0],
  ['Morning Star Press', 'Admin block', 'ok', 3, 'Low', 4.7, '₹5,120', 'MS', '#C2674A', 1],
  ['Quill & Quire', 'Near canteen', 'pend', 2, '—', 0, '—', 'QQ', '#7A6D8C', 0],
];

// ── CSS injection ─────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');
.obs-root{
  --paper:#FAF7F1;--paper-2:#F3EDE3;--paper-3:#EAE2D4;--paper-edge:#E0D6C5;
  --ink:#2A2928;--ink-2:#6E665B;--ink-3:#9A9183;
  --terracotta:#C2674A;--terracotta-soft:#D48A70;--plum:#7A6D8C;
  --sage:#7E8C6F;--sage-soft:#A9B59D;--brass:#B8912E;--brass-soft:#D4AF37;
  --wood:#4A3219;--wood-deep:#36220E;--crimson:#9B2C2C;
  --rest:0 1px 0 rgba(255,255,255,.6) inset,0 2px 5px rgba(42,41,40,.06),0 8px 18px rgba(42,41,40,.05);
  --hover:0 1px 0 rgba(255,255,255,.7) inset,0 4px 10px rgba(42,41,40,.09),0 14px 30px rgba(42,41,40,.08);
  --press:inset 0 2px 6px rgba(42,41,40,.18);
  --well:inset 0 2px 5px rgba(42,41,40,.10);
  --spring:520ms cubic-bezier(.34,1.4,.5,1);--soft:400ms cubic-bezier(.25,1,.5,1);
  --r:14px;--r-sm:9px;
  font-family:'Instrument Sans',system-ui,sans-serif;color:var(--ink);
  background:linear-gradient(180deg,var(--paper) 0%,var(--paper-2) 100%);
  min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased;
  box-sizing:border-box;
  font-size: 17px;
}
.obs-root *{box-sizing:border-box;margin:0;padding:0}
.obs-root button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
.obs-root ::selection{background:var(--terracotta-soft);color:var(--paper)}
.obs-grain{position:fixed;inset:0;pointer-events:none;z-index:9999;opacity:.035;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
.obs-app{display:flex;height:100vh;overflow:hidden;transition:all var(--spring)}
.obs-app.obs-closed{}
/* rail */
.obs-rail{position:fixed;top:0;left:0;bottom:0;height:100vh;width:260px;padding:26px 18px;
  display:flex;flex-direction:column;gap:8px;z-index:50;
  background:linear-gradient(180deg,rgba(255,255,255,.5),rgba(243,237,227,.35));
  border-right:1px solid var(--paper-edge);backdrop-filter:blur(2px);
  overflow-y:auto;transition:width var(--spring),padding var(--spring)}
.obs-app.obs-closed .obs-rail{width:80px;padding:26px 14px}
.obs-app.obs-closed .obs-brand div,
.obs-app.obs-closed .obs-nav span:not(.obs-ic) {
  display:none;
}
.obs-app.obs-closed .obs-brand { justify-content:center !important; }
.obs-app.obs-closed .obs-nav button { justify-content: center; padding: 14px 0; }
.obs-brand{display:flex;align-items:center;gap:12px;padding:4px 8px 18px}
.obs-seal{width:38px;height:38px;border-radius:12px;flex:none;
  background:linear-gradient(160deg,var(--ink),#3c3a37);color:var(--paper);
  display:grid;place-items:center;box-shadow:var(--rest);font-family:'Space Grotesk';font-weight:700;font-size:16px;position:relative}
.obs-seal::after{content:"";position:absolute;inset:3px;border:1px solid rgba(250,247,241,.18);border-radius:7px}
.obs-brand b{font-family:'Space Grotesk';letter-spacing:-.02em;font-size:17.5px}
.obs-brand small{display:block;font-size:11.5px;color:var(--ink-3);letter-spacing:.16em;text-transform:uppercase;margin-top:2px}
.obs-nav{display:flex;flex-direction:column;gap:3px;margin-top:2px}
.obs-nav button{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;
  font-size:15px;color:var(--ink-2);font-weight:500;transition:background var(--soft),color var(--soft);text-align:left;width:100%}
.obs-nav button:hover{background:rgba(42,41,40,.045);color:var(--ink)}
.obs-nav button.on{background:linear-gradient(120deg,rgba(122,109,140,.16),rgba(122,109,140,.07));color:var(--ink);box-shadow:var(--rest)}
.obs-nav button.on .obs-ic{color:var(--plum)}
.obs-ic{width:20px;height:20px;flex:none;color:var(--ink);transition:color var(--soft)}
.obs-count{margin-left:auto;font-family:'Space Grotesk';font-size:12px;font-weight:600;min-width:22px;height:22px;padding:0 6px;
  display:grid;place-items:center;border-radius:6px;background:rgba(42,41,40,.06);color:var(--ink-2)}
.obs-nav button.on .obs-count{background:var(--plum);color:#fff}
/* main */
.obs-main{flex:1;height:100vh;overflow-y:auto;margin-left:260px;min-width:0;display:flex;flex-direction:column;transition:margin-left var(--spring)}
.obs-app.obs-closed .obs-main{margin-left:80px}
.obs-topbar{position:sticky;top:0;z-index:30;display:flex;align-items:center;gap:16px;
  padding:18px 30px;border-bottom:1px solid var(--paper-edge);
  background:linear-gradient(180deg,rgba(250,247,241,.92),rgba(250,247,241,.78));backdrop-filter:blur(8px)}
.obs-topbar h1{font-family:'Space Grotesk';font-size:24px;letter-spacing:-.02em;font-weight:600}
.obs-sub{font-size:14.5px;color:var(--ink-3);margin-top:1px}
.obs-clockchip{display:flex;align-items:center;gap:8px;font-size:14.5px;color:var(--ink-2);
  padding:9px 14px;border-radius:10px;background:#fff;box-shadow:var(--rest);border:1px solid var(--paper-edge)}
.obs-wx-emoji {
  font-size: 19px;
  filter: brightness(0.8);
  display: inline-block;
}
.obs-clockchip .mono{font-weight:600;color:var(--ink);font-family:'Space Grotesk'}
.obs-canvas{padding:22px 26px 60px;max-width:1340px;width:100%}
/* stats grid */
.obs-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.obs-stat{padding:16px 18px;border-radius:var(--r);background:linear-gradient(165deg,#fffdf8,#f1ebdf);box-shadow:var(--rest);border:1px solid var(--paper-edge);position:relative;overflow:hidden}
.obs-stat .label{font-family:'Space Grotesk';text-transform:uppercase;letter-spacing:.14em;font-size:12.5px;font-weight:600;color:var(--ink-3);margin-bottom:7px}
.obs-stat .big{font-family:'Space Grotesk';font-size:34px;font-weight:600;letter-spacing:-.03em;line-height:1}
.obs-stat .big small{font-size:16.5px;color:var(--ink-3);font-weight:500}
.obs-stat .trail{font-size:13.5px;color:var(--ink-2);margin-top:5px}
.obs-edge{position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:3px}
/* layout */
.obs-two-col{display:grid;grid-template-columns:1fr 360px;gap:18px;align-items:start}
/* ledger */
.obs-ledger{border-radius:var(--r);background:linear-gradient(165deg,#fffdf8,#f1ebdf);box-shadow:var(--rest);border:1px solid var(--paper-edge);overflow:hidden;margin-bottom:18px}
.obs-ledger-head{padding:14px 17px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--paper-edge)}
.obs-ledger-head h3{font-family:'Space Grotesk';font-size:17.5px;font-weight:600;letter-spacing:-.01em}
/* owl card */
.obs-owl-card{border-radius:var(--r);background:linear-gradient(165deg,#34322e,#26241f);color:var(--paper);box-shadow:var(--hover);padding:18px;position:relative;overflow:hidden}
.obs-owl-card .label-dim{font-family:'Space Grotesk';text-transform:uppercase;letter-spacing:.14em;font-size:12.5px;font-weight:600;color:rgba(250,247,241,.55)}
.obs-insight{font-size:16px;line-height:1.55;margin-top:8px;color:#efe9df}
.obs-insight b{color:#fff}
.obs-owl-svg{position:absolute;right:-6px;bottom:-6px;width:96px;height:96px;opacity:.9}
/* table */
table.obs-table{width:100%;border-collapse:collapse;font-size:15.5px}
table.obs-table thead th{font-family:'Space Grotesk';font-size:12.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-3);
  text-align:left;padding:10px 17px;font-weight:600;border-bottom:1px solid var(--paper-edge)}
table.obs-table tbody td{padding:13px 17px;border-bottom:1px solid rgba(224,214,197,.55);vertical-align:middle}
table.obs-table tbody tr{transition:background var(--soft)}
table.obs-table tbody tr:hover{background:rgba(42,41,40,.025)}
table.obs-table tbody tr:last-child td{border-bottom:none}
.obs-cell-name{display:flex;align-items:center;gap:10px}
.obs-cell-name b{font-family:'Space Grotesk';font-weight:600;font-size:16px}
.obs-cell-name small{display:block;color:var(--ink-3);font-size:13.5px}
.obs-avatar{width:36px;height:36px;border-radius:9px;flex:none;display:grid;place-items:center;
  font-family:'Space Grotesk';font-weight:700;font-size:13.5px;color:#fff;box-shadow:var(--rest)}
.obs-badge{display:inline-flex;align-items:center;gap:6px;font-family:'Space Grotesk';font-size:12.5px;font-weight:600;padding:4px 9px;border-radius:7px}
.obs-badge .d{width:6px;height:6px;border-radius:50%}
.obs-badge.ok{background:rgba(126,140,111,.14);color:var(--sage)}.obs-badge.ok .d{background:var(--sage)}
.obs-badge.pend{background:rgba(184,145,46,.15);color:var(--brass)}.obs-badge.pend .d{background:var(--brass)}
.obs-badge.susp{background:rgba(155,44,44,.12);color:var(--crimson)}.obs-badge.susp .d{background:var(--crimson)}
.obs-badge.info{background:rgba(122,109,140,.14);color:var(--plum)}.obs-badge.info .d{background:var(--plum)}
.obs-rowact{display:flex;gap:7px;justify-content:flex-end}
/* search */
.obs-search{display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:9px;background:#fff;box-shadow:var(--well);border:1px solid var(--paper-edge);color:var(--ink-3);font-size:14.5px}
.obs-search input{border:none;background:none;outline:none;font-family:inherit;font-size:15px;color:var(--ink);width:140px}
/* buttons */
.obs-btn{display:inline-flex;align-items:center;gap:7px;padding:8px 15px;border-radius:9px;font-size:15px;font-weight:600;
  font-family:'Space Grotesk';box-shadow:var(--rest);transition:transform 90ms ease,box-shadow var(--soft),background var(--soft);
  border:1px solid transparent;white-space:nowrap;cursor:pointer}
.obs-btn:active{transform:translateY(1px);box-shadow:var(--press)}
.obs-btn.primary{background:linear-gradient(165deg,#34322e,var(--ink));color:var(--paper)}
.obs-btn.sage{background:linear-gradient(165deg,#8a9a78,var(--sage));color:#fff}
.obs-btn.terra{background:linear-gradient(165deg,#d07a5c,var(--terracotta));color:#fff}
.obs-btn.ghost{background:#fff;color:var(--ink-2);border-color:var(--paper-edge)}
.obs-btn.ghost:hover{color:var(--ink)}
.obs-btn.sm{padding:6px 11px;font-size:13.5px}
/* chart */
.obs-spark{display:flex;align-items:flex-end;gap:8px;height:120px;position:relative}
.obs-spark-bar-wrapper{flex:1;height:100%;display:flex;align-items:flex-end;position:relative;cursor:pointer}
.obs-spark-bar-wrapper i{width:100%;border-radius:4px 4px 0 0;background:linear-gradient(180deg,var(--sage-soft),var(--sage));display:block;transition:opacity var(--soft)}
.obs-tooltip{position:absolute;bottom:100%;left:50%;transform:translateX(-50%) translateY(-10px);
  background:linear-gradient(160deg,#34322e,var(--ink));color:var(--paper);padding:8px 12px;border-radius:var(--r-sm);
  box-shadow:var(--hover);font-size:12px;pointer-events:none;z-index:100;min-width:115px;text-align:center;
  border:1px solid var(--paper-edge);animation:obs-toastin 150ms cubic-bezier(.25,1,.5,1) both}
.obs-tooltip::after{content:"";position:absolute;top:100%;left:50%;margin-left:-6px;border-width:6px;border-style:solid;border-color:var(--ink) transparent transparent transparent}
.obs-root.night .obs-tooltip::after{border-color:#3E3A49 transparent transparent transparent}
.obs-root.night .obs-tooltip { background: #3E3A49 !important; }
/* tick list (support) */
.obs-tick{display:flex;gap:11px;padding:11px 0;border-bottom:1px dashed var(--paper-edge);font-size:15px;align-items:center}
.obs-tick:last-child{border-bottom:none}
.obs-tick .tk-main{flex:1;min-width:0}.obs-tick .tk-main b{font-weight:600;display:block;font-size:16px}
.obs-tick .tk-main small{color:var(--ink-3);font-size:13.5px}
.obs-pr{font-family:'Space Grotesk';font-size:12.5px;font-weight:700;padding:2px 7px;border-radius:5px;height:fit-content;text-transform:uppercase;letter-spacing:.08em}
.obs-pr.high{background:rgba(194,103,74,.14);color:var(--terracotta)}.obs-pr.med{background:rgba(184,145,46,.14);color:var(--brass)}.obs-pr.low{background:rgba(122,109,140,.14);color:var(--plum)}
/* audit */
.obs-audit{font-family:'Space Grotesk';font-size:14.5px}
.obs-audit .a-row{display:flex;gap:12px;padding:9px 0;border-bottom:1px dashed var(--paper-edge);align-items:baseline}
.obs-audit .a-row:last-child{border-bottom:none}
.obs-audit .t{color:var(--ink-3);font-size:13px;width:68px;flex:none}
.obs-audit .who{font-weight:600}.obs-audit .what{color:var(--ink-2);font-weight:400}
/* mini-spark health */
.obs-mini-spark{display:flex;align-items:flex-end;gap:2px;height:26px}
.obs-mini-spark i{width:4px;border-radius:2px;background:var(--sage-soft);display:block}
/* toasts */
.obs-toasts{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);z-index:120;display:flex;flex-direction:column;gap:8px;align-items:center}
.obs-toast{display:flex;align-items:center;gap:10px;padding:11px 17px;border-radius:11px;font-size:13.5px;font-weight:500;
  background:linear-gradient(160deg,#34322e,var(--ink));color:var(--paper);box-shadow:var(--hover);
  animation:obs-toastin 520ms cubic-bezier(.34,1.4,.5,1) both}
@keyframes obs-toastin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes obs-modal-fade{from{opacity:0}to{opacity:1}}
@keyframes obs-modal-pop{from{opacity:0;transform:scale(0.94) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}

/* Mobile Responsive Overrides */
@media (max-width: 820px) {
  .obs-app, .obs-app.obs-closed { display: flex !important; flex-direction: column !important; height: auto !important; overflow: visible !important; }
  .obs-rail { position: static !important; width: 100% !important; height: auto !important; }
  .obs-main { margin-left: 0 !important; height: auto !important; overflow-y: visible !important; }
  .obs-grid { grid-template-columns: 1fr; gap: 16px; }
  .obs-two-col { grid-template-columns: 1fr; gap: 24px; }
  .obs-canvas { padding: 16px 12px 60px; }
  table.obs-table { display: block; overflow-x: auto; white-space: nowrap; }
  .obs-spark { height: 80px; }
}

/* Pulse Map CSS */
@keyframes pulseTravel { 0% { stroke-dashoffset: 200; } 100% { stroke-dashoffset: 0; } }
.pulse-beam { stroke-dasharray: 20 180; animation: pulseTravel 2s infinite linear; }
@keyframes pulseBlink { 0% { r: 2; opacity: 0.8; } 100% { r: 8; opacity: 0; } }
.pulse-dot { animation: pulseBlink 1.5s infinite cubic-bezier(0.16, 1, 0.3, 1); }
.pulse-map-panel { background: radial-gradient(circle at center, #2c2a27, #1f1d1a); position: relative; overflow: hidden; min-height: 280px; }
.pulse-map-title { color: #f2efe9 !important; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
.pulse-live-tag { display: flex; align-items: center; gap: 6px; font-family: 'Space Grotesk'; font-size: 11px; font-weight: 700; color: var(--terracotta); text-transform: uppercase; letter-spacing: 0.1em; background: rgba(212,138,112,0.1); padding: 4px 8px; border-radius: 12px; }

/* =====================================================================
   DARK MODE OVERRIDES
   ===================================================================== */
.obs-root.night {
  --paper:#2E2A36;--paper-2:#23202D;--paper-3:#3E3A49;--paper-edge:#4F4A5E;
  --ink:#FAF7F1;--ink-2:#C0BAC8;--ink-3:#8A8392;
  --rest:0 1px 0 rgba(255,255,255,.05) inset,0 2px 5px rgba(0,0,0,.35),0 8px 18px rgba(0,0,0,.25);
  --hover:0 1px 0 rgba(255,255,255,.1) inset,0 4px 10px rgba(0,0,0,.45),0 14px 30px rgba(0,0,0,.35);
  --well:inset 0 2px 5px rgba(0,0,0,.4);
  background: #23202D !important;
}
.obs-root.night .obs-grain {
  display:none;
}
.obs-root.night .obs-rail {
  background:linear-gradient(180deg,rgba(30,28,38,.88),rgba(24,22,30,.72)) !important;
}
.obs-root.night .obs-topbar {
  background:linear-gradient(180deg,rgba(35,32,45,.96),rgba(35,32,45,.85)) !important;
}
.obs-root.night .obs-stat,
.obs-root.night .obs-ledger,
.obs-root.night .obs-owl-card {
  background:linear-gradient(165deg,#3A3545,#2E2A37) !important;
}
.obs-root.night .obs-clockchip,
.obs-root.night .obs-btn.ghost {
  background:#3E3A49 !important;
  color:#FAF7F1 !important;
  border-color:#4F4A5E !important;
}
.obs-root.night .obs-nav button:hover {
  background:rgba(255,255,255,.05) !important;
}
.obs-root.night input {
  background:#23202D !important;
  color:#FAF7F1 !important;
  border:1px solid #4F4A5E !important;
}
.obs-root.night table.obs-table tbody tr:hover {
  background:rgba(255,255,255,.02) !important;
}
.obs-root.night .obs-settings-card {
  background:linear-gradient(165deg,#3A3545,#2E2A37) !important;
}
.obs-root.night .obs-sw {
  background:#23202D !important;
}
.obs-root.night .obs-sw.on {
  background:var(--sage) !important;
}

/* =====================================================================
   ADMIN SETTINGS VIEWS
   ===================================================================== */
.obs-settings-card {
  padding: 24px;
  border-radius: var(--r);
  background: linear-gradient(165deg,#fffdf8,#f1ebdf);
  box-shadow: var(--rest);
  border: 1px solid var(--paper-edge);
  margin-bottom: 20px;
}
.obs-settings-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}
.obs-avatar-large {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: var(--plum);
  color: #fff;
  display: grid;
  place-items: center;
  font-family: 'Space Grotesk';
  font-weight: 700;
  font-size: 24px;
  box-shadow: var(--hover);
}
.obs-settings-title h4 {
  font-family: 'Space Grotesk';
  font-size: 18px;
  font-weight: 600;
}
.obs-settings-title p {
  font-size: 13px;
  color: var(--ink-3);
}
.obs-settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px dashed var(--paper-edge);
}
.obs-settings-row:last-child {
  border-bottom: none;
}
.obs-settings-label {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.obs-settings-label b {
  font-size: 14px;
  font-weight: 600;
}
.obs-settings-label span {
  font-size: 12px;
  color: var(--ink-3);
}
.obs-sw {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: var(--paper-3);
  position: relative;
  transition: background var(--soft);
  box-shadow: var(--well);
  cursor: pointer;
  border: none;
  display: inline-block;
}
.obs-sw::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform var(--soft);
  box-shadow: var(--rest);
}
.obs-sw.on {
  background: var(--sage);
}
.obs-sw.on::after {
  transform: translateX(20px);
}
`;

// ── Toast ─────────────────────────────────────────────────────────────────────
function ToastEl({ t, onRemove }: { t: Toast; onRemove: (id: number) => void }) {
  useEffect(() => { const id = setTimeout(() => onRemove(t.id), 3200); return () => clearTimeout(id); }, [t.id, onRemove]);
  return (
    <div className={`obs-toast ${t.kind}`}>
      <Ic name={t.icon || 'bell'} size={17} />
      <span>{t.msg}</span>
    </div>
  );
}

// ── Load Badge helper ─────────────────────────────────────────────────────────
function LoadBadge({ l }: { l: string }) {
  if (l === 'High') return <span className="obs-badge pend"><span className="d" />High</span>;
  if (l === 'Med') return <span className="obs-badge info"><span className="d" />Medium</span>;
  if (l === 'Low') return <span className="obs-badge ok"><span className="d" />Low</span>;
  return <span style={{ color: 'var(--ink-3)' }}>—</span>;
}

// ── Timeframe Data ────────────────────────────────────────────────────────────
const TIMEFRAME_DATA = {
  daily: {
    data: [8, 14, 22, 31, 28, 19, 12, 24, 38, 41, 33, 21, 9],
    labels: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'],
    bottom: ['8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p'],
    title: 'Orders through the day'
  },
  weekly: {
    data: [120, 145, 98, 160, 210, 185, 90],
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    bottom: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    title: 'Orders this week'
  },
  monthly: {
    data: [420, 480, 510, 600, 750, 890, 920, 840, 780, 810, 950, 1020],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    bottom: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    title: 'Orders this year'
  }
};

// ── Main Component ─────────────────────────────────────────────────────────────
export default function ObservatoryRoom() {
  const [section, setSection] = useState('overview');
  const [clock, setClock] = useState('—');
  const [wx, setWx] = useState('☀');
  const [night, setNight] = useState(false);
  const [activeBar, setActiveBar] = useState<number | null>(null);
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [dynamicShop] = useState<Record<string, string> | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ezee_shop_details');
      if (stored) {
        try { return JSON.parse(stored); } catch { }
      }
    }
    return null;
  });


  useEffect(() => {
    document.body.classList.toggle('night', night);
  }, [night]);

  const [vendorStates, setVendorStates] = useState<VendorState[]>(() =>
    VENDORS_DATA.map(v => ({ status: v[2] as 'ok'|'pend'|'susp' }))
  );
  const [tickets, setTickets] = useState([
    ['high', 'Refund not received', 'Faiz Ahmed · order #A23', '2h'],
    ['med', 'Paper Mill onboarding stuck', 'The Paper Mill', '5h'],
    ['low', 'Add UPI as payout method', 'Morning Star Press', '1d'],
  ]);
  const [audit, setAudit] = useState<AuditEntry[]>([
    { t: '09:42', who: 'You', what: 'approved vendor — Campus Central Print' },
    { t: '09:18', who: 'Ops', what: 'issued refund — #A23 (₹95)' },
    { t: '08:50', who: 'System', what: 'Friday payout batch prepared — ₹61,820' },
    { t: 'Yesterday', who: 'You', what: 'suspended vendor — Quill & Quire (KYC mismatch)' },
    { t: 'Yesterday', who: 'Finance', what: 'adjusted commission — Night Owl 10%→9%' },
  ]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastCounter = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: 'signout' | 'delete' | null;
  }>({ isOpen: false, type: null });

  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Inject CSS once
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    if (document.getElementById('obs-style')) return () => clearTimeout(timer);
    const el = document.createElement('style');
    el.id = 'obs-style'; el.textContent = CSS;
    document.head.appendChild(el);
    return () => clearTimeout(timer);
  }, []);

  // Clock
  useEffect(() => {
    const tick = () => {
      const d = new Date(), h = d.getHours();
      setClock(d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }));
      setWx(h >= 17 || h < 6 ? '🌙' : h >= 15 ? '🌤' : h < 8 ? '🌅' : '☀');
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);

  const addToast = useCallback((msg: string, icon: string, kind = '') => {
    const id = ++toastCounter.current;
    setToasts(prev => [...prev, { id, msg, icon, kind }]);
  }, []);
  const removeToast = useCallback((id: number) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  function logAudit(what: string, obj: string) {
    const t = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    setAudit(prev => [{ t, who: 'You', what: `${what} — ${obj}` }, ...prev]);
  }

  function approveVendor(i: number) {
    setVendorStates(prev => prev.map((s, idx) => idx === i ? { status: 'ok' } : s));
    addToast(`${VENDORS_DATA[i][0]} approved & live`, 'check', 'good');
    logAudit('approved vendor', VENDORS_DATA[i][0] as string);
  }
  function suspendVendor(i: number) {
    setVendorStates(prev => prev.map((s, idx) => idx === i ? { status: 'susp' } : s));
    addToast(`${VENDORS_DATA[i][0]} suspended`, 'shield', 'warn');
    logAudit('suspended vendor', VENDORS_DATA[i][0] as string);
  }
  function resolveTicket(i: number) {
    const t = tickets[i];
    addToast(`Resolved: ${t[1]}`, 'check', 'good');
    logAudit('resolved ticket', t[1]);
    setTickets(prev => prev.filter((_, idx) => idx !== i));
  }

  // ── Nav ──────────────────────────────────────────────────────────────────
  const navItems = [
    ['globe', 'Overview', 'overview', 0],
    ['printer', 'Vendors', 'vendors', vendorStates.filter(v => v.status === 'pend').length],
    ['inbox', 'Orders', 'orders', 0],
    ['card', 'Payments', 'payments', 0],
    ['ticket', 'Support', 'support', tickets.length],
    ['scroll', 'Audit log', 'audit', 0],
  ];

  const TITLES: Record<string, [string, string]> = {
    overview: ['The Observatory', 'The whole campus print network, at rest and in motion.'],
    vendors: ['Vendors', 'Every print shop on the platform — approve, watch, step in.'],
    orders: ['Orders', 'Every job across every shop. Refund or resolve when needed.'],
    payments: ['Payments & payouts', 'Commission earned and settlements owed to shops.'],
    support: ['Support', 'Open tickets from students and vendors.'],
    audit: ['Audit log', 'Every consequential action, on the record.'],
    settings: ['Admin Settings', 'Manage your profile and observatory configurations.'],
  };
  const [pageTitle, pageSub] = TITLES[section] || TITLES.overview;

  // ── Stat card ────────────────────────────────────────────────────────────
  function Stat({ label, big, unit, color, trail }: { label: string; big: string; unit?: string; color: string; trail: string }) {
    return (
      <div className="obs-stat">
        <div className="obs-edge" style={{ background: color }} />
        <div className="label">{label}</div>
        <div className="big">{big}{unit && <small>{unit}</small>}</div>
        <div className="trail">{trail}</div>
      </div>
    );
  }

  // ── Pulse Map ────────────────────────────────────────────────────────────
  function PulseMap() {
    return (
      <div className="obs-ledger pulse-map-panel" style={{ marginBottom: '24px' }}>
        <div className="obs-ledger-head" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 className="pulse-map-title">Live Campus Pulse</h3>
          <div style={{ flex: 1 }} />
          <div className="pulse-live-tag">
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="currentColor" /></svg> Live Routing
          </div>
        </div>
        <div style={{ padding: '20px', position: 'relative', height: '260px' }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 800 260">
            <defs>
              <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#D48A70" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FAF7F1" />
              </linearGradient>
            </defs>
            {/* Base map lines */}
            <path d="M 100,200 Q 300,50 600,150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <path d="M 200,230 Q 400,280 650,80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            
            {/* Animated Pulses */}
            <path className="pulse-beam" d="M 100,200 Q 300,50 600,150" fill="none" stroke="url(#pulse-grad)" strokeWidth="3" strokeLinecap="round" />
            <path className="pulse-beam" d="M 200,230 Q 400,280 650,80" fill="none" stroke="url(#pulse-grad)" strokeWidth="3" strokeLinecap="round" style={{ animationDelay: '1s' }} />

            {/* Nodes */}
            <circle cx="100" cy="200" r="4" fill="#FAF7F1" />
            <circle cx="100" cy="200" className="pulse-dot" fill="#D48A70" />
            <circle cx="200" cy="230" r="4" fill="#FAF7F1" />
            <circle cx="200" cy="230" className="pulse-dot" fill="#D48A70" style={{ animationDelay: '0.5s' }} />
            
            <circle cx="600" cy="150" r="6" fill="#A9B59D" />
            <circle cx="650" cy="80" r="6" fill="#A9B59D" />
          </svg>
          <div style={{ position: 'absolute', left: '70px', top: '215px', color: '#8A8392', fontSize: '11px', fontFamily: 'Space Grotesk' }}>Student Dorms</div>
          <div style={{ position: 'absolute', left: '170px', top: '245px', color: '#8A8392', fontSize: '11px', fontFamily: 'Space Grotesk' }}>Library</div>
          
          <div style={{ position: 'absolute', left: '620px', top: '145px', color: '#FAF7F1', fontSize: '13px', fontWeight: 600, fontFamily: 'Space Grotesk' }}>Morning Star</div>
          <div style={{ position: 'absolute', left: '670px', top: '75px', color: '#FAF7F1', fontSize: '13px', fontWeight: 600, fontFamily: 'Space Grotesk' }}>The Paper Mill</div>
        </div>
      </div>
    );
  }

  // ── Overview ─────────────────────────────────────────────────────────────
  function renderOverview() {
    const tf = TIMEFRAME_DATA[timeframe];
    const data = tf.data;
    const max = Math.max(...data);
    return (
      <>
        <div className="obs-grid">
          <Stat label="Platform revenue" big="₹42,310" unit="today" color="var(--sage)" trail="+8% vs yesterday" />
          <Stat label="Orders" big="318" unit="today" color="var(--ink)" trail="across 9 shops" />
          <Stat label="Active students" big="1,204" color="var(--plum)" trail="this week" />
          <Stat label="Commission earned" big="₹4,231" unit="today" color="var(--brass)" trail="10% of gross" />
        </div>
        <div className="obs-two-col">
          <div className="obs-ledger">
            <div className="obs-ledger-head">
              <h3>{tf.title}</h3>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', gap: '6px', background: 'var(--paper-3)', padding: '3px', borderRadius: '8px' }}>
                {(['daily', 'weekly', 'monthly'] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => {
                      setTimeframe(t);
                      addToast(`Switched chart to ${t} view`, 'globe');
                    }}
                    style={{
                      fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em',
                      padding: '4px 8px', borderRadius: '6px',
                      background: timeframe === t ? 'var(--paper)' : 'transparent',
                      color: timeframe === t ? 'var(--ink)' : 'var(--ink-2)',
                      transition: 'background var(--soft), color var(--soft)'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: '20px 17px 22px' }}>
              <div className="obs-spark">
                {data.map((d, i) => {
                  const label = tf.labels[i];
                  return (
                    <div 
                      key={i} 
                      className="obs-spark-bar-wrapper"
                      onMouseEnter={() => setActiveBar(i)}
                      onMouseLeave={() => setActiveBar(null)}
                      onClick={() => {
                        setSelectedPeriod(`${timeframe === 'daily' ? 'Hour' : timeframe === 'weekly' ? 'Day' : 'Month'}: ${label}`);
                        setSection('orders');
                        addToast(`Filtered orders for ${label}`, 'inbox');
                      }}
                    >
                      <i 
                        style={{ 
                          height: `${Math.round(d/max*100)}%`, 
                          opacity: activeBar === null ? 0.8 : (activeBar === i ? 1 : 0.25),
                          background: activeBar === i ? 'linear-gradient(180deg, var(--plum), #635773)' : undefined
                        }} 
                      />
                      {activeBar === i && (
                        <div className="obs-tooltip">
                          <div style={{ fontWeight: 600, color: 'var(--paper-3)', marginBottom: 2 }}>{label}</div>
                          <div style={{ fontSize: 13.5 }}><b>{d}</b> orders</div>
                          <div style={{ opacity: 0.8, fontSize: 11.5 }}>Est: ₹{(d * 60).toLocaleString('en-IN')}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: 8, fontFamily: 'Space Grotesk', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600, color: 'var(--ink-3)' }}>
                {tf.bottom.map(lbl => (
                  <span key={lbl} style={{ flex: 1, textAlign: 'center' }}>{lbl}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="obs-owl-card">
            <div className="label-dim">The owl notices</div>
            <div className="obs-insight">
              <b>The Paper Mill</b> and <b>Quill &amp; Quire</b> are awaiting KYC approval. <b>Night Owl</b> took 41 jobs after 10pm — its colour ink is likely low.
            </div>
            <div className="obs-owl-svg" dangerouslySetInnerHTML={{ __html: owlSVG }} />
          </div>
        </div>

        <PulseMap />

        <div className="obs-ledger">
          <div className="obs-ledger-head"><h3>Platform health</h3></div>
          <table className="obs-table">
            <thead><tr><th>Shop</th><th>Presses</th><th>Load</th><th>Rating</th><th>Today</th><th>Status</th></tr></thead>
            <tbody>
              {VENDORS_DATA.filter((_, i) => vendorStates[i]?.status === 'ok').map((v) => {
                const shopName = v[0];
                const shopLocation = v[1];
                return (
                  <tr key={v[0] as string}>
                    <td><div className="obs-cell-name"><div className="obs-avatar" style={{ background: v[8] as string }}>{v[7]}</div><div><b>{shopName}</b><small>{shopLocation}</small></div></div></td>
                    <td>{v[3]}</td><td><LoadBadge l={v[4] as string} /></td>
                    <td className="mono">★ {v[5]}</td><td className="mono">{v[6]}</td>
                    <td><span className="obs-badge ok"><span className="d" />Healthy</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // ── Vendors ───────────────────────────────────────────────────────────────
  function renderVendors() {
    return (
      <div className="obs-ledger">
        <div className="obs-ledger-head">
          <h3>All vendors</h3><div style={{ flex: 1 }} />
          <div className="obs-search"><Ic name="printer" size={15} /><input placeholder="Search shops…" /></div>
        </div>
        <table className="obs-table">
          <thead><tr><th>Shop</th><th>KYC</th><th>Presses</th><th>Rating</th><th>Revenue (mo)</th><th /></tr></thead>
          <tbody>
            {VENDORS_DATA.map((v, i) => {
              let shopName = v[0];
              let shopLocation = v[1];
              if (v[0] === 'Morning Star Press' && dynamicShop) {
                shopName = dynamicShop.name || shopName;
                shopLocation = dynamicShop.location || shopLocation;
              }
              const st = vendorStates[i]?.status || 'pend';
              const kyc = st === 'ok'
                ? <span className="obs-badge ok"><span className="d" />Verified</span>
                : st === 'susp'
                ? <span className="obs-badge susp"><span className="d" />Suspended</span>
                : <span className="obs-badge pend"><span className="d" />Pending</span>;
              const act = st === 'pend' ? (
                <>
                  <button className="obs-btn ghost sm" onClick={() => addToast(`Opening KYC documents for ${shopName}…`, 'scroll')}>
                    <Ic name="scroll" size={14} /> Docs
                  </button>
                  <button className="obs-btn sage sm" onClick={() => approveVendor(i)}>
                    <Ic name="check" size={14} /> Approve
                  </button>
                </>
              ) : st === 'ok' ? (
                <button className="obs-btn ghost sm" onClick={() => suspendVendor(i)}>Suspend</button>
              ) : (
                <button className="obs-btn ghost sm" onClick={() => approveVendor(i)}>Reinstate</button>
              );
              return (
                <tr key={v[0] as string}>
                  <td><div className="obs-cell-name"><div className="obs-avatar" style={{ background: v[8] as string }}>{v[7]}</div><div><b>{shopName}</b><small>{shopLocation}</small></div></div></td>
                  <td>{kyc}</td><td>{v[3]}</td>
                  <td className="mono">{v[5] ? `★ ${v[5]}` : '—'}</td>
                  <td className="mono">{v[6]}</td>
                  <td className="obs-rowact">{act}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // ── Orders ────────────────────────────────────────────────────────────────
  function renderOrders() {
    let sample = [
      ['#A19','Final Year Thesis','Aisha Khan','Campus Central','₹240','done'],
      ['#A21','Resume','Sneha Rao','Morning Star','₹60','printing'],
      ['#A14','Lab Record','Rahul Menon','Night Owl','₹120','done'],
      ['#A23','Wedding Card','Faiz Ahmed','Campus Central','₹95','dispute'],
      ['#A09','Project Report','Divya Nair','Night Owl','₹390','done'],
    ];

    if (selectedPeriod) {
      sample = [
        ['#A30', `Study Guide (${selectedPeriod})`, 'Ishaan Sharma', 'Campus Central', '₹150', 'done'],
        ['#A31', `Syllabus Copy (${selectedPeriod})`, 'Meera Sen', 'Night Owl', '₹45', 'printing'],
        ['#A32', `Thesis Submission (${selectedPeriod})`, 'Kabir Das', 'Morning Star', '₹320', 'done'],
      ];
    }

    return (
      <div className="obs-ledger">
        <div className="obs-ledger-head" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <h3>All orders</h3>
          {selectedPeriod && (
            <span style={{ fontSize: '13px', background: 'var(--paper-3)', padding: '4px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Filtered: <b>{selectedPeriod}</b>
              <button onClick={() => setSelectedPeriod(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', opacity: 0.6 }}>×</button>
            </span>
          )}
          <div style={{ flex: 1 }} />
          <div className="obs-search"><Ic name="inbox" size={15} /><input placeholder="Search by code or student…" /></div>
        </div>
        <table className="obs-table">
          <thead><tr><th>Code</th><th>Document</th><th>Student</th><th>Shop</th><th>Amount</th><th>Status</th><th /></tr></thead>
          <tbody>
            {sample.map(r => (
              <tr key={r[0]}>
                <td className="mono"><b>{r[0]}</b></td>
                <td>{r[1]}</td><td>{r[2]}</td>
                <td style={{ color: 'var(--ink-2)' }}>{r[3]}</td>
                <td className="mono">{r[4]}</td>
                <td>{r[5]==='done'
                  ? <span className="obs-badge ok"><span className="d" />Completed</span>
                  : r[5]==='printing'
                  ? <span className="obs-badge pend"><span className="d" />Printing</span>
                  : <span className="obs-badge susp"><span className="d" />Dispute</span>}
                </td>
                <td className="obs-rowact">
                  {r[5] === 'dispute'
                    ? <button className="obs-btn terra sm" onClick={() => { addToast(`Refund issued to ${r[2]}`, 'coin', 'good'); logAudit('issued refund', r[0]); }}>Refund</button>
                    : <button className="obs-btn ghost sm">View</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ── Payments ──────────────────────────────────────────────────────────────
  function renderPayments() {
    const rows = [
      ['Campus Central', '38', '₹9,210', '₹921', '₹8,289'],
      ['Night Owl', '41', '₹10,040', '₹1,004', '₹9,036'],
      ['Morning Star', '24', '₹5,120', '₹512', '₹4,608'],
    ];
    return (
      <>
        <div className="obs-grid">
          <Stat label="Gross volume" big="₹3.2L" unit="this month" color="var(--ink)" trail="+14%" />
          <Stat label="Commission" big="₹32,400" unit="this month" color="var(--brass)" trail="10%" />
          <Stat label="Pending payouts" big="₹61,820" unit="to 7 shops" color="var(--terracotta)" trail="settles Friday" />
          <Stat label="Refunds" big="₹1,140" unit="this month" color="var(--crimson)" trail="6 orders" />
        </div>
        <div className="obs-ledger">
          <div className="obs-ledger-head">
            <h3>Payouts due</h3><div style={{ flex: 1 }} />
            <button className="obs-btn primary sm" onClick={() => { addToast('Batch payout of ₹61,820 scheduled', 'card', 'good'); logAudit('scheduled payouts', '7 shops'); }}>
              <Ic name="card" size={15} /> Run Friday batch
            </button>
          </div>
          <table className="obs-table">
            <thead><tr><th>Shop</th><th>Orders</th><th>Gross</th><th>Fee</th><th>Net payout</th><th>Status</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r[0]}>
                  <td><b style={{ fontFamily: 'Space Grotesk' }}>{r[0]}</b></td>
                  <td>{r[1]}</td><td className="mono">{r[2]}</td>
                  <td className="mono" style={{ color: 'var(--ink-3)' }}>{r[3]}</td>
                  <td className="mono"><b>{r[4]}</b></td>
                  <td><span className="obs-badge pend"><span className="d" />Scheduled</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  // ── Support ───────────────────────────────────────────────────────────────
  function renderSupport() {
    return (
      <div className="obs-two-col">
        <div className="obs-ledger">
          <div className="obs-ledger-head">
            <h3>Open tickets</h3><div style={{ flex: 1 }} />
            <span className="obs-badge pend"><span className="d" />{tickets.length} open</span>
          </div>
          <div style={{ padding: '4px 17px 8px' }}>
            {tickets.map((t, i) => (
              <div key={t[1]} className="obs-tick">
                <span className={`obs-pr ${t[0]}`}>{t[0]}</span>
                <div className="tk-main">
                  <b>{t[1]}</b>
                  <small>{t[2]} · opened {t[3]} ago</small>
                </div>
                <button className="obs-btn sage sm" onClick={() => resolveTicket(i)}>
                  <Ic name="check" size={14} /> Resolve
                </button>
              </div>
            ))}
            {tickets.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--ink-3)' }}>
                <b style={{ fontFamily: 'Space Grotesk', color: 'var(--ink-2)', display: 'block', marginBottom: 4 }}>All clear</b>
                No open tickets at the moment.
              </div>
            )}
          </div>
        </div>
        <div className="obs-ledger">
          <div className="obs-ledger-head"><h3>Announcements</h3></div>
          <div style={{ padding: '14px 17px' }}>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 12 }}>
              Broadcast to students or vendors — exam-week hours, new shops, maintenance.
            </div>
            <button className="obs-btn ghost sm" style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => addToast('Announcement composer coming soon', 'bell')}>
              <Ic name="bell" size={15} /> Compose announcement
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Audit ─────────────────────────────────────────────────────────────────
  function renderAuditLog() {
    return (
      <div className="obs-ledger">
        <div className="obs-ledger-head">
          <h3>Audit log</h3><div style={{ flex: 1 }} />
          <span style={{ fontFamily: 'Space Grotesk', textTransform: 'uppercase', letterSpacing: '.14em', fontSize: 10.5, fontWeight: 600, color: 'var(--ink-3)' }}>immutable</span>
        </div>
        <div className="obs-audit" style={{ padding: '8px 17px 14px' }}>
          {audit.map((a, i) => (
            <div key={i} className="a-row">
              <span className="t">{a.t}</span>
              <span className="who">{a.who}</span>
              <span className="what">{a.what}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Settings ───────────────────────────────────────────────────────────────
  function renderSettings() {
    return (
      <div className="obs-two-col">
        <div className="obs-settings-card">
          <div className="obs-settings-header">
            <div className="obs-avatar-large">A</div>
            <div className="obs-settings-title">
              <h4>Admin User</h4>
              <p>Campus Overseer · admin@ezeeprint.in</p>
            </div>
          </div>

          <div className="obs-settings-row">
            <div className="obs-settings-label">
              <b>Observatory Alert Sound</b>
              <span>Play hums or bells when new support tickets arrive.</span>
            </div>
            <button 
              className={`obs-sw ${alertsEnabled ? 'on' : ''}`} 
              onClick={() => {
                setAlertsEnabled(!alertsEnabled);
                addToast(alertsEnabled ? 'Alert sounds disabled' : 'Alert sounds enabled', 'bell');
              }}
              aria-label="Toggle alerts"
            />
          </div>

          <div className="obs-settings-row">
            <div className="obs-settings-label">
              <b>Platform Maintenance Mode</b>
              <span>Display warning banners on student and vendor interfaces.</span>
            </div>
            <button 
              className={`obs-sw ${maintenanceMode ? 'on' : ''}`} 
              onClick={() => {
                setMaintenanceMode(!maintenanceMode);
                addToast(maintenanceMode ? 'Maintenance mode deactivated' : 'Platform set to Maintenance Mode', 'alert');
                logAudit('toggled maintenance mode', maintenanceMode ? 'off' : 'on');
              }}
              aria-label="Toggle maintenance mode"
            />
          </div>
        </div>

        <div className="obs-ledger">
          <div className="obs-ledger-head"><h3>Account Actions</h3></div>
          <div style={{ padding: '14px 17px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => setConfirmModal({ isOpen: true, type: 'signout' })}
              style={{ width: '100%', padding: '12px', background: night ? 'rgba(255, 255, 255, 0.08)' : '#f5efe7', border: night ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid var(--paper-edge)', borderRadius: '8px', color: night ? '#FAF7F1' : '#232221', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '13.5px' }}
            >
              🚪 Sign Out
            </button>
            <button 
              onClick={() => setConfirmModal({ isOpen: true, type: 'delete' })}
              style={{ width: '100%', padding: '12px', background: night ? 'rgba(255, 99, 99, 0.12)' : 'rgba(155, 44, 44, 0.08)', border: night ? '1px solid rgba(255, 99, 99, 0.35)' : '1px solid rgba(155, 44, 44, 0.25)', borderRadius: '8px', color: night ? '#ff8b8b' : 'var(--crimson)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '13.5px' }}
            >
              🗑️ Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  if (!mounted) return (
    <div className="obs-root" style={{ opacity: 0.6, pointerEvents: 'none', animation: 'obs-breathe 2s infinite' }}>
      <div className="obs-app">
        <aside className="obs-rail" style={{ padding: '22px 16px' }}>
          <div style={{ height: 34, width: 120, background: 'rgba(255,255,255,.08)', borderRadius: 10, marginBottom: 20 }} />
          <div style={{ height: 34, width: '100%', background: 'rgba(255,255,255,.05)', borderRadius: 10, marginBottom: 8 }} />
          <div style={{ height: 34, width: '100%', background: 'rgba(255,255,255,.05)', borderRadius: 10, marginBottom: 8 }} />
        </aside>
        <main className="obs-main">
          <div className="obs-topbar" style={{ height: 73 }}>
            <div style={{ height: 24, width: 200, background: 'rgba(255,255,255,.08)', borderRadius: 6 }} />
          </div>
          <div className="obs-canvas" style={{ padding: '26px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
              <div style={{ height: 90, background: 'rgba(255,255,255,.05)', borderRadius: 14 }} />
              <div style={{ height: 90, background: 'rgba(255,255,255,.05)', borderRadius: 14 }} />
              <div style={{ height: 90, background: 'rgba(255,255,255,.05)', borderRadius: 14 }} />
              <div style={{ height: 90, background: 'rgba(255,255,255,.05)', borderRadius: 14 }} />
            </div>
            <div style={{ height: 400, width: '100%', background: 'rgba(255,255,255,.03)', borderRadius: 14 }} />
          </div>
        </main>
      </div>
    </div>
  );

  return (
    <div className={`obs-root ${night ? 'night' : ''}`}>
      <div className="obs-grain" />
      <div className={`obs-app ${isMenuOpen ? '' : 'obs-closed'}`}>
        {/* RAIL */}
        <aside className="obs-rail">
          <div className="obs-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div 
              onClick={() => { if (!isMenuOpen) setIsMenuOpen(true); }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: isMenuOpen ? 'default' : 'pointer' }}
              title={isMenuOpen ? undefined : "Open Sidebar"}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Ezee Logo" style={{ height: 38, width: 'auto', objectFit: 'contain', borderRadius: '22%' }} />
              <div><small style={{ fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-3)', fontWeight: 600 }}>Observatory</small></div>
            </div>
            {isMenuOpen && (
              <button 
                onClick={() => setIsMenuOpen(false)}
                style={{ padding: '4px', cursor: 'pointer', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Close Sidebar"
              >
                <Ic name="x" size={18} />
              </button>
            )}
          </div>

          <nav className="obs-nav">
            {navItems.map(([ic, label, key, badge]) => (
              <button key={key as string} className={section === key ? 'on' : ''} onClick={() => setSection(key as string)}>
                <span className="obs-ic"><Ic name={ic as string} size={20} /></span>
                <span>{label}</span>
                {(badge as number) > 0 && <span className="obs-count">{badge as number}</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN */}
        <main className="obs-main">
          <div className="obs-topbar">
            <div>
              <h1>{pageTitle}</h1>
              <div className="obs-sub">{pageSub}</div>
            </div>
            <div style={{ flex: 1 }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="obs-clockchip">
                <span className="obs-wx-emoji">{wx}</span>
                <span className="mono">{clock}</span>
              </div>

              {/* Lamp (night toggle) */}
              <button 
                className="obs-btn ghost" 
                style={{ 
                  width: '42px', height: '42px', padding: 0, borderRadius: '50%',
                  display: 'grid', placeItems: 'center', position: 'relative',
                  border: '1px solid var(--paper-edge)'
                }}
                title="Lamp"
                onClick={() => {
                  const next = !night;
                  setNight(next);
                  addToast(next ? 'Lamp on. The observatory goes golden.' : 'Lamp off. Daylight it is.', 'clock');
                }}
              >
                <span 
                  style={{ 
                    position: 'absolute', inset: 0, borderRadius: '50%', 
                    background: 'radial-gradient(circle, rgba(212, 175, 55, .45), transparent 70%)', 
                    opacity: night ? 1 : 0, transition: 'opacity 0.8s ease', pointerEvents: 'none' 
                  }} 
                />
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M8 3h8l3 8H5l3-8zM12 11v7M8 21h8" />
                </svg>
              </button>

              {/* Profile Avatar Button */}
              <div 
                className="obs-avatar"
                onClick={() => setSection('settings')}
                style={{ 
                  width: '42px', height: '42px', borderRadius: '50%', 
                  background: 'var(--plum)', color: '#FAF7F1', 
                  display: 'grid', placeItems: 'center', cursor: 'pointer', 
                  fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '16px',
                  boxShadow: 'var(--rest)',
                  border: '1.5px solid var(--paper-edge)'
                }}
                title="Admin Settings"
              >
                A
              </div>
            </div>
          </div>

          <div className="obs-canvas">
            {section === 'overview' && renderOverview()}
            {section === 'vendors' && renderVendors()}
            {section === 'orders' && renderOrders()}
            {section === 'payments' && renderPayments()}
            {section === 'support' && renderSupport()}
            {section === 'audit' && renderAuditLog()}
            {section === 'settings' && renderSettings()}
          </div>
        </main>
      </div>

      {/* Custom Confirmation Modal */}
      {confirmModal.isOpen && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setConfirmModal({ isOpen: false, type: null });
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(20, 18, 24, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'obs-modal-fade 0.2s ease-out'
          }}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '420px',
              background: night 
                ? 'linear-gradient(165deg, #2E2A36, #23202D)' 
                : 'linear-gradient(165deg, #FFFDF8, #F5EFE7)',
              border: night ? '1px solid #4F4A5E' : '1px solid var(--paper-edge)',
              borderRadius: '16px',
              padding: '28px 24px',
              boxShadow: night 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)' 
                : '0 25px 50px -12px rgba(42, 41, 40, 0.2)',
              color: night ? '#FAF7F1' : '#2A2928',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              animation: 'obs-modal-pop 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: confirmModal.type === 'delete' 
                  ? (night ? 'rgba(255, 99, 99, 0.18)' : 'rgba(155, 44, 44, 0.12)')
                  : (night ? 'rgba(255, 255, 255, 0.1)' : 'rgba(42, 41, 40, 0.08)'),
                display: 'grid',
                placeItems: 'center',
                fontSize: '22px',
                flexShrink: 0
              }}>
                {confirmModal.type === 'delete' ? '🗑️' : '🚪'}
              </div>
              <div>
                <h3 style={{ 
                  fontFamily: 'Space Grotesk', 
                  fontSize: '18px', 
                  fontWeight: 700, 
                  margin: 0,
                  color: confirmModal.type === 'delete' ? (night ? '#ff8b8b' : 'var(--crimson)') : (night ? '#FAF7F1' : '#2A2928')
                }}>
                  {confirmModal.type === 'delete' ? 'Delete Account' : 'Sign Out'}
                </h3>
                <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: night ? 'rgba(250,247,241,0.65)' : 'rgba(42,41,40,0.65)', lineHeight: 1.45 }}>
                  {confirmModal.type === 'delete'
                    ? 'Are you sure you want to permanently delete this administrator account? This action is irreversible.'
                    : 'Are you sure you want to sign out from the observatory dashboard?'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setConfirmModal({ isOpen: false, type: null })}
                style={{
                  padding: '10px 18px',
                  borderRadius: '9px',
                  border: night ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--paper-edge)',
                  background: night ? 'rgba(255,255,255,0.06)' : '#fff',
                  color: night ? '#FAF7F1' : '#2A2928',
                  fontFamily: 'Space Grotesk',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  document.cookie = "ezee_admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  window.location.href = '/observatory/login';
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '9px',
                  border: 'none',
                  background: confirmModal.type === 'delete'
                    ? 'linear-gradient(165deg, #d32f2f, #9b2c2c)'
                    : 'linear-gradient(165deg, #34322e, var(--ink))',
                  color: '#fff',
                  fontFamily: 'Space Grotesk',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.15s ease'
                }}
              >
                {confirmModal.type === 'delete' ? 'Yes, Delete Account' : 'Yes, Sign Out'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div className="obs-toasts">
        {toasts.map(t => <ToastEl key={t.id} t={t} onRemove={removeToast} />)}
      </div>
    </div>
  );
}
