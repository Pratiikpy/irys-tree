import React from 'react'
import { Link } from 'react-router-dom'
import { Wallet, Plus, Search } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'

const Home: React.FC = () => {
  const { wallet, connectWallet } = useWallet()

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                height: '2rem', 
                width: '2rem', 
                borderRadius: '0.5rem', 
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
              }}></div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                IrysLinkTree
              </h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {wallet.isConnected ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ 
                    height: '0.5rem', 
                    width: '0.5rem', 
                    borderRadius: '50%', 
                    backgroundColor: '#10b981' 
                  }}></div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                  </span>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Wallet style={{ height: '1rem', width: '1rem' }} />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container" style={{ padding: '4rem 0' }}>
        <div className="text-center">
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '1.5rem' 
          }}>
            Your Links,{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Forever
            </span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255, 255, 255, 0.8)', 
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Create permanent, decentralized LinkTree profiles using Irys programmable datachain.
            <br />
            No monthly fees. No censorship. True ownership.
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/create"
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>Create Profile</span>
            </Link>
            <Link
              to="/discover"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '0.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                textDecoration: 'none',
                transition: 'all 0.2s'
              }}
            >
              <Search style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>Discover Profiles</span>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginTop: '4rem'
        }}>
          <div className="card">
            <div style={{ 
              height: '3rem', 
              width: '3rem', 
              borderRadius: '0.5rem', 
              backgroundColor: '#dbeafe',
              marginBottom: '1rem'
            }}></div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              Permanent Storage
            </h3>
            <p style={{ color: '#6b7280' }}>
              Your profile never expires or gets deleted. Stored permanently on Irys datachain.
            </p>
          </div>
          
          <div className="card">
            <div style={{ 
              height: '3rem', 
              width: '3rem', 
              borderRadius: '0.5rem', 
              backgroundColor: '#f3e8ff',
              marginBottom: '1rem'
            }}></div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              True Ownership
            </h3>
            <p style={{ color: '#6b7280' }}>
              No centralized platform can remove your profile. You own your data completely.
            </p>
          </div>
          
          <div className="card">
            <div style={{ 
              height: '3rem', 
              width: '3rem', 
              borderRadius: '0.5rem', 
              backgroundColor: '#dcfce7',
              marginBottom: '1rem'
            }}></div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              One-Time Payment
            </h3>
            <p style={{ color: '#6b7280' }}>
              Pay once with crypto, own forever. No recurring monthly fees.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="card" style={{ marginTop: '4rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            Platform Statistics
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#3b82f6' }}>1,234</div>
              <div style={{ color: '#6b7280' }}>Profiles Created</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#8b5cf6' }}>56,789</div>
              <div style={{ color: '#6b7280' }}>Total Views</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#10b981' }}>12,345</div>
              <div style={{ color: '#6b7280' }}>Link Clicks</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home 