'use client';

import React, { useState, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────────
   COMMUNITY SHELF — Peer-to-Peer Campus Document Library
   Students discover, preview, and add shared campus docs to cart.
   Earns "Ezee Coins" when your shared doc gets printed by peers.
───────────────────────────────────────────────────────────────── */

export interface CommunityDoc {
  id: string;
  title: string;
  subject: string;
  contributor: string;
  contributorInitial: string;
  contributorColor: string;
  pages: number;
  downloads: number;
  tags: string[];
  category: 'notes' | 'pyq' | 'lab' | 'manual' | 'project';
  addedAt: string;
  coinsEarned?: number;
}

interface Props {
  onClose: () => void;
  onAddToCart: (doc: CommunityDoc) => void;
  onToast: (msg: string) => void;
  night?: boolean;
}

// Mock community documents pool
const COMMUNITY_DOCS: CommunityDoc[] = [
  {
    id: 'c1',
    title: 'CS301 Data Structures — Complete Unit Notes',
    subject: 'Computer Science',
    contributor: 'Aisha Khan',
    contributorInitial: 'AK',
    contributorColor: '#7A6D8C',
    pages: 48,
    downloads: 312,
    tags: ['btech', 'cs301', 'semester-5'],
    category: 'notes',
    addedAt: '2 days ago',
    coinsEarned: 124,
  },
  {
    id: 'c2',
    title: 'DBMS Past Year Questions 2021-2024',
    subject: 'Computer Science',
    contributor: 'Rahul Menon',
    contributorInitial: 'RM',
    contributorColor: '#7E8C6F',
    pages: 24,
    downloads: 487,
    tags: ['dbms', 'pyq', 'vtu'],
    category: 'pyq',
    addedAt: '5 days ago',
    coinsEarned: 210,
  },
  {
    id: 'c3',
    title: 'Engineering Physics Lab Manual — Full',
    subject: 'Physics',
    contributor: 'Zoya Fernandes',
    contributorInitial: 'ZF',
    contributorColor: '#C2674A',
    pages: 66,
    downloads: 291,
    tags: ['physics', 'lab', 'first-year'],
    category: 'lab',
    addedAt: '1 week ago',
  },
  {
    id: 'c4',
    title: 'Maths-3 Formulae Cheat Sheet (2 pages)',
    subject: 'Mathematics',
    contributor: 'Divya Nair',
    contributorInitial: 'DN',
    contributorColor: '#B8912E',
    pages: 2,
    downloads: 841,
    tags: ['maths', 'cheatsheet', 'semester-3'],
    category: 'notes',
    addedAt: '3 days ago',
    coinsEarned: 360,
  },
  {
    id: 'c5',
    title: 'Networking OSI Layer Diagrams',
    subject: 'Computer Networks',
    contributor: 'Karthik B',
    contributorInitial: 'KB',
    contributorColor: '#5C6B73',
    pages: 10,
    downloads: 156,
    tags: ['networking', 'cn', 'semester-6'],
    category: 'notes',
    addedAt: '4 days ago',
  },
  {
    id: 'c6',
    title: 'Micro-Economics PYQ Pack 2019–2023',
    subject: 'Economics',
    contributor: 'Sneha Rao',
    contributorInitial: 'SR',
    contributorColor: '#7A6D8C',
    pages: 36,
    downloads: 203,
    tags: ['economics', 'pyq', 'bba'],
    category: 'pyq',
    addedAt: '1 day ago',
  },
  {
    id: 'c7',
    title: 'Circuit Theory Lab Observations (Complete)',
    subject: 'Electronics',
    contributor: 'Imran Sheikh',
    contributorInitial: 'IS',
    contributorColor: '#7E8C6F',
    pages: 42,
    downloads: 178,
    tags: ['ece', 'circuit', 'lab'],
    category: 'lab',
    addedAt: '6 days ago',
    coinsEarned: 72,
  },
  {
    id: 'c8',
    title: 'Marketing Management Project Report Template',
    subject: 'Management',
    contributor: 'Meghana S',
    contributorInitial: 'MS',
    contributorColor: '#C2674A',
    pages: 18,
    downloads: 264,
    tags: ['mba', 'marketing', 'project'],
    category: 'project',
    addedAt: '2 days ago',
  },
];

const CATEGORY_LABEL: Record<CommunityDoc['category'], string> = {
  notes: '📓 Notes',
  pyq: '📋 PYQ',
  lab: '🧪 Lab',
  manual: '📘 Manual',
  project: '📁 Project',
};

const CATEGORY_COLOR: Record<CommunityDoc['category'], string> = {
  notes: '#7A6D8C',
  pyq: '#C2674A',
  lab: '#7E8C6F',
  manual: '#B8912E',
  project: '#5C6B73',
};

const FILTERS: { label: string; key: CommunityDoc['category'] | 'all' }[] = [
  { label: 'All', key: 'all' },
  { label: '📓 Notes', key: 'notes' },
  { label: '📋 PYQ', key: 'pyq' },
  { label: '🧪 Lab', key: 'lab' },
  { label: '📁 Project', key: 'project' },
];

export default function CommunityShelf({ onClose, onAddToCart, onToast, night }: Props) {
  const [activeFilter, setActiveFilter] = useState<CommunityDoc['category'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [showSharePanel, setShowSharePanel] = useState(false);
  const [myCoins] = useState(47); // mock earned coins from uploads

  const filtered = COMMUNITY_DOCS.filter(doc => {
    const matchFilter = activeFilter === 'all' || doc.category === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || doc.title.toLowerCase().includes(q) || doc.subject.toLowerCase().includes(q) || doc.tags.some(t => t.includes(q));
    return matchFilter && matchSearch;
  });

  const handleAdd = useCallback((doc: CommunityDoc) => {
    setAddedIds(prev => new Set(prev).add(doc.id));
    onAddToCart(doc);
    onToast(`"${doc.title.slice(0, 30)}…" added to cart`);
  }, [onAddToCart, onToast]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        background: 'rgba(42,41,40,0.52)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 700,
          maxHeight: '92vh',
          background: night ? '#2A2731' : '#FAF7F1',
          borderRadius: '24px 24px 0 0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -12px 60px rgba(42,41,40,0.25)',
          animation: 'shelfSlideUp 0.38s cubic-bezier(.34,1.4,.5,1) forwards',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: `1px solid ${night ? 'rgba(255,255,255,0.1)' : 'rgba(42,41,40,0.1)'}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>📚</span>
                <div>
                  <div style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 20,
                    color: night ? '#F0EEF2' : '#2A2928',
                    letterSpacing: '-0.02em',
                  }}>
                    Community Shelf
                  </div>
                  <div style={{ fontSize: 12, color: night ? '#958B9E' : '#A29884', marginTop: 1 }}>
                    Shared by classmates · Add to your cart in one tap
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Ezee Coins Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                background: night ? 'rgba(212,175,55,0.15)' : 'rgba(212,175,55,0.12)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: 100,
                padding: '5px 11px',
                cursor: 'pointer',
              }} onClick={() => onToast('Share a doc to earn Ezee Coins when peers print it!')} title="Your Ezee Coins">
                <span style={{ fontSize: 14 }}>🪙</span>
                <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 13, color: '#B8912E' }}>
                  {myCoins} coins
                </span>
              </div>
              {/* Share button */}
              <button
                onClick={() => setShowSharePanel(p => !p)}
                style={{
                  background: '#7E8C6F',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  padding: '7px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  transition: 'background 0.2s',
                }}
              >
                + Share Doc
              </button>
              {/* Close */}
              <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: night ? '#958B9E' : '#A29884', fontSize: 22, lineHeight: 1, padding: 4 }}>
                ✕
              </button>
            </div>
          </div>

          {/* Share panel */}
          {showSharePanel && (
            <div style={{
              marginTop: 14,
              padding: '14px 16px',
              background: night ? 'rgba(255,255,255,0.05)' : 'rgba(42,41,40,0.04)',
              borderRadius: 12,
              border: `1px dashed ${night ? 'rgba(255,255,255,0.15)' : 'rgba(42,41,40,0.15)'}`,
            }}>
              <div style={{ fontSize: 13, color: night ? '#C4BDCC' : '#6E665B', marginBottom: 10 }}>
                🪙 <strong>Earn Ezee Coins</strong> when classmates print your shared doc. Coins = discount on your next print!
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Doc title (e.g. CS401 Unit 2 Notes)"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${night ? 'rgba(255,255,255,0.15)' : 'rgba(42,41,40,0.18)'}`,
                    background: night ? 'rgba(255,255,255,0.05)' : '#fff',
                    color: night ? '#F0EEF2' : '#2A2928',
                    fontSize: 13,
                    fontFamily: 'Instrument Sans, sans-serif',
                  }}
                />
                <button
                  onClick={() => { setShowSharePanel(false); onToast('📚 Doc submitted to Community Shelf! You\'ll earn coins when peers print it.'); }}
                  style={{
                    background: '#7E8C6F',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Space Grotesk, sans-serif',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Upload & Share
                </button>
              </div>
            </div>
          )}

          {/* Search bar */}
          <div style={{ position: 'relative', marginTop: 14 }}>
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, color: night ? '#958B9E' : '#A29884', pointerEvents: 'none' }}
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search by subject, topic, tag…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: 10,
                border: `1px solid ${night ? 'rgba(255,255,255,0.12)' : 'rgba(42,41,40,0.14)'}`,
                background: night ? 'rgba(255,255,255,0.06)' : 'rgba(42,41,40,0.04)',
                color: night ? '#F0EEF2' : '#2A2928',
                fontSize: 13,
                fontFamily: 'Instrument Sans, sans-serif',
                outline: 'none',
              }}
            />
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 100,
                  border: `1.5px solid ${activeFilter === f.key ? '#C2674A' : (night ? 'rgba(255,255,255,0.14)' : 'rgba(42,41,40,0.15)')}`,
                  background: activeFilter === f.key ? 'rgba(194,103,74,0.12)' : 'transparent',
                  color: activeFilter === f.key ? '#C2674A' : (night ? '#C4BDCC' : '#6E665B'),
                  fontSize: 12.5,
                  fontWeight: activeFilter === f.key ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  transition: 'all 0.2s',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Document Grid */}
        <div style={{ overflowY: 'auto', flex: 1, padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 12, alignContent: 'start' }}>
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px 0', color: night ? '#958B9E' : '#A29884', fontSize: 14 }}>
              No matching docs on the shelf yet. Be the first to share!
            </div>
          )}
          {filtered.map(doc => {
            const added = addedIds.has(doc.id);
            return (
              <div
                key={doc.id}
                style={{
                  background: night ? 'rgba(255,255,255,0.05)' : '#fff',
                  borderRadius: 14,
                  border: `1px solid ${night ? 'rgba(255,255,255,0.1)' : 'rgba(42,41,40,0.1)'}`,
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  boxShadow: night ? 'none' : '0 2px 8px rgba(42,41,40,0.05)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 18px rgba(42,41,40,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = night ? 'none' : '0 2px 8px rgba(42,41,40,0.05)'; }}
              >
                {/* Category pill */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: 'Space Grotesk, sans-serif',
                    color: CATEGORY_COLOR[doc.category],
                    background: `${CATEGORY_COLOR[doc.category]}18`,
                    border: `1px solid ${CATEGORY_COLOR[doc.category]}30`,
                    borderRadius: 100,
                    padding: '2px 8px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}>
                    {CATEGORY_LABEL[doc.category]}
                  </span>
                  <span style={{ fontSize: 12, color: night ? '#958B9E' : '#A29884' }}>{doc.addedAt}</span>
                </div>

                {/* Title */}
                <div style={{
                  fontWeight: 600,
                  fontSize: 14.5,
                  lineHeight: 1.35,
                  color: night ? '#F0EEF2' : '#2A2928',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}>
                  {doc.title}
                </div>

                {/* Meta row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12.5, color: night ? '#958B9E' : '#A29884' }}>
                  <span>{doc.pages} pages</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                  <span>📥 {doc.downloads.toLocaleString()}</span>
                  {doc.coinsEarned && (
                    <>
                      <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                      <span style={{ color: '#B8912E' }}>🪙 {doc.coinsEarned}</span>
                    </>
                  )}
                </div>

                {/* Contributor */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: doc.contributorColor,
                    color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif',
                    flexShrink: 0,
                  }}>
                    {doc.contributorInitial}
                  </div>
                  <span style={{ fontSize: 12, color: night ? '#C4BDCC' : '#6E665B' }}>
                    Shared by <strong>{doc.contributor}</strong>
                  </span>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {doc.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        background: night ? 'rgba(255,255,255,0.08)' : 'rgba(42,41,40,0.06)',
                        color: night ? '#C4BDCC' : '#6E665B',
                        borderRadius: 6,
                        padding: '2px 7px',
                        fontFamily: 'Space Grotesk, sans-serif',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={() => !added && handleAdd(doc)}
                  disabled={added}
                  style={{
                    marginTop: 4,
                    padding: '9px 0',
                    borderRadius: 10,
                    border: 'none',
                    background: added ? (night ? 'rgba(126,140,111,0.2)' : 'rgba(126,140,111,0.12)') : '#7E8C6F',
                    color: added ? '#7E8C6F' : '#fff',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: added ? 'default' : 'pointer',
                    fontFamily: 'Space Grotesk, sans-serif',
                    transition: 'background 0.25s, transform 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                  onMouseEnter={e => { if (!added) (e.currentTarget as HTMLButtonElement).style.background = '#6a7a5f'; }}
                  onMouseLeave={e => { if (!added) (e.currentTarget as HTMLButtonElement).style.background = '#7E8C6F'; }}
                >
                  {added ? (
                    <>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Add to Cart — ₹{doc.pages <= 10 ? Math.round(doc.pages * 1.2) : doc.pages <= 30 ? Math.round(doc.pages * 1.2) : Math.round(doc.pages * 1.2)}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{
          padding: '12px 24px',
          borderTop: `1px solid ${night ? 'rgba(255,255,255,0.08)' : 'rgba(42,41,40,0.08)'}`,
          fontSize: 12,
          color: night ? '#958B9E' : '#A29884',
          textAlign: 'center',
          flexShrink: 0,
        }}>
          📜 All shared docs are community-reviewed. Earn 🪙 coins when your uploads get printed by peers.
        </div>
      </div>

      <style>{`
        @keyframes shelfSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
