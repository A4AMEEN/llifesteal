import { Component, OnInit } from '@angular/core';
import { TradeService } from '../../../services/trades.service';
import { PlayerService } from '../../../services/player.service';
import { log } from 'console';

@Component({
  selector: 'app-admin-trades',
  standalone:false,
  templateUrl:'./trading.component.html'
})
export class TradingComponent implements OnInit {
  trades: any[] = [];
  admin:any

  constructor(private tradeService: TradeService, private authService:PlayerService) {}

  ngOnInit() {
    this.loadTrades();
    this.admin=this.authService.getAdminData()
    console.log('admin',this.admin);
    
  }

  loadTrades() {
    this.tradeService.getAllPlayerTrades().subscribe({
      next: (data) => {
        console.log('Loaded trades:', data);
        this.trades = data;
      },
      error: (error) => {
        console.error('Error loading trades:', error);
      }
    });
  }

  updateDeliveryStatus(tradeId: string, event: any) {
    const newStatus = event.target.value;
    this.tradeService.updateTradeStatus(tradeId, newStatus).subscribe({
      next: (response) => {
        console.log('Status updated successfully', response);
        // Optionally refresh the trades list
        this.loadTrades();
      },
      error: (error) => {
        console.error('Error updating status:', error);
      }
    });
  }

  updateTrader(tradeId: string, event: any) {
    const newTrader = event.target.value;
    this.tradeService.updateTrader(tradeId, newTrader).subscribe({
      next: (response) => {
        console.log('Trader updated successfully', response);
        this.loadTrades(); // Refresh the trades list after update
      },
      error: (error) => {
        console.error('Error updating trader:', error);
      }
    });
  }
  

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-500 text-yellow-900`;
      case 'processing':
        return `${baseClasses} bg-blue-500 text-blue-900`;
      case 'completed':
        return `${baseClasses} bg-green-500 text-green-900`;
      case 'cancelled':
        return `${baseClasses} bg-red-500 text-red-900`;
      default:
        return `${baseClasses} bg-gray-500 text-gray-900`;
    }
  }
  getTraderClass(trader: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (trader) {
      case 'Shakthi':
        return `${baseClasses} bg-blue-500 text-white`;
      case 'Practice':
        return `${baseClasses} bg-black text-white`;
      case 'FearX':
        return `${baseClasses} bg-white text-black border border-gray-400`;
      case 'Finding':
        return `${baseClasses} bg-yellow-500 text-yellow-900`;
      default:
        return `${baseClasses} bg-gray-500 text-gray-900`; // Default for "Accept"
    }
  }
  
  
}