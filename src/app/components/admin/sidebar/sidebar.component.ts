import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PlayerService } from '../../../services/player.service';
interface NavItem {
  route: string;
  icon: string;
  label: string;
}
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit,OnDestroy {
  // isCollapsed = false;
  // isSidebarOpen = true;
  // isMobile = false;
  private isBrowser: boolean;

  isCollapsed = false;
  isMobile = window.innerWidth < 1024;
  isSidebarOpen = !this.isMobile;

  navItems: NavItem[] = [
    {
      route: '/admin-dashboard/dashboard',
      icon: 'dashboard',
      label: 'Dashboard'
    },
    {
      route: '/admin-dashboard/players',
      icon: 'people',
      label: 'Players'
    },
    {
      route: '/admin-dashboard/trades',
      icon: 'swap_horiz',
      label: 'Trades'
    }
  ];

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

  ngOnInit() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.handleResize.bind(this));
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

  private handleResize() {
    this.isMobile = window.innerWidth < 1024;
    if (!this.isMobile) {
      this.isSidebarOpen = true;
    }
  }

  logout() {
    this.authService.adminLogout();
  }
}