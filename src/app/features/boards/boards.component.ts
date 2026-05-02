import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css'
})
export class BoardsComponent {
  
}
