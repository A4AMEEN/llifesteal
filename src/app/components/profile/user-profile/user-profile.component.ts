import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
    userData: any;
  
    constructor(
      private authService: PlayerService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.isLoggedIn();
      this.getUserData();
    }
  
    isLoggedIn() {
      this.authService.isLoggedIn();
    }
  
    getUserData() {
      this.userData = this.authService.getUser();
      console.log(this.userData);
    }
  
    logout() {
      // Implement your logout logic here
      console.log('Logging out...');
      // Example:
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }