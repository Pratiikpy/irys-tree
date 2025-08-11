import React from 'react'
import { useLocation } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

const SITE_ROUTES = new Set(['', 'discover', 'create', 'settings', 'templates', 'help', 'verify', 'analytics'])

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation()
  const first = pathname.split('/')[1] || ''
  const showChrome = SITE_ROUTES.has(first)

  return (
    <div className="min-h-screen flex flex-col">
      {showChrome && <SiteHeader />}
      <main className="flex-1">{children}</main>
      {showChrome && <SiteFooter />}
    </div>
  )
}