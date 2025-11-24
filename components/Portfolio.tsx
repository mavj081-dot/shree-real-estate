import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';

const projects: Project[] = [
  { id: 1, title: "Canal Walk Hub", category: "Commercial Showroom", location: "Surat", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, title: "The Meridian", category: "Office Complex", location: "Vesu", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Apex Tower", category: "Mixed Use", location: "Adajan", imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Skyline Point", category: "Corporate HQ", location: "Piplod", imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80" },
];

export const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="w-full">
      {/* Scrollable Horizontal Gallery for Mobile / Grid for Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 px-4 md:px-6 mb-4">
        
        {/* Large Item */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="col-span-1 lg:col-span-7 relative group overflow-hidden h-[50vh] md:h-[70vh]"
        >
          <img 
            src={projects[0].imageUrl} 
            alt={projects[0].title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-6 text-white bg-gradient-to-t from-black/60 to-transparent w-full">
            <p className="uppercase text-xs tracking-widest mb-1">{projects[0].location}</p>
            <h3 className="font-serif text-3xl">{projects[0].title}</h3>
          </div>
        </motion.div>

        {/* Vertical Stack */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-4 h-[50vh] md:h-[70vh]">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative group overflow-hidden"
          >
             <img 
              src={projects[1].imageUrl} 
              alt={projects[1].title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent w-full">
              <h3 className="font-serif text-xl">{projects[1].title}</h3>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 relative group overflow-hidden"
          >
             <img 
              src={projects[2].imageUrl} 
              alt={projects[2].title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
             <div className="absolute bottom-0 left-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent w-full">
              <h3 className="font-serif text-xl">{projects[2].title}</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};