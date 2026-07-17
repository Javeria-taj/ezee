'use client';

import React, { useState, useEffect } from 'react';
import styles from './auth.module.css';
import AuthRoom from '../components/AuthRoom';
import EziCharacter from '../components/EziCharacter';
import AuthForms from '../components/AuthForms';
import { audio } from '../components/AudioEngine';
import { useRouter } from 'next/navigation';

export type AuthState = 'login' | 'signup' | 'otp' | 'forgot' | 'loading' | 'success' | 'error';

export default function AuthPage() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>('login');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [zoomIn, setZoomIn] = useState(false);
  
  // 10/10 Cozy States
  const [weather, setWeather] = useState<'day' | 'sunset' | 'rain'>('day');
  const [leaves, setLeaves] = useState<{ id: number; left: number; rotation: number }[]>([]);
  const [steamBoost, setSteamBoost] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Clean up audio when page is destroyed
  useEffect(() => {
    return () => {
      audio.toggle(false);
    };
  }, []);

  // Handle signature transition on success
  useEffect(() => {
    if (authState === 'success') {
      const timer = setTimeout(() => {
        setZoomIn(true);
        setTimeout(() => {
          router.push('/student');
        }, 500);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [authState, router]);

  // Bind password text view toggle
  useEffect(() => {
    const inputs = document.querySelectorAll('input[type="password"], input[name="password"]');
    inputs.forEach(input => {
      input.setAttribute('type', passwordVisible ? 'text' : 'password');
    });
  }, [passwordVisible]);

  // Eye tracking: Follow cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8; // range -4 to 4
      const y = (e.clientY / window.innerHeight - 0.5) * 6; // range -3 to 3
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Form input focus and keystroke sounds
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement;
      if (target && target.tagName === 'INPUT') {
        audio.playFeedbackClick();
        
        if (target.type === 'password' || target.placeholder?.toLowerCase().includes('password')) {
          setFocusedField('password');
        } else {
          setFocusedField('other');
        }
      }
    };
    const handleBlur = () => {
      setFocusedField(null);
    };

    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);
    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, []);

  // Global button/interactives tactile paper click feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
         target.closest('button') ||
         target.closest(`.${styles.bookmarkRibbon}`) ||
         target.closest(`.${styles.otpStamp}`) ||
         (target.tagName === 'SPAN' && target.style.cursor === 'pointer'))
      ) {
        audio.playFeedbackClick();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Toggle ambient synthesizer lofi and rain/fire sounds
  const handleRadioClick = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audio.toggle(!nextMuted);
    if (!nextMuted) {
      audio.setWeatherState(weather);
    }
  };

  // Weather cycler wrapper (adds sound effect)
  const handleWeatherChange = (newWeather: 'day' | 'sunset' | 'rain') => {
    setWeather(newWeather);
    audio.setWeatherState(newWeather);
    audio.playWeatherCycleSound();
  };

  // Spawns a falling leaf from the plant
  const handlePlantClick = () => {
    audio.playFeedbackClick();
    const newLeaf = {
      id: Date.now(),
      left: (Math.random() - 0.5) * 30,
      rotation: Math.random() * 360
    };
    setLeaves(prev => [...prev, newLeaf]);
    setTimeout(() => {
      setLeaves(prev => prev.filter(l => l.id !== newLeaf.id));
    }, 3000);
  };

  // Mug Click Steam boost
  const handleMugClick = () => {
    audio.playFeedbackClick();
    setSteamBoost(true);
    setTimeout(() => setSteamBoost(false), 3000);
  };

  // Determine root container classes based on state
  let roomClass = styles.room;
  if (authState === 'forgot' || weather === 'rain') {
    roomClass += ` ${styles.roomNight} ${styles.roomRain}`;
  } else if (weather === 'sunset') {
    roomClass += ` ${styles.roomSunset}`;
  }
  if (zoomIn) roomClass += ` ${styles.zoomInTransition}`;

  return (
    <div className={roomClass}>
      
      {/* Background Scenery & Props */}
      <AuthRoom 
        state={authState} 
        passwordVisible={passwordVisible} 
        weather={weather}
        setWeather={handleWeatherChange}
        leaves={leaves}
        onPlantClick={handlePlantClick}
        steamBoost={steamBoost}
        onMugClick={handleMugClick}
        isMuted={isMuted}
        onRadioClick={handleRadioClick}
      />

      {/* Main Container */}
      <div 
        className="mobile-stack mobile-p-sm"
        style={{ position: 'relative', zIndex: 30, display: 'flex', width: '100%', maxWidth: '900px', padding: '2rem', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left: Ezi with relative tracking and password postures */}
        {/* mobile-auth-ezi-hide hides this container on ≤820px screens only */}
        <div className="mobile-auth-ezi-hide" style={{ flex: 1, position: 'relative', height: '400px', display: 'flex', justifyContent: 'center' }}>
          <EziCharacter 
            state={authState} 
            mousePos={mousePos}
            focusedField={focusedField}
            passwordVisible={passwordVisible}
          />
        </div>

        {/* Right: Forms */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
          <AuthForms state={authState} setState={setAuthState} />
        </div>

      </div>

      {/* Desk Lamp Invisible Toggle Overlay (triggers password visible) */}
      <button 
        style={{ position: 'absolute', bottom: '25vh', right: '25%', width: '80px', height: '180px', opacity: 0, zIndex: 100, cursor: 'pointer' }}
        onClick={() => setPasswordVisible(!passwordVisible)}
        aria-label="Toggle Desk Lamp"
      />

      {/* Dashboard Mockup Overlay (Now just a transition layer) */}
      {zoomIn && (
         <div style={{
           position: 'absolute', inset: 0, zIndex: 1000, 
           background: 'rgba(250, 247, 241, 1)',
           animation: 'fadeIn 1.5s ease forwards'
         }}>
           <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
         </div>
      )}

    </div>
  );
}
