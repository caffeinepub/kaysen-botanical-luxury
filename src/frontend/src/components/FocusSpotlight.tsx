import { useRef, useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { playSound } from '../utils/audioManager';

const FOCUS_POINTS = [
  { x: 50, y: 30, label: 'Botanical Essence', detail: 'Pure plant extracts' },
  { x: 50, y: 50, label: 'Luxury Cap', detail: 'Hand-finished detail' },
  { x: 50, y: 70, label: 'Crystal Clarity', detail: 'Premium formulation' },
];

export default function FocusSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress, isInView } = useScrollAnimation(sectionRef);
  const [lastStep, setLastStep] = useState(0);

  // Ratchet through focus points
  const totalSteps = FOCUS_POINTS.length;
  const currentFocusIndex = Math.min(Math.floor(progress * (totalSteps + 1)), totalSteps - 1);
  const currentFocus = FOCUS_POINTS[currentFocusIndex] || FOCUS_POINTS[0];

  // Play mechanical sound on focus change
  useEffect(() => {
    if (isInView && currentFocusIndex > lastStep) {
      playSound('mechanical');
      setLastStep(currentFocusIndex);
    }
  }, [currentFocusIndex, isInView, lastStep]);

  // Spotlight position with ratchet movement
  const spotlightX = currentFocus.x;
  const spotlightY = currentFocus.y;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-stage-dark to-background py-20 px-6"
    >
      <div className="relative w-full max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-wider text-luxury-gold mb-4">
            The Focus
          </h2>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">
            Mechanical Precision
          </p>
        </div>

        {/* Spotlight Stage */}
        <div className="relative w-full aspect-[16/10] bg-stage-dark/50 rounded-lg overflow-hidden border border-muted-foreground/10">
          {/* Product Image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <img
              src="/assets/generated/kaysen-bottle.dim_800x1200.png"
              alt="KAYSEN Bottle Detail"
              className="h-[80%] w-auto"
            />
          </div>

          {/* Spotlight Beam */}
          <div
            className="absolute w-48 h-48 pointer-events-none"
            style={{
              left: `${spotlightX}%`,
              top: `${spotlightY}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.3s steps(4), top 0.3s steps(4)',
            }}
          >
            {/* Spotlight glow */}
            <div className="absolute inset-0 bg-radial-spotlight opacity-80" />
            <div className="absolute inset-0 bg-luxury-gold/20 rounded-full blur-2xl" />
            
            {/* Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-luxury-gold/60" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-luxury-gold/60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-luxury-gold/80 rounded-full" />
              </div>
            </div>
          </div>

          {/* Mechanical Spotlight Apparatus */}
          <div className="absolute top-4 right-4 w-32 h-32 opacity-30">
            <img
              src="/assets/generated/spotlight.dim_600x800.png"
              alt="Spotlight Apparatus"
              className="w-full h-full object-contain"
              style={{
                transform: `rotate(${currentFocusIndex * 15}deg)`,
                transition: 'transform 0.3s steps(3)',
              }}
            />
          </div>

          {/* Focus Point Labels */}
          {FOCUS_POINTS.map((point, index) => (
            <div
              key={index}
              className={`absolute transition-opacity duration-300 ${
                index === currentFocusIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="bg-background/90 backdrop-blur-sm border border-luxury-gold/30 rounded-lg px-4 py-2 text-center">
                <p className="font-display text-lg text-luxury-gold">{point.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{point.detail}</p>
              </div>
            </div>
          ))}

          {/* Ratchet Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            {FOCUS_POINTS.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm border-2 transition-all duration-200 ${
                  index === currentFocusIndex
                    ? 'bg-luxury-gold border-luxury-gold scale-125'
                    : 'bg-transparent border-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
