import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ModalService } from '../services/modal.service';

export const unsavedChangesGuard: CanDeactivateFn<any> = (component) => {
  const modalService = inject(ModalService);
  return modalService.showConfirm({
    title: 'Unsaved Changes',
    message: 'Are you sure you want to leave this board? You might have unsaved tasks!'
  });
};
