'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useUniverse } from '../../universe/UniverseProvider';

type LoginState = 'idle' | 'loading' | 'error' | 'success';

export default function WorkshopLogin() {

  const { setUniverseState } = useUniverse();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>('idle');
  const [shopId, setShopId] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    setUniverseState({ weather: 'rain', timeOfDay: 'goldenHour' });
    return () => clearTimeout(timer);
  }, [setUniverseState]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`);
          if (res.ok) {
            const data = await res.json();
            const address = data.display_name || `${data.address?.road || 'Campus Road'}, ${data.address?.suburb || 'College Area'}`;
            setLocation(address);
          } else {
            setLocation('Campus Hub, Block C (Auto-detected)');
          }
        } catch {
          setLocation('Campus Hub, Block C (Auto-detected)');
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        setLoadingLocation(false);
        alert('Unable to retrieve location. Please type manually or enable location permissions.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginState('loading');

    // Simulate authentication delay
    await new Promise(r => setTimeout(r, 2000));

    if (email === 'error@ezee.com') {
      setLoginState('error');
      return;
    }

    // Call the API route — it sets the httpOnly cookie via Set-Cookie header
    const res = await fetch('/api/auth/workshop', { method: 'POST' });
    if (!res.ok) { setLoginState('error'); return; }

    // Save details to localStorage so shop name, college etc. show in WorkshopRoom
    const savedDetails = {
      id: 'WK-' + Math.floor(1000 + (Date.now() % 9000)),
      name: shopName || 'Morning Star Press',
      email: email || 'morningstar@ezee.prints',
      college: 'Ezee Institute of Technology',
      joined: 'March 2026',
      location: location || 'Campus Hub, Block C'
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('ezee_shop_details', JSON.stringify(savedDetails));
    }

    setLoginState('success');
    setUniverseState({ weather: 'clear', timeOfDay: 'goldenHour' });

    // Hard navigation so the middleware re-runs and sees the new cookie
    setTimeout(() => {
      window.location.href = '/workshop';
    }, 2000);
  };

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'signup' : 'login');
    setLoginState('idle');
  };

  const rainDrops = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    id: `rain-${i}`, x: (i * 3.33) % 100, delay: (i * 0.1) % 2, duration: 0.5 + ((i % 5) * 0.1),
  })), []);

  if (!mounted) return null;

  return (
    <div className="mobile-stack workshop-login-container" style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: '#3E2A14' }}>
      
      {/* LEFT SIDE: The Workshop Scene */}
      <div className="mobile-hide" style={{ flex: 1, position: 'relative', borderRight: '4px solid #2A1A0B', background: '#2E2218', overflow: 'hidden' }}>
        
        {/* Background Window & Rain */}
        <div style={{ position: 'absolute', top: 0, left: '20%', width: '60%', height: '80%', background: '#1A120B', overflow: 'hidden', borderRadius: '0 0 100px 100px', border: '8px solid #2A1A0B' }}>
          {rainDrops.map(r => (
            <motion.div key={r.id} style={{ position: 'absolute', left: `${r.x}%`, top: -50, width: '1px', height: '15px', background: 'rgba(212, 175, 55, 0.2)' }} animate={{ y: [0, 800] }} transition={{ duration: r.duration, delay: r.delay, repeat: Infinity, ease: "linear" }} />
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: '80%', height: '20px', background: '#5C3D1D', borderRadius: '4px' }}>
          
          {/* Coffee Mug & Steam */}
          <div style={{ position: 'absolute', bottom: '20px', left: '10%', width: '30px', height: '40px', background: '#A3603F', borderRadius: '4px' }}>
            <motion.div animate={{ y: loginState === 'loading' ? [-10, -50] : [-10, -30], opacity: [0, 0.6, 0], x: [0, 10, -5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} style={{ position: 'absolute', top: '-10px', left: '5px', width: '20px', height: '20px', background: 'rgba(255,255,255,0.3)', filter: 'blur(4px)', borderRadius: '50%' }} />
          </div>

          {/* Stacks of Paper */}
          <div style={{ position: 'absolute', bottom: '20px', left: '30%', width: '60px', height: '30px', background: 'var(--texture-paper)', borderLeft: '2px solid #D1C7B7', borderRadius: '2px' }}>
            {loginState === 'loading' && (
              <motion.div animate={{ y: [0, -5, 0], x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }} style={{ position: 'absolute', top: '-5px', left: '0', width: '60px', height: '5px', background: 'var(--texture-paper)', border: '1px solid #CCC' }} />
            )}
            {loginState === 'error' && (
              <motion.div animate={{ rotate: [0, -15, 0], x: [-10, -20, -10] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ position: 'absolute', top: '0', left: '-20px', width: '40px', height: '20px', background: 'var(--texture-paper)', border: '1px solid #CCC', zIndex: 10 }} />
            )}
          </div>

          {/* Tiny Printer */}
          <div style={{ position: 'absolute', bottom: '20px', right: '15%', width: '100px', height: '60px', background: '#E8ECEF', borderRadius: '8px', borderBottom: '10px solid #D1C7B7' }}>
            {/* Blinking Light */}
            <motion.div animate={{ opacity: loginState === 'loading' ? [0, 1, 0] : loginState === 'success' ? 1 : 0.5 }} transition={{ duration: 0.5, repeat: Infinity }} style={{ position: 'absolute', top: '10px', right: '10px', width: '6px', height: '6px', borderRadius: '50%', background: loginState === 'error' ? '#D9534F' : '#5CB85C' }} />
          </div>

          {/* Sleeping Cat near Printer */}
          <div style={{ position: 'absolute', bottom: '20px', right: '35%', width: '40px', height: '25px', background: '#D48A4A', borderRadius: '20px 20px 5px 5px', display: 'flex', justifyContent: 'center' }}>
            <motion.div animate={{ scaleY: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ width: '100%', height: '100%', background: 'inherit', borderRadius: 'inherit' }} />
          </div>

          {/* Ezi in Workshop Mode */}
          <motion.div animate={{ y: loginState === 'error' ? [0, -5, 0] : [0, -2, 0] }} transition={{ duration: loginState === 'error' ? 0.5 : 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Head/Goggles */}
            <div style={{ width: '40px', height: '40px', background: '#FFF', borderRadius: '50%', position: 'relative' }}>
              {/* Goggles */}
              <div style={{ position: 'absolute', top: '10px', left: '5px', width: '30px', height: '12px', background: '#333', borderRadius: '10px', display: 'flex', gap: '2px', justifyContent: 'center', padding: '2px' }}>
                <div style={{ width: '10px', height: '8px', background: 'rgba(212,175,55,0.6)', borderRadius: '50%' }} />
                <div style={{ width: '10px', height: '8px', background: 'rgba(212,175,55,0.6)', borderRadius: '50%' }} />
              </div>
              {/* Pencil */}
              <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '4px', height: '25px', background: '#F0AD4E', transform: 'rotate(30deg)', borderRadius: '2px' }} />
            </div>
            {/* Body / Apron */}
            <div style={{ width: '50px', height: '40px', background: '#5BC0DE', borderRadius: '10px 10px 0 0', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '5px', background: '#8B5A2B', borderRadius: '5px 5px 0 0' }} /> {/* Brown Apron */}
            </div>
            {/* Untangling animation during error */}
            {loginState === 'error' && (
               <motion.div animate={{ rotate: [0, 45, -45, 0] }} transition={{ duration: 0.5, repeat: Infinity }} style={{ position: 'absolute', top: '40px', left: '-20px', width: '30px', height: '4px', background: '#FFF', zIndex: 20 }} />
            )}
          </motion.div>

        </div>

        {/* Success Particles */}
        <AnimatePresence>
          {loginState === 'success' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div key={i} animate={{ y: [0, -100], opacity: [0, 1, 0] }} transition={{ duration: 2, delay: (i * 0.05) % 1 }} style={{ position: 'absolute', left: `${(i * 17) % 100}%`, bottom: '20%', width: '4px', height: '4px', background: '#D4AF37', borderRadius: '50%' }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT SIDE: The Interface */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--texture-paper)' }}>
        <motion.div 
          className="mobile-auth-card"
          animate={loginState === 'error' ? { x: [-5, 5, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
          style={{ 
            width: '450px', 
            background: '#FFF', 
            padding: '3rem', 
            borderRadius: '12px', 
            boxShadow: 'var(--shadow-rest)',
            position: 'relative'
          }}
        >
          {/* Spiral binding rings simulation */}
          <div style={{ position: 'absolute', left: '-10px', top: '10%', bottom: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ width: '20px', height: '4px', background: '#888', borderRadius: '2px', border: '1px solid #666', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' }} />
            ))}
          </div>

          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 600, color: 'var(--texture-ink)', fontFamily: 'Cabinet Grotesk' }}>
            {authMode === 'login' ? 'Welcome back.' : 'Start your workshop.'}
          </h1>
          <h2 style={{ margin: '0.5rem 0 0 0', fontSize: '1.5rem', fontWeight: 500, color: '#555', fontFamily: 'Cabinet Grotesk' }}>
            {authMode === 'login' ? 'The workshop has been waiting.' : 'Join the Ezee vendor network.'}
          </h2>
          <p style={{ marginTop: '1rem', color: '#666', fontSize: '1.1rem' }}>
            {authMode === 'login' ? "Let's help someone prepare something important." : "Open your digital doors to thousands of students."}
          </p>

          <form onSubmit={handleLogin} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {authMode === 'signup' && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Shop Name</label>
                  <input 
                    type="text" 
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    disabled={loginState === 'loading' || loginState === 'success'}
                    style={{ padding: '0.8rem', border: '1px solid #DDD', borderRadius: '6px', background: '#FAF9F7', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }}
                    placeholder="E.g., Campus Central Print"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loginState === 'loading' || loginState === 'success'}
                    style={{ padding: '0.8rem', border: '1px solid #DDD', borderRadius: '6px', background: '#FAF9F7', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }}
                    placeholder="shop@example.com"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#444', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Location</span>
                    <button 
                      type="button"
                      onClick={handleGetLocation}
                      disabled={loadingLocation || loginState === 'loading' || loginState === 'success'}
                      style={{ background: 'none', border: 'none', color: '#8A5034', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', outline: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {loadingLocation ? 'Detecting...' : '📍 Access Current Location'}
                    </button>
                  </label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={loginState === 'loading' || loginState === 'success'}
                    style={{ padding: '0.8rem', border: '1px solid #DDD', borderRadius: '6px', background: '#FAF9F7', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }}
                    placeholder="Enter manually or auto-detect"
                    required
                  />
                </div>
              </>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Shop ID</label>
              <input 
                type="text" 
                value={shopId}
                onChange={(e) => setShopId(e.target.value)}
                disabled={loginState === 'loading' || loginState === 'success'}
                style={{ padding: '0.8rem', border: '1px solid #DDD', borderRadius: '6px', background: '#FAF9F7', fontSize: '1rem', outline: 'none', transition: 'border 0.3s' }}
                placeholder="WK-1024"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#444' }}>Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loginState === 'loading' || loginState === 'success'}
                  style={{ width: '100%', padding: '0.8rem', border: '1px solid #DDD', borderRadius: '6px', background: '#FAF9F7', fontSize: '1rem', outline: 'none', paddingRight: '40px' }}
                  placeholder="••••••••"
                />
                {/* Custom Desk Lamp Password Toggle */}
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', outline: 'none', padding: 0 }}
                >
                  <div style={{ width: '16px', height: '16px', borderRadius: '8px 8px 0 0', background: showPassword ? '#D4AF37' : '#999', transition: 'background 0.3s', boxShadow: showPassword ? '0 -4px 10px rgba(212,175,55,0.8)' : 'none' }} />
                </button>
              </div>
            </div>

            <div className="remember-forgot-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#555', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#3E2A14' }} />
                Remember this device
              </label>
              <a href="#" style={{ fontSize: '0.9rem', color: '#8A5034', textDecoration: 'none' }}>Forgot Password?</a>
            </div>

            {loginState === 'error' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '1rem', background: '#FDF2F2', borderLeft: '4px solid #D9534F', color: '#D9534F', borderRadius: '4px' }}>
                Looks like something got stuck. Let&apos;s try again.
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={loginState === 'loading' || loginState === 'success'}
              style={{ 
                marginTop: '1rem', padding: '1rem', background: loginState === 'success' ? '#7E8C6F' : '#3E2A14', color: '#FFF', 
                border: 'none', borderRadius: '6px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.3s' 
              }}
            >
              {loginState === 'loading' ? (authMode === 'login' ? 'Waking up the workshop...' : 'Setting up your bench...') : loginState === 'success' ? (authMode === 'login' ? 'Welcome back' : 'Welcome aboard') : (authMode === 'login' ? 'Sign In' : 'Create Shop')}
            </button>
            
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                onClick={toggleAuthMode}
                style={{ background: 'none', border: 'none', color: '#8A5034', fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}
              >
                {authMode === 'login' ? "Don't have an account? Sign up" : "Already have a workshop? Sign in"}
              </button>
            </div>
          </form>

        </motion.div>
      </div>

    </div>
  );
}
