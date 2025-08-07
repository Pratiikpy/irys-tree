# Irys LinkTree - Decentralized LinkTree Clone

A production-ready, decentralized LinkTree clone built with React, TypeScript, and Vite. This application showcases permanent data storage using Irys programmable datachain.

## 🚀 Features

- **Permanent Profiles**: Your LinkTree never expires or gets deleted
- **Web3 Native**: Built for the decentralized web with wallet authentication
- **Zero Monthly Fees**: Pay once with crypto, own forever
- **Censorship Proof**: No centralized platform can remove your profile
- **Verifiable Authenticity**: Cryptographic timestamps prove creation
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Custom CSS (no TailwindCSS dependencies)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **Blockchain**: Ethers.js v6 (ready for Irys integration)
- **Deployment**: Vercel & Render ready

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Pratiikpy/irys-tree.git
cd irys-tree

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment Options

### Option 1: Deploy on Vercel (Recommended)

1. **Connect to GitHub**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository: `https://github.com/Pratiikpy/irys-tree.git`

2. **Automatic Configuration**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

**Vercel Features:**
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Zero downtime deployments**
- ✅ **GitHub integration**
- ✅ **Custom domains**
- ✅ **Analytics included**

### Option 2: Deploy on Render

1. **Connect to GitHub**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select the `irys-tree` repository

2. **Configure Service**:
   - **Name**: `irys-linktree`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/`

3. **Environment Variables**:
   - `NODE_ENV`: `production`

4. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your app

## 🔧 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # Radix UI components
│   └── shared/        # Shared components
├── contexts/           # React Context providers
├── pages/             # Application pages
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── main.tsx          # Application entry point
```

## 🌟 Production Features

- ✅ **Zero Build Errors**: Clean, minimal dependencies
- ✅ **Optimized Bundle**: Code splitting and minification
- ✅ **Production Ready**: Vercel & Render optimized
- ✅ **Health Checks**: Automatic health monitoring
- ✅ **Auto Deploy**: GitHub integration for continuous deployment
- ✅ **SPA Routing**: All routes work with client-side routing

## 🔗 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `4173` |
| `NODE_ENV` | Environment | `production` |

## 🎯 Unique Advantages vs LinkTree

1. **"Forever Links"** - Your profile never expires
2. **"True Ownership"** - No platform can revoke your profile
3. **"Cryptographic Proof"** - Timestamps prove when you created content
4. **"Zero Recurring Fees"** - Pay once with crypto, own forever
5. **"Censorship Resistance"** - Decentralized hosting

## 🚀 Quick Start

1. **Clone & Install**:
   ```bash
   git clone https://github.com/Pratiikpy/irys-tree.git
   cd irys-tree
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Deploy to Vercel**:
   - Connect GitHub repository to Vercel
   - Automatic deployment on every push

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Built with ❤️ for the decentralized web** 