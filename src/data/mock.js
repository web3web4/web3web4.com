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
  { category: "Blockchain", icon: "Link", technologies: "EVM, Solidity, Hardhat, TON, NEAR Protocol" },
  { category: "AI/ML", icon: "Brain", technologies: "OpenAI, Google Gemini, Anthropic Claude, Ollama" },
  { category: "Backend", icon: "Server", technologies: "Node.js, TypeScript, Express, Next.js API routes" },
  { category: "Frontend", icon: "Monitor", technologies: "React, Next.js, TypeScript, ethers.js, wagmi" }
];

export const approachItems = [
  { icon: "Zap", title: "Cutting Edge", description: "Constantly exploring emerging technologies and standards" },
  { icon: "Trophy", title: "Production Ready", description: "Enterprise-grade code, documentation, and support" },  
  { icon: "Award", title: "Quality First", description: "Clean, well-documented code built with industry best practices and rigorous testing" },
  { icon: "Blocks", title: "Built for Growth", description: "Scalable architecture designed for extensibility and future feature additions" },
  { icon: "GitBranch", title: "Transparent Collaboration", description: "You get direct code repository access to monitor development progress in real-time" },
  { icon: "Brain", title: "Creative Engineering", description: "Innovative solutions overcoming limitations, like orchestrating multiple AI providers to increase accuracy" }
];

export const servicesData = [
  // Web3 Services
  { icon: "Code2", title: "Web3 Development", description: "End-to-end blockchain solutions: smart contracts, dApps, NFTs, RWA tokenization, and DAOs" },
  { icon: "Shield", title: "Smart Contract Auditing", description: "Comprehensive security audits and security-first development for your protocols" },
  { icon: "Lightbulb", title: "Technical Consulting", description: "Guidance on architecture, protocol design, tokenomics, and implementation strategy" },
  
  // AI Services - Progression: Build → Integrate → Optimize
  { icon: "Bot", title: "AI Solutions", description: "Building AI systems from the ground up with multi-provider orchestration and intelligent automation" },
  { icon: "Sparkles", title: "LLM Integration", description: "Integrate AI capabilities into your existing systems with top tier models or custom model fine-tuning" },
  { icon: "Zap", title: "Prompt Engineering", description: "Fine-tune and optimize your existing AI solutions for peak performance and accuracy" },
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
