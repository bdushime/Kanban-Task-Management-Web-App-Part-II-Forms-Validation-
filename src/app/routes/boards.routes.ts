import { Routes } from '@angular/router';
import { BoardsComponent } from '../features/boards/boards.component';
import { BoardDetailsComponent } from '../features/boards/board-details/board-details.component';
import { authGuard } from '../guards/auth.guard';
import { unsavedChangesGuard } from '../guards/unsaved-changes.guard';

export const BOARDS_ROUTES: Routes = [
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
        path: 'full-view',
        component: BoardDetailsComponent
      }
    ]
  }
];
