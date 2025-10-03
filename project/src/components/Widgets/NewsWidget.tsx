import { RefreshCw, Minus, ExternalLink } from 'lucide-react';
import { NewsArticle } from '../../types/enhancements';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface NewsWidgetProps {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onRemove: () => void;
}

function NewsWidget({ articles, loading, error, onRefresh, onRemove }: NewsWidgetProps) {
  if (loading && articles.length === 0) {
    return (
      <div className="relative bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-sm">Top Stories</span>
        <div className="flex items-center gap-1">
          <button
            onClick={onRefresh}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Refresh news"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onRemove}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Remove widget"
          >
            <Minus className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {error && (
        <div className="text-xs text-red-600 mb-2 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      {/* News Articles */}
      <div className="space-y-3">
        {articles.slice(0, 3).map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 py-2 rounded transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs leading-relaxed text-gray-800 line-clamp-3 group-hover:text-blue-600 transition-colors">
                {article.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{article.source}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">{formatDistanceToNow(article.publishedAt)}</span>
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt=""
                className="w-16 h-16 rounded object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

export default NewsWidget;

