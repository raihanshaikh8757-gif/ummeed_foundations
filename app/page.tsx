'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Users, Utensils, BookOpen, Gift } from 'lucide-react';

const SLIDES = [
  {
    image: 'https://savioursfoundation.org/wp-content/uploads/2021/01/ngo-768x576.jpg',
    title: 'Bringing Hope to Every Child',
    subtitle: 'Supporting education, food, and care.',
  },
  {
    image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202407/how-to-start-an-ngo-175922739-16x9_0.jpg',
    title: 'Together We Can Make a Difference',
    subtitle: 'Your small help can change lives.',
  },
  {
    image: 'https://media.gettyimages.com/id/641949746/photo/preparation-for-exam.jpg?s=1024x1024&w=gi&k=20&c=RQmElhVu_qZaf1b7O4tsK-4GzLprBdw_Q3pFlp1wNS8=',
    title: 'Every Child Deserves a Better Future',
    subtitle: 'Join us in creating opportunities.',
  },
  {
    image: 'https://t4.ftcdn.net/jpg/07/10/65/15/360_F_710651583_jIC23hTf56SeKm1CO45J3sYRleYeZa7q.jpg',
    title: 'Be the Reason Someone Smiles Today',
    subtitle: 'Support, Donate, Volunteer.',
  }
];

