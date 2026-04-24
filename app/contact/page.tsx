'use client';

import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-background-main pb-24">
      {/* Header */}
      <div className="relative pt-32 pb-20 border-b border-white/5 bg-background-section overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://t4.ftcdn.net/jpg/07/10/65/15/360_F_710651583_jIC23hTf56SeKm1CO45J3sYRleYeZa7q.jpg')] opacity-10 bg-cover bg-center grayscale brightness-50 contrast-125 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-section to-background-section/60 z-0"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tight leading-[0.95]">Contact Us</h1>
          <p className="text-base md:text-xl text-text-body max-w-2xl mx-auto border-l-2 border-accent-red pl-4 md:pl-6 text-left inline-block">
            We&apos;d love to hear from you. Get in touch regarding donations, volunteering, or general inquiries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-[1px] bg-accent-red"></div>
              <span className="text-accent-red uppercase tracking-[0.3em] text-[10px] font-bold">Reach Out</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 uppercase tracking-tight">Get In Touch</h2>
            <p className="text-text-body mb-10 leading-relaxed">
              If you have any questions about our programs, or if you want to collaborate with us to make a bigger impact, please reach out to us using the contact information below or fill out the form.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#121212] border border-white/5 flex justify-center items-center shrink-0">
                  <MapPin className="text-accent-red" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-xs">Our Location</h4>
                  <p className="text-text-body text-sm">near durga mandir, Minhaj Nagar,<br/>Phulwari Sharif, Patna, Bihar 801505</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#121212] border border-white/5 flex justify-center items-center shrink-0">
                  <Phone className="text-accent-red" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-xs">Phone Number</h4>
                  <p className="text-text-body text-sm">+91 98765 43210<br/>Mon-Fri, 9am - 6pm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#121212] border border-white/5 flex justify-center items-center shrink-0">
                  <Mail className="text-accent-red" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-xs">Email Address</h4>
                  <p className="text-text-body text-sm">info@ummeedfoundation.org<br/>support@ummeedfoundation.org</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#121212]/50 backdrop-blur-md p-8 md:p-12 border-l-4 border-accent-red shadow-2xl border-y border-r border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
              <div>
                <label className="text-[10px] font-bold text-text-body uppercase tracking-widest mb-2 block">Your Name</label>
                <input type="text" required className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-accent-red transition-colors shadow-inner" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-body uppercase tracking-widest mb-2 block">Email Address</label>
                <input type="email" required className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-accent-red transition-colors shadow-inner" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-body uppercase tracking-widest mb-2 block">Phone Number (Optional)</label>
                <input type="tel" className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-accent-red transition-colors shadow-inner" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-body uppercase tracking-widest mb-2 block">Your Message</label>
                <textarea required rows={5} className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-accent-red transition-colors resize-none shadow-inner"></textarea>
              </div>
              <button type="submit" className="w-full bg-white hover:bg-accent-red text-black hover:text-white py-4 font-bold text-xs uppercase tracking-[0.2em] transition-all">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
