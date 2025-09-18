export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'guest';
  status: 'active' | 'away' | 'dnd' | 'offline';
  timezone: string;
}

export interface Assignment {
  id: string;
  itemId: string;
  listId: string;
  listTitle: string;
  itemTitle: string;
  dueDate?: Date;
  status: string;
  priority: 'low' | 'medium' | 'high';
  assignedAt: Date;
  assignedBy: string;
}