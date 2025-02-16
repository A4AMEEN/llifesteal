import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { TradeService } from '../../services/trades.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  standalone: false,
  styleUrls: ['./trades.component.css'],
})
export class TradesComponent implements OnInit {
  trades: any[] = []; // Initialize as an empty array
  showTradeDialog = false;
  selectedTrade: any;

  constructor(private authService: PlayerService,private TradeService:TradeService, private router: Router) {}

  ngOnInit(): void {
    this.loadTrades();
  }

  loadTrades(): void {
    this.TradeService.getTrades().subscribe(
      (data: any[]) => {
        this.trades = data.map(trade => ({
          ...trade,
          priceIngots: trade.price.ingot, 
          priceIRL: trade.price.irl 
        }));
      },
      (error) => {
        console.error('Error fetching trades:', error);
      }
    );
  }

  showSuccessPopup = false;

  onTradeComplete(): void {
    this.showTradeDialog = false;
    this.showSuccessPopup = true;
    this.loadTrades();
  }

  onTrade(trade: any): void {
    if (!this.authService.isLoggedIn()) {
      alert("Bro please login and verify first to Trade! :)")
      this.router.navigate(['/login']);
      return;
    }
    this.selectedTrade = trade;
    this.showTradeDialog = true;
  }

}