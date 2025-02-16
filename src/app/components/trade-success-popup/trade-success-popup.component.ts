// trade-success-popup.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-trade-success-popup',
  template: `
    <div class="fixed inset-0 flex items-center justify-center z-50" 
         [@fadeInOut]="true">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      
      <!-- Popup Container -->
      <div class="relative max-w-md w-full mx-4 animate-float">
        <div class="bg-gray-800 border-4 border-green-600 p-6 rounded-lg shadow-2xl">
          <!-- Success Icon -->
          <div class="text-center mb-4">
            <div class="inline-block p-3 rounded-full bg-green-900 border-2 border-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <!-- Title -->
          <h2 class="text-2xl font-bold text-green-400 text-center mb-4 minecraft-text">
            Trade Placed Successfully!
          </h2>
          
          <!-- Message -->
          <div class="bg-gray-900 border-2 border-green-700 p-4 rounded-lg mb-6">
            <p class="text-gray-300 text-center minecraft-text">
              Get your payment ready! Our trade Team will Reach you soon. Thank you for choosing our website :].
            </p>
          </div>
          
          <!-- Close Button -->
          <div class="text-center">
            <button (click)="onClose.emit()" 
                    class="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded 
                           border-2 border-green-700 transition-colors duration-200 
                           minecraft-button">
              Got It!
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone:false,
  styles: [`
    .minecraft-text {
      text-shadow: 2px 2px #000;
    }
    
    .minecraft-button {
      text-shadow: 1px 1px #000;
      box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.2);
    }
    
    .animate-float {
      animation: float 1s ease-out;
    }
    
    @keyframes float {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class TradeSuccessPopupComponent {
  @Output() onClose = new EventEmitter<void>();
}