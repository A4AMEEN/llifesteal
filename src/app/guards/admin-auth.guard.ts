import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  CanActivateChild,
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';
import { PlayerService } from '../services/player.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAdmin = this.playerService.isAdmin();
    const adminToken = this.playerService.getAdminToken();
    
    if (!isAdmin || !adminToken) {
      console.log('Unauthorized admin access attempt');
      this.router.navigate(['/admin/auth']);
      return false;
    }

    return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}