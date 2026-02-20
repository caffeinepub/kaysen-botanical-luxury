import { useRef, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSpringPhysics } from '../hooks/useSpringPhysics';
import { playSound } from '../utils/audioManager';

export default function WaveSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress, isInView } = useScrollAnimation(sectionRef);
  const lastSoundTime = useRef(0);

  // Spring physics for water movement
  const waveSpring = useSpringPhysics({
    target: progress,
    stiffness: 0.15,
    damping: 0.3,
  });

  // Play spring sound periodically
  useEffect(() => {
    if (isInView && waveSpring.velocity > 0.01) {
      const now = Date.now();
      if (now - lastSoundTime.current > 800) {
        playSound('spring');
        lastSoundTime.current = now;
      }
    }
  }, [waveSpring.velocity, isInView]);

  // Wave animation values
  const waveOffset = Math.sin(waveSpring.value * Math.PI * 2) * 30;
  const botanicalFloat = Math.sin(waveSpring.value * Math.PI * 3) * 20;
  const waterScale = 0.8 + waveSpring.value * 0.2;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-emerald-deep/30 to-background py-20 px-6 overflow-hidden"
    >
      <div className="relative w-full max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-wider text-luxury-gold mb-4">
            The Wave
          </h2>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">
            Spring Mechanism
          </p>
        </div>

        {/* Water Feature Stage */}
        <div className="relative w-full aspect-[16/10] flex items-center justify-center">
          {/* Background Botanicals */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-20"
            style={{
              transform: `translateY(${botanicalFloat}px) scale(1.2)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <img
              src="/assets/generated/botanicals.dim_1200x800.png"
              alt="Botanical Elements"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Water Feature */}
          <div
            className="relative z-10"
            style={{
              transform: `translateY(${waveOffset}px) scale(${waterScale})`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <img
              src="/assets/generated/water-feature.dim_800x800.png"
              alt="Water Feature"
              className="w-96 h-96 object-contain drop-shadow-2xl"
            />
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute w-full h-full rounded-full border-2 border-emerald-accent/20"
                  style={{
                    transform: `scale(${1 + waveSpring.value * 0.3 + i * 0.2})`,
                    opacity: Math.max(0, 0.5 - waveSpring.value - i * 0.2),
                    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating Botanical Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const radius = 200 + Math.sin(waveSpring.value * Math.PI + i) * 50;
              const x = Math.cos(angle + waveSpring.value * 0.5) * radius;
              const y = Math.sin(angle + waveSpring.value * 0.5) * radius;
              
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-botanical-accent/30 blur-sm"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${0.5 + Math.sin(waveSpring.value * Math.PI * 2 + i) * 0.5})`,
                    transition: 'transform 0.1s ease-out',
                  }}
                />
              );
            })}
          </div>

          {/* Spring Mechanism Visualization */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-muted-foreground/40">
            <div className="flex flex-col items-center gap-1">
              <div className="text-xs tracking-wider uppercase">Spring</div>
              <div className="flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-current rounded-full"
                    style={{
                      height: `${12 + Math.sin(waveSpring.value * Math.PI * 4 + i * 0.5) * 8}px`,
                      transition: 'height 0.05s ease-out',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="text-xs">
              Velocity: {(waveSpring.velocity * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Descriptive Text */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground leading-relaxed">
            Like a spring-loaded mechanism, our botanical essence flows with natural rhythm,
            delivering pure luxury in every drop.
          </p>
        </div>
      </div>
    </section>
  );
}
