import { SiX, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'kaysen-botanical-luxury';

  return (
    <footer className="relative w-full bg-gradient-to-b from-background to-stage-dark border-t border-muted-foreground/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Brand */}
        <div className="text-center mb-12">
          <h3 className="font-display text-3xl md:text-4xl font-light tracking-wider text-luxury-gold mb-2">
            KAYSEN
          </h3>
          <p className="font-serif text-lg text-emerald-light tracking-widest">
            Botanical Luxury
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-muted-foreground/20 to-transparent mb-12" />

        {/* Links & Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-medium text-foreground mb-3 tracking-wider uppercase">
              About
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A showcase of botanical luxury through mechanical artistry and stop-motion aesthetics.
            </p>
          </div>

          {/* Experience */}
          <div className="text-center">
            <h4 className="text-sm font-medium text-foreground mb-3 tracking-wider uppercase">
              Experience
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Stop-Motion Design</li>
              <li>Mechanical Animations</li>
              <li>Botanical Essence</li>
            </ul>
          </div>

          {/* Connect */}
          <div className="text-center md:text-right">
            <h4 className="text-sm font-medium text-foreground mb-3 tracking-wider uppercase">
              Connect
            </h4>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:border-luxury-gold hover:text-luxury-gold transition-colors duration-300"
                aria-label="X (Twitter)"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-muted-foreground/20 flex items-center justify-center text-muted-foreground hover:border-luxury-gold hover:text-luxury-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-muted-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} KAYSEN Botanical Luxury. All rights reserved.</p>
          <p>
            Built with <span className="text-luxury-gold">♥</span> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-luxury-gold transition-colors duration-300"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
