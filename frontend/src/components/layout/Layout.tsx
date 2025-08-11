import React from 'react'
import { useLocation } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

const SITE_ROUTES = new Set(['', 'discover', 'create', 'settings', 'templates', 'help', 'verify', 'analytics'])

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation()
  const first = pathname.split('/')[1] || ''
  const showChrome = SITE_ROUTES.has(first)

  // Subtle, aesthetic background image across the app
  const bgUrl = "https://irys-xyz.notion.site/image/attachment%3Aabfe4386-4462-4981-855e-91a5a4b0ce3a%3AFrame_48096688.png?table=block&id=199e9455-e498-80bc-be21-ec03d178d258&spaceId=805c8ee6-d632-43a5-bb85-5b1e2e4a9000&width=1310&userId=&cache=v2"

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Decorative background (non-interactive) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Ambient blobs for a cool, soft glow */}
        <div className="ambient-bg">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="blob blob-3" />
        </div>
        {/* Image layer */}
        <div
          className="absolute inset-0"
          style={{
            // Prefer locally hosted asset if present; gracefully fallback to remote
            backgroundImage: `url('/irys-bg.png'), url('${bgUrl}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.06,
            filter: 'blur(1.5px)'
          }}
        />
        {/* Gradient wash to keep content readable in both themes */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/88 to-background" />
      </div>

      {showChrome && <SiteHeader />}
      <main className="flex-1">{children}</main>
      {showChrome && <SiteFooter />}
    </div>
  )
}