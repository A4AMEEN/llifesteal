import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-minecraft-home',
  standalone:false,
  templateUrl: './minecraft-home.component.html',
  styleUrls: ['./minecraft-home.component.css']
})
export class MinecraftHomeComponent {
  username: string = 'Guest';
  isLoggedIn: boolean = false;

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

  // In minecraft-home.component.ts
logout() {
  this.authService.logout().subscribe({
    next: () => {
      this.isLoggedIn = false;
      this.username = 'Guest';
      this.router.navigate(['/home']); // Changed from '/trades' to '/home' as per your requirement
    },
    error: (err: any) => {
      console.error('Logout failed:', err);
    }
  });
}

  handleProfileClick() {
    if (this.username === 'Guest') {
      this.router.navigate(['/login']); // Redirect to login page
    } else {
      this.router.navigate(['/profile']); // Redirect to profile page
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
