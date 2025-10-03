export type FileSystemItemType = 'file' | 'folder';

export interface BaseItem {
  id: string;
  name: string;
  type: FileSystemItemType;
  parentId: string | null; // null for root
  createdAt: number;
  updatedAt: number;
}

export interface FileItem extends BaseItem {
  type: 'file';
  content?: string; // optional text content for scaffolding
  size?: number; // bytes
}

export interface FolderItem extends BaseItem {
  type: 'folder';
  childrenIds: string[];
}

export type FileSystemItem = FileItem | FolderItem;
