import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { TradeService } from '../../../services/trades.service';

@Component({
  selector: 'app-user-trades',
  standalone: false,
  templateUrl: './user-trades.component.html',
  styleUrls: ['./user-trades.component.css']
})
export class UserTradesComponent implements OnInit {
  userTrades: any[] = [];
  allTrades: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
 
  constructor(
    private playerService: PlayerService,
    private tradeService: TradeService
  ) {}

  ngOnInit(): void {
    this.loadUserTrades();
  }

  loadUserTrades(): void {
    const userId = this.playerService.getUser()._id;
    
    this.tradeService.getUserTrades(userId).subscribe(
      (trades) => {
        this.allTrades = trades;
        this.updatePagination();
      },
      (error) => {
        console.error('Error loading user trades:', error);
      }
    );
  }

  updatePagination(): void {
    // Calculate total pages
    this.totalPages = Math.ceil(this.allTrades.length / this.itemsPerPage);
    
    // Get current page items
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.userTrades = this.allTrades.slice(startIndex, endIndex);
  }

  getLastItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.allTrades.length);
  }

  getPagesArray(): number[] {
    return new Array(this.totalPages);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  cancelTrade(tradeId: string): void {
    if (confirm('Are you sure you want to cancel this trade?')) {
      this.tradeService.cancelTrade(tradeId).subscribe(
        () => {
          this.loadUserTrades(); // Reload trades after cancellation
        },
        (error) => {
          console.error('Error canceling trade:', error);
        }
      );
    }
  }
}