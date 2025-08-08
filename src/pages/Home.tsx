import React from 'react'
import { Link } from 'react-router-dom'
import { Wallet, Plus, Search, Globe, Shield, Zap } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'

const Home: React.FC = () => {
  const { wallet, connectWallet } = useWallet()

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '1rem 2rem',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              height: '2.5rem', 
              width: '2.5rem', 
              borderRadius: '0.75rem', 
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem'
            }}>
              I
            </div>
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'white',
              letterSpacing: '-0.025em'
            }}>
              IrysLinkTree
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {wallet.isConnected ? (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ 
                  height: '0.5rem', 
                  width: '0.5rem', 
                  borderRadius: '50%', 
                  backgroundColor: '#10b981' 
                }}></div>
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: 'white',
                  fontWeight: '500'
                }}>
                  {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <Wallet style={{ height: '1rem', width: '1rem' }} />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '800', 
            color: 'white', 
            marginBottom: '1.5rem',
            lineHeight: '1.1',
            letterSpacing: '-0.025em'
          }}>
            Your Links,{' '}
            <span style={{ 
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Forever
            </span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255, 255, 255, 0.9)', 
            marginBottom: '3rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Create permanent, decentralized LinkTree profiles using Irys programmable datachain.
            <br />
            <strong>No monthly fees. No censorship. True ownership.</strong>
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginBottom: '4rem',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/create"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.75rem',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              <Plus style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>Create Profile</span>
            </Link>
            <Link
              to="/discover"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2rem',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '0.75rem',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                textDecoration: 'none',
                transition: 'all 0.2s',
                fontWeight: '600',
                fontSize: '1rem',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
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
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s'
          }}>
            <div style={{ 
              height: '3rem', 
              width: '3rem', 
              borderRadius: '0.75rem', 
              background: 'linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Globe style={{ height: '1.5rem', width: '1.5rem', color: '#1d4ed8' }} />
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700', 
              marginBottom: '0.75rem',
              color: 'white'
            }}>
              Permanent Storage
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6'
            }}>
              Your profile never expires or gets deleted. Stored permanently on Irys datachain with cryptographic proof.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s'
          }}>
            <div style={{ 
              height: '3rem', 
              width: '3rem', 
              borderRadius: '0.75rem', 
              background: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Shield style={{ height: '1.5rem', width: '1.5rem', color: '#d97706' }} />
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700', 
              marginBottom: '0.75rem',
              color: 'white'
            }}>
              True Ownership
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6'
            }}>
              No centralized platform can remove your profile. You own your data completely with cryptographic verification.
            </p>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s'
          }}>
            <div style={{ 
              height: '3rem', 
              width: '3rem', 
              borderRadius: '0.75rem', 
              background: 'linear-gradient(135deg, #dcfce7 0%, #10b981 100%)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap style={{ height: '1.5rem', width: '1.5rem', color: '#059669' }} />
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700', 
              marginBottom: '0.75rem',
              color: 'white'
            }}>
              One-Time Payment
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6'
            }}>
              Pay once with crypto, own forever. No recurring monthly fees or hidden charges.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem',
          padding: '3rem 2rem',
          marginTop: '4rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'white'
          }}>
            Platform Statistics
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                color: '#3b82f6',
                marginBottom: '0.5rem'
              }}>1,234</div>
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Profiles Created</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                color: '#8b5cf6',
                marginBottom: '0.5rem'
              }}>56,789</div>
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Total Views</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>12,345</div>
              <div style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: '500'
              }}>Link Clicks</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home 