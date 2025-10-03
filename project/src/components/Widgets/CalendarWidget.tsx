import { Calendar, Plus, Minus, Check } from 'lucide-react';
import { CalendarEvent } from '../../types/enhancements';
import { useState } from 'react';
import EventModal from './EventModal';

interface CalendarWidgetProps {
  events: CalendarEvent[];
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  onToggleComplete: (id: string) => void;
  onDeleteEvent: (id: string) => void;
  onRemove: () => void;
}

function CalendarWidget({ events, onAddEvent, onToggleComplete, onDeleteEvent, onRemove }: CalendarWidgetProps) {
  const [showModal, setShowModal] = useState(false);

  // Get today's events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todaysEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime();
  }).sort((a, b) => a.time.localeCompare(b.time));

  const handleAddEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    onAddEvent(eventData);
    setShowModal(false);
  };

  return (
    <>
      <div className="relative bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span className="font-semibold text-sm">Up Next</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowModal(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Add event"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={onRemove}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Remove widget"
            >
              <Minus className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Events List */}
        {todaysEvents.length === 0 ? (
          <div className="text-center py-6">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No events for today</p>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs text-blue-600 hover:underline mt-2"
            >
              Add an event
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {todaysEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-start gap-2 group">
                <button
                  onClick={() => onToggleComplete(event.id)}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors mt-0.5 ${
                    event.completed
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {event.completed && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${event.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {event.title}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: event.color }}
                    ></div>
                    <span className="text-xs text-gray-500">{event.time}</span>
                    {event.location && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500 truncate">{event.location}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteEvent(event.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all flex-shrink-0"
                  title="Delete event"
                >
                  <span className="text-xs text-red-600">×</span>
                </button>
              </div>
            ))}
            {todaysEvents.length > 3 && (
              <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
                +{todaysEvents.length - 3} more events today
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {showModal && (
        <EventModal
          onClose={() => setShowModal(false)}
          onSave={handleAddEvent}
        />
      )}
    </>
  );
}

export default CalendarWidget;

