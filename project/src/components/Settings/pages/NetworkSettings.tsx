import { useState } from 'react';
import { Wifi, Bluetooth, VolumeX } from 'lucide-react';
import { SettingCard } from '../components/SettingCard';
import { InfoCard } from '../components/InfoCard';

export function NetworkSettings() {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  const [networks] = useState([
    { name: 'Tokyo', signal: 4, secured: true, connected: true },
    { name: 'Guest Network', signal: 3, secured: true, connected: false },
    { name: 'Coffee Shop WiFi', signal: 2, secured: false, connected: false },
  ]);

  return (
    <div className="space-y-6">
      {/* WiFi */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">WiFi</h2>

        <SettingCard label="WiFi" description="Turn WiFi on or off">
          <button
            onClick={() => setWifiEnabled(!wifiEnabled)}
            className={`px-4 py-2 rounded font-medium transition ${
              wifiEnabled
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {wifiEnabled ? 'On' : 'Off'}
          </button>
        </SettingCard>

        {wifiEnabled && (
          <div className="space-y-3">
            {networks.map((network) => (
              <div
                key={network.name}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{network.name}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {network.secured ? 'Secured' : 'Open'} • Signal: {network.signal}/5
                      </p>
                    </div>
                  </div>

                  <button
                    className={`px-4 py-2 rounded font-medium transition text-sm ${
                      network.connected
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {network.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bluetooth */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Bluetooth</h2>

        <SettingCard label="Bluetooth" description="Turn Bluetooth on or off">
          <button
            onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
            className={`px-4 py-2 rounded font-medium transition ${
              bluetoothEnabled
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {bluetoothEnabled ? 'On' : 'Off'}
          </button>
        </SettingCard>

        {bluetoothEnabled && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              No Bluetooth devices connected. Toggle Bluetooth on to discover nearby devices.
            </p>
          </div>
        )}
      </div>

      {/* Network Settings */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced network settings</h2>

        <InfoCard label="IP Address" value="192.168.1.100" />
        <InfoCard label="Subnet mask" value="255.255.255.0" />
        <InfoCard label="Default gateway" value="192.168.1.1" />
        <InfoCard label="DNS servers" value="8.8.8.8, 8.8.4.4" />

        <SettingCard label="DNS settings" description="Automatically detect DNS settings">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
            Edit
          </button>
        </SettingCard>
      </div>

      {/* Data Usage */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Data usage</h2>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">WiFi</span>
            <span className="font-medium text-gray-900 dark:text-white">2.3 GB this month</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: '45%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
