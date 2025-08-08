import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Palette } from 'lucide-react'

const Templates: React.FC = () => {
  const templates = [
    {
      id: 'creator',
      name: 'Content Creator',
      description: 'Perfect for YouTubers, streamers, and social media influencers',
      icon: '🎬',
      color: '#ec4899',
      category: 'creator'
    },
    {
      id: 'business',
      name: 'Business Professional',
      description: 'Ideal for entrepreneurs, consultants, and business owners',
      icon: '💼',
      color: '#3b82f6',
      category: 'business'
    },
    {
      id: 'artist',
      name: 'Artist & Designer',
      description: 'Showcase your portfolio and creative work beautifully',
      icon: '🎨',
      color: '#8b5cf6',
      category: 'artist'
    },
    {
      id: 'developer',
      name: 'Developer',
      description: 'Perfect for developers, programmers, and tech professionals',
      icon: '💻',
      color: '#10b981',
      category: 'developer'
    },
    {
      id: 'musician',
      name: 'Musician',
      description: 'Share your music, performances, and streaming links',
      icon: '🎵',
      color: '#f59e0b',
      category: 'musician'
    },
    {
      id: 'influencer',
      name: 'Influencer',
      description: 'Connect with your audience across all platforms',
      icon: '⭐',
      color: '#ef4444',
      category: 'influencer'
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
                Templates
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: 'white',
              marginBottom: '1rem'
            }}>
              Choose Your Template
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Start with a professionally designed template and customize it to match your brand
            </p>
          </div>

          {/* Templates Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem'
          }}>
            {templates.map((template) => (
              <div key={template.id} className="card" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '1rem',
                    background: template.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>
                    {template.icon}
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      {template.name}
                    </h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {template.description}
                    </p>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: template.color,
                    color: 'white',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {template.category}
                  </span>
                </div>

                <Link
                  to={`/create?template=${template.id}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: template.color,
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  Use This Template
                </Link>
              </div>
            ))}
          </div>

          {/* Custom Template */}
          <div className="card" style={{ 
            marginTop: '3rem',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '2px dashed #d1d5db',
            textAlign: 'center'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
              borderRadius: '1rem',
              background: '#f3f4f6',
              margin: '0 auto 1rem'
            }}>
              <Palette style={{ height: '2rem', width: '2rem', color: '#6b7280' }} />
            </div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              Start from Scratch
            </h3>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280',
              marginBottom: '1.5rem'
            }}>
              Create a completely custom design with our powerful editor
            </p>
            <Link
              to="/create"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: '#6b7280',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500'
              }}
            >
              Create Custom Template
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Templates 