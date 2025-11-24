import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-shree-cream/90 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" onClick={() => scrollToSection('hero')} className="cursor-pointer">
          <Logo />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-12 items-center">
          {['Expertise', 'Portfolio', 'Philosophy', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-shree-black font-sans text-sm font-medium hover:opacity-60 transition-opacity uppercase tracking-wide"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Nav Button */}
        <button className="md:hidden z-50 relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 w-full bg-shree-cream flex flex-col items-center justify-start pt-20 gap-8 md:hidden overflow-hidden border-t border-gray-200 shadow-xl"
          >
             {['Expertise', 'Portfolio', 'Philosophy', 'Contact'].map((item, i) => (
              <motion.button 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-shree-black font-serif text-3xl font-medium hover:opacity-60 transition-opacity"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};