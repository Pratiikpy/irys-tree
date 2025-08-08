import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, Trash2, Save, ArrowLeft, Palette, Link as LinkIcon, User, Globe, Settings } from 'lucide-react'
import { useWallet } from '@/contexts/WalletContext'
import { useIrys } from '@/contexts/IrysContext'
import { IrysProfile, ProfileLink, ProfileTheme, SocialLinks } from '@/types'

const Create: React.FC = () => {
  const navigate = useNavigate()
  const { transactionId } = useParams()
  const { wallet } = useWallet()
  const { uploadProfile } = useIrys()
  
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState<IrysProfile>({
    version: "1.0",
    name: "",
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
        style: {
          backgroundColor: "#3b82f6",
          textColor: "#ffffff",
          borderRadius: 8,
          font: "Inter"
        },
        analytics: {
          clicks: 0
        }
      }
    ],
    theme: {
      backgroundType: "color",
      backgroundColor: "#ffffff",
      fontFamily: "Inter",
      textColor: "#1f2937",
      buttonStyle: "rounded",
      buttonColor: "#3b82f6",
      buttonTextColor: "#ffffff",
      layout: "center",
      spacing: "normal",
      animations: true
    },
    customization: {
      showProfileViews: true,
      showVerificationBadge: false,
      enableDownloadVCard: false
    },
    social: {
      twitter: "",
      instagram: "",
      linkedin: "",
      github: "",
      youtube: "",
      tiktok: ""
    },
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
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      creator: wallet.address || "",
      views: 0,
      isPublic: true
    }
  })

  const addLink = () => {
    const newLink: ProfileLink = {
      id: Date.now().toString(),
      title: "New Link",
      url: "https://",
      icon: "🔗",
      isActive: true,
      order: profile.links.length + 1,
      style: {
        backgroundColor: "#3b82f6",
        textColor: "#ffffff",
        borderRadius: 8,
        font: "Inter"
      },
      analytics: {
        clicks: 0
      }
    }
    setProfile(prev => ({
      ...prev,
      links: [...prev.links, newLink]
    }))
  }

  const removeLink = (id: string) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.filter(link => link.id !== id)
    }))
  }

  const updateLink = (id: string, field: keyof ProfileLink, value: string | boolean) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(link => 
        link.id === id ? { ...link, [field]: value } : link
      )
    }))
  }

  const updateSocial = (platform: keyof SocialLinks, value: string) => {
    setProfile(prev => ({
      ...prev,
      social: { ...prev.social, [platform]: value }
    }))
  }

  const updateTheme = (field: keyof ProfileTheme, value: string) => {
    setProfile(prev => ({
      ...prev,
      theme: { ...prev.theme, [field]: value }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!wallet.isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!profile.name.trim()) {
      alert('Please enter a profile name')
      return
    }

    setIsLoading(true)
    try {
      const result = await uploadProfile(profile, wallet.address!)
      alert(`Profile created successfully! Transaction ID: ${result.transactionId}`)
      navigate(`/p/${result.transactionId}`)
    } catch (error) {
      console.error('Error creating profile:', error)
      alert('Error creating profile. Please try again.')
    } finally {
      setIsLoading(false)
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
              <button
                onClick={() => navigate('/')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                <ArrowLeft style={{ height: '1rem', width: '1rem' }} />
                Back
              </button>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                {transactionId ? 'Edit Profile' : 'Create Profile'}
              </h1>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Save style={{ height: '1rem', width: '1rem' }} />
              {isLoading ? 'Creating...' : 'Save Profile'}
            </button>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Basic Info Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <User style={{ height: '1.25rem', width: '1.25rem' }} />
              Basic Information
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Profile Name *
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell people about yourself..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <LinkIcon style={{ height: '1.25rem', width: '1.25rem' }} />
              Your Links
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {profile.links.map((link) => (
                <div key={link.id} style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr auto auto', 
                  gap: '0.5rem',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem'
                }}>
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                    placeholder="Link title"
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                    placeholder="https://"
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem'
                    }}
                  />
                  <input
                    type="text"
                    value={link.icon}
                    onChange={(e) => updateLink(link.id, 'icon', e.target.value)}
                    placeholder="🎯"
                    style={{
                      padding: '0.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.25rem',
                      width: '60px'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeLink(link.id)}
                    style={{
                      padding: '0.5rem',
                      border: 'none',
                      background: '#ef4444',
                      color: 'white',
                      borderRadius: '0.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 style={{ height: '1rem', width: '1rem' }} />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  border: '1px dashed #d1d5db',
                  background: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                <Plus style={{ height: '1rem', width: '1rem' }} />
                Add Link
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Globe style={{ height: '1.25rem', width: '1.25rem' }} />
              Social Media
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {Object.entries(profile.social).map(([platform, value]) => (
                <div key={platform}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', textTransform: 'capitalize' }}>
                    {platform}
                  </label>
                  <input
                    type="url"
                    value={value}
                    onChange={(e) => updateSocial(platform as keyof SocialLinks, e.target.value)}
                    placeholder={`https://${platform}.com/username`}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Theme Section */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Palette style={{ height: '1.25rem', width: '1.25rem' }} />
              Theme & Appearance
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Button Color
                </label>
                <input
                  type="color"
                  value={profile.theme.buttonColor}
                  onChange={(e) => updateTheme('buttonColor', e.target.value)}
                  style={{ width: '100%', height: '40px' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Background Color
                </label>
                <input
                  type="color"
                  value={profile.theme.backgroundColor}
                  onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                  style={{ width: '100%', height: '40px' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Text Color
                </label>
                <input
                  type="color"
                  value={profile.theme.textColor}
                  onChange={(e) => updateTheme('textColor', e.target.value)}
                  style={{ width: '100%', height: '40px' }}
                />
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="card">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Settings style={{ height: '1.25rem', width: '1.25rem' }} />
              Settings
            </h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={profile.settings.isPublic}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    settings: { ...prev.settings, isPublic: e.target.checked }
                  }))}
                />
                Make profile public
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={profile.settings.enableAnalytics}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    settings: { ...prev.settings, enableAnalytics: e.target.checked }
                  }))}
                />
                Enable analytics
              </label>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Create 