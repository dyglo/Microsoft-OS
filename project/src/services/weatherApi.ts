import { WeatherData, OpenWeatherResponse } from '../types/enhancements';
import { API_CONFIG, FALLBACK_DATA, API_ERROR_MESSAGES } from './api.config';

export async function fetchWeatherData(location: string): Promise<WeatherData> {
  const { baseUrl, apiKey, units } = API_CONFIG.weather;

  // If no API key, return fallback data
  if (!apiKey) {
    console.warn('Weather API key not configured. Using fallback data.');
    return FALLBACK_DATA.weather;
  }

  try {
    const url = `${baseUrl}/weather?q=${encodeURIComponent(location)}&units=${units}&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(API_ERROR_MESSAGES.unauthorized);
      } else if (response.status === 404) {
        throw new Error(`Location "${location}" not found`);
      } else if (response.status === 429) {
        throw new Error(API_ERROR_MESSAGES.rateLimit);
      } else {
        throw new Error(API_ERROR_MESSAGES.serverError);
      }
    }

    const data: OpenWeatherResponse = await response.json();

    // Transform API response to our WeatherData format
    const weatherData: WeatherData = {
      location: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      weatherCode: data.weather[0].icon,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      humidity: data.main.humidity,
      feelsLike: Math.round(data.main.feels_like),
      icon: data.weather[0].icon,
      lastUpdated: new Date(data.dt * 1000),
    };

    return weatherData;
  } catch (error) {
    console.error('Weather API error:', error);
    
    // Return fallback data on error
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error(API_ERROR_MESSAGES.network);
  }
}

// Get weather icon component based on icon code
export function getWeatherIcon(iconCode: string): string {
  const iconMap: Record<string, string> = {
    '01d': '☀️', // Clear sky day
    '01n': '🌙', // Clear sky night
    '02d': '⛅', // Few clouds day
    '02n': '☁️', // Few clouds night
    '03d': '☁️', // Scattered clouds
    '03n': '☁️',
    '04d': '☁️', // Broken clouds
    '04n': '☁️',
    '09d': '🌧️', // Shower rain
    '09n': '🌧️',
    '10d': '🌦️', // Rain day
    '10n': '🌧️', // Rain night
    '11d': '⛈️', // Thunderstorm
    '11n': '⛈️',
    '13d': '❄️', // Snow
    '13n': '❄️',
    '50d': '🌫️', // Mist
    '50n': '🌫️',
  };

  return iconMap[iconCode] || '🌤️';
}

