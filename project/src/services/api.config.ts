// API Configuration for external services

export const API_CONFIG = {
  // OpenWeatherMap API
  weather: {
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    apiKey: import.meta.env.VITE_WEATHER_API_KEY || '',
    defaultLocation: 'Kolkata',
    units: 'metric', // or 'imperial'
    refreshInterval: 30 * 60 * 1000, // 30 minutes
  },

  // NewsAPI
  news: {
    baseUrl: 'https://newsapi.org/v2',
    apiKey: import.meta.env.VITE_NEWS_API_KEY || '',
    country: 'us',
    pageSize: 5,
    refreshInterval: 60 * 60 * 1000, // 1 hour
  },

  // CoinGecko API (no key required)
  crypto: {
    baseUrl: 'https://api.coingecko.com/api/v3',
    defaultCoins: ['bitcoin', 'ethereum', 'dogecoin'],
    currency: 'usd',
    refreshInterval: 60 * 1000, // 1 minute
  },
};

// Fallback data for when APIs are unavailable
export const FALLBACK_DATA = {
  weather: {
    location: 'Kolkata',
    temperature: 28,
    condition: 'Partly Cloudy',
    weatherCode: '02d',
    windSpeed: 12,
    humidity: 65,
    feelsLike: 30,
    icon: '02d',
    lastUpdated: new Date(),
  },

  news: [
    {
      id: '1',
      title: 'Technology advances continue to reshape industries',
      description: 'Latest innovations in AI and cloud computing',
      imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=300',
      source: 'Tech News',
      url: '#',
      publishedAt: new Date(),
    },
    {
      id: '2',
      title: 'Global markets show positive trends',
      description: 'Economic indicators suggest continued growth',
      imageUrl: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=300',
      source: 'Business Today',
      url: '#',
      publishedAt: new Date(),
    },
    {
      id: '3',
      title: 'Climate initiatives gain momentum worldwide',
      description: 'New policies aim to reduce carbon emissions',
      imageUrl: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=300',
      source: 'Environmental News',
      url: '#',
      publishedAt: new Date(),
    },
  ],

  crypto: [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43250.50,
      change24h: 1250.30,
      changePercent24h: 2.98,
      lastUpdated: new Date(),
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2280.75,
      change24h: -45.20,
      changePercent24h: -1.94,
      lastUpdated: new Date(),
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'DOGE',
      price: 0.082,
      change24h: 0.003,
      changePercent24h: 3.80,
      lastUpdated: new Date(),
    },
  ],
};

// Error messages
export const API_ERROR_MESSAGES = {
  network: 'Unable to connect to service. Check your internet connection.',
  rateLimit: 'Too many requests. Please try again later.',
  unauthorized: 'API key is invalid or missing.',
  notFound: 'Requested resource not found.',
  serverError: 'Service temporarily unavailable. Please try again later.',
  generic: 'Something went wrong. Using cached data.',
};

// Helper function to check if API keys are configured
export const checkApiConfiguration = () => {
  const warnings: string[] = [];
  
  if (!API_CONFIG.weather.apiKey) {
    warnings.push('Weather API key not configured. Weather widget will use fallback data.');
  }
  
  if (!API_CONFIG.news.apiKey) {
    warnings.push('News API key not configured. News widget will use fallback data.');
  }
  
  if (warnings.length > 0) {
    console.warn('API Configuration Warnings:', warnings);
  }
  
  return {
    configured: warnings.length === 0,
    warnings,
  };
};


