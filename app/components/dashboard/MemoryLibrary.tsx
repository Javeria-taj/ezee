'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './library.module.css';
import { audio } from '../AudioEngine';
import { useMemorySystem } from '../print/useMemorySystem';

interface MemoryLibraryProps {
  onClose: () => void;
  isNight?: boolean;
  weather?: 'sunny' | 'rainy' | 'sunset' | 'midnight';
}

type MemoryType = 'notebook' | 'spiral' | 'folder' | 'trophy' | 'frame' | 'leather' | 'box';

interface MemoryCapsule {
  id: string;
  moment: string;
  type: MemoryType;
  title: string;
  desc: string;
  color: string;
  dateStr: string;
  isUserPrint?: boolean;
  copies?: number;
  binding?: string;
  shopName?: string;
  weatherName?: string;
  isLateNight?: boolean;
  pageCount?: number;
}

export default function MemoryLibrary({ onClose, isNight = false, weather = 'sunny' }: MemoryLibraryProps) {
  const { memory } = useMemorySystem();
  const [allMemories, setAllMemories] = useState<MemoryCapsule[]>([]);
  const [activeMemoryCapsule, setActiveMemoryCapsule] = useState<MemoryCapsule | null>(null);
  
  // Ezi cycles through quiet states: 'reading', 'dusting', 'sleeping'
  const [eziAction, setEziAction] = useState<'reading' | 'dusting' | 'sleeping'>('reading');
  const [catPurred, setCatPurred] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Play ambient library ticking on mount
  useEffect(() => {
    audio.playFeedbackClick();
    
    // Cycle Ezi's actions quietly every 15 seconds
    const eziInterval = setInterval(() => {
      const states: ('reading' | 'dusting' | 'sleeping')[] = ['reading', 'dusting', 'sleeping'];
      const randomState = states[Math.floor(Math.random() * states.length)];
      setEziAction(randomState);
    }, 15000);

    // Dust & ambient sounds occasional trigger
    const soundInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        audio.playClockTick(true);
      }
    }, 10000);

    return () => {
      clearInterval(eziInterval);
      clearInterval(soundInterval);
    };
  }, []);

  // Sync print sessions from useMemorySystem
  useEffect(() => {
    const defaultMemories: MemoryCapsule[] = [
      { id: 'm1', moment: 'First Semester', type: 'notebook', title: 'Calculus Notes', desc: 'Sleepless nights, exam panic, and coffee stains.', color: '#8C6C5A', dateStr: 'Oct 14, 2022' },
      { id: 'm2', moment: 'Hackathon Nights', type: 'trophy', title: 'Presentation.pdf', desc: 'Built in 48 hours. Barely compiled, but we won our first tech prize.', color: '#D4AF37', dateStr: 'Feb 18, 2023' },
      { id: 'm3', moment: 'Placement Season', type: 'folder', title: 'Resume_Final_v3', desc: 'The draft that unlocked my first software engineering internship.', color: '#4A5D4E', dateStr: 'Sep 05, 2023' },
      { id: 'm4', moment: 'Internship Summer', type: 'spiral', title: 'Lab Records', desc: 'Pages filled with research data, tests, and hardware layouts.', color: '#5B7085', dateStr: 'Jul 22, 2024' },
      { id: 'm5', moment: 'Final Year', type: 'leather', title: 'Thesis Project', desc: 'A year of research bound with gold embossing and leather.', color: '#3E2723', dateStr: 'Apr 30, 2025' },
      { id: 'm6', moment: 'Graduation', type: 'frame', title: 'Degree Certificate', desc: 'Four years summarized in a single, beautiful frame.', color: '#BCAAA4', dateStr: 'Jun 15, 2025' },
      { id: 'm7', moment: 'Graduation', type: 'box', title: 'Offer Letter', desc: 'Official keepsakes box holding the start of my tech career.', color: '#A0644D', dateStr: 'Jun 20, 2025' },
    ];

    const userMemories: MemoryCapsule[] = (memory.printedFiles || []).map((file) => {
      let type: MemoryType = 'notebook'; // default
      const fileType = file.type as string;
      
      if (fileType === 'general') {
        const lower = file.name.toLowerCase();
        if (lower.includes('cert')) type = 'frame';
        else if (lower.includes('offer') || lower.includes('letter') || lower.includes('contract')) type = 'box';
        else if (lower.includes('presentation') || lower.includes('pitch') || lower.includes('win')) type = 'trophy';
        else if (lower.includes('thesis') || lower.includes('report') || lower.includes('project')) type = 'leather';
        else if (lower.includes('lab') || lower.includes('record') || lower.includes('experiment')) type = 'spiral';
        else if (lower.includes('resume') || lower.includes('cv')) type = 'folder';
        else type = 'notebook';
      } else if (fileType === 'resume') {
        type = 'folder';
      } else if (fileType === 'exam') {
        type = 'notebook';
      } else if (fileType === 'project') {
        type = 'leather';
      } else if (fileType === 'lab') {
        type = 'spiral';
      }

      const colors = {
        notebook: '#A1887F',
        spiral: '#78909C',
        folder: '#81C784',
        trophy: '#FFD54F',
        frame: '#D7CCC8',
        leather: '#5D4037',
        box: '#FFB74D',
      };

      const desc = file.binding && file.binding !== 'none'
        ? `Printed ${file.pageCount} pages with ${file.binding} binding at Cozy Print Shop.`
        : `Printed ${file.pageCount} pages at Cozy Print Shop.`;

      return {
        id: file.id,
        moment: file.isLateNight ? 'Late Night Study' : 'Day Study',
        type,
        title: file.name,
        desc: desc,
        color: colors[type] || '#A1887F',
        dateStr: file.timestamp,
        isUserPrint: true,
        copies: file.copies,
        binding: file.binding,
        shopName: file.shopName,
        weatherName: file.weather,
        isLateNight: file.isLateNight,
        pageCount: file.pageCount
      };
    });

    const timer = setTimeout(() => {
      setAllMemories((prev) => {
        const next = [...defaultMemories, ...userMemories];
        return JSON.stringify(prev) === JSON.stringify(next) ? prev : next;
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [memory.printedFiles]);

  const handleOpenMemory = (capsule: MemoryCapsule) => {
    audio.playPageFlip();
    setActiveMemoryCapsule(capsule);
  };

  const handleCloseMemory = () => {
    audio.playPageFlip();
    setActiveMemoryCapsule(null);
  };

  // Split memories onto 3 wood shelves
  const shelf1 = allMemories.slice(0, 4);
  const shelf2 = allMemories.slice(4, 8);
  const shelf3 = allMemories.slice(8);

  // Generate dust particles
  const dustParticles = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${(i * 17) % 100}%`,
    top: `${(i * 23) % 100}%`,
    size: (i % 3) + 1,
    delay: (i * 0.5) % 12,
    duration: (i % 8) + 12
  })), []);

  // Dynamic Background styling based on Weather/Time
  const getBackgroundStyle = () => {
    switch (weather) {
      case 'sunny':
        return 'linear-gradient(135deg, #FDFBF7 0%, #E6DFCD 100%)';
      case 'sunset':
        return 'linear-gradient(135deg, #F3A183 0%, #D48A70 50%, #5F4B66 100%)';
      case 'rainy':
        return 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)';
      case 'midnight':
        return 'linear-gradient(135deg, #1A1C29 0%, #0F1016 100%)';
      default:
        return 'linear-gradient(135deg, #FAF7F1 0%, #EAE4DD 100%)';
    }
  };

  const getTextColor = () => {
    if (weather === 'midnight' || weather === 'rainy') {
      return 'rgba(234, 228, 221, 0.8)';
    }
    return 'rgba(42, 41, 40, 0.8)';
  };

  // Determine current active season decoration
  const getSeasonDecoration = () => {
    const month = new Date().getMonth();
    if (month === 2) return 'ramadan'; // March
    if (month === 9 || month === 10) return 'diwali'; // Oct/Nov
    if (month === 11) return 'christmas'; // Dec
    return memory.isFestival ? 'diwali' : 'normal';
  };

  const season = getSeasonDecoration();

  // Handwritten nostalgic reflections
  const getNostalgicJournalText = (capsule: MemoryCapsule) => {
    if (capsule.isUserPrint) {
      const bindingStr = capsule.binding && capsule.binding !== 'none' ? ` with ${capsule.binding} binding` : '';
      const lateNightText = capsule.isLateNight 
        ? "It was late night, the desk lamp was the only light source, and Ezi was curled up next to the keyboard. You were exhausted but determined."
        : "You printed this in the middle of a busy study session, moving one step closer to graduation.";
      return `Flipped through this printed file today. You sent this${bindingStr} to ${capsule.shopName || 'Cozy Print Shop'}. ${lateNightText} Every printed page here was a small piece of your college journey. Looking back, you can say: you were building a future.`;
    }

    switch (capsule.id) {
      case 'm1':
        return "Calculus notes. Your first semester. Everything was new, slightly overwhelming, and intimidating. You spent hours highlighting notes, panicking about integrals. You made it through, though you didn't think you would at the time.";
      case 'm2':
        return "The hackathon project presentation. 48 sleepless hours of coding, laughter, and cold pizza. The code was a complete mess and barely compiled, but the feeling of building something real with friends was unmatched. A true badge of honor.";
      case 'm3':
        return "The resume that started it all. You spent hours aligning margins and describing minor projects, desperately hoping someone would give you a chance. This piece of paper was your ticket to the professional world. It represents your dreams starting to take shape.";
      case 'm4':
        return "Lab records. Filled with endless pages of experiments, charts, and diagrams. It was tedious and exhausting, but it was where you learned the patience of a researcher. The smell of the lab and the sound of machines come rushing back.";
      case 'm5':
        return "The final year thesis. The culmination of everything you learned. Bound with countless tears, sleepless nights, and deep self-doubt. Holding the heavy leather cover in your hands, you realized how much you had grown since your first day on campus.";
      case 'm6':
        return "The degree. The paper that says you did it. Four years of friendship, struggle, panic, late-night walks, and growth captured in one formal frame. You stepped out of the hall as a graduate, but a piece of your heart stayed in this room.";
      case 'm7':
        return "The official offer letter. Safe in its keepsakes box. The moment of relief when you realized you had a path ahead. It was the closing bracket of your student chapter and the opening line of a brand new adventure.";
      default:
        return "An old memory. A document printed in a moment of panic or excitement. Looking at it now, you can feel the faint presence of who you used to be, typing away at your keyboard, hoping for the best.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className={styles.libraryContainer}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: getBackgroundStyle(),
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3rem 2rem 8rem 2rem',
      }}
      ref={containerRef}
    >
      {/* Texture SVG filters */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="wood-grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.12" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="
              1 0 0 0 0.45
              0 1 0 0 0.28
              0 0 1 0 0.15
              0 0 0 0.2 0
            " result="color" />
            <feBlend mode="multiply" in="SourceGraphic" in2="color" />
          </filter>
          <filter id="paper-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="2" result="light">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
            <feBlend mode="multiply" in="SourceGraphic" in2="light" />
          </filter>
        </defs>
      </svg>

      {/* Tactile overlays */}
      <div className={styles.paperOverlay} />
      <div className={styles.lampGlow} style={{ top: '15%', left: '15%', width: '350px', height: '350px' }} />
      
      {/* Weather Specific Backdrops */}
      {weather === 'sunny' && <div className={styles.sunRays} />}
      {weather === 'rainy' && (
        <div className={styles.rainOverlay}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={styles.raindrop}
              style={{
                left: `${(i * 3.33) % 100}%`,
                animationDelay: `${(i * 0.1) % 1.5}s`,
                animationDuration: `${0.8 + ((i % 5) * 0.1)}s`,
                opacity: 0.15 + ((i % 4) * 0.05)
              }}
            />
          ))}
        </div>
      )}
      {weather === 'midnight' && (
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '120px', height: '120px', opacity: 0.15, pointerEvents: 'none' }}>
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" fill="#FAF7F1" />
            <circle cx="35" cy="50" r="40" fill="#1A1C29" />
          </svg>
        </div>
      )}

      {/* Dust floating particles */}
      {dustParticles.map((p: { id: number; left: string; top: string; size: number; delay: number; duration: number }) => (
        <div
          key={p.id}
          className={styles.dustParticle}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '2rem', right: '3rem',
          background: 'rgba(42, 41, 40, 0.05)', border: '1px solid rgba(42, 41, 40, 0.1)',
          fontSize: '0.9rem', fontFamily: 'Space Grotesk',
          padding: '0.5rem 1.5rem', borderRadius: '30px',
          color: getTextColor(), cursor: 'pointer',
          zIndex: 100, transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(42, 41, 40, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(42, 41, 40, 0.05)';
        }}
      >
        Close Journal
      </button>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', zIndex: 10 }}>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontFamily: 'Instrument Sans',
            fontSize: '3.2rem',
            color: weather === 'midnight' || weather === 'rainy' ? '#FAF7F1' : '#2A2928',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            margin: 0
          }}
        >
          Library of Memories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontFamily: 'Space Grotesk',
            color: getTextColor(),
            fontSize: '1rem',
            fontStyle: 'italic',
            marginTop: '0.5rem'
          }}
        >
          &quot;Who was I when I printed this?&quot;
        </motion.p>
      </div>

      {/* Bookshelf Section */}
      <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
        
        {/* Seasonal Hanging lights across top */}
        {season === 'christmas' && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '-10px' }}>
            <svg width="400" height="20" viewBox="0 0 400 20">
              <path d="M0,5 Q100,15 200,5 Q300,15 400,5" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
              {[30, 70, 110, 150, 190, 230, 270, 310, 350, 390].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={5 + Math.sin((x / 200) * Math.PI) * 7}
                  r="3.5"
                  fill={i % 3 === 0 ? '#FF5252' : i % 3 === 1 ? '#4CAF50' : '#FFD54F'}
                  style={{ animation: 'flicker 1.5s infinite alternate', animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </svg>
          </div>
        )}
        {season === 'ramadan' && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '-10px', gap: '30px' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <svg key={i} width="20" height="40" viewBox="0 0 20 40">
                <line x1="10" y1="0" x2="10" y2="15" stroke="rgba(0,0,0,0.3)" />
                <polygon points="6,15 14,15 12,23 8,23" fill="#D48A70" stroke="#2A2928" strokeWidth="0.8" />
                <rect x="7" y="23" width="6" height="8" fill="#F4D03F" />
                <polygon points="8,31 12,31 10,36" fill="#D48A70" stroke="#2A2928" strokeWidth="0.8" />
              </svg>
            ))}
          </div>
        )}
        {season === 'diwali' && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '-10px', gap: '25px' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="24" height="20" viewBox="0 0 24 20">
                <path d="M 2 15 C 2 19, 22 19, 22 15 Z" fill="#D48A70" stroke="#2A2928" strokeWidth="1" />
                <path d="M 12 15 C 10 9, 14 9, 12 4 Z" fill="#F4D03F" />
              </svg>
            ))}
          </div>
        )}

        {/* SHELF 1 */}
        <div className={styles.shelfRow}>
          <div className={styles.shelfItems}>
            {shelf1.map((capsule, idx) => (
              <motion.div
                key={capsule.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.6 }}
                className={styles.memoryCapsule}
                onClick={() => handleOpenMemory(capsule)}
              >
                <div style={{ position: 'relative', width: '140px', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <MemoryObject type={capsule.type} color={capsule.color} title={capsule.title} isNight={isNight} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className={styles.woodBoard} style={{ filter: 'url(#wood-grain-filter)' }} />
        </div>

        {/* SHELF 2 */}
        <div className={styles.shelfRow}>
          <div className={styles.shelfItems}>
            {shelf2.map((capsule, idx) => (
              <motion.div
                key={capsule.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + 0.1 * idx, duration: 0.6 }}
                className={styles.memoryCapsule}
                onClick={() => handleOpenMemory(capsule)}
              >
                <div style={{ position: 'relative', width: '140px', height: '180px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                  <MemoryObject type={capsule.type} color={capsule.color} title={capsule.title} isNight={isNight} />
                </div>
              </motion.div>
            ))}
            
            {/* Scattered Wall sticky notes based on memory system */}
            {memory.stickyNotes && memory.stickyNotes.map((note, noteIdx) => (
              <div
                key={note.id}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: `${20 + noteIdx * 20}%`,
                  width: '45px',
                  height: '45px',
                  background: note.color || '#F4D03F',
                  transform: `rotate(${note.rotate}deg)`,
                  boxShadow: '1px 3px 6px rgba(0,0,0,0.15)',
                  padding: '4px',
                  fontSize: '5px',
                  fontFamily: 'Space Grotesk',
                  color: '#2A2928',
                  zIndex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}
              >
                <span style={{ textAlign: 'center', lineHeight: 1.1 }}>{note.text}</span>
              </div>
            ))}
          </div>
          <div className={styles.woodBoard} style={{ filter: 'url(#wood-grain-filter)' }} />
        </div>

        {/* SHELF 3 */}
        <div className={styles.shelfRow}>
          <div className={styles.shelfItems} style={{ justifyContent: shelf3.length > 0 ? 'flex-start' : 'center', gap: '3rem' }}>
            {shelf3.length > 0 ? (
              shelf3.map((capsule, idx) => (
                <motion.div
                  key={capsule.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + 0.1 * idx, duration: 0.6 }}
                  className={styles.memoryCapsule}
                  onClick={() => handleOpenMemory(capsule)}
                >
                  <div style={{ position: 'relative', width: '130px', height: '170px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <MemoryObject type={capsule.type} color={capsule.color} title={capsule.title} isNight={isNight} />
                  </div>
                </motion.div>
              ))
            ) : (
              // Empty shelf decorative layout: stacks of coffee cups and little plants/ornaments
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3rem', opacity: 0.7, minHeight: '100px' }}>
                <span style={{ fontSize: '0.85rem', fontFamily: 'Space Grotesk', fontStyle: 'italic', color: getTextColor() }}>
                  Your printed documents will fill this shelf...
                </span>
              </div>
            )}
          </div>
          <div className={styles.woodBoard} style={{ filter: 'url(#wood-grain-filter)' }} />
        </div>

      </div>

      {/* Diary Vintage Journal Double-Page Overlay Modal */}
      <AnimatePresence>
        {activeMemoryCapsule && (
          <motion.div
            className={styles.diaryOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.diaryBook}
              style={{ filter: 'url(#paper-noise)' }}
              initial={{ rotateY: -35, rotateX: 5, scale: 0.9, opacity: 0 }}
              animate={{ rotateY: 0, rotateX: 0, scale: 1, opacity: 1 }}
              exit={{ rotateY: 35, rotateX: -5, scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 85 }}
            >
              {/* Left Page (Details & Receipt stamp) */}
              <div className={styles.diaryLeftPage}>
                <div className={styles.stampedReceipt}>
                  <h3>EZEE PRINT RECORD</h3>
                  <div className={styles.divider} />
                  <p><strong>Item:</strong> {activeMemoryCapsule.title}</p>
                  <p><strong>Milestone:</strong> {activeMemoryCapsule.moment}</p>
                  <p><strong>Date Printed:</strong> {activeMemoryCapsule.dateStr}</p>
                  
                  {activeMemoryCapsule.isUserPrint ? (
                    <>
                      <p><strong>Page Count:</strong> {activeMemoryCapsule.pageCount || 1} Pages</p>
                      <p><strong>Total Copies:</strong> {activeMemoryCapsule.copies || 1} Copies</p>
                      <p><strong>Binding:</strong> {activeMemoryCapsule.binding || 'None'}</p>
                      <p><strong>Print Shop:</strong> {activeMemoryCapsule.shopName || 'Cozy Partner'}</p>
                      <p><strong>Time of Day:</strong> {activeMemoryCapsule.isLateNight ? 'Late Night (Quiet)' : 'Day'}</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Category:</strong> Core College Milestone</p>
                      <p><strong>Status:</strong> Permanently Saved</p>
                      <p><strong>Binding Style:</strong> Vintage Keep</p>
                      <p><strong>Printed At:</strong> Cozy Campus Corner</p>
                    </>
                  )}
                  
                  {/* Stamped coffee ring overlay */}
                  <div className={styles.coffeeStain} />
                </div>
              </div>

              {/* Right Page (Journal handwritten note) */}
              <div className={styles.diaryRightPage}>
                <div className={styles.journalText}>
                  <h3>Handwritten Reflection</h3>
                  <p>{getNostalgicJournalText(activeMemoryCapsule)}</p>
                  
                  <button
                    className={styles.closeDiaryBtn}
                    onClick={handleCloseMemory}
                  >
                    Close Diary
                  </button>
                </div>
                {/* Vintage ribbon bookmark */}
                <div className={styles.diaryRibbon} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Scene: Ezi, Cat, Coffee, Plants */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '0', right: '0',
        display: 'flex', justifyContent: 'space-between', padding: '0 6rem',
        alignItems: 'flex-end', zIndex: 12, pointerEvents: 'none'
      }}>
        
        {/* Growing Plant (synced to memory.plantStage) & Sleeping Cat */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2.5rem', pointerEvents: 'auto' }}>
          
          {/* Dynamic Plant SVG */}
          <div title="Desk Plant" style={{ cursor: 'pointer' }}>
            <svg width="80" height="120" viewBox="0 0 100 150">
              <path d="M 30 150 L 70 150 L 80 100 L 20 100 Z" fill="#BCAAA4" stroke="#2A2928" strokeWidth="3" />
              {/* Plant grows leaf branches based on plantStage */}
              {memory.plantStage === 1 && (
                <path d="M 50 100 Q 30 80 30 65 Q 40 65 50 90" fill="#81C784" stroke="#2A2928" strokeWidth="2" className={styles.plantLeaf} />
              )}
              {memory.plantStage === 2 && (
                <>
                  <path d="M 50 100 Q 20 70 10 45 Q 30 45 50 90" fill="#81C784" stroke="#2A2928" strokeWidth="2" className={styles.plantLeaf} />
                  <path d="M 50 100 Q 80 70 90 45 Q 70 45 50 90" fill="#81C784" stroke="#2A2928" strokeWidth="2" className={styles.plantLeaf} style={{ animationDelay: '0.5s' }} />
                </>
              )}
              {memory.plantStage === 3 && (
                <>
                  <path d="M 50 100 Q 20 70 10 45 Q 30 45 50 90" fill="#81C784" stroke="#2A2928" strokeWidth="2" className={styles.plantLeaf} />
                  <path d="M 50 100 Q 80 70 90 45 Q 70 45 50 90" fill="#81C784" stroke="#2A2928" strokeWidth="2" className={styles.plantLeaf} style={{ animationDelay: '0.5s' }} />
                  <path d="M 50 100 Q 50 55 50 25 Q 60 25 50 90" fill="#66BB6A" stroke="#2A2928" strokeWidth="2" className={styles.plantLeaf} style={{ animationDelay: '1s' }} />
                  <path d="M 50 100 Q 35 60 20 45 Q 35 40 50 90" fill="#66BB6A" stroke="#2A2928" strokeWidth="2" className={styles.plantLeaf} style={{ animationDelay: '0.8s' }} />
                  {/* blossoms */}
                  <circle cx="20" cy="40" r="4.5" fill="#FF8A80" stroke="#2A2928" strokeWidth="1" />
                  <circle cx="80" cy="40" r="4.5" fill="#FF8A80" stroke="#2A2928" strokeWidth="1" />
                  <circle cx="50" cy="20" r="4.5" fill="#FF8A80" stroke="#2A2928" strokeWidth="1" />
                </>
              )}
            </svg>
          </div>

          {/* Sleeping Cat (Tail wiggle & soft sound on click) */}
          <div onClick={() => { setCatPurred(true); setTimeout(() => setCatPurred(false), 2000); }}>
            <svg width="70" height="45" viewBox="0 0 70 45" className={styles.sleepingCat}>
              <ellipse cx="32" cy="28" rx="26" ry="14" fill={isNight ? "#212121" : "#424242"} />
              <circle cx="16" cy="22" r="11" fill={isNight ? "#212121" : "#424242"} />
              <polygon points="6,15 11,5 19,13" fill={isNight ? "#212121" : "#424242"} />
              <polygon points="15,13 20,3 25,13" fill={isNight ? "#212121" : "#424242"} />
              {/* Zzz sleeping */}
              <text x="48" y="12" fontSize="9" fill={getTextColor()} opacity="0.4" className={styles.steam}>Z</text>
              <text x="54" y="6" fontSize="7" fill={getTextColor()} opacity="0.2" className={styles.steam} style={{ animationDelay: '1.2s' }}>z</text>
              
              {/* Purr rings if clicked */}
              {catPurred && (
                <path d="M 12 10 Q 14 5 18 10" stroke="#7A6D8C" strokeWidth="1.5" fill="none" style={{ animation: 'rise 1s forwards' }} />
              )}
            </svg>
          </div>
        </div>

        {/* Ezi Cycling Actions: Reading, Dusting, Sleeping */}
        <div style={{ pointerEvents: 'auto' }}>
          {eziAction === 'reading' && (
            <div title="Ezi reading quietly">
              <svg width="85" height="90" viewBox="0 0 80 90">
                <rect x="28" y="45" width="24" height="40" fill={isNight ? "#3E2723" : "#8D6E63"} rx="5" />
                {/* Face & Eyes */}
                <ellipse cx="40" cy="32" rx="20" ry="16" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2.5" />
                <circle cx="33" cy="30" r="2.2" fill="#2A2928" />
                <circle cx="47" cy="30" r="2.2" fill="#2A2928" />
                {/* Blush */}
                <ellipse cx="27" cy="34" rx="4" ry="2" fill="#FF8A80" opacity="0.7" />
                <ellipse cx="53" cy="34" rx="4" ry="2" fill="#FF8A80" opacity="0.7" />
                {/* Beret hat */}
                <path d="M 23 23 Q 40 10 57 23 Z" fill="#9CCC65" stroke="#2A2928" strokeWidth="2" />
                <circle cx="40" cy="12" r="3.5" fill="#C5E1A5" stroke="#2A2928" strokeWidth="1.5" />
                {/* Book Ezi is reading */}
                <path d="M 22 55 L 40 60 L 58 55 L 40 50 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="1.5" />
                <path d="M 22 55 L 40 60 L 40 63 L 22 58 Z" fill="#E0E0E0" stroke="#2A2928" strokeWidth="1.5" />
                <path d="M 58 55 L 40 60 L 40 63 L 58 58 Z" fill="#BDBDBD" stroke="#2A2928" strokeWidth="1.5" />
              </svg>
            </div>
          )}

          {eziAction === 'dusting' && (
            <div title="Ezi dusting the bookshelves" className={styles.eziDusting}>
              <svg width="85" height="90" viewBox="0 0 80 90">
                <rect x="28" y="45" width="24" height="40" fill={isNight ? "#3E2723" : "#8D6E63"} rx="5" />
                <ellipse cx="40" cy="32" rx="20" ry="16" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2.5" />
                <circle cx="33" cy="30" r="2.2" fill="#2A2928" />
                <circle cx="47" cy="30" r="2.2" fill="#2A2928" />
                <ellipse cx="27" cy="34" rx="4" ry="2" fill="#FF8A80" opacity="0.7" />
                <ellipse cx="53" cy="34" rx="4" ry="2" fill="#FF8A80" opacity="0.7" />
                <path d="M 23 23 Q 40 10 57 23 Z" fill="#9CCC65" stroke="#2A2928" strokeWidth="2" />
                <circle cx="40" cy="12" r="3.5" fill="#C5E1A5" stroke="#2A2928" strokeWidth="1.5" />
                {/* Feather Duster */}
                <line x1="26" y1="58" x2="10" y2="40" stroke="#8D6E63" strokeWidth="3" strokeLinecap="round" />
                <path d="M 10 40 Q 5 25 15 28 Q 20 32 10 40" fill="#FF8A80" stroke="#2A2928" strokeWidth="1.5" />
              </svg>
            </div>
          )}

          {eziAction === 'sleeping' && (
            <div title="Ezi sleeping next to the shelf" className={styles.eziSleeping}>
              <svg width="85" height="90" viewBox="0 0 80 90">
                {/* Patchwork blanket */}
                <rect x="18" y="55" width="44" height="30" fill="#78909C" rx="4" stroke="#2A2928" strokeWidth="2" />
                <rect x="25" y="45" width="30" height="20" fill={isNight ? "#3E2723" : "#8D6E63"} rx="5" />
                <ellipse cx="40" cy="40" rx="18" ry="14" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2" />
                {/* Closed sleeping eyes */}
                <path d="M 33 40 Q 35 43 37 40" stroke="#2A2928" strokeWidth="2" fill="none" />
                <path d="M 43 40 Q 45 43 47 40" stroke="#2A2928" strokeWidth="2" fill="none" />
                <ellipse cx="26" cy="42" rx="3" ry="1.5" fill="#FF8A80" opacity="0.6" />
                <ellipse cx="54" cy="42" rx="3" ry="1.5" fill="#FF8A80" opacity="0.6" />
                {/* Beret resting on side */}
                <path d="M 18 36 Q 30 25 36 36 Z" fill="#9CCC65" stroke="#2A2928" strokeWidth="1.5" transform="rotate(-15, 30, 30)" />
                {/* Zzz floating */}
                <text x="56" y="24" fontSize="10" fill={getTextColor()} opacity="0.4" className={styles.steam}>Z</text>
                <text x="62" y="17" fontSize="8" fill={getTextColor()} opacity="0.2" className={styles.steam} style={{ animationDelay: '1.5s' }}>z</text>
              </svg>
            </div>
          )}
        </div>

        {/* Coffee Mug stack (accumulating up to 4 cups based on memory.coffeeMugs) */}
        <div style={{ position: 'relative', display: 'flex', gap: '5px', zIndex: 12 }}>
          {Array.from({ length: Math.min(4, Math.max(1, memory.coffeeMugs || 1)) }).map((_, i) => (
            <div key={i} style={{ position: 'relative', transform: i > 0 ? `translateY(${i * -3}px) rotate(${i * 6 - 3}deg)` : undefined }}>
              {/* Only the top coffee cup has active steam */}
              {i === Math.min(4, Math.max(1, memory.coffeeMugs || 1)) - 1 && (
                <div className={styles.steam} style={{ left: '8px', bottom: '26px' }} />
              )}
              <svg width="35" height="26" viewBox="0 0 40 30">
                <rect x="5" y="10" width="24" height="18" fill={i % 2 === 0 ? "#FAF7F1" : "#EAE4DD"} rx="2" stroke="#2A2928" strokeWidth="1.5" />
                <path d="M29 14 C35 14 35 22 29 22" fill="none" stroke="#2A2928" strokeWidth="2.5" />
                <ellipse cx="17" cy="10" rx="12" ry="3.5" fill="#5D4037" stroke="#2A2928" strokeWidth="1.5" />
              </svg>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}

// Memory Object visual component
function MemoryObject({ type, color, title, isNight }: { type: MemoryType, color: string, title: string, isNight: boolean }) {
  const strokeColor = '#2A2928';
  const shadowColor = isNight ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.15)';

  const variants = {
    idle: { rotateY: 0, scale: 1 },
    hover: { rotateY: -12, scale: 1.06, transition: { duration: 0.35, ease: 'easeOut' as const } }
  };

  return (
    <motion.div
      variants={variants}
      initial="idle"
      whileHover="hover"
      style={{
        width: '100%', height: '100%',
        display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        transformStyle: 'preserve-3d'
      }}
    >
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', transformStyle: 'preserve-3d' }}>
        
        {/* Worn Notebook (Exam notes) */}
        {type === 'notebook' && (
          <div style={{
            width: '105px', height: '150px',
            backgroundColor: color,
            borderRadius: '4px 10px 10px 4px',
            boxShadow: `-5px 5px 12px ${shadowColor}`,
            border: `2px solid ${strokeColor}`,
            borderLeft: `6px solid ${strokeColor}`,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* bookmark wiggling */}
            <div className={styles.bookmark} style={{ position: 'absolute', top: '-10px', right: '15px', width: '10px', height: '35px', backgroundColor: '#D48A70', border: `1.5px solid ${strokeColor}`, borderBottom: 'none' }} />
            {/* page curling corner */}
            <div className={styles.pageCorner} style={{ position: 'absolute', bottom: -1, right: -1, width: 0, height: 0, borderBottom: '16px solid #FAF7F1', borderLeft: '16px solid transparent', borderRight: `1px solid ${strokeColor}`, borderBottomRightRadius: '8px' }} />
            {/* label line */}
            <div style={{ width: '65px', height: '24px', backgroundColor: 'rgba(250, 247, 241, 0.8)', border: `1.5px solid ${strokeColor}`, borderRadius: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '7px', fontFamily: 'Space Grotesk', color: strokeColor, fontWeight: 'bold', padding: '2px', overflow: 'hidden' }}>
              {title.slice(0, 15)}
            </div>
          </div>
        )}

        {/* Spiral Book (Lab Records) */}
        {type === 'spiral' && (
          <div style={{
            width: '110px', height: '155px',
            backgroundColor: '#FAF7F1',
            borderRadius: '4px',
            boxShadow: `-4px 5px 10px ${shadowColor}`,
            border: `2px solid ${strokeColor}`,
            position: 'relative'
          }}>
            {/* Spiral binding rings */}
            <div style={{ position: 'absolute', left: '-5px', top: '10px', bottom: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{ width: '12px', height: '5px', backgroundColor: '#555', border: `1.5px solid ${strokeColor}`, borderRadius: '3px', transform: 'rotate(-15deg)' }} />
              ))}
            </div>
            {/* Cover design */}
            <div style={{ position: 'absolute', inset: '10px 10px 10px 15px', border: `1.5px solid ${color}`, opacity: 0.6, borderRadius: '2px' }} />
            <div style={{ position: 'absolute', top: '25%', left: '20px', right: '10px', fontSize: '8px', fontFamily: 'Space Grotesk', color: strokeColor, fontWeight: 'bold' }}>
              {title.slice(0, 15)}
            </div>
            {/* Coffee stain ring */}
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '35px', height: '35px', borderRadius: '50%', border: '2.5px solid rgba(139,90,43,0.12)' }} />
          </div>
        )}

        {/* Folder (Resumes) */}
        {type === 'folder' && (
          <div style={{
            width: '120px', height: '140px',
            backgroundColor: color,
            borderRadius: '2px 8px 8px 2px',
            boxShadow: `-5px 5px 12px ${shadowColor}`,
            border: `2px solid ${strokeColor}`,
            position: 'relative'
          }}>
            {/* Folder Tab */}
            <div style={{ position: 'absolute', top: '-11px', left: '15px', width: '45px', height: '11px', backgroundColor: color, border: `2px solid ${strokeColor}`, borderBottom: 'none', borderRadius: '4px 4px 0 0' }} />
            {/* Papers inside */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', right: '15px', bottom: '15px', backgroundColor: '#FAF7F1', border: `1.5px solid ${strokeColor}`, borderRadius: '2px', display: 'flex', flexDirection: 'column', padding: '6px', overflow: 'hidden' }}>
              <div style={{ fontSize: '7px', fontFamily: 'Space Grotesk', color: strokeColor, fontWeight: 'bold', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '2px', marginBottom: '4px' }}>
                {title.slice(0, 14)}
              </div>
              <div style={{ width: '100%', height: '1.5px', background: 'rgba(0,0,0,0.15)', margin: '2px 0' }} />
              <div style={{ width: '80%', height: '1.5px', background: 'rgba(0,0,0,0.15)', margin: '2px 0' }} />
              <div style={{ width: '90%', height: '1.5px', background: 'rgba(0,0,0,0.15)', margin: '2px 0' }} />
            </div>
          </div>
        )}

        {/* Trophy Case (Hackathons) */}
        {type === 'trophy' && (
          <div style={{
            width: '100px', height: '145px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'
          }}>
            {/* Glowing Golden Trophy */}
            <svg width="75" height="110" viewBox="0 0 100 120" style={{ filter: `drop-shadow(-3px 5px 5px ${shadowColor})` }}>
              <path d="M 25 10 C 25 35, 75 35, 75 10 Z" fill={color} stroke={strokeColor} strokeWidth="2.5" />
              {/* handles */}
              <path d="M 25 20 C 10 20, 15 45, 27 45" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 75 20 C 90 20, 85 45, 73 45" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
              {/* Stem */}
              <rect x="44" y="38" width="12" height="35" fill={color} stroke={strokeColor} strokeWidth="2.5" />
              <path d="M 35 73 L 65 73 L 55 85 L 45 85 Z" fill={color} stroke={strokeColor} strokeWidth="2" />
              {/* Wood Base */}
              <rect x="25" y="85" width="50" height="20" fill="#5C3D1D" stroke={strokeColor} strokeWidth="2.5" rx="2" />
              {/* Gold plate */}
              <rect x="35" y="90" width="30" height="10" fill="#FFD54F" stroke={strokeColor} strokeWidth="1" />
            </svg>
          </div>
        )}

        {/* Certificate Frame (Certificates) */}
        {type === 'frame' && (
          <div style={{
            width: '135px', height: '105px',
            backgroundColor: '#5D4037',
            borderRadius: '4px',
            boxShadow: `-5px 5px 12px ${shadowColor}`,
            border: `3px solid ${strokeColor}`,
            padding: '6px',
            display: 'flex'
          }}>
            <div style={{ flex: 1, backgroundColor: color, border: `1.5px solid ${strokeColor}`, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4px' }}>
              <div style={{ position: 'absolute', top: '4px', left: '4px', right: '4px', bottom: '4px', border: '0.8px dashed rgba(0,0,0,0.15)' }} />
              <div style={{ fontSize: '7px', fontFamily: 'Georgia', fontStyle: 'italic', color: strokeColor, fontWeight: 'bold', textAlign: 'center', zIndex: 2 }}>
                {title.slice(0, 15)}
              </div>
              {/* Gold seal */}
              <circle cx="58" cy="65" r="7" fill="#FFD54F" stroke={strokeColor} strokeWidth="1" />
              <polygon points="56,70 54,77 58,74 62,77 60,70" fill="#FFD54F" stroke={strokeColor} strokeWidth="0.8" />
            </div>
          </div>
        )}

        {/* Leather Bound Book (Thesis Project) */}
        {type === 'leather' && (
          <div style={{
            width: '110px', height: '160px',
            backgroundColor: color,
            borderRadius: '8px 12px 12px 8px',
            boxShadow: `-6px 6px 14px ${shadowColor}`,
            border: `2.5px solid ${strokeColor}`,
            borderLeft: `10px solid ${strokeColor}`,
            position: 'relative'
          }}>
            {/* Gold embossing lines */}
            <div style={{ position: 'absolute', top: '12px', bottom: '12px', left: '10px', right: '10px', border: '1px solid rgba(255,215,0,0.18)', borderRadius: '2px' }} />
            {/* Spine ribs */}
            <div style={{ position: 'absolute', left: '-10px', top: '25px', width: '10px', height: '3.5px', backgroundColor: 'rgba(0,0,0,0.45)' }} />
            <div style={{ position: 'absolute', left: '-10px', top: '80px', width: '10px', height: '3.5px', backgroundColor: 'rgba(0,0,0,0.45)' }} />
            <div style={{ position: 'absolute', left: '-10px', bottom: '25px', width: '10px', height: '3.5px', backgroundColor: 'rgba(0,0,0,0.45)' }} />
            {/* Gold Title Seal */}
            <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '35px', border: '1px solid rgba(255,215,0,0.25)', borderRadius: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px' }}>
              <div style={{ fontSize: '6.5px', fontFamily: 'Georgia', color: '#FFD54F', textAlign: 'center', fontWeight: 'bold', lineHeight: 1.1, overflow: 'hidden' }}>
                {title.slice(0, 15)}
              </div>
            </div>
          </div>
        )}

        {/* Keepsake Box (Offer Letters) */}
        {type === 'box' && (
          <div style={{
            width: '125px', height: '95px',
            backgroundColor: color,
            borderRadius: '4px',
            boxShadow: `-5px 5px 12px ${shadowColor}`,
            border: `2.5px solid ${strokeColor}`,
            position: 'relative'
          }}>
            {/* Box Lid rim */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '14px', backgroundColor: 'rgba(255,255,255,0.15)', borderBottom: `2.5px solid ${strokeColor}` }} />
            {/* Label seal */}
            <div style={{ position: 'absolute', top: '25px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '24px', backgroundColor: '#FAF7F1', border: `1.5px solid ${strokeColor}`, borderRadius: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px' }}>
              <span style={{ fontSize: '7px', fontFamily: 'Space Grotesk', color: strokeColor, fontWeight: 'bold', letterSpacing: '0.05em' }}>
                {title.slice(0, 13)}
              </span>
            </div>
            {/* Brass clasp */}
            <rect x="58" y="10" width="8" height="12" fill="#FFD54F" style={{ position: 'absolute', border: `1.5px solid ${strokeColor}`, borderRadius: '1px' }} />
          </div>
        )}

      </div>
    </motion.div>
  );
}
