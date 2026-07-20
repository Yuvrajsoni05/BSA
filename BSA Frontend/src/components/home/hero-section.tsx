"use client";

export function HeroSection() {
  return (
    <section className="bg-[#f4efe4] py-16 md:py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-2 border-[#c9a24a] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full border-2 border-[#0f3d2e] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#17120e] mb-8 leading-tight animate-fade-in">
          Online Gold Jewellery In Ahmedabad
        </h1>

        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-sm md:text-base animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <a href="/" className="text-[#c9a24a] hover:underline hover:text-[#17120e] transition-colors duration-300">
            Home
          </a>
          <span className="text-[#6b6058]">/</span>
          <a href="#" className="text-[#c9a24a] hover:underline hover:text-[#17120e] transition-colors duration-300">
            About
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
