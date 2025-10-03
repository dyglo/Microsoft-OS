import { Cloud, Sun, Droplets, Wind, RefreshCw, Minus } from 'lucide-react';
import { WeatherData } from '../../types/enhancements';
import { getWeatherIcon } from '../../services/weatherApi';

interface WeatherWidgetProps {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
  onLocationChange?: (location: string) => void;
  onRefresh: () => void;
  onRemove: () => void;
}

function WeatherWidget({ data, loading, error, onRefresh, onRemove }: WeatherWidgetProps) {
  if (loading && !data) {
    return (
      <div className="relative bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="flex items-center justify-between">
            <div className="w-16 h-16 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Minus className="w-4 h-4 text-gray-400" />
        </button>
        <div className="text-center py-4">
          <p className="text-sm text-red-600 mb-2">{error}</p>
          <button
            onClick={onRefresh}
            className="text-xs text-blue-600 hover:underline flex items-center gap-1 mx-auto"
          >
            <RefreshCw className="w-3 h-3" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="relative bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-blue-500" />
          <span className="font-semibold text-sm">Weather</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onRefresh}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Refresh"
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

      {/* Date and Location */}
      <div className="text-sm font-medium mb-3 text-gray-700">{data.location}</div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-5xl">
            {getWeatherIcon(data.icon)}
          </div>
          <div>
            <div className="text-3xl font-bold">{data.temperature}°</div>
            <div className="text-xs text-gray-500">Feels like {data.feelsLike}°</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700">{data.condition}</div>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Wind className="w-3 h-3" />
              {data.windSpeed} km/h
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              {data.humidity}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;

