import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { useState, useRef } from 'react';

const ZONES = [
  { id: 'scottsdale', name: 'Scottsdale', time: '20 min', x: 310, y: 186, ring: 1 },
  { id: 'tempe', name: 'Tempe', time: '25 min', x: 300, y: 325, ring: 1 },
  { id: 'mesa', name: 'Mesa', time: '35 min', x: 365, y: 350, ring: 2 },
  { id: 'chandler', name: 'Chandler', time: '45 min', x: 270, y: 450, ring: 3 },
];

const RINGS = [{ r: 90 }, { r: 150 }, { r: 210 }];

export default function MapSection() {
  const [active, setActive] = useState('scottsdale');
  const svgRef = useRef(null);
  const inView = useInView(svgRef, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const activeZone = ZONES.find((z) => z.id === active);

  return (
    <section id="coverage" className="bg-white overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="relative bg-gray-warm flex flex-col items-center justify-center py-12 sm:py-16 px-6 min-h-[450px] sm:min-h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-sm sm:max-w-md"
          >
            <svg ref={svgRef} viewBox="0 0 500 500" className="w-full h-auto">
              {RINGS.map((ring, i) => (
                <motion.circle
                  key={ring.r}
                  cx="250"
                  cy="250"
                  fill="none"
                  stroke="#0891B2"
                  strokeWidth={activeZone?.ring === i + 1 ? 2.5 : 1}
                  strokeDasharray="4 6"
                  initial={false}
                  animate={{
                    r: inView ? ring.r : 0,
                    opacity: inView ? (activeZone?.ring === i + 1 ? 0.6 : 0.2) : 0,
                  }}
                  transition={{
                    r: { duration: reduce ? 0 : 1.1, delay: reduce ? 0 : i * 0.25, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: reduce ? 0 : 0.4 },
                  }}
                  style={{ transition: 'stroke-width 0.4s ease' }}
                />
              ))}

              <circle cx="250" cy="250" r="14" fill="#0891B2" opacity="0.15" />
              <circle cx="250" cy="250" r="7" fill="#0891B2" />
              <text x="250" y="278" textAnchor="middle" className="text-[12px] font-bold select-none" fill="#0F172A">
                Phoenix HQ
              </text>

              {ZONES.map((z, zi) => {
                const isActive = active === z.id;
                return (
                  <motion.g
                    key={z.id}
                    initial={false}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.7 + zi * 0.15 }}
                    onMouseEnter={() => setActive(z.id)}
                    onClick={() => setActive(z.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActive(z.id)}
                    className="cursor-pointer focus-visible:outline-none group"
                  >
                    <circle cx={z.x} cy={z.y} r="22" fill="transparent" />

                    {isActive && (
                      <circle
                        cx={z.x}
                        cy={z.y}
                        r={16}
                        fill="none"
                        stroke="#0891B2"
                        strokeWidth="2"
                        className="animate-ping"
                        style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                        opacity="0.4"
                      />
                    )}

                    <circle
                      cx={z.x}
                      cy={z.y}
                      r={isActive ? 10 : 6}
                      fill={isActive ? '#0891B2' : '#22D3EE'}
                      stroke="white"
                      strokeWidth="2"
                      className="group-focus-visible:stroke-brand-light group-focus-visible:stroke-[3px]"
                      style={{ transition: 'all 0.2s ease' }}
                    />

                    <text
                      x={z.x}
                      y={z.y - 18}
                      textAnchor="middle"
                      className="text-[12px] font-bold select-none transition-colors duration-200"
                      fill={isActive ? '#0F172A' : '#64748B'}
                    >
                      {z.name}
                    </text>
                  </motion.g>
                );
              })}
            </svg>
          </motion.div>
        </div>

        <div className="bg-text-dark p-8 lg:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-brand-light font-bold text-xs tracking-[0.2em] uppercase mb-3">Service Area</p>

            <div className="min-h-[40px] sm:min-h-[48px] flex items-center mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="font-sans font-bold text-white text-2xl sm:text-3xl"
                >
                  ~{activeZone?.time} response to {activeZone?.name}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl mb-6">
              <div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-sans font-bold text-white text-sm">SwiftFlow Plumbing HQ</p>
                <p className="text-white/50 text-xs mt-0.5">4821 E Thomas Rd, Phoenix, AZ 85018</p>
                <a href="https://maps.google.com/maps?q=4821+E+Thomas+Rd+Phoenix+AZ+85018" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-light text-xs font-semibold mt-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-light rounded">
                  Get directions
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="text-white/50 text-sm mb-4">Hover a city on the map, or tap below for response time.</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {ZONES.map((z) => {
                const isActive = active === z.id;
                return (
                  <button
                    key={z.id}
                    onClick={() => setActive(z.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/70 ${
                      isActive
                        ? 'bg-brand/20 border-brand/50 text-white shadow-lg shadow-brand/10'
                        : 'bg-white/5 border-white/10 text-white/60 hover:border-brand/30 hover:text-white'
                    }`}
                  >
                    {z.name}
                    <span className={`text-xs font-bold ${isActive ? 'text-brand-light' : 'text-white/30'}`}>{z.time}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 p-3 bg-brand/10 rounded-xl border border-brand/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <p className="font-sans text-white/70 text-xs">Licensed & insured · 24/7 emergency dispatch</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}