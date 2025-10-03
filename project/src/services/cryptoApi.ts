import { CryptoData, CoinGeckoResponse } from '../types/enhancements';
import { API_CONFIG, FALLBACK_DATA, API_ERROR_MESSAGES } from './api.config';

export async function fetchCryptoPrices(): Promise<CryptoData[]> {
  const { baseUrl, defaultCoins, currency } = API_CONFIG.crypto;

  try {
    const coinIds = defaultCoins.join(',');
    const url = `${baseUrl}/simple/price?ids=${coinIds}&vs_currencies=${currency}&include_24hr_change=true&include_market_cap=true&include_24h_vol=true`;
    
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(API_ERROR_MESSAGES.rateLimit);
      } else {
        throw new Error(API_ERROR_MESSAGES.serverError);
      }
    }

    const data: CoinGeckoResponse = await response.json();

    // Transform API response to our CryptoData format
    const cryptoData: CryptoData[] = defaultCoins.map((coinId) => {
      const coinData = data[coinId];
      
      if (!coinData) {
        return null;
      }

      return {
        id: coinId,
        name: formatCoinName(coinId),
        symbol: getCoinSymbol(coinId),
        price: coinData.usd,
        change24h: coinData.usd * (coinData.usd_24h_change / 100),
        changePercent24h: coinData.usd_24h_change,
        marketCap: coinData.usd_market_cap,
        volume24h: coinData.usd_24h_vol,
        lastUpdated: new Date(),
      };
    }).filter((item): item is CryptoData => item !== null);

    return cryptoData;
  } catch (error) {
    console.error('Crypto API error:', error);
    
    // Return fallback data on error
    if (error instanceof Error && error.message !== API_ERROR_MESSAGES.network) {
      console.warn('Using fallback crypto data');
    }
    
    return FALLBACK_DATA.crypto;
  }
}

function formatCoinName(coinId: string): string {
  const nameMap: Record<string, string> = {
    'bitcoin': 'Bitcoin',
    'ethereum': 'Ethereum',
    'dogecoin': 'Dogecoin',
    'cardano': 'Cardano',
    'solana': 'Solana',
    'polkadot': 'Polkadot',
  };

  return nameMap[coinId] || coinId.charAt(0).toUpperCase() + coinId.slice(1);
}

function getCoinSymbol(coinId: string): string {
  const symbolMap: Record<string, string> = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'dogecoin': 'DOGE',
    'cardano': 'ADA',
    'solana': 'SOL',
    'polkadot': 'DOT',
  };

  return symbolMap[coinId] || coinId.toUpperCase();
}

export function formatCryptoPrice(price: number): string {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}

