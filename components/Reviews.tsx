import React, { useState, useEffect } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  id: number;
  name: string;
  role: string;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Nikhil Jariwala",
    role: "Textile Manufacturer",
    text: "One of the best real estate consultants in Surat. Very transparent with their deals and they have excellent property options in prime locations. Found us the perfect warehouse space."
  },
  {
    id: 2,
    name: "Chirag Patel",
    role: "Diamond Merchant",
    text: "Professional approach. Helped me find a great office space in Vesu. The team is very knowledgeable about the commercial market dynamics."
  },
  {
    id: 3,
    name: "Riya Mehta",
    role: "Architecture Studio",
    text: "Exceptional service. They guided us through the entire legal process smoothly. Highly trustworthy team for commercial investments in the city."
  },
  {
    id: 4,
    name: "Aarav Desai",
    role: "Retail Chain Owner",
    text: "I was looking for a showroom on the main road, and they showed me the best options available. Very happy with the visibility of the location they secured for us."
  },
  {
    id: 5,
    name: "Suresh Mangukiya",
    role: "Business Owner",
    text: "Good behavior and fast service. If you need commercial property in Surat, this is the place to go. They value your time and provide genuine advice."
  }
];

export const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevReview = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-advance for a lively feel
  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      id="reviews" 
      className="py-24 bg-shree-black text-shree-cream relative overflow-hidden"
    >
      {/* Subtle grid background pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-gray-800 pb-8">
           <div>
              <h2 className="font-serif text-5xl md:text-7xl text-white mb-4">Client Stories</h2>
              <p className="font-sans text-gray-400 uppercase tracking-widest text-xs md:text-sm">Voices of trust from our community</p>
           </div>
           <div className="flex gap-4">
              <button 
                onClick={prevReview} 
                className="group p-4 border border-gray-700 rounded-full hover:bg-shree-orange hover:border-shree-orange transition-all duration-300 active:scale-95"
                aria-label="Previous review"
              >
                 <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </button>
              <button 
                onClick={nextReview} 
                className="group p-4 border border-gray-700 rounded-full hover:bg-shree-orange hover:border-shree-orange transition-all duration-300 active:scale-95"
                aria-label="Next review"
              >
                 <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </button>
           </div>
        </div>

        <div className="relative min-h-[400px] md:min-h-[350px]">
          {reviews.map((review, index) => (
            <div 
              key={review.id}
              className={`absolute top-0 left-0 w-full transition-all duration-700 ease-out transform ${
                index === activeIndex 
                  ? 'opacity-100 translate-y-0 pointer-events-auto' 
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
               <div className="max-w-4xl">
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="#D97706" className="text-shree-orange" />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <Quote size={64} className="absolute -top-8 -left-4 md:-left-16 text-gray-800 opacity-50 transform -scale-x-100" />
                    <p className="font-serif text-2xl md:text-4xl md:leading-snug leading-snug mb-10 text-gray-100 relative z-10">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-shree-orange"></div>
                    <div>
                      <h4 className="font-sans font-bold text-lg uppercase tracking-wider text-white">{review.name}</h4>
                      <p className="font-serif text-gray-500 italic">{review.role}</p>
                    </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
        
        {/* Progress Indicator */}
        <div className="flex gap-2 mt-8 md:mt-0 absolute bottom-0 right-6 md:right-12">
            {reviews.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1 transition-all duration-300 rounded-full ${idx === activeIndex ? 'w-8 bg-shree-orange' : 'w-2 bg-gray-700 hover:bg-gray-600'}`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
        </div>
      </div>
    </motion.section>
  );
};