import React from 'react'
import { IrysProfile } from '@/types'

interface PhonePreviewProps {
  profile: IrysProfile
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ profile }) => {
  const theme = profile.theme

  return (
    <div className="w-full flex items-start justify-center">
      <div className="relative rounded-[2.5rem] border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-xl w-[360px] max-w-full overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 bg-black/80 dark:bg-black rounded-b-2xl z-10" />

        <div className="pt-8 pb-10 px-5">
          {/* Header */}
          <div className="text-center">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="mx-auto h-20 w-20 rounded-full object-cover border"
              />
            )}
            <h3 className="mt-3 text-xl font-bold" style={{ color: theme.textColor }}>{profile.name || 'Your name'}</h3>
            {profile.username && (
              <div className="mt-0.5 text-sm opacity-70" style={{ color: theme.textColor }}>@{profile.username}</div>
            )}
            {profile.bio && (
              <p className="mt-3 text-sm opacity-80" style={{ color: theme.textColor }}>{profile.bio}</p>
            )}
          </div>

          {/* Links */}
          <div className="mt-6 space-y-3">
            {profile.links.filter(l => l.isActive).sort((a, b) => a.order - b.order).map(link => (
              <div
                key={link.id}
                className="w-full h-12 rounded-2xl flex items-center justify-between px-4 border"
                style={{
                  background: theme.buttonColor,
                  color: theme.buttonTextColor,
                  borderColor: theme.buttonBorderColor || 'transparent'
                }}
              >
                <div className="flex items-center gap-3">
                  {link.icon && <span className="text-xl">{link.icon}</span>}
                  <span className="font-medium">{link.title}</span>
                </div>
                <span className="text-xs opacity-80">Preview</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhonePreview