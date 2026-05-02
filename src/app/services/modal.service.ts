import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

export interface ModalOptions {
  title: string;
  message: string;
  isDestructive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new BehaviorSubject<ModalOptions | null>(null);
  private currentResponse = new Subject<boolean>();

  getModalState(): Observable<ModalOptions | null> {
    return this.modalState.asObservable();
  }

  showConfirm(options: ModalOptions): Observable<boolean> {
    this.currentResponse = new Subject<boolean>(); // Fresh channel for this request
    this.modalState.next(options);
    return this.currentResponse.asObservable().pipe(take(1));
  }

  confirm() {
    this.currentResponse.next(true);
    this.modalState.next(null);
  }

  cancel() {
    this.currentResponse.next(false);
    this.modalState.next(null);
  }
}
