import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExternalLink, Share2, Eye, Heart, Download, ArrowLeft, Globe, Database } from 'lucide-react'
import { useIrys } from '@/contexts/IrysContext'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { IrysProfile } from '@/types'

const UsernameProfile: React.FC = () => {
  const { username } = useParams()
  const { fetchProfile } = useIrys()
  const { trackProfileView, trackLinkClick } = useAnalytics()
  
  const [_profile, _setProfile] = useState<IrysProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [_transactionId, _setTransactionId] = useState<string | null>(null)

  useEffect(() => {
    if (!username) {
      setError('No username provided')
      setIsLoading(false)
      return
    }

    const loadProfile = async () => {
      try {
        setIsLoading(true)
        
        // For now, we'll need to implement a way to map usernames to transaction IDs
        // This could be done by storing username -> transactionId mappings in Irys
        // For demo purposes, we'll use a mock approach
        
        // TODO: Implement proper username to transactionId mapping
        // This would typically involve querying Irys for profiles with specific username tags
        
        // For now, we'll show a placeholder
        setError('Username-based profiles coming soon! This feature will allow you to access profiles via custom URLs like yourdomain.com/username')
        
      } catch (err) {
        console.error('Error loading profile:', err)
        setError('Profile not found or could not be loaded')
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [username, fetchProfile, trackProfileView])

  const handleLinkClick = async (linkId: string, url: string) => {
    try {
      if (_transactionId) {
        await trackLinkClick(_transactionId, linkId)
      }
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Error tracking link click:', error)
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: _profile?.name || 'Check out this profile',
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Profile URL copied to clipboard!')
    }
  }

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #e2e8f0',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Loading profile...</div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  if (error || !_profile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            color: '#3b82f6'
          }}>🚀</div>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            Username Profiles Coming Soon!
          </h1>
          <p style={{ 
            color: '#64748b', 
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            {error || 'This feature will allow you to access profiles via custom URLs like yourdomain.com/username'}
          </p>
          
          <div style={{ 
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ 
              fontWeight: '600', 
              color: '#92400e',
              marginBottom: '0.5rem'
            }}>
              How it will work:
            </h3>
            <ul style={{ 
              textAlign: 'left',
              color: '#92400e',
              fontSize: '0.875rem',
              lineHeight: '1.6'
            }}>
              <li>• Create a profile with a unique username</li>
              <li>• Access your profile at: <strong>irys-tree.vercel.app/your-username</strong></li>
              <li>• Share the clean URL with others</li>
              <li>• View the raw data on Irys gateway</li>
            </ul>
          </div>
          
          <Link to="/" style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}>
            <ArrowLeft style={{ height: '1rem', width: '1rem' }} />
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: _profile.theme.backgroundType === 'color' 
        ? _profile.theme.backgroundColor 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: _profile.theme.fontFamily || 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      color: _profile.theme.textColor || '#1f2937',
      padding: '1rem'
    }}>
      {/* Back Button */}
      <div style={{ 
        maxWidth: '680px', 
        margin: '0 auto',
        paddingTop: '1rem'
      }}>
        <Link to="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.1)',
          color: _profile.theme.textColor || '#1f2937',
          textDecoration: 'none',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          transition: 'all 0.2s',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <ArrowLeft style={{ height: '1rem', width: '1rem' }} />
          Back
        </Link>
      </div>

      {/* Profile Container */}
      <div style={{ 
        maxWidth: '680px', 
        margin: '0 auto',
        paddingTop: '2rem'
      }}>
        {/* Profile Header */}
        <div style={{ 
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          {/* Avatar */}
          {_profile.avatar && (
            <div style={{ marginBottom: '1.5rem' }}>
              <img 
                src={_profile.avatar} 
                alt={_profile.name}
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          )}

          {/* Name */}
          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            color: _profile.theme.textColor || '#1f2937',
            letterSpacing: '-0.025em'
          }}>
            {_profile.name}
          </h1>

          {/* Username */}
          <div style={{ 
            fontSize: '0.875rem',
            color: _profile.theme.textColor || '#1f2937',
            opacity: 0.7,
            marginBottom: '1rem'
          }}>
            @{_profile.username}
          </div>

          {/* Bio */}
          {_profile.bio && (
            <p style={{ 
              fontSize: '1rem', 
              marginBottom: '1.5rem',
              color: _profile.theme.textColor || '#1f2937',
              opacity: 0.8,
              lineHeight: '1.6',
              maxWidth: '500px',
              margin: '0 auto 1.5rem'
            }}>
              {_profile.bio}
            </p>
          )}

          {/* Stats */}
          {_profile.customization.showProfileViews && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1.5rem',
              marginBottom: '2rem',
              opacity: 0.7,
              fontSize: '0.875rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Eye style={{ height: '0.875rem', width: '0.875rem' }} />
                <span>{_profile.metadata?.views || 0} views</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Heart style={{ height: '0.875rem', width: '0.875rem' }} />
                <span>{_profile.links.reduce((sum, link) => sum + (link.analytics?.clicks || 0), 0)} clicks</span>
              </div>
            </div>
          )}
        </div>

        {/* Links */}
        <div style={{ 
          display: 'grid', 
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          {_profile.links
            .filter(link => link.isActive)
            .sort((a, b) => a.order - b.order)
            .map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.url)}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  background: link.style?.backgroundColor || '#3b82f6',
                  color: link.style?.textColor || '#ffffff',
                  border: link.style?.borderColor ? `1px solid ${link.style.borderColor}` : 'none',
                  borderRadius: _profile.theme.buttonStyle === 'rounded' ? '0.75rem' : 
                             _profile.theme.buttonStyle === 'pill' ? '2rem' : '0.375rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  fontFamily: link.style?.font || _profile.theme.fontFamily || 'Inter, sans-serif',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {link.icon && (
                    <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                  )}
                  <span>{link.title}</span>
                </div>
                <ExternalLink style={{ height: '1rem', width: '1rem', opacity: 0.7 }} />
              </button>
            ))}
        </div>

        {/* Irys Gateway Link */}
        {_transactionId && (
          <div style={{ 
            textAlign: 'center',
            marginBottom: '2rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '0.75rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <Database style={{ height: '1rem', width: '1rem' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                Stored on Irys Blockchain
              </span>
            </div>
            <a
              href={`https://devnet.irys.xyz/${_transactionId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.2)',
                color: _profile.theme.textColor || '#1f2937',
                textDecoration: 'none',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <Globe style={{ height: '0.875rem', width: '0.875rem' }} />
              View on Irys Gateway
            </a>
          </div>
        )}

        {/* Social Media */}
        {Object.values(_profile.social).some(url => url) && (
          <div style={{ 
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {Object.entries(_profile.social).map(([platform, url]) => {
                if (!url) return null
                
                const getIcon = (platform: string) => {
                  const icons: Record<string, string> = {
                    twitter: '🐦',
                    instagram: '📷',
                    youtube: '📺',
                    tiktok: '🎵',
                    linkedin: '💼',
                    github: '💻',
                    discord: '🎮',
                    telegram: '📱',
                    snapchat: '👻',
                    twitch: '🎮',
                    pinterest: '📌',
                    facebook: '📘',
                    spotify: '🎵',
                    soundcloud: '🎵',
                    email: '📧',
                    phone: '📞'
                  }
                  return icons[platform] || '🔗'
                }

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2.5rem',
                      height: '2.5rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      color: _profile.theme.textColor || '#1f2937',
                      textDecoration: 'none',
                      fontSize: '1.25rem',
                      transition: 'all 0.2s',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {getIcon(platform)}
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ 
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={shareProfile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.5rem',
                color: _profile.theme.textColor || '#1f2937',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
                fontWeight: '500',
                fontSize: '0.875rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <Share2 style={{ height: '1rem', width: '1rem' }} />
              Share
            </button>

            {_profile.customization.enableDownloadVCard && (
              <button
                onClick={() => {
                  // Generate vCard
                  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${_profile.name}
ORG:IrysLinkTree
URL:${window.location.href}
END:VCARD`
                  
                  const blob = new Blob([vcard], { type: 'text/vcard' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `${_profile.name}.vcf`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: _profile.theme.textColor || '#1f2937',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(10px)',
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <Download style={{ height: '1rem', width: '1rem' }} />
                Save Contact
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem 0',
          opacity: 0.6,
          fontSize: '0.75rem',
          color: _profile.theme.textColor || '#1f2937'
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            Powered by <strong>IrysLinkTree</strong>
          </div>
          <div style={{ 
            fontFamily: 'monospace',
            fontSize: '0.625rem',
            opacity: 0.8
          }}>
            {_transactionId ? `${_transactionId.slice(0, 8)}...${_transactionId.slice(-8)}` : 'Username Profile'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsernameProfile 