import React, { useState } from 'react';
import { Logo } from './Logo';
import { ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = formData;
    
    // Format the message for WhatsApp
    const whatsappText = `*New Inquiry from Website*\n\n*Name:* ${name}\n*Message:* ${message}`;
    const encodedText = encodeURIComponent(whatsappText);
    
    // Phone: 07405139990. Rule: Add 91, remove 0. -> 917405139990
    const phoneNumber = "917405139990"; 
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer id="contact" className="bg-shree-cream pt-20 border-t border-gray-300 flex flex-col justify-between">
      <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 pb-20">
        
        {/* Left Column: Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-between h-full"
        >
          <div>
            <div className="mb-12">
               <Logo className="scale-125 origin-left mb-6" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="font-serif text-xl mb-4">Offices</h4>
                <address className="not-italic font-sans text-gray-600 leading-relaxed">
                  <strong>Surat HQ</strong><br/>
                  Millionaire Business Park, TGB<br/>
                  Adajan Gam, Adajan<br/>
                  Surat, Gujarat 395009
                </address>
                <a 
                  href="https://www.google.com/maps/place/Shree+Real+Estate(Showrooms+%26+Offices)/@21.1938904,72.7869709,17z/data=!4m17!1m10!3m9!1s0x3be04d880bd85d1b:0x27da65c9b7a6248!2sShree+Real+Estate(Showrooms+%26+Offices)!8m2!3d21.1938904!4d72.7869709!10e5!14m1!1BCgIYEw!16s%2Fg%2F11f9yxv1hr!3m5!1s0x3be04d880bd85d1b:0x27da65c9b7a6248!8m2!3d21.1938904!4d72.7869709!16s%2Fg%2F11f9yxv1hr?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-shree-orange hover:text-shree-brown transition-colors uppercase text-xs tracking-widest font-bold"
                >
                  <MapPin size={14} /> Open in Maps
                </a>
              </div>

              <div>
                <h4 className="font-serif text-xl mb-4">Contact</h4>
                <div className="flex flex-col gap-2 font-sans text-gray-600">
                  <a href="tel:+917405139990" className="hover:text-shree-black flex items-center gap-2"><Phone size={14}/> +91 74051 39990</a>
                  <a href="mailto:info@shreerealestate.com" className="hover:text-shree-black flex items-center gap-2"><Mail size={14}/> info@shreerealestate.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-0">
             <div className="w-full h-[200px] bg-gray-200 rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.096710589765!2d72.7915463!3d21.193304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d80f1e4c72b%3A0x4d6276d36813043!2sAdajan%2C%20Surat%2C%20Gujarat!5e0!3m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                ></iframe>
             </div>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-[#f9f9f7] p-8 md:p-12 border border-gray-200"
        >
          <h3 className="font-serif text-3xl mb-8">Start a Conversation</h3>
          <form className="space-y-8" onSubmit={handleWhatsappSubmit}>
            <div className="border-b border-gray-300 pb-2">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name" 
                required
                className="w-full bg-transparent outline-none font-serif text-xl placeholder-gray-300" 
              />
            </div>
            
             <div className="border-b border-gray-300 pb-2">
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?" 
                required
                rows={3}
                className="w-full bg-transparent outline-none font-serif text-xl placeholder-gray-300 resize-none" 
              />
            </div>
            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-shree-black text-white px-8 py-3 rounded-full font-sans text-sm uppercase tracking-wider hover:bg-shree-orange transition-colors flex items-center gap-2">
                Send via WhatsApp <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Big Bottom Text - Designed to match Logo */}
      <div className="border-t border-shree-black overflow-hidden bg-shree-black py-16 md:py-24">
         <div className="w-full flex flex-col items-center justify-center text-center select-none cursor-default">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[25vw] md:text-[22vw] leading-[1] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-800 tracking-tight"
            >
              SHREE
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-shree-cream text-[6vw] md:text-[3.5vw] font-sans font-bold uppercase tracking-[0.6em] md:tracking-[1.2em] mt-4 md:mt-8 pl-[0.6em] md:pl-[1.2em]"
            >
              REAL ESTATE
            </motion.div>
         </div>
      </div>
    </footer>
  );
};