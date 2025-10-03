import { useEffect, useState } from 'react';
import { Wifi, Battery, Monitor, List, ChevronRight } from 'lucide-react';
import { storage } from '../../../utils/storage';
import { UserProfile } from '../../../types/enhancements';
import { DeviceInfo, NetworkInfo } from '../../../types/settings';
import UserProfileCard from '../components/UserProfileCard';
import InfoCard from '../components/InfoCard';
import BluetoothCard from '../components/BluetoothCard';
import ThemePreviewGrid from '../components/ThemePreviewGrid';
import ColorModeToggle from '../components/ColorModeToggle';
import CloudStorageCard from '../components/CloudStorageCard';
import SubscriptionCard from '../components/SubscriptionCard';
import SettingCard from '../components/SettingCard';

interface SettingsHomeProps {
  onWallpaperChange: (url: string) => void;
}

function SettingsHome({ onWallpaperChange }: SettingsHomeProps) {
  const [user, setUser] = useState<UserProfile>(storage.getUserProfile());
  const [device, setDevice] = useState<DeviceInfo>(storage.getDeviceInfo());
  const [network, setNetwork] = useState<NetworkInfo>(storage.getNetworkInfo());

  useEffect(() => {
    // Refresh data
    setUser(storage.getUserProfile());
    setDevice(storage.getDeviceInfo());
    setNetwork(storage.getNetworkInfo());
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Home</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile Section */}
          <UserProfileCard user={user} device={device} />

          {/* Network & Update Info Cards - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              icon={Wifi}
              title={network.ssid}
              subtitle={`Connected, ${network.secured ? 'secured' : 'unsecured'}`}
              iconColor="text-blue-600"
            />
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <div className="grid grid-cols-2 gap-0.5 w-5 h-5 flex-shrink-0 mt-0.5">
                  <div className="bg-red-500 rounded-sm"></div>
                  <div className="bg-green-500 rounded-sm"></div>
                  <div className="bg-blue-500 rounded-sm"></div>
                  <div className="bg-yellow-500 rounded-sm"></div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Windows Update</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Last checked: 1 hour ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Settings */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Recommended settings
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Recent and commonly used settings
            </p>
            <div className="grid grid-cols-1 gap-3">
              <SettingCard icon={Battery} title="Power & battery" />
              <SettingCard icon={Monitor} title="Display" />
              <SettingCard icon={List} title="Installed apps" />
            </div>
          </div>

          {/* Bluetooth Section */}
          <BluetoothCard />

          {/* Personalization Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <ThemePreviewGrid onWallpaperChange={onWallpaperChange} />
            
            <div className="mt-6">
              <ColorModeToggle />
            </div>

            <button className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline mt-4">
              Browse more backgrounds, colors, and themes
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column - Sidebar Cards */}
        <div className="space-y-6">
          {/* Microsoft 365 Subscription */}
          <SubscriptionCard />

          {/* Cloud Storage */}
          <CloudStorageCard />
        </div>
      </div>
    </div>
  );
}

export default SettingsHome;

