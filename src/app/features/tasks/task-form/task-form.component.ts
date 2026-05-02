import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../../services/board.service';
import { ModalService } from '../../../services/modal.service';
import { Task, Subtask } from '../../../models/board.model';

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
  columnId = 0; 
  columns: any[] = [];
  existingTitles: string[] = [];


  ngOnInit(): void {
 
    this.boardId = Number(this.route.parent?.snapshot.paramMap.get('id'));
    this.taskId = this.route.snapshot.paramMap.get('taskId') || undefined;
    this.isEditMode = !!this.taskId;

    const board = this.boardService.getBoardById(this.boardId);
    if (board) {
      this.columns = board.columns; // Store the columns!
      this.existingTitles = board.columns.flatMap(c => c.tasks.map(t => t.title.toLowerCase()));
    }

    this.initForm();

   
    if (this.isEditMode && this.taskId) {
      const existingTask = this.boardService.getTaskById(this.boardId, this.taskId);
      if (existingTask) {
        this.patchForm(existingTask);
      }
    }
  }

  private initForm() {
    this.taskForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(3),
        this.uniqueTitleValidator(this.existingTitles)
      ]],
      description: [''],
      status: [0, Validators.required], 
      subtasks: this.fb.array([]) 
    });
  }

  private uniqueTitleValidator(titles: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.isEditMode) return null; 

      const isDuplicate = titles.includes(control.value?.trim().toLowerCase());
      return isDuplicate ? { 'duplicateTitle': true } : null;
    };
  }
 
  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  addSubtask(title = '') {
    this.subtasks.push(this.fb.group({
      title: [title, Validators.required],
      isCompleted: [false]
    }));
  }


  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  private patchForm(task: Task) {
    // Find which column this task currently belongs to
    const columnIndex = this.columns.findIndex(col => 
      col.tasks.some((t: Task) => t.id === task.id)
    );

    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: columnIndex !== -1 ? columnIndex : 0
    });

    // Clear and populate subtasks
    this.subtasks.clear();
    task.subtasks.forEach(sub => this.addSubtask(sub.title));
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskData: Task = {
        title: formValue.title,
        description: formValue.description,
        status: 'Todo', 
        subtasks: formValue.subtasks
      };

      if (this.isEditMode && this.taskId) {
        this.boardService.updateTask(this.boardId, formValue.status, this.taskId, taskData);
      } else {
        this.boardService.addTask(this.boardId, formValue.status, taskData);
      }

      this.router.navigate(['/boards', this.boardId]);
    }
  }

  onCancel() {
    this.router.navigate(['/boards', this.boardId]);
  }

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private modalService: ModalService, // Inject ModalService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ... (keeping other code)

  onDelete() {
    if (this.isEditMode && this.taskId) {
      this.modalService.showConfirm({
        title: 'Delete this task?',
        message: 'Are you sure you want to delete the task and its subtasks? This action cannot be reversed.',
        isDestructive: true
      }).subscribe(confirmed => {
        if (confirmed) {
          this.boardService.deleteTask(this.boardId, this.taskForm.value.status, this.taskId!);
          this.router.navigate(['/boards', this.boardId]);
        }
      });
    }
  }
}
