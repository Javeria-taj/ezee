'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RemindersProps {
  onClose: () => void;
}

interface Reminder {
  id: string;
  text: string;
  due: string;
  color: string; // Hex color code from design palette
  rotation: string;
  type: 'pickup' | 'academic';
}

export default function Reminders({ onClose }: RemindersProps) {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 'rem-1', text: 'Pick up Chemistry Lab Report 4 from Ezee Prints Counter!', due: 'Today before 6 PM', color: '#D48A70', rotation: '-3deg', type: 'pickup' },
    { id: 'rem-2', text: 'Calculus assignment submission deadline', due: 'Monday morning', color: '#A9B59D', rotation: '2deg', type: 'academic' },
    { id: 'rem-3', text: 'Prepare Physics print file (chapters 4-6)', due: 'Tuesday', color: '#EAE4DD', rotation: '-1deg', type: 'academic' }
  ]);

  const [newText, setNewText] = useState('');
  const [newType, setNewType] = useState<'pickup' | 'academic'>('academic');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const colors = ['#A9B59D', '#D48A70', '#EAE4DD', '#7A6D8C'];
    const selectedColor = newType === 'pickup' ? '#D48A70' : colors[Math.floor(Math.random() * colors.length)];
    const randomRot = `${(Math.random() * 6 - 3).toFixed(1)}deg`;

    const newReminder: Reminder = {
      id: `rem-${Date.now()}`,
      text: newText,
      due: newType === 'pickup' ? 'Today' : 'Upcoming',
      color: selectedColor,
      rotation: randomRot,
      type: newType
    };

    setReminders([...reminders, newReminder]);
    setNewText('');
  };

  const handleRemove = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 20 }}
      transition={{ type: 'spring', damping: 28, stiffness: 100 }}
      style={{
        position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 1000,
        background: 'rgba(42, 41, 40, 0.25)', backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
    <motion.div className="mobile-col-1" style={{
      width: '720px', maxWidth: '95vw', maxHeight: '85vh', overflowY: 'auto',
      borderRadius: '8px', overflow: 'hidden',
      boxShadow: '0 30px 60px rgba(42,41,40,0.18)',
      position: 'relative',
    }}>
      {/* Cork board surface */}
      <div style={{
        backgroundColor: '#C4956A',
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 0)',
        backgroundSize: '14px 14px',
        boxShadow: 'inset 0 0 30px rgba(92,61,29,0.3)',
        padding: '2.5rem 2.5rem 1rem 2.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontSize: '0.72rem', color: 'rgba(250,247,241,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
              The board
            </div>
            <h2 style={{ fontFamily: 'Instrument Sans', fontSize: '1.8rem', color: '#FAF7F1', margin: 0, fontWeight: 400 }}>
              Pinned Notes
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(250,247,241,0.15)', border: '1px solid rgba(250,247,241,0.2)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(250,247,241,0.7)', fontSize: '1.4rem', lineHeight: 1 }}
            aria-label="Close board"
          >×</button>
        </div>

        {/* Sticky Notes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))', gap: '1.5rem', minHeight: '200px', marginBottom: '1.5rem' }}>
          <AnimatePresence>
          {reminders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                gridColumn: '1 / -1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '40px 0',
                color: 'rgba(250,247,241,0.45)',
              }}
            >
              <span style={{ fontSize: 36 }}>🌿</span>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15, margin: 0, textAlign: 'center' }}>
                Nothing due today.
              </p>
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, margin: 0, fontStyle: 'italic', textAlign: 'center' }}>
                Ezi approves.
              </p>
            </motion.div>
          )}
          {reminders.map((reminder) => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: parseFloat(reminder.rotation) }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: 'spring', damping: 22 }}
              style={{
                backgroundColor: reminder.color,
                color: reminder.color === '#7A6D8C' ? '#FAF7F1' : '#2A2928',
                padding: '1.25rem',
                borderRadius: '2px',
                boxShadow: '3px 10px 20px rgba(42,41,40,0.25)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Washi tape strip on top */}
              <div style={{
                position: 'absolute',
                top: '-8px', left: '30%',
                width: '40%', height: '16px',
                background: 'rgba(250,247,241,0.45)',
                borderRadius: '2px',
              }} />

              <button
                onClick={() => handleRemove(reminder.id)}
                style={{
                  position: 'absolute', top: '0.4rem', right: '0.4rem',
                  background: 'none', border: 'none', fontSize: '0.85rem',
                  cursor: 'pointer', color: 'inherit', opacity: 0.4, fontWeight: 'bold',
                }}
                title="Tear off"
              >
                ×
              </button>

              <div style={{ marginTop: '0.5rem' }}>
                <p style={{ fontFamily: 'Instrument Sans', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
                  {reminder.text}
                </p>
              </div>

              <div style={{
                marginTop: '1.2rem',
                borderTop: `1px dashed ${reminder.color === '#7A6D8C' ? 'rgba(250,247,241,0.3)' : 'rgba(42,41,40,0.15)'}`,
                paddingTop: '0.5rem',
                fontFamily: 'Space Grotesk',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}>
                {reminder.due}
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
      </div> {/* End cork board */}

      {/* Write-a-note scratchpad area */}
      <div style={{
        background: '#FAF7F1',
        padding: '1.5rem 2.5rem 2rem 2.5rem',
        borderTop: '3px solid rgba(92,61,29,0.2)',
      }}>
        {/* Type tabs — torn paper style */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '1rem' }}>
          {(['academic', 'pickup'] as const).map(type => (
            <button
              key={type}
              onClick={() => setNewType(type)}
              style={{
                background: newType === type ? '#FAF7F1' : 'transparent',
                border: 'none',
                borderBottom: newType === type ? '2px solid #D48A70' : '2px solid transparent',
                padding: '0.4rem 1rem',
                fontFamily: 'Space Grotesk',
                fontSize: '0.8rem',
                color: newType === type ? '#2A2928' : 'rgba(42,41,40,0.4)',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                transition: 'all 0.2s',
              }}
            >
              {type === 'academic' ? 'Study Task' : 'Print Pick-up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder={newType === 'pickup' ? 'Pick up from printer...' : 'Write a note...'}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            style={{
              flex: 1, padding: '0.7rem 1rem',
              border: '1px solid rgba(42,41,40,0.15)',
              outline: 'none', background: '#fff',
              fontFamily: 'Instrument Sans', fontSize: '0.95rem',
              borderRadius: '3px', color: '#2A2928',
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, rgba(42,41,40,0.06) 24px)',
              backgroundSize: '100% 24px',
            }}
          />
          <button
            type="submit"
            style={{
              background: '#2A2928', color: '#FAF7F1',
              border: 'none', padding: '0.7rem 1.5rem',
              borderRadius: '3px', fontFamily: 'Space Grotesk',
              fontSize: '0.85rem', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#C4956A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#2A2928'; }}
          >
            Pin
          </button>
        </form>

        {/* Ezi's quiet note */}
        <p style={{
          fontFamily: 'Instrument Sans', fontSize: '0.82rem',
          color: 'rgba(42,41,40,0.3)', fontStyle: 'italic',
          margin: '1rem 0 0 0',
        }}>
          I pinned the important ones at the top.
        </p>
      </div>
    </motion.div>
    </motion.div>
  );
}
