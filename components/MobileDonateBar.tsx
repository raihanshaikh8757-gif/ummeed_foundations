'use client';
import Link from 'next/link';

export default function MobileDonateBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-background-section border-t border-white/10 px-3 py-1.5 shadow-[0_-6px_14px_rgba(0,0,0,0.55)]">
      <Link 
        href="/donate"
        className="block w-full text-center bg-accent-red hover:bg-white hover:text-black text-white py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-all"
      >
        Donate Now
      </Link>
    </div>
  );
}
