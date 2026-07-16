import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  )},
  { id: 'services', label: 'Services', icon: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  )},
  { id: 'process', label: 'Process', icon: (
    <>
      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
    </>
  )},
  { id: 'reviews', label: 'Reviews', icon: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  )},
  { id: 'coverage', label: 'Coverage', icon: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </>
  )},
  { id: 'contact', label: 'Contact', icon: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.06 3.36 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  )},
];

export default function Navigation() {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: fixed left icon rail */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-24 bg-white border-r border-gray-mid z-50 flex-col items-center py-8">
        <a href="#overview" className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center mb-10 flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </a>

        <nav className="flex flex-col gap-2 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a key={item.id} href={`#${item.id}`} className="relative flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl group">
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-brand/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-brand transition-opacity"
                  style={{ opacity: isActive ? 1 : 0 }}
                />
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
                  stroke={isActive ? '#0891B2' : '#94A3B8'} strokeWidth="1.8"
                  className="relative z-10 transition-colors group-hover:stroke-brand">
                  {item.icon}
                </svg>
                <span className={`relative z-10 text-[10px] font-semibold tracking-wide transition-colors ${isActive ? 'text-brand' : 'text-text-muted group-hover:text-brand'}`}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        <a href="tel:+16025550147" className="w-12 h-12 bg-brand-dark rounded-xl flex items-center justify-center flex-shrink-0" title="Call (602) 555-0147">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.06 3.36 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>
      </aside>

      {/* Mobile: fixed bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-mid z-50 flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <a key={item.id} href={`#${item.id}`} className="flex flex-col items-center gap-1 px-2 py-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#0891B2' : '#94A3B8'} strokeWidth="1.8">
                {item.icon}
              </svg>
              <span className={`text-[9px] font-semibold ${isActive ? 'text-brand' : 'text-text-muted'}`}>{item.label}</span>
            </a>
          );
        })}
        <a href="tel:+16025550147" className="flex flex-col items-center gap-1 px-2 py-1">
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center -mt-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.06 3.36 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <span className="text-[9px] font-semibold text-brand">Call</span>
        </a>
      </nav>
    </>
  );
}