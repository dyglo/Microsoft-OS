import { useState } from 'react';
import { Search, Chrome, Mail, Calendar, Settings, Folder, MessageSquare, Image, Music, Video, Calculator, Terminal, ChevronDown, Check } from 'lucide-react';
import FileExplorer from './FileExplorer';
import TaskApp from './TaskApp';
import SettingsLayout from './Settings/SettingsLayout';
import PowerOptionsPanel from './StartMenu/PowerOptionsPanel';
import UserProfileMenu from './StartMenu/UserProfileMenu';
import SearchResults from './StartMenu/SearchResults';
import RecentItemsList from './StartMenu/RecentItemsList';
import { UserProfile, SearchResult } from '../types/enhancements';
import { useRecentItems } from '../hooks/useRecentItems';
import { storage } from '../utils/storage';

interface StartMenuProps {
  onClose: () => void;
  onOpenApp: (appId: string, title: string, component: React.ReactNode, icon?: React.ReactNode) => void;
  onLock: () => void;
  onSleep: () => void;
  onShutdown: () => void;
  onRestart: () => void;
  onSignOut: () => void;
  onAccountSettings: () => void;
  onChangePicture: () => void;
  userProfile: UserProfile;
}

function StartMenu({ onClose, onOpenApp, onLock, onSleep, onShutdown, onRestart, onSignOut, onAccountSettings, onChangePicture, userProfile }: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { recentItems } = useRecentItems();
  const handleAppClick = (appId: string, title: string, icon: React.ReactNode) => {
    let content;
    
    // Special handling for specific apps
    if (appId === 'explorer') {
      content = <FileExplorer />;
    } else if (appId === 'tasks') {
      content = <TaskApp />;
    } else if (appId === 'settings') {
      // Settings needs special handling for wallpaper changes
      const handleWallpaperChange = (url: string) => {
        storage.setWallpaper(url);
        // Trigger a reload to apply wallpaper (temporary solution)
        setTimeout(() => window.location.reload(), 100);
      };
      content = <SettingsLayout onClose={onClose} onMinimize={() => {}} onWallpaperChange={handleWallpaperChange} />;
    } else {
      content = <div className="p-4"><h2 className="text-xl font-bold mb-2">{title}</h2><p>This is a placeholder for {title} app.</p></div>;
    }
    
    onOpenApp(appId, title, content, icon);
    onClose();
  };

  const handleRecentItemClick = (item: any) => {
    if (item.appId) {
      // Reopen the app
      const appIcon = item.icon || '📱';
      handleAppClick(item.appId, item.title, appIcon);
    }
  };

  // Search functionality
  const pinnedApps = [
    { id: 'edge', title: 'Edge', icon: '🌐', description: 'Web browser' },
    { id: 'mail', title: 'Mail', icon: '📧', description: 'Email client' },
    { id: 'calendar', title: 'Calendar', icon: '📅', description: 'Calendar app' },
    { id: 'explorer', title: 'File Explorer', icon: '📁', description: 'Browse files and folders' },
    { id: 'settings', title: 'Settings', icon: '⚙️', description: 'System settings' },
    { id: 'photos', title: 'Photos', icon: '🖼️', description: 'View photos' },
    { id: 'music', title: 'Music', icon: '🎵', description: 'Music player' },
    { id: 'videos', title: 'Videos', icon: '🎬', description: 'Video player' },
    { id: 'messages', title: 'Messages', icon: '💬', description: 'Messaging app' },
    { id: 'calculator', title: 'Calculator', icon: '🔢', description: 'Calculator' },
    { id: 'terminal', title: 'Terminal', icon: '💻', description: 'Command line' },
    { id: 'tasks', title: 'Tasks', icon: '✅', description: 'Task manager' },
    { id: 'store', title: 'Store', icon: '🏪', description: 'App store' },
  ];

  const searchResults: SearchResult[] = searchQuery.length >= 2 
    ? pinnedApps
        .filter(app => 
          app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map(app => ({
          id: app.id,
          title: app.title,
          type: 'app' as const,
          icon: app.icon,
          description: app.description,
          action: () => handleAppClick(app.id, app.title, app.icon),
          relevance: 1,
        }))
    : [];

  const handleSearchResultClick = (result: SearchResult) => {
    result.action();
    onClose();
  };

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-[680px] max-h-[680px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl animate-scale-in overflow-hidden flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-3">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for apps, settings, and documents"
              className="flex-1 bg-transparent outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* Search Results or Content */}
        {searchQuery.length >= 2 ? (
          <div className="flex-1 overflow-y-auto">
            <SearchResults 
              results={searchResults} 
              query={searchQuery}
              onResultClick={handleSearchResultClick}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Pinned Apps */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold">Pinned</div>
                <button className="text-xs text-gray-600 hover:text-gray-900">All apps &gt;</button>
              </div>
              <div className="grid grid-cols-6 gap-4">
                <AppTile icon={<Chrome className="w-7 h-7 text-white" />} label="Edge" color="from-blue-500 to-blue-600" onClick={() => handleAppClick('edge', 'Edge', '🌐')} />
                <AppTile icon={<Mail className="w-7 h-7 text-white" />} label="Mail" color="from-sky-400 to-sky-600" onClick={() => handleAppClick('mail', 'Mail', '📧')} />
                <AppTile icon={<Calendar className="w-7 h-7 text-white" />} label="Calendar" color="from-blue-600 to-blue-700" onClick={() => handleAppClick('calendar', 'Calendar', '📅')} />
                <AppTile icon={<Folder className="w-7 h-7 text-white" />} label="File Explorer" color="from-yellow-500 to-yellow-600" onClick={() => handleAppClick('explorer', 'File Explorer', '📁')} />
                <AppTile icon={<Check className="w-7 h-7 text-white" />} label="Tasks" color="from-green-500 to-green-600" onClick={() => handleAppClick('tasks', 'Tasks', '✅')} />
                <AppTile icon={<Settings className="w-7 h-7 text-white" />} label="Settings" color="from-gray-500 to-gray-600" onClick={() => handleAppClick('settings', 'Settings', '⚙️')} />
                <AppTile icon={<Image className="w-7 h-7 text-white" />} label="Photos" color="from-blue-400 to-blue-500" onClick={() => handleAppClick('photos', 'Photos', '🖼️')} />
                <AppTile icon={<Music className="w-7 h-7 text-white" />} label="Music" color="from-orange-500 to-orange-600" onClick={() => handleAppClick('music', 'Music', '🎵')} />
                <AppTile icon={<Video className="w-7 h-7 text-white" />} label="Videos" color="from-purple-500 to-purple-600" onClick={() => handleAppClick('videos', 'Videos', '🎬')} />
                <AppTile icon={<MessageSquare className="w-7 h-7 text-white" />} label="Messages" color="from-green-500 to-green-600" onClick={() => handleAppClick('messages', 'Messages', '💬')} />
                <AppTile icon={<Calculator className="w-7 h-7 text-white" />} label="Calculator" color="from-slate-600 to-slate-700" onClick={() => handleAppClick('calculator', 'Calculator', '🔢')} />
                <AppTile icon={<Terminal className="w-7 h-7 text-white" />} label="Terminal" color="from-gray-700 to-gray-800" onClick={() => handleAppClick('terminal', 'Terminal', '💻')} />
                <AppTile icon={<div className="w-7 h-7 bg-white rounded" />} label="Store" color="from-blue-500 to-blue-600" onClick={() => handleAppClick('store', 'Store', '🏪')} />
              </div>
            </div>

            {/* Recommended */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold">Recommended</div>
                <button className="text-xs text-gray-600 hover:text-gray-900">More &gt;</button>
              </div>
              <RecentItemsList items={recentItems} onItemClick={handleRecentItemClick} />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="h-14 bg-gray-100/80 backdrop-blur flex items-center justify-between px-6 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setUserMenuOpen(!userMenuOpen);
            }}
            className="flex items-center gap-2 hover:bg-gray-200 rounded px-2 py-1 transition-colors relative"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {userProfile.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{userProfile.name}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            
            {/* User Profile Menu */}
            {userMenuOpen && (
              <UserProfileMenu
                user={userProfile}
                onChangePicture={onChangePicture}
                onAccountSettings={onAccountSettings}
                onSignOut={onSignOut}
                onClose={() => setUserMenuOpen(false)}
              />
            )}
          </button>
        </div>
      </div>

      {/* Power Options Panel */}
      <PowerOptionsPanel
        onLock={onLock}
        onSleep={onSleep}
        onShutdown={onShutdown}
        onRestart={onRestart}
      />
    </div>
  );
}

function AppTile({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center shadow-sm`}>
        {icon}
      </div>
      <span className="text-xs text-center leading-tight text-gray-700">{label}</span>
    </button>
  );
}


export default StartMenu;
