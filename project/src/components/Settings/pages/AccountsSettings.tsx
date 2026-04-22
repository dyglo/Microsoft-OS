import { useState } from 'react';
import { User, Lock, Mail, Smartphone } from 'lucide-react';
import { SettingCard } from '../components/SettingCard';

export function AccountsSettings() {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="space-y-6">
      {/* Your Account */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your account</h2>

        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              TM
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Tafar Mabi</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">glodytafare@gmail.com</p>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-1">
                Manage your Microsoft account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password & Security */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Password & security</h2>

        <SettingCard label="Change password" description="Update your Windows password">
          <button
            onClick={() => setShowPasswordChange(!showPasswordChange)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Change
          </button>
        </SettingCard>

        {showPasswordChange && (
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
            <input
              type="password"
              placeholder="Current password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
                Save
              </button>
              <button
                onClick={() => setShowPasswordChange(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-400 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <SettingCard label="PIN for quick access" description="Use a PIN instead of a password">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Create PIN
          </button>
        </SettingCard>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-2">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-gray-900 dark:text-white">Security recommendations</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Use a strong password with a mix of letters, numbers, and symbols. Update your password regularly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign-in options */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Sign-in options</h2>

        <div className="space-y-2">
          {[
            { icon: User, name: 'Password', enabled: true },
            { icon: Smartphone, name: 'Biometric (Windows Hello)', enabled: false },
            { icon: Mail, name: 'Security key', enabled: false },
          ].map((option) => (
            <SettingCard key={option.name} label={option.name} description="">
              <button
                className={`px-4 py-2 rounded font-medium transition text-sm ${
                  option.enabled
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {option.enabled ? 'Set up' : 'Not available'}
              </button>
            </SettingCard>
          ))}
        </div>
      </div>

      {/* Other users */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Other users</h2>

        <SettingCard label="Add another user" description="Create a new user account">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Add user
          </button>
        </SettingCard>
      </div>
    </div>
  );
}
