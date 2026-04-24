import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background-main pb-24">
      {/* Header */}
      <div className="relative pt-32 pb-20 border-b border-white/5 bg-background-section overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background-section to-background-section/60 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://savioursfoundation.org/wp-content/uploads/2021/01/ngo-768x576.jpg')] opacity-10 bg-cover bg-center grayscale brightness-50 contrast-125"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold leading-[0.95] tracking-tight text-white mb-6 uppercase">About Us</h1>
          <p className="text-base md:text-xl text-text-body max-w-2xl mx-auto border-l-2 border-accent-red pl-4 md:pl-6 text-left inline-block">
            Learn more about our journey, our mission, and our vision for a better tomorrow.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-[1px] bg-accent-red"></div>
              <span className="text-accent-red uppercase tracking-[0.3em] text-[10px] font-bold">Background</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-6 uppercase tracking-tight">Our Story</h2>
            <div className="space-y-4 text-text-body leading-relaxed">
              <p>
                Founded by Sikandar Bhai, UMEED RISE FOUNDATION started with a simple thought: no child should be deprived of basic needs like food and education due to financial constraints.
              </p>
              <p>
                What began as a small initiative in a local neighborhood, distributing meals on weekends, has now grown into a large movement supporting over 5,000 children across multiple cities. We strongly believe that every child has immense potential, and with the right support, they can achieve wonders.
              </p>
              <p>
                Over the years, our dedicated volunteers and generous donors have been the backbone of this foundation, helping us serve million of meals and support countless educational journeys.
              </p>
            </div>
          </div>
          <div className="relative h-72 md:h-96 overflow-hidden border border-white/5 shadow-2xl">
            <Image 
              src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202407/how-to-start-an-ngo-175922739-16x9_0.jpg" 
              alt="Our Story" 
              fill 
              className="object-cover grayscale brightness-50 contrast-125"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24 border-t border-white/5 pt-24">
          <div className="bg-[#121212]/50 backdrop-blur-md p-6 md:p-10 border-l-4 border-accent-red shadow-2xl border-y border-r border-white/5">
            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Our Mission</h3>
            <p className="text-text-body leading-relaxed mb-6 relative z-10">
              To drastically reduce child hunger and improve access to quality education. We aim to empower underprivileged communities by providing essential resources, from daily meals to school supplies, ensuring that basic survival needs do not become a barrier to growth.
            </p>
            <ul className="space-y-2 text-sm text-gray-400 relative z-10">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span> Distribute meals daily</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span> Fund school tuitions</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span> Organize community welfare events</li>
            </ul>
          </div>

          <div className="bg-[#121212]/50 backdrop-blur-md p-6 md:p-10 border-l-4 border-white shadow-2xl border-y border-r border-white/5">
            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">Our Vision</h3>
            <p className="text-text-body leading-relaxed mb-6 relative z-10">
              We envision a world where every single child, regardless of their background, has the opportunity to dream big, live healthily, and contribute positively to society. We see a future without hunger and with universal access to education.
            </p>
            <ul className="space-y-2 text-sm text-gray-400 relative z-10">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white"></span> Zero Hunger Society</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white"></span> 100% Literacy Rate amongst children</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-white"></span> Equal opportunities for all</li>
            </ul>
          </div>
        </div>

        {/* 👥 OUR LEADERSHIP SECTION */}
        <div className="mt-24 border-t border-white/5 pt-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <div className="w-10 h-[1px] bg-accent-red"></div>
              <span className="text-accent-red uppercase tracking-[0.3em] text-[10px] font-bold">The Team</span>
              <div className="w-10 h-[1px] bg-accent-red"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 uppercase tracking-tight">Our Leadership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sikandar Bhai",
                role: "Founder",
                description: "Visionary leader dedicated to uplifting underprivileged children through education and care.",
                image: "/leader-home.jpeg"
              },
              {
                name: "Ayaan Khan",
                role: "Co-Founder",
                description: "Focuses on expanding outreach programs and building strong community connections.",
                image: "https://picsum.photos/seed/ayaankhan/400/500?grayscale"
              },
              {
                name: "Sara Ali",
                role: "Program Director",
                description: "Manages education and food distribution initiatives efficiently.",
                image: "https://picsum.photos/seed/saraali/400/500?grayscale"
              },
              {
                name: "Rahim Sheikh",
                role: "Operations Head",
                description: "Ensures smooth execution of campaigns and volunteer coordination.",
                image: "https://picsum.photos/seed/rahimsheikh/400/500?grayscale"
              }
            ].map((leader, index) => (
              <div 
                key={index} 
                className="bg-[#121212] border border-white/5 p-8 group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_25px_rgba(229,9,20,0.15)] hover:border-accent-red/40 shadow-2xl relative overflow-hidden flex flex-col items-center text-center"
              >
                {/* Decorative Background Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-red/5 blur-[30px] rounded-full group-hover:bg-accent-red/10 transition-colors pointer-events-none"></div>

                <div className="w-36 h-36 rounded-full overflow-hidden border border-white/10 group-hover:border-accent-red/50 transition-colors duration-300 mb-6 relative grayscale brightness-75 contrast-125">
                  <Image src={leader.image} alt={leader.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                
                <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">{leader.name}</h3>
                <p className="text-accent-red text-[10px] font-bold uppercase tracking-widest mb-5">{leader.role}</p>
                <div className="w-8 h-[1px] bg-white/10 mb-5 group-hover:bg-accent-red/50 transition-colors"></div>
                <p className="text-text-body text-xs leading-relaxed">{leader.description}</p>
                
                {/* Decorative corner accent (Editorial Style) */}
                <div className="absolute top-0 left-0 w-8 h-8 flex justify-start items-start opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-full h-[2px] bg-accent-red"></div>
                   <div className="h-full w-[2px] bg-accent-red absolute left-0 top-0"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
