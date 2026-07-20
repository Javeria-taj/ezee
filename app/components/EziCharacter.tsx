'use client';

import React from 'react';
import styles from '../auth/auth.module.css';

interface EziProps {
  state: 'login' | 'signup' | 'otp' | 'forgot' | 'loading' | 'success' | 'error' | 'dashboard';
  mousePos?: { x: number; y: number };
  focusedField?: string | null;
  passwordVisible?: boolean;
  isNight?: boolean;
}

const EziCharacter = React.memo(function EziCharacter({ 
  state, 
  mousePos = { x: 0, y: 0 }, 
  focusedField = null, 
  passwordVisible = false,
  isNight = false
}: EziProps) {
  const isPassword = focusedField === 'password';
  const showPeeking = isPassword && passwordVisible;
  const showCovering = isPassword && !passwordVisible;

  return (
    <div className={styles.eziContainer} style={{ position: 'relative' }}>
      {/* 
        Ezi Ink Spirit 
        Body: Coffee Ink
        Face: Paper Cream
        Cheeks: Terracotta
        Scarf: Dusty Plum
        Beret: Matcha Sage
      */}
      <svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#2A2928" floodOpacity="0.15" />
          </filter>
        </defs>

        <g filter="url(#softShadow)" style={{ transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
          {/* Main Body (Coffee Ink drop shape) */}
          <path 
            d="M 100 30 C 140 30, 170 80, 180 150 C 185 190, 160 230, 100 230 C 40 230, 15 190, 20 150 C 30 80, 60 30, 100 30 Z" 
            fill="#2A2928" 
          />

          {/* White Face area */}
          <ellipse cx="100" cy="110" rx="60" ry="45" fill="#FAF7F1" />

          {/* Eyes - Warm and friendly with eye tracking */}
          <g style={{ 
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, 
            transition: 'transform 0.1s ease-out' 
          }}>
            {showCovering ? (
              // Shy squinting eyes behind hands
              <>
                <path d="M 78 108 Q 85 103 92 108" stroke="#2A2928" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M 108 108 Q 115 103 122 108" stroke="#2A2928" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              </>
            ) : showPeeking ? (
              // Wide eyes (surprised peeking)
              <>
                <circle cx="85" cy="105" r="7" fill="#2A2928" />
                <circle cx="87" cy="103" r="2.5" fill="#FAF7F1" />
                <circle cx="115" cy="105" r="7" fill="#2A2928" />
                <circle cx="117" cy="103" r="2.5" fill="#FAF7F1" />
              </>
            ) : state === 'success' ? (
              // Happy eyes
              <>
                <path d="M 75 105 Q 85 95 90 105" stroke="#2A2928" strokeWidth="4" fill="none" strokeLinecap="round" />
                <path d="M 110 105 Q 115 95 125 105" stroke="#2A2928" strokeWidth="4" fill="none" strokeLinecap="round" />
              </>
            ) : state === 'error' ? (
              // Sad/confused eyes
              <>
                <circle cx="85" cy="105" r="5" fill="#2A2928" />
                <circle cx="115" cy="105" r="5" fill="#2A2928" />
                <path d="M 75 95 Q 85 90 90 95" stroke="#2A2928" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 110 95 Q 115 90 125 95" stroke="#2A2928" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : (
              // Normal eyes
              <>
                <circle cx="85" cy="105" r="5" fill="#2A2928" />
                <circle cx="115" cy="105" r="5" fill="#2A2928" />
              </>
            )}
          </g>

          {/* Blush Cheeks */}
          <ellipse cx="65" cy="120" rx="12" ry="8" fill="#D48A70" opacity="0.6" />
          <ellipse cx="135" cy="120" rx="12" ry="8" fill="#D48A70" opacity="0.6" />

          {/* Tiny Mouth */}
          {state === 'error' ? (
             <path d="M 95 125 Q 100 120 105 125" stroke="#2A2928" strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : (state === 'success' || showPeeking) ? (
             <path d="M 95 125 Q 100 135 105 125" stroke="#2A2928" strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : (
             <path d="M 97 125 Q 100 128 103 125" stroke="#2A2928" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* Clothing */}
          {isNight ? (
            // Pajamas & Sleeping Cap
            <g>
              {/* Pajama Shirt (Striped) */}
              <path d="M 50 140 C 80 150, 120 150, 150 140 C 160 170, 140 210, 100 210 C 60 210, 40 170, 50 140 Z" fill="#EAE4DD" />
              <path d="M 60 145 L 70 205 M 90 150 L 90 210 M 110 150 L 110 210 M 130 145 L 120 205" stroke="#7A6D8C" strokeWidth="4" />
              
              {/* Sleeping Cap */}
              <g transform="translate(0, -5)">
                <path d="M 60 45 C 80 15, 130 15, 140 45 C 160 70, 170 110, 180 120 C 185 125, 185 135, 175 135 C 165 135, 160 120, 150 100 C 140 70, 110 40, 80 50 Z" fill="#7A6D8C" />
                <ellipse cx="100" cy="45" rx="40" ry="10" fill="#EAE4DD" />
                <circle cx="180" cy="128" r="8" fill="#EAE4DD" />
              </g>
            </g>
          ) : (
            // Day Clothes (Scarf & Beret)
            <g>
              {/* Scarf (Dusty Plum) */}
              <path d="M 60 145 C 80 160, 120 160, 140 145 C 145 155, 135 170, 100 175 C 65 170, 55 155, 60 145 Z" fill="#7A6D8C" />
              <path d="M 125 155 Q 135 180 120 195 Q 110 180 125 155 Z" fill="#7A6D8C" />

              {/* Beret (Matcha Sage) */}
              <g transform="translate(15, -10) rotate(-10 100 40)">
                <ellipse cx="100" cy="40" rx="35" ry="15" fill="#A9B59D" />
                <path d="M 100 25 L 102 18 L 98 18 Z" fill="#A9B59D" />
              </g>

              {/* Pencil behind ear */}
              <g transform="translate(130, 45) rotate(45)">
                <rect x="0" y="0" width="8" height="40" fill="#F4D03F" rx="2" />
                <polygon points="0,40 8,40 4,50" fill="#E5E7E9" />
                <polygon points="2,45 6,45 4,50" fill="#2A2928" />
                <rect x="0" y="-5" width="8" height="5" fill="#E74C3C" rx="1" />
              </g>
            </g>
          )}

          {/* Arms / Actions based on state */}
          <g style={{ transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            {showCovering && (
              // Arms covering eyes
              <g>
                <path 
                  d="M 30 170 C 35 130, 60 125, 78 112" 
                  stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" 
                />
                <path 
                  d="M 170 170 C 165 130, 140 125, 122 112" 
                  stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" 
                />
              </g>
            )}

            {showPeeking && (
              // Arms slightly lower peeking
              <g>
                <path 
                  d="M 30 170 C 40 140, 60 140, 72 128" 
                  stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" 
                />
                <path 
                  d="M 170 170 C 160 140, 140 140, 128 128" 
                  stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" 
                />
              </g>
            )}

            {!isPassword && state === 'login' && (
              // Waving arm
              <path 
                d="M 160 130 C 180 110, 190 80, 175 60 C 165 50, 150 70, 150 90" 
                stroke="#2A2928" strokeWidth="18" strokeLinecap="round" fill="none" 
              />
            )}
            
            {!isPassword && state === 'signup' && (
              // Holding books
              <g transform="translate(140, 120)">
                <rect x="0" y="0" width="30" height="12" fill="#D48A70" rx="2" transform="rotate(-10)" />
                <rect x="-5" y="15" width="35" height="15" fill="#A9B59D" rx="2" transform="rotate(-5)" />
                <rect x="-2" y="32" width="32" height="10" fill="#EAE4DD" rx="2" />
              </g>
            )}

            {!isPassword && state === 'loading' && (
              // Carrying papers
              <g transform="translate(140, 130)">
                <rect x="0" y="0" width="30" height="40" fill="#FAF7F1" rx="2" transform="rotate(15)" stroke="#2A2928" strokeWidth="1" />
                <rect x="-5" y="5" width="30" height="40" fill="#FAF7F1" rx="2" transform="rotate(5)" stroke="#2A2928" strokeWidth="1" />
              </g>
            )}

            {!isPassword && state === 'error' && (
              // Dropping papers
              <g transform="translate(140, 150)">
                <rect x="10" y="20" width="25" height="35" fill="#FAF7F1" rx="2" transform="rotate(45)" stroke="#2A2928" strokeWidth="1" />
                <rect x="-20" y="40" width="25" height="35" fill="#FAF7F1" rx="2" transform="rotate(-30)" stroke="#2A2928" strokeWidth="1" />
              </g>
            )}

            {!isPassword && state === 'forgot' && (
              // Reading a book
              <g transform="translate(60, 140)">
                <path d="M 0 10 Q 20 20 40 10 L 40 30 Q 20 40 0 30 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2" />
                <path d="M 40 10 Q 60 20 80 10 L 80 30 Q 60 40 40 30 Z" fill="#FAF7F1" stroke="#2A2928" strokeWidth="2" />
              </g>
            )}

            {!isPassword && state === 'dashboard' && (
              // Sketching at desk
              <g>
                <path d="M 40 160 Q 50 180 80 180" fill="none" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" style={{ animation: 'sway 1s infinite alternate' }} />
                <path d="M 160 160 C 150 180, 140 190, 120 180" fill="none" stroke="#2A2928" strokeWidth="16" strokeLinecap="round" />
              </g>
            )}

            {/* Default arms resting */}
            {(!isPassword && (state === 'success' || state === 'otp')) && (
              <path 
                d="M 40 150 C 30 170, 30 190, 45 200" 
                stroke="#2A2928" strokeWidth="16" strokeLinecap="round" fill="none" 
              />
            )}
            
          </g>
        </g>
      </svg>
    </div>
  );
});

export default EziCharacter;
