import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../../services/board.service';
import { TaskService } from '../../../services/task.service';
import { ModalService } from '../../../services/modal.service';
import { Task, Column } from '../../../models/board.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  task?: Task;
  boardId!: number;
  taskId!: string;
  columns: Column[] = [];
  currentColumnIndex = 0;
  isMenuOpen = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boardService: BoardService,
    private taskService: TaskService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    // Get IDs from route
    // Note: TaskDetail is a child of BoardDetailsComponent usually
    this.boardId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.taskId = this.route.snapshot.paramMap.get('taskId') || '';

    const board = this.boardService.getBoardById(this.boardId);
    if (board) {
      this.columns = board.columns;
      this.task = this.taskService.getTaskById(this.boardId, this.taskId);
      
      // Find current column index
      this.currentColumnIndex = this.columns.findIndex(col => 
        col.tasks.some(t => t.id === this.taskId)
      );
    }
  }

  get completedSubtasksCount(): number {
    return this.task?.subtasks.filter(s => s.isCompleted).length || 0;
  }

  toggleSubtask(index: number) {
    if (this.task) {
      this.task.subtasks[index].isCompleted = !this.task.subtasks[index].isCompleted;
      this.taskService.updateTask(this.boardId, this.currentColumnIndex, this.taskId, this.task);
    }
  }

  onStatusChange(event: any) {
    const newColumnIndex = Number(event.target.value);
    this.taskService.updateTask(this.boardId, newColumnIndex, this.taskId, this.task!);
    this.currentColumnIndex = newColumnIndex;
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  onEditClick() {
    this.isMenuOpen = false;
    this.router.navigate(['tasks', 'edit', this.taskId], { relativeTo: this.route.parent });
  }

  onDeleteClick() {
    this.isMenuOpen = false;
    this.modalService.showConfirm({
      title: 'Delete this task?',
      message: 'Are you sure you want to delete the task and its subtasks? This action cannot be reversed.',
      isDestructive: true
    }).subscribe(confirmed => {
      if (confirmed) {
        this.taskService.deleteTask(this.boardId, this.currentColumnIndex, this.taskId);
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.router.navigate(['/boards', this.boardId]);
  }

  openEditTask() {
    this.router.navigate(['tasks', 'edit', this.taskId], { relativeTo: this.route.parent });
  }
}
