import Image from 'next/image';
import Link from 'next/link';

export default function ProgramsPage() {
  const programs = [
    {
      title: "Child Education",
      description: "Education is the most powerful weapon which you can use to change the world. We sponsor tuition fees, distribute books, stationery, and uniforms to children in slums to ensure they do not drop out of school.",
      image: "https://media.gettyimages.com/id/641949746/photo/preparation-for-exam.jpg?s=1024x1024&w=gi&k=20&c=RQmElhVu_qZaf1b7O4tsK-4GzLprBdw_Q3pFlp1wNS8=",
      stats: ["1000+ Students Sponsored", "50+ Schools Supported"]
    },
    {
      title: "Food Distribution",
      description: "Our core initiative focuses on fighting malnutrition and hunger. We operate daily food drives to distribute freshly cooked, nutritious meals to homeless families and children living on the streets.",
      image: "https://t4.ftcdn.net/jpg/07/10/65/15/360_F_710651583_jIC23hTf56SeKm1CO45J3sYRleYeZa7q.jpg",
      stats: ["250k+ Meals Served", "Daily Food Drives"]
    },
    {
      title: "Festival Gift Support",
      description: "Festivals are a time of joy, but many underprivileged families cannot afford to celebrate. We distribute new clothes, sweets, and essential items during major festivals to spread happiness and bring smiles to the community.",
      image: "https://savioursfoundation.org/wp-content/uploads/2021/01/ngo-768x576.jpg",
      stats: ["10,000+ Gift Boxes", "Spreading Smiles Annually"]
    }
  ];

  return (
    <div className="bg-background-main pb-24">
      {/* Header */}
      <div className="relative pt-32 pb-20 border-b border-white/5 bg-background-section overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://media.gettyimages.com/id/641949746/photo/preparation-for-exam.jpg?s=1024x1024&w=gi&k=20&c=RQmElhVu_qZaf1b7O4tsK-4GzLprBdw_Q3pFlp1wNS8=')] opacity-10 bg-cover bg-center grayscale brightness-50 contrast-125 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-section to-background-section/60 z-0"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight uppercase leading-[0.95]">Our Programs</h1>
          <p className="text-base md:text-xl text-text-body max-w-2xl mx-auto border-l-2 border-accent-red pl-4 md:pl-6 text-left inline-block">
            Discover the core initiatives we run to support and uplift communities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24 space-y-16 md:space-y-24">
        {programs.map((program, index) => (
          <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            {/* If even index, text left, image right. If odd, reverse conditionally using flex. We'll use order classes for responsiveness */}
            <div className={`order-2 ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-1'}`}>
              <h2 className="text-3xl font-extrabold text-white mb-4 uppercase tracking-tight">{program.title}</h2>
              <div className="h-1 w-16 bg-accent-red mb-6"></div>
              <p className="text-text-body leading-relaxed mb-8 text-base md:text-lg">
                {program.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {program.stats.map((stat, i) => (
                  <div key={i} className="bg-[#121212] border-l-2 border-accent-red px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-white">
                    {stat}
                  </div>
                ))}
              </div>
              <Link href="/donate" className="bg-white hover:bg-accent-red hover:text-white text-black px-8 py-3 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors shadow-lg inline-block">
                Support This Program
              </Link>
            </div>

            <div className={`order-1 relative h-80 md:h-[400px] border border-white/5 shadow-2xl ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-2'}`}>
              <Image 
                src={program.image} 
                alt={program.title} 
                fill 
                className="object-cover grayscale brightness-50 contrast-125 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
