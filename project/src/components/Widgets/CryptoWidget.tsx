import { TrendingUp, TrendingDown, RefreshCw, Minus } from 'lucide-react';
import { CryptoData } from '../../types/enhancements';
import { formatCryptoPrice } from '../../services/cryptoApi';

interface CryptoWidgetProps {
  cryptoData: CryptoData[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onRemove: () => void;
}

function CryptoWidget({ cryptoData, loading, error, onRefresh, onRemove }: CryptoWidgetProps) {
  if (loading && cryptoData.length === 0) {
    return (
      <div className="relative bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
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
        <span className="font-semibold text-sm">Market Insights</span>
        <div className="flex items-center gap-1">
          <button
            onClick={onRefresh}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Refresh prices"
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

      {/* Crypto List */}
      <div className="space-y-3">
        {cryptoData.map((crypto) => {
          const isPositive = crypto.changePercent24h >= 0;
          
          return (
            <div key={crypto.id} className="flex items-center justify-between text-xs hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                  {crypto.symbol.substring(0, 2)}
                </div>
                <span className="font-medium text-gray-700">{crypto.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900">{formatCryptoPrice(crypto.price)}</span>
                <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="font-medium">
                    {isPositive ? '+' : ''}{crypto.changePercent24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Prices update every minute
        </p>
      </div>
    </div>
  );
}

export default CryptoWidget;

