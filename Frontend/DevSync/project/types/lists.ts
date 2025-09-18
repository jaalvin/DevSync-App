export interface List {
  id: string;
  title: string;
  description?: string;
  viewType: 'table' | 'board';
  fields: ListField[];
  items: ListItem[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  starred: boolean;
  workflows: Workflow[];
}

export interface ListField {
  id: string;
  name: string;
  type: 'text' | 'date' | 'assignee' | 'tags' | 'dropdown' | 'checkbox' | 'number';
  required: boolean;
  options?: string[];
  order: number;
}

export interface ListItem {
  id: string;
  listId: string;
  title: string;
  fields: Record<string, any>;
  assignedTo?: string;
  status: string;
  dueDate?: Date;
  tags: string[];
  subtasks: SubTask[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string;
  dueDate?: Date;
}

export interface Workflow {
  id: string;
  name: string;
  trigger: 'create' | 'assign' | 'status_change' | 'due_date';
  actions: WorkflowAction[];
  enabled: boolean;
}

export interface WorkflowAction {
  type: 'notify' | 'update_field' | 'create_item' | 'send_message';
  config: Record<string, any>;
}

export interface ListTemplate {
  id: string;
  name: string;
  description: string;
  fields: Omit<ListField, 'id'>[];
  defaultItems?: Omit<ListItem, 'id' | 'listId' | 'createdAt' | 'updatedAt' | 'createdBy'>[];
}