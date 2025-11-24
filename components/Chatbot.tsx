
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Globe, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

// Image matching the description: Professional Indian woman, 20s, welcoming
const RECEPTIONIST_IMAGE = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

type Language = 'english' | 'gujarati' | 'hindi' | null;

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const [showWhatsAppLink, setShowWhatsAppLink] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showWhatsAppLink]);

  const initChat = async (selectedLang: Language) => {
    setLanguage(selectedLang);
    setIsLoading(true);
    setShowWhatsAppLink(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Custom system instruction for the persona
      const systemInstruction = `
        You are Anjali, a professional and warm receptionist at "Shree Real Estate" in Surat, Gujarat. 
        You are a female in your 20s, speaking with a Gujarati cultural touch but professional.
        
        Your Goal: politely gather lead information for commercial properties (Showrooms, Offices) in Surat.
        
        Language Rule: You MUST converse in ${selectedLang}.
        
        Formatting Rule: DO NOT use markdown. Do not use asterisks (*), bold, or italics. Use plain text only.
        
        Conversation Flow:
        1. Introduce yourself warmly as Anjali from Shree Real Estate.
        2. Ask the user ONE question at a time to understand their needs.
        3. Key details to gather: 
           - What are they looking for? (Showroom or Office)
           - Preferred location in Surat? (e.g., Adajan, Vesu, Varachha)
           - Approximate budget?
        4. Be concise. Do not write long paragraphs.
        5. After gathering 3-4 details (Location, Budget, Purpose), OR if the user asks for specific prices/floor plans:
           - Summarize the user's requirements in one sentence starting with "Summary:".
           - Then say exactly: "Please click the button below to connect with our senior team directly on WhatsApp for floor plans and more details."
           - End your response with the tag: [LEAD_COMPLETE]
        
        Tone: Helpful, polite, strictly professional but welcoming.
      `;

      // Use gemini-2.5-flash which is reliable and performant for chatbots
      const chat = ai.chats.create({
        model: "gemini-flash-latest",
        config: {
          systemInstruction: systemInstruction,
        }
      });
      
      setChatSession(chat);

      // Initial greeting from bot
      // sendMessage takes an object { message: string }
      const response = await chat.sendMessage({ message: "Hello, I am interested in real estate." });
      
      // New SDK returns text directly via .text property, not a function
      const cleanText = (response.text || "").replace(/\*/g, '');
      
      setMessages([
        { id: 1, text: cleanText, sender: 'bot', timestamp: new Date() }
      ]);
    } catch (error) {
      console.error("Error starting chat:", error);
      setMessages([
        { id: 1, text: "Namaste! Welcome to Shree Real Estate. How can I help you today?", sender: 'bot', timestamp: new Date() }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !chatSession) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: 'user', timestamp: new Date() }]);
    setIsLoading(true);

    try {
      // Updated sendMessage call
      const result = await chatSession.sendMessage({ message: userMsg });
      // Updated text extraction
      let responseText = (result.text || "").replace(/\*/g, '');

      // Check for completion tag
      if (responseText.includes('[LEAD_COMPLETE]')) {
        setShowWhatsAppLink(true);
        responseText = responseText.replace('[LEAD_COMPLETE]', '').trim();
        
        // Extract summary for WhatsApp (Simple heuristic: look for "Summary:" or just use text)
        // We try to extract the summary sentence to make the WA message clean
        const summaryMatch = responseText.match(/Summary:(.*?)(?=\.|Please|$)/i);
        const summaryText = summaryMatch ? summaryMatch[1].trim() : "Real Estate Inquiry";
        
        // Construct WhatsApp message
        // Phone: 07405139990 -> 917405139990
        const waMsg = `Hello, I chatted with Anjali on the website.\n\n*My Requirement:*\n${summaryText}\n\nPlease share more details and floor plans.`;
        setWhatsappMessage(waMsg);
      }

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: responseText, 
        sender: 'bot', 
        timestamp: new Date() 
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "I apologize, I am having trouble connecting right now. Please call us directly at +91 74051 39990.", 
        sender: 'bot', 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setLanguage(null);
    setMessages([]);
    setChatSession(null);
    setShowWhatsAppLink(false);
  };

  const openWhatsApp = () => {
     const phoneNumber = "917405139990";
     const encodedText = encodeURIComponent(whatsappMessage);
     window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-shree-orange text-white p-4 rounded-full shadow-2xl hover:bg-amber-700 transition-colors"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="bg-shree-black p-4 flex items-center gap-4 shadow-md">
              <div className="relative">
                <img 
                  src={RECEPTIONIST_IMAGE} 
                  alt="Anjali" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-shree-orange"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-shree-black"></div>
              </div>
              <div>
                <h3 className="text-white font-serif text-lg leading-none">Anjali</h3>
                <p className="text-gray-400 text-xs font-sans uppercase tracking-wider mt-1">Receptionist • Shree Real Estate</p>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-shree-cream overflow-y-auto p-4 custom-scrollbar relative">
              {!language ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-2">
                    <Globe className="text-shree-orange w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl mb-2 text-shree-black">Welcome</h4>
                    <p className="text-gray-600 text-sm px-8">Please select your preferred language to start the conversation.</p>
                  </div>
                  <div className="flex flex-col w-full px-8 gap-3">
                    <button 
                      onClick={() => initChat('english')}
                      className="w-full py-3 bg-white border border-gray-200 rounded-xl hover:border-shree-orange hover:text-shree-orange transition-all font-medium shadow-sm text-left px-6 flex justify-between items-center group"
                    >
                      English <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </button>
                    <button 
                      onClick={() => initChat('gujarati')}
                      className="w-full py-3 bg-white border border-gray-200 rounded-xl hover:border-shree-orange hover:text-shree-orange transition-all font-medium shadow-sm text-left px-6 flex justify-between items-center group"
                    >
                      ગુજરાતી <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </button>
                    <button 
                      onClick={() => initChat('hindi')}
                      className="w-full py-3 bg-white border border-gray-200 rounded-xl hover:border-shree-orange hover:text-shree-orange transition-all font-medium shadow-sm text-left px-6 flex justify-between items-center group"
                    >
                      हिंदी <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 pb-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                          msg.sender === 'user' 
                            ? 'bg-shree-black text-white rounded-br-none' 
                            : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex gap-1 items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                  
                  {/* WhatsApp CTA Button */}
                  {showWhatsAppLink && (
                     <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-center py-4"
                    >
                      <button
                        onClick={openWhatsApp}
                        className="bg-[#25D366] text-white px-6 py-3 rounded-full font-sans font-bold text-sm uppercase tracking-wide shadow-lg flex items-center gap-2 hover:bg-[#1ebd57] transition-all transform hover:scale-105 animate-pulse"
                      >
                        <MessageCircle size={20} />
                        Connect on WhatsApp
                      </button>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            {language && !showWhatsAppLink && (
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                <button 
                  type="button" 
                  onClick={resetChat}
                  className="p-3 text-gray-400 hover:text-shree-orange hover:bg-orange-50 rounded-full transition-colors"
                  title="Change Language / Restart"
                >
                  <Globe size={20} />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-100 rounded-full px-6 py-3 focus:outline-none focus:ring-1 focus:ring-shree-orange text-sm"
                />
                <button 
                  type="submit" 
                  disabled={!inputValue.trim() || isLoading}
                  className="p-3 bg-shree-orange text-white rounded-full hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <Send size={20} />
                </button>
              </form>
            )}
            
             {/* Restart Button when Lead Complete */}
             {showWhatsAppLink && (
                <div className="p-4 bg-white border-t border-gray-100 flex justify-center">
                   <button 
                    onClick={resetChat}
                    className="text-xs text-gray-500 underline hover:text-shree-orange"
                   >
                     Start a new conversation
                   </button>
                </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
