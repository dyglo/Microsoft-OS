import { useState } from 'react';
import { HardDrive, Copy, Edit2 } from 'lucide-react';
import { SettingCard } from '../components/SettingCard';
import { InfoCard } from '../components/InfoCard';

export function SystemSettings() {
  const [deviceName, setDeviceName] = useState('Tafar');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(deviceName);

  const handleSaveName = () => {
    setDeviceName(newName);
    setIsEditingName(false);
  };

  const systemInfo = {
    deviceName: 'Tafar',
    processor: 'Intel Core i7-1255U @ 3.50GHz',
    installedRAM: '16.0 GB',
    systemType: '64-bit Operating System, x64-based processor',
    edition: 'Windows 11 Pro',
    version: '23H2',
    osVersion: '22635.3646',
  };

  const storageInfo = [
    { drive: 'Local Disk (C:)', total: 476, used: 234, percentage: 49 },
    { drive: 'External (D:)', total: 1000, used: 456, percentage: 46 },
  ];

  return (
    <div className="space-y-6">
      {/* Device Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Device information</h2>

        <SettingCard
          label="Device name"
          description="You can use this name to identify this PC on your network"
        >
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleSaveName}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-700 dark:text-gray-300">{deviceName}</span>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                >
                  <Edit2 className="w-4 h-4 text-blue-500" />
                </button>
              </>
            )}
          </div>
        </SettingCard>

        <InfoCard
          label="Processor"
          value={systemInfo.processor}
        />
        <InfoCard
          label="Installed RAM"
          value={systemInfo.installedRAM}
        />
        <InfoCard
          label="System type"
          value={systemInfo.systemType}
        />
      </div>

      {/* Windows Edition */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Windows edition</h2>

        <InfoCard
          label="Edition"
          value={systemInfo.edition}
        />
        <InfoCard
          label="Version"
          value={systemInfo.version}
        />
        <InfoCard
          label="OS version"
          value={systemInfo.osVersion}
        />
      </div>

      {/* Storage */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Storage</h2>

        {storageInfo.map((drive) => (
          <div
            key={drive.drive}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">{drive.drive}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {drive.used} GB / {drive.total} GB
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                style={{ width: `${drive.percentage}%` }}
              />
            </div>

            <div className="text-xs text-gray-600 dark:text-gray-400">
              {drive.percentage}% full
            </div>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">About this PC</h2>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This is a web-based Windows 11 replica built with React and TypeScript. All features are simulated for demonstration purposes.
          </p>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <Copy className="w-4 h-4" />
            Copy system information
          </button>
        </div>
      </div>
    </div>
  );
}
