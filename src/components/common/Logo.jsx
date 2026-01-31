import React from 'react';
import PropTypes from 'prop-types';

/**
 * Logo Component - Displays the Web3Web4 Stacked Wordmark
 * Features the "W3/W4" stacked logo with:
 * - Web3 line in cyan (#00FFD1) - representing Blockchain/Decentralization
 * - Web4 line in purple (#FF75FF) - representing AI/Intelligence
 * - Cascadia Code monospace font with enhanced boldness via text-stroke
 * - Horizontal character scaling for the "W" using transform: scaleX(1.5)
 * 
 * @param {object} props
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.animated - Enable subtle hover animations (default: true)
 */
const Logo = ({ className = '', animated = true }) => {
  return (
    <div className={`relative ${animated ? 'group' : ''} ${className}`}>
      {/* Glow effect on hover (if animated) */}
      {animated && (
        <>
          <div className="absolute inset-0 bg-[var(--web3-cyan)] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-[var(--web4-purple)] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 delay-100" />
        </>
      )}
      
      {/* Logo Container */}
      <div className="relative logo-container">
        <div className={`relative w-12 h-12 font-logo flex flex-col items-center justify-center ${
          animated ? 'transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,255,209,0.5)]' : ''
        }`}>
          <span className="web3">
            <span className="wide-w">W</span>3
          </span>
          <span className="web4">
            <span className="wide-w">W</span>4
          </span>
        </div>
      </div>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  animated: PropTypes.bool,
};

export default Logo;
