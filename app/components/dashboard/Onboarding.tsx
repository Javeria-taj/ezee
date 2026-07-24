'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = React.useState(0);

  const steps = [
    {
      title: 'Welcome to your desk',
      desc: 'This is where you prep your files for printing. Ezi, our print mascot, will keep you company.',
      emoji: '🌿',
    },
    {
      title: 'Upload, prep, send',
      desc: 'Drop your files on the desk to see instant pricing. You can combine multiple files in your cart.',
      emoji: '📄',
    },
    {
      title: 'No more waiting in lines',
      desc: 'Send your prints to a nearby shop, pay from here, and just walk in to collect them when they are warm.',
      emoji: '⚡',
    },
  ];

  const handleNext = () => {
    if (step === steps.length - 1) {
      onComplete();
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(42, 41, 40, 0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          background: 'var(--bg-card-white, #FAF7F1)',
          borderRadius: 24,
          padding: '40px 32px',
          maxWidth: 400,
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 24px 48px -12px rgba(42,41,40,.25)',
          border: '1px solid var(--border-subtle, rgba(42,41,40,0.1))',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 20 }}>
          {steps[step].emoji}
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 24, color: '#2A2928', margin: '0 0 12px' }}>
          {steps[step].title}
        </h2>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: 'rgba(42,41,40,0.7)', margin: '0 0 32px' }}>
          {steps[step].desc}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Dots */}
          <div style={{ display: 'flex', gap: 6 }}>
            {steps.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: i === step ? '#D48A70' : 'rgba(42,41,40,0.15)',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              background: '#2A2928',
              color: '#FAF7F1',
              border: 'none',
              padding: '10px 24px',
              borderRadius: 12,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            {step === steps.length - 1 ? "Let's go" : "Next →"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
