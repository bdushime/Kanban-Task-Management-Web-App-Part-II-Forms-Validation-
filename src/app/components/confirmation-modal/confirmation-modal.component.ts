import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay">
      <div class="modal-container">
        <h2 class="modal-title" [class.destructive]="isDestructive">{{ title }}</h2>
        <p class="modal-message">{{ message }}</p>
        
        <div class="modal-actions">
          <button class="btn btn--destructive" *ngIf="isDestructive" (click)="onConfirm.emit()">Delete</button>
          <button class="btn btn--primary" *ngIf="!isDestructive" (click)="onConfirm.emit()">Confirm</button>
          <button class="btn btn--secondary" (click)="onCancel.emit()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }
    .modal-container {
      background-color: var(--bg-card);
      padding: 32px;
      border-radius: 8px;
      width: 90%;
      max-width: 480px;
    }
    .modal-title {
      font-size: 18px;
      margin-bottom: 24px;
      color: var(--purple);
    }
    .modal-title.destructive {
      color: var(--red);
    }
    .modal-message {
      font-size: 13px;
      line-height: 23px;
      color: var(--text-secondary);
      margin-bottom: 24px;
    }
    .modal-actions {
      display: flex;
      gap: 16px;
    }
    .modal-actions button {
      flex: 1;
    }
  `]
})
export class ConfirmationModalComponent {
  @Input() title = 'Confirm Action';
  @Input() message = 'Are you sure you want to proceed?';
  @Input() isDestructive = false;
  
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
}
