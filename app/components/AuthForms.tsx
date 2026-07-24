'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../auth/auth.module.css';
import { BookOpen, Key, Mail, User, Phone, GraduationCap, Building2, Calendar, Check, Eye, EyeOff } from 'lucide-react';

interface AuthFormsProps {
  state: 'login' | 'signup' | 'otp' | 'forgot' | 'loading' | 'success' | 'error';
  setState: (state: 'login' | 'signup' | 'otp' | 'forgot' | 'loading' | 'success' | 'error') => void;
  passwordVisible: boolean;
  setPasswordVisible: (visible: boolean) => void;
}

export default function AuthForms({ state, setState, passwordVisible, setPasswordVisible }: AuthFormsProps) {
  const [rememberMe, setRememberMe] = useState(false);
  const [signupStep, setSignupStep] = useState(0); // 0: About You, 1: College, 2: Password, 3: Finish
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      setState('success');
    }, 500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupStep < 3) {
      setSignupStep(signupStep + 1);
    } else {
      setState('loading');
      setTimeout(() => {
        setState('otp');
      }, 500);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const variants = {
    initial: { opacity: 0, y: 20, rotateX: -10 },
    animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, type: 'spring' as const, bounce: 0.4 } },
    exit: { opacity: 0, y: -20, rotateX: 10, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className={`${styles.paperCard} mobile-auth-card`}
      style={{ 
        boxShadow: '0 20px 40px rgba(42, 41, 40, 0.08), inset 0 0 0 1px rgba(255,255,255,0.5)',
        background: '#FAF7F1',
        borderRadius: '16px',
        border: '1.5px solid rgba(42, 41, 40, 0.18)'
      }}
      initial="initial"
      animate={state === 'success' ? { opacity: 0, scale: 0.95 } : "animate"}
    >
      <AnimatePresence mode="wait">
        
        {state === 'login' && (
          <motion.form key="login" variants={variants} initial="initial" animate="animate" exit="exit" onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem' }}>
            <div style={{ paddingBottom: '1rem' }}>
              <h1 className={styles.heading} style={{ fontSize: '2rem', color: '#2A2928' }}>Sign In</h1>
              <p className={styles.subtitle} style={{ color: '#7A6D8C' }}>Welcome back! Please enter your details.</p>
            </div>
            
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
              <input type="email" placeholder="Email Address" className={styles.inputField} style={{ paddingLeft: '2rem', background: 'transparent', fontFamily: 'Instrument Sans' }} required />
            </div>
            
            <div style={{ position: 'relative' }}>
              <Key style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
              <input 
                type="password" 
                placeholder="Password" 
                className={styles.inputField} 
                style={{ paddingLeft: '2rem', paddingRight: '2.5rem', background: 'transparent', fontFamily: 'Instrument Sans' }} 
                required 
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                style={{ position: 'absolute', right: '4px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#A9B59D', padding: 0 }}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <div className={styles.bookmarkRibbon} onClick={() => setRememberMe(!rememberMe)}>
                <div className={`${styles.bookmarkIcon} ${rememberMe ? styles.bookmarkIconActive : ''}`} />
                <span style={{ fontFamily: 'Instrument Sans' }}>Remember me</span>
              </div>
              <span style={{ cursor: 'pointer', color: '#D48A70', fontWeight: 500, fontFamily: 'Instrument Sans' }} onClick={() => setState('forgot')}>Lost password?</span>
            </div>
            
            <button type="submit" className={styles.primaryButton} style={{ background: '#2A2928', color: '#FAF7F1', borderRadius: '4px', marginTop: '1.5rem' }}>Sign In</button>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', paddingTop: '1.5rem' }}>
              <span style={{ fontSize: '0.95rem', color: '#7A6D8C' }}>Don&apos;t have an account?</span>
              <button type="button" className={styles.secondaryButton} style={{ border: '1px solid #A9B59D', color: '#5b554f', borderRadius: '4px' }} onClick={() => setState('signup')}>Create Account</button>
            </div>
          </motion.form>
        )}

        {state === 'signup' && (
          <motion.form key="signup" variants={variants} initial="initial" animate="animate" exit="exit" onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem' }}>
            <div style={{ paddingBottom: '0.5rem' }}>
              <h1 className={styles.heading} style={{ fontSize: '2rem' }}>Create Account</h1>
              <p className={styles.subtitle}>Fill in your details to get started.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem' }}>
               {['Personal', 'Academic', 'Password', 'Done'].map((step, idx) => (
                 <div key={step} style={{ 
                   opacity: signupStep === idx ? 1 : 0.4, 
                   fontWeight: signupStep === idx ? 600 : 400,
                   position: 'relative',
                   transition: 'all 0.3s',
                   fontFamily: 'Instrument Sans',
                   color: signupStep === idx ? '#D48A70' : '#7A6D8C'
                 }}>
                   {step}
                 </div>
               ))}
            </div>

            <div style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                {signupStep === 0 && (
                  <motion.div key="step0" variants={variants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                      <User style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
                      <input type="text" placeholder="Your Name" className={styles.inputField} style={{ paddingLeft: '2rem', background: 'transparent' }} required autoFocus />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <Mail style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
                      <input type="email" placeholder="Email Address" className={styles.inputField} style={{ paddingLeft: '2rem', background: 'transparent' }} required />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <Phone style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
                      <input type="tel" placeholder="Phone Number" className={styles.inputField} style={{ paddingLeft: '2rem', background: 'transparent' }} required />
                    </div>
                  </motion.div>
                )}
                {signupStep === 1 && (
                  <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                      <Building2 style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
                      <input type="text" placeholder="College / University" className={styles.inputField} style={{ paddingLeft: '2rem', background: 'transparent' }} required autoFocus />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <BookOpen style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
                      <input type="text" placeholder="Course / Department" className={styles.inputField} style={{ paddingLeft: '2rem', background: 'transparent' }} required />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <GraduationCap style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
                        <input type="text" placeholder="ID Number" className={styles.inputField} style={{ paddingLeft: '2rem', background: 'transparent' }} required />
                      </div>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <Calendar style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
                        <input type="text" placeholder="Class Year" className={styles.inputField} style={{ paddingLeft: '2rem', background: 'transparent' }} required />
                      </div>
                    </div>
                  </motion.div>
                )}
                {signupStep === 2 && (
                  <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                      <Key style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
                      <input 
                        type="password" 
                        placeholder="Password" 
                        className={styles.inputField} 
                        style={{ paddingLeft: '2rem', paddingRight: '2.5rem', background: 'transparent' }} 
                        required 
                        autoFocus 
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        style={{ position: 'absolute', right: '4px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#A9B59D', padding: 0 }}
                        aria-label={passwordVisible ? "Hide password" : "Show password"}
                      >
                        {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <Check style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
                      <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className={styles.inputField} 
                        style={{ paddingLeft: '2rem', paddingRight: '2.5rem', background: 'transparent' }} 
                        required 
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        style={{ position: 'absolute', right: '4px', top: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#A9B59D', padding: 0 }}
                        aria-label={passwordVisible ? "Hide password" : "Show password"}
                      >
                        {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </motion.div>
                )}
                {signupStep === 3 && (
                  <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" style={{ textAlign: 'center', color: '#7A6D8C', paddingTop: '2rem' }}>
                    All steps completed. Ready to register.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button type="submit" className={styles.primaryButton} style={{ borderRadius: '4px', marginTop: '1rem' }}>
              {signupStep < 3 ? 'Continue' : 'Submit & Register'}
            </button>
            
            <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <span style={{ cursor: 'pointer', color: '#7A6D8C', fontFamily: 'Instrument Sans' }} onClick={() => { setSignupStep(0); setState('login'); }}>Already have an account? Sign In</span>
            </p>
          </motion.form>
        )}

        {state === 'otp' && (
          <motion.div key="otp" variants={variants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', paddingTop: '1rem' }}>
            <h1 className={styles.heading} style={{ textAlign: 'center', fontSize: '2rem' }}>Verify OTP</h1>
            <p className={styles.subtitle} style={{ textAlign: 'center' }}>We&apos;ve sent a 4-digit verification code to your email.</p>
            
            <div className={styles.otpContainer}>
               {[0, 1, 2, 3].map(i => (
                 <input 
                   key={i}
                   id={`otp-${i}`}
                   type="text" 
                   maxLength={1}
                   className={styles.otpStamp}
                   style={{ background: '#FAF7F1', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)' }}
                   value={otp[i]}
                   onChange={(e) => handleOtpChange(i, e.target.value)}
                 />
               ))}
            </div>

            <button className={styles.primaryButton} style={{ borderRadius: '4px', marginTop: '2rem' }} onClick={() => setState('success')}>
              Verify &amp; Continue
            </button>
          </motion.div>
        )}

        {state === 'forgot' && (
          <motion.form key="forgot" variants={variants} initial="initial" animate="animate" exit="exit" onSubmit={(e) => { e.preventDefault(); setState('loading'); setTimeout(() => setState('login'), 500); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '1rem' }}>
            <div>
              <h1 className={styles.heading} style={{ fontSize: '2rem' }}>Forgot Password</h1>
              <p className={styles.subtitle}>Enter your email address to reset your password.</p>
            </div>
            
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', top: '12px', left: '0', color: '#A9B59D' }} size={20} />
              <input type="email" placeholder="Recovery Email" className={styles.inputField} style={{ paddingLeft: '2rem', background: 'transparent' }} required autoFocus />
            </div>
            
            <button type="submit" className={styles.primaryButton} style={{ borderRadius: '4px', marginTop: '1.5rem' }}>Send Reset Link</button>
            
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              <span style={{ cursor: 'pointer', color: '#7A6D8C' }} onClick={() => setState('login')}>Back to Sign In</span>
            </p>
          </motion.form>
        )}

        {state === 'loading' && (
          <motion.div key="loading" variants={variants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ width: '40px', height: '40px', border: '2px solid #EAE4DD', borderTopColor: '#D48A70', borderRadius: '50%' }} 
            />
            <p className={styles.subtitle}>Loading...</p>
          </motion.div>
        )}

        {state === 'error' && (
          <motion.div key="error" variants={variants} initial="initial" animate="animate" exit="exit" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '2rem' }}>
            <h1 className={styles.heading} style={{ fontSize: '2rem' }}>Authentication Failed</h1>
            <p className={styles.subtitle}>Please check your details and try again.</p>
            <button className={styles.primaryButton} style={{ borderRadius: '4px' }} onClick={() => setState('login')}>Try Again</button>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}
