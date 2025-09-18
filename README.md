# Cursor AI Projects

A collection of AI-powered applications built with Next.js, TypeScript, and modern web technologies.

## 🚀 Live Demo

- **Main App**: [https://handy-o.github.io/cursor-ai/](https://handy-o.github.io/cursor-ai/)
- **GPT Project**: [https://handy-o.github.io/cursor-ai/gpt/](https://handy-o.github.io/cursor-ai/gpt/)
- **Landing Page**: [https://handy-o.github.io/cursor-ai/landing/](https://handy-o.github.io/cursor-ai/landing/)
- **Linktree**: [https://handy-o.github.io/cursor-ai/linktree/](https://handy-o.github.io/cursor-ai/linktree/)

## 📁 Project Structure

```
cursor-ai/
├── src/                    # Main app source code
├── apps/                   # Individual applications
│   ├── gpt/               # GPT-powered application
│   ├── landing/           # Modern landing page
│   └── linktree/          # Personal link collection
├── .github/workflows/     # GitHub Actions
└── build-all.js          # Build script for all apps
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/handy-o/cursor-ai.git
cd cursor-ai
```

2. Install dependencies:
```bash
npm install
```

3. Install dependencies for each app:
```bash
cd apps/gpt && npm install
cd ../landing && npm install
cd ../linktree && npm install
cd ../..
```

### Development

Run the main app:
```bash
npm run dev
```

Run individual apps:
```bash
# GPT app (port 3001)
npm run dev:gpt

# Landing app (port 3002)
npm run dev:landing

# Linktree app (port 3003)
npm run dev:linktree
```

### Building

Build all applications:
```bash
npm run build:all
```

Build individual apps:
```bash
npm run build:gpt
npm run build:landing
npm run build:linktree
```

## 📦 Applications

### 1. GPT Project
AI-powered application with advanced features and modern UI.

### 2. Landing Page
Responsive landing page with beautiful design and smooth animations.

### 3. Linktree
Personal link collection and sharing platform with customizable themes.

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The workflow:

1. Builds all applications
2. Combines them into a single output directory
3. Deploys to GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
