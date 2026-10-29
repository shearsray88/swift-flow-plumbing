import Head from 'next/head';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import ScrollProgress from '../components/ScrollProgress';

export default function Home() {
  return (
    <>
      <Head>
        <title>SwiftFlow Plumbing | Phoenix AZ Plumber | Same-Day Service</title>
        <meta
          name="description"
          content="SwiftFlow Plumbing serves Phoenix, AZ with emergency plumbing, drain cleaning, water heater service, and pipe repair. Call or request a visit today."
        />
        <link rel="preload" as="image" href="/images/hero-1-leak.webp" />
      </Head>

      <ScrollProgress />
      <Navigation />

      <main className="lg:pl-24 pb-20 lg:pb-0">
        <Hero />
        <Services />
        <Process />
        <Stats />
        <Reviews />
        <Contact />
        <MapSection />
      </main>

      <Footer />
    </>
  );
}