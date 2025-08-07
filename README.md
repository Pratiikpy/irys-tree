# IrysLinkTree - Decentralized LinkTree Clone

A decentralized LinkTree clone built with React, TypeScript, and Irys programmable datachain for permanent profile storage.

## 🚀 Features

### Core Features
- **Permanent Storage**: Profiles never expire or get deleted
- **True Ownership**: No centralized platform can remove your profile
- **One-Time Payment**: Pay once with crypto, own forever
- **Wallet Authentication**: MetaMask integration for secure access
- **Decentralized**: Built on Irys programmable datachain

### LinkTree-Like Features
- **Profile Management**: Custom usernames, avatars, and bios
- **Link Management**: Unlimited custom links with drag & drop reordering
- **Theme Customization**: 50+ pre-built themes with custom CSS support
- **Analytics Dashboard**: Real-time view and click tracking
- **Social Media Integration**: Auto-detection of popular platforms
- **QR Code Generation**: Easy sharing with QR codes
- **Mobile Responsive**: Optimized for all devices

### Advanced Features
- **Link Scheduling**: Show/hide links based on dates
- **Password Protection**: Secure profiles with passwords
- **Age Restrictions**: Control access based on age
- **Custom Domains**: Support for ENS domains
- **Embed Widgets**: Embed profiles on other websites
- **vCard Download**: Export contact information

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Radix UI
- **Blockchain**: Irys Alpha Testnet
- **Wallet**: MetaMask + Ethers.js v6
- **Routing**: React Router DOM
- **State**: React Context API
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Drag & Drop**: @dnd-kit
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd irys-linktree
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_IRYS_NETWORK=testnet
VITE_APP_NAME=IrysLinkTree
VITE_APP_VERSION=1.0.0
VITE_METADATA_API_URL=/api/metadata
```

### Irys Setup
1. Install MetaMask browser extension
2. Connect your wallet to the application
3. Switch to Irys testnet (automatically handled)
4. Fund your Irys account for uploads

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── wallet/          # Wallet connection components
│   ├── profile/         # Profile management components
│   ├── editor/          # Theme and link editors
│   ├── analytics/       # Analytics dashboard components
│   ├── sharing/         # QR codes and sharing
│   ├── templates/       # Profile templates
│   └── shared/          # Common components
├── pages/               # Route components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── assets/              # Static assets
```

## 🚀 Usage

### Creating a Profile
1. Connect your MetaMask wallet
2. Click "Create Profile"
3. Fill in your profile information
4. Add your links with drag & drop
5. Customize your theme
6. Upload to Irys (one-time payment)
7. Share your permanent URL

### Viewing Profiles
- Visit `/p/{transactionId}` to view any profile
- Use `/discover` to browse public profiles
- Search by wallet address or profile name

### Analytics
- Track profile views and link clicks
- View geographic data and referrers
- Export analytics data
- Real-time dashboard updates

## 🔒 Security Features

- **Wallet Authentication**: Secure wallet-based login
- **Cryptographic Verification**: Prove profile authenticity
- **Immutable Storage**: Data cannot be modified once uploaded
- **Censorship Resistance**: No centralized control
- **Privacy First**: Analytics stored locally by default

## 🌟 Unique Advantages vs LinkTree

| Feature | LinkTree | IrysLinkTree |
|---------|----------|--------------|
| **Permanence** | Monthly subscription | One-time payment, permanent |
| **Ownership** | Platform owns your data | You own your data |
| **Censorship** | Can be removed | Cannot be removed |
| **Fees** | Monthly recurring | One-time crypto payment |
| **Verification** | None | Cryptographic proof |
| **Customization** | Limited | Unlimited with custom CSS |

## 🧪 Testing

### Testnet Testing
- Use Irys alpha testnet for development
- Test wallet connection and funding
- Verify profile uploads and retrieval
- Test querying and search functionality

### User Testing
- Profile creation flow completion
- Profile sharing and viewing
- Search and discovery features
- Mobile responsiveness
- Loading performance

## 📈 Analytics

The application includes comprehensive analytics:

- **Profile Views**: Track how many people visit your profile
- **Link Clicks**: See which links perform best
- **Geographic Data**: Understand your audience location
- **Referrer Tracking**: See where traffic comes from
- **Time-based Analytics**: View trends over time

## 🎨 Theming System

### Pre-built Themes
- **Dark**: Modern dark theme
- **Neon**: Vibrant neon colors
- **Minimal**: Clean and simple
- **Gradient**: Beautiful gradients
- **Professional**: Business-focused

### Custom Themes
- Custom background colors/gradients/images
- Custom fonts from Google Fonts
- Custom button styles and animations
- CSS injection for advanced users

## 🔗 API Integration

### Irys Integration
```typescript
// Upload profile to Irys
const uploadProfile = async (profileData, walletAddress) => {
  const tags = [
    { name: "application-id", value: "IrysLinkTree" },
    { name: "content-type", value: "application/json" },
    { name: "profile-name", value: profileData.name },
    { name: "creator", value: walletAddress }
  ];
  
  const receipt = await irysUploader.upload(JSON.stringify(profileData), { tags });
  return { transactionId: receipt.id, url: `https://gateway.irys.xyz/${receipt.id}` };
};
```

### Profile Querying
```typescript
// Search profiles using Irys Query
const searchProfiles = async (searchTerm) => {
  const myQuery = new Query({ url: "https://node2.irys.xyz/graphql" });
  
  const results = await myQuery
    .search("irys:transactions")
    .tags([
      { name: "application-id", values: ["IrysLinkTree"] },
      { name: "content-type", values: ["application/json"] }
    ])
    .sort("DESC")
    .limit(50);
    
  return results;
};
```

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Custom Domain
1. Configure your domain in Vercel
2. Update DNS settings
3. Enable HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Irys](https://irys.xyz/) for the permanent storage infrastructure
- [LinkTree](https://linktr.ee/) for inspiration
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [TailwindCSS](https://tailwindcss.com/) for styling utilities

## 📞 Support

- **Documentation**: [docs.iryslinktree.xyz](https://docs.iryslinktree.xyz)
- **Discord**: [discord.gg/iryslinktree](https://discord.gg/iryslinktree)
- **Twitter**: [@IrysLinkTree](https://twitter.com/IrysLinkTree)
- **Email**: support@iryslinktree.xyz

---

**Built with ❤️ for the decentralized web** 