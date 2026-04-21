import { useState } from 'react';
import { Trash2, Toggle2 } from 'lucide-react';
import { SettingCard } from '../components/SettingCard';

interface App {
  id: string;
  name: string;
  publisher: string;
  size: string;
  installDate: string;
  enabled: boolean;
}

export function AppsSettings() {
  const [apps, setApps] = useState<App[]>([
    { id: '1', name: 'Google Chrome', publisher: 'Google LLC', size: '156 MB', installDate: '2024-01-15', enabled: true },
    { id: '2', name: 'Microsoft Office', publisher: 'Microsoft Corporation', size: '2.1 GB', installDate: '2024-01-10', enabled: true },
    { id: '3', name: 'VS Code', publisher: 'Microsoft', size: '245 MB', installDate: '2024-01-20', enabled: true },
    { id: '4', name: 'Discord', publisher: 'Discord Inc.', size: '342 MB', installDate: '2024-02-01', enabled: false },
    { id: '5', name: 'Spotify', publisher: 'Spotify AB', size: '287 MB', installDate: '2024-02-05', enabled: true },
  ]);

  const [startupApps] = useState<{ name: string; enabled: boolean }[]>([
    { name: 'Windows Defender', enabled: true },
    { name: 'OneDrive', enabled: true },
    { name: 'Bluetooth Service', enabled: false },
  ]);

  const [tab, setTab] = useState<'installed' | 'startup'>('installed');

  const handleRemove = (id: string) => {
    if (confirm('Remove this app?')) {
      setApps(apps.filter((app) => app.id !== id));
    }
  };

  const handleToggle = (id: string) => {
    setApps(apps.map((app) => (app.id === id ? { ...app, enabled: !app.enabled } : app)));
  };

  return (
    <div className="space-y-6">
      {/* Default Apps */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Default apps</h2>

        <SettingCard label="Web browser" description="Choose your default web browser">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>Google Chrome</option>
            <option>Microsoft Edge</option>
            <option>Mozilla Firefox</option>
          </select>
        </SettingCard>

        <SettingCard label="Email" description="Choose your default email client">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>Outlook</option>
            <option>Mail</option>
            <option>Gmail</option>
          </select>
        </SettingCard>
      </div>

      {/* Installed Apps / Startup Apps Tabs */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setTab('installed')}
            className={`pb-2 font-medium border-b-2 transition ${
              tab === 'installed'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400'
            }`}
          >
            Installed apps
          </button>
          <button
            onClick={() => setTab('startup')}
            className={`pb-2 font-medium border-b-2 transition ${
              tab === 'startup'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400'
            }`}
          >
            Startup apps
          </button>
        </div>

        {tab === 'installed' && (
          <div className="space-y-2">
            {apps.map((app) => (
              <div
                key={app.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{app.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {app.publisher} • {app.size} • Installed {app.installDate}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggle(app.id)}
                    className={`p-2 rounded transition ${
                      app.enabled
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                    title={app.enabled ? 'Disable' : 'Enable'}
                  >
                    <Toggle2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleRemove(app.id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'startup' && (
          <div className="space-y-2">
            {startupApps.map((app) => (
              <div
                key={app.name}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <h3 className="font-medium text-gray-900 dark:text-white">{app.name}</h3>

                <button
                  className={`px-4 py-2 rounded transition text-sm font-medium ${
                    app.enabled
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                >
                  {app.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
