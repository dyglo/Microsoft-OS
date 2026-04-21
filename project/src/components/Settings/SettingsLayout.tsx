import { useState } from 'react';
import SettingsSidebar from './SettingsSidebar';
import SettingsTopBar from './SettingsTopBar';
import SettingsHome from './pages/SettingsHome';
import PlaceholderPage from './pages/PlaceholderPage';
import { SystemSettings } from './pages/SystemSettings';
import { AppsSettings } from './pages/AppsSettings';
import { NetworkSettings } from './pages/NetworkSettings';
import { AccountsSettings } from './pages/AccountsSettings';
import { TimeLanguageSettings } from './pages/TimeLanguageSettings';
import { AccessibilitySettings } from './pages/AccessibilitySettings';
import { UpdateSettings } from './pages/UpdateSettings';

interface SettingsLayoutProps {
  onClose: () => void;
  onMinimize: () => void;
  onWallpaperChange: (url: string) => void;
}

function SettingsLayout({ onClose, onMinimize, onWallpaperChange }: SettingsLayoutProps) {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <SettingsHome onWallpaperChange={onWallpaperChange} />;
      case 'system':
        return <SystemSettings />;
      case 'bluetooth':
        return <PlaceholderPage title="Bluetooth & devices" description="Bluetooth settings will be implemented in future steps" />;
      case 'network':
        return <NetworkSettings />;
      case 'personalization':
        return <PlaceholderPage title="Personalization" description="Advanced personalization settings will be implemented in future steps" />;
      case 'apps':
        return <AppsSettings />;
      case 'accounts':
        return <AccountsSettings />;
      case 'time':
        return <TimeLanguageSettings />;
      case 'gaming':
        return <PlaceholderPage title="Gaming" description="Gaming settings will be implemented in future steps" />;
      case 'accessibility':
        return <AccessibilitySettings />;
      case 'privacy':
        return <PlaceholderPage title="Privacy & security" description="Privacy settings will be implemented in future steps" />;
      case 'update':
        return <UpdateSettings />;
      default:
        return <SettingsHome onWallpaperChange={onWallpaperChange} />;
    }
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col">
      <SettingsTopBar 
        onClose={onClose} 
        onMinimize={onMinimize}
      />
      <div className="flex-1 flex overflow-hidden">
        <SettingsSidebar 
          activePage={activePage} 
          onPageChange={setActivePage} 
        />
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default SettingsLayout;

