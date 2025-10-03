import { Loader2, Power } from 'lucide-react';

interface ShutdownScreenProps {
  type: 'shutdown' | 'restart' | 'sleep';
}

function ShutdownScreen({ type }: ShutdownScreenProps) {
  const messages = {
    shutdown: {
      icon: Power,
      title: 'Shutting down...',
      subtitle: 'Please wait while we save your work',
    },
    restart: {
      icon: Power,
      title: 'Restarting...',
      subtitle: 'Your system will restart in a moment',
    },
    sleep: {
      icon: Power,
      title: 'Going to sleep...',
      subtitle: 'Click anywhere to wake up',
    },
  };

  const message = messages[type];
  const Icon = message.icon;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 animate-fade-in">
      {/* Content */}
      <div className="text-center">
        {/* Icon with animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-xl border border-white/20">
            <Icon className="w-12 h-12 text-white" />
          </div>
          {type !== 'sleep' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-32 h-32 text-white/30 animate-spin" />
            </div>
          )}
        </div>

        {/* Text */}
        <div className="mb-2">
          <div className="text-3xl font-light text-white mb-2">{message.title}</div>
          <div className="text-lg text-white/70">{message.subtitle}</div>
        </div>

        {/* Loading Dots (only for shutdown/restart) */}
        {type !== 'sleep' && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}

        {/* Sleep mode hint */}
        {type === 'sleep' && (
          <div className="mt-8 text-white/50 text-sm">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-1 bg-white/30 rounded-full"></div>
              <span>Press any key to wake</span>
              <div className="w-8 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShutdownScreen;

