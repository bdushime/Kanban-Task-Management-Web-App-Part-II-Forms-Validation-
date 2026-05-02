export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id?: string; 
  title: string;
  description: string;
  status: string;
  dueDate?: string; // Add this!
  subtasks: Subtask[];
}

export interface Column {
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[];
}

export interface BoardData {
  boards: Board[];
}
