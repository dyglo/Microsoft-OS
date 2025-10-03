import { useState, useEffect } from 'react';
import { storage } from '../../../utils/storage';
import { WallpaperOption } from '../../../types/settings';
import { Upload } from 'lucide-react';

interface ThemePreviewGridProps {
  onWallpaperChange: (url: string) => void;
}

function ThemePreviewGrid({ onWallpaperChange }: ThemePreviewGridProps) {
  const [wallpapers, setWallpapers] = useState<WallpaperOption[]>([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>('');

  useEffect(() => {
    setWallpapers(storage.getWallpaperOptions());
    setSelectedWallpaper(storage.getWallpaper());
  }, []);

  const handleWallpaperSelect = (wallpaper: WallpaperOption) => {
    setSelectedWallpaper(wallpaper.url);
    storage.setWallpaper(wallpaper.url);
    onWallpaperChange(wallpaper.url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        const newWallpaper: WallpaperOption = {
          id: `custom-${Date.now()}`,
          name: file.name,
          thumbnail: url,
          url: url,
          category: 'custom',
        };
        storage.addCustomWallpaper(newWallpaper);
        setWallpapers([newWallpaper, ...wallpapers]);
        handleWallpaperSelect(newWallpaper);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Personalize your device
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {wallpapers.slice(0, 5).map((wallpaper) => (
          <button
            key={wallpaper.id}
            onClick={() => handleWallpaperSelect(wallpaper)}
            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
              selectedWallpaper === wallpaper.url
                ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-900'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
            }`}
          >
            <img
              src={wallpaper.thumbnail}
              alt={wallpaper.name}
              className="w-full h-full object-cover"
            />
            {/* Windows logo indicator */}
            <div className="absolute bottom-1 left-1 w-3 h-3 bg-white/80 rounded-sm flex items-center justify-center">
              <div className="grid grid-cols-2 gap-[1px]">
                <div className="w-1 h-1 bg-blue-600"></div>
                <div className="w-1 h-1 bg-blue-600"></div>
                <div className="w-1 h-1 bg-blue-600"></div>
                <div className="w-1 h-1 bg-blue-600"></div>
              </div>
            </div>
          </button>
        ))}
        
        {/* Upload button */}
        <label className="relative aspect-video rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer flex flex-col items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 transition-colors">
          <Upload className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Upload</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}

export default ThemePreviewGrid;

