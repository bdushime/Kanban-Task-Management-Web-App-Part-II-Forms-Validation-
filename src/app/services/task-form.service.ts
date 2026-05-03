import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Task } from '../models/board.model';

@Injectable({
  providedIn: 'root'
})
export class TaskFormService {
  constructor(private fb: FormBuilder) {}


  initForm(existingTitles: string[] = [], isEditMode: boolean = false): FormGroup {
    return this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        this.uniqueTitleValidator(existingTitles, isEditMode)
      ]],
      description: [''],
      dueDate: [''],
      status: [0, Validators.required],
      subtasks: this.fb.array([])
    });
  }

  patchForm(form: FormGroup, task: Task, columns: any[]): void {
    const columnIndex = columns.findIndex(col => 
      col.tasks.some((t: Task) => t.id === task.id)
    );

    form.patchValue({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate || '',
      status: columnIndex !== -1 ? columnIndex : 0
    });

    const subtasksArray = form.get('subtasks') as FormArray;
    subtasksArray.clear();
    task.subtasks.forEach(sub => {
      subtasksArray.push(this.fb.group({
        title: [sub.title, Validators.required],
        isCompleted: [sub.isCompleted]
      }));
    });
  }

  addSubtask(form: FormGroup, title = ''): void {
    const subtasks = form.get('subtasks') as FormArray;
    subtasks.push(this.fb.group({
      title: [title, Validators.required],
      isCompleted: [false]
    }));
  }

  removeSubtask(form: FormGroup, index: number): void {
    const subtasks = form.get('subtasks') as FormArray;
    subtasks.removeAt(index);
  }

  private uniqueTitleValidator(titles: string[], isEditMode: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (isEditMode) return null;
      
      const isDuplicate = titles.includes(control.value?.trim().toLowerCase());
      return isDuplicate ? { 'duplicateTitle': true } : null;
    };
  }
}
