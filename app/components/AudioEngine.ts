'use client';

/* ─────────────────────────────────────────────────────────────────
   EZEE AUDIO ENGINE — SILENT NO-OP IMPLEMENTATION
   All sound effects, ambient lofi tracks, and audio playback have 
   been completely removed as requested.
───────────────────────────────────────────────────────────────── */

class CozyAudioEngine {
  init() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggle(_play?: boolean) {}
  playFeedbackClick() {}
  playWeatherCycleSound() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  playClockTick(_isTick?: boolean) {}
  playBirdChirp() {}
  playPageFlip() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setVolume(_vol?: number) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setWeatherState(_weather?: unknown) {}
}

export const audio = new CozyAudioEngine();
