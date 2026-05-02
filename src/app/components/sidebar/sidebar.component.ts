import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public boardService: BoardService, private router: Router) {}

  createNewBoard() {
    this.router.navigate(['/boards/new']);
  }

  isDarkMode = true;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
