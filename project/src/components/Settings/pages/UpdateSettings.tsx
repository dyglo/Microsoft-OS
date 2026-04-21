import { useState } from 'react';
import { Check, AlertCircle, Download, RotateCw } from 'lucide-react';

export function UpdateSettings() {
  const [updateStatus, setUpdateStatus] = useState<'up-to-date' | 'checking' | 'available' | 'updating'>('up-to-date');
  const [showHistory, setShowHistory] = useState(false);

  const handleCheckUpdates = () => {
    setUpdateStatus('checking');
    setTimeout(() => {
      setUpdateStatus('up-to-date');
    }, 2000);
  };

  const handleUpdate = () => {
    setUpdateStatus('updating');
    setTimeout(() => {
      setUpdateStatus('up-to-date');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Update Status */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Windows Update</h2>

        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          {updateStatus === 'up-to-date' && (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Your device is up to date</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Windows 11 23H2 (Build 22635.3646) is installed
                </p>
                <button
                  onClick={handleCheckUpdates}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                >
                  Check for updates
                </button>
              </div>
            </div>
          )}

          {updateStatus === 'checking' && (
            <div className="flex items-center gap-4">
              <RotateCw className="w-8 h-8 text-blue-600 animate-spin" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Checking for updates...</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Please wait while we check for updates</p>
              </div>
            </div>
          )}

          {updateStatus === 'available' && (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Update available</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Windows 11 24H2 is ready to download and install (Size: 2.4 GB)
                </p>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                >
                  Install now
                </button>
              </div>
            </div>
          )}

          {updateStatus === 'updating' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-blue-600 animate-spin" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Installing update...</h3>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">65% complete - Do not turn off your device</p>
            </div>
          )}
        </div>
      </div>

      {/* Update Settings */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Update settings</h2>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Give me recommendations when using Windows
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Automatically download and install updates
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Notify me when a restart is needed
            </span>
          </label>
        </div>
      </div>

      {/* Update History */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Update history</h2>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            {showHistory ? 'Hide' : 'Show'}
          </button>
        </div>

        {showHistory && (
          <div className="space-y-2">
            {[
              { date: 'April 15, 2026', update: 'Security Update KB5040123', status: 'Success' },
              { date: 'March 10, 2026', update: 'Cumulative Update KB5039087', status: 'Success' },
              { date: 'February 8, 2026', update: 'Windows 11 23H2 (Build 22635.3646)', status: 'Success' },
              { date: 'January 12, 2026', update: 'Security Update KB5034445', status: 'Success' },
            ].map((item) => (
              <div
                key={item.date}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.update}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.date}</p>
                  </div>
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delivery Optimization */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery Optimization</h2>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Improve update delivery by sharing your internet connection to download updates
        </p>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">Allow downloads from other devices</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Helps reduce bandwidth usage</p>
            </div>
          </label>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced options</h2>

        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
          View update history
        </button>
      </div>
    </div>
  );
}
