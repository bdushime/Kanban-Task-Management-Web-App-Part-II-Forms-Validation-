import { Routes } from '@angular/router';
import { BoardsComponent } from '../features/boards/boards.component';
import { BoardDetailsComponent } from '../features/boards/board-details/board-details.component';
import { authGuard } from '../guards/auth.guard';
import { unsavedChangesGuard } from '../guards/unsaved-changes.guard';

export const BOARDS_ROUTES: Routes = [
  {
    path: 'edit/:id',
    loadComponent: () => import('../features/boards/board-edit/board-edit.component').then(m => m.BoardEditComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('../features/boards/board-form/board-form.component').then(m => m.BoardFormComponent)
  },
  {
    path: '',
    component: BoardsComponent,
  },
  {
    path: ':id',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    component: BoardDetailsComponent,
    children: [
      {
        path: 'tasks/new',
        loadComponent: () => import('../features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
      },
      {
        path: 'tasks/edit/:taskId',
        loadComponent: () => import('../features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
      },
      {
        path: 'full-view',
        component: BoardDetailsComponent
      }
    ]
  }
];
