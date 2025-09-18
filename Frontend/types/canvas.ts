export interface Canvas {
  id: string;
  title: string;
  content: ContentBlock[];
  channelId?: string;
  isTemplate: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  starred: boolean;
  permissions: CanvasPermissions;
  comments: Comment[];
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'header' | 'list' | 'image' | 'video' | 'file' | 'link' | 'embed';
  content: any;
  order: number;
  comments: Comment[];
}

export interface CanvasPermissions {
  canEdit: boolean;
  canComment: boolean;
  canShare: boolean;
  viewers: string[];
  editors: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
  blockId?: string;
}

export interface CanvasTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  blocks: Omit<ContentBlock, 'id' | 'comments'>[];
}