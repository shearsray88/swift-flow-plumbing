import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

const HQ = { x: 500, y: 330 };
const EASE = [0.22, 1, 0.36, 1];
const TRAVEL_SECONDS = 2.6;
const TOUR_MS = 6200;

const ZONES = [
  { id: 'phoenix', name: 'Phoenix', time: 15, x: 466, y: 262, zips: ['85003', '85004', '85006', '85008', '85012', '85013', '85014', '85016', '85018', '85020', '85028', '85032', '85044', '85048', '85050'] },
  { id: 'scottsdale', name: 'Scottsdale', time: 20, x: 588, y: 242, zips: ['85250', '85251', '85254', '85255', '85258', '85260'] },
  { id: 'tempe', name: 'Tempe', time: 25, x: 634, y: 408, zips: ['85281', '85282', '85283', '85284'] },
  { id: 'glendale', name: 'Glendale', time: 30, x: 348, y: 223, zips: ['85301', '85302', '85303', '85304', '85308'] },
  { id: 'mesa', name: 'Mesa', time: 35, x: 710, y: 386, zips: ['85201', '85202', '85204', '85210', '85212'] },
  { id: 'gilbert', name: 'Gilbert', time: 40, x: 659, y: 520, zips: ['85233', '85234', '85296', '85297'] },
  { id: 'chandler', name: 'Chandler', time: 45, x: 452, y: 600, zips: ['85224', '85225', '85226', '85248', '85286'] },
];

const RINGS = [
  { r: 124, label: '20 MIN' },
  { r: 217, label: '35 MIN' },
  { r: 279, label: '45 MIN' },
];

const HIGHWAYS = [
  'M -10 365 C 250 340, 380 352, 500 335 S 800 300, 1010 278',
  'M 455 -10 C 470 180, 505 330, 520 710',
  'M 250 710 C 215 420, 300 205, 520 125 S 800 100, 1010 150',
  'M -10 470 C 250 440, 450 480, 620 462 S 820 385, 1010 405',
  'M 300 710 C 420 525, 600 432, 1010 335',
];

function routePath(zone) {
  const mx = (HQ.x + zone.x) / 2;
  const my = (HQ.y + zone.y) / 2;
  const dx = zone.x - HQ.x;
  const dy = zone.y - HQ.y;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const off = len * 0.18;
  return `M ${HQ.x} ${HQ.y} Q ${mx + nx * off} ${my + ny * off} ${zone.x} ${zone.y}`;
}

function Dispatch({ zone, progress, reduce }) {
  const measureRef = useRef(null);
  const [pos, setPos] = useState(HQ);
  const d = routePath(zone);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return undefined;
    if (reduce) {
      progress.set(1);
      setPos({ x: zone.x, y: zone.y });
      return undefined;
    }
    const total = el.getTotalLength();
    progress.set(0);
    setPos(HQ);
    const controls = animate(progress, 1, {
      duration: TRAVEL_SECONDS,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => {
        const p = el.getPointAtLength(v * total);
        setPos({ x: p.x, y: p.y });
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zone.id, reduce]);

  return (
    <g>
      <path ref={measureRef} d={d} fill="none" stroke="none" />
      <path d={d} fill="none" stroke="#22D3EE" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="3 7" />
      <motion.path
        key={`route-${zone.id}`}
        d={d}
        fill="none"
        stroke="#22D3EE"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : TRAVEL_SECONDS, ease: [0.45, 0, 0.2, 1] }}
        style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.9))' }}
      />
      <circle cx={pos.x} cy={pos.y} r="16" fill="#22D3EE" opacity="0.18" />
      <circle cx={pos.x} cy={pos.y} r="8" fill="#22D3EE" stroke="#ffffff" strokeWidth="2.5" />
      {!reduce && (
        <motion.circle
          key={`arrive-${zone.id}`}
          cx={zone.x}
          cy={zone.y}
          fill="none"
          stroke="#22D3EE"
          strokeWidth="3"
          initial={{ r: 8, opacity: 0 }}
          animate={{ r: [8, 8, 52], opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.1, delay: TRAVEL_SECONDS, times: [0, 0.01, 1], ease: 'easeOut' }}
        />
      )}
    </g>
  );
}

