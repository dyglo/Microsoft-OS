import { ArrowLeft, Search, Minus, Square, X } from 'lucide-react';

interface SettingsTopBarProps {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize?: () => void;
}

function SettingsTopBar({ onClose, onMinimize, onMaximize }: SettingsTopBarProps) {
  return (
    <div className="h-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Find a setting"
            className="w-full pl-10 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button 
          onClick={onMinimize}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button 
          onClick={onMaximize}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
        >
          <Square className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-red-500 hover:text-white rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default SettingsTopBar;

