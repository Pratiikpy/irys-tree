import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Eye, Heart, TrendingUp, Users, Globe, Calendar, BarChart3 } from 'lucide-react'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { useIrys } from '@/contexts/IrysContext'
import { IrysProfile, AnalyticsData } from '@/types'

const Analytics: React.FC = () => {
  const { transactionId } = useParams()
  const { getAnalytics } = useAnalytics()
  const { fetchProfile } = useIrys()
  
  const [profile, setProfile] = useState<IrysProfile | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    if (!transactionId) {
      setError('No transaction ID provided')
      setIsLoading(false)
      return
    }

    const loadData = async () => {
      try {
        setIsLoading(true)
        
        // Load profile
        const profileData = await fetchProfile(transactionId)
        setProfile(profileData)
        
        // Load analytics
        const analyticsData = await getAnalytics(transactionId)
        setAnalytics(analyticsData)
        
      } catch (err) {
        console.error('Error loading analytics:', err)
        setError('Could not load analytics data')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [transactionId, fetchProfile, getAnalytics])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getClickThroughRate = () => {
    if (!analytics || analytics.totalViews === 0) return 0
    return ((analytics.totalClicks / analytics.totalViews) * 100).toFixed(1)
  }

  const getTopLinks = () => {
    if (!profile) return []
    return profile.links
      .map(link => ({
        title: link.title,
        clicks: link.analytics.clicks,
        url: link.url
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5)
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
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
          <div>Loading analytics...</div>
        </div>
      </div>
    )
  }

  if (error || !profile || !analytics) {
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
          <div>{error || 'Analytics not available'}</div>
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
                to={`/p/${transactionId}`}
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
                Back to Profile
              </Link>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                Analytics - {profile.name}
              </h1>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['7d', '30d', '90d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: timeRange === range ? 'none' : '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    background: timeRange === range ? '#3b82f6' : 'white',
                    color: timeRange === range ? 'white' : '#6b7280',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Overview Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2rem'
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
                <Eye style={{ height: '1.5rem', width: '1.5rem', color: '#3b82f6' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {formatNumber(analytics.totalViews)}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total Views</div>
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
                <Heart style={{ height: '1.5rem', width: '1.5rem', color: '#f59e0b' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {formatNumber(analytics.totalClicks)}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total Clicks</div>
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
                <TrendingUp style={{ height: '1.5rem', width: '1.5rem', color: '#10b981' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {getClickThroughRate()}%
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Click Rate</div>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: '#f3e8ff',
                margin: '0 auto 1rem'
              }}>
                <Users style={{ height: '1.5rem', width: '1.5rem', color: '#8b5cf6' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {formatNumber(analytics.uniqueVisitors)}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Unique Visitors</div>
            </div>
          </div>

          {/* Charts Section */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            
            {/* Views Over Time */}
            <div className="card">
              <h3 style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                <Calendar style={{ height: '1.25rem', width: '1.25rem' }} />
                Views Over Time
              </h3>
              
              <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '0.5rem' }}>
                {analytics.viewsOverTime.slice(-7).map((data, index) => {
                  const maxViews = Math.max(...analytics.viewsOverTime.map(d => d.views))
                  const height = maxViews > 0 ? (data.views / maxViews) * 100 : 0
                  
                  return (
                    <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{
                        width: '100%',
                        height: `${height}%`,
                        background: 'linear-gradient(to top, #3b82f6, #8b5cf6)',
                        borderRadius: '0.25rem',
                        minHeight: '4px'
                      }} />
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: '#6b7280', 
                        marginTop: '0.5rem',
                        textAlign: 'center'
                      }}>
                        {data.date}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Top Links */}
            <div className="card">
              <h3 style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                <BarChart3 style={{ height: '1.25rem', width: '1.25rem' }} />
                Top Performing Links
              </h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                {getTopLinks().map((link, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    background: '#f9fafb',
                    borderRadius: '0.375rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                          {link.title}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          {link.url}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '600', color: '#3b82f6' }}>
                        {link.clicks}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        clicks
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem'
          }}>
            
            {/* Locations */}
            <div className="card">
              <h3 style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                <Globe style={{ height: '1.25rem', width: '1.25rem' }} />
                Top Locations
              </h3>
              
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {analytics.locations.slice(0, 5).map((location, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '0.5rem',
                        height: '0.5rem',
                        borderRadius: '50%',
                        background: '#3b82f6'
                      }} />
                      <span>{location.country}</span>
                    </div>
                    <span style={{ fontWeight: '500' }}>{location.views}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Referrers */}
            <div className="card">
              <h3 style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginBottom: '1.5rem',
                fontSize: '1.125rem',
                fontWeight: '600'
              }}>
                <BarChart3 style={{ height: '1.25rem', width: '1.25rem' }} />
                Traffic Sources
              </h3>
              
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {analytics.referrers.slice(0, 5).map((referrer, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '0.5rem',
                        height: '0.5rem',
                        borderRadius: '50%',
                        background: '#8b5cf6'
                      }} />
                      <span>{referrer.source}</span>
                    </div>
                    <span style={{ fontWeight: '500' }}>{referrer.views}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Analytics 