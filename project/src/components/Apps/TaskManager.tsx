import { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2 } from 'lucide-react';

interface TaskManagerProps {
  windowId: string;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isMaximized: boolean;
  openWindows?: { id: string; title: string }[];
  onEndTask?: (windowId: string) => void;
}

interface Process {
  id: string;
  name: string;
  cpu: number;
  memory: number;
  status: string;
}

interface PerformanceData {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

export function TaskManager({
  windowId,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  openWindows = [],
  onEndTask = () => {},
}: TaskManagerProps) {
  const [tab, setTab] = useState<'processes' | 'performance' | 'startup'>('processes');
  const [processes, setProcesses] = useState<Process[]>([]);
  const [performance, setPerformance] = useState<PerformanceData>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  });
  const [sortBy, setSortBy] = useState<'cpu' | 'memory' | 'name'>('memory');
  const [cpuHistory, setCpuHistory] = useState<number[]>([]);

  // Initialize processes with open windows
  useEffect(() => {
    const mockProcesses: Process[] = [
      { id: 'system', name: 'System', cpu: Math.random() * 5, memory: Math.random() * 15, status: 'Running' },
      { id: 'svchost', name: 'svchost.exe', cpu: Math.random() * 2, memory: Math.random() * 10, status: 'Running' },
      { id: 'dwm', name: 'dwm.exe', cpu: Math.random() * 3, memory: Math.random() * 8, status: 'Running' },
      { id: 'explorer', name: 'explorer.exe', cpu: Math.random() * 4, memory: Math.random() * 12, status: 'Running' },
      ...openWindows.map((w) => ({
        id: w.id,
        name: w.title + '.exe',
        cpu: Math.random() * 10,
        memory: Math.random() * 20,
        status: 'Running',
      })),
    ];
    setProcesses(mockProcesses);
  }, [openWindows]);

  // Simulate performance data
  useEffect(() => {
    const interval = setInterval(() => {
      const newCpu = Math.random() * 60 + 10;
      const newMemory = Math.random() * 40 + 30;

      setPerformance({
        cpu: newCpu,
        memory: newMemory,
        disk: Math.random() * 30 + 20,
        network: Math.random() * 50,
      });

      setCpuHistory((prev) => [...prev.slice(-59), newCpu]);

      // Update process data
      setProcesses((prev) =>
        prev.map((p) => ({
          ...p,
          cpu: Math.random() * 15,
          memory: Math.random() * 30,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sortedProcesses = [...processes].sort((a, b) => {
    if (sortBy === 'cpu') return b.cpu - a.cpu;
    if (sortBy === 'memory') return b.memory - a.memory;
    return a.name.localeCompare(b.name);
  });

  const handleEndTask = (processId: string) => {
    if (processId.startsWith('window_')) {
      onEndTask(processId);
    }
    setProcesses((prev) => prev.filter((p) => p.id !== processId));
  };

  const SimpleChart = ({
    data,
    height = 60,
  }: {
    data: number[];
    height?: number;
  }) => {
    const max = Math.max(...data, 100);
    const width = 4;
    const gap = 1;

    return (
      <div className="flex items-end gap-px bg-gray-100 dark:bg-gray-700 p-2 rounded" style={{ height: `${height}px` }}>
        {data.map((value, i) => (
          <div
            key={i}
            className="bg-blue-500"
            style={{
              width: `${width}px`,
              height: `${(value / max) * (height - 16)}px`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      {/* Title Bar */}
      <div className="flex items-center justify-between h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 text-xs font-semibold">
        <span>Task Manager</span>
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

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        {(['processes', 'performance', 'startup'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-semibold border-b-2 transition ${
              tab === t
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {tab === 'processes' && (
          <div>
            <div className="flex gap-2 mb-3">
              <label className="text-xs text-gray-600 dark:text-gray-400">Sort by:</label>
              {(['cpu', 'memory', 'name'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`text-xs px-2 py-1 rounded transition ${
                    sortBy === s
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-right">CPU</th>
                    <th className="px-3 py-2 text-right">Memory</th>
                    <th className="px-3 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProcesses.map((proc) => (
                    <tr
                      key={proc.id}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition"
                    >
                      <td className="px-3 py-2 text-gray-900 dark:text-white">{proc.name}</td>
                      <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">
                        {proc.cpu.toFixed(1)}%
                      </td>
                      <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-400">
                        {proc.memory.toFixed(0)} MB
                      </td>
                      <td className="px-3 py-2 text-green-600 dark:text-green-400">{proc.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3">
              <button
                onClick={() => handleEndTask(sortedProcesses[0]?.id)}
                disabled={sortedProcesses.length === 0}
                className="w-full py-2 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 transition"
              >
                End Task
              </button>
            </div>
          </div>
        )}

        {tab === 'performance' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">CPU Usage</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {performance.cpu.toFixed(1)}%
              </div>
              <SimpleChart data={cpuHistory} height={80} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Memory', value: performance.memory, icon: '💾' },
                { label: 'Disk', value: performance.disk, icon: '💿' },
                { label: 'Network', value: performance.network, icon: '🌐' },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{item.label}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.value.toFixed(1)}%
                  </div>
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded h-2">
                    <div
                      className="bg-blue-500 h-full rounded transition-all"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'startup' && (
          <div className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Windows Defender', status: 'Enabled' },
                  { name: 'OneDrive', status: 'Enabled' },
                  { name: 'Bluetooth', status: 'Enabled' },
                ].map((item) => (
                  <tr
                    key={item.name}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-3 py-2 text-gray-900 dark:text-white">{item.name}</td>
                    <td className="px-3 py-2 text-green-600 dark:text-green-400">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
