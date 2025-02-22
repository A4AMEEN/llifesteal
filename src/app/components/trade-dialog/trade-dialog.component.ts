import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TradeService } from '../../services/trades.service';
import { PlayerService } from '../../services/player.service';
import { max } from 'rxjs';

@Component({
  selector: 'app-trade-dialog',
  standalone: false,
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-gray-800 p-6 rounded-lg border-4 border-green-600 w-96 max-w-full mx-4">
        <h2 class="text-2xl text-white mb-4">Trade {{trade.itemName}}</h2>
        
        <div class="mb-4">
  <label class="block text-white mb-2">Quantity (Stacks)</label>
  <input
    type="number"
    [(ngModel)]="quantity"
    (ngModelChange)="calculatePrice()"
    min="1"
    max="5"
    class="w-full bg-gray-700 text-white rounded p-2 border border-green-600">
  <p *ngIf="errorMessage" class="text-red-500 mt-1">{{ errorMessage }}</p>
</div>


        <div class="mb-4">
          <label class="block text-white mb-2">Payment Method</label>
          <select 
            [(ngModel)]="paymentMethod" 
            (ngModelChange)="calculatePrice()" 
            class="w-full bg-gray-700 text-white rounded p-2 border border-green-600">
            <option value="ingot">Ingots</option>
            <option value="rs">Rupees (₹)</option>
          </select>
        </div>

        <div class="mb-6 text-white">
          <p>Price per Stack: {{basePrice}} {{paymentMethod === 'ingot' ? 'Ingots' : '₹'}}</p>
          <p>Total Price: {{totalPrice}} {{paymentMethod === 'ingot' ? 'Ingots' : '₹'}}</p>
        </div>

        <div class="flex justify-end gap-2">
          <button 
            (click)="onClose.emit()" 
            [disabled]="isLoading"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
            Cancel
          </button>
          <button 
            (click)="confirmTrade()" 
            [disabled]="!isValidTrade() || isLoading"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2">
            <span *ngIf="!isLoading">Confirm Trade</span>
            <div *ngIf="isLoading" class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          </button>
        </div>
      </div>
    </div>
  `
})
export class TradeDialogComponent {
  @Input() trade: any;
  @Output() onClose = new EventEmitter<void>();
  @Output() onTradeComplete = new EventEmitter<void>();

  quantity = 1;
  paymentMethod = 'ingot';
  totalPrice = 0;
  basePrice = 0;
  isLoading = false;
  userData:any
  max: number = 5;
  constructor(private tradeService: TradeService,private playerService:PlayerService) { }

  ngOnInit() {
    this.calculatePrice();
    this.getUserData()
    this.maxtrade()
  }
  errorMessage = '';
  calculatePrice() {
    if (this.quantity > this.max) {
      this.errorMessage = `You can trade a maximum of ${this.max} stacks per Trading.`;
    } else {
      this.errorMessage = '';
      this.basePrice = this.paymentMethod === 'ingot' ? this.trade.price.ingot : this.trade.price.rs;
      this.totalPrice = this.basePrice * this.quantity;
    }
  }
  
  getUserData() {
    this.userData = this.playerService.getUser();
    console.log("userdata", this.userData);
  
    if (this.userData) {
      this.maxtrade(); // Ensure maxtrade() runs only after userData is available
    }
  }
  
  maxtrade() {
    if (this.userData?.totalTrades > 0) {
      console.log("Existing trades:", this.userData.totalTrades);
      this.max = 20;
    } else {
      this.max = 5;
    }
    console.log("max");
    
  }

  isValidTrade(): boolean {
    return this.quantity > 0 &&
      this.quantity <= this.trade.quantity &&
      this.quantity <= this.max &&  // Ensure quantity is 5 or below
      this.totalPrice > 0;
  }



  confirmTrade() {
    if (!this.isValidTrade() || this.isLoading) return;

    this.isLoading = true;
    const tradeDetails = {
      tradeId: this.trade._id,
      quantity: this.quantity,
      paymentMethod: this.paymentMethod,
      totalPrice: this.totalPrice
    };

    this.tradeService.createPlayerTrade(tradeDetails).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.onTradeComplete.emit();
        this.onClose.emit();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error creating trade:', error);
      }
    });
  }
}