import { RecentItem } from '../../types/enhancements';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface RecentItemsListProps {
  items: RecentItem[];
  onItemClick: (item: RecentItem) => void;
}

function RecentItemsList({ items, onItemClick }: RecentItemsListProps) {
  if (items.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <EmptyRecentItem />
        <EmptyRecentItem />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.slice(0, 4).map((item) => (
        <button
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            onItemClick(item);
          }}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
        >
          <div className="flex-shrink-0">
            {typeof item.icon === 'string' ? (
              <div className="w-8 h-8 flex items-center justify-center text-xl">{item.icon}</div>
            ) : (
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                {item.title.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{item.title}</div>
            <div className="text-xs text-gray-500">{item.subtitle}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function EmptyRecentItem() {
  return (
    <div className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 opacity-50">
      <div className="w-8 h-8 bg-gray-300 rounded"></div>
      <div className="flex-1 min-w-0">
        <div className="h-3 bg-gray-300 rounded w-3/4 mb-1"></div>
        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export default RecentItemsList;

