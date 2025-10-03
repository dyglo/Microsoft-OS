import { useState, useEffect, useCallback } from 'react';
import { NewsArticle } from '../types/enhancements';
import { fetchNewsArticles } from '../services/newsApi';
import { API_CONFIG } from '../services/api.config';

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchNewsArticles();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      console.error('News fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Auto-refresh interval
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews();
    }, API_CONFIG.news.refreshInterval);

    return () => clearInterval(interval);
  }, [fetchNews]);

  const refresh = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    articles,
    loading,
    error,
    refresh,
  };
}

