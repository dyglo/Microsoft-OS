import { Lock, Moon, Power, RotateCw } from 'lucide-react';

interface PowerOptionsPanelProps {
  onLock: () => void;
  onSleep: () => void;
  onShutdown: () => void;
  onRestart: () => void;
}

function PowerOptionsPanel({ onLock, onSleep, onShutdown, onRestart }: PowerOptionsPanelProps) {
  const powerOptions = [
    { id: 'lock', label: 'Lock', icon: Lock, action: onLock },
    { id: 'sleep', label: 'Sleep', icon: Moon, action: onSleep },
    { id: 'shutdown', label: 'Shut down', icon: Power, action: onShutdown },
    { id: 'restart', label: 'Restart', icon: RotateCw, action: onRestart },
  ];

  return (
    <div className="flex flex-col border-l border-gray-200 bg-gray-50/50">
      {/* Power Options List */}
      <div className="flex-1 py-4">
        {powerOptions.map((option, index) => (
          <button
            key={option.id}
            onClick={(e) => {
              e.stopPropagation();
              option.action();
            }}
            className={`w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-100/80 transition-colors text-left ${
              index < powerOptions.length - 1 ? 'border-b border-gray-200' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
              <option.icon className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-sm font-medium text-gray-800">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Power Icon at Bottom */}
      <div className="h-14 flex items-center justify-center border-t border-gray-200">
        <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
          <Power className="w-5 h-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
}

export default PowerOptionsPanel;

