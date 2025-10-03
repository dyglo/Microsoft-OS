import { ExternalLink, ChevronRight, Settings } from 'lucide-react';

function SubscriptionCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start gap-3 mb-4">
        {/* Microsoft logo */}
        <div className="grid grid-cols-2 gap-0.5 w-6 h-6 flex-shrink-0">
          <div className="bg-red-500 rounded-sm"></div>
          <div className="bg-green-500 rounded-sm"></div>
          <div className="bg-blue-500 rounded-sm"></div>
          <div className="bg-yellow-500 rounded-sm"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Microsoft 365 Basic
            </h3>
            <span className="px-2 py-0.5 text-xs font-medium text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30 rounded">
              Expired
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You no longer have access to 100 GB of cloud storage and web apps like Word, Excel, and PowerPoint.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 flex items-center justify-center">
              <svg viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </span>
            Resubscribe
          </span>
          <ExternalLink className="w-4 h-4" />
        </button>
        <button className="w-full flex items-center justify-between py-2 px-4 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <span className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Manage subscription
          </span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default SubscriptionCard;

