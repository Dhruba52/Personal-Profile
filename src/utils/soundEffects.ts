/**
 * Lightweight Web Audio API sound synthesizer for cyberpunk UI feedback.
 * No external mp3 files required; instant loading, fully respect mute settings.
 */

class SoundEffectsController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // default muted for clean accessibility

  constructor() {
    // Lazy initialize on first user interaction
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playBeep(880, 0.05, 'sine');
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted) return;
    this.playBeep(1200, 0.03, 'sine', 0.08);
  }

  public playHover() {
    if (this.isMuted) return;
    this.playBeep(600, 0.02, 'sine', 0.03);
  }

  public playSuccess() {
    if (this.isMuted) return;
    this.playBeep(523.25, 0.06, 'triangle', 0.08);
    setTimeout(() => this.playBeep(659.25, 0.08, 'triangle', 0.08), 70);
  }

  private playBeep(freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.05) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio not supported or blocked, fail gracefully
    }
  }
}

export const sfx = new SoundEffectsController();
