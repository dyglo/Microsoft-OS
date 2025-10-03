import { Info } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">{title}</h1>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 flex items-start gap-4">
        <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Coming Soon</h3>
          <p className="text-blue-800 dark:text-blue-200">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default PlaceholderPage;

