import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';

const SERVICES = [
  {
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    ),
    title: 'Emergency Plumbing',
    short: 'Emergency',
    image: '/images/service-1-emergency.webp',
    desc: 'Burst pipes, flooding, gas leaks — we respond within 60 minutes, any time of day or night. No extra charge for after-hours calls.',
    details: ['60-minute response guarantee', 'Available 24/7/365', 'No after-hours surcharge', 'All emergency repairs covered'],
  },
  {
    icon: (
      <>
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
      </>
    ),
    title: 'Drain Cleaning',
    short: 'Drains',
    image: '/images/service-2-drain.webp',
    desc: 'Slow drains or complete blockages cleared fast. We use hydro-jetting and camera inspection to clear clogs and keep them from coming back.',
    details: ['Hydro-jet drain cleaning', 'Camera pipe inspection', 'Kitchen & bathroom drains', 'Main sewer line clearing'],
  },
  {
    icon: (
      <>
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </>
    ),
    title: 'Water Heater Services',
    short: 'Water Heaters',
    image: '/images/service-3-heater.webp',
    desc: 'Installation, repair, and replacement of all water heater types. We stock most units on our trucks for same-day installation.',
    details: ['Tank & tankless water heaters', 'Same-day installation', 'All major brands serviced', '6-year warranty on new units'],
  },
  {
    icon: (
      <>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </>
    ),
    title: 'Pipe Repair & Repiping',
    short: 'Repiping',
    image: '/images/service-4-repipe.webp',
    desc: 'From a single leaking pipe to full home repiping. We work with minimal disruption to your home and clean up completely after every job.',
    details: ['Leak detection & repair', 'Full home repiping', 'Copper & PEX piping', 'Minimal wall disruption'],
  },
  {
    icon: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </>
    ),
    title: 'Fixture Installation',
    short: 'Fixtures',
    image: '/images/service-5-fixtures.webp',
    desc: 'Toilets, faucets, sinks, showers — we install all plumbing fixtures with precision. Supply your own or let us source from trusted brands.',
    details: ['Toilet installation & repair', 'Faucet & sink replacement', 'Shower & tub fixtures', 'Garbage disposal install'],
  },
  {
    icon: (
      <>
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </>
    ),
    title: 'Plumbing Inspections',
    short: 'Inspections',
    image: '/images/service-6-inspection.webp',
    desc: 'Buying a home or had recurring issues? Our full plumbing inspection gives you a clear picture of everything with a written report.',
    details: ['Full home inspection', 'Camera pipe inspection', 'Written detailed report', 'Pre-purchase inspections'],
  },
];

export default function Services() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const service = SERVICES[active];

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(SERVICES.length - 1, Math.max(0, Math.floor(v * SERVICES.length)));
    setActive(i);
  });

  const goTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / SERVICES.length) * scrollable,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="services"
      ref={ref}
      className="relative bg-text-dark"
      style={{ height: `${SERVICES.length * 70 + 30}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {SERVICES.map((s, i) => (
          <motion.img
            key={s.image}
            src={s.image}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading={i === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ opacity: i === active ? 1 : 0, scale: reduce ? 1 : i === active ? 1.08 : 1 }}
            transition={{
              opacity: { duration: reduce ? 0 : 0.7 },
              scale: { duration: reduce ? 0 : i === active ? 6 : 0.9, ease: 'easeOut' },
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-text-dark/95 via-text-dark/75 to-text-dark/45 lg:bg-gradient-to-r lg:from-text-dark/90 lg:via-text-dark/65 lg:to-text-dark/55" />

        <div className="absolute right-3 lg:right-6 top-1/4 bottom-1/4 w-px bg-white/20" aria-hidden="true">
          <motion.div className="w-full h-full bg-brand-light origin-top" style={{ scaleY: scrollYProgress }} />
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end lg:justify-center pb-24 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-end lg:items-center">
            <div>
              <span className="section-tag !text-brand-light">What We Fix</span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4 lg:mb-6">
                Every plumbing problem, solved.
              </h2>
              <p className="hidden lg:block text-white/75 leading-relaxed mb-8 max-w-md">
                From dripping faucets to full repiping jobs — our licensed plumbers handle it all, same day in most cases.
              </p>
              <a href="#contact" className="btn-primary hidden lg:inline-flex">Book a Plumber</a>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                {SERVICES.map((s, i) => {
                  const isActive = active === i;
                  return (
                    <button
                      key={s.title}
                      onClick={() => goTo(i)}
                      className={`relative px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                        isActive ? 'text-white' : 'text-white/70 hover:text-white bg-white/10'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="service-tab-pill"
                          className="absolute inset-0 bg-brand rounded-lg"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{s.short}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: reduce ? 0 : 0.35 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 bg-brand rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
                        {service.icon}
                      </svg>
                    </div>
                    <h3 className="font-bold text-xl sm:text-2xl text-white">{service.title}</h3>
                  </div>

                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5 max-w-xl">{service.desc}</p>

                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 border-t border-white/20 pt-5 max-w-xl">
                    {service.details.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-white text-sm font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-light flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
