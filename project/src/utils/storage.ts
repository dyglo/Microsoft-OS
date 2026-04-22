import { DesktopIcon } from '../types';
import { RecentItem, CalendarEvent, EmailNotification, SystemState, UserProfile } from '../types/enhancements';
import { DeviceInfo, BluetoothSettings, NetworkInfo, WallpaperOption } from '../types/settings';

const STORAGE_KEYS = {
  DESKTOP_ICONS: 'windows_desktop_icons',
  WALLPAPER: 'windows_wallpaper',
  THEME: 'windows_theme',
  RECENT_ITEMS: 'windows_recent_items',
  CALENDAR_EVENTS: 'windows_calendar_events',
  EMAIL_NOTIFICATIONS: 'windows_email_notifications',
  SYSTEM_STATE: 'windows_system_state',
  USER_PROFILE: 'windows_user_profile',
  DEVICE_INFO: 'windows_device_info',
  BLUETOOTH_SETTINGS: 'windows_bluetooth_settings',
  NETWORK_INFO: 'windows_network_info',
  WALLPAPER_OPTIONS: 'windows_wallpaper_options',
  ACCENT_COLOR: 'windows_accent_color',
};

export const storage = {
  // Desktop Icons
  getDesktopIcons: (): DesktopIcon[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.DESKTOP_ICONS);
    // Load icons from storage or default
    const raw: DesktopIcon[] = stored ? JSON.parse(stored) : getDefaultIcons();

    // 1. Remove unwanted system icons (Recycle Bin & This PC)
    const filtered = raw.filter(
      (icon) => icon.icon !== 'recycle-bin' && icon.label.toLowerCase() !== 'this pc'
    );

    // 2. Re-layout remaining icons into two vertical columns so there are no gaps
    const COLUMN_X = [32, 160];
    const ICON_VERTICAL_GAP = 108; // matches original spacing (140-32 = 108)

    const colIndices = [0, 0]; // current row index per column

    // Sort icons by their original x so columns remain consistent
    const sorted = filtered.sort((a, b) => (a.x - b.x) || (a.y - b.y));

    sorted.forEach((icon) => {
      // Keep icon in its original column based on x position w/ fallback to first column
      const col = icon.x === COLUMN_X[1] ? 1 : 0;
      icon.x = COLUMN_X[col];
      icon.y = 32 + colIndices[col] * ICON_VERTICAL_GAP;
      colIndices[col] += 1;
    });

    return sorted;
  },

  setDesktopIcons: (icons: DesktopIcon[]) => {
    localStorage.setItem(STORAGE_KEYS.DESKTOP_ICONS, JSON.stringify(icons));
  },

  // Wallpaper
  getWallpaper: (): string => {
    return localStorage.getItem(STORAGE_KEYS.WALLPAPER) || '/pexels-pixabay-50594.jpg';
  },

  setWallpaper: (url: string) => {
    localStorage.setItem(STORAGE_KEYS.WALLPAPER, url);
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  setTheme: (theme: 'light' | 'dark') => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  // Recent Items (Step 3)
  getRecentItems: (): RecentItem[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.RECENT_ITEMS);
    return stored ? JSON.parse(stored) : [];
  },

  addRecentItem: (item: RecentItem): RecentItem[] => {
    const items = storage.getRecentItems();
    // Remove duplicate if exists
    const filtered = items.filter(i => i.id !== item.id && i.title !== item.title);
    // Add new item at the beginning and limit to 10 items
    const updated = [item, ...filtered].slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.RECENT_ITEMS, JSON.stringify(updated));
    return updated;
  },

  removeRecentItem: (id: string): RecentItem[] => {
    const items = storage.getRecentItems();
    const updated = items.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.RECENT_ITEMS, JSON.stringify(updated));
    return updated;
  },

  clearRecentItems: () => {
    localStorage.removeItem(STORAGE_KEYS.RECENT_ITEMS);
  },

  // Calendar Events (Step 4)
  getCalendarEvents: (): CalendarEvent[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.CALENDAR_EVENTS);
    if (!stored) return [];
    
    // Parse and convert date strings back to Date objects
    const events = JSON.parse(stored);
    return events.map((event: any) => ({
      ...event,
      date: new Date(event.date),
    }));
  },

  setCalendarEvents: (events: CalendarEvent[]) => {
    localStorage.setItem(STORAGE_KEYS.CALENDAR_EVENTS, JSON.stringify(events));
  },

  // Email Notifications (Step 4)
  getEmailNotifications: (): EmailNotification[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.EMAIL_NOTIFICATIONS);
    if (!stored) return getDefaultEmails();
    
    const emails = JSON.parse(stored);
    return emails.map((email: any) => ({
      ...email,
      timestamp: new Date(email.timestamp),
    }));
  },

  setEmailNotifications: (emails: EmailNotification[]) => {
    localStorage.setItem(STORAGE_KEYS.EMAIL_NOTIFICATIONS, JSON.stringify(emails));
  },

  addEmailNotification: (email: EmailNotification): EmailNotification[] => {
    const emails = storage.getEmailNotifications();
    const updated = [email, ...emails].slice(0, 50); // Keep last 50 emails
    storage.setEmailNotifications(updated);
    return updated;
  },

  markEmailAsRead: (id: string): EmailNotification[] => {
    const emails = storage.getEmailNotifications();
    const updated = emails.map(email =>
      email.id === id ? { ...email, read: true } : email
    );
    storage.setEmailNotifications(updated);
    return updated;
  },

  // System State (Step 3)
  getSystemState: (): SystemState => {
    return (localStorage.getItem(STORAGE_KEYS.SYSTEM_STATE) as SystemState) || 'active';
  },

  setSystemState: (state: SystemState) => {
    localStorage.setItem(STORAGE_KEYS.SYSTEM_STATE, state);
  },

  // User Profile (Step 3)
  getUserProfile: (): UserProfile => {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!stored) return getDefaultUserProfile();
    
    const profile = JSON.parse(stored);
    return {
      ...profile,
      lastLogin: new Date(profile.lastLogin),
    };
  },

  setUserProfile: (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  // Clear all session data (for shutdown)
  clearSession: () => {
    localStorage.removeItem(STORAGE_KEYS.RECENT_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.SYSTEM_STATE);
    // Keep user profile, calendar events, and email notifications
  },

  // Device Info
  getDeviceInfo: (): DeviceInfo => {
    const stored = localStorage.getItem(STORAGE_KEYS.DEVICE_INFO);
    if (!stored) return getDefaultDeviceInfo();
    return JSON.parse(stored);
  },

  setDeviceInfo: (info: DeviceInfo) => {
    localStorage.setItem(STORAGE_KEYS.DEVICE_INFO, JSON.stringify(info));
  },

  updateDeviceName: (name: string) => {
    const info = storage.getDeviceInfo();
    info.name = name;
    storage.setDeviceInfo(info);
  },

  // Bluetooth Settings
  getBluetoothSettings: (): BluetoothSettings => {
    const stored = localStorage.getItem(STORAGE_KEYS.BLUETOOTH_SETTINGS);
    if (!stored) return { enabled: false, devices: [] };
    return JSON.parse(stored);
  },

  setBluetoothSettings: (settings: BluetoothSettings) => {
    localStorage.setItem(STORAGE_KEYS.BLUETOOTH_SETTINGS, JSON.stringify(settings));
  },

  toggleBluetooth: (): boolean => {
    const settings = storage.getBluetoothSettings();
    settings.enabled = !settings.enabled;
    storage.setBluetoothSettings(settings);
    return settings.enabled;
  },

  // Network Info
  getNetworkInfo: (): NetworkInfo => {
    const stored = localStorage.getItem(STORAGE_KEYS.NETWORK_INFO);
    if (!stored) return getDefaultNetworkInfo();
    return JSON.parse(stored);
  },

  setNetworkInfo: (info: NetworkInfo) => {
    localStorage.setItem(STORAGE_KEYS.NETWORK_INFO, JSON.stringify(info));
  },

  // Wallpaper Options
  getWallpaperOptions: (): WallpaperOption[] => {
    const stored = localStorage.getItem(STORAGE_KEYS.WALLPAPER_OPTIONS);
    if (!stored) return getDefaultWallpapers();
    return JSON.parse(stored);
  },

  addCustomWallpaper: (wallpaper: WallpaperOption) => {
    const options = storage.getWallpaperOptions();
    options.unshift(wallpaper);
    localStorage.setItem(STORAGE_KEYS.WALLPAPER_OPTIONS, JSON.stringify(options));
  },

  // Accent Color
  getAccentColor: (): string => {
    return localStorage.getItem(STORAGE_KEYS.ACCENT_COLOR) || '#0078d4';
  },

  setAccentColor: (color: string) => {
    localStorage.setItem(STORAGE_KEYS.ACCENT_COLOR, color);
  },
};

