type SoundType = 'ratchet' | 'mechanical' | 'spring';

// Audio context for Web Audio API
let audioContext: AudioContext | null = null;

// Initialize audio context on first interaction
function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// Generate synthetic sounds using Web Audio API
function createRatchetSound(ctx: AudioContext): void {
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Sharp click sound
  oscillator.frequency.setValueAtTime(800, now);
  oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.05);
  
  gainNode.gain.setValueAtTime(0.15, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

  oscillator.start(now);
  oscillator.stop(now + 0.05);
}

function createMechanicalSound(ctx: AudioContext): void {
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Mechanical whir
  oscillator.frequency.setValueAtTime(400, now);
  oscillator.frequency.linearRampToValueAtTime(300, now + 0.1);
  
  gainNode.gain.setValueAtTime(0.1, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

  oscillator.start(now);
  oscillator.stop(now + 0.1);
}

function createSpringSound(ctx: AudioContext): void {
  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Bouncy spring sound
  oscillator.frequency.setValueAtTime(600, now);
  oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.15);
  oscillator.frequency.exponentialRampToValueAtTime(400, now + 0.25);
  
  gainNode.gain.setValueAtTime(0.12, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

  oscillator.start(now);
  oscillator.stop(now + 0.25);
}

// Play sound by type
export function playSound(type: SoundType): void {
  try {
    const ctx = getAudioContext();
    
    // Resume context if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    switch (type) {
      case 'ratchet':
        createRatchetSound(ctx);
        break;
      case 'mechanical':
        createMechanicalSound(ctx);
        break;
      case 'spring':
        createSpringSound(ctx);
        break;
    }
  } catch (error) {
    // Silently fail if audio is not supported
    console.warn('Audio playback failed:', error);
  }
}

// Initialize audio context on user interaction
export function initAudio(): void {
  try {
    getAudioContext();
  } catch (error) {
    console.warn('Audio initialization failed:', error);
  }
}
