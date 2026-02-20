import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const INGREDIENTS = [
  { name: 'Emerald Moss Extract', benefit: 'Deep hydration' },
  { name: 'Botanical Essence', benefit: 'Natural radiance' },
  { name: 'Luxury Oils', benefit: 'Silky texture' },
  { name: 'Pure Spring Water', benefit: 'Crystal clarity' },
];

export default function ProductDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const { progress } = useScrollAnimation(sectionRef);

  // Staggered reveal for content blocks
  const titleOpacity = Math.min(progress * 3, 1);
  const imageOpacity = Math.min(Math.max((progress - 0.2) * 3, 0), 1);
  const detailsOpacity = Math.min(Math.max((progress - 0.4) * 3, 0), 1);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background via-emerald-deep/10 to-background py-20 px-6"
    >
      <div className="relative w-full max-w-6xl">
        {/* Section Title */}
        <div
          className="text-center mb-16 transition-opacity duration-500"
          style={{ opacity: titleOpacity }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-light tracking-wider text-luxury-gold mb-4">
            The Essence
          </h2>
          <p className="text-muted-foreground tracking-widest uppercase text-sm">
            Botanical Luxury Defined
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div
            className="relative transition-opacity duration-700"
            style={{ opacity: imageOpacity }}
          >
            <div className="relative aspect-[3/4] flex items-center justify-center">
              <img
                src="/assets/generated/kaysen-bottle.dim_800x1200.png"
                alt="KAYSEN Botanical Luxury"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
              {/* Botanical Accent */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 opacity-30">
                <img
                  src="/assets/generated/botanicals.dim_1200x800.png"
                  alt="Botanicals"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div
            className="space-y-8 transition-opacity duration-700"
            style={{ opacity: detailsOpacity }}
          >
            {/* Story */}
            <div>
              <h3 className="font-display text-2xl text-luxury-gold mb-4">
                Crafted from Nature
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                KAYSEN Botanical Luxury represents the pinnacle of natural refinement.
                Each bottle contains a carefully orchestrated blend of rare botanical extracts,
                harvested at peak potency and preserved through artisanal methods.
              </p>
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="font-display text-xl text-emerald-light mb-4 tracking-wide">
                Key Ingredients
              </h4>
              <div className="space-y-3">
                {INGREDIENTS.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-muted-foreground/10 transition-all duration-300 hover:border-luxury-gold/30"
                  >
                    <div className="w-2 h-2 rounded-full bg-botanical-accent mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{ingredient.name}</p>
                      <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-muted-foreground/10">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Volume</p>
                <p className="font-display text-lg text-foreground">50ml</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Origin</p>
                <p className="font-display text-lg text-foreground">Botanical Gardens</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Type</p>
                <p className="font-display text-lg text-foreground">Essence</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Finish</p>
                <p className="font-display text-lg text-foreground">Luxury</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
