import React from 'react'
import { Link } from 'react-router-dom'
import { Wallet, Plus, Search, Globe, Shield, ArrowRight } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'

const Home: React.FC = () => {
  const { wallet, connectWallet } = useWallet()

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="container-section py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-foreground/70">
            irystree — your professional link-in-bio
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            Your world, beautifully organized in one link
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Create a clean, modern link-in-bio you truly own. Minimal design, powerful features, and permanent storage powered by Irys.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link to="/create" className="btn btn-primary h-12 px-6 text-base">
              <Plus className="h-4 w-4 mr-2" /> Create your irystree
            </Link>
            <Link to="/templates" className="btn btn-ghost h-12 px-6 text-base">
              Explore templates
            </Link>
            {!wallet.isConnected ? (
              <button onClick={connectWallet} className="btn h-12 px-6 text-base border">
                <Wallet className="h-4 w-4 mr-2" /> Connect wallet
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-section pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="h-10 w-10 rounded-lg bg-primary/15 text-foreground flex items-center justify-center mb-4">
              <Globe className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Permanent by design</h3>
            <p className="mt-2 text-sm text-foreground/70">
              Your profile is stored on Irys. Own it forever, no subscriptions, no takedowns.
            </p>
          </div>
          <div className="card p-6">
            <div className="h-10 w-10 rounded-lg bg-primary/15 text-foreground flex items-center justify-center mb-4">
              <Shield className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">You own your data</h3>
            <p className="mt-2 text-sm text-foreground/70">
              Wallet-first authentication and cryptographic verification ensure true ownership.
            </p>
          </div>
          <div className="card p-6">
            <div className="h-10 w-10 rounded-lg bg-primary/15 text-foreground flex items-center justify-center mb-4">
              <Search className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="text-lg font-semibold">Fast and simple</h3>
            <p className="mt-2 text-sm text-foreground/70">
              Build your page in minutes. Clean defaults with professional polish.
            </p>
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="container-section pb-24">
        <div className="card p-6 md:p-10 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold">Look professional everywhere you share</h2>
            <p className="mt-2 text-foreground/70">
              Share one short link that routes people to your best content. Perfect for social bios, email signatures, and QR codes.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link to="/create" className="btn btn-primary h-11 px-6">
                Get started <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <Link to="/discover" className="btn h-11 px-6 border">
                See live profiles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home