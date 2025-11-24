import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-24 pb-12 relative overflow-hidden">
      <div className="text-center max-w-6xl mx-auto z-10">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-xs md:text-base mb-6 md:mb-8 tracking-widest uppercase text-gray-600"
        >
          Showrooms & Offices • Surat, Gujarat
        </motion.p>
        
        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-[7rem] leading-[1.2] md:leading-[0.95] text-shree-black tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="block"
          >
            Creating <span className="italic font-light">space</span> for your
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="block"
          >
            business isn't just a
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="block"
          >
            transaction — it's the
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            className="block"
          >
             <span className="italic font-light">foundation</span> of your success.
          </motion.span>
        </h1>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-6 md:left-12 flex flex-col md:flex-row justify-between w-[calc(100%-3rem)] md:w-[calc(100%-6rem)] items-center md:items-end text-xs md:text-sm font-sans text-gray-500 uppercase tracking-wider"
      >
        <div className="hidden md:block">
          Shree Real Estate © Est. 2024
        </div>
        <div className="flex items-center gap-2 animate-bounce mb-2 md:mb-0">
          Scroll to explore <ArrowDown size={14} />
        </div>
        <div className="text-center md:text-left">
          Surat, GJ <br /> 21.19° N, 72.78° E
        </div>
      </motion.div>
    </section>
  );
};