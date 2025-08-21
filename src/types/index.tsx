export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
  isActive?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
export interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Task) => void;
}

export interface TaskTreeNode {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskContextType {
  tasks: TaskTreeNode[];
  initTasks: (tasks: TaskTreeNode[]) => void;
  addTask: (task: TaskTreeNode) => void;
  updateTask: (task: TaskTreeNode) => void;
  deleteTask: (taskId: string) => void;
  getTaskById: (taskId: string) => TaskTreeNode | undefined;
}
