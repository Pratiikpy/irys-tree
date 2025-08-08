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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <header style={{ 
        borderBottom: '1px solid #e5e7eb', 
        background: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(8px)'
      }}>
        <div className="container" style={{ padding: '1rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link
                to="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  textDecoration: 'none'
                }}
              >
                <ArrowLeft style={{ height: '1rem', width: '1rem' }} />
                Back
              </Link>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                Settings
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Account Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1.5rem',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              <User style={{ height: '1.25rem', width: '1.25rem' }} />
              Account
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem'
              }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Wallet Address</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', fontFamily: 'monospace' }}>
                    {wallet.address || 'Not connected'}
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  background: wallet.isConnected ? '#dcfce7' : '#fef2f2',
                  color: wallet.isConnected ? '#166534' : '#dc2626',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    background: wallet.isConnected ? '#22c55e' : '#ef4444'
                  }} />
                  {wallet.isConnected ? 'Connected' : 'Disconnected'}
                </div>
              </div>
              
              {wallet.isConnected && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '0.5rem'
                }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>ETH Balance</div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {wallet.balance || '0'} ETH
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={disconnectWallet}
                style={{
                  padding: '0.75rem 1rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Disconnect Wallet
              </button>
            </div>
          </div>

          {/* Irys Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1.5rem',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              <Globe style={{ height: '1.25rem', width: '1.25rem' }} />
              Irys Storage (Testnet)
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem'
              }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Irys Balance</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {irys.balance || '0'} IRYS
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  padding: '0.25rem 0.5rem',
                  background: irys.isConnected ? '#dcfce7' : '#fef2f2',
                  color: irys.isConnected ? '#166534' : '#dc2626',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    background: irys.isConnected ? '#22c55e' : '#ef4444'
                  }} />
                  {irys.isConnected ? 'Connected' : 'Disconnected'}
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem'
              }}>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Amount in IRYS"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                />
                <button
                  onClick={handleFundAccount}
                  disabled={isFunding || !fundAmount}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: isFunding || !fundAmount ? '#9ca3af' : '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: isFunding || !fundAmount ? 'not-allowed' : 'pointer',
                    fontWeight: '500'
                  }}
                >
                  {isFunding ? 'Funding...' : 'Fund Account'}
                </button>
              </div>
              
              <div style={{ 
                padding: '1rem',
                background: '#fef3c7',
                borderRadius: '0.5rem',
                border: '1px solid #f59e0b'
              }}>
                <div style={{ fontWeight: '500', color: '#92400e', marginBottom: '0.5rem' }}>
                  🧪 Using Irys Testnet
                </div>
                <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                  This app is configured for Irys testnet. Get free IRYS tokens from the 
                  <a href="https://irys.xyz/faucet" target="_blank" rel="noopener noreferrer" style={{ color: '#92400e', textDecoration: 'underline' }}>
                    Irys Faucet
                  </a>.
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1.5rem',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              <SettingsIcon style={{ height: '1.25rem', width: '1.25rem' }} />
              Preferences
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="checkbox" defaultChecked />
                <div>
                  <div style={{ fontWeight: '500' }}>Enable Notifications</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Get notified about profile views and link clicks
                  </div>
                </div>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="checkbox" defaultChecked />
                <div>
                  <div style={{ fontWeight: '500' }}>Analytics Tracking</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Track profile performance and visitor analytics
                  </div>
                </div>
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="checkbox" />
                <div>
                  <div style={{ fontWeight: '500' }}>Dark Mode</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Use dark theme for the application
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Security Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1.5rem',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              <Shield style={{ height: '1.25rem', width: '1.25rem' }} />
              Security
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ 
                padding: '1rem',
                background: '#fef3c7',
                borderRadius: '0.5rem',
                border: '1px solid #f59e0b'
              }}>
                <div style={{ fontWeight: '500', color: '#92400e', marginBottom: '0.5rem' }}>
                  🔒 Your data is secure
                </div>
                <div style={{ fontSize: '0.875rem', color: '#92400e' }}>
                  All profiles are stored permanently on Irys blockchain with cryptographic verification.
                  No centralized platform can access or modify your data.
                </div>
              </div>
              
              <div style={{ 
                padding: '1rem',
                background: '#dbeafe',
                borderRadius: '0.5rem',
                border: '1px solid #3b82f6'
              }}>
                <div style={{ fontWeight: '500', color: '#1e40af', marginBottom: '0.5rem' }}>
                  🌐 Decentralized Storage
                </div>
                <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>
                  Your LinkTree profiles are stored on Irys datachain, ensuring permanent availability
                  and censorship resistance.
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="card">
            <h2 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '1.5rem',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              <Globe style={{ height: '1.25rem', width: '1.25rem' }} />
              About IrysLinkTree
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '1rem' }}>
                  IrysLinkTree is a decentralized LinkTree clone that stores your profiles permanently 
                  on the Irys blockchain. Unlike traditional platforms, your data is:
                </p>
                <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li>🔒 <strong>Permanent</strong> - Never expires or gets deleted</li>
                  <li>🌐 <strong>Decentralized</strong> - No single point of failure</li>
                  <li>🔐 <strong>Censorship-resistant</strong> - Cannot be removed by platforms</li>
                  <li>💎 <strong>Verifiable</strong> - Cryptographic proof of ownership</li>
                </ul>
                <p>
                  Built with React, TypeScript, and Irys SDK for the decentralized web.
                </p>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <Link
                  to="/help"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: '#3b82f6',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Help & Support
                </Link>
                
                <a
                  href="https://github.com/Pratiikpy/irys-tree"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: '#6b7280',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  <Download style={{ height: '1rem', width: '1rem' }} />
                  View Source
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings 