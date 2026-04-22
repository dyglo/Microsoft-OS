import { useState } from 'react';
import { Clock, Globe } from 'lucide-react';
import { SettingCard } from '../components/SettingCard';
import { InfoCard } from '../components/InfoCard';

export function TimeLanguageSettings() {
  const [autoTime, setAutoTime] = useState(true);
  const [timezone, setTimezone] = useState('America/New_York');

  return (
    <div className="space-y-6">
      {/* Date & Time */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Date & time</h2>

        <SettingCard label="Set time automatically" description="Let Windows set your time based on your location">
          <button
            onClick={() => setAutoTime(!autoTime)}
            className={`px-4 py-2 rounded font-medium transition ${
              autoTime
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {autoTime ? 'On' : 'Off'}
          </button>
        </SettingCard>

        <InfoCard label="Current time" value={new Date().toLocaleString()} />

        {!autoTime && (
          <SettingCard label="Change date and time" description="">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
              Edit
            </button>
          </SettingCard>
        )}

        <SettingCard label="Timezone" description="">
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="America/New_York">Eastern Time (US & Canada)</option>
            <option value="America/Chicago">Central Time (US & Canada)</option>
            <option value="America/Denver">Mountain Time (US & Canada)</option>
            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
            <option value="Australia/Sydney">Sydney</option>
          </select>
        </SettingCard>

        <SettingCard label="Set time automatically for daylight saving" description="">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
            On
          </button>
        </SettingCard>
      </div>

      {/* Language */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Language</h2>

        <SettingCard label="Display language" description="Choose the language for Windows and installed apps">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>English (United States)</option>
            <option>English (United Kingdom)</option>
            <option>Español (España)</option>
            <option>Français (France)</option>
            <option>Deutsch (Deutschland)</option>
            <option>日本語 (日本)</option>
            <option>中文 (简体)</option>
          </select>
        </SettingCard>

        <SettingCard label="Keyboard layout" description="">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>US QWERTY</option>
            <option>UK QWERTY</option>
            <option>AZERTY (French)</option>
            <option>QWERTZ (German)</option>
          </select>
        </SettingCard>
      </div>

      {/* Region */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Region</h2>

        <SettingCard label="Region" description="Set your region for formatting and regional features">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>France</option>
            <option>Germany</option>
            <option>Japan</option>
          </select>
        </SettingCard>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
          <h4 className="font-medium text-gray-900 dark:text-white">Format examples</h4>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <div>Date: 4/22/2026</div>
            <div>Time: 3:41:32 PM</div>
            <div>Currency: $1,234.56</div>
          </div>
        </div>
      </div>

      {/* Speech */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Speech</h2>

        <SettingCard label="Speech language" description="">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>English (United States)</option>
            <option>Español (España)</option>
            <option>Français (France)</option>
          </select>
        </SettingCard>
      </div>
    </div>
  );
}
