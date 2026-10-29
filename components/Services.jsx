import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const rise = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } };
const mask = { hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.95, ease: EASE } } };
const grow = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } } };
const slide = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } };

const SERVICES = [
  {
    icon: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    ),
    title: 'Emergency Plumbing',
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
    image: '/images/service-6-inspection.webp',
    desc: 'Buying a home or had recurring issues? Our full plumbing inspection gives you a clear picture of everything with a written report.',
    details: ['Full home inspection', 'Camera pipe inspection', 'Written detailed report', 'Pre-purchase inspections'],
  },
];

function Panel({ service, index, total }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const alignRight = index % 2 === 1;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1.12, 1.05]);

  const num = String(index + 1).padStart(2, '0');

  return (
    <div ref={ref} className="screen relative flex items-center overflow-hidden bg-text-dark">
      <motion.img
        src={service.image}
        alt=""
        aria-hidden="true"
        decoding="async"
        loading={index === 0 ? 'eager' : 'lazy'}
        className="absolute inset-x-0 -top-[15%] w-full h-[130%] object-cover"
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent ${
          alignRight ? 'lg:bg-gradient-to-l' : 'lg:bg-gradient-to-r'
        } lg:from-black/75 lg:via-black/45 lg:to-transparent`}
      />

      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 py-12 lg:py-20 flex ${alignRight ? 'lg:justify-end' : 'lg:justify-start'} items-end lg:items-center`}>
        <motion.div
          className="max-w-xl w-full"
          variants={container}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.div variants={rise} className="flex items-baseline gap-4 mb-4">
            <span
              className="font-display font-bold text-7xl lg:text-8xl leading-none"
              style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.7)' }}
            >
              {num}
            </span>
            <span className="text-white/60 text-sm font-semibold tracking-[0.2em]">/ {String(total).padStart(2, '0')}</span>
          </motion.div>

          <div className="flex items-center gap-3 mb-4">
            <motion.div variants={rise} className="w-11 h-11 bg-brand rounded-xl flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6">
                {service.icon}
              </svg>
            </motion.div>
            <h3 className="overflow-hidden pb-1">
              <motion.span variants={mask} className="block font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                {service.title}
              </motion.span>
            </h3>
          </div>

          <motion.p variants={rise} className="text-white/90 text-base lg:text-lg leading-relaxed mb-6" style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
            {service.desc}
          </motion.p>

          <motion.div variants={grow} className="h-px bg-white/40 origin-left mb-5" />

          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
            {service.details.map((d) => (
              <motion.li key={d} variants={slide} className="flex items-center gap-2.5 text-white text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-light flex-shrink-0" />
                {d}
              </motion.li>
            ))}
          </ul>

          <motion.div variants={rise}>
            <a href="#contact" className="btn-primary">Book a Plumber</a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="relative bg-text-dark">
      <div className="screen flex items-center max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-3xl"
        >
          <motion.span variants={rise} className="section-tag !text-brand-light">What We Fix</motion.span>
          <h2 className="overflow-hidden pb-2">
            <motion.span variants={mask} className="block font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.05]">
              Every plumbing problem, solved.
            </motion.span>
          </h2>
          <motion.p variants={rise} className="text-white/70 text-lg leading-relaxed mt-6 max-w-xl">
            From dripping faucets to full repiping jobs — our licensed plumbers handle it all, same day in most cases.
          </motion.p>
        </motion.div>
      </div>

      {SERVICES.map((s, i) => (
        <Panel key={s.title} service={s} index={i} total={SERVICES.length} />
      ))}
    </section>
  );
}
