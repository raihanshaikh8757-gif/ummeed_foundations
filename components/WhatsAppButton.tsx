'use client';

import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "919876543210"; 
  const message = "Hello, I want to support UMEED RISE FOUNDATION.";
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 group flex items-center justify-center cursor-pointer"
      aria-label="Contact us on WhatsApp"
    >
      <div className="bg-[#25D366] hover:bg-[#1EBE5A] text-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform">
        <MessageCircle size={28} />
      </div>
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] font-bold px-4 py-2 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </div>
    </motion.button>
  );
}
