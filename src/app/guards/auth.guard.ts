// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: PlayerService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user is logged in but blocked
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();
      if (user && user.isBlocked) {
        // User is blocked, log them out
        this.authService.logout();
        this.router.navigate(['/login'], { 
          queryParams: { error: 'Your account has been blocked. Please contact support.' } 
        });
        return false;
      }
      
      // User is logged in and not blocked
      return true;
    }
    
    // User is not logged in
    this.router.navigate(['/login']);
    return false;
  }
}