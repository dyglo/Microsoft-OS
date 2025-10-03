// Type definitions for Step 3 & 4 enhancements

// ============================================
// Step 3: Start Menu Enhancements
// ============================================

export interface PowerOption {
  id: 'lock' | 'sleep' | 'shutdown' | 'restart';
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastLogin: Date;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'app' | 'file' | 'folder' | 'setting';
  icon: React.ReactNode;
  description?: string;
  path?: string;
  action: () => void;
  relevance: number; // For sorting results
}

export interface RecentItem {
  id: string;
  title: string;
  type: 'file' | 'app' | 'folder';
  icon: React.ReactNode;
  subtitle: string; // e.g., "5m ago", "Recently opened"
  timestamp: number;
  path?: string;
  appId?: string;
}

export type SystemState = 'active' | 'locked' | 'sleeping' | 'shutting-down' | 'restarting';

// ============================================
// Step 4: Widgets Panel Enhancements
// ============================================

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  weatherCode: string; // e.g., "01d" for sunny
  windSpeed: number;
  humidity: number;
  feelsLike: number;
  icon: string;
  lastUpdated: Date;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  url: string;
  publishedAt: Date;
  category?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string; // e.g., "2:00 PM"
  endTime?: string;
  category: 'work' | 'personal' | 'reminder' | 'meeting';
  color: string;
  description?: string;
  location?: string;
  completed: boolean;
  reminder?: number; // Minutes before event
  recurring?: 'none' | 'daily' | 'weekly' | 'monthly';
}

export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap?: number;
  volume24h?: number;
  lastUpdated: Date;
}

export interface EmailNotification {
  id: string;
  subject: string;
  sender: string;
  senderEmail: string;
  preview: string;
  timestamp: Date;
  read: boolean;
  important: boolean;
  hasAttachment: boolean;
}

export interface Widget {
  id: string;
  type: 'calendar' | 'email' | 'news' | 'weather' | 'crypto' | 'security' | 'netflix' | 'custom';
  enabled: boolean;
  order: number;
  size: 'small' | 'medium' | 'large';
  settings?: Record<string, any>;
}

export interface WidgetLayout {
  widgets: Widget[];
  lastModified: Date;
}

// ============================================
// API Response Types
// ============================================

export interface OpenWeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  dt: number;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }>;
}

export interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
    usd_market_cap?: number;
    usd_24h_vol?: number;
  };
}

// ============================================
// Storage Types
// ============================================

export interface StorageData {
  desktopIcons: any[];
  wallpaper: string;
  theme: 'light' | 'dark';
  recentItems: RecentItem[];
  calendarEvents: CalendarEvent[];
  widgetLayout: WidgetLayout;
  emailNotifications: EmailNotification[];
  userProfile: UserProfile;
  systemState: SystemState;
  lastSession: Date;
}

// ============================================
// Component Props
// ============================================

export interface PowerOptionsPanelProps {
  onLock: () => void;
  onSleep: () => void;
  onShutdown: () => void;
  onRestart: () => void;
}

export interface WeatherWidgetProps {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  onLocationChange: (location: string) => void;
  onRefresh: () => void;
}

export interface CalendarWidgetProps {
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  onEditEvent: (id: string, event: Partial<CalendarEvent>) => void;
  onDeleteEvent: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export interface NewsWidgetProps {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onCategoryChange?: (category: string) => void;
}

export interface CryptoWidgetProps {
  cryptoData: CryptoData[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onAddCoin?: (coinId: string) => void;
  onRemoveCoin?: (coinId: string) => void;
}


