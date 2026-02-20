import { useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const EDITIONS = [
  {
    name: 'Emerald Edition',
    description: 'The signature collection in deep emerald packaging',
    features: ['Limited production', 'Hand-numbered', 'Collector\'s box'],
    image: '/assets/generated/emerald-box.dim_600x600.png',
  },
  {
    name: 'Botanical Edition',
    description: 'Enhanced with rare botanical extracts',
    features: ['Exclusive formula', 'Artisan crafted', 'Premium finish'],
    image: '/assets/generated/kaysen-bottle.dim_800x1200.png',
  },
  {
    name: 'Luxury Edition',
    description: 'The ultimate expression of botanical luxury',
    features: ['Gold accents', 'Bespoke packaging', 'Certificate of authenticity'],
    image: '/assets/generated/emerald-box.dim_600x600.png',
  },
];

export default function EditionsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress } = useScrollAnimation(sectionRef);
  const [selectedEdition, setSelectedEdition] = useState(0);

  const titleOpacity = Math.min(progress * 3, 1);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-stage-dark/30 to-background py-20 px-6"
    >
      <div className="relative w-full max-w-6xl">
        {/* Section Title */}
        <div
          className="text-center mb-16 transition-opacity duration-500"
          style={{ opacity: titleOpacity }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-wider text-luxury-gold mb-4">
            The Collection
          </h2>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">
            Exclusive Editions
          </p>
        </div>

        {/* Editions Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {EDITIONS.map((edition, index) => {
            const isSelected = selectedEdition === index;
            const cardOpacity = Math.min(Math.max((progress - 0.2 - index * 0.1) * 3, 0), 1);

            return (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  isSelected ? 'md:scale-105' : 'md:scale-100'
                }`}
                style={{ opacity: cardOpacity }}
                onClick={() => setSelectedEdition(index)}
                onMouseEnter={() => setSelectedEdition(index)}
              >
                {/* Card */}
                <div
                  className={`relative bg-card border rounded-lg overflow-hidden transition-all duration-300 ${
                    isSelected
                      ? 'border-luxury-gold shadow-lg shadow-luxury-gold/20'
                      : 'border-muted-foreground/10 hover:border-luxury-gold/50'
                  }`}
                >
                  {/* Image */}
                  <div className="aspect-square bg-muted/20 flex items-center justify-center p-8">
                    <img
                      src={edition.image}
                      alt={edition.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-display text-2xl text-luxury-gold mb-2">
                        {edition.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {edition.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {edition.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-botanical-accent" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Selection Indicator */}
                    <div className="pt-4 border-t border-muted-foreground/10">
                      <div
                        className={`text-xs tracking-widest uppercase transition-colors duration-300 ${
                          isSelected ? 'text-luxury-gold' : 'text-muted-foreground/50'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'View Details'}
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-luxury-gold/5 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${
                      isSelected ? 'opacity-100' : 'group-hover:opacity-100'
                    }`}
                  />
                </div>

                {/* Edition Number */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-luxury-gold text-background rounded-full flex items-center justify-center font-display text-lg font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
            Each edition is meticulously crafted to embody the essence of botanical luxury.
            Limited availability ensures exclusivity and exceptional quality.
          </p>
        </div>
      </div>
    </section>
  );
}
