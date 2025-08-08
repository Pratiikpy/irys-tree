import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, HelpCircle, MessageCircle, Mail, Github, Globe, Shield, Zap } from 'lucide-react'

const Help: React.FC = () => {
  const faqs = [
    {
      question: "What is IrysLinkTree?",
      answer: "IrysLinkTree is a decentralized LinkTree clone that stores your profiles permanently on the Irys blockchain. Unlike traditional platforms, your data is permanent, censorship-resistant, and truly owned by you."
    },
    {
      question: "How does blockchain storage work?",
      answer: "Your LinkTree profiles are uploaded to Irys datachain, which provides permanent, decentralized storage. Once uploaded, your profile can never be deleted or modified by anyone except you, and it's accessible forever."
    },
    {
      question: "Do I need cryptocurrency to use this?",
      answer: "Yes, you need a small amount of ETH to upload your profile to Irys. This is a one-time payment that covers permanent storage. The cost is typically very low (less than $1 worth of ETH)."
    },
    {
      question: "How do I connect my wallet?",
      answer: "Click the 'Connect Wallet' button on the homepage. We support MetaMask and other Ethereum wallets. Make sure you have some ETH in your wallet for storage fees."
    },
    {
      question: "Can I edit my profile after uploading?",
      answer: "Currently, profiles are immutable once uploaded. To update your profile, you'll need to create a new one. This ensures the permanence and authenticity of your data."
    },
    {
      question: "Is my data private?",
      answer: "Your profile data is public on the blockchain, but you control what information you share. The blockchain provides transparency and verifiability, which are core features of decentralization."
    },
    {
      question: "What happens if I lose my wallet?",
      answer: "If you lose access to your wallet, you won't be able to create new profiles, but your existing profiles will remain accessible forever on the blockchain."
    },
    {
      question: "How much does it cost?",
      answer: "The cost depends on the size of your profile data, but it's typically less than $1 worth of ETH for permanent storage. This is a one-time payment with no recurring fees."
    }
  ]

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
                Help & Support
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              margin: '0 auto 1rem'
            }}>
              <HelpCircle style={{ height: '2rem', width: '2rem', color: 'white' }} />
            </div>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: 'white',
              marginBottom: '1rem'
            }}>
              How can we help?
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              Find answers to common questions and get support for IrysLinkTree
            </p>
          </div>

          {/* Quick Actions */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: '#dbeafe',
                margin: '0 auto 1rem'
              }}>
                <MessageCircle style={{ height: '1.5rem', width: '1.5rem', color: '#3b82f6' }} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Get Started
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                Learn how to create your first LinkTree profile
              </p>
              <Link
                to="/create"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: '#3b82f6',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                Create Profile
              </Link>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: '#fef3c7',
                margin: '0 auto 1rem'
              }}>
                <Mail style={{ height: '1.5rem', width: '1.5rem', color: '#f59e0b' }} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Contact Support
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                Need help? Reach out to our support team
              </p>
              <a
                href="mailto:support@iryslinktree.com"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: '#f59e0b',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                Send Email
              </a>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: '#dcfce7',
                margin: '0 auto 1rem'
              }}>
                <Github style={{ height: '1.5rem', width: '1.5rem', color: '#10b981' }} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                GitHub
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                View source code and contribute
              </p>
              <a
                href="https://github.com/Pratiikpy/irys-tree"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: '#10b981',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                View Repository
              </a>
            </div>
          </div>

          {/* FAQs */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Frequently Asked Questions
            </h3>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {faqs.map((faq, index) => (
                <div key={index} style={{ 
                  padding: '1.5rem',
                  background: '#f9fafb',
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    marginBottom: '0.75rem',
                    color: '#111827'
                  }}>
                    {faq.question}
                  </h4>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="card">
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Why Choose IrysLinkTree?
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: '#dbeafe',
                  margin: '0 auto 1rem'
                }}>
                  <Shield style={{ height: '1.5rem', width: '1.5rem', color: '#3b82f6' }} />
                </div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Permanent Storage
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Your profiles never expire or get deleted
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: '#fef3c7',
                  margin: '0 auto 1rem'
                }}>
                  <Globe style={{ height: '1.5rem', width: '1.5rem', color: '#f59e0b' }} />
                </div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Decentralized
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  No single point of failure or control
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  background: '#dcfce7',
                  margin: '0 auto 1rem'
                }}>
                  <Zap style={{ height: '1.5rem', width: '1.5rem', color: '#10b981' }} />
                </div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  One-Time Payment
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Pay once, own forever - no recurring fees
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Help 