import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '../types/enhancements';
import { fetchWeatherData } from '../services/weatherApi';
import { API_CONFIG } from '../services/api.config';

export function useWeather(initialLocation: string = API_CONFIG.weather.defaultLocation) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState(initialLocation);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [location]);

  // Initial fetch
  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  // Auto-refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeather();
    }, API_CONFIG.weather.refreshInterval);

    return () => clearInterval(interval);
  }, [fetchWeather]);

  const changeLocation = useCallback((newLocation: string) => {
    setLocation(newLocation);
  }, []);

  const refresh = useCallback(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weatherData,
    loading,
    error,
    location,
    changeLocation,
    refresh,
  };
}

