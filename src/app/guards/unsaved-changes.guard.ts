import { CanDeactivateFn } from '@angular/router';

export const unsavedChangesGuard: CanDeactivateFn<any> = (component) => {
  return confirm('Are you sure you want to leave this board? You might have unsaved tasks!');
};
