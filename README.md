# Cursor AI Projects

A collection of modern web applications built with Next.js, featuring multiple apps in a monorepo structure.

## 🚀 Applications

- **Main App** (`/`) - Main landing page
- **GPT App** (`/gpt`) - AI-powered application
- **Landing Page** (`/landing`) - Professional landing page
- **Linktree** (`/linktree`) - Social media link aggregator

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd cursor-ai-projects
```

2. Install dependencies
```bash
npm install
```

3. Install app dependencies
```bash
cd apps/gpt && npm install
cd ../landing && npm install
cd ../linktree && npm install
```

### Development

Run all apps in development mode:

```bash
# Main app
npm run dev

# Individual apps
npm run dev:gpt      # Port 3001
npm run dev:landing  # Port 3002
npm run dev:linktree # Port 3003
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

## 🚀 Deployment

This project is configured for GitHub Pages deployment. The build process creates static exports for all applications:

- Main app: `/`
- GPT app: `/gpt`
- Landing page: `/landing`
- Linktree: `/linktree`

### GitHub Pages Setup

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch to trigger deployment

## 📁 Project Structure

```
├── apps/
│   ├── gpt/          # AI-powered application
│   ├── landing/      # Professional landing page
│   └── linktree/     # Social media link aggregator
├── src/              # Main app source
├── .github/workflows/ # GitHub Actions
└── out/              # Build output (generated)
```

## 🔧 Configuration

Each app has its own configuration:

- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts
- `vercel.json` - Deployment configuration

## 📝 License

This project is private and proprietary.