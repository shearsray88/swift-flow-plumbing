import Head from 'next/head';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>SwiftFlow Plumbing — Phoenix AZ Plumber | Same-Day Service</title>
        <meta name="description" content="Phoenix's trusted plumbers for leaks, clogs, water heaters, and emergencies. Same-day service, upfront pricing, AZ licensed. Call (602) 555-0147." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:," />
      </Head>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Process />
        <Reviews />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}