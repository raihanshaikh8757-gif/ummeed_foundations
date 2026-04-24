'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function CampaignsPage() {
  const campaigns = [
    {
      title: "Sponsor a Child's Education",
      description: "Help us provide school supplies, tuition fees, and a better future for 500 children.",
      image: "https://savioursfoundation.org/wp-content/uploads/2021/01/ngo-768x576.jpg",
      category: "Education",
      raised: 50000,
      goal: 100000
    },
    {
      title: "Zero Hunger Initiative",
      description: "Providing daily nutritious meals to homeless families and children across the city.",
      image: "https://t4.ftcdn.net/jpg/07/10/65/15/360_F_710651583_jIC23hTf56SeKm1CO45J3sYRleYeZa7q.jpg",
      category: "Food",
      raised: 75000,
      goal: 150000
    },
    {
      title: "Festival Gift Support",
      description: "Bringing smiles by distributing festival boxes with clothes and sweets.",
      image: "https://media.gettyimages.com/id/641949746/photo/preparation-for-exam.jpg?s=1024x1024&w=gi&k=20&c=RQmElhVu_qZaf1b7O4tsK-4GzLprBdw_Q3pFlp1wNS8=",
      category: "Care",
      raised: 20000,
      goal: 50000
    },
    {
      title: "Winter Relief Camp",
      description: "Distributing warm blankets and winter wear to those sleeping on the streets.",
      image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202407/how-to-start-an-ngo-175922739-16x9_0.jpg",
      category: "Support",
      raised: 80000,
      goal: 100000
    }
  ];

  return (
    <div className="bg-background-main pb-24">
      {/* Header */}
      <div className="relative pt-32 pb-20 border-b border-white/5 bg-background-section overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://t4.ftcdn.net/jpg/07/10/65/15/360_F_710651583_jIC23hTf56SeKm1CO45J3sYRleYeZa7q.jpg')] opacity-10 bg-cover bg-center grayscale brightness-50 contrast-125 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-section to-background-section/60 z-0"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 uppercase tracking-tight leading-[0.95]">Active Campaigns</h1>
          <p className="text-base md:text-xl text-text-body max-w-2xl mx-auto border-l-2 border-accent-red pl-4 md:pl-6 text-left inline-block">
            Your contributions directly fund these targeted initiatives.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((camp, index) => {
            const percentage = Math.min(100, Math.round((camp.raised / camp.goal) * 100));
            return (
              <div key={index} className="bg-[#121212] overflow-hidden border border-white/5 group hover:border-white/20 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-2xl">
                <div className="relative h-56 overflow-hidden">
                  <Image src={camp.image} alt={camp.category} fill className="object-cover grayscale brightness-50 contrast-125 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-section to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-accent-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">{camp.category}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{camp.title}</h3>
                  <p className="text-text-body text-xs mb-6 flex-1 pr-4 border-l-2 border-accent-red pl-3 leading-relaxed">{camp.description}</p>
                  
                  <div className="mb-1 flex justify-between text-[10px] font-bold text-white uppercase tracking-tighter">
                    <span>₹{camp.raised.toLocaleString()}</span>
                    <span className="text-accent-red">{percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 mb-6">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.2 }}
                      className="bg-accent-red h-full shadow-[0_0_8px_rgba(229,9,20,1)]"
                    />
                  </div>
                  <Link href="/donate" className="w-full block text-center bg-white hover:bg-accent-red text-black hover:text-white py-3 font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300">
                    Fund this campaign
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
