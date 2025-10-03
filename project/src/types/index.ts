export interface DesktopIcon {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  type: 'folder' | 'file' | 'app' | 'system';
  path?: string;
}

export interface AppWindow {
  id: string;
  appId: string;
  title: string;
  icon?: React.ReactNode;
  component: React.ReactNode;
  isMinimized: boolean;
  isActive: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
}

