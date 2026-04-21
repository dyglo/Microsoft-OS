import { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2, Trash2, RotateCcw } from 'lucide-react';

interface DeletedItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  deletedAt: Date;
  originalPath: string;
}

interface RecycleBinProps {
  windowId: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

export function RecycleBin({
  windowId,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}: RecycleBinProps) {
  const [items, setItems] = useState<DeletedItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    // Load deleted items from localStorage
    const stored = localStorage.getItem('windows_recycle_bin');
    if (stored) {
      const parsed = JSON.parse(stored);
      setItems(parsed.map((item: any) => ({ ...item, deletedAt: new Date(item.deletedAt) })));
    }
  }, []);

  const saveItems = (newItems: DeletedItem[]) => {
    setItems(newItems);
    localStorage.setItem('windows_recycle_bin', JSON.stringify(newItems));
  };

  const handleRestore = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      // In a real implementation, this would restore the file
      const newItems = items.filter((i) => i.id !== id);
      saveItems(newItems);
      setSelectedItems(selectedItems.filter((i) => i !== id));
    }
  };

  const handlePermanentlyDelete = (id: string) => {
    if (confirm('Permanently delete this item?')) {
      const newItems = items.filter((i) => i.id !== id);
      saveItems(newItems);
      setSelectedItems(selectedItems.filter((i) => i !== id));
    }
  };

  const handleEmptyBin = () => {
    if (confirm('Permanently delete all items in Recycle Bin?')) {
      saveItems([]);
      setSelectedItems([]);
    }
  };

  const handleRestoreSelected = () => {
    const newItems = items.filter((i) => !selectedItems.includes(i.id));
    saveItems(newItems);
    setSelectedItems([]);
  };

  const handleDeleteSelected = () => {
    if (confirm('Permanently delete selected items?')) {
      const newItems = items.filter((i) => !selectedItems.includes(i.id));
      saveItems(newItems);
      setSelectedItems([]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Title Bar */}
      <div className="flex items-center justify-between h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 text-xs font-semibold">
        <span>Recycle Bin</span>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-blue-700 rounded transition"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onMaximize}
            className="p-1 hover:bg-blue-700 rounded transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-600 rounded transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 flex gap-2">
        <button
          onClick={handleRestoreSelected}
          disabled={selectedItems.length === 0}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 transition"
        >
          <RotateCcw className="w-3 h-3" /> Restore Selected
        </button>
        <button
          onClick={handleDeleteSelected}
          disabled={selectedItems.length === 0}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 transition"
        >
          <Trash2 className="w-3 h-3" /> Delete Selected
        </button>
        <div className="flex-1" />
        <button
          onClick={handleEmptyBin}
          disabled={items.length === 0}
          className="px-3 py-1.5 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 transition"
        >
          Empty Recycle Bin
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <Trash2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Recycle Bin is empty</p>
            </div>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === items.length && items.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(items.map((i) => i.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    className="cursor-pointer"
                  />
                </th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Name</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Type</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Deleted On</th>
                <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Original Location</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    setSelectedItems(
                      selectedItems.includes(item.id)
                        ? selectedItems.filter((i) => i !== item.id)
                        : [...selectedItems, item.id]
                    );
                  }}
                  className={`border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer transition ${
                    selectedItems.includes(item.id)
                      ? 'bg-blue-100 dark:bg-blue-900'
                      : ''
                  }`}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => {}}
                      className="cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white">{item.name}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    {item.type === 'folder' ? 'Folder' : 'File'}
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    {item.deletedAt.toLocaleDateString()} {item.deletedAt.toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{item.originalPath}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Status Bar */}
      {items.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-xs text-gray-600 dark:text-gray-400">
          {selectedItems.length} of {items.length} items selected
        </div>
      )}
    </div>
  );
}
