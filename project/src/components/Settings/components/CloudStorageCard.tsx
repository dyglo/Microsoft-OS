import { Cloud, ExternalLink, ChevronRight, Settings } from 'lucide-react';

function CloudStorageCard() {
  const usedGB = 1.1;
  const totalGB = 5;
  const percentage = (usedGB / totalGB) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start gap-3 mb-4">
        <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            Cloud storage
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            With available storage, you can back up files or send and receive email on Outlook.
          </p>
        </div>
      </div>

      {/* Storage Info */}
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm text-gray-900 dark:text-white font-medium">
            {usedGB} GB used of {totalGB} GB ({Math.round(percentage)}%)
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <button className="w-full py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
          Get more storage
        </button>
        <button className="w-full flex items-center justify-between py-2 px-4 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <span className="flex items-center gap-2">
            PC backup
            <span className="text-xs text-gray-500 dark:text-gray-400">Backed up</span>
          </span>
          <ExternalLink className="w-4 h-4" />
        </button>
        <button className="w-full flex items-center justify-between py-2 px-4 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <span className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Manage cloud storage
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CloudStorageCard;

