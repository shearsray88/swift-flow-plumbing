const FOOTER_LINKS = ['Overview', 'Services', 'Process', 'Reviews', 'Coverage', 'Contact'];

export default function Footer() {
  return (
    <footer className="bg-text-dark py-12 lg:pl-24 pb-20 lg:pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span className="font-bold text-white text-sm">Swift<span className="text-brand-light">Flow</span> Plumbing</span>
            </div>
            <p className="text-white/30 text-xs">Licensed plumbers serving Phoenix & surrounding areas</p>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-8">
            {FOOTER_LINKS.map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-white/40 text-xs hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-white/20 text-xs">&copy; 2026 SwiftFlow Plumbing. All rights reserved.</p>
          <p className="text-white/20 text-xs">AZ License #ROC-289341 · Phoenix, AZ</p>
        </div>
        <div className="text-center mt-4">
          <a href="https://duraysdev.com/portfolio/swiftflow-plumbing" target="_blank" rel="noopener noreferrer"
            className="text-white/20 text-xs hover:text-white/50 transition-colors">
            Design &amp; Development by Durays Dev
          </a>
        </div>
      </div>
    </footer>
  );
}