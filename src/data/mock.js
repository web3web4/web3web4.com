// Mock data for Web3Web4 landing page

export const heroData = {
  tagline: "Bridging decentralization and intelligence, one commit at a time",
  title: "Web3Web4",
  subtitle: "Building the decentralized and intelligent internet",
  description: "A software development house specializing in blockchain technologies and AI-powered applications. We build production-ready solutions at the intersection of decentralization and intelligence."
};

export const aboutData = {
  title: "About Us",
  content: "Web3Web4 is a software development house specializing in blockchain technologies and AI-powered applications. We build production-ready solutions at the intersection of decentralization and intelligence."
};

export const web3Services = [
  { icon: "Palette", title: "NFT Platforms", description: "We build NFT platforms and marketplaces" },
  { icon: "Building2", title: "RWA Tokenization", description: "We build Real World Asset tokenization platforms" },
  { icon: "Vote", title: "DAOs & Governance", description: "We build DAOs and governance systems" },
  { icon: "Coins", title: "Token Gamification", description: "We build token-based gamification systems" },
  { icon: "Wallet", title: "Custom dApps", description: "We build custom dApps and Web3 developer tooling" }
];

export const web4Services = [
  { icon: "Eye", title: "Multi-Modal Analysis", description: "We build multi-modal text & vision analysis systems" },
  { icon: "Sparkles", title: "AI Content Generation", description: "We build AI-powered content generation tools" },
  { icon: "Target", title: "Decision Support", description: "We build AI-powered decision support systems" },
  { icon: "Bot", title: "AI Agents", description: "We build AI agents for workflow automation" }
];

export const techStack = [
  { category: "Blockchain", icon: "Link", technologies: "EVM, Solidity, Hardhat, NEAR Protocol, TON" },
  { category: "AI/ML", icon: "Brain", technologies: "Ollama, OpenAI, Gemini APIs" },
  { category: "Backend", icon: "Server", technologies: "Node.js and its ecosystem" },
  { category: "Frontend", icon: "Monitor", technologies: "React, Next.js, TypeScript, ethers.js, wagmi" }
];

export const approachItems = [
  { icon: "Globe", title: "Open Source", description: "We believe in transparent, community-driven development" },
  { icon: "Zap", title: "Cutting Edge", description: "Constantly exploring emerging technologies and standards" },
  { icon: "Trophy", title: "Production Ready", description: "Enterprise-grade code, documentation, and support" }
];

export const servicesData = [
  { icon: "Zap", title: "Custom Blockchain Development", description: "End-to-end blockchain solutions tailored to your needs" },
  { icon: "Shield", title: "Smart Contract Auditing", description: "Comprehensive security audits for your smart contracts" },
  { icon: "Bot", title: "AI Integration & Automation", description: "Intelligent systems to automate your workflows" },
  { icon: "Lightbulb", title: "Technical Consulting", description: "Expert guidance on architecture and design" },
  { icon: "Coins", title: "Protocol Design & Tokenomics", description: "Strategic token economics and protocol design" }
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Tech Stack", href: "#tech" }
];

export const socialLinks = {
  website: "https://web3web4.com",
  github: "https://github.com/web3web4",
  email: process.env.REACT_APP_CONTACT_EMAIL || "hello@web3web4.com",
};
