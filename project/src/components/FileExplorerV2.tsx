import { useState, useRef } from 'react';
import { useFileSystem } from '../hooks/useFileSystem';
import { FileSystemItem, FolderItem, FileItem } from '../types/fileSystem';
import {
  Trash2,
  Copy,
  Scissors,
  Clipboard,
  FolderPlus,
  FileText,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Folder,
  ArrowLeft,
  ArrowRight,
  Search,
} from 'lucide-react';

interface FileExplorerV2Props {
  initialPath?: string;
}

export function FileExplorerV2({ initialPath = 'root' }: FileExplorerV2Props) {
  const [currentPathId, setCurrentPathId] = useState<string | null>(initialPath === 'root' ? 'root' : null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [clipboard, setClipboard] = useState<{ items: string[]; operation: 'copy' | 'cut' }>({ items: [], operation: 'copy' });
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; itemId: string } | null>(null);
  const { items, refresh, createFolder, createFile, deleteItem, renameItem } = useFileSystem(currentPathId);

  const currentItems = items;
  const breadcrumb = [{ id: 'root', name: 'Root' }];

  const handleCreateFolder = () => {
    const name = prompt('Folder name:');
    if (name) {
      createFolder(name);
      refresh();
    }
  };

  const handleCreateFile = () => {
    const name = prompt('File name:');
    if (name) {
      createFile(name);
      refresh();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this item?')) {
      deleteItem(id);
      refresh();
      setSelectedItems(selectedItems.filter(i => i !== id));
    }
  };

  const handleRename = (id: string) => {
    renameItem(id, newName);
    setRenaming(null);
    setNewName('');
    refresh();
  };

  const handleCopy = () => {
    if (selectedItems.length > 0) {
      setClipboard({ items: selectedItems, operation: 'copy' });
    }
  };

  const handleCut = () => {
    if (selectedItems.length > 0) {
      setClipboard({ items: selectedItems, operation: 'cut' });
    }
  };

  const handlePaste = () => {
    if (clipboard.items.length > 0 && currentPathId) {
      // For cut, we'd move; for copy, we'd duplicate
      // For now, this is a simplified implementation
      setClipboard({ items: [], operation: 'copy' });
    }
  };

  const getFileIcon = (item: FileSystemItem) => {
    if (item.type === 'folder') {
      return <Folder className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  const handleContextMenu = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, itemId });
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Toolbar */}
      <div className="h-12 flex items-center gap-2 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-sm">
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Breadcrumb */}
        <div className="flex-1 flex items-center gap-1 px-3 text-sm text-gray-600 dark:text-gray-400">
          {breadcrumb.map((item) => (
            <div key={item.id} className="flex items-center gap-1">
              <span>{item.name}</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-48">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="h-10 flex items-center gap-1 px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          onClick={handleCreateFolder}
          className="flex items-center gap-1 px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
        >
          <FolderPlus className="w-4 h-4" />
          New Folder
        </button>
        <button
          onClick={handleCreateFile}
          className="flex items-center gap-1 px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors"
        >
          <FileText className="w-4 h-4" />
          New File
        </button>

        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

        <button
          onClick={handleCopy}
          disabled={selectedItems.length === 0}
          className="flex items-center gap-1 px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors disabled:opacity-50"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
        <button
          onClick={handleCut}
          disabled={selectedItems.length === 0}
          className="flex items-center gap-1 px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors disabled:opacity-50"
        >
          <Scissors className="w-4 h-4" />
          Cut
        </button>
        <button
          onClick={handlePaste}
          disabled={clipboard.items.length === 0}
          className="flex items-center gap-1 px-3 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm transition-colors disabled:opacity-50"
        >
          <Clipboard className="w-4 h-4" />
          Paste
        </button>
        <button
          onClick={() => selectedItems.length > 0 && handleDelete(selectedItems[0])}
          disabled={selectedItems.length === 0}
          className="flex items-center gap-1 px-3 py-1 hover:bg-red-100 dark:hover:bg-red-900 rounded text-sm transition-colors disabled:opacity-50 text-red-600 dark:text-red-400"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {currentItems.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            This folder is empty
          </div>
        ) : (
          <div className="border-b border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="sticky top-0 h-8 flex items-center gap-4 px-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <div className="flex-1">Name</div>
              <div className="w-24">Type</div>
              <div className="w-32">Modified</div>
              <div className="w-20">Size</div>
            </div>

            {/* Items */}
            {currentItems.map((item) => (
              <div
                key={item.id}
                onContextMenu={(e) => handleContextMenu(e, item.id)}
                onClick={() => {
                  if (renaming !== item.id) {
                    setSelectedItems(
                      selectedItems.includes(item.id)
                        ? selectedItems.filter((i) => i !== item.id)
                        : [...selectedItems, item.id]
                    );
                  }
                }}
                className={`h-8 flex items-center gap-4 px-4 border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedItems.includes(item.id) ? 'bg-blue-100 dark:bg-blue-900' : ''
                }`}
              >
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  {getFileIcon(item)}
                  {renaming === item.id ? (
                    <input
                      autoFocus
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={() => handleRename(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRename(item.id);
                        if (e.key === 'Escape') setRenaming(null);
                      }}
                      className="flex-1 px-2 py-1 border border-blue-500 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  ) : (
                    <span className="text-sm truncate">{item.name}</span>
                  )}
                </div>
                <div className="w-24 text-xs text-gray-600 dark:text-gray-400">
                  {item.type === 'folder' ? 'Folder' : 'File'}
                </div>
                <div className="w-32 text-xs text-gray-600 dark:text-gray-400">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </div>
                <div className="w-20 text-xs text-gray-600 dark:text-gray-400">
                  {item.type === 'file' && item.content ? `${item.content.length} B` : '—'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50 py-1 min-w-max"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onMouseLeave={() => setContextMenu(null)}
        >
          <button
            onClick={() => {
              setRenaming(contextMenu.itemId);
              setNewName(currentItems.find((i) => i.id === contextMenu.itemId)?.name || '');
              setContextMenu(null);
            }}
            className="w-full px-4 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-colors"
          >
            Rename
          </button>
          <button
            onClick={() => {
              handleCopy();
              setContextMenu(null);
            }}
            className="w-full px-4 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-colors"
          >
            Copy
          </button>
          <button
            onClick={() => {
              handleCut();
              setContextMenu(null);
            }}
            className="w-full px-4 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition-colors"
          >
            Cut
          </button>
          <div className="h-px bg-gray-200 dark:bg-gray-600 my-1" />
          <button
            onClick={() => {
              handleDelete(contextMenu.itemId);
              setContextMenu(null);
            }}
            className="w-full px-4 py-1.5 text-left hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