function getDefaultIcons(): DesktopIcon[] {
  return [
    // First column
    { id: '1', label: 'Recycle Bin', icon: 'recycle-bin', x: 32, y: 32, type: 'system' },
    { id: '3', label: 'File Explorer', icon: 'folder', x: 32, y: 140, type: 'app', path: '/Documents' },
    { id: '4', label: 'Chrome', icon: 'chrome', x: 32, y: 248, type: 'app' },
    { id: '5', label: 'Excel', icon: 'excel', x: 32, y: 356, type: 'app' },
    { id: '6', label: 'Word', icon: 'word', x: 32, y: 464, type: 'app' },
    // Second column
    { id: '8', label: 'Cursor AI', icon: 'cursor', x: 160, y: 32, type: 'app' },
    { id: '9', label: 'PowerPoint', icon: 'powerpoint', x: 160, y: 140, type: 'app' },
    { id: '7', label: 'VS Code', icon: 'vscode', x: 160, y: 248, type: 'app' },
  ];
}

function getDefaultEmails(): EmailNotification[] {
  return [
    {
      id: 'email-1',
      subject: 'Welcome to Windows 11 Replica',
      sender: 'System',
      senderEmail: 'system@windows.local',
      preview: 'Thank you for trying out this Windows 11 web replica. Explore all the features!',
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      read: false,
      important: true,
      hasAttachment: false,
    },
    {
      id: 'email-2',
      subject: 'Your daily briefing',
      sender: 'News',
      senderEmail: 'news@windows.local',
      preview: 'Here are the top stories and updates for today...',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      important: false,
      hasAttachment: false,
    },
  ];
}

function getDefaultUserProfile(): UserProfile {
  return {
    id: 'user-1',
    name: 'Tafar Mabi',
    email: 'glodytafare@gmail.com',
    avatar: '',
    lastLogin: new Date(),
  };
}

function getDefaultDeviceInfo(): DeviceInfo {
  return {
    name: 'Tafar',
    model: 'Latitude 3440',
    manufacturer: 'Dell Inc.',
    os: 'Windows 11 Pro',
    version: '23H2',
  };
}

function getDefaultNetworkInfo(): NetworkInfo {
  return {
    connected: true,
    ssid: 'Tokyo',
    secured: true,
    signalStrength: 4,
    ipAddress: '192.168.1.100',
  };
}

function getDefaultWallpapers(): WallpaperOption[] {
  return [
    {
      id: 'default-1',
      name: 'Windows 11 Bloom',
      thumbnail: '/pexels-pixabay-50594.jpg',
      url: '/pexels-pixabay-50594.jpg',
      category: 'default',
    },
    {
      id: 'default-2',
      name: 'Dark Blue',
      thumbnail: '/download.jpg',
      url: '/download.jpg',
      category: 'default',
    },
  ];
}

