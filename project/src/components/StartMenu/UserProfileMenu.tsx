import { Camera, Settings, LogOut } from 'lucide-react';
import { UserProfile } from '../../types/enhancements';

interface UserProfileMenuProps {
  user: UserProfile;
  onChangePicture: () => void;
  onAccountSettings: () => void;
  onSignOut: () => void;
  onClose: () => void;
}

function UserProfileMenu({ user, onChangePicture, onAccountSettings, onSignOut, onClose }: UserProfileMenuProps) {
  const menuItems = [
    { label: 'Change account picture', icon: Camera, action: onChangePicture },
    { label: 'Account settings', icon: Settings, action: onAccountSettings },
    { label: 'Sign out', icon: LogOut, action: onSignOut, danger: true },
  ];

  return (
    <div className="absolute bottom-16 left-6 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-scale-in z-50">
      {/* User Info Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">{user.name}</div>
            <div className="text-xs text-gray-600 truncate">{user.email}</div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              item.action();
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
              item.danger ? 'text-red-600' : 'text-gray-700'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default UserProfileMenu;

