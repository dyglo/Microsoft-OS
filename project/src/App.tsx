import { useState, useEffect } from 'react';
import Taskbar from './components/Taskbar';
import WidgetsPanel from './components/WidgetsPanel';
import StartMenu from './components/StartMenu';
import ContextMenu from './components/ContextMenu';
import Window from './components/Window';
import NotificationPanel from './components/NotificationPanel';
import LockScreen from './components/SystemStates/LockScreen';
import ShutdownScreen from './components/SystemStates/ShutdownScreen';
import SettingsLayout from './components/Settings/SettingsLayout';
import { DesktopIcon as DesktopIconType, AppWindow } from './types';
import { SystemState, UserProfile } from './types/enhancements';
import { storage } from './utils/storage';
import { useRecentItems } from './hooks/useRecentItems';
import { RefreshCw, FolderPlus, Palette } from 'lucide-react';
import { 
  RecycleBinIcon, ThisPCIcon, FolderIcon, ChromeIcon, ExcelIcon, 
  WordIcon, VSCodeIcon, CursorAIIcon, PowerPointIcon 
} from './components/Icons/AppIcons';
import FileExplorer from './components/FileExplorer';

function App() {
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [desktopIcons, setDesktopIcons] = useState<DesktopIconType[]>([]);
  const [wallpaper, setWallpaper] = useState('/pexels-pixabay-50594.jpg');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  
  // Step 3: System state management
  const [systemState, setSystemState] = useState<SystemState>('active');
  const [userProfile, setUserProfile] = useState<UserProfile>(storage.getUserProfile());
  const { addRecentItem } = useRecentItems();

  // Load saved state on mount
  useEffect(() => {
    // Check if we need to migrate old emoji icons to new SVG icons
    const savedIcons = localStorage.getItem('windows_desktop_icons');
    if (savedIcons) {
      const icons = JSON.parse(savedIcons);
      // Check if icons still use emoji format (old system)
      const hasOldIcons = icons.some((icon: DesktopIconType) => 
        icon.icon && icon.icon.length <= 3 && /[\u{1F000}-\u{1F9FF}]/u.test(icon.icon)
      );
      
      if (hasOldIcons) {
        // Clear old icons to force loading new defaults
        localStorage.removeItem('windows_desktop_icons');
      }
    }
    
    setDesktopIcons(storage.getDesktopIcons());
    setWallpaper(storage.getWallpaper());
    setSystemState(storage.getSystemState());
    setUserProfile(storage.getUserProfile());
  }, []);

  // Save icons when they change
  useEffect(() => {
    if (desktopIcons.length > 0) {
      storage.setDesktopIcons(desktopIcons);
    }
  }, [desktopIcons]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleWidgets = () => {
    setWidgetsOpen(!widgetsOpen);
    if (startMenuOpen) setStartMenuOpen(false);
    if (notificationOpen) setNotificationOpen(false);
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen);
    if (widgetsOpen) setWidgetsOpen(false);
    if (notificationOpen) setNotificationOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
    if (widgetsOpen) setWidgetsOpen(false);
    if (startMenuOpen) setStartMenuOpen(false);
  };

  const closeAll = () => {
    setWidgetsOpen(false);
    setStartMenuOpen(false);
    setNotificationOpen(false);
    setContextMenu(null);
  };

  const handleDesktopRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleNewFolder = () => {
    const newIcon: DesktopIconType = {
      id: Date.now().toString(),
      label: 'New Folder',
      icon: '📁',
      x: 32,
      y: desktopIcons.length * 96 + 32,
      type: 'folder',
    };
    setDesktopIcons([...desktopIcons, newIcon]);
  };

  const handleRefresh = () => {
    // Refresh action - could reload icons from storage
    setDesktopIcons(storage.getDesktopIcons());
  };

  const handleChangeWallpaper = () => {
    // In a real app, this would open a file picker
    const wallpapers = [
      '/pexels-pixabay-50594.jpg',
      '/download.jpg',
    ];
    const currentIndex = wallpapers.indexOf(wallpaper);
    const nextWallpaper = wallpapers[(currentIndex + 1) % wallpapers.length];
    setWallpaper(nextWallpaper);
    storage.setWallpaper(nextWallpaper);
  };

  const openWindow = (appId: string, title: string, component: React.ReactNode, icon?: React.ReactNode) => {
    const newWindow: AppWindow = {
      id: Date.now().toString(),
      appId,
      title,
      icon,
      component,
      isMinimized: false,
      isActive: true,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: { width: 800, height: 600 },
    };
    setWindows([...windows.map(w => ({ ...w, isActive: false })), newWindow]);
    setActiveWindowId(newWindow.id);
    
    // Track as recent item
    addRecentItem({
      title,
      type: 'app',
      icon: icon || '📱',
      subtitle: 'Recently opened',
      appId,
    });
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(windows[windows.length - 2]?.id || null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const restoreWindow = (id: string) => {
    setWindows(windows.map(w => ({ ...w, isMinimized: w.id === id ? false : w.isMinimized, isActive: w.id === id })));
    setActiveWindowId(id);
  };

  const focusWindow = (id: string) => {
    setWindows(windows.map(w => ({ ...w, isActive: w.id === id })));
    setActiveWindowId(id);
  };

  const updateIconPosition = (id: string, x: number, y: number) => {
    setDesktopIcons(desktopIcons.map(icon => 
      icon.id === id ? { ...icon, x, y } : icon
    ));
  };

  // Step 3: Power management handlers
  const handleLock = () => {
    setSystemState('locked');
    storage.setSystemState('locked');
    closeAll();
  };

  const handleUnlock = () => {
    setSystemState('active');
    storage.setSystemState('active');
  };

  const handleSleep = () => {
    setSystemState('sleeping');
    storage.setSystemState('sleeping');
    closeAll();
  };

  const handleWakeUp = () => {
    setSystemState('active');
    storage.setSystemState('active');
  };

  const handleShutdown = () => {
    setSystemState('shutting-down');
    storage.setSystemState('shutting-down');
    closeAll();
    
    // Simulate shutdown delay
    setTimeout(() => {
      storage.clearSession();
      window.location.reload();
    }, 3000);
  };

  const handleRestart = () => {
    setSystemState('restarting');
    storage.setSystemState('restarting');
    closeAll();
    
    // Simulate restart delay
    setTimeout(() => {
      storage.clearSession();
      window.location.reload();
    }, 3000);
  };

  const handleSignOut = () => {
    storage.clearSession();
    window.location.reload();
  };

  const handleAccountSettings = () => {
    openWindow('settings', 'Settings', <SettingsLayout onClose={() => closeWindow('settings')} onMinimize={() => minimizeWindow('settings')} onWallpaperChange={handleChangeWallpaperDirect} />, '⚙️');
  };

  const handleChangeWallpaperDirect = (url: string) => {
    setWallpaper(url);
    storage.setWallpaper(url);
  };

  const handleChangePicture = () => {
    // Placeholder for changing user picture
    alert('Change picture functionality - would open file picker in real implementation');
  };

  const getIconElement = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'recycle-bin': <RecycleBinIcon className="w-6 h-6" />,
      'folder': <FolderIcon className="w-6 h-6" />,
      'chrome': <ChromeIcon className="w-6 h-6" />,
      'excel': <ExcelIcon className="w-6 h-6" />,
      'word': <WordIcon className="w-6 h-6" />,
      'vscode': <VSCodeIcon className="w-6 h-6" />,
      'cursor': <CursorAIIcon className="w-6 h-6" />,
      'powerpoint': <PowerPointIcon className="w-6 h-6" />,
    };
    return iconMap[iconName] || iconName;
  };

  const contextMenuItems = [
    {
      label: 'Refresh',
      icon: <RefreshCw className="w-4 h-4" />,
      onClick: handleRefresh,
    },
    {
      label: 'New Folder',
      icon: <FolderPlus className="w-4 h-4" />,
      onClick: handleNewFolder,
    },
    { label: '', icon: null, onClick: () => {}, divider: true },
    {
      label: 'Change Wallpaper',
      icon: <Palette className="w-4 h-4" />,
      onClick: handleChangeWallpaper,
    },
  ];

  // Render system state overlays
  if (systemState === 'locked') {
    return <LockScreen user={userProfile} wallpaper={wallpaper} onUnlock={handleUnlock} />;
  }

  if (systemState === 'shutting-down') {
    return <ShutdownScreen type="shutdown" />;
  }

  if (systemState === 'restarting') {
    return <ShutdownScreen type="restart" />;
  }

  if (systemState === 'sleeping') {
    return (
      <div onClick={handleWakeUp} className="cursor-pointer">
        <ShutdownScreen type="sleep" />
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      onClick={closeAll}
      onContextMenu={handleDesktopRightClick}
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Main Desktop Area */}
      <div className="h-full w-full relative">
        {/* Desktop Icons */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {desktopIcons.map((icon) => (
            <DraggableDesktopIcon
              key={icon.id}
              icon={icon}
              onPositionChange={updateIconPosition}
              onDoubleClick={() => {
                // Handle icon double-click to open
                if (icon.type === 'folder' || icon.type === 'app') {
                  let content;
                  let iconElement = getIconElement(icon.icon);
                  
                  // Special handling for specific apps
                  if (icon.label === 'File Explorer' || icon.icon === 'folder') {
                    content = <FileExplorer />;
                  } else {
                    content = <div className="p-4"><h2 className="text-xl font-bold mb-2">{icon.label}</h2><p>This is a placeholder for {icon.label} app.</p></div>;
                  }
                  
                  openWindow(icon.id, icon.label, content, iconElement);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          isActive={window.isActive}
          isMinimized={window.isMinimized}
          initialX={window.position.x}
          initialY={window.position.y}
          initialWidth={window.size.width}
          initialHeight={window.size.height}
        >
          {window.component}
        </Window>
      ))}

      {/* Widgets Panel */}
      {widgetsOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <WidgetsPanel onClose={() => setWidgetsOpen(false)} />
        </div>
      )}

      {/* Start Menu */}
      {startMenuOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <StartMenu 
            onClose={() => setStartMenuOpen(false)} 
            onOpenApp={openWindow}
            onLock={handleLock}
            onSleep={handleSleep}
            onShutdown={handleShutdown}
            onRestart={handleRestart}
            onSignOut={handleSignOut}
            onAccountSettings={handleAccountSettings}
            onChangePicture={handleChangePicture}
            userProfile={userProfile}
          />
        </div>
      )}

      {/* Notification Panel */}
      {notificationOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <NotificationPanel onClose={() => setNotificationOpen(false)} />
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        onWidgetsClick={toggleWidgets}
        onStartClick={toggleStartMenu}
        onNotificationClick={toggleNotifications}
        widgetsActive={widgetsOpen}
        startActive={startMenuOpen}
        notificationActive={notificationOpen}
        currentTime={currentTime}
        openWindows={windows}
        onWindowClick={restoreWindow}
        onOpenApp={openWindow}
      />
    </div>
  );
}

function DraggableDesktopIcon({
  icon,
  onPositionChange,
  onDoubleClick,
}: {
  icon: DesktopIconType;
  onPositionChange: (id: string, x: number, y: number) => void;
  onDoubleClick: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: icon.x, y: icon.y });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onPositionChange(icon.id, position.x, position.y);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, position, icon.id, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setIsDragging(true);
  };

  const getIconDisplay = (iconName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      'recycle-bin': <RecycleBinIcon className="w-12 h-12" />,
      'folder': <FolderIcon className="w-12 h-12" />,
      'chrome': <ChromeIcon className="w-12 h-12" />,
      'excel': <ExcelIcon className="w-12 h-12" />,
      'word': <WordIcon className="w-12 h-12" />,
      'vscode': <VSCodeIcon className="w-12 h-12" />,
      'cursor': <CursorAIIcon className="w-12 h-12" />,
      'powerpoint': <PowerPointIcon className="w-12 h-12" />,
    };
    return iconMap[iconName] || <span className="text-4xl">{iconName}</span>;
  };

  return (
    <button
      className="absolute flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 transition-colors w-24 pointer-events-auto"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
    >
      <div className="flex items-center justify-center">{getIconDisplay(icon.icon)}</div>
      <span className="text-white text-xs text-center drop-shadow-lg leading-tight">{icon.label}</span>
    </button>
  );
}

export default App;
