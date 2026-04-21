import { useState } from 'react';
import { Eye, Volume2, Smartphone } from 'lucide-react';
import { SettingCard } from '../components/SettingCard';

export function AccessibilitySettings() {
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState(100);
  const [narrationEnabled, setNarrationEnabled] = useState(false);

  return (
    <div className="space-y-6">
      {/* Display */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Display</h2>

        <SettingCard label="High contrast mode" description="Use high contrast colors for better visibility">
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`px-4 py-2 rounded font-medium transition ${
              highContrast
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {highContrast ? 'On' : 'Off'}
          </button>
        </SettingCard>

        <SettingCard label="Text size" description="Adjust the size of text across the system">
          <div className="space-y-2 w-64">
            <input
              type="range"
              min="80"
              max="200"
              value={textSize}
              onChange={(e) => setTextSize(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Smaller</span>
              <span>{textSize}%</span>
              <span>Larger</span>
            </div>
            <div
              className="p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
              style={{ fontSize: `${textSize * 0.14}px` }}
            >
              Preview text with custom size
            </div>
          </div>
        </SettingCard>

        <SettingCard label="Cursor and pointer size" description="">
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option>Default</option>
            <option>Large</option>
            <option>Extra Large</option>
          </select>
        </SettingCard>
      </div>

      {/* Hearing */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Hearing</h2>

        <SettingCard label="Captions" description="Display captions for audio content">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
            Settings
          </button>
        </SettingCard>

        <SettingCard label="Mono audio" description="Play audio in mono instead of stereo">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 transition text-sm"
          >
            Off
          </button>
        </SettingCard>
      </div>

      {/* Interaction */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Interaction</h2>

        <SettingCard label="Keyboard" description="">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
            Settings
          </button>
        </SettingCard>

        <SettingCard label="Mouse" description="">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
            Settings
          </button>
        </SettingCard>

        <SettingCard label="Sticky keys" description="Press modifier keys one at a time">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 transition text-sm"
          >
            Off
          </button>
        </SettingCard>

        <SettingCard label="Toggle keys" description="Hear beeps when you press Caps Lock, Num Lock, etc.">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 transition text-sm"
          >
            Off
          </button>
        </SettingCard>
      </div>

      {/* Speech */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Speech</h2>

        <SettingCard label="Narrator" description="Have text read aloud">
          <button
            onClick={() => setNarrationEnabled(!narrationEnabled)}
            className={`px-4 py-2 rounded font-medium transition ${
              narrationEnabled
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {narrationEnabled ? 'On' : 'Off'}
          </button>
        </SettingCard>

        {narrationEnabled && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Narrator voice
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Microsoft Zira - English (United States)</option>
              <option>Microsoft David - English (United States)</option>
            </select>
          </div>
        )}

        <SettingCard label="Magnifier" description="Zoom in on the screen">
          <button
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 transition text-sm"
          >
            Off
          </button>
        </SettingCard>
      </div>
    </div>
  );
}
