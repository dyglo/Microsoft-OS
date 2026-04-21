import { useState, useEffect } from 'react';
import {
  X,
  Minimize2,
  Maximize2,
  Menu,
  Save,
  FileText,
  Search,
  Replace,
  Settings as SettingsIcon,
} from 'lucide-react';

interface NotepadProps {
  windowId: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  initialContent?: string;
  fileName?: string;
}

export function Notepad({
  windowId,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  initialContent = '',
  fileName = 'Untitled.txt',
}: NotepadProps) {
  const [content, setContent] = useState(initialContent);
  const [currentFileName, setCurrentFileName] = useState(fileName);
  const [isSaved, setIsSaved] = useState(true);
  const [showFind, setShowFind] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [wordWrap, setWordWrap] = useState(true);
  const [fontSize, setFontSize] = useState(14);

  // Save on Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, currentFileName]);

  const handleSave = () => {
    const dataStr = content;
    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = currentFileName || 'file.txt';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    setIsSaved(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleFind = () => {
    if (!searchText) return;
    const textarea = document.getElementById(`notepad-${windowId}`) as HTMLTextAreaElement;
    if (!textarea) return;

    const startPos = textarea.selectionEnd;
    const searchPos = content.indexOf(searchText, startPos);

    if (searchPos >= 0) {
      textarea.setSelectionRange(searchPos, searchPos + searchText.length);
      textarea.focus();
    } else {
      // Search from beginning
      const pos = content.indexOf(searchText);
      if (pos >= 0) {
        textarea.setSelectionRange(pos, pos + searchText.length);
        textarea.focus();
      }
    }
  };

  const handleReplace = () => {
    const before = content.substring(0, content.indexOf(searchText));
    const after = content.substring(content.indexOf(searchText) + searchText.length);
    setContent(before + replaceText + after);
    setIsSaved(false);
  };

  const handleReplaceAll = () => {
    setContent(content.replaceAll(searchText, replaceText));
    setIsSaved(false);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Title Bar */}
      <div className="flex items-center justify-between h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5" />
          <span>{currentFileName} {!isSaved ? '*' : ''}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-blue-700 rounded transition"
            title="Minimize"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onMaximize}
            className="p-1 hover:bg-blue-700 rounded transition"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-600 rounded transition"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-0 text-xs">
          <div className="group relative px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <span className="flex items-center gap-1">
              <Menu className="w-3.5 h-3.5" /> File
            </span>
            <div className="hidden group-hover:flex absolute top-full left-0 flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-10 min-w-max">
              <button
                onClick={() => {
                  setContent('');
                  setCurrentFileName('Untitled.txt');
                  setIsSaved(true);
                }}
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-left text-gray-900 dark:text-white text-xs"
              >
                New
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-left text-gray-900 dark:text-white text-xs flex items-center gap-2"
              >
                <Save className="w-3 h-3" /> Save
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-left text-gray-900 dark:text-white text-xs border-t border-gray-200 dark:border-gray-700"
              >
                Exit
              </button>
            </div>
          </div>

          <div className="group relative px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <span className="flex items-center gap-1">
              <Menu className="w-3.5 h-3.5" /> Edit
            </span>
            <div className="hidden group-hover:flex absolute top-full left-0 flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-10 min-w-max">
              <button
                onClick={() => setShowFind(!showFind)}
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-left text-gray-900 dark:text-white text-xs flex items-center gap-2"
              >
                <Search className="w-3 h-3" /> Find
              </button>
              <button
                onClick={() => setShowFind(!showFind)}
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-left text-gray-900 dark:text-white text-xs flex items-center gap-2"
              >
                <Replace className="w-3 h-3" /> Replace
              </button>
            </div>
          </div>

          <div className="group relative px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            <span className="flex items-center gap-1">
              <SettingsIcon className="w-3.5 h-3.5" /> Format
            </span>
            <div className="hidden group-hover:flex absolute top-full left-0 flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-10 min-w-max">
              <button
                onClick={() => setWordWrap(!wordWrap)}
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-left text-gray-900 dark:text-white text-xs"
              >
                {wordWrap ? '✓' : ''} Word Wrap
              </button>
              <button
                onClick={() => setFontSize(Math.max(8, fontSize - 2))}
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-left text-gray-900 dark:text-white text-xs"
              >
                Decrease Font Size
              </button>
              <button
                onClick={() => setFontSize(Math.min(32, fontSize + 2))}
                className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-left text-gray-900 dark:text-white text-xs"
              >
                Increase Font Size
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Find/Replace Bar */}
      {showFind && (
        <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-3 space-y-2">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Find..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFind()}
              className="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleFind}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Find
            </button>
            <button
              onClick={() => setShowFind(false)}
              className="px-3 py-1 text-xs bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Close
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Replace with..."
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              className="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleReplace}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Replace
            </button>
            <button
              onClick={handleReplaceAll}
              className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Replace All
            </button>
          </div>
        </div>
      )}

      {/* Editor Area */}
      <textarea
        id={`notepad-${windowId}`}
        value={content}
        onChange={handleContentChange}
        className="flex-1 p-4 font-mono text-gray-900 dark:text-white bg-white dark:bg-gray-900 border-none focus:outline-none resize-none"
        style={{
          fontSize: `${fontSize}px`,
          whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
          overflowX: wordWrap ? 'hidden' : 'auto',
        }}
        spellCheck="false"
      />

      {/* Status Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs text-gray-600 dark:text-gray-400 flex justify-between">
        <span>{content.split('\n').length} lines</span>
        <span>Size: {(content.length / 1024).toFixed(2)} KB</span>
      </div>
    </div>
  );
}
