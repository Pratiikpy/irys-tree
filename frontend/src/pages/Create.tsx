import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, Trash2, Save, ArrowLeft, Palette, Link as LinkIcon, User, Globe, Settings } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'
import { useIrys } from '@/contexts/IrysContext'
import { IrysProfile, ProfileLink, ProfileTheme, SocialLinks } from '@/types'
import PhonePreview from '@/components/shared/PhonePreview'

const Create: React.FC = () => {
  const navigate = useNavigate()
  const { transactionId } = useParams()
  const { wallet } = useWallet()
  const { uploadProfile } = useIrys()
  
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<IrysProfile>({
    version: "1.0",
    name: "",
    username: "",
    bio: "",
    avatar: "",
    links: [
      { 
        id: "1", 
        title: "My Website", 
        url: "https://", 
        icon: "🌐", 
        isActive: true,
        order: 1,
        style: { backgroundColor: "#39e09b", textColor: "#000000", borderRadius: 12, font: "Inter" },
        analytics: { clicks: 0 }
      }
    ],
    theme: {
      backgroundType: "color",
      backgroundColor: "#ffffff",
      fontFamily: "Inter",
      textColor: "#111827",
      buttonStyle: "rounded",
      buttonColor: "#39e09b",
      buttonTextColor: "#000000",
      layout: "center",
      spacing: "normal",
      animations: true
    },
    customization: { showProfileViews: true, showVerificationBadge: false, enableDownloadVCard: false },
    social: { twitter: "", instagram: "", linkedin: "", github: "", youtube: "", tiktok: "" },
    settings: {
      isPublic: true,
      allowSearch: true,
      enableAnalytics: true,
      enableComments: false,
      moderateComments: false,
      enableSharing: true,
      enableDownloads: false,
      passwordProtected: false,
      ageRestricted: false
    },
    metadata: { createdAt: Date.now(), updatedAt: Date.now(), creator: wallet.address || "", views: 0, isPublic: true }
  })

  const addLink = () => {
    const newLink: ProfileLink = {
      id: Date.now().toString(),
      title: "New Link",
      url: "https://",
      icon: "🔗",
      isActive: true,
      order: profile.links.length + 1,
      style: { backgroundColor: "#39e09b", textColor: "#000000", borderRadius: 12, font: "Inter" },
      analytics: { clicks: 0 }
    }
    setProfile(prev => ({ ...prev, links: [...prev.links, newLink] }))
  }

  const removeLink = (id: string) => {
    setProfile(prev => ({ ...prev, links: prev.links.filter(l => l.id !== id) }))
  }

  const updateLink = (id: string, field: keyof ProfileLink, value: string | boolean) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(link => {
        if (link.id === id) {
          if (field === 'url' && typeof value === 'string') {
            let formattedUrl = value
            if (value && !value.startsWith('http://') && !value.startsWith('https://') && !value.startsWith('mailto:') && !value.startsWith('tel:')) {
              formattedUrl = 'https://' + value
            }
            return { ...link, [field]: formattedUrl }
          }
          return { ...link, [field]: value }
        }
        return link
      })
    }))
  }

  const updateSocial = (platform: keyof SocialLinks, value: string) => {
    setProfile(prev => ({
      ...prev,
      social: { 
        ...prev.social, 
        [platform]: value && !value.startsWith('http://') && !value.startsWith('https://') && !value.startsWith('mailto:') && !value.startsWith('tel:') 
          ? 'https://' + value 
          : value 
      }
    }))
  }

  const updateTheme = (field: keyof ProfileTheme, value: string) => {
    setProfile(prev => ({ ...prev, theme: { ...prev.theme, [field]: value } }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallet.isConnected) return alert('Please connect your wallet first')
    if (!profile.name.trim()) return alert('Please enter a profile name')
    if (!profile.username.trim()) return alert('Please enter a username')

    const usernameRegex = /^[a-z0-9-]+$/
    if (!usernameRegex.test(profile.username)) return alert('Username can only contain letters, numbers, and hyphens')

    setIsLoading(true)
    try {
      const result = await uploadProfile(profile, wallet.address!)
      alert(`Profile created! Transaction ID: ${result.transactionId}`)
      navigate(`/${profile.username}`)
    } catch (error) {
      console.error('Error creating profile:', error)
      alert('Error creating profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container-section h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="text-sm text-foreground/70 hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="text-lg font-semibold">{transactionId ? 'Edit profile' : 'Create profile'}</h1>
          </div>
          <button onClick={handleSubmit} disabled={isLoading} className="btn btn-primary">
            <Save className="h-4 w-4 mr-2" /> {isLoading ? 'Saving…' : 'Save profile'}
          </button>
        </div>
      </header>

      <main className="container-section py-8">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
          {/* Basic */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><User className="h-4 w-4" /> Basic information</h2>
            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium">Profile name *</span>
                <input value={profile.name} onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))} className="h-11 rounded-xl border px-3" placeholder="Enter your name" required />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Username *</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">irystree.app/</span>
                  <input
                    value={profile.username}
                    onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
                    className="h-11 flex-1 rounded-xl border px-3"
                    placeholder="your-username"
                    required
                  />
                </div>
                <p className="text-xs text-foreground/60">Only letters, numbers, and hyphens.</p>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Bio</span>
                <textarea value={profile.bio} onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))} rows={3} className="rounded-xl border px-3 py-2" placeholder="Tell people about yourself" />
              </label>
            </div>
          </div>

          {/* Links */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><LinkIcon className="h-4 w-4" /> Your links</h2>
            <div className="space-y-3">
              {profile.links.map((link) => (
                <div key={link.id} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                  <input value={link.title} onChange={(e) => updateLink(link.id, 'title', e.target.value)} className="h-11 rounded-xl border px-3" placeholder="Link title" />
                  <input value={link.url} onChange={(e) => updateLink(link.id, 'url', e.target.value)} className="h-11 rounded-xl border px-3 md:col-span-2" placeholder="https://" />
                  <div className="flex items-center gap-2">
                    <input value={link.icon} onChange={(e) => updateLink(link.id, 'icon', e.target.value)} className="h-11 w-20 rounded-xl border px-3" placeholder="🎯" />
                    <button type="button" onClick={() => removeLink(link.id)} className="btn bg-destructive text-destructive-foreground">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addLink} className="btn border w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" /> Add link
              </button>
            </div>
          </div>

          {/* Social */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><Globe className="h-4 w-4" /> Social media</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(profile.social).map(([platform, value]) => (
                <label key={platform} className="grid gap-2">
                  <span className="text-sm font-medium capitalize">{platform}</span>
                  <input value={value as string} onChange={(e) => updateSocial(platform as keyof SocialLinks, e.target.value)} className="h-11 rounded-xl border px-3" placeholder={`https://${platform}.com/username`} />
                </label>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><Palette className="h-4 w-4" /> Theme & appearance</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-sm font-medium">Button color</span>
                <input type="color" value={profile.theme.buttonColor} onChange={(e) => updateTheme('buttonColor', e.target.value)} className="h-11 rounded-xl border" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Background color</span>
                <input type="color" value={profile.theme.backgroundColor} onChange={(e) => updateTheme('backgroundColor', e.target.value)} className="h-11 rounded-xl border" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium">Text color</span>
                <input type="color" value={profile.theme.textColor} onChange={(e) => updateTheme('textColor', e.target.value)} className="h-11 rounded-xl border" />
              </label>
            </div>
          </div>

          {/* Settings */}
          <div className="card p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2"><Settings className="h-4 w-4" /> Settings</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={profile.settings.isPublic} onChange={(e) => setProfile(prev => ({ ...prev, settings: { ...prev.settings, isPublic: e.target.checked } }))} />
                <span>Make profile public</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={profile.settings.enableAnalytics} onChange={(e) => setProfile(prev => ({ ...prev, settings: { ...prev.settings, enableAnalytics: e.target.checked } }))} />
                <span>Enable analytics</span>
              </label>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Create