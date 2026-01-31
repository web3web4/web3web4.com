import React, { useEffect, useRef, useState } from 'react';
import { web3Services, web4Services } from '../../data/mock';
import { Card } from '../ui/card';
import * as LucideIcons from 'lucide-react';

const ServiceCard = ({ service, index, isVisible, pillarColor = 'var(--web3-cyan)' }) => {
  const IconComponent = LucideIcons[service.icon] || LucideIcons.Circle;

  return (
    <Card
      className={`group bg-[#121212] border border-white/10 hover:border-white/30 p-6 transition-all duration-500 cursor-pointer transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div 
        className="w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300"
        style={{ 
          backgroundColor: `color-mix(in srgb, ${pillarColor} 10%, transparent)`,
          border: `1px solid color-mix(in srgb, ${pillarColor} 30%, transparent)`
        }}
      >
        <IconComponent className="w-6 h-6" style={{ color: pillarColor }} />
      </div>
      <h3 className="text-white text-lg font-semibold mb-2 transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed">
        {service.description}
      </p>
    </Card>
  );
};

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-white/5 border border-white/20 text-white text-sm font-medium mb-6">
            WHAT WE BUILD
          </span>
          <h2 className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-white">
            Our Capabilities
          </h2>
        </div>

        {/* Web3 Services */}
        <div className="mb-20">
          <div
            className={`flex items-center gap-4 mb-8 transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="w-10 h-10 bg-[var(--web3-cyan)] flex items-center justify-center">
              <LucideIcons.Link className="w-5 h-5 text-black" />
            </div>
            <h3 className="font-pixel text-2xl text-[var(--web3-cyan)]">Web3</h3>
            <span className="text-white/40 text-sm">Blockchain & Decentralization</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {web3Services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isVisible={isVisible}
                pillarColor="var(--web3-cyan)"
              />
            ))}
          </div>
        </div>

        {/* Web4 Services */}
        <div>
          <div
            className={`flex items-center gap-4 mb-8 transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="w-10 h-10 bg-[var(--web4-purple)] flex items-center justify-center">
              <LucideIcons.Brain className="w-5 h-5 text-black" />
            </div>
            <h3 className="font-pixel text-2xl text-[var(--web4-purple)]">Web4</h3>
            <span className="text-white/40 text-sm">AI & Intelligent Systems</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {web4Services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isVisible={isVisible}
                pillarColor="var(--web4-purple)"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
