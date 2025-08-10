import React from 'react'
import { Link } from 'react-router-dom'

export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t mt-20">
      <div className="container-section py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-foreground/70">
          <div className="h-5 w-5 rounded-md bg-primary" />
          <span>© {new Date().getFullYear()} irystree</span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="text-foreground/70 hover:text-foreground" to="/discover">Discover</Link>
          <Link className="text-foreground/70 hover:text-foreground" to="/templates">Templates</Link>
          <Link className="text-foreground/70 hover:text-foreground" to="/help">Help</Link>
        </nav>
      </div>
    </footer>
  )
}