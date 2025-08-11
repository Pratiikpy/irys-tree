import React from 'react'
import { IrysProfile } from '@/types'

interface PhonePreviewProps {
  profile: IrysProfile
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ profile }) => {
  return (
    <div className="relative mx-auto w-80">
      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
        {/* Screen */}
        <div 
          className="relative bg-white rounded-[2rem] h-[640px] overflow-hidden"
          style={{ 
            backgroundColor: profile.theme.backgroundColor,
            color: profile.theme.textColor
          }}
        >
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <div className="text-xs font-medium text-black">9:41</div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-black rounded-sm">
                <div className="w-3 h-1 bg-black rounded-sm"></div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-4 text-center">
            {/* Avatar Placeholder */}
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>

            {/* Name */}
            <h1 className="text-xl font-bold mb-2" style={{ color: profile.theme.textColor }}>
              {profile.name || 'Your Name'}
            </h1>

            {/* Username */}
            <p className="text-sm opacity-70 mb-1">
              @{profile.username || 'your-username'}
            </p>

            {/* Bio */}
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              {profile.bio || 'Tell people about yourself...'}
            </p>

            {/* Links */}
            <div className="space-y-3">
              {profile.links.filter(link => link.isActive).map((link) => (
                <div
                  key={link.id}
                  className="p-4 rounded-xl flex items-center justify-between shadow-sm transition-transform hover:scale-[0.98] cursor-pointer"
                  style={{
                    backgroundColor: link.style?.backgroundColor || profile.theme.buttonColor,
                    color: link.style?.textColor || profile.theme.buttonTextColor,
                    borderRadius: `${link.style?.borderRadius || 12}px`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{link.icon || '🔗'}</span>
                    <span className="font-medium">{link.title || 'Link Title'}</span>
                  </div>
                  <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Social Links Preview */}
            {Object.entries(profile.social).some(([_, value]) => value) && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-center gap-4">
                  {Object.entries(profile.social).map(([platform, url]) => {
                    if (!url) return null
                    
                    const getIcon = (platform: string) => {
                      const icons: Record<string, string> = {
                        twitter: '🐦',
                        instagram: '📷',
                        linkedin: '💼',
                        github: '💻',
                        youtube: '📺',
                        tiktok: '🎵'
                      }
                      return icons[platform] || '🔗'
                    }

                    return (
                      <div
                        key={platform}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg cursor-pointer hover:scale-110 transition-transform"
                      >
                        {getIcon(platform)}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-30"></div>
        </div>

        {/* Side buttons */}
        <div className="absolute left-[-2px] top-20 w-1 h-8 bg-gray-900 rounded-l-sm"></div>
        <div className="absolute left-[-2px] top-32 w-1 h-12 bg-gray-900 rounded-l-sm"></div>
        <div className="absolute left-[-2px] top-48 w-1 h-12 bg-gray-900 rounded-l-sm"></div>
        <div className="absolute right-[-2px] top-24 w-1 h-16 bg-gray-900 rounded-r-sm"></div>
      </div>

      {/* Preview Label */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500 font-medium">Live Preview</p>
        <p className="text-xs text-gray-400">See how your profile will look</p>
      </div>
    </div>
  )
}

export default PhonePreview