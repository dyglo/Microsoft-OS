import { Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { UserProfile } from '../../types/enhancements';

interface LockScreenProps {
  user: UserProfile;
  wallpaper: string;
  onUnlock: () => void;
}

function LockScreen({ user, wallpaper, onUnlock }: LockScreenProps) {
  const [time] = useState(new Date());
  const [showUnlock, setShowUnlock] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/40"></div>

      {/* Lock Screen Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Time Display */}
        <div className="text-center mb-8">
          <div className="text-8xl font-light text-white mb-2">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
          <div className="text-2xl text-white/90">
            {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* User Profile */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-semibold mx-auto mb-4 shadow-2xl border-4 border-white/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-3xl font-semibold text-white mb-2">{user.name}</div>
          <div className="text-lg text-white/80">{user.email}</div>
        </div>

        {/* Unlock Button */}
        {!showUnlock ? (
          <button
            onClick={() => setShowUnlock(true)}
            className="flex items-center gap-3 px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full text-white font-medium transition-all transform hover:scale-105 border border-white/30"
          >
            <Lock className="w-5 h-5" />
            Click to unlock
          </button>
        ) : (
          <div className="flex items-center gap-4 animate-scale-in">
            <div className="bg-white/20 backdrop-blur-xl rounded-full px-6 py-3 text-white border border-white/30">
              No password required
            </div>
            <button
              onClick={onUnlock}
              className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-blue-600 transition-all transform hover:scale-110 shadow-2xl"
            >
              <ArrowRight className="w-7 h-7" />
            </button>
          </div>
        )}
      </div>

      {/* Lock Icon Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Lock className="w-4 h-4" />
          <span>Locked</span>
        </div>
      </div>
    </div>
  );
}

export default LockScreen;

