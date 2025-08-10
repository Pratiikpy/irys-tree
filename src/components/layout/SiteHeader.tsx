import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '@/contexts/WalletContext'
import { Button } from '@/components/ui/Button'

export const SiteHeader: React.FC = () => {
  const { wallet, connectWallet } = useWallet()
  const location = useLocation()

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        location.pathname === to ? 'text-foreground' : 'text-foreground/70 hover:text-foreground'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container-section h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-primary" />
          <span className="text-lg font-semibold">irystree</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLink('/discover', 'Discover')}
          {navLink('/templates', 'Templates')}
          {navLink('/help', 'Help')}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/create">
            <Button size="lg">Create your irystree</Button>
          </Link>
          {!wallet.isConnected ? (
            <Button variant="outline" onClick={connectWallet}>Connect Wallet</Button>
          ) : (
            <div className="hidden md:flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>{wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}