const RECENT_EVENT_IMAGES = [
  'https://lh3.googleusercontent.com/p/AF1QipMdGRTP7es8QM_hkJf1oQ8038Y-Oi1FEAd5Re63=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipMKt20Z4qoPcSMkcHCbH0McCZL5f1_VAeoZk9kt=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipN3zngrqM-PSQLluG_o_3exYVMa7b0xqYWRyJ_4=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipMdGRTP7es8QM_hkJf1oQ8038Y-Oi1FEAd5Re63=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipMdGRTP7es8QM_hkJf1oQ8038Y-Oi1FEAd5Re63=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipOhhSxTeyB7j4nMfTGI6LLYJyKsN4PGu6M0ibS5=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipMetrIvmDExW6ZmHaOhmFhziui8JHeqcA2uOTPV=s1360-w1360-h1020-rw',
  'https://lh3.googleusercontent.com/p/AF1QipMGfoYoUbgW7q_3kSNaGhSvh_uqrp8-Gmd925VG=s1360-w1360-h1020-rw',
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [donationAmount, setDonationAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = customAmount ? parseInt(customAmount) : donationAmount;
    if (!amount || amount <= 0) return;

    window.location.href = `/donate?amount=${amount}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🎬 HERO SECTION */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={SLIDES[currentSlide].image}
              alt={SLIDES[currentSlide].title}
              fill
              className="object-cover grayscale brightness-50 contrast-125"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full flex items-center pt-28 md:pt-32 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full z-10">
          <div className="w-full md:w-[70%] max-w-3xl">
            <motion.div
              key={`est-${currentSlide}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-10 h-[1px] bg-accent-red"></div>
              <span className="text-accent-red uppercase tracking-[0.3em] text-xs font-bold">Est. 2012</span>
            </motion.div>
            <motion.h1 
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight mb-6 uppercase text-left"
            >
              {SLIDES[currentSlide].title}
            </motion.h1>
            <motion.p 
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl max-w-md leading-relaxed mb-8 border-l-2 border-accent-red pl-4 md:pl-6 text-left"
            >
              {SLIDES[currentSlide].subtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="md:hidden w-full"
            >
              <Link href="/donate" className="bg-accent-red hover:bg-white hover:text-black transition-colors text-white py-4 font-bold uppercase tracking-widest text-xs w-full block text-center shadow-[0_0_15px_rgba(229,9,20,0.5)]">
                Donate Now
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute right-4 md:right-8 bottom-24 md:bottom-28 hidden md:flex flex-col items-center gap-4"
          >
            <Link 
              href="/donate" 
              className="bg-accent-red hover:bg-accent-hover text-white px-6 py-6 rounded-full shadow-[0_0_20px_rgba(229,9,20,0.5)] transform hover:scale-105 transition-all flex flex-col items-center justify-center animate-pulse-slow"
            >
              <Heart size={24} className="mb-1" />
              <span className="font-bold tracking-widest text-[10px] uppercase">GIVE</span>
            </Link>
          </motion.div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-24 md:bottom-10 inset-x-0 flex justify-center items-center gap-4 md:gap-6 z-20 px-4">
          <button onClick={handlePrevSlide} className="p-2.5 md:p-3 rounded-full bg-black/40 text-white hover:bg-accent-red transition-colors border border-white/20">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'w-8 bg-accent-red' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button onClick={handleNextSlide} className="p-2.5 md:p-3 rounded-full bg-black/40 text-white hover:bg-accent-red transition-colors border border-white/20">
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* 📊 OUR IMPACT */}
      <section className="py-16 bg-background-main border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <div className="w-10 h-[1px] bg-accent-red"></div>
              <span className="text-accent-red uppercase tracking-[0.3em] text-[10px] font-bold">In Numbers</span>
              <div className="w-10 h-[1px] bg-accent-red"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">Our Impact</h2>
          </div>

          <div className="grid grid-cols-2 md:flex md:flex-row justify-center items-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-extrabold text-white leading-none">5,000+</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-accent-red font-bold mt-2">Children Supported</p>
            </div>
            <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-extrabold text-white leading-none">250k+</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-accent-red font-bold mt-2">Meals Served</p>
            </div>
            <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>
            <div className="text-center col-span-2 md:col-span-1">
              <p className="text-3xl md:text-5xl font-extrabold text-white leading-none">120+</p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-accent-red font-bold mt-2">Campaigns Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* 💳 DONATION SECTION */}
      <section id="donate" className="py-24 bg-background-main relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 z-10 relative">
          <div className="bg-background-section border border-white/5 p-8 md:p-12 shadow-2xl relative">
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-accent-red flex items-center justify-center rotate-12 z-20">
               <span className="text-white font-bold text-xs -rotate-12">GIVE</span>
            </div>
            
            <h2 className="text-white font-bold text-2xl tracking-tight mb-2">Support a Cause</h2>
            <p className="text-xs mb-8 text-text-body">Choose an amount to donate and bring hope to someone&apos;s life.</p>
            
            <form onSubmit={handleDonationSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row md:grid md:grid-cols-4 gap-3">
                {[500, 1000, 2000].map((amount) => (
                  <button
                    type="button"
                    key={amount}
                    onClick={() => {
                      setDonationAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`w-full py-4 text-sm font-bold transition-all border ${
                      donationAmount === amount 
                        ? 'bg-accent-red text-white border-accent-red shadow-[0_4px_10px_rgba(229,9,20,0.4)]' 
                        : 'bg-transparent text-white hover:border-accent-red border-white/10'
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
                <div className="relative w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white font-bold text-sm">₹</span>
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setDonationAmount(null);
                    }}
                    className={`w-full py-4 pl-10 pr-4 text-sm font-bold bg-transparent text-white border transition-all outline-none ${
                       customAmount ? 'border-accent-red shadow-[0_4px_10px_rgba(229,9,20,0.2)]' : 'border-white/10 hover:border-accent-red focus:border-accent-red'
                    }`}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-white text-black font-bold py-4 text-xs uppercase tracking-[0.2em] hover:bg-accent-red hover:text-white transition-all"
              >
                Proceed to Payment
              </button>
              
              <div className="mt-4 flex justify-center gap-6 opacity-30 grayscale">
                 <span className="text-[10px] font-mono tracking-tighter">RAZORPAY SECURE</span>
                 <span className="text-[10px] font-mono tracking-tighter">STRIPE</span>
              </div>
              
            </form>
          </div>
        </div>
      </section>

      {/* 📊 CAMPAIGNS SECTION */}
      <section className="py-24 bg-background-section border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Ongoing Campaigns</h2>
              <p className="text-text-body">Support our current active missions.</p>
            </div>
            <Link href="/campaigns" className="text-accent-red text-xs font-bold uppercase underline underline-offset-4 hidden md:block">
              View All Campaigns
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Campaign 1 */}
            <div className="bg-background-section overflow-hidden border border-white/5 group hover:border-white/20 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <Image src={SLIDES[0].image} alt="Education" fill className="object-cover grayscale brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-accent-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Education</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Sponsor a Child&apos;s Education</h3>
                <p className="text-text-body text-xs leading-relaxed border-l-2 border-accent-red pl-3 mb-6 flex-1">Help us provide school supplies, tuition fees, and a better future for 500 children.</p>
                
                <div className="mb-1 flex justify-between text-[10px] font-bold text-white uppercase tracking-tighter">
                  <span>₹50,000</span>
                  <span className="text-accent-red">50%</span>
                </div>
                <div className="w-full bg-white/10 h-1 mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '50%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="bg-accent-red h-full shadow-[0_0_8px_rgba(229,9,20,1)]"
                  />
                </div>
                <Link href="/donate" className="w-full block text-center bg-white text-black hover:bg-accent-red hover:text-white py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all">
                  Give Now
                </Link>
              </div>
            </div>

            {/* Campaign 2 */}
            <div className="bg-background-section overflow-hidden border border-white/5 group hover:border-white/20 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <Image src={SLIDES[3].image} alt="Food" fill className="object-cover grayscale brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-accent-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Food</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Zero Hunger Initiative</h3>
                <p className="text-text-body text-xs leading-relaxed border-l-2 border-accent-red pl-3 mb-6 flex-1">Providing daily nutritious meals to homeless families and children across the city.</p>
                
                <div className="mb-1 flex justify-between text-[10px] font-bold text-white uppercase tracking-tighter">
                  <span>₹75,000</span>
                  <span className="text-accent-red">50%</span>
                </div>
                <div className="w-full bg-white/10 h-1 mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '50%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="bg-accent-red h-full shadow-[0_0_8px_rgba(229,9,20,1)]"
                  />
                </div>
                <Link href="/donate" className="w-full block text-center bg-white text-black hover:bg-accent-red hover:text-white py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all">
                  Give Now
                </Link>
              </div>
            </div>

            {/* Campaign 3 */}
            <div className="bg-background-section overflow-hidden border border-white/5 group hover:border-white/20 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <Image src={SLIDES[2].image} alt="Gifts" fill className="object-cover grayscale brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-accent-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Care</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Festival Gift Support</h3>
                <p className="text-text-body text-xs leading-relaxed border-l-2 border-accent-red pl-3 mb-6 flex-1">Bringing smiles by distributing festival boxes with clothes and sweets.</p>
                
                <div className="mb-1 flex justify-between text-[10px] font-bold text-white uppercase tracking-tighter">
                  <span>₹20,000</span>
                  <span className="text-accent-red">40%</span>
                </div>
                <div className="w-full bg-white/10 h-1 mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '40%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="bg-accent-red h-full shadow-[0_0_8px_rgba(229,9,20,1)]"
                  />
                </div>
                <Link href="/donate" className="w-full block text-center bg-white text-black hover:bg-accent-red hover:text-white py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all">
                  Give Now
                </Link>
              </div>
            </div>

            {/* Campaign 5 */}
            <div className="bg-background-section overflow-hidden border border-white/5 group hover:border-white/20 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-2xl">
              <div className="relative h-56 overflow-hidden">
                <Image src={SLIDES[0].image} alt="Clothing" fill className="object-cover grayscale brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-accent-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Relief</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Winter Blanket Drive</h3>
                <p className="text-text-body text-xs leading-relaxed border-l-2 border-accent-red pl-3 mb-6 flex-1">Distributing heavy blankets and warm clothing to people living on the streets.</p>
                
                <div className="mb-1 flex justify-between text-[10px] font-bold text-white uppercase tracking-tighter">
                  <span>₹40,000</span>
                  <span className="text-accent-red">80%</span>
                </div>
                <div className="w-full bg-white/10 h-1 mb-6">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="bg-accent-red h-full shadow-[0_0_8px_rgba(229,9,20,1)]"
                  />
                </div>
                <Link href="/donate" className="w-full block text-center bg-white text-black hover:bg-accent-red hover:text-white py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all">
                  Give Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/campaigns" className="text-accent-red text-xs font-bold uppercase underline underline-offset-4">
              View All Campaigns
            </Link>
          </div>
        </div>
      </section>

      {/* 🙋 VOLUNTEER SECTION */}
      <section className="py-24 bg-background-main border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* VOLUNTEER FORM */}
          <div className="bg-background-section/50 backdrop-blur-md border-l-4 border-accent-red p-8 shadow-2xl">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-white text-lg font-bold uppercase tracking-widest mb-2">Join our mission</p>
                <p className="text-xs text-text-body border-l border-white/20 pl-3">1,200+ volunteers active in 12 cities.</p>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for joining!"); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="NAME" required className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[10px] uppercase font-bold text-white focus:outline-none focus:border-accent-red transition-all shadow-inner" />
                <input type="tel" placeholder="PHONE" required className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[10px] uppercase font-bold text-white focus:outline-none focus:border-accent-red transition-all shadow-inner" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="email" placeholder="EMAIL" required className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[10px] uppercase font-bold text-white focus:outline-none focus:border-accent-red transition-all shadow-inner" />
                <input type="text" placeholder="CITY" required className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[10px] uppercase font-bold text-white focus:outline-none focus:border-accent-red transition-all shadow-inner" />
              </div>
              <select required className="w-full bg-[#121212] border border-white/10 px-4 py-3 text-[10px] uppercase font-bold text-white focus:outline-none focus:border-accent-red transition-all appearance-none cursor-pointer">
                <option value="">SELECT AREA OF INTEREST</option>
                <option value="education">EDUCATION SUPPORT</option>
                <option value="food">FOOD DISTRIBUTION</option>
                <option value="events">EVENT ORGANIZATION</option>
                <option value="digital">DIGITAL MARKETING</option>
              </select>
              <button type="submit" className="w-full bg-white hover:bg-accent-red text-black hover:text-white py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all mt-4">
                Apply Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 👤 OUR LEADER (BOTTOM) */}
      <section className="py-24 bg-[#0B0B0B] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-red/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
            
            {/* Image Col */}
            <div className="md:col-span-5 relative">
              <div className="aspect-[3/4] relative border border-white/5 shadow-2xl overflow-hidden max-w-sm mx-auto md:mx-0 bg-[#121212]">
                <Image 
                  src="/leader-home.jpeg" 
                  alt="Sikandar Bhai" 
                  fill 
                  className="object-cover grayscale brightness-75 contrast-125 saturate-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 md:-right-6 right-0 bg-accent-red text-white p-6 md:p-8 shadow-2xl z-20">
                <p className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-none mb-1">Sikandar Bhai</p>
                <p className="text-[10px] tracking-widest uppercase opacity-80 font-bold">Founder, Ummeed Foundation</p>
              </div>
            </div>

            {/* Text Col */}
            <div className="md:col-span-7 md:pl-12 pt-12 md:pt-0">
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-10 h-[1px] bg-accent-red"></div>
                <span className="text-accent-red uppercase tracking-[0.3em] text-[10px] font-bold">Founder&apos;s Message</span>
              </div>
              
              <div className="mb-10 relative">
                 <span className="text-8xl text-accent-red opacity-10 font-serif absolute -left-8 -top-8 select-none">&quot;</span>
                 <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight uppercase relative z-10">
                   Every child deserves a chance to dream, regardless of their circumstances.
                 </h2>
              </div>
               
              <div className="space-y-6 text-text-body text-sm md:text-base border-l-2 border-white/10 pl-6 italic">
                <p>
                  &quot;When I started Ummeed Foundation, it was with a simple conviction: no one should go to sleep hungry, and no child should be denied education because of financial struggles. What began as a small initiative to distribute food has grown into a movement of hope.&quot;
                </p>
                <p>
                  &quot;We believe that real change happens at the grassroots. By providing nourishment to the body and education to the mind, we are not just giving charity; we are investing in the future leaders, thinkers, and builders of our nation. Every festival gift, every meal, and every uniform we provide is a message to these children that they matter, and they are not alone.&quot;
                </p>
              </div>
               
              <div className="mt-12 flex items-center gap-6">
                <div className="w-16 h-[2px] bg-white/20"></div>
                <p className="text-xs uppercase tracking-widest text-white/50 font-bold">In service of humanity</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📸 RECENT EVENT SECTION */}
      <section className="py-24 bg-background-main border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-10 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-[1px] bg-accent-red"></div>
              <span className="text-accent-red uppercase tracking-[0.3em] text-[10px] font-bold">Recent Event</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight mb-4">Education Support Drive</h2>
            <p className="text-text-body text-sm md:text-base max-w-3xl border-l-2 border-white/20 pl-4">
              Our recent education outreach focused on distributing notebooks and learning essentials to children. Click any photo to open the original colored image.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RECENT_EVENT_IMAGES.map((image, index) => (
              <a
                key={`${image}-${index}`}
                href={image}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative h-56 md:h-64 overflow-hidden border border-white/10 bg-[#121212] shadow-2xl">
                  <Image
                    src={image}
                    alt={`Recent event ${index + 1}`}
                    fill
                    className="object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest font-bold text-white/85">
                    View Original
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ REVIEWS SECTION */}
      <section className="py-24 bg-[#0B0B0B] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <div className="w-10 h-[1px] bg-accent-red"></div>
              <span className="text-accent-red uppercase tracking-[0.3em] text-[10px] font-bold">Testimonials</span>
              <div className="w-10 h-[1px] bg-accent-red"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight">What People Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-[#121212] p-8 border border-white/5 shadow-2xl relative">
              <span className="text-6xl text-accent-red opacity-10 font-serif absolute top-4 left-6 mix-blend-screen">&quot;</span>
              <p className="text-text-body text-sm italic mb-6 relative z-10">&quot;Ummeed Foundation is doing incredible ground-level work. I volunteered during their food distribution and the impact was genuinely visible.&quot;</p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-bold text-xs uppercase tracking-widest">Rahul Sharma</p>
                <p className="text-accent-red text-[10px] uppercase font-bold tracking-widest">Volunteer</p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#121212] p-8 border border-white/5 shadow-2xl relative mt-0 md:mt-8">
              <span className="text-6xl text-accent-red opacity-10 font-serif absolute top-4 left-6 mix-blend-screen">&quot;</span>
              <p className="text-text-body text-sm italic mb-6 relative z-10">&quot;I have been donating to the education fund for two years. They are transparent and keep donors updated on the children's progress.&quot;</p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-bold text-xs uppercase tracking-widest">Anjali Verma</p>
                <p className="text-accent-red text-[10px] uppercase font-bold tracking-widest">Regular Donor</p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#121212] p-8 border border-white/5 shadow-2xl relative">
              <span className="text-6xl text-accent-red opacity-10 font-serif absolute top-4 left-6 mix-blend-screen">&quot;</span>
              <p className="text-text-body text-sm italic mb-6 relative z-10">&quot;Their festival gift support brings so much joy to the kids. Truly a dedicated team with a noble vision for the future.&quot;</p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-bold text-xs uppercase tracking-widest">Vikram Singh</p>
                <p className="text-accent-red text-[10px] uppercase font-bold tracking-widest">Local Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
