import { useState } from 'react';
import { UserProfile } from '../../../types/enhancements';
import { DeviceInfo } from '../../../types/settings';
import { storage } from '../../../utils/storage';

interface UserProfileCardProps {
  user: UserProfile;
  device: DeviceInfo;
}

function UserProfileCard({ user, device }: UserProfileCardProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(device.name);

  const handleRename = () => {
    if (newName.trim() && newName !== device.name) {
      storage.updateDeviceName(newName);
      window.location.reload(); // Reload to reflect changes
    }
    setIsRenaming(false);
  };

  return (
    <div className="flex items-start gap-4 mb-8">
      {/* User Avatar */}
      <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-gray-600 dark:text-gray-300">
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
          {user.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{user.email}</p>
        
        <div className="flex items-center gap-4">
          {isRenaming ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                autoFocus
              />
              <button
                onClick={handleRename}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsRenaming(false)}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">{device.name}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">{device.model}</span>
              </div>
              <button
                onClick={() => setIsRenaming(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Rename
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;

