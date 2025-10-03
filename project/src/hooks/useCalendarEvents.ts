import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '../types/enhancements';
import { storage } from '../utils/storage';

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Load events on mount
  useEffect(() => {
    const savedEvents = storage.getCalendarEvents();
    setEvents(savedEvents);
  }, []);

  // Add new event
  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `event-${Date.now()}`,
    };

    const updatedEvents = [...events, newEvent];
    storage.setCalendarEvents(updatedEvents);
    setEvents(updatedEvents);
    return newEvent;
  }, [events]);

  // Update event
  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    const updatedEvents = events.map(event =>
      event.id === id ? { ...event, ...updates } : event
    );
    storage.setCalendarEvents(updatedEvents);
    setEvents(updatedEvents);
  }, [events]);

  // Delete event
  const deleteEvent = useCallback((id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    storage.setCalendarEvents(updatedEvents);
    setEvents(updatedEvents);
  }, [events]);

  // Toggle event completion
  const toggleComplete = useCallback((id: string) => {
    const updatedEvents = events.map(event =>
      event.id === id ? { ...event, completed: !event.completed } : event
    );
    storage.setCalendarEvents(updatedEvents);
    setEvents(updatedEvents);
  }, [events]);

  // Get today's events
  const getTodaysEvents = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate.getTime() === today.getTime();
    }).sort((a, b) => {
      // Sort by time
      return a.time.localeCompare(b.time);
    });
  }, [events]);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    toggleComplete,
    getTodaysEvents,
  };
}

