import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Github, Folder, FolderOpen, ExternalLink } from 'lucide-react';

const ProjectLink = ({ name, url }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative block mb-3"
    >
      {/* Background container */}
      <div className={`relative flex items-center gap-3 px-4 py-3 transition-all duration-300 ${
        isHovered ? 'bg-[#00FFD1]/10 translate-x-2' : 'bg-transparent'
      }`}>
        {/* Left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#00FFD1] transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Folder icon with open/close animation */}
        <div className="relative w-6 h-6">
          <Folder 
            className={`absolute inset-0 w-6 h-6 text-[#00FFD1] transition-all duration-300 ${
              isHovered ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
            }`} 
          />
          <FolderOpen 
            className={`absolute inset-0 w-6 h-6 text-[#00FFD1] transition-all duration-300 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`} 
          />
        </div>

        {/* Project name */}
        <span className={`font-mono transition-all duration-300 ${
          isHovered ? 'text-[#00FFD1]' : 'text-[#00FFD1]/80'
        }`}>
          {name}/
        </span>

        {/* Arrow and external link */}
        <div className={`flex items-center gap-2 ml-auto transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          <span className="text-white/40 text-xs">View repo</span>
          <ExternalLink className="w-4 h-4 text-[#00FFD1]" />
        </div>
      </div>

      {/* Bottom highlight line */}
      <div className={`h-[1px] bg-gradient-to-r from-[#00FFD1] to-transparent transition-all duration-300 ${
        isHovered ? 'opacity-100 w-full' : 'opacity-0 w-0'
      }`} />
    </a>
  );
};

const ProjectsSection = () => {
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
      id="projects"
      ref={sectionRef}
      className="relative py-32 bg-black overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFD1]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FFD1]/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-[#00FFD1]/10 border border-[#00FFD1]/30 text-[#00FFD1] text-sm font-medium mb-6">
              OPEN SOURCE
            </span>
            <h2 className="font-pixel text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Projects
            </h2>
            <p className="text-lg text-white/60 leading-relaxed mb-8">
              Explore our repositories to see what we're building. We believe in transparent, 
              community-driven development. Contributions and feedback are welcome!
            </p>
            <Button
              className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] px-8 py-6 rounded-none text-lg font-medium transition-all duration-400 group"
              asChild
            >
              <a
                href="https://github.com/web3web4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <Github className="w-5 h-5" />
                View on GitHub
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Right - Visual */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <div className="relative">
              {/* Code Window Mockup */}
              <div className="bg-[#121212] border border-white/10 overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span className="ml-4 text-white/40 text-sm font-mono">~/web3web4</span>
                </div>

                {/* Code Content */}
                <div className="p-6 font-mono text-sm">
                  <ProjectLink 
                    name="tacosec-frontend" 
                    url="https://github.com/web3web4/tacosec-frontend" 
                  />
                  <div className="mt-4 text-white/40 text-sm italic">
                    More to be shared soon...
                  </div>
                  <div className="mt-6 pt-5 border-t border-white/10">
                    <span className="text-white/40">$</span>
                    <span className="text-white ml-2">git clone https://github.com/web3web4/tacosec-frontend.git</span>
                    <span className="animate-pulse text-[#00FFD1] ml-1">|</span>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#00FFD1]" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#00FFD1]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
