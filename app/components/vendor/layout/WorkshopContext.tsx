'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Types
export interface Order {
  id: string; student: string; avatar: string; color: string;
  title: string; pages: number; mode: 'bw' | 'color'; binding: 'none' | 'staple' | 'spiral' | 'softbound';
  copies: number; urgent: boolean; paid: boolean; payLabel: string;
  status: 'new' | 'printing' | 'ready' | 'done' | 'rejected';
  station: string | null; progress: number;
  createdAt: number; pickup: string | null; price: number;
}
export interface Station { id: string; name: string; sub: string; job: string | null; }
export interface StockItem { nm: string; v: number; cls: 'ok' | 'low' | 'crit'; unit: string; }
export interface Toast { id: number; msg: string; icon: string; kind: string; }

interface WorkshopState {
  mounted: boolean;
  section: string;
  setSection: (s: string) => void;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  stations: Station[];
  setStations: React.Dispatch<React.SetStateAction<Station[]>>;
  stock: StockItem[];
  setStock: React.Dispatch<React.SetStateAction<StockItem[]>>;
  shopOpen: boolean;
  setShopOpen: (v: boolean) => void;
  toggleOpen: () => void;
  toasts: Toast[];
  addToast: (msg: string, icon?: string, kind?: string) => void;
  removeToast: (id: number) => void;
  // Metrics
  counts: { new: number; printing: number; ready: number; done: number };
}

const WorkshopContext = createContext<WorkshopState | undefined>(undefined);

export function useWorkshop() {
  const ctx = useContext(WorkshopContext);
  if (!ctx) throw new Error('useWorkshop must be used within a WorkshopProvider');
  return ctx;
}

// ── Helpers ──────────────────────────────────────────────────────────
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
    urgent: !!t[8], paid: Math.random() > 0.25,
    status: forceStatus || 'new', station: null, progress: 0,
    createdAt: Date.now() - (forceStatus ? Math.random()*2.4e6 : 0),
    pickup: null,
  };
  o.price = priceOf(o as Order);
  o.payLabel = o.paid ? 'Paid' : 'COD';
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
    { nm: 'A4 75gsm', v: 84, cls: 'ok', unit: '%' },
    { nm: 'A4 100gsm', v: 42, cls: 'ok', unit: '%' },
    { nm: 'A3 Glossy', v: 8, cls: 'low', unit: '%' },
    { nm: 'Spiral Coils', v: 12, cls: 'crit', unit: 'box' },
    { nm: 'Staple Pins', v: 65, cls: 'ok', unit: 'box' },
  ];
}

let toastId = 0;

export function WorkshopProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [section, setSection] = useState('queue');
  const [orders, setOrders] = useState<Order[]>(() => initOrders());
  const [stations, setStations] = useState<Station[]>(() => initStations());
  const [stock, setStock] = useState<StockItem[]>(() => initStock());
  const [shopOpen, setShopOpen] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleOpen = useCallback(() => {
    setShopOpen(prev => !prev);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((msg: string, icon = 'info', kind = 'neutral') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, msg, icon, kind }]);
    setTimeout(() => removeToast(id), 4000);
  }, [removeToast]);

  const counts = {
    new: orders.filter(o => o.status === 'new').length,
    printing: orders.filter(o => o.status === 'printing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    done: orders.filter(o => o.status === 'done').length,
  };

  return (
    <WorkshopContext.Provider value={{
      mounted, section, setSection,
      orders, setOrders,
      stations, setStations,
      stock, setStock,
      shopOpen, setShopOpen, toggleOpen,
      toasts, addToast, removeToast,
      counts
    }}>
      {children}
    </WorkshopContext.Provider>
  );
}
