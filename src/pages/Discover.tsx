import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, Heart, Calendar, User } from 'lucide-react'
import { SearchResult } from '@/types'

const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'recent' | 'popular'>('all')

  // Mock search function - in real implementation, this would query Irys
  const searchProfiles = async (query: string) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    const mockResults: SearchResult[] = [
      {
        transactionId: 'mock_tx_123456789',
        profile: {
          version: '1.0',
          name: 'John Doe',
          username: 'johndoe',
          bio: 'Digital creator and web3 enthusiast',
          avatar: '',
          links: [
            {
              id: '1',
              title: 'My Website',
              url: 'https://example.com',
              icon: '🌐',
              isActive: true,
              order: 1,
              style: { backgroundColor: '#3b82f6', textColor: '#ffffff', borderRadius: 8, font: 'Inter' },
              analytics: { clicks: 45 },
            },
          ],
          theme: {
            backgroundType: 'color',
            backgroundColor: '#ffffff',
            fontFamily: 'Inter',
            textColor: '#1f2937',
            buttonStyle: 'rounded',
            buttonColor: '#3b82f6',
            buttonTextColor: '#ffffff',
            layout: 'center',
            spacing: 'normal',
            animations: true,
          },
          customization: { showProfileViews: true, showVerificationBadge: false, enableDownloadVCard: false },
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
            ageRestricted: false,
          },
          metadata: {
            createdAt: Date.now() - 86400000,
            updatedAt: Date.now() - 86400000,
            creator: '0x1234567890123456789012345678901234567890',
            views: 1234,
            isPublic: true,
          },
        },
        timestamp: Date.now() - 86400000,
        tags: [
          { name: 'Name', value: 'John Doe' },
          { name: 'Category', value: 'developer' },
        ],
      },
    ]

    const filteredResults = mockResults.filter((result) =>
      result.profile.name.toLowerCase().includes(query.toLowerCase()) ||
      result.profile.bio.toLowerCase().includes(query.toLowerCase()) ||
      result.tags.some((tag) => tag.value.toLowerCase().includes(query.toLowerCase()))
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
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="container-section h-16 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Discover profiles</h1>
          <Link to="/" className="text-sm text-foreground/70 hover:text-foreground">Home</Link>
        </div>
      </header>

      <main className="container-section py-8">
        {/* Search */}
        <div className="mx-auto max-w-3xl mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border bg-background h-12 pl-10 pr-4 outline-none focus:ring-2 focus:ring-ring"
              placeholder="Search profiles by name, bio, or tags"
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            {(['all', 'recent', 'popular'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-1 border text-foreground/80 ${filter === f ? 'bg-primary/10 border-primary/30' : 'hover:bg-secondary'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mx-auto max-w-3xl">
          {isLoading ? (
            <div className="text-center text-sm text-foreground/70 py-10">Searching profiles…</div>
          ) : results.length === 0 ? (
            <div className="text-center text-sm text-foreground/70 py-10">{searchQuery ? 'No profiles found' : 'Try searching for creators, artists, developers…'}</div>
          ) : (
            <div className="space-y-4">
              {results.map((r) => (
                <div key={r.transactionId} className="card p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center font-semibold">
                        {r.profile.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{r.profile.name}</div>
                        <div className="text-sm text-foreground/60 line-clamp-1">{r.profile.bio}</div>
                      </div>
                    </div>
                    <Link to={`/p/${r.transactionId}`} className="btn btn-primary">View</Link>
                  </div>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-foreground/70">
                    <div className="flex items-center gap-2"><Eye className="h-4 w-4" /> {r.profile.metadata.views} views</div>
                    <div className="flex items-center gap-2"><Heart className="h-4 w-4" /> {getTotalClicks(r.profile)} clicks</div>
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {formatDate(r.timestamp)}</div>
                    <div className="flex items-center gap-2"><User className="h-4 w-4" /> {r.profile.links.length} links</div>
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