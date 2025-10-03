import { useState, useEffect, useCallback } from 'react';
import { FileSystemItem } from '../types/fileSystem';
import { fileSystem } from '../utils/fileSystem';

export function useFileSystem(parentId: string | null = 'root') {
  const [items, setItems] = useState<FileSystemItem[]>([]);

  const refresh = useCallback(() => {
    setItems(fileSystem.getChildren(parentId));
  }, [parentId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createFolder = (name: string) => {
    fileSystem.createFolder(name, parentId);
    refresh();
  };

  const createFile = (name: string) => {
    fileSystem.createFile(name, '', parentId);
    refresh();
  };

  const deleteItem = (id: string) => {
    fileSystem.deleteItem(id);
    refresh();
  };

  const renameItem = (id: string, name: string) => {
    fileSystem.updateItem(id, { name });
    refresh();
  };

  return { items, refresh, createFolder, createFile, deleteItem, renameItem };
}
