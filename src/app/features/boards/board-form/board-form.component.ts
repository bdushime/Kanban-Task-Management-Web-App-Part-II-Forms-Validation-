import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-board-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './board-form.component.html',
  styleUrl: './board-form.component.css'
})
export class BoardFormComponent implements OnInit {
  boardForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      columns: this.fb.array([
        this.fb.control('Todo', Validators.required),
        this.fb.control('Doing', Validators.required)
      ])
    });
  }

  get columns() {
    return this.boardForm.get('columns') as FormArray;
  }

  addColumn() {
    this.columns.push(this.fb.control('', Validators.required));
  }

  removeColumn(index: number) {
    this.columns.removeAt(index);
  }

  onSubmit() {
    if (this.boardForm.valid) {
      const { name, columns } = this.boardForm.value;
      const newBoardIndex = this.boardService.addBoard(name);
      
      // Update the newly created board with the custom columns
      const board = this.boardService.getBoardById(newBoardIndex);
      if (board) {
        board.columns = columns.map((colName: string) => ({ name: colName, tasks: [] }));
        this.boardService.saveToLocalStorage();
      }

      this.router.navigate(['/boards', newBoardIndex]);
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
