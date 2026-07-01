import { useState } from 'react';
import { motion } from 'framer-motion';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdarwbrv';

const SERVICES = [
  'Emergency Repair', 'Drain Cleaning', 'Water Heater',
  'Pipe Repair', 'Fixture Install', 'Inspection', 'Other'
];

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [selected, setSelected] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.target;
    const data = new FormData(form);
    data.append('service', selected);
    data.append('_website', 'SwiftFlow Plumbing');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        setSelected('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Book a Plumber</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-dark leading-tight mb-6">
              Get a free quote today.
            </h2>
            <p className="text-text-mid leading-relaxed mb-10">
              Fill out the form and we will call you back within 30 minutes during business hours. For emergencies, call us directly.
            </p>

            <div className="flex flex-col gap-5 mb-10">
              <a href="tel:+16025550147" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-bold text-text-dark">(602) 555-0147</p>
                  <p className="text-text-muted text-xs">24/7 emergency line</p>
                </div>
              </a>

              <a href="mailto:info@swiftflowplumbing.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M4 4h16v16H4z"/><path d="M4 6l8 7 8-7"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-bold text-text-dark">info@swiftflowplumbing.com</p>
                  <p className="text-text-muted text-xs">Reply within one business day</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-bold text-text-dark">Phoenix & Surrounding Areas</p>
                  <p className="text-text-muted text-xs">Scottsdale, Tempe, Mesa, Chandler & more</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <p className="font-sans font-bold text-red-700 text-sm">Plumbing Emergency?</p>
                <p className="text-red-500 text-xs mt-0.5">Call (602) 555-0147 — we answer 24/7</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-warm border border-gray-mid rounded-2xl p-8"
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 bg-brand rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-text-dark mb-2">Request Received!</h3>
                <p className="text-text-muted text-sm">We will call you back within 30 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-text-muted uppercase tracking-wide mb-2 block">First Name</label>
                    <input required name="first_name" placeholder="John"
                      className="w-full bg-white border border-gray-mid rounded-xl px-4 py-3 text-sm text-text-dark placeholder-text-muted focus:outline-none focus:border-brand"/>
                  </div>
                  <div>
                    <label className="text-xs text-text-muted uppercase tracking-wide mb-2 block">Last Name</label>
                    <input required name="last_name" placeholder="Smith"
                      className="w-full bg-white border border-gray-mid rounded-xl px-4 py-3 text-sm text-text-dark placeholder-text-muted focus:outline-none focus:border-brand"/>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase tracking-wide mb-2 block">Phone Number</label>
                  <input required name="phone" type="tel" placeholder="(602) 000-0000"
                    className="w-full bg-white border border-gray-mid rounded-xl px-4 py-3 text-sm text-text-dark placeholder-text-muted focus:outline-none focus:border-brand"/>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase tracking-wide mb-2 block">Service Needed</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelected(s)}
                        className={`text-xs font-sans px-3 py-2 rounded-lg border transition-all ${
                          selected === s
                            ? 'bg-brand border-brand text-white'
                            : 'bg-white border-gray-mid text-text-mid hover:border-brand/50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase tracking-wide mb-2 block">Describe the Issue</label>
                  <textarea rows={3} name="message" placeholder="What is happening and where..."
                    className="w-full bg-white border border-gray-mid rounded-xl px-4 py-3 text-sm text-text-dark placeholder-text-muted focus:outline-none focus:border-brand resize-none"/>
                </div>
                {status === 'error' && (
                  <p className="text-red-500 text-xs text-center">Something went wrong. Please try again or call us directly.</p>
                )}
                <button type="submit" disabled={status === 'loading'}
                  className="btn-primary w-full justify-center py-4 mt-1">
                  {status === 'loading' ? 'Sending...' : 'Request Free Quote'}
                </button>
                <p className="text-xs text-text-muted text-center">We call back within 30 minutes during business hours.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}