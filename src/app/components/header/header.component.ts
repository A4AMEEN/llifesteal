import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-minecraft-header',
  templateUrl: './header.component.html',
  standalone:false,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string = 'Guest';
  isLoggedIn: boolean = false;

  isMenuOpen = true; // Menu state
  constructor(private router: Router, private authService: PlayerService) {
    this.checkUserStatus();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Toggle menu open/close
  }

  checkUserStatus() {
    const user = this.authService.getUser();
    if (user) {
      this.username = user.name;
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.username = 'Guest';
        this.router.navigate(['/home']);
      },
      error: (err: any) => console.error('Logout failed:', err)
    });
  }

  handleProfileClick() {
    if (this.username === 'Guest') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/profile']);
    }
  }
}
