import { useState } from 'react';
import SettingsSidebar from './SettingsSidebar';
import SettingsTopBar from './SettingsTopBar';
import SettingsHome from './pages/SettingsHome';
import PlaceholderPage from './pages/PlaceholderPage';

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
        return <PlaceholderPage title="System" description="System settings will be implemented in future steps" />;
      case 'bluetooth':
        return <PlaceholderPage title="Bluetooth & devices" description="Bluetooth settings will be implemented in future steps" />;
      case 'network':
        return <PlaceholderPage title="Network & internet" description="Network settings will be implemented in future steps" />;
      case 'personalization':
        return <PlaceholderPage title="Personalization" description="Advanced personalization settings will be implemented in Step 2" />;
      case 'apps':
        return <PlaceholderPage title="Apps" description="Apps settings will be implemented in future steps" />;
      case 'accounts':
        return <PlaceholderPage title="Accounts" description="Account settings will be implemented in future steps" />;
      case 'time':
        return <PlaceholderPage title="Time & language" description="Time & language settings will be implemented in future steps" />;
      case 'gaming':
        return <PlaceholderPage title="Gaming" description="Gaming settings will be implemented in future steps" />;
      case 'accessibility':
        return <PlaceholderPage title="Accessibility" description="Accessibility settings will be implemented in future steps" />;
      case 'privacy':
        return <PlaceholderPage title="Privacy & security" description="Privacy settings will be implemented in future steps" />;
      case 'update':
        return <PlaceholderPage title="Windows Update" description="Update settings will be implemented in future steps" />;
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

