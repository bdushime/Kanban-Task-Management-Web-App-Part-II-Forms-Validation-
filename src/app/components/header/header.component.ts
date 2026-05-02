import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   boardName = 'Platform Launch';
  constructor(private router:Router){}

  goToSettings(){
    this.router.navigate(['/settings'])
  }
}
