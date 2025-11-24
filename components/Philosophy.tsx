import React from 'react';
import { ValueCardProps } from '../types';
import { motion } from 'framer-motion';

const ValueCard: React.FC<ValueCardProps & { delay: number }> = ({ number, title, description, theme, delay }) => {
  const themeClasses = {
    teal: "bg-shree-slate text-shree-black", // Muted Teal/Blue
    black: "bg-shree-black text-white",     // Deep Black
    gray: "bg-[#8b8b86] text-shree-black",  // Warm Grey
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay }}
      className={`p-8 md:p-12 min-h-[400px] flex flex-col justify-between relative overflow-hidden group ${themeClasses[theme]}`}
    >
      {/* Decorative lines/patterns based on screenshots */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {theme === 'teal' && (
             <svg className="w-full h-full absolute animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.2" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.2" />
             </svg>
        )}
        {theme === 'black' && (
           <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%)', backgroundSize: '10px 10px' }}></div>
        )}
         {theme === 'gray' && (
           <div className="w-full h-full flex flex-col justify-center space-y-2">
              {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-[1px] bg-current w-full opacity-30" style={{ width: `${100 - i * 5}%`}}></div>
              ))}
           </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="font-serif text-3xl md:text-4xl mb-4">{title}</h3>
        <p className="font-sans text-lg opacity-80 leading-relaxed font-light">
          {description}
        </p>
      </div>
      
      <div className="relative z-10 font-serif text-6xl opacity-50">
        {number}
      </div>
    </motion.div>
  );
};

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 px-4 md:px-12 bg-shree-cream">
       <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[15vw] md:text-[12vw] leading-[0.8] font-serif uppercase text-shree-black opacity-90 text-center md:text-left"
          >
            HOW WE<br/>DIFFER
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 text-center md:text-right font-serif text-2xl md:text-3xl max-w-2xl ml-auto"
          >
             These principles guide every square foot we develop and every relationship we nurture.
          </motion.p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4 lg:gap-8">
          <ValueCard 
            theme="teal"
            number="01"
            title="Prime Locations"
            description="We select spots that guarantee footfall and visibility. Your business address matters, and we ensure it speaks success."
            delay={0}
          />
          <ValueCard 
            theme="black"
            number="02"
            title="Transparent Deals"
            description="No hidden clauses. Just honest, straightforward real estate transactions. We build trust before we build buildings."
            delay={0.2}
          />
          <ValueCard 
            theme="gray"
            number="03"
            title="Modern Design"
            description="Our showrooms and offices are designed for the modern economy—spacious, well-lit, and infrastructure-ready."
            delay={0.4}
          />
       </div>
    </section>
  );
};