import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../../services/board.service';

@Component({
  selector: 'app-board-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: '../board-form/board-form.component.html', // Reuse the same template!
  styleUrl: '../board-form/board-form.component.css'    // Reuse the same styles!
})
export class BoardEditComponent implements OnInit {
  boardForm!: FormGroup;
  boardId!: number;

  constructor(
    private fb: FormBuilder,
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardId = Number(this.route.snapshot.paramMap.get('id'));
    const board = this.boardService.getBoardById(this.boardId);

    if (board) {
      this.boardForm = this.fb.group({
        name: [board.name, [Validators.required, Validators.minLength(3)]],
        columns: this.fb.array(
          board.columns.map(col => this.fb.control(col.name, Validators.required))
        )
      });
    }
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
      const board = this.boardService.getBoardById(this.boardId);
      
      if (board) {
        board.name = name;
        // Keep existing tasks if the column name is the same, or create empty if new
        board.columns = columns.map((colName: string, index: number) => {
          const existingCol = board.columns[index];
          return {
            name: colName,
            tasks: (existingCol && existingCol.name === colName) ? existingCol.tasks : []
          };
        });

        // Save to storage
        localStorage.setItem('kanban_data', JSON.stringify(this.boardService.getBoards()));
      }

      this.router.navigate(['/boards', this.boardId]);
    }
  }

  onCancel() {
    this.router.navigate(['/boards', this.boardId]);
  }
}
