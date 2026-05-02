import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, HeaderComponent, ConfirmationModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isSidebarOpen = true;
  isLoading = false;

  
  constructor(private router: Router, public modalService: ModalService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true; 
        console.log('Navigation Started...');
      }
      
      if (event instanceof NavigationEnd || 
          event instanceof NavigationCancel || 
          event instanceof NavigationError) {
        this.isLoading = false; 
        console.log('Navigation Finished/Stopped.');
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
