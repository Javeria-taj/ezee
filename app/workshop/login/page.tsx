'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
      
      {/* LEFT SIDE: Redesigned Workshop Scene */}
      <div 
        className="mobile-hide" 
        style={{ 
          flex: 1, 
          position: 'relative', 
          borderRight: '1px solid #1E120A', 
          background: '#1A1412', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Style block for animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes floatDust {
            0% { transform: translateY(100px) translateX(0) scale(0.6); opacity: 0; }
            20% { opacity: 0.4; }
            80% { opacity: 0.4; }
            100% { transform: translateY(-300px) translateX(50px) scale(1); opacity: 0; }
          }
          @keyframes swayCard {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
          }
          @keyframes steamRise {
            0% { stroke-dashoffset: 0; opacity: 0; transform: translateY(0) scaleX(1); }
            30% { opacity: 0.3; }
            70% { opacity: 0.3; }
            100% { stroke-dashoffset: -30; opacity: 0; transform: translateY(-15px) scaleX(1.15); }
          }
          @keyframes windowLightPulse {
            0%, 100% { opacity: 0.12; }
            50% { opacity: 0.16; }
          }
          @keyframes curtainWave {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(0.4deg); }
          }
        `}} />

        {/* Cinematic Illustration SVG */}
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 800 1000" 
          preserveAspectRatio="xMidYMid slice" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          {/* Definitions */}
          <defs>
            <linearGradient id="wall-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A1412" />
              <stop offset="100%" stopColor="#0B0908" />
            </linearGradient>
            <linearGradient id="sunlight-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2E0" stopOpacity="1" />
              <stop offset="100%" stopColor="#E5C158" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="walnut-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A3425" />
              <stop offset="50%" stopColor="#2E1E12" />
              <stop offset="100%" stopColor="#1C110A" />
            </linearGradient>
            <linearGradient id="metal-ruler" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7F8C8D" />
              <stop offset="50%" stopColor="#BDC3C7" />
              <stop offset="100%" stopColor="#95A5A6" />
            </linearGradient>
            <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E6C875" />
              <stop offset="50%" stopColor="#B59441" />
              <stop offset="100%" stopColor="#7D6124" />
            </linearGradient>
            
            {/* Soft Shadows */}
            <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
            </filter>
            <filter id="deep-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="16" stdDeviation="12" floodColor="#000" floodOpacity="0.6" />
            </filter>
            
            {/* Background Blur for Depth of Field */}
            <filter id="dof-blur">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* Wall Background */}
          <rect width="800" height="1000" fill="url(#wall-gradient)" />

          {/* BACKGROUND LAYER (Blurred) */}
          <g filter="url(#dof-blur)" opacity="0.45">
            {/* Tall Industrial Window Frame on Left */}
            <rect x="60" y="50" width="260" height="520" fill="none" stroke="#2D2016" strokeWidth="6" />
            <line x1="190" y1="50" x2="190" y2="570" stroke="#2D2016" strokeWidth="4" />
            <line x1="60" y1="220" x2="320" y2="220" stroke="#2D2016" strokeWidth="4" />
            <line x1="60" y1="390" x2="320" y2="390" stroke="#2D2016" strokeWidth="4" />

            {/* Muted Breeze Curtain hanging near window */}
            <path 
              d="M 62,50 Q 85,250 65,570 L 58,570 L 58,50 Z" 
              fill="#262321" 
              style={{ transformOrigin: '60px 50px', animation: 'curtainWave 10s ease-in-out infinite' }} 
            />

            {/* Storage Shelves on Right */}
            {/* Shelf Frame */}
            <rect x="480" y="60" width="260" height="550" fill="none" stroke="#3D291C" strokeWidth="6" />
            <line x1="480" y1="220" x2="740" y2="220" stroke="#3D291C" strokeWidth="4" />
            <line x1="480" y1="380" x2="740" y2="380" stroke="#3D291C" strokeWidth="4" />

            {/* Organized Paper Stocks on Shelf 1 */}
            <g fill="#A89F91">
              <rect x="500" y="150" width="40" height="70" rx="2" />
              <rect x="545" y="140" width="35" height="80" rx="2" fill="#8E8576" />
              <rect x="585" y="165" width="45" height="55" rx="2" fill="#5E6358" />
            </g>
            {/* Rolled papers on shelf 2 */}
            <g fill="#9A826B">
              <ellipse cx="660" cy="300" rx="14" ry="30" />
              <rect x="660" y="270" width="60" height="60" fill="#9A826B" />
              <ellipse cx="720" cy="300" rx="10" ry="30" fill="#836D5A" />
              
              <ellipse cx="640" cy="340" rx="12" ry="25" fill="#586A5D" />
              <rect x="640" y="315" width="55" height="50" fill="#586A5D" />
              <ellipse cx="695" cy="340" rx="9" ry="25" fill="#4B5A4F" />
            </g>
            
            {/* Printing Equipment shape in distance */}
            <rect x="500" y="440" width="200" height="110" rx="4" fill="#1C1816" />
            <rect x="530" y="415" width="140" height="25" rx="2" fill="#2E2825" />
            <line x1="530" y1="480" x2="700" y2="480" stroke="#36302D" strokeWidth="6" />
          </g>

          {/* Background Task Card swaying */}
          <g filter="url(#dof-blur)" style={{ transformOrigin: '530px 100px', animation: 'swayCard 7s ease-in-out infinite' }}>
            <line x1="530" y1="100" x2="530" y2="135" stroke="rgba(250,247,241,0.2)" strokeWidth="1" />
            <rect x="510" y="135" width="40" height="55" rx="3" fill="#D4AF37" opacity="0.6" />
            <rect x="515" y="145" width="30" height="4" fill="rgba(0,0,0,0.3)" />
            <rect x="515" y="153" width="22" height="3" fill="rgba(0,0,0,0.3)" />
            <rect x="515" y="161" width="26" height="3" fill="rgba(0,0,0,0.3)" />
          </g>

          {/* LIGHTING SUNBEAM (Overlay) */}
          <polygon 
            points="60,100 240,600 800,1000 800,600 320,100" 
            fill="url(#sunlight-gradient)" 
            style={{ animation: 'windowLightPulse 12s ease-in-out infinite' }} 
            pointerEvents="none" 
          />

          {/* Drifting Paper Fibers / Dust (within Light Beam) */}
          {Array.from({ length: 18 }).map((_, i) => (
            <circle
              key={i}
              cx={(120 + i * 37) % 650}
              cy={(200 + i * 49) % 700}
              r={(i % 3) * 0.6 + 0.8}
              fill="#FFF3DF"
              style={{
                animation: 'floatDust 18s linear infinite',
                animationDelay: `${i * 0.9}s`,
                opacity: 0
              }}
            />
          ))}

          {/* FOREGROUND LAYER: Clean & Elevated Workshop Workbench */}
          <g>
            {/* Elevated Walnut Wood Workbench Surface */}
            <path d="M 0,520 L 800,500 L 800,650 L 0,670 Z" fill="url(#walnut-gradient)" filter="url(#soft-shadow)" />
            
            {/* Plank Seams & Individual Wood Planks */}
            <path d="M 0,520 L 800,500 L 800,503 L 0,523 Z" fill="#5C4230" opacity="0.6" />
            <line x1="0" y1="570" x2="800" y2="550" stroke="#1C110A" strokeWidth="2" opacity="0.6" />
            <line x1="0" y1="620" x2="800" y2="600" stroke="#1C110A" strokeWidth="2" opacity="0.6" />

            {/* Wood Bevel Highlights */}
            <line x1="0" y1="571" x2="800" y2="551" stroke="#6E503B" strokeWidth="0.8" opacity="0.4" />
            <line x1="0" y1="621" x2="800" y2="601" stroke="#6E503B" strokeWidth="0.8" opacity="0.4" />

            {/* Muted Olive Cutting Mat */}
            <path d="M 60,535 L 740,518 L 770,640 L 30,655 Z" fill="#242E20" filter="url(#soft-shadow)" />
            <path d="M 60,535 L 740,518 L 740,521 L 60,538 Z" fill="#384632" />
            <path d="M 70,542 L 730,526 L 755,632 L 45,645 Z" fill="none" stroke="#415039" strokeWidth="1.2" />
            {/* Mat Grid Lines */}
            <line x1="160" y1="540" x2="140" y2="638" stroke="#34422D" strokeWidth="0.6" />
            <line x1="280" y1="538" x2="260" y2="635" stroke="#34422D" strokeWidth="0.6" />
            <line x1="400" y1="535" x2="380" y2="632" stroke="#34422D" strokeWidth="0.6" />
            <line x1="520" y1="532" x2="500" y2="630" stroke="#34422D" strokeWidth="0.6" />
            <line x1="640" y1="529" x2="630" y2="628" stroke="#34422D" strokeWidth="0.6" />            {/* 1. ELEGANT STUDIO MONITOR (Center-Left - Made Smaller & Sleek) */}
            <g filter="url(#soft-shadow)">
              {/* Stand Base & Arm */}
              <ellipse cx="280" cy="528" rx="24" ry="6" fill="#2E2B2A" />
              <ellipse cx="280" cy="527" rx="21" ry="5" fill="#423E3C" />
              <rect x="276" y="460" width="8" height="70" fill="#383433" rx="2" />
              <rect x="278" y="460" width="3" height="70" fill="#595451" />

              {/* Monitor Frame */}
              <rect x="180" y="340" width="200" height="125" rx="7" fill="#1C1A19" stroke="#3D3836" strokeWidth="2.5" />
              {/* Screen Surface */}
              <rect x="184" y="344" width="192" height="117" rx="4" fill="#14181F" />

              {/* Screen Content: Ezee Workshop Print Dashboard */}
              <rect x="190" y="350" width="180" height="18" rx="3" fill="#1F2633" />
              <circle cx="198" cy="359" r="2.8" fill="#52B788" />
              <text x="206" y="362" fill="#FAF7F1" fontSize="7.5" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" letterSpacing="0.05em">EZEE WORKSHOP LIVE</text>
              <rect x="328" y="354" width="36" height="9" rx="4" fill="#D4AF37" opacity="0.3" />
              <text x="334" y="361" fill="#D4AF37" fontSize="6" fontFamily="sans-serif" fontWeight="600">ACTIVE</text>

              {/* Order Status Cards */}
              <rect x="190" y="373" width="84" height="62" rx="4" fill="#1A212C" stroke="rgba(250,247,241,0.08)" strokeWidth="1" />
              <text x="196" y="384" fill="#8B9BB4" fontSize="6" fontFamily="sans-serif" fontWeight="600">CURRENT QUEUE</text>
              <text x="196" y="396" fill="#FAF7F1" fontSize="10.5" fontFamily="'Space Grotesk', sans-serif" fontWeight="700">14 Orders</text>
              <rect x="196" y="404" width="72" height="4" rx="2" fill="#283244" />
              <rect x="196" y="404" width="54" height="4" rx="2" fill="#D4AF37" />
              <text x="196" y="422" fill="#52B788" fontSize="6" fontFamily="sans-serif">● 3 Printing  ● 11 Ready</text>

              {/* Screen Document Preview */}
              <rect x="280" y="373" width="90" height="83" rx="4" fill="#1A212C" stroke="rgba(250,247,241,0.08)" strokeWidth="1" />
              <rect x="289" y="380" width="72" height="69" rx="2" fill="#FAF7F1" />
              <rect x="297" y="387" width="35" height="4" fill="#2E3A4E" rx="1" />
              <line x1="297" y1="397" x2="350" y2="397" stroke="#8B9BB4" strokeWidth="1.5" />
              <line x1="297" y1="403" x2="345" y2="403" stroke="#8B9BB4" strokeWidth="1.5" />
              <line x1="297" y1="409" x2="349" y2="409" stroke="#8B9BB4" strokeWidth="1.5" />
              <line x1="297" y1="415" x2="338" y2="415" stroke="#8B9BB4" strokeWidth="1.5" />

              {/* Soft Glow */}
              <ellipse cx="280" cy="475" rx="90" ry="15" fill="#52B788" opacity="0.05" />
            </g>

            {/* 2. COMPACT COMMERCIAL PRINTER (Right Side - Made Smaller) */}
            <g filter="url(#soft-shadow)">
              {/* Printer Body */}
              <rect x="520" y="435" width="175" height="95" rx="8" fill="#242220" stroke="#3D3835" strokeWidth="2" />
              <rect x="530" y="425" width="155" height="16" rx="4" fill="#36322F" />

              {/* Top Paper Tray */}
              <polygon points="548,370 668,370 662,425 554,425" fill="#1C1A18" />
              <polygon points="558,360 658,360 653,425 563,425" fill="#FAF7F1" />

              {/* Control Display */}
              <rect x="532" y="447" width="48" height="25" rx="3" fill="#141312" />
              <circle cx="542" cy="456" r="2.8" fill="#52B788" />
              <circle cx="552" cy="456" r="2" fill="#D4AF37" />
              <rect x="537" y="463" width="38" height="5" rx="1" fill="#283244" />

              {/* Output Paper Tray & Printed Sheet */}
              <path d="M 540,498 L 675,498 L 690,536 L 525,536 Z" fill="#1A1817" />
              <polygon points="548,495 667,495 682,533 533,533" fill="#FAF7F1" />
              <line x1="560" y1="504" x2="650" y2="504" stroke="#4A3F35" strokeWidth="1" />
              <line x1="560" y1="510" x2="640" y2="510" stroke="#4A3F35" strokeWidth="1" />
              <line x1="560" y1="516" x2="648" y2="516" stroke="#4A3F35" strokeWidth="1" />
            </g>

            {/* 3. CLEANLY ORGANIZED STACK OF PAPERS & FOLDER (Left Side) */}
            <g filter="url(#soft-shadow)">
              {/* Folder - Muted Navy */}
              <polygon points="70,555 215,542 190,625 45,638" fill="#263238" />
              <polygon points="72,552 217,539 192,622 47,635" fill="#37474F" />
              <rect x="88" y="565" width="60" height="20" fill="#FAF7F1" transform="rotate(-5.2 88 565)" rx="2" />
              <text x="92" y="578" fill="#263238" fontSize="8" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" transform="rotate(-5.2 88 565)">JOB FOLDER</text>

              {/* Organized Stack of White Paper */}
              <polygon points="120,565 260,552 235,635 95,648" fill="#DCD5CA" />
              <polygon points="122,562 262,549 237,632 97,645" fill="#EAE5DC" />
              <polygon points="124,559 264,546 239,629 99,642" fill="#FAF7F1" />
              
              {/* Crisp print layout on top sheet */}
              <rect x="142" y="572" width="65" height="10" fill="#3E2A14" opacity="0.8" rx="1" transform="rotate(-5.3 142 572)" />
              <line x1="142" y1="590" x2="235" y2="581" stroke="#665D55" strokeWidth="1.2" />
              <line x1="142" y1="598" x2="225" y2="589" stroke="#665D55" strokeWidth="1.2" />
              <line x1="142" y1="606" x2="238" y2="597" stroke="#665D55" strokeWidth="1.2" />
            </g>

            {/* 4. WORKSHOP ACCESSORIES (Neat & Uncluttered) */}
            {/* Precision Metal Ruler */}
            <g filter="url(#soft-shadow)">
              <polygon points="260,575 440,560 442,572 262,587" fill="url(#metal-ruler)" />
              {Array.from({ length: 22 }).map((_, i) => (
                <line key={i} x1={270 + i * 7.2} y1={574 - i * 0.55} x2={271 + i * 7.2} y2={578 - i * 0.55} stroke="#2C3E50" strokeWidth="0.6" />
              ))}
            </g>

            {/* Ceramic Coffee Mug */}
            <g filter="url(#soft-shadow)">
              <ellipse cx="420" cy="545" rx="15" ry="7.5" fill="#DCD3C7" />
              <path d="M 405,545 A 15,7.5 0 0 0 435,545 L 435,575 A 15,7.5 0 0 1 405,575 Z" fill="#ECE5DB" />
              <ellipse cx="420" cy="575" rx="15" ry="7.5" fill="#DCD3C7" />
              <ellipse cx="420" cy="546" rx="12" ry="5.5" fill="#4E3629" />
              <path d="M 435,552 C 445,552 445,570 435,572" fill="none" stroke="#ECE5DB" strokeWidth="3.5" strokeLinecap="round" />
              <path className="steam-line-1" d="M 416,536 Q 412,524 418,515" fill="none" stroke="#FAF7F1" strokeWidth="1" opacity="0" style={{ animation: 'steamRise 5s linear infinite' }} />
            </g>
          </g>
        </svg>

        {/* 5. TYPOGRAPHIC OVERLAY CARD (Positioned Cleanly in the Open Space Below Desk with Maximum Visibility) */}
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '36px', 
            left: '32px', 
            right: '32px', 
            zIndex: 40, 
            background: 'rgba(20, 16, 14, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(250, 247, 241, 0.14)',
            borderRadius: '20px',
            padding: '24px 30px',
            boxShadow: '0 20px 45px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <h3 
            style={{ 
              fontFamily: "'Space Grotesk', sans-serif", 
              fontSize: '23px', 
              fontWeight: 700, 
              color: '#FAF7F1', 
              margin: 0, 
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            Where every page finds its purpose
          </h3>
          <p 
            style={{ 
              fontFamily: "'Instrument Sans', sans-serif", 
              fontSize: '14px', 
              color: 'rgba(250,247,241,0.75)', 
              margin: 0, 
              lineHeight: 1.5,
              letterSpacing: '-0.01em'
            }}
          >
            From assignments and resumes to research and ideas, every document entrusted to your workshop becomes part of someone&apos;s journey.
          </p>
        </div>

        {/* Success Particles Overlay */}
        <AnimatePresence>
          {loginState === 'success' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, zIndex: 50 }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div key={i} animate={{ y: [0, -150], opacity: [0, 1, 0] }} transition={{ duration: 2, delay: (i * 0.05) % 1 }} style={{ position: 'absolute', left: `${(i * 17) % 100}%`, bottom: '20%', width: '4px', height: '4px', background: '#D4AF37', borderRadius: '50%' }} />
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
