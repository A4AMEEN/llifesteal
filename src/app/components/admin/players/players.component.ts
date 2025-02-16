import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  standalone:false,
  styleUrls: ['./players.component.css']
})
export class PlayerListComponent implements OnInit {
  players: { name: string; email: string; totalTrades: number }[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.fetchPlayers();
  }

  fetchPlayers(): void {
    this.playerService.getAllUsers().subscribe({
      next: (response: any) => {
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
  
}
