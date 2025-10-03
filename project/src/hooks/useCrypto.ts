import { useState, useEffect, useCallback } from 'react';
import { CryptoData } from '../types/enhancements';
import { fetchCryptoPrices } from '../services/cryptoApi';
import { API_CONFIG } from '../services/api.config';

export function useCrypto() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCrypto = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchCryptoPrices();
      setCryptoData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch crypto data');
      console.error('Crypto fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchCrypto();
  }, [fetchCrypto]);

  // Auto-refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCrypto();
    }, API_CONFIG.crypto.refreshInterval);

    return () => clearInterval(interval);
  }, [fetchCrypto]);

  const refresh = useCallback(() => {
    fetchCrypto();
  }, [fetchCrypto]);

  return {
    cryptoData,
    loading,
    error,
    refresh,
  };
}

