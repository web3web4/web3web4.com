import React, { useEffect, useRef, useState } from 'react';
import { techStack } from '../../data/mock';
import * as LucideIcons from 'lucide-react';

const TechStackSection = () => {
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

  // Map tech categories to their pillar colors
  const getPillarColor = (category) => {
    const colorMap = {
      'Blockchain': 'var(--web3-cyan)',
      'AI/ML': 'var(--web4-purple)',
      'Backend': '#FFFFFF',
      'Frontend': '#FFFFFF'
    };
    return colorMap[category] || '#FFFFFF';
  };

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="relative py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                #FFFFFF 0px,
                #FFFFFF 1px,
                transparent 1px,
                transparent 20px
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <span className="inline-block px-4 py-2 bg-white/5 border border-white/20 text-white text-sm font-medium mb-6">
            TECHNOLOGY
          </span>
          <h2 className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-white">
            Tech Stack
          </h2>
        </div>

        {/* Tech Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech, index) => {
            const IconComponent = LucideIcons[tech.icon] || LucideIcons.Circle;
            const pillarColor = getPillarColor(tech.category);
            
            return (
              <div
                key={tech.category}
                className={`group relative bg-[#121212] border border-white/10 hover:border-white/30 p-8 transition-all duration-500 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 flex items-center justify-center mb-6 transition-colors duration-300"
                  style={{ 
                    backgroundColor: `color-mix(in srgb, ${pillarColor} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${pillarColor} 30%, transparent)`
                  }}
                >
                  <IconComponent 
                    className="w-7 h-7 transition-colors duration-300" 
                    style={{ color: pillarColor }}
                  />
                </div>

                {/* Category */}
                <h3 
                  className="font-pixel text-lg mb-4"
                  style={{ color: pillarColor }}
                >
                  {tech.category}
                </h3>

                {/* Technologies */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {tech.technologies}
                </p>

                {/* Decorative Corner */}
                <div 
                  className="absolute top-0 right-0 w-6 h-6 border-t border-r transition-colors duration-300"
                  style={{ 
                    borderColor: `color-mix(in srgb, ${pillarColor} 0%, transparent)`
                  }}
                />
                <div 
                  className="absolute bottom-0 left-0 w-6 h-6 border-b border-l transition-colors duration-300"
                  style={{ 
                    borderColor: `color-mix(in srgb, ${pillarColor} 0%, transparent)`
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
