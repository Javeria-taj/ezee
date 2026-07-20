'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../AudioEngine';
import styles from '../../student/student.module.css';
import { plantSVG, catSVG, SPINES } from '../../student/page';
import type { ShelfFile } from '../../student/page';

interface SettingsProps {
  onClose: () => void;
  initialTab?: 'settings' | 'history';
  shelfFiles: ShelfFile[];
  plantStage: number;
  newBookIdx: number;
  night: boolean;
  onToggleNight: () => void;
  shelfOrders: number;
  shelfPages: number;
  onToast?: (msg: string) => void;
}

export default function Settings({
  onClose,
  initialTab = 'settings',
  shelfFiles,
  plantStage,
  newBookIdx,
  night,
  onToggleNight,
  shelfOrders,
  shelfPages,
  onToast
}: SettingsProps) {
  const [studentInfo, setStudentInfo] = useState({
    name: typeof window !== 'undefined' ? (localStorage.getItem('ezee_student_name') || 'Javeria Taj') : 'Javeria Taj',
    usn: '1EZ23CS045',
    college: 'Ezee Institute of Technology',
    branch: 'Computer Science & Engineering',
    email: 'javeria.cs23@ezee.edu',
  });

  const [activeTab, setActiveTab] = useState<'settings' | 'history'>(initialTab);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportSent, setReportSent] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ezee_student_name', studentInfo.name);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ezee_student_name');
      document.cookie = 'ezee_student_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/auth';
    }
  };

  const handleDelete = () => {
    if (typeof window !== 'undefined') {
      // Clear all ezee data
      const keys = Object.keys(localStorage).filter(k => k.startsWith('ezee_'));
      keys.forEach(k => localStorage.removeItem(k));
      document.cookie = 'ezee_student_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/auth';
    }
  };

  const handleReportSubmit = () => {
    setReportSent(true);
    setReportText('');
    setTimeout(() => {
      setShowReport(false);
      setReportSent(false);
    }, 2000);
  };

  const drawerVariants = {
    initial: { opacity: 0, y: 100, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: 'spring' as const, bounce: 0.2 } },
    exit: { opacity: 0, y: 100, scale: 0.95, transition: { duration: 0.3 } },
  };

  /* ──────── Shared styles ──────── */
  const sectionCard: React.CSSProperties = {
    background: '#FAF7F1',
    padding: '1.5rem',
    borderRadius: '4px',
    boxShadow: '1px 2px 5px rgba(0,0,0,0.1)',
  };

  const settingsItem: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.2rem',
    background: '#FAF7F1',
    borderRadius: '4px',
    boxShadow: '1px 2px 5px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'background 0.2s',
  };

  const togglePill = (active: boolean): React.CSSProperties => ({
    width: '52px',
    height: '28px',
    background: active ? '#A9B59D' : '#EAE4DD',
    borderRadius: '14px',
    position: 'relative',
    cursor: 'pointer',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background 0.3s',
    flexShrink: 0,
  });

  if (activeTab === 'history') {
    return (
      <motion.div
        variants={drawerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={e => e.stopPropagation()}
        style={{
          width: '650px',
          maxWidth: '95vw',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '3rem 2.5rem',
          background: '#D2BBA0',
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          boxShadow: '0 30px 60px rgba(42, 41, 40, 0.3), inset 0 10px 20px rgba(255,255,255,0.2), inset 0 -10px 20px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          border: '4px solid #C4A786',
          position: 'relative',
          color: '#2A2928',
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', fontSize: '2rem', color: '#2A2928', cursor: 'pointer', zIndex: 10 }} aria-label="Close Settings">×</button>

        {/* Back button */}
        <button 
          onClick={() => setActiveTab('settings')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'Space Grotesk',
            fontSize: '0.9rem',
            color: '#7A6D8C',
            cursor: 'pointer',
            padding: 0,
            marginBottom: '1.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          ← Back to Top Drawer
        </button>

        <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2rem', color: '#2A2928', margin: '0' }}>The Shelf Remembers</h2>
        <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.95rem', color: '#7A6D8C', margin: '0.2rem 0 2rem 0' }}>Everything you&apos;ve printed lives here.</p>

        {/* Receipt and Recent Activity instead of Shelf Board */}
        <div>
          {/* Summary Receipt */}
          <div style={{
            background: '#FAF7F1',
            border: '2px dashed #C2B39A',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2.2rem',
            boxShadow: '0 2px 6px rgba(42,41,40,0.06)',
            fontFamily: 'Space Grotesk',
            color: '#2A2928',
          }}>
            <div style={{
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: '#7A6D8C',
              borderBottom: '1.5px dashed rgba(42, 41, 40, 0.12)',
              paddingBottom: '0.6rem',
              marginBottom: '1.2rem',
              fontWeight: 'bold',
            }}>
              Ezee Summary Receipt
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#7A6D8C', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Pages Printed</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2A2928', fontFamily: 'Cabinet Grotesk, Space Grotesk' }}>
                  {shelfFiles.reduce((acc, f) => acc + f.pages, 0)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#7E8C6F', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Total Saved</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7E8C6F', fontFamily: 'Cabinet Grotesk, Space Grotesk' }}>
                  ₹{shelfFiles.reduce((acc, f) => acc + (f.saved || Math.round((f.cost || Math.round(f.pages * 1.2)) * 0.5)), 0).toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#C2674A', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Total Cost</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2A2928', fontFamily: 'Cabinet Grotesk, Space Grotesk' }}>
                  ₹{shelfFiles.reduce((acc, f) => acc + (f.cost || Math.round(f.pages * 1.2)), 0).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Print History List (same UI as wallet recent activity) */}
          <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: 'rgba(42,41,40,0.4)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '1rem', fontWeight: 'bold' }}>
            Print History
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {shelfFiles.length === 0 ? (
              <div style={{ fontFamily: 'Instrument Sans', fontSize: '0.95rem', color: '#7A6D8C', fontStyle: 'italic', padding: '1rem 0' }}>
                No recent print jobs found.
              </div>
            ) : (
              [...shelfFiles].reverse().map((f, idx) => {
                const dateStr = f.at 
                  ? new Date(f.at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ' · ' + new Date(f.at).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
                  : '—';
                const costVal = f.cost || Math.round(f.pages * 1.2);
                return (
                  <div key={idx} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '0.6rem 0',
                    borderBottom: '1px solid rgba(42,41,40,0.05)',
                  }}>
                    <div>
                      <div style={{ fontFamily: 'Instrument Sans', fontSize: '0.95rem', color: '#2A2928', fontWeight: 600 }}>{f.title}</div>
                      <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: 'rgba(42,41,40,0.5)', marginTop: '2px' }}>
                        {f.pages} pages · via {f.shop} · {dateStr}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                        <div style={{
                          fontFamily: 'Space Grotesk',
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          color: '#2A2928',
                        }}>
                          ₹{costVal}
                        </div>
                        <button
                          onClick={() => {
                            const printWindow = window.open('', '_blank');
                            if (!printWindow) return;
                            printWindow.document.write(`
                              <html>
                                <head>
                                  <title>Receipt - ${f.title}</title>
                                  <style>
                                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #2A2928; max-width: 400px; margin: 0 auto; }
                                    .header { border-bottom: 2px solid #2A2928; padding-bottom: 20px; margin-bottom: 20px; }
                                    h1 { margin: 0; font-size: 24px; font-weight: 800; }
                                    .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
                                    .total { font-weight: bold; border-top: 1px dashed #A9B59D; padding-top: 15px; margin-top: 20px; font-size: 18px; color: #D48A70; }
                                  </style>
                                </head>
                                <body>
                                  <div class="header">
                                    <h1>EZEE Receipt</h1>
                                    <p style="color: #7A6D8C; font-size: 12px; margin-top: 5px;">${dateStr}</p>
                                  </div>
                                  <div class="row">
                                    <span style="color: #7A6D8C;">Document</span>
                                    <span style="font-weight: 600;">${f.title}</span>
                                  </div>
                                  <div class="row">
                                    <span style="color: #7A6D8C;">Pages</span>
                                    <span style="font-weight: 600;">${f.pages}</span>
                                  </div>
                                  <div class="row">
                                    <span style="color: #7A6D8C;">Shop</span>
                                    <span style="font-weight: 600;">${f.shop}</span>
                                  </div>
                                  <div class="row total">
                                    <span>Total Paid</span>
                                    <span>₹${costVal}</span>
                                  </div>
                                  <p style="margin-top:40px; font-size:12px; color:#A9B59D; text-align: center; font-weight: 600;">Print. Study. Repeat.</p>
                                  <script>
                                    window.onload = () => { window.print(); }
                                  </script>
                                </body>
                              </html>
                            `);
                            printWindow.document.close();
                            if (onToast) onToast(`Opening receipt for ${f.title}...`);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            fontFamily: 'Space Grotesk',
                            fontSize: '0.7rem',
                            color: '#7A6D8C',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                          aria-label="Download receipt"
                        >
                          <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                          Receipt
                        </button>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`https://ezee.edu/print/${f.title.replace(/\s+/g, '-').toLowerCase()}-${idx}`);
                          if (onToast) {
                            onToast('Print Pass link copied! Share this so friends can print this exact document without uploading.');
                          } else {
                            alert('Print Pass link copied! Share this so friends can print this exact document without uploading.');
                          }
                        }}
                        style={{
                          background: '#EAE4DD',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          color: '#7E8C6F',
                          fontFamily: 'Space Grotesk',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                        title="Share this print configuration with a friend"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={drawerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={e => e.stopPropagation()}
      style={{
        width: '650px',
        maxWidth: '95vw',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '3rem 2.5rem',
        background: '#D2BBA0',
        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        boxShadow: '0 30px 60px rgba(42, 41, 40, 0.3), inset 0 10px 20px rgba(255,255,255,0.2), inset 0 -10px 20px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        border: '4px solid #C4A786',
        position: 'relative',
        color: '#2A2928',
      }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', fontSize: '2rem', color: '#2A2928', cursor: 'pointer', zIndex: 10 }} aria-label="Close Settings">×</button>

      <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '2rem', color: '#2A2928', margin: '0 0 2rem 0', textShadow: '1px 1px 0 rgba(255,255,255,0.3)' }}>Top Drawer</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

        {/* ════════ 1. Student ID Card ════════ */}
        <motion.div
          whileHover={{ scale: 1.02, rotateZ: 1 }}
          style={{
            background: '#FAF7F1',
            borderRadius: '12px',
            padding: '2rem',
            position: 'relative',
            boxShadow: '2px 4px 15px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)',
            transform: 'rotate(-1deg)',
          }}
        >
          {/* Lanyard clip hole */}
          <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '10px', background: '#D2BBA0', borderRadius: '5px', boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.3)' }} />

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
            {/* Photo Silhouette */}
            <div style={{
              width: '90px', height: '110px',
              border: '2px dashed rgba(42, 41, 40, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(42, 41, 40, 0.05)',
              fontSize: '2.5rem', color: 'rgba(42, 41, 40, 0.3)',
              borderRadius: '4px', flexShrink: 0,
            }}>👩‍💻</div>

            <div style={{ flex: 1, fontFamily: 'Instrument Sans', minWidth: '180px' }}>
              <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', color: '#7A6D8C', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Student Name</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#2A2928', marginBottom: '0.8rem' }}>{studentInfo.name}</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: '#7A6D8C', textTransform: 'uppercase' }}>USN Number</div>
                  <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2A2928', fontFamily: 'Space Grotesk' }}>{studentInfo.usn}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.75rem', color: '#7A6D8C', textTransform: 'uppercase' }}>Department</div>
                  <div style={{ fontSize: '1rem', color: '#2A2928' }}>{studentInfo.branch}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(42,41,40,0.1)', paddingTop: '1rem', fontSize: '0.95rem', color: '#7A6D8C', fontFamily: 'Instrument Sans', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span>🏫 {studentInfo.college}</span>
            <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.8rem', border: '1px solid #D48A70', color: '#D48A70', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>VALID 2026</span>
          </div>
        </motion.div>

        {/* ════════ 2. Request ID Card Replacement ════════ */}
        <div style={sectionCard}>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div key="edit" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', marginBottom: '0.3rem' }}>Update Name on ID</label>
                    <input
                      type="text"
                      value={studentInfo.name}
                      onChange={e => setStudentInfo({ ...studentInfo, name: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem', border: 'none', borderBottom: '2px solid rgba(42,41,40,0.1)', background: 'transparent', outline: 'none', fontFamily: 'Instrument Sans', fontSize: '1.1rem', color: '#2A2928' }}
                      autoFocus
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#7A6D8C', marginBottom: '0.3rem' }}>Update USN</label>
                    <input
                      type="text"
                      value={studentInfo.usn}
                      onChange={e => setStudentInfo({ ...studentInfo, usn: e.target.value })}
                      style={{ width: '100%', padding: '0.8rem', border: 'none', borderBottom: '2px solid rgba(42,41,40,0.1)', background: 'transparent', outline: 'none', fontFamily: 'Space Grotesk', fontSize: '1.1rem', color: '#2A2928' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button type="submit" style={{ padding: '0.8rem 1.5rem', background: '#2A2928', color: '#FAF7F1', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Instrument Sans' }}>Save Ink</button>
                    <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', color: '#7A6D8C', cursor: 'pointer', fontFamily: 'Space Grotesk' }}>Cancel</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    style={{
                      background: 'none', border: '1px dashed #7A6D8C',
                      padding: '0.8rem 1.5rem', color: '#7A6D8C', borderRadius: '4px',
                      cursor: 'pointer', fontFamily: 'Space Grotesk', fontSize: '0.9rem',
                      width: '100%', textAlign: 'center', transition: 'all 0.2s',
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = 'rgba(122,109,140,0.05)')}
                    onMouseOut={e => (e.currentTarget.style.background = 'none')}
                  >
                    ✏️ Request ID Card Replacement
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* ════════ 3. Room Radio Toggle ════════ */}
        <div style={sectionCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>Room Radio Toggle</h4>
              <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.9rem', color: '#7A6D8C', margin: 0 }}>Lofi beats &amp; rainfall</p>
            </div>
            <div
              onClick={() => {
                const nextSound = !soundEnabled;
                setSoundEnabled(nextSound);
                audio.toggle(nextSound);
              }}
              style={togglePill(soundEnabled)}
            >
              <motion.div
                animate={{ x: soundEnabled ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  width: '24px', height: '24px',
                  background: '#FAF7F1', borderRadius: '50%',
                  position: 'absolute', top: '2px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </div>
        </div>

        {/* ════════ 4. Dark Mode Toggle ════════ */}
        <div style={sectionCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>Night Lamp</h4>
              <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.9rem', color: '#7A6D8C', margin: 0 }}>Golden light for late evenings</p>
            </div>
            <div
              onClick={onToggleNight}
              style={togglePill(night)}
            >
              <motion.div
                animate={{ x: night ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  width: '24px', height: '24px',
                  background: '#FAF7F1', borderRadius: '50%',
                  position: 'absolute', top: '2px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={settingsItem}
          onClick={() => setActiveTab('history')}
        >
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>📚 History</h4>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#7A6D8C', margin: 0 }}>Library of memories — everything you&apos;ve printed</p>
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#A29884' }}>→</span>
        </div>

        {/* ════════ 6. Cart ════════ */}
        <div
          style={settingsItem}
          onClick={() => {
            onClose();
            setTimeout(() => {
              document.getElementById('s1')?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }}
        >
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>🛒 Cart</h4>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#7A6D8C', margin: 0 }}>Queue files before sending them together</p>
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#A29884' }}>→</span>
        </div>

        {/* ════════ 7. Schedule ════════ */}
        <div style={settingsItem}>
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>📅 Schedule Pickup</h4>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#7A6D8C', margin: 0 }}>Pick a date &amp; time for collection</p>
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '0.85rem', color: '#A9B59D', background: 'rgba(169,181,157,0.15)', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>Coming soon</span>
        </div>

        {/* ════════ 8. Help Center ════════ */}
        <div style={settingsItem} onClick={() => window.open('mailto:help@ezee.edu', '_blank')}>
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>💡 Help Center</h4>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#7A6D8C', margin: 0 }}>Guides, FAQs, and printing tips</p>
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#A29884' }}>→</span>
        </div>

        {/* ════════ 9. Contact Support ════════ */}
        <div style={settingsItem} onClick={() => window.open('mailto:support@ezee.edu', '_blank')}>
          <div>
            <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>🎧 Contact Support</h4>
            <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#7A6D8C', margin: 0 }}>Chat with us if something goes wrong</p>
          </div>
          <span style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#A29884' }}>→</span>
        </div>

        {/* ════════ 10. Report Issue ════════ */}
        <AnimatePresence>
          {!showReport ? (
            <motion.div
              key="reportBtn"
              style={settingsItem}
              onClick={() => setShowReport(true)}
              whileHover={{ background: 'rgba(250,247,241,0.9)' }}
            >
              <div>
                <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.2rem 0' }}>🐛 Report an Issue</h4>
                <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.85rem', color: '#7A6D8C', margin: 0 }}>Something not right? Let us know</p>
              </div>
              <span style={{ fontFamily: 'Space Grotesk', fontSize: '1.2rem', color: '#A29884' }}>→</span>
            </motion.div>
          ) : (
            <motion.div
              key="reportForm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={sectionCard}
            >
              {reportSent ? (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                  <p style={{ fontFamily: 'Instrument Sans', color: '#7E8C6F' }}>Report sent. We&apos;ll look into it.</p>
                </div>
              ) : (
                <>
                  <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: '0 0 0.8rem 0' }}>🐛 Report an Issue</h4>
                  <textarea
                    value={reportText}
                    onChange={e => setReportText(e.target.value)}
                    placeholder="Describe what went wrong..."
                    style={{
                      width: '100%', minHeight: '100px', padding: '0.8rem',
                      border: '1px solid rgba(42,41,40,0.1)', borderRadius: '4px',
                      background: 'rgba(250,247,241,0.5)', outline: 'none',
                      fontFamily: 'Instrument Sans', fontSize: '0.95rem',
                      resize: 'vertical',
                      color: '#2A2928',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.8rem' }}>
                    <button
                      onClick={handleReportSubmit}
                      disabled={!reportText.trim()}
                      style={{
                        padding: '0.7rem 1.2rem', background: '#2A2928', color: '#FAF7F1',
                        border: 'none', borderRadius: '4px', cursor: 'pointer',
                        fontFamily: 'Space Grotesk', fontSize: '0.85rem',
                        opacity: reportText.trim() ? 1 : 0.4,
                      }}
                    >Send Report</button>
                    <button
                      onClick={() => setShowReport(false)}
                      style={{ background: 'none', border: 'none', color: '#7A6D8C', cursor: 'pointer', fontFamily: 'Space Grotesk' }}
                    >Cancel</button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════ DIVIDER ════════ */}
        <div style={{ borderTop: '1px dashed rgba(42,41,40,0.15)', margin: '0.5rem 0' }} />

        {/* ════════ 9. Logout ════════ */}
        <AnimatePresence>
          {!showLogoutConfirm ? (
            <motion.div
              key="logoutBtn"
              style={{ ...settingsItem, cursor: 'pointer' }}
              onClick={() => setShowLogoutConfirm(true)}
            >
              <div>
                <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#2A2928', margin: 0 }}>🚪 Logout</h4>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="logoutConfirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ ...sectionCard, border: '1.5px solid rgba(42,41,40,0.2)' }}
            >
              <p style={{ fontFamily: 'Instrument Sans', color: '#2A2928', margin: '0 0 1rem 0' }}>
                Are you sure you want to leave the desk?
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <button
                  onClick={handleLogout}
                  style={{ background: 'none', border: 'none', color: '#7A6D8C', cursor: 'pointer', fontFamily: 'Space Grotesk' }}
                >Yes, logout</button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  style={{
                    padding: '0.7rem 1.2rem', background: '#2A2928', color: '#FAF7F1',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Space Grotesk',
                  }}
                >Stay here</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════════ 10. Delete Account ════════ */}
        <AnimatePresence>
          {!showDeleteConfirm ? (
            <motion.div
              key="deleteBtn"
              style={{ ...settingsItem, cursor: 'pointer' }}
              onClick={() => setShowDeleteConfirm(true)}
            >
              <div>
                <h4 style={{ fontFamily: 'Space Grotesk', fontSize: '1rem', color: '#C2674A', margin: 0 }}>🗑️ Delete Account</h4>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="deleteConfirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ ...sectionCard, border: '2px solid #C2674A', background: 'rgba(194,103,74,0.05)' }}
            >
              <p style={{ fontFamily: 'Instrument Sans', color: '#C2674A', fontWeight: 600, margin: '0 0 0.5rem 0' }}>
                ⚠️ This cannot be undone
              </p>
              <p style={{ fontFamily: 'Instrument Sans', color: '#2A2928', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
                All your print history, shelf memories, and wallet balance will be permanently erased. The desk will forget you.
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <button
                  onClick={handleDelete}
                  style={{ background: 'none', border: 'none', color: '#7A6D8C', cursor: 'pointer', fontFamily: 'Space Grotesk' }}
                >Delete everything</button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    padding: '0.7rem 1.2rem', background: '#C2674A', color: '#FAF7F1',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Space Grotesk',
                  }}
                >Keep my memories</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
