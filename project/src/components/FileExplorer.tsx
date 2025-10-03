import { useState } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import {
  ChevronRight,
  ChevronDown,
  Home as HomeIcon,
  Folder,
  FolderOpen,
  HardDrive,
  Image as ImageIcon,
  Music as MusicIcon,
  Video as VideoIcon,
  Download,
  FileText,
  Pin,
  Cloud,
  Users,
  Clock,
  Star,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RotateCw,
  Search,
  Plus,
  Scissors,
  Copy,
  Clipboard,
  Trash2,
  Share2,
  MoreHorizontal,
  Grid3x3,
  List,
  ChevronUp,
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  icon: string;
  dateAccessed: string;
  location: string;
  size?: string;
  isPinned?: boolean;
  cloudSynced?: boolean;
}

interface FolderItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  path: string;
  isPinned?: boolean;
  children?: FolderItem[];
}

// File list data now comes from virtual file system via hook
// Placeholder interface kept for compatibility; will adapt rendering.

const quickAccessFolders: FileItem[] = [
  { id: 'qa1', name: 'Desktop', type: 'folder', icon: '🖥️', dateAccessed: '', location: 'Tafar - Personal', isPinned: true },
  { id: 'qa2', name: 'Downloads', type: 'folder', icon: '⬇️', dateAccessed: '', location: 'Stored locally', cloudSynced: false },
  { id: 'qa3', name: 'Documents', type: 'folder', icon: '📄', dateAccessed: '', location: 'Tafar - Personal', cloudSynced: true },
  { id: 'qa4', name: 'Pictures', type: 'folder', icon: '🖼️', dateAccessed: '', location: 'Tafar - Personal', cloudSynced: true },
  { id: 'qa5', name: 'Music', type: 'folder', icon: '🎵', dateAccessed: '', location: 'Stored locally', cloudSynced: false },
  { id: 'qa6', name: 'Videos', type: 'folder', icon: '🎬', dateAccessed: '', location: 'Stored locally', cloudSynced: false },
  { id: 'qa7', name: 'Code', type: 'folder', icon: '📁', dateAccessed: '', location: 'Tafar (E:)', isPinned: true },
  { id: 'qa8', name: 'Screenshots', type: 'folder', icon: '📁', dateAccessed: '', location: 'Tafar - Personal\\Pictures', isPinned: true },
];

const sidebarFolders: FolderItem[] = [
  { id: 'home', name: 'Home', icon: <HomeIcon className="w-4 h-4" />, path: '/Home', isPinned: true },
  { id: 'gallery', name: 'Gallery', icon: <ImageIcon className="w-4 h-4" />, path: '/Gallery' },
  { id: 'tafar', name: 'Tafar - Personal', icon: <Cloud className="w-4 h-4" />, path: '/Tafar', children: [] },
  { id: 'desktop', name: 'Desktop', icon: <Folder className="w-4 h-4" />, path: '/Desktop', isPinned: true },
  { id: 'downloads', name: 'Downloads', icon: <Download className="w-4 h-4" />, path: '/Downloads', isPinned: true },
  { id: 'documents', name: 'Documents', icon: <FileText className="w-4 h-4" />, path: '/Documents', isPinned: true },
  { id: 'pictures', name: 'Pictures', icon: <ImageIcon className="w-4 h-4" />, path: '/Pictures', isPinned: true },
  { id: 'music', name: 'Music', icon: <MusicIcon className="w-4 h-4" />, path: '/Music', isPinned: true },
  { id: 'videos', name: 'Videos', icon: <VideoIcon className="w-4 h-4" />, path: '/Videos', isPinned: true },
  { id: 'screenshots', name: 'Screenshots', icon: <Folder className="w-4 h-4" />, path: '/Screenshots', isPinned: true },
];

const drives: FolderItem[] = [
  { id: 'this-pc', name: 'This PC', icon: <HardDrive className="w-4 h-4" />, path: '/ThisPC', children: [
    { id: 'drive-c', name: 'Local Disk (C:)', icon: <HardDrive className="w-4 h-4" />, path: '/C:' },
    { id: 'drive-d', name: 'Glo (D:)', icon: <HardDrive className="w-4 h-4" />, path: '/D:' },
    { id: 'drive-e', name: 'Tafar (E:)', icon: <HardDrive className="w-4 h-4" />, path: '/E:' },
  ]},
  { id: 'network', name: 'Network', icon: <Cloud className="w-4 h-4" />, path: '/Network' },
];

