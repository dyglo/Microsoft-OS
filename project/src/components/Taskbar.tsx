import { Search, Wifi, Volume2, Battery } from 'lucide-react';
import Copilot from './Copilot';
import { useState } from 'react';
import { AppWindow } from '../types';
import FileExplorer from './FileExplorer';
import { TeamsIcon } from './Icons/AppIcons';

interface TaskbarProps {
  onWidgetsClick: (e: React.MouseEvent) => void;
  onStartClick: (e: React.MouseEvent) => void;
  onNotificationClick: (e: React.MouseEvent) => void;
  widgetsActive: boolean;
  startActive: boolean;
  notificationActive: boolean;
  currentTime: Date;
  openWindows: AppWindow[];
  onWindowClick: (id: string) => void;
  onOpenApp?: (appId: string, title: string, component: React.ReactNode, icon?: React.ReactNode) => void;
}

function Taskbar({ onWidgetsClick, onStartClick, onNotificationClick, widgetsActive, startActive, notificationActive, currentTime, openWindows, onWindowClick, onOpenApp }: TaskbarProps) {
  const [taskViewActive, setTaskViewActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleFileExplorerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenApp) {
      onOpenApp('explorer', 'File Explorer', <FileExplorer />, '📁');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleTaskView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTaskViewActive(!taskViewActive);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-14 flex items-center justify-center">
      {/* Taskbar Background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border-t border-white/20" />

      <div className="relative z-10 flex items-center gap-1 px-2">
        {/* Start Button - Windows Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStartClick(e);
          }}
          className={`h-10 px-3 rounded-md transition-all ${
            startActive ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0,0,256,256">
            <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
              <g transform="scale(8.53333,8.53333)">
                <path d="M4,4h10v10h-10zM16,4h10v10h-10zM4,16h10v10h-10zM16,16h10v10h-10z"></path>
              </g>
            </g>
          </svg>
        </button>

        {/* Search */}
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSearchOpen(!searchOpen);
            }}
            className={`h-10 px-4 rounded-md transition-all flex items-center gap-2 ${
              searchOpen ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <Search className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-sm">Search</span>
          </button>
          
          {searchOpen && (
            <div className="absolute bottom-12 left-0 w-96 bg-white/95 backdrop-blur-xl rounded-lg shadow-2xl p-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for apps, files, and settings"
                className="w-full px-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              {searchQuery && (
                <div className="mt-2 text-sm text-gray-600">
                  Searching for "{searchQuery}"...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Task View Button */}
        <button
          onClick={handleTaskView}
          className={`h-10 w-10 rounded-md transition-all flex items-center justify-center ${
            taskViewActive ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <img src="/icons8-task-view-48.png" alt="Task View" className="w-6 h-6" />
        </button>

        {/* App Icons */}
        <div className="flex items-center gap-1 mx-2">
          {/* File Explorer - Folder Icon */}
          <button onClick={handleFileExplorerClick} className="h-10 w-10 rounded-md hover:bg-white/10 transition-all flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 64 64">
              <path fill="orange" d="M49,19.999V52H13c-2.761,0-5-2.239-5-5V15c0-2.209,1.791-4,4-4h11.046	c1.756,0,3.307,1.145,3.823,2.824l0.234,0.761c0.258,0.839,1.033,1.412,1.911,1.412l15.986,0.003C47.21,16,49,17.79,49,19.999z"></path>
              <ellipse cx="32" cy="60.993" opacity=".3" rx="22.563" ry="3"></ellipse>
              <path fill="#ffce29" d="M55.22,23H24.7c-3.319,0-6.182,2.331-6.855,5.582L13,52h36.3c3.319,0,6.182-2.331,6.855-5.582	l3.674-17.758C60.433,25.739,58.203,23,55.22,23z"></path>
              <path fill="#fff" d="M46,23H24.7c-3.319,0-6.182,2.331-6.855,5.582L15.775,38.59c0,0,0,0,0.001,0 c0.342,0.07,0.682,0.104,1.018,0.104c2.321,0,4.402-1.626,4.892-3.988l1.058-5.112C22.934,28.67,23.757,28,24.7,28H41 C43.762,28,46,25.762,46,23z" opacity=".3"></path>
              <path d="M56.155,46.418l2.984-14.424c0,0,0,0-0.001,0c-2.711-0.558-5.35,1.181-5.909,3.884l-1.971,9.526 C51.067,46.329,50.244,47,49.301,47H39c-2.762,0-5,2.238-5,5h15.3C52.62,52,55.483,49.669,56.155,46.418z" opacity=".15"></path>
              <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M20.779,31.681l0.494-2.39c0.334-1.617,1.775-2.791,3.427-2.791h3.738"></path>
            </svg>
          </button>

          {/* Microsoft Copilot */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenApp) {
                onOpenApp('copilot', 'Copilot', <Copilot />, '💡');
              }
            }}
            className="h-10 w-10 rounded-md hover:bg-white/10 transition-all flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 50 50">
              <path fill="#ffffff" d="M 15.939453 3 C 11.043453 3 6.8102969 6.1498438 5.4042969 10.839844 L 0.47265625 27.275391 C -0.07734375 29.110391 0.26225 31.045031 1.40625 32.582031 C 1.51625 32.729031 1.6378125 32.865 1.7578125 33 L 15.523438 33 C 16.858438 33 18.013484 32.140328 18.396484 30.861328 L 24.816406 9.4628906 C 25.015406 8.8008906 26.861 3 30.5 3 L 15.939453 3 z M 30.5 5 C 28.796 5 27.226422 8.3941094 26.732422 10.037109 L 24.029297 19.046875 C 24.389297 18.413875 25.826781 16.508047 29.925781 16.748047 C 30.773781 15.076047 32.495266 14 34.447266 14 L 38.736328 14 L 36.636719 7.2480469 C 36.381719 6.3940469 35.927609 5.638 35.349609 5 L 30.5 5 z M 34.447266 16 C 33.102266 16 31.893812 16.880578 31.507812 18.142578 L 24.978516 39.542969 C 24.776516 40.203969 22.901797 46 19.216797 46 L 34.025391 46 C 38.995391 46 43.294656 42.851063 44.722656 38.164062 L 49.738281 21.728516 C 50.293281 19.913516 49.960172 17.993891 48.826172 16.462891 C 48.705172 16.300891 48.573453 16.148 48.439453 16 L 34.447266 16 z M 25.052734 32.443359 C 23.964734 32.970359 21.489125 33.090125 19.453125 33.078125 C 18.529125 34.265125 17.107437 35 15.523438 35 L 10.814453 35 C 11.857453 35.39 12.879672 36.01625 13.263672 38.28125 L 13.414062 39.197266 C 13.740063 41.191266 14.014719 42.822 14.886719 44 L 19.214844 44 C 21.093844 44 22.662453 40.266031 23.064453 38.957031 L 25.052734 32.443359 z"></path>
            </svg>
          </button>

          {/* Microsoft Teams */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenApp) {
                onOpenApp('teams', 'Microsoft Teams', <div className="p-4"><h2 className="text-xl font-bold mb-2">Microsoft Teams</h2><p>Teams collaboration app coming soon.</p></div>, <TeamsIcon className="w-6 h-6" />);
              }
            }}
            className="h-10 w-10 rounded-md hover:bg-white/10 transition-all flex items-center justify-center"
          >
            <TeamsIcon className="w-6 h-6" />
          </button>

          {/* Open Windows */}
          {openWindows.filter(w => !w.isMinimized).map((window) => (
            <button
              key={window.id}
              onClick={(e) => {
                e.stopPropagation();
                onWindowClick(window.id);
              }}
              className={`h-10 px-3 rounded-md transition-all flex items-center gap-2 ${
                window.isActive ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              {window.icon && <span className="text-sm">{window.icon}</span>}
              <span className="text-white/80 text-sm max-w-[100px] truncate">{window.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* System Tray */}
      <div className="absolute right-4 flex items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWidgetsClick(e);
          }}
          className={`h-10 px-3 rounded-md transition-all flex items-center gap-2 ${
            widgetsActive ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
            <path fill="#1976d2" d="M6,6h17v17H6V6z"></path>
            <path fill="#1976d2" d="M25.042,22.958V6H42v16.958H25.042z"></path>
            <path fill="#1976d2" d="M6,25h17v17H6V25z"></path>
            <path fill="#1976d2" d="M25,42V25h17v17H25z"></path>
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNotificationClick(e);
          }}
          className="flex items-center gap-2 text-white/90 text-xs hover:bg-white/10 px-2 py-1 rounded transition-colors"
        >
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onNotificationClick(e);
          }}
          className={`text-white/90 text-xs text-right px-2 py-1 rounded transition-colors ${
            notificationActive ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          <div className="font-medium">{formatTime(currentTime)}</div>
          <div className="text-[10px]">{formatShortDate(currentTime)}</div>
        </button>
      </div>
    </div>
  );
}

export default Taskbar;
