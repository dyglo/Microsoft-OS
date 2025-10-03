import { useState, useRef, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  isActive: boolean;
  initialWidth?: number;
  initialHeight?: number;
  initialX?: number;
  initialY?: number;
  isMinimized?: boolean;
}

function Window({
  id,
  title,
  icon,
  children,
  onClose,
  onMinimize,
  onFocus,
  isActive,
  initialWidth = 800,
  initialHeight = 600,
  initialX = 100,
  initialY = 100,
  isMinimized = false,
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
      if (isResizing) {
        const newWidth = Math.max(400, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(300, resizeStart.height + (e.clientY - resizeStart.y));
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-titlebar')) {
      onFocus();
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      setIsDragging(true);
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
    setIsResizing(true);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  if (isMinimized) {
    return null;
  }

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 56px)', maxWidth: '100%' }
    : { top: position.y, left: position.x, width: size.width, height: size.height };

  return (
    <div
      ref={windowRef}
      className={`fixed bg-white rounded-lg shadow-2xl overflow-hidden transition-opacity ${
        isActive ? 'z-50' : 'z-40'
      }`}
      style={windowStyle}
      onMouseDown={() => onFocus()}
    >
      {/* Title Bar */}
      <div
        className={`window-titlebar h-10 flex items-center justify-between px-3 border-b border-gray-200 cursor-move select-none ${
          isActive ? 'bg-white' : 'bg-gray-50'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-sm">{icon}</span>}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={toggleMaximize}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-red-500 hover:text-white rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-40px)] overflow-auto">{children}</div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}

export default Window;

