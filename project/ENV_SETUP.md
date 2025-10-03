# Environment Variables Setup

To enable the full functionality of Step 3 & 4 enhancements, you need to configure API keys for external services.

## Required Environment Variables

Create a `.env` file in the `project/` directory with the following content:

```env
# OpenWeatherMap API Key (for Weather Widget)
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here

# News API Key (for News Widget)
VITE_NEWS_API_KEY=your_newsapi_key_here

# Note: CoinGecko API does not require an API key
```

## How to Get API Keys

### 1. OpenWeatherMap (Weather Widget)

**Free Tier:** 60 calls/minute, 1,000,000 calls/month

**Steps:**
1. Go to https://openweathermap.org/api
2. Click "Sign Up" (top right)
3. Create a free account
4. Navigate to "API Keys" section in your dashboard
5. Copy the default API key or create a new one
6. Paste it in your `.env` file

**Example:**
```env
VITE_WEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 2. NewsAPI (News Widget)

**Free Tier:** 100 requests/day (sufficient for personal use)

**Steps:**
1. Go to https://newsapi.org/
2. Click "Get API Key" button
3. Register with your email
4. Verify your email
5. Find your API key in the dashboard
6. Paste it in your `.env` file

**Example:**
```env
VITE_NEWS_API_KEY=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

### 3. CoinGecko (Crypto Widget)

**No API key needed!** ✨

CoinGecko's public API doesn't require authentication for basic usage.

**Free Tier:** 10-50 calls/minute (varies)

---

## Complete .env Example

```env
# API Keys for Step 3 & 4 Enhancements

# OpenWeatherMap API Key
# Get your free key at: https://openweathermap.org/api
VITE_WEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

# News API Key
# Get your free key at: https://newsapi.org/
VITE_NEWS_API_KEY=1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p

# Note: CoinGecko API does not require an API key for basic usage
```

---

## Testing Without API Keys

The application will work without API keys by using fallback data:

- **Weather Widget:** Shows default Kolkata weather data
- **News Widget:** Shows sample news articles
- **Crypto Widget:** Works normally (no key needed)

You'll see console warnings indicating which APIs are using fallback data.

---

## Security Notes

⚠️ **Important:**
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Keep your API keys private
- Don't share API keys in screenshots or public forums

---

## Troubleshooting

### "API key is invalid or missing"
- Check that your `.env` file is in the correct location (`project/.env`)
- Verify the variable names start with `VITE_`
- Restart the development server after adding/changing `.env`
- Ensure there are no extra spaces around the `=` sign

### "Too many requests"
- You've hit the API rate limit
- Wait a few minutes or until the next day (NewsAPI resets daily)
- Consider caching responses more aggressively

### "CORS Error"
- This shouldn't happen with the configured APIs
- If it does, consider using a proxy or backend service

---

## After Setup

Once you've configured your `.env` file:

1. Restart the development server:
   ```bash
   npm run dev
   ```

2. Open the app and test:
   - Click the Widgets icon in the taskbar
   - Check that weather shows your chosen city
   - Verify news articles are current
   - Confirm crypto prices are updating

3. Check the console for any warnings or errors

---

## Optional: Custom Configuration

You can customize API behavior in `src/services/api.config.ts`:

```typescript
export const API_CONFIG = {
  weather: {
    defaultLocation: 'Kolkata',    // Change default city
    units: 'metric',                // or 'imperial' for Fahrenheit
    refreshInterval: 30 * 60 * 1000, // How often to update
  },
  news: {
    country: 'us',                  // Change country code
    pageSize: 5,                    // Number of articles
    refreshInterval: 60 * 60 * 1000, // How often to update
  },
  crypto: {
    defaultCoins: ['bitcoin', 'ethereum', 'dogecoin'], // Add/remove coins
    refreshInterval: 60 * 1000,     // How often to update
  },
};
```

---

Ready to proceed? Let's enhance those widgets! 🚀


