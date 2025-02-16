import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: PlayerService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']); 
      return false;
    }
    return true;
  }
}
