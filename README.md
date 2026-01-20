# Web3Web4 Website

Official website for **Web3Web4** - a software development house specializing in blockchain and AI solutions.

🌐 **Live**: [web3web4.com](https://web3web4.com)  
ℹ️ **About Web3Web4**: See our [GitHub Profile](https://github.com/web3web4)

---

## Tech Stack

- **Framework**: React 19
- **Router**: React Router v7
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui + Radix UI
- **Hosting**: GitHub Pages
- **Build Tool**: Create React App (CRACO)

---

## Development

```bash
# Install dependencies
yarn install

# Start local dev server
yarn start

# Build for production
yarn build

# Deploy to GitHub Pages
yarn deploy
```

---

## Environment Variables

Contact form integration requires EmailJS configuration. Copy `.env.example` to `.env.local`:

```bash
REACT_APP_CONTACT_EMAIL=contact-email@web3web4.com
REACT_APP_EMAILJS_SERVICE_ID=web3web4-service-id
REACT_APP_EMAILJS_TEMPLATE_ID=web3web4-template-id
REACT_APP_EMAILJS_PUBLIC_KEY=web3web4-public-key
```

For GitHub Actions deployment, configure these as **environment variables** in Settings > Environments > github-pages.

---

## Deployment

The site auto-deploys to GitHub Pages on every push to `main` via GitHub Actions. The deployment is accessible at:
- Custom domain: [`web3web4.com`](https://web3web4.com)  
- GitHub Pages: [`web3web4.github.io/web3web4.com`](https://web3web4.github.io/web3web4.com)

---

## License

© 2026 Web3Web4. All rights reserved.