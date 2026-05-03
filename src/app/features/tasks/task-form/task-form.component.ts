import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../../services/board.service';
import { TaskService } from '../../../services/task.service';
import { ModalService } from '../../../services/modal.service';
import { TaskFormService } from '../../../services/task-form.service';
import { Task, Column } from '../../../models/board.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  boardId!: number;
  taskId?: string;
  columns: Column[] = [];
  existingTitles: string[] = [];

  constructor(
    private boardService: BoardService,
    private taskService: TaskService, 
    private modalService: ModalService,
    private taskFormService: TaskFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.taskId = this.route.snapshot.paramMap.get('taskId') || undefined;
    this.isEditMode = !!this.taskId;

    const board = this.boardService.getBoardById(this.boardId);
    if (board) {
      this.columns = board.columns;
      this.existingTitles = board.columns.flatMap(c => c.tasks.map(t => t.title.toLowerCase()));
    }

    this.taskForm = this.taskFormService.initForm(this.existingTitles, this.isEditMode);

    if (this.isEditMode && this.taskId) {
      const existingTask = this.taskService.getTaskById(this.boardId, this.taskId);
      if (existingTask) {
        this.taskFormService.patchForm(this.taskForm, existingTask, this.columns);
      }
    }
  }

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask() {
    this.taskFormService.addSubtask(this.taskForm);
  }

  removeSubtask(index: number) {
    this.taskFormService.removeSubtask(this.taskForm, index);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskData: Task = {
        title: formValue.title,
        description: formValue.description,
        dueDate: formValue.dueDate,
        status: 'Todo', 
        subtasks: formValue.subtasks
      };

      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.boardId, formValue.status, this.taskId, taskData);
      } else {
        this.taskService.addTask(this.boardId, formValue.status, taskData);
      }

      this.router.navigate(['/boards', this.boardId]);
    }
  }

  onCancel() {
    this.router.navigate(['/boards', this.boardId]);
  }

  onDelete() {
    if (this.isEditMode && this.taskId) {
      this.modalService.showConfirm({
        title: 'Delete this task?',
        message: 'Are you sure you want to delete the task and its subtasks? This action cannot be reversed.',
        isDestructive: true
      }).subscribe(confirmed => {
        if (confirmed) {
          this.taskService.deleteTask(this.boardId, this.taskForm.value.status, this.taskId!);
          this.router.navigate(['/boards', this.boardId]);
        }
      });
    }
  }
}
