'use client';

/* ─────────────────────────────────────────────────────────────────
   EZEE AUDIO ENGINE — SILENT NO-OP IMPLEMENTATION
   All sound effects, ambient lofi tracks, and audio playback have 
   been completely removed as requested.
───────────────────────────────────────────────────────────────── */

class CozyAudioEngine {
  init() {}
  toggle(_play: boolean) {}
  playFeedbackClick() {}
  playWeatherCycleSound() {}
  playClockTick(_isTick?: boolean) {}
  playBirdChirp() {}
  playPageFlip() {}
  setVolume(_vol: number) {}
  setWeatherState(_weather: any) {}
}

export const audio = new CozyAudioEngine();
