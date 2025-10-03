import { FileSystemItem, FolderItem } from '../types/fileSystem';

const STORAGE_KEY = 'windows_vfs';

function loadFS(): FileSystemItem[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as FileSystemItem[]) : getDefaultFS();
}

function saveFS(items: FileSystemItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function getDefaultFS(): FileSystemItem[] {
  const root: FolderItem = {
    id: 'root',
    name: 'Root',
    type: 'folder',
    parentId: null,
    childrenIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  return [root];
}

export const fileSystem = {
  getAll: loadFS,

  getById: (id: string): FileSystemItem | undefined => {
    return loadFS().find(i => i.id === id);
  },

  getChildren: (parentId: string | null) => {
    const fs = loadFS();
    return fs.filter(i => i.parentId === parentId);
  },

  createFolder: (name: string, parentId: string | null = 'root'): FolderItem => {
    const fs = loadFS();
    const newFolder: FolderItem = {
      id: Date.now().toString(),
      name,
      type: 'folder',
      parentId,
      childrenIds: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    fs.push(newFolder);
    saveFS(fs);
    return newFolder;
  },

  createFile: (name: string, content = '', parentId: string | null = 'root'): FileSystemItem => {
    const fs = loadFS();
    const newFile: FileSystemItem = {
      id: Date.now().toString(),
      name,
      type: 'file',
      parentId,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    } as any;
    fs.push(newFile);
    saveFS(fs);
    return newFile;
  },

  updateItem: (id: string, data: Partial<FileSystemItem>) => {
    const fs = loadFS();
    const idx = fs.findIndex(i => i.id === id);
    if (idx >= 0) {
      fs[idx] = { ...fs[idx], ...data, updatedAt: Date.now() } as FileSystemItem;
      saveFS(fs);
    }
  },

  deleteItem: (id: string) => {
    const fs = loadFS();
    const filtered = fs.filter(i => i.id !== id && i.parentId !== id);
    saveFS(filtered);
  },

  moveItem: (id: string, newParentId: string | null) => {
    fileSystem.updateItem(id, { parentId: newParentId });
  },
};
