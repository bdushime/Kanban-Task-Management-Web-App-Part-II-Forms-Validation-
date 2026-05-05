import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BoardService } from '../../services/board.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  boardName = 'Platform Launch';
  currentBoardId: string | null = null;
  isMenuOpen = false;

  constructor(
    private router: Router, 
    private boardService: BoardService,
    private modalService: ModalService
  ) {
    // Listen for route changes to grab the board ID from the URL
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const urlSegments = this.router.url.split('/');
      // If URL is /boards/0, the 3rd segment (index 2) is the ID
      if (urlSegments[1] === 'boards' && urlSegments[2]) {
        this.currentBoardId = urlSegments[2];
        const board = this.boardService.getBoardById(Number(this.currentBoardId));
        this.boardName = board ? board.name : 'Kanban';
      }
    });
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  onEditBoard() {
    this.isMenuOpen = false;
    this.router.navigate(['/boards/edit', this.currentBoardId]);
  }

  onDeleteBoard() {
    this.isMenuOpen = false;
    this.modalService.showConfirm({
      title: 'Delete this board?',
      message: `Are you sure you want to delete the '${this.boardName}' board? This action will remove all columns and tasks and cannot be reversed.`,
      isDestructive: true
    }).subscribe(confirmed => {
      if (confirmed) {
        // Logic to delete board from service would go here
        console.log('Board Deleted:', this.currentBoardId);
        this.router.navigate(['/boards']);
      }
    });
  }
}
