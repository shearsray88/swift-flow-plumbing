import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AUTO_ADVANCE_MS = 6000;

const SLIDES = [
  {
    id: 'leak',
    eyebrow: 'Burst Pipe? Act Fast.',
    headline: ['Pipe Burst?', "We're On", 'Our Way.'],
    copy: "Water spreading fast doesn't wait for business hours. Neither do we — emergency crews dispatch within the hour, any time, day or night.",
    fact: 'Avg. arrival: 47 minutes',
  },
  {
    id: 'heater',
    eyebrow: 'No Hot Water?',
    headline: ['No Hot Water?', 'Fixed', 'Today.'],
    copy: 'Cold showers and a family waiting are a bad combo. Most water heater repairs and replacements are done same-day, upfront price before we start.',
    fact: '92% fixed same visit',
  },
  {
    id: 'drain',
    eyebrow: 'Drain Backed Up?',
    headline: ['Drain Backed Up?', 'Cleared', 'Fast.'],
    copy: "Slow drains turn into backups when you least expect it. Camera inspection and hydro-jetting get to the real problem, not just a temporary fix.",
    fact: 'Same-day slots open daily',
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, index]);

  const slide = SLIDES[index];

  return (
    <section
      id="overview"
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: '100vh' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%)' }}
          poster="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1600&q=80"
        >
          <source src="https://www.pexels.com/download/video/9200530/" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-28">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={slide.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-light animate-pulse" />
                <span className="text-white font-bold text-xs tracking-wide uppercase" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{slide.eyebrow}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
                {slide.headline.map((line, i) => (
                  <span key={i} className={i === slide.headline.length - 1 ? 'text-brand-light' : ''}>
                    {line}<br />
                  </span>
                ))}
              </h1>

              <p className="text-white font-medium text-lg leading-relaxed mb-8 max-w-md" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>{slide.copy}</p>

              <div className="inline-flex items-center gap-2.5 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-10">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span className="text-white text-sm font-semibold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{slide.fact}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="btn-primary text-sm px-8 py-4">
              Book a Plumber Today
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="tel:+16025550147" className="flex items-center gap-3 text-white hover:text-brand-light transition-colors">
              <div className="w-11 h-11 border border-white/40 rounded-lg flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.06 3.36 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/80 font-medium" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>24/7 Emergency Line</p>
                <p className="text-sm font-bold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>(602) 555-0147</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 lg:left-10 z-20 flex items-center gap-4">
        {SLIDES.map((s, i) => (
          <button key={s.id} onClick={() => setIndex(i)} className="relative h-1 w-10 rounded-full bg-white/25 overflow-hidden" aria-label={`Show slide ${i + 1}`}>
            <span className="absolute inset-0 bg-white/25" />
            {i === index && !paused && (
              <motion.div
                key={`progress-${index}`}
                className="absolute inset-y-0 left-0 bg-brand-light rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
              />
            )}
            {i === index && paused && <span className="absolute inset-y-0 left-0 bg-brand-light rounded-full w-1/3" />}
          </button>
        ))}
      </div>
    </section>
  );
}