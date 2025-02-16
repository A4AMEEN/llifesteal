import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private playerService: PlayerService, private router: Router) {}

  canActivate(): boolean {
    if (this.playerService.getAdminToken()) {
      console.log("this.playerService.getAdminToken()",this.playerService.getAdminToken());
      
      // If the admin is already logged in, prevent access to login/signup
      this.router.navigate(['/admin-dashboard']); // Redirect to admin dashboard
      return false;
    }
    return true;
  }
}
