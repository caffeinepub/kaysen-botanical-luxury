import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress } = useScrollAnimation(sectionRef);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Stop-motion entrance animation
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Parallax depth effect for diorama layers
  const layer1Y = progress * 50;
  const layer2Y = progress * 30;
  const layer3Y = progress * 15;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-emerald-deep via-emerald-mid to-background"
    >
      {/* Diorama Stage Frame */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-stage-frame/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stage-frame/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stage-frame/30 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-stage-frame/30 to-transparent" />
      </div>

      {/* Layered Diorama Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        {/* Background Layer */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${layer1Y}px)`,
            transition: 'transform 0.1s steps(3)',
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-botanical-accent/30 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-accent/20 blur-3xl" />
        </div>

        {/* Middle Layer */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateY(${layer2Y}px)`,
            transition: 'transform 0.1s steps(3)',
          }}
        >
          <div className="w-full max-w-4xl aspect-square opacity-10">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1" fill="none" className="text-emerald-accent" />
              <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" fill="none" className="text-botanical-accent" />
              <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="1" fill="none" className="text-luxury-gold" />
            </svg>
          </div>
        </div>

        {/* Foreground Content Layer */}
        <div
          className="relative z-20 text-center"
          style={{
            transform: `translateY(${layer3Y}px)`,
            transition: 'transform 0.1s steps(3)',
          }}
        >
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: 'steps(8)' }}
          >
            {/* Brand Title */}
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-light tracking-wider text-luxury-gold mb-4">
              KAYSEN
            </h1>
            <div className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-luxury-gold to-transparent mb-6" />
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-emerald-light tracking-widest">
              Botanical Luxury
            </p>
            
            {/* Subtitle */}
            <p className="mt-8 text-sm md:text-base text-muted-foreground/80 tracking-[0.3em] uppercase">
              A Mechanical Unveiling
            </p>
          </div>

          {/* Scroll Indicator */}
          <div
            className={`mt-16 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
              <span className="text-xs tracking-widest uppercase">Scroll to Experience</span>
              <div className="w-6 h-10 border border-current rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-2 bg-current rounded-full animate-bounce" style={{ animationTimingFunction: 'steps(4)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Spotlight Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-spotlight opacity-30" />
      </div>
    </section>
  );
}
