import React from 'react';
import { navLinks, socialLinks } from '../../data/mock';
import { Github, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-[#00FFD1] flex flex-col items-center justify-center 
                transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,209,0.5)]"
                style={{
                  letterSpacing: '0.25em',
                  paddingLeft: '0.25em',
                }}>
                <span className="font-pixel text-black text-xl font-bold leading-tight"
                style={{
                  lineHeight: '1em',
                }}>W3</span>
                <span className="font-pixel text-black text-xl font-bold leading-tight"
                style={{
                  lineHeight: '1em',
                }}>W4</span>
              </div>
              <span className="font-pixel text-white text-sm">Web3Web4</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Building the decentralized and intelligent internet. 
              Production-ready solutions at the intersection of blockchain and AI.
            </p>
            <p className="text-[#00FFD1] text-sm font-pixel">
              Bridging decentralization and intelligence
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-pixel text-white text-sm mb-6">NAVIGATION</h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/50 hover:text-[#00FFD1] text-sm transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-[#00FFD1]/50 group-hover:bg-[#00FFD1] transition-colors" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-pixel text-white text-sm mb-6">CONNECT</h4>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-3 bg-[#00FFD1]/10 border border-[#00FFD1]/30 text-[#00FFD1] hover:bg-[#00FFD1] hover:text-black transition-all duration-300 group"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm font-medium">https://github.com/web3web4</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Web3Web4. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00FFD1] animate-pulse" />
            <span className="text-white/30 text-sm">Building the future</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
