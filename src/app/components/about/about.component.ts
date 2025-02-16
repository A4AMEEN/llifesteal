// about.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone:false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  serverFeatures = [
    {
      title: 'LifeSteal System',
      description: 'Every trade counts.You can see your trade status and history..click to profile picture and click profile and click on trades,You can see status and manage your trades',
      icon: '❤️'
    },
    {
      title: 'Trading System',
      description: 'Advanced player-to-player trading with both in-game and real currency support.Place your trade an the admin will update the trade status and reach you inGame.',
      icon: '💎'
    },
    {
      title: 'Community Events',
      description: 'Regular events, competitions, and challenges with exciting rewards.',
      icon: '🏆'
    },
    {
      title: 'Webstite Developer',
      description: 'Web Designer|Developer : SHAKTHI_PC...Available for paid Developing Website',
      icon: '🔧'
    }
  ];
}