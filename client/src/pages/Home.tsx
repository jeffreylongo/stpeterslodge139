import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Announcements from '@/components/Announcements';
import Calendar from '@/components/Calendar';
import About from '@/components/About';
import BecomingMason from '@/components/BecomingMason';
import Officers from '@/components/Officers';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>St. Petersburg Lodge No. 139 - Free & Accepted Masons</title>
        <meta name="description" content="St. Petersburg Lodge No. 139 is a Masonic Lodge in St. Petersburg, Florida. Founded in 1894, our lodge has served the community for over 125 years." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Announcements />
          <Calendar />
          <About />
          <BecomingMason />
          <Officers />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
