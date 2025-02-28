import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private playerService: PlayerService, private router: Router) {}

  canActivate(): boolean {
    // If admin token exists, allow direct access to admin dashboard
    if (this.playerService.getAdminToken()) {
      // Check if this is a valid admin token before redirecting
      // This part depends on how you validate admin tokens
      return true; // Allow access to login page
    }
    return true; // Allow access to login page even if no token
  }
}
