import React from 'react'
import { IrysProfile } from '@/types'

function hexToRgb(hex: string) {
  if (!hex) return { r: 0, g: 0, b: 0 }
  let c = hex.trim()
  if (c.startsWith('rgb')) {
    const m = c.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i)
    if (m) return { r: +m[1], g: +m[2], b: +m[3] }
  }
  if (c.startsWith('#')) c = c.slice(1)
  if (c.length === 3) c = c.split('').map(x => x + x).join('')
  const num = parseInt(c, 16)
  if (Number.isNaN(num)) return { r: 0, g: 0, b: 0 }
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function luminance({ r, g, b }: { r: number; g: number; b: number }) {
  const a = [r, g, b].map(v => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

function contrastRatio(fg: string, bg: string) {
  const L1 = luminance(hexToRgb(fg))
  const L2 = luminance(hexToRgb(bg))
  const [light, dark] = L1 > L2 ? [L1, L2] : [L2, L1]
  return (light + 0.05) / (dark + 0.05)
}

function ensureContrast(desired: string | undefined, background: string, fallbackLight = '#f9fafb', fallbackDark = '#111827') {
  const bg = background || '#ffffff'
  const want = desired || fallbackDark
  try {
    const ratio = contrastRatio(want, bg)
    if (ratio >= 4.5) return want
    // choose better of black/white
    const whiteRatio = contrastRatio('#ffffff', bg)
    const blackRatio = contrastRatio('#000000', bg)
    return whiteRatio >= blackRatio ? '#ffffff' : '#000000'
  } catch {
    return fallbackDark
  }
}

interface PhonePreviewProps {
  profile: IrysProfile
}

const PhonePreview: React.FC<PhonePreviewProps> = ({ profile }) => {
  const theme = profile.theme
  const bg = theme.backgroundColor || '#ffffff'
  const safeText = ensureContrast(theme.textColor, bg)

  return (
    <div className="w-full flex items-start justify-center">
      <div className="relative rounded-[2.5rem] border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-xl w-[360px] max-w-full overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-40 bg-black/80 dark:bg-black rounded-b-2xl z-10" />

        <div className="pt-8 pb-10 px-5" style={{ background: bg }}>
          {/* Header */}
          <div className="text-center">
            {profile.avatar && (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="mx-auto h-20 w-20 rounded-full object-cover border"
              />
            )}
            <h3 className="mt-3 text-xl font-bold" style={{ color: safeText, backgroundColor: 'transparent' }}>{profile.name || 'Your name'}</h3>
            {profile.username && (
              <div className="mt-0.5 text-sm opacity-80" style={{ color: safeText, backgroundColor: 'transparent' }}>@{profile.username}</div>
            )}
            {profile.bio && (
              <p className="mt-3 text-sm opacity-90" style={{ color: safeText, backgroundColor: 'transparent' }}>{profile.bio}</p>
            )}
          </div>

          {/* Links */}
          <div className="mt-6 space-y-3">
            {profile.links.filter(l => l.isActive).sort((a, b) => a.order - b.order).map(link => {
              const linkBg = link.style?.backgroundColor || theme.buttonColor
              const desiredText = link.style?.textColor || theme.buttonTextColor
              const safeLinkText = ensureContrast(desiredText, linkBg)
              return (
                <div
                  key={link.id}
                  className="w-full h-12 rounded-2xl flex items-center justify-between px-4 border"
                  style={{
                    background: linkBg,
                    color: safeLinkText,
                    borderColor: theme.buttonBorderColor || 'transparent'
                  }}
                >
                  <div className="flex items-center gap-3">
                    {link.icon && <span className="text-xl" style={{ backgroundColor: 'transparent' }}>{link.icon}</span>}
                    <span className="font-medium" style={{ backgroundColor: 'transparent' }}>{link.title}</span>
                  </div>
                  <span className="text-xs opacity-80" style={{ backgroundColor: 'transparent' }}>Preview</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhonePreview