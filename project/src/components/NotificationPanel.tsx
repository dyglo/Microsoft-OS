import { X, Wifi, Volume2, Battery, Bluetooth, Plane, Moon, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NotificationPanelProps {
  onClose: () => void;
}

function NotificationPanel({ onClose }: NotificationPanelProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="absolute right-4 bottom-16 w-96 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl shadow-2xl rounded-xl animate-slide-in-right overflow-hidden">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200">
        <span className="font-semibold text-sm">Notifications</span>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Quick Settings */}
      <div className="p-4 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <QuickSettingButton icon={<Wifi className="w-5 h-5" />} label="WiFi" active={true} />
          <QuickSettingButton icon={<Bluetooth className="w-5 h-5" />} label="Bluetooth" active={false} />
          <QuickSettingButton icon={<Plane className="w-5 h-5" />} label="Airplane" active={false} />
          <QuickSettingButton icon={<Battery className="w-5 h-5" />} label="Battery" active={true} />
          <QuickSettingButton icon={<Moon className="w-5 h-5" />} label={theme==='dark'?'Light':'Dark'} active={theme==='dark'} onClick={toggleTheme} />
          <QuickSettingButton icon={<Settings className="w-5 h-5" />} label="Settings" active={false} />
        </div>

        {/* Volume Slider */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <Volume2 className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">Volume</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Brightness Slider */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sun className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">Brightness</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="75"
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        <div className="p-4">
          <div className="text-xs text-gray-500 mb-2">Recent</div>
          <NotificationItem
            app="Microsoft Edge"
            message="Download complete"
            time="5m ago"
            icon="🌐"
          />
          <NotificationItem
            app="Calendar"
            message="Meeting in 15 minutes"
            time="10m ago"
            icon="📅"
          />
          <NotificationItem
            app="Mail"
            message="3 new messages"
            time="1h ago"
            icon="📧"
          />
        </div>
      </div>
    </div>
  );
}

function QuickSettingButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick?: ()=>void }) {
  return (
    <button onClick={onClick}
      className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
        active ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}

function NotificationItem({ app, message, time, icon }: { app: string; message: string; time: string; icon: string }) {
  return (
    <div className="flex gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors mb-2">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="text-sm font-medium">{app}</div>
        <div className="text-xs text-gray-600">{message}</div>
        <div className="text-[10px] text-gray-400 mt-1">{time}</div>
      </div>
    </div>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

export default NotificationPanel;

