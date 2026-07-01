import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white border-b border-gray-mid shadow-sm' : 'bg-black/40 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span className={`font-bold text-sm tracking-tight transition-colors ${scrolled ? 'text-text-dark' : 'text-white'}`}>
            Swift<span className="text-brand-light">Flow</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {['Services', 'About', 'Reviews', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className={`font-sans text-sm font-semibold transition-colors ${scrolled ? 'text-text-mid hover:text-brand' : 'text-white hover:text-brand-light'}`}>
              {item}
            </a>
          ))}
        </nav>

        <a href="tel:+16025550147" className="hidden md:block btn-primary text-xs px-5 py-2.5">
          Call (602) 555-0147
        </a>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={scrolled ? '#0F172A' : 'white'} strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-mid px-6 py-4 flex flex-col gap-4">
          {['Services', 'About', 'Reviews', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-text-mid text-sm font-medium" onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
          <a href="tel:+16025550147" className="btn-primary text-xs w-fit" onClick={() => setMenuOpen(false)}>
            Call (602) 555-0147
          </a>
        </div>
      )}
    </header>
  );
}