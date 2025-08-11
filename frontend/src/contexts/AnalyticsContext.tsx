import React, { createContext, useContext, useState } from 'react'
import { AnalyticsData } from '@/types'

interface AnalyticsContextType {
  trackProfileView: (transactionId: string) => Promise<void>
  trackLinkClick: (transactionId: string, linkId: string) => Promise<void>
  getAnalytics: (transactionId: string) => Promise<AnalyticsData | null>
  analytics: Record<string, AnalyticsData>
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [analytics, setAnalytics] = useState<Record<string, AnalyticsData>>({})

  // Track profile view
  const trackProfileView = async (transactionId: string) => {
    try {
      // Store in localStorage for privacy
      const views = JSON.parse(localStorage.getItem('profileViews') || '{}')
      views[transactionId] = (views[transactionId] || 0) + 1
      localStorage.setItem('profileViews', JSON.stringify(views))

      // Update analytics state
      setAnalytics(prev => {
        const current = prev[transactionId] || {
          totalViews: 0,
          totalClicks: 0,
          clickThroughRate: 0,
          uniqueVisitors: 0,
          viewsOverTime: [],
          topLinks: [],
          locations: [],
          referrers: []
        }

        return {
          ...prev,
          [transactionId]: {
            ...current,
            totalViews: current.totalViews + 1,
            viewsOverTime: [
              ...current.viewsOverTime,
              { date: new Date().toISOString().split('T')[0], views: 1 }
            ]
          }
        }
      })

      // Optionally upload analytics to Irys with different tags
      // This would be implemented with the Irys uploader
      console.log('Profile view tracked:', transactionId)

    } catch (error) {
      console.error('Error tracking profile view:', error)
    }
  }

  // Track link click
  const trackLinkClick = async (transactionId: string, linkId: string) => {
    try {
      // Store in localStorage for privacy
      const clicks = JSON.parse(localStorage.getItem('linkClicks') || '{}')
      const key = `${transactionId}-${linkId}`
      clicks[key] = (clicks[key] || 0) + 1
      localStorage.setItem('linkClicks', JSON.stringify(clicks))

      // Update analytics state
      setAnalytics(prev => {
        const current = prev[transactionId] || {
          totalViews: 0,
          totalClicks: 0,
          clickThroughRate: 0,
          uniqueVisitors: 0,
          viewsOverTime: [],
          topLinks: [],
          locations: [],
          referrers: []
        }

        const updatedTopLinks = [...current.topLinks]
        const existingLinkIndex = updatedTopLinks.findIndex(link => link.title === linkId)
        
        if (existingLinkIndex >= 0) {
          updatedTopLinks[existingLinkIndex].clicks += 1
        } else {
          updatedTopLinks.push({ title: linkId, clicks: 1 })
        }

        const totalClicks = current.totalClicks + 1
        const clickThroughRate = current.totalViews > 0 ? (totalClicks / current.totalViews) * 100 : 0

        return {
          ...prev,
          [transactionId]: {
            ...current,
            totalClicks,
            clickThroughRate,
            topLinks: updatedTopLinks.sort((a, b) => b.clicks - a.clicks)
          }
        }
      })

      console.log('Link click tracked:', { transactionId, linkId })

    } catch (error) {
      console.error('Error tracking link click:', error)
    }
  }

  // Get analytics for a profile
  const getAnalytics = async (transactionId: string): Promise<AnalyticsData | null> => {
    try {
      // Get from state first
      if (analytics[transactionId]) {
        return analytics[transactionId]
      }

      // Get from localStorage
      const views = JSON.parse(localStorage.getItem('profileViews') || '{}')
      const clicks = JSON.parse(localStorage.getItem('linkClicks') || '{}')

      const totalViews = views[transactionId] || 0
      const totalClicks = Object.keys(clicks)
        .filter(key => key.startsWith(transactionId))
        .reduce((sum, key) => sum + (clicks[key] || 0), 0)

      const clickThroughRate = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0

      // Get top links
      const linkClicks = Object.keys(clicks)
        .filter(key => key.startsWith(transactionId))
        .map(key => ({
          title: key.split('-')[1],
          clicks: clicks[key] || 0
        }))
        .sort((a, b) => b.clicks - a.clicks)

      const analyticsData: AnalyticsData = {
        totalViews,
        totalClicks,
        clickThroughRate,
        uniqueVisitors: totalViews, // Simplified for now
        viewsOverTime: [
          { date: new Date().toISOString().split('T')[0], views: totalViews }
        ],
        topLinks: linkClicks,
        locations: [],
        referrers: []
      }

      // Update state
      setAnalytics(prev => ({
        ...prev,
        [transactionId]: analyticsData
      }))

      return analyticsData

    } catch (error) {
      console.error('Error getting analytics:', error)
      return null
    }
  }

  const value: AnalyticsContextType = {
    trackProfileView,
    trackLinkClick,
    getAnalytics,
    analytics
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
} 