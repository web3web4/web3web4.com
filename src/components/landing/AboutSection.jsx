import React, { useEffect, useRef, useState } from 'react';
import { aboutData } from '../../data/mock';
import { Code2, Cpu } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 209, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 209, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Visual */}
          <div
            className={`relative transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="relative">
              {/* Main Box */}
              <div className="relative bg-[#121212] border border-white/10 p-12">
                <div className="flex items-center justify-center gap-8">
                  <div className="w-24 h-24 bg-[#00FFD1]/10 flex items-center justify-center border border-[#00FFD1]/30">
                    <Code2 className="w-12 h-12 text-[#00FFD1]" />
                  </div>
                  <div className="text-4xl text-white/20">+</div>
                  <div className="w-24 h-24 bg-[#00FFD1]/10 flex items-center justify-center border border-[#00FFD1]/30">
                    <Cpu className="w-12 h-12 text-[#00FFD1]" />
                  </div>
                </div>
                <p className="text-center text-[#00FFD1] font-pixel text-sm mt-8">
                  BLOCKCHAIN + AI
                </p>
              </div>

              {/* Decorative Corners */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#00FFD1]" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#00FFD1]" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#00FFD1]" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#00FFD1]" />
            </div>
          </div>

          {/* Right Side - Content */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-[#00FFD1]/10 border border-[#00FFD1]/30 text-[#00FFD1] text-sm font-medium mb-6">
              WHO WE ARE
            </span>
            <h2 className="font-pixel text-3xl sm:text-4xl text-white mb-6">
              {aboutData.title}
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              {aboutData.content}
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="font-pixel text-3xl text-[#00FFD1] mb-2">Web3</div>
                <p className="text-white/50 text-sm">Blockchain</p>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="font-pixel text-3xl text-[#00FFD1] mb-2">Web4</div>
                <p className="text-white/50 text-sm">AI Systems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
