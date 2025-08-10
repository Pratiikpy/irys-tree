import React from 'react'
import { Link } from 'react-router-dom'
import { Palette } from 'lucide-react'

const Templates: React.FC = () => {
  const templates = [
    { id: 'creator', name: 'Content Creator', description: 'Perfect for YouTubers and streamers', icon: '🎬', color: '#ec4899', category: 'creator' },
    { id: 'business', name: 'Business Professional', description: 'For entrepreneurs and consultants', icon: '💼', color: '#3b82f6', category: 'business' },
    { id: 'artist', name: 'Artist & Designer', description: 'Showcase your portfolio', icon: '🎨', color: '#8b5cf6', category: 'artist' },
    { id: 'developer', name: 'Developer', description: 'For developers and makers', icon: '💻', color: '#10b981', category: 'developer' },
    { id: 'musician', name: 'Musician', description: 'Share your music and tours', icon: '🎵', color: '#f59e0b', category: 'musician' },
    { id: 'influencer', name: 'Influencer', description: 'Connect across all platforms', icon: '⭐', color: '#ef4444', category: 'influencer' },
  ]

  return (
    <div className="bg-background min-h-screen">
      <section className="container-section py-10">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Choose a template</h1>
          <p className="mt-2 text-foreground/70">Start with a clean preset and customize it to match your brand.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <div key={t.id} className="card p-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl grid place-items-center text-2xl" style={{ background: t.color }}>{t.icon}</div>
                <div>
                  <div className="font-semibold text-lg">{t.name}</div>
                  <div className="text-sm text-foreground/60">{t.description}</div>
                </div>
              </div>
              <div className="mt-3">
                <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ background: t.color }}>{t.category}</span>
              </div>
              <Link to={`/create?template=${t.id}`} className="btn btn-primary w-full mt-5">Use this template</Link>
            </div>
          ))}
        </div>

        <div className="card p-8 mt-10 text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl grid place-items-center bg-secondary"><Palette className="h-8 w-8 text-foreground/70" /></div>
          <h2 className="text-xl font-semibold mt-4">Start from scratch</h2>
          <p className="text-foreground/70 mt-2">Prefer building your own style? Create a page from a blank canvas.</p>
          <Link to="/create" className="btn border mt-4">Create custom</Link>
        </div>
      </section>
    </div>
  )
}

export default Templates