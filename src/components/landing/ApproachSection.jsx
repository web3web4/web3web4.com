import React, { useEffect, useRef, useState } from 'react';
import { approachItems } from '../../data/mock';
import * as LucideIcons from 'lucide-react';

const ApproachSection = () => {
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
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-white/5 border border-white/20 text-white text-sm font-medium mb-6">
            PHILOSOPHY
          </span>
          <h2 className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-white">
            Our Approach
          </h2>
        </div>

        {/* Approach Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {approachItems.map((item, index) => {
            const IconComponent = LucideIcons[item.icon] || LucideIcons.Circle;
            return (
              <div
                key={item.title}
                className={`group relative text-center p-8 transform transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Glowing Border on Hover */}
                <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 group-hover:shadow-[0_0_30px_rgba(0,255,209,0.1)] transition-all duration-500" />

                {/* Icon */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
                  <div className="absolute inset-2 bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-pixel text-xl text-white mb-4 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
