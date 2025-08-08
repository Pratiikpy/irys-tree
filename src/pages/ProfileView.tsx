import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExternalLink, Share2, Eye, Heart, Download } from 'lucide-react'
import { useIrys } from '@/contexts/IrysContext'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { IrysProfile } from '@/types'

const ProfileView: React.FC = () => {
  const { transactionId } = useParams()
  const { fetchProfile } = useIrys()
  const { trackProfileView, trackLinkClick } = useAnalytics()
  
  const [profile, setProfile] = useState<IrysProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!transactionId) {
      setError('No transaction ID provided')
      setIsLoading(false)
      return
    }

    const loadProfile = async () => {
      try {
        setIsLoading(true)
        const profileData = await fetchProfile(transactionId)
        setProfile(profileData)
        
        // Track profile view
        await trackProfileView(transactionId)
      } catch (err) {
        console.error('Error loading profile:', err)
        setError('Profile not found or could not be loaded')
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [transactionId, fetchProfile, trackProfileView])

  const handleLinkClick = async (linkId: string, url: string) => {
    try {
      await trackLinkClick(transactionId!, linkId)
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Error tracking link click:', error)
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: profile?.name || 'Check out this profile',
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <div>Loading profile...</div>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>❌</div>
          <div>{error || 'Profile not found'}</div>
          <Link to="/" style={{ 
            display: 'inline-block', 
            marginTop: '1rem', 
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem'
          }}>
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: profile.theme.backgroundType === 'color' 
        ? profile.theme.backgroundColor 
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: profile.theme.fontFamily,
      color: profile.theme.textColor
    }}>
      {/* Profile Header */}
      <div style={{ 
        padding: '2rem 1rem',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        {/* Avatar */}
        {profile.avatar && (
          <div style={{ marginBottom: '1.5rem' }}>
            <img 
              src={profile.avatar} 
              alt={profile.name}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid rgba(255, 255, 255, 0.2)'
              }}
            />
          </div>
        )}

        {/* Name */}
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          color: profile.theme.textColor
        }}>
          {profile.name}
        </h1>

        {/* Bio */}
        {profile.bio && (
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem',
            color: profile.theme.textColor,
            opacity: 0.8,
            lineHeight: 1.6
          }}>
            {profile.bio}
          </p>
        )}

        {/* Stats */}
        {profile.customization.showProfileViews && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem',
            marginBottom: '2rem',
            opacity: 0.7
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye style={{ height: '1rem', width: '1rem' }} />
              <span>{profile.metadata.views} views</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart style={{ height: '1rem', width: '1rem' }} />
              <span>{profile.links.reduce((sum, link) => sum + link.analytics.clicks, 0)} clicks</span>
            </div>
          </div>
        )}
      </div>

      {/* Links */}
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '0 1rem 2rem'
      }}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {profile.links
            .filter(link => link.isActive)
            .sort((a, b) => a.order - b.order)
            .map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.url)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  background: link.style.backgroundColor,
                  color: link.style.textColor,
                  border: link.style.borderColor ? `1px solid ${link.style.borderColor}` : 'none',
                  borderRadius: profile.theme.buttonStyle === 'rounded' ? '0.5rem' : 
                             profile.theme.buttonStyle === 'pill' ? '2rem' : '0',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                  boxShadow: link.style.shadow || '0 2px 4px rgba(0, 0, 0, 0.1)',
                  fontFamily: link.style.font || profile.theme.fontFamily
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = link.style.shadow || '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{link.icon}</span>
                  <span>{link.title}</span>
                </div>
                <ExternalLink style={{ height: '1rem', width: '1rem' }} />
              </button>
            ))}
        </div>
      </div>

      {/* Social Media */}
      {profile.customization.showVerificationBadge && Object.values(profile.social).some(url => url) && (
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          padding: '0 1rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {Object.entries(profile.social).map(([platform, url]) => {
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
                    width: '3rem',
                    height: '3rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    color: profile.theme.textColor,
                    textDecoration: 'none',
                    fontSize: '1.5rem',
                    transition: 'all 0.2s'
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
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '0 1rem 2rem',
        textAlign: 'center'
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
              color: profile.theme.textColor,
              cursor: 'pointer',
              transition: 'all 0.2s'
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

          {profile.customization.enableDownloadVCard && (
            <button
              onClick={() => {
                // Generate vCard
                const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
ORG:IrysLinkTree
URL:${window.location.href}
END:VCARD`
                
                const blob = new Blob([vcard], { type: 'text/vcard' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `${profile.name}.vcf`
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
                color: profile.theme.textColor,
                cursor: 'pointer',
                transition: 'all 0.2s'
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
        padding: '2rem 1rem',
        opacity: 0.7,
        fontSize: '0.875rem'
      }}>
        <div style={{ marginBottom: '0.5rem' }}>
          Powered by <strong>IrysLinkTree</strong>
        </div>
        <div>
          Transaction: {transactionId?.slice(0, 8)}...{transactionId?.slice(-8)}
        </div>
      </div>
    </div>
  )
}

export default ProfileView 