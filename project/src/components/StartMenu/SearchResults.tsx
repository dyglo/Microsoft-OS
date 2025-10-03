import { SearchResult } from '../../types/enhancements';
import { FileIcon, FolderIcon, Settings, Monitor } from 'lucide-react';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onResultClick: (result: SearchResult) => void;
}

function SearchResults({ results, query, onResultClick }: SearchResultsProps) {
  if (query.length < 2) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div className="px-6 py-8 text-center">
        <div className="text-gray-400 mb-2">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-sm text-gray-600">No results found for "{query}"</p>
        <p className="text-xs text-gray-400 mt-1">Try searching for apps, files, or settings</p>
      </div>
    );
  }

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      app: 'Apps',
      file: 'Files',
      folder: 'Folders',
      setting: 'Settings',
    };
    return labels[type] || type;
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, any> = {
      app: Monitor,
      file: FileIcon,
      folder: FolderIcon,
      setting: Settings,
    };
    return icons[type] || Monitor;
  };

  return (
    <div className="max-h-96 overflow-y-auto custom-scrollbar">
      {Object.entries(groupedResults).map(([type, items]) => {
        const TypeIcon = getTypeIcon(type);
        
        return (
          <div key={type} className="mb-4">
            <div className="px-6 py-2 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <TypeIcon className="w-3.5 h-3.5" />
                {getTypeLabel(type)}
              </div>
            </div>
            <div>
              {items.map((result) => (
                <button
                  key={result.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onResultClick(result);
                  }}
                  className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-b-0"
                >
                  <div className="flex-shrink-0">
                    {typeof result.icon === 'string' ? (
                      <div className="text-2xl">{result.icon}</div>
                    ) : (
                      result.icon
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{result.title}</div>
                    {result.description && (
                      <div className="text-xs text-gray-500 truncate">{result.description}</div>
                    )}
                    {result.path && (
                      <div className="text-xs text-gray-400 truncate">{result.path}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;

