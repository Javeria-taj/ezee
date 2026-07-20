'use client';

import { useEffect, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────────
   EZEE SOUND ENGINE — SILENT NO-OP IMPLEMENTATION
   All sound effects, Web Audio API synthesis, and ambient sounds 
   have been removed as requested.
───────────────────────────────────────────────────────────────── */

export function useSoundEngine() {
  useEffect(() => {}, []);
}

export function playPrinterSound() {}
export function playCoinSound() {}

export function useCosyMode() {
  const [cosyMode] = useState(false);
  const toggle = useCallback(() => {}, []);
  return { cosyMode, toggleCosyMode: toggle };
}
