import { useState, useEffect, useCallback } from 'react';
import { RecentItem } from '../types/enhancements';
import { storage } from '../utils/storage';

export function useRecentItems() {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  // Load recent items on mount
  useEffect(() => {
    const items = storage.getRecentItems();
    setRecentItems(items);
  }, []);

  // Add a new recent item
  const addRecentItem = useCallback((item: Omit<RecentItem, 'id' | 'timestamp'>) => {
    const newItem: RecentItem = {
      ...item,
      id: `recent-${Date.now()}`,
      timestamp: Date.now(),
    };

    const updatedItems = storage.addRecentItem(newItem);
    setRecentItems(updatedItems);
  }, []);

  // Clear all recent items
  const clearRecentItems = useCallback(() => {
    storage.clearRecentItems();
    setRecentItems([]);
  }, []);

  // Remove a specific item
  const removeRecentItem = useCallback((id: string) => {
    const updatedItems = storage.removeRecentItem(id);
    setRecentItems(updatedItems);
  }, []);

  return {
    recentItems,
    addRecentItem,
    clearRecentItems,
    removeRecentItem,
  };
}

