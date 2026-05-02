import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Board, BoardData, Task } from '../models/board.model';
import boardDataJson from '../../../public/assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private STORAGE_KEY = 'kanban_data';
  public boards: Board[] = [];

  constructor() {
    this.initData();
  }

  private initData(): void {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      this.boards = JSON.parse(savedData);
    } else {
      const data = boardDataJson as BoardData;
      this.boards = data.boards.map(board => ({
        ...board,
        columns: board.columns.map(col => ({
          ...col,
          tasks: col.tasks.map(task => ({ ...task, id: this.generateId() }))
        }))
      }));
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.boards));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  getBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: number): Board | undefined {
    return this.boards[id];
  }

  getTaskById(boardId: number, taskId: string): Task | undefined {
    const board = this.getBoardById(boardId);
    if (!board) return undefined;
    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return undefined;
  }

  addTask(boardId: number, columnId: number, task: Task) {
    const newTask = { ...task, id: this.generateId() };
    this.boards[boardId].columns[columnId].tasks.push(newTask);
    this.saveToStorage();
  }

  updateTask(boardId: number, columnId: number, taskId: string, updatedTask: Task) {
    const col = this.boards[boardId].columns[columnId];
    const index = col.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      col.tasks[index] = { ...updatedTask, id: taskId };
      this.saveToStorage();
    }
  }

  deleteTask(boardId: number, columnId: number, taskId: string) {
    const col = this.boards[boardId].columns[columnId];
    col.tasks = col.tasks.filter(t => t.id !== taskId);
    this.saveToStorage();
  }

  // --- Board CRUD ---
  addBoard(name: string) {
    const newBoard: Board = {
      name: name,
      columns: [
        { name: 'Todo', tasks: [] },
        { name: 'Doing', tasks: [] }
      ]
    };
    this.boards.push(newBoard);
    this.saveToStorage();
    return this.boards.length - 1; // Return new index
  }

  deleteBoard(boardId: number) {
    this.boards.splice(boardId, 1);
    this.saveToStorage();
  }

  // --- Column CRUD ---
  addColumn(boardId: number, name: string) {
    this.boards[boardId].columns.push({ name: name, tasks: [] });
    this.saveToStorage();
  }
}
