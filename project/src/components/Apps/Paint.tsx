import { useRef, useEffect, useState } from 'react';
import { X, Minimize2, Maximize2, Download, RotateCcw } from 'lucide-react';

interface PaintProps {
  windowId: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
}

export function Paint({
  windowId,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
}: PaintProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pencil' | 'brush' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'fill'>('pencil');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [canvas2D, setCanvas2D] = useState<CanvasRenderingContext2D | null>(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill with white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setCanvas2D(ctx);
  }, []);

  const saveHistory = () => {
    if (!canvas2D || !canvasRef.current) return;
    const imageData = canvas2D.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory([...history, imageData]);
  };

  const undo = () => {
    if (history.length === 0 || !canvas2D || !canvasRef.current) return;
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);

    if (newHistory.length > 0) {
      canvas2D.putImageData(newHistory[newHistory.length - 1], 0, 0);
    } else {
      canvas2D.fillStyle = 'white';
      canvas2D.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    saveHistory();

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvas2D || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    canvas2D.strokeStyle = color;
    canvas2D.fillStyle = color;
    canvas2D.lineWidth = brushSize;
    canvas2D.lineCap = 'round';
    canvas2D.lineJoin = 'round';

    switch (tool) {
      case 'pencil':
        canvas2D.beginPath();
        canvas2D.moveTo(lastX, lastY);
        canvas2D.lineTo(x, y);
        canvas2D.stroke();
        break;

      case 'brush':
        canvas2D.beginPath();
        canvas2D.moveTo(lastX, lastY);
        canvas2D.lineTo(x, y);
        canvas2D.stroke();
        break;

      case 'eraser':
        canvas2D.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
        break;

      case 'line':
        // Preview line (would need to redraw canvas state)
        canvas2D.beginPath();
        canvas2D.moveTo(lastX, lastY);
        canvas2D.lineTo(x, y);
        canvas2D.stroke();
        break;
    }

    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvas2D || !canvasRef.current) return;
    canvas2D.fillStyle = 'white';
    canvas2D.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory([]);
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const Tool = ({
    label,
    value,
    onClick,
  }: {
    label: string;
    value: typeof tool;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs rounded transition ${
        tool === value
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      {/* Title Bar */}
      <div className="flex items-center justify-between h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 text-xs font-semibold">
        <span>Paint</span>
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
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 space-y-2">
        <div className="flex flex-wrap gap-2">
          <Tool label="✏️ Pencil" value="pencil" onClick={() => setTool('pencil')} />
          <Tool label="🖌️ Brush" value="brush" onClick={() => setTool('brush')} />
          <Tool label="🧹 Eraser" value="eraser" onClick={() => setTool('eraser')} />
          <Tool label="📏 Line" value="line" onClick={() => setTool('line')} />
          <Tool label="▭ Rectangle" value="rectangle" onClick={() => setTool('rectangle')} />
          <Tool label="●  Circle" value="circle" onClick={() => setTool('circle')} />
          <Tool label="🪣 Fill" value="fill" onClick={() => setTool('fill')} />
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600 dark:text-gray-400">Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 cursor-pointer rounded"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600 dark:text-gray-400">Size:</label>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-32"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400 w-6">{brushSize}</span>
          </div>

          <button
            onClick={undo}
            className="p-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-1"
          >
            ↶ Undo
          </button>

          <button
            onClick={clearCanvas}
            className="p-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Clear
          </button>

          <button
            onClick={downloadImage}
            className="p-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center gap-1"
          >
            <Download className="w-3 h-3" /> Save
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="flex-1 bg-white cursor-crosshair"
      />
    </div>
  );
}
