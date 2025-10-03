export interface SettingsPage {
  id: string;
  title: string;
  icon: React.ReactNode;
}

export interface DeviceInfo {
  name: string;
  model: string;
  manufacturer: string;
  os: string;
  version: string;
}

export interface NetworkInfo {
  connected: boolean;
  ssid: string;
  secured: boolean;
  signalStrength?: number;
  ipAddress?: string;
}

export interface BluetoothSettings {
  enabled: boolean;
  devices: BluetoothDevice[];
}

export interface BluetoothDevice {
  id: string;
  name: string;
  type: 'audio' | 'input' | 'display' | 'other';
  connected: boolean;
  battery?: number;
}

export interface WallpaperOption {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  category: 'default' | 'custom' | 'spotlight';
}

export interface CloudStorageInfo {
  used: number; // in GB
  total: number; // in GB
  backupEnabled: boolean;
  lastBackup?: Date;
}

export interface SubscriptionInfo {
  name: string;
  status: 'active' | 'expired' | 'trial';
  expiryDate?: Date;
  features: string[];
}

export interface UpdateInfo {
  lastChecked: Date;
  lastInstalled?: Date;
  updatesAvailable: boolean;
  updateCount?: number;
}

