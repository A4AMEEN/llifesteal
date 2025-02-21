import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-minecraft-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string = 'Guest';
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;  // Add this property
  isDropdownOpen: boolean = false;

  constructor(private router: Router, private authService: PlayerService) {
    this.checkUserStatus();
  }

  checkUserStatus() {
    const user = this.authService.getUser();
    if (user) {
      this.username = user.name;
      this.isLoggedIn = true;
    }
  }
  toggleDropdown(): void {
    if (this.isLoggedIn) {
        this.isDropdownOpen = !this.isDropdownOpen;
    } else {
        // Redirect to login or show login modal
        this.handleProfileClick();
    }
}
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.username = 'Guest';
        this.showDropdown = false;  // Close dropdown on logout
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Logout failed:', err);
      }
    });
  }

  handleProfileClick() {
    if (this.username === 'Guest') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/profile']);
    }
  }
  
  goToTrades() {
    console.log("hhahahahahhaa");
    this.router.navigate(['/trades']);
  }
  
  goToAbout() {
    console.log("hhahahahahhaa");
    this.router.navigate(['/about']);
  }
}