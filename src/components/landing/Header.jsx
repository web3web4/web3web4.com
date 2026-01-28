import React, { useState, useEffect } from 'react';
import { navLinks } from '../../data/mock';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md' 
          : 'bg-transparent'
      }`}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FFD1] to-transparent opacity-60" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00FFD1] blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative w-12 h-12 font-logo bg-[#00FFD1] flex flex-col items-center justify-center 
                transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,209,0.5)]">
                <span><span className="wide-w">W</span>3</span>
                <span><span className="wide-w">W</span>4</span>
              </div>
            </div>
            <span className="font-pixel text-white text-sm hidden sm:block group-hover:text-[#00FFD1] transition-colors duration-300">Web3Web4</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center bg-white/5 border border-white/10 px-2 py-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setActiveLink(link.label)}
                  onMouseLeave={() => setActiveLink('')}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                    activeLink === link.label ? 'text-[#00FFD1]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {/* Hover background effect */}
                  <span className={`absolute inset-0 bg-[#00FFD1]/10 transition-opacity duration-300 ${
                    activeLink === link.label ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  {/* Text */}
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Bottom line indicator */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#00FFD1] transition-all duration-300 ${
                    activeLink === link.label ? 'w-full' : 'w-0'
                  }`} />
                  
                  {/* Separator line */}
                  {index < navLinks.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/20" />
                  )}
                </a>
              ))}
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              className="relative overflow-hidden bg-transparent text-[#00FFD1] border border-[#00FFD1] hover:text-black px-6 py-3 rounded-none font-medium transition-all duration-400 group"
              asChild
            >
              <a href="#contact" className="relative z-10">
                {/* Button fill animation */}
                <span className="absolute inset-0 bg-[#00FFD1] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
                </span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white border border-white/20 hover:border-[#00FFD1] hover:text-[#00FFD1] transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Bottom border line */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-black/95 backdrop-blur-md border-t border-white/10">
          {/* Accent line */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00FFD1]/50 to-transparent" />
          
          <nav className="flex flex-col px-6 py-6 gap-2">
            {navLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className="relative px-4 py-3 text-white/60 hover:text-[#00FFD1] text-lg font-medium transition-all duration-300 group border-b border-white/5 last:border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 group-hover:w-1 h-6 bg-[#00FFD1] transition-all duration-300" />
                <span className="ml-2">{link.label}</span>
              </a>
            ))}
            <Button
              className="mt-4 bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] border border-[#00FFD1] px-6 py-4 rounded-none font-medium transition-all duration-400 w-full"
              asChild
            >
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </a>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
