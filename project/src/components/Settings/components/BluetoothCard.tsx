import { useState, useEffect } from 'react';
import { Bluetooth, ChevronRight } from 'lucide-react';
import { storage } from '../../../utils/storage';

function BluetoothCard() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const settings = storage.getBluetoothSettings();
    setEnabled(settings.enabled);
  }, []);

  const handleToggle = () => {
    const newState = storage.toggleBluetooth();
    setEnabled(newState);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
        Bluetooth devices
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Manage, add, and remove devices
      </p>

      {/* Bluetooth Toggle */}
      <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Bluetooth className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Bluetooth</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Bluetooth is turned {enabled ? 'on' : 'off'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!enabled && (
            <button className="px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              Start
            </button>
          )}
          <button
            onClick={handleToggle}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
          View all devices
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
          Add device
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default BluetoothCard;

