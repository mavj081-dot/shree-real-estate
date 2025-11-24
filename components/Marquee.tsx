import React from 'react';
import { motion } from 'framer-motion';

export const Marquee: React.FC = () => {
  return (
    <section className="py-24 md:py-32 px-6 overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="font-serif text-[12vw] leading-none tracking-tighter text-shree-black text-center whitespace-nowrap"
      >
        BUILT TOGETHER
      </motion.h2>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-3xl mx-auto text-center mt-12"
      >
        <p className="font-serif text-2xl md:text-4xl text-gray-800 leading-snug">
          At Shree Real Estate, we build lasting partnerships based on shared vision and sustainable growth. We are experts in showrooms, offices, and commercial property management.
        </p>
      </motion.div>
    </section>
  );
};