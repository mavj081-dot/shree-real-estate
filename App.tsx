
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Marquee } from './components/Marquee';
import { Philosophy } from './components/Philosophy';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <div className="w-full min-h-screen bg-shree-cream text-shree-black selection:bg-shree-orange selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <Portfolio />
        <Marquee />
        <Philosophy />
        <Reviews />
      </main>
      
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
