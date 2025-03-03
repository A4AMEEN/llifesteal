import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { log } from 'node:console';
import { interval, takeWhile, switchMap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  standalone:false,
  styleUrls: ['./players.component.css']
})
export class PlayerListComponent implements OnInit {
  players: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private playerService: PlayerService,private router:Router) {}

  ngOnInit(): void {
    this.fetchPlayers();
    if (this.playerService.isLoggedIn()) {
      this.startBlockStatusCheck();
    }
  }

  startBlockStatusCheck() {
    interval(300000) // 5 minutes
      .pipe(
        takeWhile(() => this.playerService.isLoggedIn()),
        switchMap(() => this.playerService.checkBlockStatus())
      )
      .subscribe({
        next: (response) => {
          if (response.isBlocked) {
            // User has been blocked, log them out
            this.playerService.logout();
            this.router.navigate(['/login'], { 
              queryParams: { error: 'Your account has been blocked. Please contact support.' } 
            });
          }
        },
        error: (err) => {
          console.error('Error checking block status:', err);
        }
      });
  }
  

  fetchPlayers(): void {
    this.playerService.getAllUsers().subscribe({
      next: (response: any) => {
        console.log('response',response);
        
        // Access the 'users' array from the API response
        this.players = response.users.map((user: any) => ({
          name: user.name,
          email: user.email,
          totalTrades: user.totalTrades,
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching players:', err);
        this.error = 'Failed to load players. Please try again later.';
        this.loading = false;
      }
    });
  }

  toggleBlockStatus(playerId: string, isCurrentlyBlocked: boolean): void {
    this.playerService.toggleBlockStatus(playerId, isCurrentlyBlocked).subscribe({
      next: (response) => {
        console.log('hes cooked',response);

        this.fetchPlayers()
        // Update the player in the list
        this.players = this.players.map(player => {
          if (player._id === playerId) {
            return { ...player, isBlocked: !isCurrentlyBlocked };
          }
          return player;
        });
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
  
}
