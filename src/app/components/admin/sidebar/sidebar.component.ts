import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = false;
  isSidebarOpen = true;
  isMobile = false;
  private isBrowser: boolean;

  constructor(
    private authService: PlayerService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    if (this.isBrowser) {
      this.checkScreenSize();
    } else {
      // Default for server-side rendering
      this.isMobile = false;
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isSidebarOpen = !this.isSidebarOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.isBrowser) {
      this.checkScreenSize();
    }
  }

  private checkScreenSize() {
    if (this.isBrowser) {
      this.isMobile = window.innerWidth <= 1024; // Adjust based on breakpoints
      if (this.isMobile) {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = true;
      }
    }
  }

  logout() {
    this.authService.adminLogout();
  }
}