import { Injectable } from '@angular/core';
import { BoardService } from './board.service';
import { Task } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private boardService: BoardService) {}

  /**
   * Finds a task by ID within a specific board
   */
  getTaskById(boardId: number, taskId: string): Task | undefined {
    const board = this.boardService.getBoardById(boardId);
    if (!board) return undefined;

    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return undefined;
  }

  /**
   * Adds a new task to a specific column in a board
   */
  addTask(boardId: number, columnIndex: number, task: Task): void {
    const board = this.boardService.getBoardById(boardId);
    if (board && board.columns[columnIndex]) {
      task.id = Math.random().toString(36).substr(2, 9);
      board.columns[columnIndex].tasks.push(task);
      this.boardService.saveToLocalStorage(); 
    }
  }

  /**
   * Updates an existing task and handles status (column) changes
   */
  updateTask(boardId: number, currentColumnIndex: number, taskId: string, updatedData: Task): void {
    const board = this.boardService.getBoardById(boardId);
    if (!board) return;

    let taskToUpdate: Task | undefined;
    for (const column of board.columns) {
      const index = column.tasks.findIndex(t => t.id === taskId);
      if (index !== -1) {
        taskToUpdate = column.tasks.splice(index, 1)[0];
        break;
      }
    }

    if (taskToUpdate) {
      const finalTask = { ...taskToUpdate, ...updatedData, id: taskId };
      board.columns[currentColumnIndex].tasks.push(finalTask);
      this.boardService.saveToLocalStorage();
    }
  }

  /**
   * Deletes a task from a specific column
   */
  deleteTask(boardId: number, columnIndex: number, taskId: string): void {
    const board = this.boardService.getBoardById(boardId);
    if (board && board.columns[columnIndex]) {
      board.columns[columnIndex].tasks = board.columns[columnIndex].tasks.filter(t => t.id !== taskId);
      this.boardService.saveToLocalStorage();
    }
  }
}
