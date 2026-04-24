import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <Link href="/" className="text-2xl font-bold text-text-heading tracking-tighter flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 shrink-0">
                <Image
                  src="/site-logo.jpeg"
                  alt="UMEED RISE FOUNDATION logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-bold text-xl tracking-tighter uppercase">UMEED RISE FOUNDATION</span>
            </Link>
            <p className="text-text-body mb-6 text-sm leading-relaxed max-w-sm">
              Bringing hope to every child. Supporting education, food distribution, and festival gift support. Your small help can change lives.
            </p>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-[10px] uppercase font-bold tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-6 md:space-y-4">
              {['Home', 'About', 'Programs', 'Campaigns', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-text-body hover:text-accent-red transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-white text-[10px] uppercase font-bold tracking-widest mb-6">Contact Us</h4>
            <ul className="space-y-4 md:space-y-3 text-sm text-text-body">
              <li>near durga mandir, Minhaj Nagar, Phulwari Sharif, Patna, Bihar 801505</li>
              <li>info@ummeedfoundation.org</li>
              <li>+91 98765 43210</li>
            </ul>
            <div className="mt-8">
              <Link href="/donate" className="bg-white hover:bg-accent-red hover:text-white text-black px-6 py-4 md:py-3 font-bold text-xs uppercase tracking-[0.2em] transition-all block w-full md:inline-block shadow-[0_4px_10px_rgba(255,255,255,0.1)]">
                Support Our Cause
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-body">
            &copy; {new Date().getFullYear()} UMEED RISE FOUNDATION. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-text-body hover:text-white transition-colors text-xs">Privacy Policy</a>
            <a href="#" className="text-text-body hover:text-white transition-colors text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
