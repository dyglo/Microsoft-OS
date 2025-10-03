import { Sun } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

function ColorModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">Color mode</h3>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => theme === 'dark' && toggleTheme()}
          className={`flex-1 py-2 px-4 text-sm rounded border transition-colors ${
            theme === 'light'
              ? 'bg-white dark:bg-gray-800 border-blue-600 text-blue-600 border-l-4'
              : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          Light
        </button>
        <button
          onClick={() => theme === 'light' && toggleTheme()}
          className={`flex-1 py-2 px-4 text-sm rounded border transition-colors ${
            theme === 'dark'
              ? 'bg-gray-800 border-blue-600 text-blue-400 border-l-4'
              : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
}

export default ColorModeToggle;

