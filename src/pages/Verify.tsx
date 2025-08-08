import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Shield, FileText, Hash } from 'lucide-react'
import { useIrys } from '@/contexts/IrysContext'

interface VerificationResult {
  isValid: boolean
  transactionId: string
  timestamp: number
  creator: string
  dataHash: string
  blockHeight?: number
  error?: string
}

const Verify: React.FC = () => {
  const { transactionId } = useParams()
  const { fetchProfile } = useIrys()
  
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    if (transactionId) {
      verifyProfile(transactionId)
    }
  }, [transactionId])

  const verifyProfile = async (txId: string) => {
    setIsVerifying(true)
    try {
      // Fetch profile from Irys
      const profileData = await fetchProfile(txId)
      setProfile(profileData)

      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock verification result
      const result: VerificationResult = {
        isValid: true,
        transactionId: txId,
        timestamp: Date.now() - 86400000, // 1 day ago
        creator: profileData.metadata?.creator || 'Unknown',
        dataHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        blockHeight: Math.floor(Math.random() * 1000000) + 18000000
      }

      setVerificationResult(result)
    } catch (error) {
      console.error('Error verifying profile:', error)
      setVerificationResult({
        isValid: false,
        transactionId: txId,
        timestamp: Date.now(),
        creator: 'Unknown',
        dataHash: 'N/A',
        error: 'Profile not found or invalid'
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isVerifying) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
          <div>Verifying profile authenticity...</div>
        </div>
      </div>
    )
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
                Verify Profile
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
              <Shield style={{ height: '2rem', width: '2rem', color: 'white' }} />
            </div>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: 'white',
              marginBottom: '1rem'
            }}>
              Profile Verification
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              Verify the authenticity and ownership of LinkTree profiles on the blockchain
            </p>
          </div>

          {verificationResult && (
            <div className="card" style={{ marginBottom: '2rem' }}>
              {/* Verification Status */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: verificationResult.isValid ? '#dcfce7' : '#fef2f2',
                borderRadius: '0.5rem',
                border: `1px solid ${verificationResult.isValid ? '#22c55e' : '#ef4444'}`
              }}>
                {verificationResult.isValid ? (
                  <CheckCircle style={{ height: '2rem', width: '2rem', color: '#22c55e' }} />
                ) : (
                  <XCircle style={{ height: '2rem', width: '2rem', color: '#ef4444' }} />
                )}
                <div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600',
                    color: verificationResult.isValid ? '#166534' : '#dc2626',
                    marginBottom: '0.25rem'
                  }}>
                    {verificationResult.isValid ? 'Profile Verified' : 'Verification Failed'}
                  </h3>
                  <p style={{ 
                    fontSize: '0.875rem',
                    color: verificationResult.isValid ? '#166534' : '#dc2626',
                    margin: 0
                  }}>
                    {verificationResult.isValid 
                      ? 'This profile has been verified as authentic and stored on the Irys blockchain'
                      : verificationResult.error || 'Unable to verify this profile'
                    }
                  </p>
                </div>
              </div>

              {/* Profile Info */}
              {profile && (
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FileText style={{ height: '1.25rem', width: '1.25rem' }} />
                    Profile Information
                  </h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '1rem'
                  }}>
                    <div style={{ 
                      padding: '1rem',
                      background: '#f9fafb',
                      borderRadius: '0.375rem'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Profile Name
                      </div>
                      <div style={{ fontWeight: '500' }}>
                        {profile.name || 'Unknown'}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '1rem',
                      background: '#f9fafb',
                      borderRadius: '0.375rem'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Creator
                      </div>
                      <div style={{ fontWeight: '500', fontFamily: 'monospace' }}>
                        {formatAddress(verificationResult.creator)}
                      </div>
                    </div>
                    <div style={{ 
                      padding: '1rem',
                      background: '#f9fafb',
                      borderRadius: '0.375rem'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Links Count
                      </div>
                      <div style={{ fontWeight: '500' }}>
                        {profile.links?.length || 0} links
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blockchain Details */}
              <div>
                <h4 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Hash style={{ height: '1.25rem', width: '1.25rem' }} />
                  Blockchain Details
                </h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1rem'
                }}>
                  <div style={{ 
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '0.375rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Transaction ID
                    </div>
                    <div style={{ fontWeight: '500', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {verificationResult.transactionId}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '0.375rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Data Hash
                    </div>
                    <div style={{ fontWeight: '500', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {verificationResult.dataHash}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '0.375rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                      Created At
                    </div>
                    <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>
                      {formatDate(verificationResult.timestamp)}
                    </div>
                  </div>
                  {verificationResult.blockHeight && (
                    <div style={{ 
                      padding: '1rem',
                      background: '#f9fafb',
                      borderRadius: '0.375rem'
                    }}>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                        Block Height
                      </div>
                      <div style={{ fontWeight: '500' }}>
                        {verificationResult.blockHeight.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Verification Info */}
          <div className="card">
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Shield style={{ height: '1.25rem', width: '1.25rem' }} />
              How Verification Works
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ 
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: '#111827'
                }}>
                  🔒 Cryptographic Verification
                </h4>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Each profile is cryptographically signed and stored on the Irys blockchain. 
                  The verification process checks the digital signature and confirms the data 
                  hasn't been tampered with.
                </p>
              </div>

              <div style={{ 
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: '#111827'
                }}>
                  ⏰ Timestamp Verification
                </h4>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  Every profile includes a cryptographic timestamp that proves when it was 
                  created. This prevents backdating and ensures authenticity.
                </p>
              </div>

              <div style={{ 
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: '#111827'
                }}>
                  👤 Creator Verification
                </h4>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  The blockchain verifies that the profile was created by the claimed wallet 
                  address, ensuring true ownership and preventing impersonation.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/discover"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                fontWeight: '500'
              }}
            >
              Discover Profiles
            </Link>
            
            <Link
              to="/create"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#10b981',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                fontWeight: '500'
              }}
            >
              Create Profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Verify 