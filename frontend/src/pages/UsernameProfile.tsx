import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ExternalLink, Share2, Eye, Heart, ArrowLeft, Globe } from 'lucide-react'
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
        const profileData = await fetchProfileByUsername(username)
        setProfile(profileData)
        if (profileData.metadata?.transactionId) {
          setTransactionId(profileData.metadata.transactionId)
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
      let formattedUrl = url
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = 'https://' + url
      }
      if (transactionId) await trackLinkClick(transactionId, linkId)
      window.open(formattedUrl, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Error tracking link click:', error)
      let formattedUrl = url
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = 'https://' + url
      }
      window.open(formattedUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({ title: profile?.name || 'Check out this profile', url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Profile URL copied to clipboard!')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="text-center text-foreground/70">Loading @{username}…</div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="h-16 w-16 rounded-2xl bg-secondary grid place-items-center mx-auto mb-4">🔎</div>
          <h1 className="text-2xl font-bold">Profile not found</h1>
          <p className="text-foreground/70 mt-2">The profile for <strong>@{username}</strong> could not be found.</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Link to="/create" className="btn btn-primary">Create profile</Link>
            <Link to="/" className="btn border"><ArrowLeft className="h-4 w-4 mr-2" /> Go home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container-section py-10">
        <div className="max-w-xl mx-auto">
          {/* Back */}
          <div className="mb-6">
            <Link to="/" className="text-sm text-foreground/70 hover:text-foreground inline-flex items-center"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
          </div>

          {/* Header card */}
          <div className="card p-8 text-center">
            {profile.avatar && (
              <img src={profile.avatar} alt={profile.name} className="mx-auto h-24 w-24 rounded-full object-cover border" />
            )}
            <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>
            <div className="mt-1 text-sm text-foreground/60">@{profile.username}</div>
            {profile.bio && <p className="mt-3 text-foreground/70">{profile.bio}</p>}

            {/* Stats */}
            {profile.customization.showProfileViews && (
              <div className="mt-4 flex items-center justify-center gap-4 text-sm text-foreground/70">
                <div className="flex items-center gap-1"><Eye className="h-4 w-4" /> {(profile.metadata?.views || 0)} views</div>
                <div className="flex items-center gap-1"><Heart className="h-4 w-4" /> {profile.links.reduce((s, l) => s + (l.analytics?.clicks || 0), 0)} clicks</div>
              </div>
            )}

            {/* Links */}
            <div className="mt-6 space-y-3">
              {profile.links.filter(l => l.isActive).sort((a, b) => a.order - b.order).map(link => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id, link.url)}
                  className="w-full h-12 rounded-2xl border text-base font-medium transition-colors hover:bg-secondary flex items-center justify-between px-4"
                >
                  <div className="flex items-center gap-3">
                    {link.icon && <span className="text-xl">{link.icon}</span>}
                    <span>{link.title}</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-foreground/50" />
                </button>
              ))}
            </div>

            {/* Share / Gateway */}
            <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
              <button onClick={shareProfile} className="btn border"><Share2 className="h-4 w-4 mr-2" /> Share</button>
              {transactionId && (
                <a href={`https://devnet.irys.xyz/${transactionId}`} target="_blank" rel="noopener noreferrer" className="btn border">
                  <Globe className="h-4 w-4 mr-2" /> View on Irys
                </a>
              )}
            </div>
          </div>

          {/* Footer id */}
          {transactionId && (
            <div className="text-center text-xs text-foreground/60 mt-4 font-mono">{transactionId.slice(0, 8)}…{transactionId.slice(-8)}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UsernameProfile