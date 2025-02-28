import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../services/player.service';
import { TradeService } from '../../../services/trades.service';
import Swal from 'sweetalert2';

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
        console.log('allTrades',this.allTrades);
        
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
    Swal.fire({
      title: 'N!gga you wanna cancell this trade bruhh!! :(',
      text: 'You dont want that item???',
      icon: 'warning',
      background: '#2B2B2B', // Dark Minecraft background
      color: '#39FF14', // Minecraft Emerald Green
      showCancelButton: true,
      confirmButtonColor: '#D33', // Redstone Red
      cancelButtonColor: '#3085d6', // Diamond Blue
      confirmButtonText: 'Yes, cancel it! 🚨',
      cancelButtonText: 'No, keep it 🛑',
      customClass: {
        popup: 'minecraft-popup',
        title: 'minecraft-title',
        confirmButton: 'minecraft-button',
        cancelButton: 'minecraft-button'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '🤣Poor N!gga i know you cant even afford it lol :)',
          text: 'Go cancel it and Regret LAMO',
          icon: 'warning',
          background: '#2B2B2B',
          color: '#FFD700', // Gold Text
          showCancelButton: true,
          confirmButtonColor: '#D33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, I’m 100% sure! 🤔',
          cancelButtonText: 'Wait, maybe not...'
        }).then((secondResult) => {
          if (secondResult.isConfirmed) {
            Swal.fire({
              title: '😱 Last Chance! N!gga ',
              text: 'Your Final decision i wont ask for a Fourth Time❌',
              icon: 'warning',
              background: '#2B2B2B',
              color: '#FF3131', // Intense Red
              showCancelButton: true,
              confirmButtonColor: '#D33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'DO IT! 💀',
              cancelButtonText: 'I changed my mind!'
            }).then((finalResult) => {
              if (finalResult.isConfirmed) {
                this.tradeService.cancelTrade(tradeId).subscribe(
                  () => {
                    Swal.fire({
                      title: '☠️ Trade Canceled!',
                      text: 'If you cant Afford Then dont try to Trade(Poor N!gga)',
                      icon: 'success',
                      background: '#2B2B2B',
                      color: '#39FF14',
                      confirmButtonColor: '#3085d6'
                    });
                    this.loadUserTrades(); // Reload trades after cancellation
                  },
                  (error) => {
                    console.error('Error canceling trade:', error);
                    Swal.fire({
                      title: '🔥 Error!',
                      text: 'Failed to cancel trade. Try again later.',
                      icon: 'error',
                      background: '#2B2B2B',
                      color: '#FF3131',
                      confirmButtonColor: '#d33'
                    });
                  }
                );
              }
              else {
                // If the user decides to keep the trade
                Swal.fire({
                  title: '🎉 That’s My Pro Gamer!',
                  text: 'I knew you wouldn’t let a great deal slip away! Keep grinding! 🚀',
                  icon: 'success',
                  background: '#2B2B2B',
                  color: '#39FF14',
                  confirmButtonColor: '#3085d6'
                });
              }
              
            });
          }
          else {
            // If the user decides to keep the trade
            Swal.fire({
              title: '🎉 That’s My Pro Gamer!',
              text: 'I knew you wouldn’t let a great deal slip away! Keep grinding! 🚀',
              icon: 'success',
              background: '#2B2B2B',
              color: '#39FF14',
              confirmButtonColor: '#3085d6'
            });
          }
        });
      }
      else {
        // If the user decides to keep the trade
        Swal.fire({
          title: '🎉 Thats my Boy!! :)',
          text: 'I Knew you are a N!GGA Premium:) 🚀',
          icon: 'success',
          background: '#2B2B2B',
          color: '#39FF14',
          confirmButtonColor: '#3085d6'
        });
      }
    });
  }
  
}