function FileExplorer() {
  const [currentPath] = useState('Home');
  const [selectedTab, setSelectedTab] = useState<'recent' | 'favorites' | 'shared'>('recent');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['this-pc']);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { items: fsItems, createFolder } = useFileSystem('root');

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Title Bar - Integrated into Window Component */}
      
      {/* Navigation Bar */}
      <div className="h-12 flex items-center gap-2 px-4 border-b border-gray-200">
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <ArrowUp className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <RotateCw className="w-4 h-4 text-gray-600" />
        </button>
        
        {/* Breadcrumb */}
        <div className="flex-1 flex items-center gap-1 bg-white border border-gray-300 rounded px-3 py-1.5 mx-2">
          <HomeIcon className="w-4 h-4 text-gray-600" />
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-sm">{currentPath}</span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Home"
            className="w-64 pl-9 pr-4 py-1.5 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-12 flex items-center gap-1 px-4 border-b border-gray-200">
        <button className="flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Cut">
          <Scissors className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Copy">
          <Copy className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Paste">
          <Clipboard className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Rename">
          <FileText className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Share">
          <Share2 className="w-4 h-4 text-gray-600" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" title="Delete">
          <Trash2 className="w-4 h-4 text-gray-600" />
        </button>

        <div className="h-6 w-px bg-gray-300 mx-1" />

        <button className="flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors">
          <ChevronUp className="w-4 h-4" />
          <span>Sort</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors">
          <Grid3x3 className="w-4 h-4" />
          <span>View</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors">
          <span>Filter</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-600" />
        </button>

        <div className="flex-1" />

        <button 
          onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
        >
          {viewMode === 'list' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />}
          <span>Details</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 overflow-y-auto">
          <div className="p-2">
            {sidebarFolders.map((folder) => (
              <SidebarItem
                key={folder.id}
                folder={folder}
                isExpanded={expandedFolders.includes(folder.id)}
                onToggle={() => toggleFolder(folder.id)}
              />
            ))}

            <div className="mt-4">
              {drives.map((drive) => (
                <SidebarItem
                  key={drive.id}
                  folder={drive}
                  isExpanded={expandedFolders.includes(drive.id)}
                  onToggle={() => toggleFolder(drive.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Quick Access Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <ChevronDown className="w-4 h-4 text-gray-600" />
              <h2 className="text-sm font-semibold">Quick access</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {quickAccessFolders.map((folder) => (
                <QuickAccessCard key={folder.id} folder={folder} />
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 px-4 pt-3 pb-2">
            <button
              onClick={() => setSelectedTab('recent')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                selectedTab === 'recent' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Recent</span>
            </button>
            <button
              onClick={() => setSelectedTab('favorites')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                selectedTab === 'favorites' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Favorites</span>
            </button>
            <button
              onClick={() => setSelectedTab('shared')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                selectedTab === 'shared' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Shared</span>
            </button>
          </div>

          {/* File List */}
          <div className="flex-1 overflow-y-auto">
            {selectedTab === 'recent' && (
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-600 border-b border-gray-200">
                      <th className="pb-2 font-medium">Name</th>
                      <th className="pb-2 font-medium">Date accessed</th>
                      <th className="pb-2 font-medium">File location</th>
                      <th className="pb-2 font-medium">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fsItems.map((file) => (
                      <tr
                        key={file.id}
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="py-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{file.icon}</span>
                            <span className="text-sm">{file.name}</span>
                          </div>
                        </td>
                        <td className="py-2 text-sm text-gray-600">{new Date(file.updatedAt ?? Date.now()).toLocaleString()}</td>
                        <td className="py-2 text-sm text-gray-600">/</td>
                        <td className="py-2"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {selectedTab === 'favorites' && (
              <div className="p-4 text-center text-gray-500">
                <Star className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No favorite items yet</p>
              </div>
            )}
            {selectedTab === 'shared' && (
              <div className="p-4 text-center text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No shared items</p>
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="h-8 flex items-center justify-between px-4 border-t border-gray-200 bg-gray-50">
            <span className="text-xs text-gray-600">{fsItems.length} items</span>
            <div className="flex items-center gap-4">
              <button className="p-1 hover:bg-gray-200 rounded">
                <List className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded">
                <Grid3x3 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ folder, isExpanded, onToggle }: { folder: FolderItem; isExpanded: boolean; onToggle: () => void }) {
  const hasChildren = folder.children && folder.children.length > 0;

  return (
    <div>
      <button
        onClick={hasChildren ? onToggle : undefined}
        className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded text-sm transition-colors group"
      >
        {hasChildren && (
          isExpanded ? <ChevronDown className="w-3 h-3 text-gray-600" /> : <ChevronRight className="w-3 h-3 text-gray-600" />
        )}
        {folder.icon}
        <span className="flex-1 text-left text-gray-700">{folder.name}</span>
        {folder.isPinned && <Pin className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100" />}
      </button>
      {hasChildren && isExpanded && (
        <div className="ml-4">
          {folder.children.map((child) => (
            <SidebarItem
              key={child.id}
              folder={child}
              isExpanded={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function QuickAccessCard({ folder }: { folder: FileItem }) {
  return (
    <div className="group relative flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
      {folder.isPinned && (
        <div className="absolute top-1 left-1">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
      )}
      <div className="text-3xl">{folder.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{folder.name}</div>
        <div className="text-xs text-gray-500 truncate flex items-center gap-1">
          {folder.cloudSynced !== undefined && (
            folder.cloudSynced ? <Cloud className="w-3 h-3" /> : null
          )}
          {folder.location}
        </div>
      </div>
      {folder.cloudSynced === false && (
        <Download className="w-4 h-4 text-gray-400" />
      )}
    </div>
  );
}

export default FileExplorer;


