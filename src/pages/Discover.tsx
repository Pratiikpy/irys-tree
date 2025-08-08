import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, Heart, Calendar, User, Globe } from 'lucide-react'
import { SearchResult } from '@/types'

const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'recent' | 'popular'>('all')

  // Mock search function - in real implementation, this would query Irys
  const searchProfiles = async (query: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock results
    const mockResults: SearchResult[] = [
      {
        transactionId: 'mock_tx_123456789',
        profile: {
          version: "1.0",
          name: "John Doe",
          username: "johndoe",
          bio: "Digital creator and web3 enthusiast",
          avatar: "",
          links: [
            {
              id: "1",
              title: "My Website",
              url: "https://example.com",
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
                clicks: 45
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
          social: {},
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
            createdAt: Date.now() - 86400000,
            updatedAt: Date.now() - 86400000,
            creator: "0x1234567890123456789012345678901234567890",
            views: 1234,
            isPublic: true
          }
        },
        timestamp: Date.now() - 86400000,
        tags: [
          { name: "Name", value: "John Doe" },
          { name: "Category", value: "developer" }
        ]
      },
      {
        transactionId: 'mock_tx_987654321',
        profile: {
          version: "1.0",
          name: "Jane Smith",
          username: "janesmith",
          bio: "Content creator and influencer",
          avatar: "",
          links: [
            {
              id: "1",
              title: "YouTube",
              url: "https://youtube.com/@janesmith",
              icon: "📺",
              isActive: true,
              order: 1,
              style: {
                backgroundColor: "#ff0000",
                textColor: "#ffffff",
                borderRadius: 8,
                font: "Inter"
              },
              analytics: {
                clicks: 89
              }
            }
          ],
          theme: {
            backgroundType: "color",
            backgroundColor: "#ffffff",
            fontFamily: "Inter",
            textColor: "#1f2937",
            buttonStyle: "rounded",
            buttonColor: "#ff0000",
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
          social: {},
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
            createdAt: Date.now() - 172800000,
            updatedAt: Date.now() - 172800000,
            creator: "0xabcdef1234567890abcdef1234567890abcdef12",
            views: 567,
            isPublic: true
          }
        },
        timestamp: Date.now() - 172800000,
        tags: [
          { name: "Name", value: "Sarah Artist" },
          { name: "Category", value: "artist" }
        ]
      }
    ]
    
    // Filter by search query
    const filteredResults = mockResults.filter(result => 
      result.profile.name.toLowerCase().includes(query.toLowerCase()) ||
      result.profile.bio.toLowerCase().includes(query.toLowerCase()) ||
      result.tags.some(tag => tag.value.toLowerCase().includes(query.toLowerCase()))
    )
    
    setResults(filteredResults)
    setIsLoading(false)
  }

  useEffect(() => {
    if (searchQuery.trim()) {
      searchProfiles(searchQuery)
    } else {
      setResults([])
    }
  }, [searchQuery])

  const getTotalClicks = (profile: any) => {
    return profile.links.reduce((sum: number, link: any) => sum + link.analytics.clicks, 0)
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                height: '2rem', 
                width: '2rem', 
                borderRadius: '0.5rem', 
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
              }}></div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                Discover Profiles
              </h1>
            </div>
            
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              textDecoration: 'none',
              color: '#6b7280',
              transition: 'all 0.2s'
            }}>
              <Globe style={{ height: '1rem', width: '1rem' }} />
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        {/* Search Section */}
        <div style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{ 
                  position: 'absolute', 
                  left: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  height: '1rem',
                  width: '1rem',
                  color: '#9ca3af'
                }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search profiles by name, bio, or tags..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    background: 'white'
                  }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['all', 'recent', 'popular'] as const).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: filter === filterType ? 'none' : '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    background: filter === filterType ? '#3b82f6' : 'white',
                    color: filter === filterType ? 'white' : '#6b7280',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    textTransform: 'capitalize'
                  }}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>
          
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}>
            Discover amazing LinkTree profiles stored permanently on Irys blockchain
          </p>
        </div>

        {/* Results */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
              <div>Searching profiles...</div>
            </div>
          ) : results.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
              <div>
                {searchQuery ? 'No profiles found matching your search' : 'Search for profiles to discover'}
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {results.map((result) => (
                <div key={result.transactionId} className="card" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.25rem',
                        fontWeight: 'bold'
                      }}>
                        {result.profile.name.charAt(0)}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                          {result.profile.name}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                          {result.profile.bio}
                        </p>
                      </div>
                    </div>
                    
                    <Link
                      to={`/p/${result.transactionId}`}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#3b82f6',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      View Profile
                    </Link>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <Eye style={{ height: '1rem', width: '1rem' }} />
                      <span>{result.profile.metadata.views} views</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <Heart style={{ height: '1rem', width: '1rem' }} />
                      <span>{getTotalClicks(result.profile)} clicks</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <Calendar style={{ height: '1rem', width: '1rem' }} />
                      <span>{formatDate(result.timestamp)}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <User style={{ height: '1rem', width: '1rem' }} />
                      <span>{result.profile.links.length} links</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {result.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '0.25rem 0.5rem',
                          background: '#f3f4f6',
                          color: '#374151',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        {tag.value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Discover 