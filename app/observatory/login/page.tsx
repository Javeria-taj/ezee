'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { useUniverse } from '../../universe/UniverseProvider';

type LoginState = 'idle' | 'loading' | 'error' | 'success';

export default function ObservatoryLogin() {

  const { setUniverseState } = useUniverse();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>('idle');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(['', '', '', '', '', '']); // 6-digit stamp card
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setUniverseState({ weather: 'rain', timeOfDay: 'night' });
    }, 0);
    return () => clearTimeout(timer);
  }, [setUniverseState]);

  const handle2FAChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const new2FA = [...twoFactor];
    new2FA[index] = value;
    setTwoFactor(new2FA);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handle2FAKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !twoFactor[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginState('loading');

    // Simulate authentication delay
    await new Promise(r => setTimeout(r, 2500));

    if (email === 'error@ezee.com') {
      setLoginState('error');
      return;
    }

    // Call the API route — it sets the httpOnly cookie via Set-Cookie header
    const res = await fetch('/api/auth/observatory', { method: 'POST' });
    if (!res.ok) { setLoginState('error'); return; }

    setLoginState('success');
    setUniverseState({ weather: 'clear', timeOfDay: 'goldenHour' });

    // Hard navigation so the middleware re-runs and sees the new cookie
    setTimeout(() => {
      window.location.href = '/observatory';
    }, 2000);
  };

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
    setLoginState('idle');
  };

  const dustParticles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i, x: (i * 17) % 100, y: (i * 23) % 100,
    size: (i % 2) + 1, duration: (i % 10) + 10, delay: (i * 0.3) % 5,
    driftX: (i % 5) * 4 - 10
  })), []);

  const rainDrops = useMemo(() => Array.from({ length: 100 }).map((_, i) => ({
    id: `rain-${i}`, x: (i * 3.33) % 100, delay: (i * 0.1) % 2, duration: 0.5 + ((i % 5) * 0.1),
  })), []);

  if (!mounted) return null;

  return (
    <div className="mobile-stack" style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: '#1A1918' }}>
      
      {/* LEFT SIDE: The Observatory Scene */}
      <motion.div 
        className="mobile-hide"
        animate={loginState === 'success' ? { scale: 1.1, x: '-5%' } : { scale: 1, x: 0 }}
        transition={{ duration: 4, ease: 'easeInOut' }}
        style={{ flex: 1, position: 'relative', borderRight: '1px solid #36220E', background: '#201F1E', overflow: 'hidden' }}
      >
        
        {/* Background Window & Moonlight/Rain */}
        <div style={{ position: 'absolute', top: 0, left: '20%', width: '40%', height: '100%', background: '#111', overflow: 'hidden' }}>
           {rainDrops.map(r => (
            <motion.div key={r.id} style={{ position: 'absolute', left: `${r.x}%`, top: -50, width: '1px', height: '10px', background: 'rgba(255,255,255,0.1)' }} animate={{ y: [0, 1000] }} transition={{ duration: r.duration, delay: r.delay, repeat: Infinity, ease: "linear" }} />
          ))}
          {/* Subtle Moonlight */}
          <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(229,233,240,0.1) 0%, transparent 70%)' }} />
        </div>

        {/* Dust Particles */}
        {dustParticles.map(p => (
          <motion.div key={p.id} style={{ position: 'absolute', width: p.size, height: p.size, background: 'rgba(255,255,255,0.4)', borderRadius: '50%', left: `${p.x}%`, top: `${p.y}%` }} animate={{ y: [0, -50, 0], x: [0, p.driftX, 0], opacity: [0, 0.5, 0] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
        ))}

        {/* Large Clock */}
        <div style={{ position: 'absolute', top: '15%', right: '15%', width: '150px', height: '150px', border: '8px solid #36220E', borderRadius: '50%', background: '#FAF7F1', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.2)' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3600, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', bottom: '50%', width: '4px', height: '40px', background: '#2A2928', transformOrigin: 'bottom center', borderRadius: '2px' }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', bottom: '50%', width: '2px', height: '60px', background: '#8A5034', transformOrigin: 'bottom center', borderRadius: '1px' }} />
          <div style={{ width: '10px', height: '10px', background: '#36220E', borderRadius: '50%', zIndex: 5 }} />
        </div>

        {/* Bookshelf & Owl */}
        <div style={{ position: 'absolute', bottom: '20%', left: '0', width: '30%', height: '60%', borderRight: '15px solid #36220E', background: '#2A1A0B' }}>
          <div style={{ position: 'absolute', top: '30%', width: '100%', height: '10px', background: '#36220E', boxShadow: '0 5px 10px rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'absolute', top: '60%', width: '100%', height: '10px', background: '#36220E', boxShadow: '0 5px 10px rgba(0,0,0,0.5)' }} />
          
          {/* Books */}
          <div style={{ position: 'absolute', top: '30%', right: '10px', width: '15px', height: '40px', background: '#4A3219', transform: 'translateY(-100%)', borderRadius: '2px' }} />
          <div style={{ position: 'absolute', top: '30%', right: '30px', width: '20px', height: '45px', background: '#2E4C38', transform: 'translateY(-100%)', borderRadius: '2px' }} />
          
          {/* Wise Owl reading */}
          <div style={{ position: 'absolute', top: '60%', right: '10px', width: '40px', height: '50px', background: '#3D3A38', transform: 'translateY(-100%)', borderRadius: '20px 20px 0 0' }}>
            {/* Eyes */}
            <div style={{ position: 'absolute', top: '15px', display: 'flex', gap: '8px', width: '100%', justifyContent: 'center' }}>
              <div style={{ width: '10px', height: '10px', background: '#D4AF37', borderRadius: '50%' }}><div style={{ width: '4px', height: '4px', background: '#111', margin: '3px auto' }} /></div>
              <div style={{ width: '10px', height: '10px', background: '#D4AF37', borderRadius: '50%' }}><div style={{ width: '4px', height: '4px', background: '#111', margin: '3px auto' }} /></div>
            </div>
            {/* Tiny Book */}
            <div style={{ position: 'absolute', bottom: '5px', left: '10px', width: '20px', height: '10px', background: '#FFF', borderRadius: '2px' }} />
          </div>
        </div>

        {/* Observatory Lighting / Desk Glow */}
        <motion.div 
          animate={{ opacity: loginState === 'success' ? 0.8 : loginState === 'error' ? 0.2 : 0.4 }}
          transition={{ duration: loginState === 'error' ? 2 : 4, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: '0', right: '10%', width: '600px', height: '400px', background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)', pointerEvents: 'none' }}
        />

        {/* Subtle Map / World Board abstract shape on right side */}
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '40%', height: '40%', background: '#2A2928', border: '5px solid #36220E', borderRadius: '10px', opacity: 0.8 }}>
          <div style={{ width: '100%', height: '10px', background: '#D4AF37', opacity: 0.3, marginTop: '20px' }} />
          <div style={{ width: '80%', height: '10px', background: '#D4AF37', opacity: 0.3, marginTop: '20px', marginLeft: '10%' }} />
        </div>

      </motion.div>

      {/* RIGHT SIDE: The Interface */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF7F1' }}>
        <motion.div 
          className="mobile-auth-card"
          style={{ 
            width: '500px', 
            padding: '4rem 3rem', 
            position: 'relative'
          }}
        >
          {/* Editorial style header */}
          <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 400, color: '#2A2928', fontFamily: 'Instrument Sans', letterSpacing: '-0.02em' }}>
            {authMode === 'login' ? 'Welcome back.' : 'Join the Observatory.'}
          </h1>
          <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '1.2rem', fontWeight: 400, color: '#666', fontFamily: 'Instrument Sans', fontStyle: 'italic' }}>
            {authMode === 'login' ? 'Everything is peaceful tonight.' : 'Become a steward of the network.'}
          </h2>
          <p style={{ marginTop: '2rem', color: '#444', fontSize: '1rem', borderBottom: '1px solid #E8ECEF', paddingBottom: '1rem' }}>
            {authMode === 'login' ? 'Thank you for taking care of the world.' : 'Help us maintain peace and order.'}
          </p>

          <form onSubmit={handleLogin} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {authMode === 'signup' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loginState === 'loading' || loginState === 'success'}
                  style={{ padding: '0.8rem 0', border: 'none', borderBottom: '1px solid #CCC', background: 'transparent', fontSize: '1.1rem', outline: 'none', transition: 'border 0.3s' }}
                  placeholder="e.g. Elias Thorne"
                />
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loginState === 'loading' || loginState === 'success'}
                style={{ padding: '0.8rem 0', border: 'none', borderBottom: '1px solid #CCC', background: 'transparent', fontSize: '1.1rem', outline: 'none', transition: 'border 0.3s' }}
                placeholder="steward@ezee.com"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginState === 'loading' || loginState === 'success'}
                style={{ padding: '0.8rem 0', border: 'none', borderBottom: '1px solid #CCC', background: 'transparent', fontSize: '1.1rem', outline: 'none', paddingRight: '30px' }}
                placeholder="••••••••"
              />
              {/* Custom Lamp Password Toggle */}
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0', top: '35px', background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
              >
                <div style={{ width: '12px', height: '16px', borderRadius: '6px 6px 0 0', background: showPassword ? '#D4AF37' : '#999', transition: 'background 0.3s', boxShadow: showPassword ? '0 -5px 15px rgba(212,175,55,1)' : 'none' }} />
              </button>
            </div>

            {/* 2FA Stamp Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Two-Factor Code</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {twoFactor.map((digit, index) => (
                  <motion.input
                    key={index}
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    value={digit}
                    onChange={(e) => handle2FAChange(index, e.target.value)}
                    onKeyDown={(e) => handle2FAKeyDown(index, e)}
                    disabled={loginState === 'loading' || loginState === 'success'}
                    animate={digit ? { scale: [1, 1.05, 1], y: [0, -2, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      width: '45px', height: '55px', textAlign: 'center', fontSize: '1.5rem', 
                      fontFamily: 'Space Grotesk', background: '#FDF9F1', border: '1px solid #D1C7B7', 
                      borderRadius: '4px', outline: 'none', boxShadow: digit ? 'inset 0 0 5px rgba(212,175,55,0.2)' : 'none',
                      color: '#4A3219'
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#555', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#2A2928' }} />
                Remember this device
              </label>
            </div>

            {loginState === 'error' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem 0', color: '#8A5034', fontSize: '0.9rem', fontStyle: 'italic' }}>
                Something seems out of place. Please try again.
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loginState === 'loading' || loginState === 'success'}
              style={{ 
                marginTop: '1rem', padding: '1.2rem', background: 'transparent', color: '#2A2928', 
                border: '1px solid #2A2928', borderRadius: '4px', fontSize: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s',
                ...(loginState === 'success' ? { background: '#2A2928', color: '#FFF' } : {})
              }}
            >
              {loginState === 'loading' ? (authMode === 'login' ? 'Checking records...' : 'Registering steward...') : loginState === 'success' ? (authMode === 'login' ? 'Welcome back' : 'Welcome aboard') : (authMode === 'login' ? 'Sign In' : 'Apply')}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                onClick={toggleAuthMode}
                style={{ background: 'none', border: 'none', color: '#666', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {authMode === 'login' ? "No credentials? Apply here" : "Already a steward? Sign in"}
              </button>
            </div>
          </form>

        </motion.div>
      </div>

    </div>
  );
}
