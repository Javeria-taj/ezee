'use client';
import React, { useState, useEffect } from 'react';

const STICKERS = [
  { id: 'coffee', svg: '<ellipse cx="30" cy="20" rx="24" ry="16" fill="transparent" stroke="#5C4033" stroke-width="3" stroke-dasharray="4 2 8 4" opacity="0.3"/>', w: 60, h: 40 },
  { id: 'plant', svg: '<path d="M10 25C10 25 15 5 25 15C35 25 30 45 30 45C30 45 15 35 10 25Z" fill="#A9B59D" opacity="0.7"/><path d="M20 25C20 25 25 10 35 20C45 30 40 45 40 45C40 45 30 35 20 25Z" fill="#7E8C6F" opacity="0.8"/>', w: 50, h: 50 },
  { id: 'star', svg: '<path d="M20 5L24 15H35L26 22L29 32L20 26L11 32L14 22L5 15H16L20 5Z" fill="#F4D03F" opacity="0.8"/>', w: 40, h: 40 },
  { id: 'heart', svg: '<path d="M20 35L17 32C7 23 4 20 4 13C4 7 9 3 15 3C18 3 21 5 23 7C25 5 28 3 31 3C37 3 42 7 42 13C42 20 39 23 29 32L26 35C24 37 22 37 20 35Z" fill="#D48A70" opacity="0.8"/>', w: 46, h: 40 },
];

interface PlacedSticker {
  uid: string;
  id: string;
  x: number;
  y: number;
}

export default function DeskStickers() {
  const [placed, setPlaced] = useState<PlacedSticker[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ezee_desk_stickers');
      if (stored) setPlaced(JSON.parse(stored));
    } catch {}
  }, []);

  const save = (newPlaced: PlacedSticker[]) => {
    setPlaced(newPlaced);
    localStorage.setItem('ezee_desk_stickers', JSON.stringify(newPlaced));
  };

  const addSticker = (id: string) => {
    if (placed.length >= 5) {
      alert("Desk is getting cluttered! Remove a sticker first.");
      return;
    }
    const desk = document.getElementById('student-desk-area');
    const bounds = desk ? desk.getBoundingClientRect() : { width: 400, height: 300 };
    save([...placed, {
      uid: Math.random().toString(36).slice(2),
      id,
      x: bounds.width / 2 - 20 + (Math.random() * 40 - 20),
      y: bounds.height / 2 - 20 + (Math.random() * 40 - 20),
    }]);
    setShowMenu(false);
  };

  const removeSticker = (uid: string) => {
    save(placed.filter(s => s.uid !== uid));
  };

  return (
    <>
      {placed.map(p => {
        const template = STICKERS.find(s => s.id === p.id);
        if (!template) return null;
        return (
          <div
            key={p.uid}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: template.w,
              height: template.h,
              cursor: dragging === p.uid ? 'grabbing' : 'grab',
              zIndex: dragging === p.uid ? 50 : 10,
              touchAction: 'none'
            }}
            onDoubleClick={() => removeSticker(p.uid)}
            onPointerDown={(e) => {
              const startX = e.clientX;
              const startY = e.clientY;
              const startLeft = p.x;
              const startTop = p.y;
              setDragging(p.uid);

              const onMove = (me: PointerEvent) => {
                const nx = startLeft + (me.clientX - startX);
                const ny = startTop + (me.clientY - startY);
                setPlaced(curr => curr.map(item => item.uid === p.uid ? { ...item, x: nx, y: ny } : item));
              };

              const onUp = () => {
                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onUp);
                setDragging(null);
                setPlaced(curr => {
                  localStorage.setItem('ezee_desk_stickers', JSON.stringify(curr));
                  return curr;
                });
              };
              window.addEventListener('pointermove', onMove);
              window.addEventListener('pointerup', onUp);
            }}
          >
            <svg width="100%" height="100%" viewBox={`0 0 ${template.w} ${template.h}`} dangerouslySetInnerHTML={{ __html: template.svg }} />
          </div>
        );
      })}

      <div style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 100 }}>
        <button 
          onClick={() => setShowMenu(!showMenu)}
          style={{ background: '#FAF7F1', border: '1px solid rgba(42,41,40,0.1)', borderRadius: '50%', width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(42,41,40,0.1)', fontSize: 20 }}
          title="Add a sticker"
        >
          {showMenu ? '×' : '✨'}
        </button>
        {showMenu && (
          <div style={{ position: 'absolute', bottom: 50, right: 0, background: '#FAF7F1', padding: 8, borderRadius: 12, display: 'flex', gap: 8, boxShadow: '0 10px 24px rgba(42,41,40,0.15)', border: '1px solid rgba(42,41,40,0.1)' }}>
            {STICKERS.map(s => (
              <button key={s.id} onClick={() => addSticker(s.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, width: 40, height: 40 }}>
                <svg width="100%" height="100%" viewBox={`0 0 ${s.w} ${s.h}`} dangerouslySetInnerHTML={{ __html: s.svg }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
