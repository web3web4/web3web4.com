import React, { useEffect, useState, useRef } from 'react';
import { heroData } from '../../data/mock';
import { Button } from '../ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

// Blockchain Network Animation Component
const BlockchainNetwork = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Node class for blockchain cubes
    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 8 + 6;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
        this.floatPhase = Math.random() * Math.PI * 2;
        this.floatSpeed = 0.005 + Math.random() * 0.01;
        this.floatRadius = 10 + Math.random() * 20;
        this.connections = [];
        this.alpha = 0.3 + Math.random() * 0.4;
        this.isActive = Math.random() > 0.7;
        this.activeTimer = 0;
      }

      update() {
        // Float animation
        this.floatPhase += this.floatSpeed;
        this.x = this.baseX + Math.cos(this.floatPhase) * this.floatRadius;
        this.y = this.baseY + Math.sin(this.floatPhase * 0.7) * this.floatRadius;

        // Pulse animation
        this.pulsePhase += this.pulseSpeed;

        // Random activation for "data transfer" effect
        this.activeTimer--;
        if (this.activeTimer <= 0 && Math.random() > 0.995) {
          this.isActive = true;
          this.activeTimer = 60;
        } else if (this.activeTimer <= 0) {
          this.isActive = false;
        }
      }

      draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const currentSize = this.size * pulse;
        
        // Glow effect for active nodes
        if (this.isActive) {
          ctx.shadowColor = '#00FFD1';
          ctx.shadowBlur = 20;
        }

        // Draw cube/block shape
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Main cube face
        ctx.fillStyle = this.isActive 
          ? `rgba(0, 255, 209, ${this.alpha + 0.3})` 
          : `rgba(0, 255, 209, ${this.alpha * pulse})`;
        ctx.fillRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize);

        // 3D effect - top face
        ctx.fillStyle = this.isActive 
          ? `rgba(0, 255, 209, ${(this.alpha + 0.2) * 0.7})` 
          : `rgba(0, 255, 209, ${this.alpha * 0.5 * pulse})`;
        ctx.beginPath();
        ctx.moveTo(-currentSize / 2, -currentSize / 2);
        ctx.lineTo(-currentSize / 4, -currentSize / 2 - currentSize / 3);
        ctx.lineTo(currentSize / 2 + currentSize / 4, -currentSize / 2 - currentSize / 3);
        ctx.lineTo(currentSize / 2, -currentSize / 2);
        ctx.closePath();
        ctx.fill();

        // 3D effect - right face
        ctx.fillStyle = this.isActive 
          ? `rgba(0, 255, 209, ${(this.alpha + 0.1) * 0.5})` 
          : `rgba(0, 255, 209, ${this.alpha * 0.3 * pulse})`;
        ctx.beginPath();
        ctx.moveTo(currentSize / 2, -currentSize / 2);
        ctx.lineTo(currentSize / 2 + currentSize / 4, -currentSize / 2 - currentSize / 3);
        ctx.lineTo(currentSize / 2 + currentSize / 4, currentSize / 2 - currentSize / 3);
        ctx.lineTo(currentSize / 2, currentSize / 2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
        ctx.shadowBlur = 0;
      }
    }

    // Create nodes in a grid-like pattern with some randomness
    const createNodes = () => {
      const nodes = [];
      const gridSize = 120;
      const cols = Math.ceil(width / gridSize) + 1;
      const rows = Math.ceil(height / gridSize) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Add randomness to grid positions
          const x = i * gridSize + (Math.random() - 0.5) * 60;
          const y = j * gridSize + (Math.random() - 0.5) * 60;
          
          // Skip some nodes randomly for organic feel
          if (Math.random() > 0.3) {
            nodes.push(new Node(x, y));
          }
        }
      }

      // Create connections between nearby nodes
      const maxDistance = 180;
      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i !== j) {
            const dx = node.baseX - other.baseX;
            const dy = node.baseY - other.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < maxDistance && node.connections.length < 4) {
              node.connections.push({ node: other, distance });
            }
          }
        });
      });

      return nodes;
    };

    nodesRef.current = createNodes();

    // Data packet class for animated transfers
    class DataPacket {
      constructor(startNode, endNode) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.progress = 0;
        this.speed = 0.02 + Math.random() * 0.02;
        this.alive = true;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.alive = false;
        }
      }

      draw(ctx) {
        const x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
        const y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;

        ctx.shadowColor = '#00FFD1';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#00FFD1';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let packets = [];

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      nodesRef.current.forEach(node => {
        node.connections.forEach(conn => {
          const gradient = ctx.createLinearGradient(node.x, node.y, conn.node.x, conn.node.y);
          const alpha = node.isActive || conn.node.isActive ? 0.4 : 0.15;
          gradient.addColorStop(0, `rgba(0, 255, 209, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(0, 255, 209, ${alpha * 0.5})`);
          gradient.addColorStop(1, `rgba(0, 255, 209, ${alpha})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = node.isActive || conn.node.isActive ? 1.5 : 0.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(conn.node.x, conn.node.y);
          ctx.stroke();
        });
      });

      // Update and draw nodes
      nodesRef.current.forEach(node => {
        node.update();
        node.draw(ctx);

        // Spawn data packets from active nodes
        if (node.isActive && Math.random() > 0.95 && node.connections.length > 0) {
          const targetConn = node.connections[Math.floor(Math.random() * node.connections.length)];
          packets.push(new DataPacket(node, targetConn.node));
        }
      });

      // Update and draw packets
      packets = packets.filter(p => p.alive);
      packets.forEach(packet => {
        packet.update();
        packet.draw(ctx);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodesRef.current = createNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-center">
      {/* Grid Background - Subtle */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 209, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 209, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Center Glow Effect - Subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FFD1]/[0.03] rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#00FFD1]/[0.02] rounded-full blur-[100px]" />

      {/* Blockchain Network Animation */}
      <BlockchainNetwork />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
      
      {/* Side gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-20">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-[#00FFD1]/10 border border-[#00FFD1]/30 text-[#00FFD1] text-sm font-medium mb-6 backdrop-blur-sm">
              {heroData.tagline}
            </span>
          </div>

          {/* Main Title - Pixel Art Style */}
          <h1
            className={`font-pixel text-5xl sm:text-6xl lg:text-8xl text-white mb-6 leading-tight transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="block">Web3</span>
            <span className="text-[#00FFD1] relative">
              Web4
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#00FFD1] animate-pulse" />
            </span>
          </h1>

          {/* Subtitle */}
          <h2
            className={`text-xl sm:text-2xl lg:text-3xl text-white/85 mb-6 font-medium transform transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {heroData.subtitle}
          </h2>

          {/* Description */}
          <p
            className={`text-lg text-white/60 mb-10 max-w-2xl leading-relaxed transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {heroData.description}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button
              className="bg-[#00FFD1] text-black hover:bg-[#00FFD1]/10 hover:text-[#00FFD1] px-8 py-6 rounded-none text-lg font-medium transition-all duration-400 group"
              asChild
            >
              <a href="#services" className="flex items-center gap-2">
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 text-white border-0 hover:bg-white hover:text-black px-8 py-6 rounded-none text-lg font-medium transition-all duration-400"
              asChild
            >
              <a href="#projects">View Projects</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-[#00FFD1]/50" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 border border-[#00FFD1]/20 animate-spin-slow" />
      <div className="absolute bottom-40 right-20 w-10 h-10 bg-[#00FFD1]/10" />
      <div className="absolute top-40 left-10 w-6 h-6 bg-[#00FFD1]/20 animate-pulse" />
    </section>
  );
};

export default HeroSection;
