import React from 'react'
import { Link } from 'react-router-dom'
import { Wallet, Plus, Search, Globe, Shield, Zap, ArrowRight, Sparkles, Star, Zap as Lightning } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'

const Home: React.FC = () => {
  const { wallet, connectWallet } = useWallet()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-emerald-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-teal-300 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-cyan-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="https://pbs.twimg.com/profile_images/1879776802563891200/cdpcRzVY_400x400.jpg" 
                  alt="Irys Logo" 
                  className="w-10 h-10 rounded-xl shadow-lg hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Irys Tree
                </h1>
                <p className="text-xs text-emerald-300/70 -mt-1">Decentralized LinkTree</p>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-white/80 hover:text-white transition-colors hover:scale-105">Features</a>
              <a href="#about" className="text-white/80 hover:text-white transition-colors hover:scale-105">About</a>
              <Link to="/discover" className="text-white/80 hover:text-white transition-colors hover:scale-105">Discover</Link>
            </nav>

            {/* Connect Wallet Button */}
            <div className="flex items-center space-x-4">
              {wallet.isConnected ? (
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">
                    {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                  </span>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Main Headline */}
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-sm">The Future of Decentralized Profiles</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
                Everything you are.
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  In one, simple link.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Join the future of decentralized profiles. Create permanent, censorship-resistant LinkTree profiles 
                powered by Irys programmable datachain.
              </p>
            </div>

            {/* CTA Section */}
            <div className="mb-16">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <Link
                    to="/create"
                    className="relative flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create Your Profile</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                
                <Link
                  to="/discover"
                  className="flex items-center space-x-3 px-8 py-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl text-lg hover:bg-white/20 transition-all duration-200 hover:scale-105"
                >
                  <Search className="w-5 h-5" />
                  <span>Discover Profiles</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Permanent Storage</h3>
                <p className="text-white/80 leading-relaxed">
                  Your profile never expires or gets deleted. Stored permanently on Irys datachain with cryptographic proof of authenticity.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">True Ownership</h3>
                <p className="text-white/80 leading-relaxed">
                  No centralized platform can remove your profile. You own your data completely with cryptographic verification.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lightning className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">One-Time Payment</h3>
                <p className="text-white/80 leading-relaxed">
                  Pay once with crypto, own forever. No recurring monthly fees or hidden charges. True value for your money.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 backdrop-blur-sm rounded-full border border-white/20 hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Powered by Irys Datachain</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home 