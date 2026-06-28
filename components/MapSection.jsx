import { motion } from 'framer-motion';
import { useState } from 'react';

const LOCATIONS = [
  {
    id: 1,
    name: 'SwiftFlow Plumbing HQ',
    address: '4821 E Thomas Rd, Phoenix, AZ 85018',
    rating: '4.9',
    reviews: '214',
    hours: 'Mon-Sat 7am-7pm · 24/7 Emergency',
    mapUrl: 'https://maps.google.com/maps?q=4821+E+Thomas+Rd+Phoenix+AZ&z=15&output=embed',
  },
  {
    id: 2,
    name: 'SwiftFlow - Scottsdale',
    address: '7301 E Shoeman Ln, Scottsdale, AZ 85251',
    rating: '4.8',
    reviews: '143',
    hours: 'Mon-Sat 7am-7pm · 24/7 Emergency',
    mapUrl: 'https://maps.google.com/maps?q=7301+E+Shoeman+Ln+Scottsdale+AZ&z=15&output=embed',
  },
];

export default function MapSection() {
  const [active, setActive] = useState(LOCATIONS[0]);

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2" style={{ minHeight: '280px' }}>
        <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
          <iframe
            key={active.id}
            src={active.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0, position: 'absolute', inset: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="bg-text-dark p-8 lg:p-10 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-sans text-brand-light font-bold text-xs tracking-[0.2em] uppercase mb-3">Service Area</p>
            <h2 className="font-sans font-bold text-white text-xl sm:text-2xl mb-5">
              Serving Phoenix & Surrounding Cities
            </h2>
            <div className="flex flex-col gap-3">
              {LOCATIONS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActive(l)}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                    active.id === l.id
                      ? 'bg-brand/20 border-brand/50'
                      : 'bg-white/5 border-white/10 hover:border-brand/30'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${active.id === l.id ? 'bg-brand' : 'bg-white/10'}`}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans font-bold text-white text-sm">{l.name}</p>
                    <p className="font-sans text-white/40 text-xs mt-0.5">{l.address}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="font-sans font-bold text-white text-xs">{l.rating}</span>
                        <span className="font-sans text-white/30 text-xs">({l.reviews})</span>
                      </div>
                      <span className="font-sans text-white/30 text-[10px]">{l.hours}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 p-3 bg-brand/20 rounded-xl border border-brand/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <p className="font-sans text-white/60 text-xs">60-minute emergency response across Phoenix & Scottsdale</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}