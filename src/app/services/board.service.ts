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
      this.saveToLocalStorage();
    }
  }

  public saveToLocalStorage(): void {
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

  addBoard(name: string) {
    const newBoard: Board = {
      name: name,
      columns: [
        { name: 'Todo', tasks: [] },
        { name: 'Doing', tasks: [] }
      ]
    };
    this.boards.push(newBoard);
    this.saveToLocalStorage();
    return this.boards.length - 1;
  }

  deleteBoard(boardId: number) {
    this.boards.splice(boardId, 1);
    this.saveToLocalStorage();
  }

  addColumn(boardId: number, name: string) {
    this.boards[boardId].columns.push({ name: name, tasks: [] });
    this.saveToLocalStorage();
  }
}
