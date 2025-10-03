import { NewsArticle, NewsAPIResponse } from '../types/enhancements';
import { API_CONFIG, FALLBACK_DATA, API_ERROR_MESSAGES } from './api.config';

export async function fetchNewsArticles(): Promise<NewsArticle[]> {
  const { baseUrl, apiKey, country, pageSize } = API_CONFIG.news;

  // If no API key, return fallback data
  if (!apiKey) {
    console.warn('News API key not configured. Using fallback data.');
    return FALLBACK_DATA.news;
  }

  try {
    const url = `${baseUrl}/top-headlines?country=${country}&pageSize=${pageSize}&apiKey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(API_ERROR_MESSAGES.unauthorized);
      } else if (response.status === 429) {
        throw new Error(API_ERROR_MESSAGES.rateLimit);
      } else {
        throw new Error(API_ERROR_MESSAGES.serverError);
      }
    }

    const data: NewsAPIResponse = await response.json();

    // Transform API response to our NewsArticle format
    const articles: NewsArticle[] = data.articles
      .filter(article => article.title && article.urlToImage) // Filter out articles without images
      .map((article, index) => ({
        id: `news-${Date.now()}-${index}`,
        title: article.title,
        description: article.description || '',
        imageUrl: article.urlToImage || '',
        source: article.source.name,
        url: article.url,
        publishedAt: new Date(article.publishedAt),
      }))
      .slice(0, pageSize);

    return articles;
  } catch (error) {
    console.error('News API error:', error);
    
    // Return fallback data on error
    if (error instanceof Error && error.message !== API_ERROR_MESSAGES.network) {
      throw error;
    }
    
    // If network error, return fallback
    return FALLBACK_DATA.news;
  }
}

