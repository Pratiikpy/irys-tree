import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Settings as SettingsIcon, User, Shield, Globe, Download } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'
import { useIrys } from '@/contexts/IrysContext'

const Settings: React.FC = () => {
  const { wallet, disconnectWallet } = useWallet()
  const { irys, fundAccount } = useIrys()
  
  const [fundAmount, setFundAmount] = useState('')
  const [isFunding, setIsFunding] = useState(false)

  const handleFundAccount = async () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setIsFunding(true)
    try {
      await fundAccount(fundAmount)
      alert('Account funded successfully!')
      setFundAmount('')
    } catch (error) {
      console.error('Error funding account:', error)
      alert('Error funding account. Please try again.')
    } finally {
      setIsFunding(false)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container-section h-16 flex items-center gap-3">
          <Link to="/" className="text-sm text-foreground/70 hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <h1 className="text-lg font-semibold">Settings</h1>
        </div>
      </header>

      <main className="container-section py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Account */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><User className="h-4 w-4" /> Account</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <div className="font-medium">Wallet address</div>
                  <div className="text-sm text-foreground/60 font-mono">{wallet.address || 'Not connected'}</div>
                </div>
                <div className={`flex items-center gap-2 px-2 py-1 rounded text-xs font-medium ${wallet.isConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  <div className={`h-2 w-2 rounded-full ${wallet.isConnected ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {wallet.isConnected ? 'Connected' : 'Disconnected'}
                </div>
              </div>
              {wallet.isConnected && (
                <div className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <div className="font-medium">ETH balance</div>
                    <div className="text-sm text-foreground/60">{wallet.balance || '0'} ETH</div>
                  </div>
                </div>
              )}
              <button onClick={disconnectWallet} className="btn bg-destructive text-destructive-foreground w-full md:w-auto">Disconnect wallet</button>
            </div>
          </div>

          {/* Irys */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Globe className="h-4 w-4" /> Irys storage (testnet)</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <div className="font-medium">Irys balance</div>
                  <div className="text-sm text-foreground/60">{irys.balance || '0'} IRYS</div>
                </div>
                <div className={`flex items-center gap-2 px-2 py-1 rounded text-xs font-medium ${irys.isConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  <div className={`h-2 w-2 rounded-full ${irys.isConnected ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  {irys.isConnected ? 'Connected' : 'Disconnected'}
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border p-4">
                <input type="number" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} placeholder="Amount in IRYS" className="h-11 flex-1 rounded-xl border px-3" />
                <button onClick={handleFundAccount} disabled={isFunding || !fundAmount} className="btn btn-primary">
                  {isFunding ? 'Funding…' : 'Fund account'}
                </button>
              </div>

              <div className="rounded-xl border p-4 bg-amber-50 text-amber-900">
                🧪 Using Irys Testnet — get free tokens from the <a className="underline" href="https://irys.xyz/faucet" target="_blank" rel="noreferrer">Irys Faucet</a>.
              </div>
            </div>
          </div>

          {/* About */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><SettingsIcon className="h-4 w-4" /> About irystree</h2>
            <div className="space-y-3 text-sm text-foreground/70">
              <p>irystree is a decentralized, professional link-in-bio. Unlike traditional platforms, your profile is permanent, censorship-resistant and provably yours.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Permanent — never expires</li>
                <li>Decentralized — no single point of failure</li>
                <li>Verifiable — cryptographic proof</li>
              </ul>
              <div className="flex gap-2 flex-wrap pt-2">
                <Link to="/help" className="btn btn-primary">Help &amp; support</Link>
                <a href="https://github.com/Pratiikpy/irys-tree" target="_blank" rel="noreferrer" className="btn border">View source</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings