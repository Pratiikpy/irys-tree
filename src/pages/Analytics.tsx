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
        const profileData = await fetchProfile(transactionId)
        setProfile(profileData)
        const analyticsData = await getAnalytics(transactionId)
        setAnalytics(analyticsData)
      } catch (err) {
        setError('Could not load analytics data')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [transactionId, fetchProfile, getAnalytics])

  const formatNumber = (num: number) => (num >= 1000000 ? (num / 1000000).toFixed(1) + 'M' : num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString())
  const getClickThroughRate = () => (analytics && analytics.totalViews > 0 ? ((analytics.totalClicks / analytics.totalViews) * 100).toFixed(1) : '0')
  const getTopLinks = () => (profile ? profile.links.map(l => ({ title: l.title, clicks: l.analytics.clicks, url: l.url })).sort((a, b) => b.clicks - a.clicks).slice(0, 5) : [])

  if (isLoading) {
    return <div className="min-h-screen grid place-items-center bg-background text-foreground/70">Loading analytics…</div>
  }

  if (error || !profile || !analytics) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-4">
        <div className="text-center">
          <div className="text-2xl mb-2">❌</div>
          <div className="text-foreground/80">{error || 'Analytics not available'}</div>
          <Link to="/" className="btn border mt-4">Go home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container-section h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to={`/p/${transactionId}`} className="text-sm text-foreground/70 hover:text-foreground flex items-center gap-1"><ArrowLeft className="h-4 w-4" /> Back to profile</Link>
            <h1 className="text-lg font-semibold">Analytics — {profile.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button key={range} onClick={() => setTimeRange(range)} className={`rounded-xl px-3 py-1 border text-sm ${timeRange === range ? 'bg-primary/10 border-primary/30' : 'hover:bg-secondary'}`}>{range}</button>
            ))}
          </div>
        </div>
      </header>

      <main className="container-section py-8">
        {/* Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card p-5 text-center">
            <div className="mx-auto h-10 w-10 rounded-full grid place-items-center bg-blue-100 text-blue-700 mb-3"><Eye className="h-5 w-5" /></div>
            <div className="text-3xl font-bold">{formatNumber(analytics.totalViews)}</div>
            <div className="text-sm text-foreground/60">Total views</div>
          </div>
          <div className="card p-5 text-center">
            <div className="mx-auto h-10 w-10 rounded-full grid place-items-center bg-amber-100 text-amber-700 mb-3"><Heart className="h-5 w-5" /></div>
            <div className="text-3xl font-bold">{formatNumber(analytics.totalClicks)}</div>
            <div className="text-sm text-foreground/60">Total clicks</div>
          </div>
          <div className="card p-5 text-center">
            <div className="mx-auto h-10 w-10 rounded-full grid place-items-center bg-emerald-100 text-emerald-700 mb-3"><TrendingUp className="h-5 w-5" /></div>
            <div className="text-3xl font-bold">{getClickThroughRate()}%</div>
            <div className="text-sm text-foreground/60">Click rate</div>
          </div>
          <div className="card p-5 text-center">
            <div className="mx-auto h-10 w-10 rounded-full grid place-items-center bg-violet-100 text-violet-700 mb-3"><Users className="h-5 w-5" /></div>
            <div className="text-3xl font-bold">{formatNumber(analytics.uniqueVisitors)}</div>
            <div className="text-sm text-foreground/60">Unique visitors</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Calendar className="h-4 w-4" /> Views over time</h3>
            <div className="h-48 flex items-end gap-2">
              {analytics.viewsOverTime.slice(-7).map((d, i) => {
                const max = Math.max(...analytics.viewsOverTime.map(v => v.views)) || 1
                const h = (d.views / max) * 100
                return (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full rounded bg-gradient-to-t from-blue-500 to-violet-500" style={{ height: `${Math.max(h, 4)}%` }} />
                    <div className="mt-1 text-[10px] text-foreground/60">{d.date}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Top links</h3>
            <div className="space-y-2">
              {getTopLinks().map((l, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full grid place-items-center bg-secondary font-semibold">{i + 1}</div>
                    <div>
                      <div className="font-medium">{l.title}</div>
                      <div className="text-xs text-foreground/60 break-all">{l.url}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-blue-600">{l.clicks}</div>
                    <div className="text-xs text-foreground/60">clicks</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Globe className="h-4 w-4" /> Top locations</h3>
            <div className="space-y-2 text-sm">
              {analytics.locations.slice(0, 5).map((loc, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" /> {loc.country}
                  </div>
                  <span className="font-medium">{loc.views}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Traffic sources</h3>
            <div className="space-y-2 text-sm">
              {analytics.referrers.slice(0, 5).map((ref, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-violet-500" /> {ref.source}
                  </div>
                  <span className="font-medium">{ref.views}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Analytics