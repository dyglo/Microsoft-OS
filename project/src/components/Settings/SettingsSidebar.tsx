import { 
  Home, Monitor, Bluetooth, Wifi, Palette, Grid3x3, 
  User, Globe, Gamepad2, Accessibility, Shield, 
  Download 
} from 'lucide-react';

interface SettingsSidebarProps {
  activePage: string;
  onPageChange: (pageId: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'system', label: 'System', icon: Monitor },
  { id: 'bluetooth', label: 'Bluetooth & devices', icon: Bluetooth },
  { id: 'network', label: 'Network & internet', icon: Wifi },
  { id: 'personalization', label: 'Personalization', icon: Palette },
  { id: 'apps', label: 'Apps', icon: Grid3x3 },
  { id: 'accounts', label: 'Accounts', icon: User },
  { id: 'time', label: 'Time & language', icon: Globe },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  { id: 'privacy', label: 'Privacy & security', icon: Shield },
  { id: 'update', label: 'Windows Update', icon: Download },
];

function SettingsSidebar({ activePage, onPageChange }: SettingsSidebarProps) {
  return (
    <div className="w-64 h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      <nav className="py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-gray-200 dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-l-3 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default SettingsSidebar;

