import { ChevronRight, LucideIcon } from 'lucide-react';

interface SettingCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
}

function SettingCard({ icon: Icon, title, onClick }: SettingCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">{title}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </button>
  );
}

export default SettingCard;

