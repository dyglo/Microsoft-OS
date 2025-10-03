import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconColor?: string;
}

function InfoCard({ icon: Icon, title, subtitle, iconColor = 'text-blue-600' }: InfoCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;

