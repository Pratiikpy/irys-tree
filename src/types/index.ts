// Core Profile Types
export interface IrysProfile {
  version: "1.0";
  // Basic Info
  name: string;
  bio: string;
  avatar?: string; // base64 or IPFS hash
  
  // Links (Main Feature)
  links: ProfileLink[];
  
  // Appearance & Theming
  theme: ProfileTheme;
  customization: ProfileCustomization;
  
  // Social Media
  social: SocialLinks;
  
  // Settings
  settings: ProfileSettings;
  
  // Metadata
  metadata: {
    createdAt: number;
    updatedAt: number;
    creator: string; // wallet address
    views: number;
    isPublic: boolean;
  };
}

export interface ProfileLink {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon: string;
  isActive: boolean;
  order: number;
  style: LinkStyle;
  animation?: string;
  schedule?: LinkSchedule;
  analytics: {
    clicks: number;
    lastClicked?: number;
  };
}

export interface LinkStyle {
  backgroundColor: string;
  textColor: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius: number;
  shadow?: string;
  font?: string;
}

export interface LinkSchedule {
  enabled: boolean;
  startDate?: Date;
  endDate?: Date;
  timezone?: string;
}

export interface ProfileTheme {
  // Background
  backgroundType: 'color' | 'gradient' | 'image' | 'video';
  backgroundColor?: string;
  backgroundGradient?: {
    type: 'linear' | 'radial';
    colors: string[];
    direction?: string;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  
  // Typography
  fontFamily: string;
  textColor: string;
  
  // Button Styles
  buttonStyle: 'rounded' | 'square' | 'pill';
  buttonColor: string;
  buttonTextColor: string;
  buttonBorderColor?: string;
  
  // Layout
  layout: 'center' | 'left' | 'right';
  spacing: 'compact' | 'normal' | 'relaxed';
  
  // Effects
  animations: boolean;
  musicUrl?: string; // Background music
}

export interface ProfileCustomization {
  // Custom CSS
  customCSS?: string;
  
  // Advanced Settings
  showProfileViews: boolean;
  showVerificationBadge: boolean;
  enableDownloadVCard: boolean;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
}

export interface SocialLinks {
  twitter?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  linkedin?: string;
  github?: string;
  discord?: string;
  telegram?: string;
  snapchat?: string;
  twitch?: string;
  pinterest?: string;
  facebook?: string;
  spotify?: string;
  soundcloud?: string;
  email?: string;
  phone?: string;
}

export interface ProfileSettings {
  isPublic: boolean;
  allowSearch: boolean;
  enableAnalytics: boolean;
  enableComments: boolean;
  moderateComments: boolean;
  enableSharing: boolean;
  enableDownloads: boolean;
  passwordProtected: boolean;
  password?: string;
  ageRestricted: boolean;
  minimumAge?: number;
}

// Wallet Types
export interface WalletState {
  isConnected: boolean;
  address?: string;
  provider?: any;
  chainId?: number;
  balance?: string;
}

// Irys Types
export interface IrysState {
  uploader?: any;
  isConnected: boolean;
  balance?: string;
  isUploading: boolean;
}

// Analytics Types
export interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  clickThroughRate: number;
  uniqueVisitors: number;
  viewsOverTime: Array<{ date: string; views: number }>;
  topLinks: Array<{ title: string; clicks: number }>;
  locations: Array<{ country: string; views: number }>;
  referrers: Array<{ source: string; views: number }>;
}

// Error Types
export enum ErrorType {
  WALLET_NOT_CONNECTED = "WALLET_NOT_CONNECTED",
  INSUFFICIENT_BALANCE = "INSUFFICIENT_BALANCE",
  UPLOAD_FAILED = "UPLOAD_FAILED",
  PROFILE_NOT_FOUND = "PROFILE_NOT_FOUND",
  INVALID_DATA = "INVALID_DATA",
  NETWORK_ERROR = "NETWORK_ERROR"
}

export interface AppError {
  type: ErrorType;
  message: string;
  details?: any;
}

// UI Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

// Template Types
export interface ProfileTemplate {
  id: string;
  name: string;
  description: string;
  category: 'creator' | 'business' | 'artist' | 'developer' | 'influencer';
  theme: ProfileTheme;
  defaultLinks: Omit<ProfileLink, 'id' | 'analytics'>[];
  preview: string;
}

// Search Types
export interface SearchResult {
  transactionId: string;
  profile: IrysProfile;
  timestamp: number;
  tags: Array<{ name: string; value: string }>;
}

// Form Types
export interface ProfileFormData {
  name: string;
  bio: string;
  avatar?: File;
  links: Omit<ProfileLink, 'id' | 'analytics'>[];
  theme: ProfileTheme;
  social: SocialLinks;
  settings: ProfileSettings;
} 