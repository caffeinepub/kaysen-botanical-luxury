import { useRef, useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { playSound } from '../utils/audioManager';

export default function UnveilingSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress, isInView } = useScrollAnimation(sectionRef);
  const [lastRatchetStep, setLastRatchetStep] = useState(0);

  // Ratcheted animation progress (8 steps for stop-motion feel)
  const ratchetSteps = 8;
  const ratchetProgress = Math.floor(progress * ratchetSteps) / ratchetSteps;
  const currentStep = Math.floor(progress * ratchetSteps);

  // Play ratchet sound on each step change
  useEffect(() => {
    if (isInView && currentStep > lastRatchetStep && currentStep > 0) {
      playSound('ratchet');
      setLastRatchetStep(currentStep);
    }
  }, [currentStep, isInView, lastRatchetStep]);

  // Mechanical hand positions (articulated joints)
  const leftHandX = -200 + ratchetProgress * 150;
  const leftHandRotate = -45 + ratchetProgress * 45;
  const rightHandX = 200 - ratchetProgress * 150;
  const rightHandRotate = 45 - ratchetProgress * 45;

  // Bottle reveal
  const bottleScale = 0.3 + ratchetProgress * 0.7;
  const bottleOpacity = ratchetProgress;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-emerald-deep/20 to-background py-20 px-6"
    >
      <div className="relative w-full max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-wider text-luxury-gold mb-4">
            The Unveiling
          </h2>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">
            Articulated Precision
          </p>
        </div>

        {/* Mechanical Stage */}
        <div className="relative w-full aspect-[16/10] flex items-center justify-center">
          {/* Left Mechanical Hand */}
          <div
            className="absolute left-1/2 top-1/2 -translate-y-1/2 w-32 h-48 pointer-events-none"
            style={{
              transform: `translateX(${leftHandX}px) translateY(-50%) rotate(${leftHandRotate}deg)`,
              transition: 'transform 0.15s steps(2)',
            }}
          >
            <svg viewBox="0 0 100 150" className="w-full h-full text-muted-foreground/40">
              {/* Palm */}
              <rect x="30" y="60" width="40" height="60" rx="8" fill="currentColor" />
              {/* Fingers - articulated segments */}
              <g className="finger">
                <rect x="25" y="40" width="8" height="25" rx="4" fill="currentColor" />
                <circle cx="29" cy="42" r="3" fill="currentColor" className="opacity-60" />
              </g>
              <g className="finger">
                <rect x="40" y="35" width="8" height="30" rx="4" fill="currentColor" />
                <circle cx="44" cy="37" r="3" fill="currentColor" className="opacity-60" />
              </g>
              <g className="finger">
                <rect x="55" y="40" width="8" height="25" rx="4" fill="currentColor" />
                <circle cx="59" cy="42" r="3" fill="currentColor" className="opacity-60" />
              </g>
              {/* Wrist joint */}
              <circle cx="50" cy="125" r="8" fill="currentColor" className="opacity-80" />
              <rect x="46" y="120" width="8" height="30" fill="currentColor" />
            </svg>
          </div>

          {/* Right Mechanical Hand */}
          <div
            className="absolute left-1/2 top-1/2 -translate-y-1/2 w-32 h-48 pointer-events-none"
            style={{
              transform: `translateX(${rightHandX}px) translateY(-50%) rotate(${rightHandRotate}deg) scaleX(-1)`,
              transition: 'transform 0.15s steps(2)',
            }}
          >
            <svg viewBox="0 0 100 150" className="w-full h-full text-muted-foreground/40">
              <rect x="30" y="60" width="40" height="60" rx="8" fill="currentColor" />
              <g className="finger">
                <rect x="25" y="40" width="8" height="25" rx="4" fill="currentColor" />
                <circle cx="29" cy="42" r="3" fill="currentColor" className="opacity-60" />
              </g>
              <g className="finger">
                <rect x="40" y="35" width="8" height="30" rx="4" fill="currentColor" />
                <circle cx="44" cy="37" r="3" fill="currentColor" className="opacity-60" />
              </g>
              <g className="finger">
                <rect x="55" y="40" width="8" height="25" rx="4" fill="currentColor" />
                <circle cx="59" cy="42" r="3" fill="currentColor" className="opacity-60" />
              </g>
              <circle cx="50" cy="125" r="8" fill="currentColor" className="opacity-80" />
              <rect x="46" y="120" width="8" height="30" fill="currentColor" />
            </svg>
          </div>

          {/* KAYSEN Bottle */}
          <div
            className="relative z-10"
            style={{
              transform: `scale(${bottleScale})`,
              opacity: bottleOpacity,
              transition: 'transform 0.15s steps(2), opacity 0.15s steps(2)',
            }}
          >
            <img
              src="/assets/generated/kaysen-bottle.dim_800x1200.png"
              alt="KAYSEN Botanical Luxury Bottle"
              className="w-64 h-auto drop-shadow-2xl"
            />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-luxury-gold/20 to-transparent blur-xl -z-10" />
          </div>

          {/* Mechanical Grid Background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 500">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="800" height="500" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            {Array.from({ length: ratchetSteps }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i < currentStep ? 'bg-luxury-gold' : 'bg-muted-foreground/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
