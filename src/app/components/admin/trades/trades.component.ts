import { Component, OnInit } from '@angular/core';
import { TradeService } from '../../../services/trades.service';

@Component({
  selector: 'app-trade',
  standalone: false,
  templateUrl: './trades.component.html',
  styleUrl: './trades.component.css'
})
export class TradeComponent implements OnInit {
  trades: any[] = [];
  newTrade: any = {
    item: '',
    quantity: null,
    priceIngots: null,
    priceIRL: null,
    offer: '',
    stockStatus: 'In Stock',
    image: null
  };
  isModalOpen = false;
  isEditMode = false;
  selectedTrade: any = null;
  URL = URL; // Make URL available in template

  constructor(private tradeService: TradeService) { }

  ngOnInit() {
    this.loadTrades();
  }

  onAddTrade() {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.resetForm();
  }

  onEditTrade(trade: any) {
    this.selectedTrade = { ...trade };
    this.isModalOpen = true;
    this.isEditMode = true;
  }

  submitTrade() {
    const formData = new FormData();

    if (this.newTrade.item) {
      formData.append('item', this.newTrade.item);
    }
    if (this.newTrade.quantity !== null) {
      formData.append('quantity', this.newTrade.quantity.toString());
    }
    if (this.newTrade.priceIngots !== null) {
      formData.append('priceIngots', this.newTrade.priceIngots.toString());
    }
    if (this.newTrade.priceIRL !== null) {
      formData.append('priceIRL', this.newTrade.priceIRL.toString());
    }
    if (this.newTrade.offer) {
      formData.append('offer', this.newTrade.offer);
    }
    if (this.newTrade.stockStatus) {
      formData.append('stockStatus', this.newTrade.stockStatus);
    }
    if (this.newTrade.image) {
      formData.append('image', this.newTrade.image, this.newTrade.image.name);
    }

    this.tradeService.addTrade(formData).subscribe({
      next: (response) => {
        console.log('Trade added successfully', response);
        this.isModalOpen = false;
        this.loadTrades();
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding trade', error);
      }
    });
  }



  loadTrades() {
    this.tradeService.getTrades().subscribe((data) => {
      console.log("trade", data);

      this.trades = data;
    });
  }

  // onAddTrade() {
  //   this.isModalOpen = true;
  // }

  onImageChange(event: any) {
    if (event.target.files.length > 0) {
      this.newTrade.image = event.target.files[0];
      console.log("Selected Image:", this.newTrade.image);
    }
  }




  onRemoveTrade(tradeId: any) {
    this.tradeService.deleteTrade(tradeId).subscribe(() => {
      this.loadTrades();
    });
  }

  // onEditTrade(trade: any) {
  //   this.selectedTrade = { ...trade };
  //   console.log("selected trade", this.selectedTrade)
  //   this.isModalOpen = true;
  //   this.isEditMode = true;
  // }

  onEdit() {
    const formData = new FormData();

    // Append fields from selected trade or new trade
    const tradeToSubmit = this.isEditMode ? this.selectedTrade : this.newTrade;

    console.log('Trade to submit:', tradeToSubmit);

    // Verify and append each field safely
    if (tradeToSubmit.itemName) {
      formData.append('item', tradeToSubmit.itemName);
    }

    if (tradeToSubmit.quantity !== null && tradeToSubmit.quantity !== undefined) {
      formData.append('quantity', tradeToSubmit.quantity.toString());
    }

    if (tradeToSubmit.price.ingot !== null && tradeToSubmit.price.ingot !== undefined) {
      formData.append('priceIngots', tradeToSubmit.price.ingot.toString());
    }

    if (tradeToSubmit.price.rs !== null && tradeToSubmit.price.rs !== undefined) {
      formData.append('priceIRL', tradeToSubmit.price.rs.toString());
    }

    if (tradeToSubmit.offer) {
      formData.append('offer', tradeToSubmit.offer);
    }

    if (tradeToSubmit.stockStatus) {
      formData.append('stockStatus', tradeToSubmit.stockStatus);
    }

    // Handle image upload
    if (this.newTrade.image) {
      formData.append('image', this.newTrade.image, this.newTrade.image.name);
    }

    if (this.isEditMode) {
      if (!tradeToSubmit._id) {
        console.error("Error: Trade ID is missing!");
        return;
      }

      console.log("Updating trade with ID:", tradeToSubmit._id);

      // Update existing trade
      this.tradeService.updateTrade(tradeToSubmit._id, formData).subscribe({
        next: (response) => {
          this.loadTrades();
          this.isModalOpen = false;
          this.isEditMode = false;
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating trade:', error);
        }
      });
    } else {
      // Add new trade
      this.tradeService.addTrade(formData).subscribe({
        next: (response) => {
          this.loadTrades();
          this.isModalOpen = false;
          this.resetForm();
        },
        error: (error) => {
          console.error('Error adding trade:', error);
        }
      });
    }
  }

  // In your Angular component
toggleStockStatus(trade: any) {
  const stockStatus = trade.stockOut ? 'In Stock' : 'Out of Stock';
  
  const formData = new FormData();
  formData.append('stockStatus', stockStatus);

  this.tradeService.toggleTradeStock(trade._id, formData).subscribe({
    next: (response) => {
      this.loadTrades(); // Refresh the trades list
    },
    error: (error) => {
      console.error('Error toggling stock status:', error);
    }
  });
}


  resetForm() {
    this.newTrade = {
      item: '',
      quantity: null,
      priceIngots: null,
      priceIRL: null,
      offer: '',
      stockStatus: 'In Stock',
      image: null
    };
    this.selectedTrade = null;
  }

}