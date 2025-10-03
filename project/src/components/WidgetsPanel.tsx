import { X, Plus } from 'lucide-react';
import { useState } from 'react';
import WeatherWidget from './Widgets/WeatherWidget';
import NewsWidget from './Widgets/NewsWidget';
import CalendarWidget from './Widgets/CalendarWidget';
import CryptoWidget from './Widgets/CryptoWidget';
import EmailWidget from './Widgets/EmailWidget';
import { useWeather } from '../hooks/useWeather';
import { useNews } from '../hooks/useNews';
import { useCrypto } from '../hooks/useCrypto';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import { storage } from '../utils/storage';
import { PowerPointIcon, WordIcon, ExcelIcon } from './Icons/AppIcons';

// Microsoft Office Widgets
function PowerPointWidget({ onRemove }: { onRemove: () => void }) {
  return (
    <div className="relative bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-4 shadow-sm text-white">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 hover:bg-red-700 rounded transition-colors"
      >
        <X className="w-4 h-4 text-white" />
      </button>
      <div className="flex items-center gap-3 mb-3">
        <PowerPointIcon className="w-12 h-12" />
        <div>
          <div className="font-bold text-lg">PowerPoint</div>
          <div className="text-xs opacity-90">Create presentations</div>
        </div>
      </div>
      <div className="text-sm opacity-90 mb-2">Recent presentations</div>
      <div className="space-y-1">
        <div className="text-xs bg-white/20 rounded px-2 py-1">Project Proposal.pptx</div>
        <div className="text-xs bg-white/20 rounded px-2 py-1">Q4 Review.pptx</div>
      </div>
    </div>
  );
}

function WordWidget({ onRemove }: { onRemove: () => void }) {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 shadow-sm text-white">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 hover:bg-blue-800 rounded transition-colors"
      >
        <X className="w-4 h-4 text-white" />
      </button>
      <div className="flex items-center gap-3 mb-3">
        <WordIcon className="w-12 h-12" />
        <div>
          <div className="font-bold text-lg">Word</div>
          <div className="text-xs opacity-90">Create documents</div>
        </div>
      </div>
      <div className="text-sm opacity-90 mb-2">Recent documents</div>
      <div className="space-y-1">
        <div className="text-xs bg-white/20 rounded px-2 py-1">Meeting Notes.docx</div>
        <div className="text-xs bg-white/20 rounded px-2 py-1">Report Draft.docx</div>
      </div>
    </div>
  );
}

function ExcelWidget({ onRemove }: { onRemove: () => void }) {
  return (
    <div className="relative bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-4 shadow-sm text-white">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 hover:bg-green-800 rounded transition-colors"
      >
        <X className="w-4 h-4 text-white" />
      </button>
      <div className="flex items-center gap-3 mb-3">
        <ExcelIcon className="w-12 h-12" />
        <div>
          <div className="font-bold text-lg">Excel</div>
          <div className="text-xs opacity-90">Create spreadsheets</div>
        </div>
      </div>
      <div className="text-sm opacity-90 mb-2">Recent workbooks</div>
      <div className="space-y-1">
        <div className="text-xs bg-white/20 rounded px-2 py-1">Budget 2025.xlsx</div>
        <div className="text-xs bg-white/20 rounded px-2 py-1">Sales Data.xlsx</div>
      </div>
    </div>
  );
}

interface WidgetsPanelProps {
  onClose: () => void;
}

interface Widget {
  id: string;
  type: string;
  enabled: boolean;
}

function WidgetsPanel({ onClose }: WidgetsPanelProps) {
  // Fetch data for all widgets
  const weather = useWeather();
  const news = useNews();
  const crypto = useCrypto();
  const calendarEvents = useCalendarEvents();
  
  // Email state
  const [emails, setEmails] = useState(storage.getEmailNotifications());

  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'calendar', type: 'calendar', enabled: true },
    { id: 'email', type: 'email', enabled: true },
    { id: 'news', type: 'news', enabled: true },
    { id: 'powerpoint', type: 'powerpoint', enabled: true },
    { id: 'word', type: 'word', enabled: true },
    { id: 'excel', type: 'excel', enabled: true },
    { id: 'weather', type: 'weather', enabled: true },
    { id: 'crypto', type: 'crypto', enabled: true },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleMarkEmailAsRead = (id: string) => {
    const updated = storage.markEmailAsRead(id);
    setEmails(updated);
  };

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, enabled: !w.enabled } : w));
  };

  const filteredWidgets = widgets.filter(w => 
    searchQuery === '' || w.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute right-0 top-0 bottom-14 w-[500px] bg-white/95 backdrop-blur-xl shadow-2xl animate-slide-in-right flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-2 h-2 bg-gray-700 rounded-sm"></div>
            <div className="w-2 h-2 bg-gray-700 rounded-sm"></div>
            <div className="w-2 h-2 bg-gray-700 rounded-sm"></div>
            <div className="w-2 h-2 bg-gray-700 rounded-sm"></div>
          </div>
          <span className="font-semibold text-gray-800">Widgets</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <input
          type="text"
          placeholder="Search widget here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Widgets Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {/* Weather Widget */}
        {filteredWidgets.find(w => w.id === 'weather')?.enabled && (
          <WeatherWidget
            data={weather.weatherData}
            loading={weather.loading}
            error={weather.error}
            onRefresh={weather.refresh}
            onRemove={() => toggleWidget('weather')}
          />
        )}

        {/* Calendar Widget */}
        {filteredWidgets.find(w => w.id === 'calendar')?.enabled && (
          <CalendarWidget
            events={calendarEvents.getTodaysEvents()}
            onAddEvent={calendarEvents.addEvent}
            onToggleComplete={calendarEvents.toggleComplete}
            onDeleteEvent={calendarEvents.deleteEvent}
            onRemove={() => toggleWidget('calendar')}
          />
        )}

        {/* Email Widget */}
        {filteredWidgets.find(w => w.id === 'email')?.enabled && (
          <EmailWidget
            emails={emails}
            onMarkAsRead={handleMarkEmailAsRead}
            onRemove={() => toggleWidget('email')}
          />
        )}

        {/* News Widget */}
        {filteredWidgets.find(w => w.id === 'news')?.enabled && (
          <NewsWidget
            articles={news.articles}
            loading={news.loading}
            error={news.error}
            onRefresh={news.refresh}
            onRemove={() => toggleWidget('news')}
          />
        )}

        {/* Crypto Widget */}
        {filteredWidgets.find(w => w.id === 'crypto')?.enabled && (
          <CryptoWidget
            cryptoData={crypto.cryptoData}
            loading={crypto.loading}
            error={crypto.error}
            onRefresh={crypto.refresh}
            onRemove={() => toggleWidget('crypto')}
          />
        )}

        {/* Microsoft Office Widgets */}
        {filteredWidgets.find(w => w.id === 'powerpoint')?.enabled && (
          <PowerPointWidget onRemove={() => toggleWidget('powerpoint')} />
        )}

        {filteredWidgets.find(w => w.id === 'word')?.enabled && (
          <WordWidget onRemove={() => toggleWidget('word')} />
        )}

        {filteredWidgets.find(w => w.id === 'excel')?.enabled && (
          <ExcelWidget onRemove={() => toggleWidget('excel')} />
        )}

        {/* Add Widget Buttons for Disabled Widgets */}
        <div className="space-y-2 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-medium">Add more widgets</p>
          {widgets.filter(w => !w.enabled).map(widget => (
            <button
              key={widget.id}
              onClick={() => toggleWidget(widget.id)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-sm capitalize">{widget.type}</span>
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WidgetsPanel;
