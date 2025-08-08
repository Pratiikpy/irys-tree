import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExternalLink, Share2, Eye, Heart, Download, ArrowLeft, Globe, Database, Search } from 'lucide-react'
import { useIrys } from '@/contexts/IrysContext'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { IrysProfile } from '@/types'

const UsernameProfile: React.FC = () => {
  const { username } = useParams()
  const { fetchProfileByUsername } = useIrys()
  const { trackProfileView, trackLinkClick } = useAnalytics()
  
  const [profile, setProfile] = useState<IrysProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [transactionId, setTransactionId] = useState<string | null>(null)

  useEffect(() => {
    if (!username) {
      setError('No username provided')
      setIsLoading(false)
      return
    }

    const loadProfile = async () => {
      try {
        setIsLoading(true)
        
        // Fetch profile by username
        const profileData = await fetchProfileByUsername(username)
        setProfile(profileData)
        
        // Extract transaction ID from metadata
        if (profileData.metadata?.transactionId) {
          setTransactionId(profileData.metadata.transactionId)
        }
        
        // Track profile view
        if (profileData.metadata?.transactionId) {
          await trackProfileView(profileData.metadata.transactionId)
        }
        
      } catch (err) {
        console.error('Error loading profile:', err)
        setError('Profile not found or could not be loaded')
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [username, fetchProfileByUsername, trackProfileView])

  const handleLinkClick = async (linkId: string, url: string) => {
    try {
      if (transactionId) {
        await trackLinkClick(transactionId, linkId)
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-teal-400 rounded-full animate-spin mx-auto" style={{ animationDelay: '-0.5s' }}></div>
          </div>
          <div className="text-emerald-300/70 text-lg font-medium">Loading @{username}...</div>
          <div className="text-emerald-300/50 text-sm mt-2">Powered by Irys Datachain</div>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Profile Not Found
          </h1>
          <p className="text-emerald-300/70 mb-6 leading-relaxed">
            The profile for <strong className="text-emerald-400">@{username}</strong> could not be found.
            {error && error !== 'Profile not found or could not be loaded' && (
              <span> {error}</span>
            )}
          </p>
          
          <div className="bg-gradient-to-r from-emerald-400/20 to-teal-400/20 backdrop-blur-sm border border-emerald-400/30 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-emerald-300 mb-4">
              How to create your profile:
            </h3>
            <ul className="text-left text-emerald-300/80 text-sm space-y-2">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Go to the <strong>Create Profile</strong> page</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Choose a unique username</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Upload your profile to Irys blockchain</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Share your URL: <strong>irys-tree.vercel.app/{username}</strong></span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/create" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Create Profile
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 hover:bg-white/20 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Home</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>

        {/* Profile Header */}
        <div className="text-center mb-12">
          {/* Avatar */}
          {profile.avatar && (
            <div className="mb-6">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur opacity-25"></div>
                <img 
                  src={profile.avatar} 
                  alt={profile.name}
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
              </div>
            </div>
          )}

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            {profile.name}
          </h1>

          {/* Username */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-300 rounded-full text-sm font-medium border border-emerald-400/30">
              @{profile.username}
            </span>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-emerald-300/90 text-lg leading-relaxed max-w-lg mx-auto mb-6">
              {profile.bio}
            </p>
          )}

          {/* Stats */}
          {profile.customization.showProfileViews && (
            <div className="flex justify-center space-x-8 text-emerald-300/70 text-sm">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{profile.metadata?.views || 0} views</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>{profile.links.reduce((sum, link) => sum + (link.analytics?.clicks || 0), 0)} clicks</span>
              </div>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="space-y-4 mb-12">
          {profile.links
            .filter(link => link.isActive)
            .sort((a, b) => a.order - b.order)
            .map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id, link.url)}
                className="group relative w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-semibold transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-300"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {link.icon && (
                      <span className="text-xl">{link.icon}</span>
                    )}
                    <span className="text-lg">{link.title}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
        </div>

        {/* Irys Gateway Link */}
        {transactionId && (
          <div className="text-center mb-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Database className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 font-semibold">
                Stored on Irys Blockchain
              </span>
            </div>
            <a
              href={`https://devnet.irys.xyz/${transactionId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 backdrop-blur-sm text-emerald-300 rounded-xl border border-emerald-400/30 hover:from-emerald-400/30 hover:to-teal-400/30 transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span>View on Irys Gateway</span>
            </a>
          </div>
        )}

        {/* Social Media */}
        {Object.values(profile.social).some(url => url) && (
          <div className="text-center mb-12">
            <div className="flex justify-center space-x-4 flex-wrap">
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
                    className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-white text-xl transition-all duration-200 hover:bg-white/20 hover:scale-110 border border-white/20 hover:border-white/40"
                  >
                    {getIcon(platform)}
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center mb-12">
          <div className="flex justify-center space-x-4 flex-wrap">
            <button
              onClick={shareProfile}
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold transition-all duration-200 hover:bg-white/20 hover:scale-105"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>

            {profile.customization.enableDownloadVCard && (
              <button
                onClick={() => {
                  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
ORG:Irys Tree
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
                className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold transition-all duration-200 hover:bg-white/20 hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Save Contact</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/10">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <img 
              src="https://pbs.twimg.com/profile_images/1879776802563891200/cdpcRzVY_400x400.jpg" 
              alt="Irys Logo" 
              className="w-6 h-6 rounded-lg"
            />
            <span className="text-emerald-300/70 font-semibold">Powered by Irys Tree</span>
          </div>
          <div className="text-emerald-300/50 text-xs font-mono">
            {transactionId ? `${transactionId.slice(0, 8)}...${transactionId.slice(-8)}` : 'Username Profile'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsernameProfile 