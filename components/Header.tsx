'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Campaigns', path: '/campaigns' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background-main/95 backdrop-blur-md shadow-md border-b border-white/5 py-3 md:py-4' : 'bg-gradient-to-b from-background-main to-transparent py-4 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-text-heading tracking-tighter flex items-center gap-2">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shrink-0">
            <Image
              src="/site-logo.jpeg"
              alt="Ummeed Foundation logo"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-bold text-xl tracking-tighter uppercase hidden sm:block">Ummeed Foundation</span>
          <span className="text-white font-bold text-xl tracking-tighter uppercase sm:hidden">Ummeed</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path}
              className={`transition-colors hover:text-accent-hover ${pathname === link.path ? 'text-white' : 'text-text-body'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Donate Button */}
        <div className="hidden md:block ml-4">
          <Link href="/donate" className="bg-accent-red hover:bg-accent-hover text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm shadow-[0_0_15px_rgba(229,9,20,0.3)] transition-all active:scale-95">
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-text-heading"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-background-section/95 backdrop-blur-xl border-t border-white/10 overflow-y-auto flex flex-col z-40"
          >
            <div className="px-6 py-10 flex flex-col gap-3 flex-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-bold uppercase tracking-[0.18em] ${pathname === link.path ? 'text-white' : 'text-text-body hover:text-white transition-colors'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 pt-6 border-t border-white/10">
                <div className="mb-5 rounded-md border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white text-center mb-3">
                    Pay Now
                  </p>
                  <div className="mx-auto w-28 h-28 overflow-hidden rounded-sm border border-white/15 bg-white p-1">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=donate-now-ummeed-foundation"
                      alt="Pay now QR code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <Link 
                  href="/donate"
                  onClick={() => setMobileMenuOpen(false)} 
                  className="bg-accent-red text-white py-4 font-bold uppercase tracking-[0.2em] text-center block w-full text-sm shadow-[0_0_15px_rgba(229,9,20,0.4)]"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