export default function MapSection() {
  const [active, setActive] = useState('scottsdale');
  const [hovering, setHovering] = useState(false);
  const [zip, setZip] = useState('');
  const [zipResult, setZipResult] = useState(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -20% 0px' });
  const inViewNow = useInView(sectionRef, { margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);

  const zone = ZONES.find((z) => z.id === active);
  const minutes = useTransform(progress, (v) => Math.round(v * zone.time));

  useEffect(() => {
    if (!inViewNow || hovering || reduce) return undefined;
    const t = setTimeout(() => {
      const i = ZONES.findIndex((z) => z.id === active);
      setActive(ZONES[(i + 1) % ZONES.length].id);
    }, TOUR_MS);
    return () => clearTimeout(t);
  }, [active, inViewNow, hovering, reduce]);

  const checkZip = (e) => {
    e.preventDefault();
    const z = zip.trim().slice(0, 5);
    if (!/^\d{5}$/.test(z)) {
      setZipResult({ ok: false, msg: 'Enter a 5-digit ZIP code.' });
      return;
    }
    const match = ZONES.find((zn) => zn.zips.includes(z));
    if (match) {
      setActive(match.id);
      setZipResult({ ok: true, msg: `Yes, we cover ${z}. About ${match.time} minutes from our Phoenix base.` });
    } else {
      setZipResult({ ok: false, msg: 'We could not match that ZIP. Call (602) 555-0147 and we will confirm.' });
    }
  };

  return (
    <section
      id="coverage"
      ref={sectionRef}
      className="relative bg-[#07131d] overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="grid lg:grid-cols-[minmax(380px,0.8fr)_1.4fr] min-h-[92vh]">
        <div className="relative order-1 lg:order-2 h-[58vh] lg:h-auto overflow-hidden">
          <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" role="img" aria-label="Service area map around Phoenix">
            <defs>
              <radialGradient id="mapglow" cx="50%" cy="47%" r="62%">
                <stop offset="0" stopColor="#0E5266" />
                <stop offset="1" stopColor="#07131d" />
              </radialGradient>
              <pattern id="mapgrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M50 0H0V50" fill="none" stroke="#22D3EE" strokeOpacity="0.07" strokeWidth="1" />
              </pattern>
            </defs>

            <rect width="1000" height="700" fill="url(#mapglow)" />
            <rect width="1000" height="700" fill="url(#mapgrid)" />

            <path d="M -10 430 C 200 405, 380 440, 560 420 S 850 360, 1010 372" fill="none" stroke="#22D3EE" strokeOpacity="0.1" strokeWidth="18" strokeLinecap="round" />

            {HIGHWAYS.map((d) => (
              <g key={d}>
                <path d={d} fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="7" />
                <path d={d} fill="none" stroke="#22D3EE" strokeOpacity="0.28" strokeWidth="1.2" strokeDasharray="8 10" />
              </g>
            ))}

            {RINGS.map((ring, i) => (
              <g key={ring.r}>
                <motion.circle
                  cx={HQ.x}
                  cy={HQ.y}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.2"
                  strokeDasharray="4 8"
                  initial={false}
                  animate={{ r: inView ? ring.r : 0, opacity: inView ? 0.45 : 0 }}
                  transition={{
                    r: { duration: reduce ? 0 : 1.3, delay: reduce ? 0 : i * 0.3, ease: EASE },
                    opacity: { duration: reduce ? 0 : 0.5 },
                  }}
                />
                <motion.text
                  x={HQ.x}
                  y={HQ.y - ring.r - 8}
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="700"
                  letterSpacing="2"
                  initial={false}
                  animate={{ opacity: inView ? 0.7 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.9 + i * 0.3 }}
                >
                  {ring.label}
                </motion.text>
              </g>
            ))}

            {!reduce &&
              [0, 1.4].map((delay) => (
                <motion.circle
                  key={delay}
                  cx={HQ.x}
                  cy={HQ.y}
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="2"
                  initial={{ r: 10, opacity: 0.7 }}
                  animate={{ r: 110, opacity: 0 }}
                  transition={{ duration: 2.8, delay, repeat: Infinity, ease: 'easeOut' }}
                />
              ))}

            <Dispatch zone={zone} progress={progress} reduce={reduce} />

            <circle cx={HQ.x} cy={HQ.y} r="15" fill="#0891B2" opacity="0.35" />
            <circle cx={HQ.x} cy={HQ.y} r="9" fill="#ffffff" stroke="#0891B2" strokeWidth="4" />
            <text x={HQ.x + 16} y={HQ.y + 5} fill="#ffffff" fontSize="13" fontWeight="800" style={{ paintOrder: 'stroke', stroke: '#07131d', strokeWidth: 4 }}>
              SwiftFlow HQ
            </text>

            {ZONES.map((z, zi) => {
              const isActive = active === z.id;
              return (
                <motion.g
                  key={z.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${z.name}, about ${z.time} minutes`}
                  onMouseEnter={() => setActive(z.id)}
                  onClick={() => setActive(z.id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(z.id)}
                  className="cursor-pointer focus-visible:outline-none"
                  initial={false}
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.8 + zi * 0.12 }}
                >
                  <circle cx={z.x} cy={z.y} r="30" fill="transparent" />
                  <circle
                    cx={z.x}
                    cy={z.y}
                    r={isActive ? 11 : 7}
                    fill={isActive ? '#22D3EE' : '#0891B2'}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    style={{ transition: 'all 0.25s ease' }}
                  />
                  <text
                    x={z.x}
                    y={z.y - 20}
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : '#CBD5E1'}
                    fontSize={isActive ? 17 : 14}
                    fontWeight="700"
                    style={{ paintOrder: 'stroke', stroke: '#07131d', strokeWidth: 5, transition: 'all 0.25s ease' }}
                  >
                    {z.name}
                  </text>
                  <text
                    x={z.x}
                    y={z.y + 28}
                    textAnchor="middle"
                    fill="#22D3EE"
                    fontSize="12"
                    fontWeight="700"
                    opacity={isActive ? 1 : 0.7}
                    style={{ paintOrder: 'stroke', stroke: '#07131d', strokeWidth: 4 }}
                  >
                    {z.time} min
                  </text>
                </motion.g>
              );
            })}
          </svg>

          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07131d] to-transparent hidden lg:block pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#07131d] to-transparent lg:hidden pointer-events-none" />
        </div>

        <div className="relative order-2 lg:order-1 flex flex-col justify-center px-6 lg:px-14 py-14 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="font-sans text-brand-light font-bold text-xs tracking-[0.2em] uppercase mb-5">Service Area</p>

            <p className="font-display font-bold text-white leading-none tabular-nums flex items-baseline">
              <span className="text-7xl lg:text-8xl">~<motion.span>{minutes}</motion.span></span>
              <span className="text-2xl lg:text-3xl ml-3 text-brand-light">min</span>
            </p>

            <div className="min-h-[44px] flex items-center overflow-hidden mt-3 mb-8">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={zone.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: reduce ? 0 : 0.25, ease: 'easeInOut' }}
                  className="font-sans font-bold text-white text-2xl sm:text-3xl"
                >
                  response to {zone.name}
                </motion.h2>
              </AnimatePresence>
            </div>

            <form onSubmit={checkZip} className="mb-3">
              <label htmlFor="zip-check" className="block text-white/70 text-sm mb-2">Check your ZIP code</label>
              <div className="flex gap-2 max-w-sm">
                <input
                  id="zip-check"
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  inputMode="numeric"
                  autoComplete="postal-code"
                  placeholder="85018"
                  className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/35 text-sm focus:outline-none focus:border-brand-light"
                />
                <button type="submit" className="btn-primary px-5 py-3">Check</button>
              </div>
            </form>
            <div className="min-h-[40px] mb-6">
              <AnimatePresence mode="wait">
                {zipResult && (
                  <motion.p
                    key={zipResult.msg}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-sm font-medium ${zipResult.ok ? 'text-emerald-300' : 'text-amber-300'}`}
                  >
                    {zipResult.msg}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <p className="text-white/55 text-sm mb-3">Hover a city on the map, or tap one below.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {ZONES.map((z) => {
                const isActive = active === z.id;
                return (
                  <button
                    key={z.id}
                    onClick={() => setActive(z.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light/70 ${
                      isActive
                        ? 'bg-brand border-brand text-white'
                        : 'border-white/20 text-white/70 hover:border-brand-light hover:text-white'
                    }`}
                  >
                    {z.name}
                    <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-brand-light'}`}>{z.time}m</span>
                  </button>
                );
              })}
            </div>

            <div className="border-l-2 border-brand pl-4 mb-6">
              <p className="font-sans font-bold text-white text-sm">SwiftFlow Plumbing HQ</p>
              <p className="text-white/55 text-xs mt-0.5">4821 E Thomas Rd, Phoenix, AZ 85018</p>
              <a href="https://maps.google.com/maps?q=4821+E+Thomas+Rd+Phoenix+AZ+85018" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-light text-xs font-semibold mt-2 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-light rounded">
                Get directions
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <p className="font-sans text-white/65 text-xs">Licensed & insured · 24/7 emergency dispatch</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
