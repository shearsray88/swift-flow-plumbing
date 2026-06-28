import { motion } from 'framer-motion';
import { useState } from 'react';

const SERVICES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Emergency Plumbing',
    desc: 'Burst pipes, flooding, gas leaks — we respond within 60 minutes, any time of day or night. No extra charge for after-hours calls.',
    details: ['60-minute response guarantee', 'Available 24/7/365', 'No after-hours surcharge', 'All emergency repairs covered'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="1.5">
        <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
        <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
      </svg>
    ),
    title: 'Drain Cleaning',
    desc: 'Slow drains or complete blockages cleared fast. We use hydro-jetting and camera inspection to clear clogs and keep them from coming back.',
    details: ['Hydro-jet drain cleaning', 'Camera pipe inspection', 'Kitchen & bathroom drains', 'Main sewer line clearing'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="1.5">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
    title: 'Water Heater Services',
    desc: 'Installation, repair, and replacement of all water heater types. We stock most units on our trucks for same-day installation.',
    details: ['Tank & tankless water heaters', 'Same-day installation', 'All major brands serviced', '6-year warranty on new units'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: 'Pipe Repair & Repiping',
    desc: 'From a single leaking pipe to full home repiping. We work with minimal disruption to your home and clean up completely after every job.',
    details: ['Leak detection & repair', 'Full home repiping', 'Copper & PEX piping', 'Minimal wall disruption'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    title: 'Fixture Installation',
    desc: 'Toilets, faucets, sinks, showers — we install all plumbing fixtures with precision. Supply your own or let us source from trusted brands.',
    details: ['Toilet installation & repair', 'Faucet & sink replacement', 'Shower & tub fixtures', 'Garbage disposal install'],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0891B2" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Plumbing Inspections',
    desc: 'Buying a home or had recurring issues? Our full plumbing inspection gives you a clear picture of everything with a written report.',
    details: ['Full home inspection', 'Camera pipe inspection', 'Written detailed report', 'Pre-purchase inspections'],
  },
];

export default function Services() {
  const [open, setOpen] = useState(null);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.8fr] gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <span className="section-tag">What We Fix</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-dark leading-tight mb-6">
              Every plumbing problem, solved.
            </h2>
            <p className="text-text-mid leading-relaxed mb-8">
              From dripping faucets to full repiping jobs -- our licensed plumbers handle it all, same day in most cases.
            </p>
            <a href="#contact" className="btn-primary">Book a Plumber</a>
          </motion.div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-gray-mid rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-warm transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {s.icon}
                    </div>
                    <span className="font-sans font-semibold text-text-dark">{s.title}</span>
                  </div>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2"
                    className={`flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {open === i && (
                  <div className="px-5 pb-5 pt-1 border-t border-gray-mid bg-gray-warm">
                    <p className="text-text-mid text-sm leading-relaxed mb-4">{s.desc}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {s.details.map(d => (
                        <li key={d} className="flex items-center gap-2 text-text-mid text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}