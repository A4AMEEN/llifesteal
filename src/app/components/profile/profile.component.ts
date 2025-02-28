// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-profile',
  standalone:false,
  templateUrl: './profile.component.html',
  styleUrls:['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private authService:PlayerService){

  }
  userData: any = 'Guest'; // Replace with actual username
  isLoggedIn: boolean = true; // Replace with actual auth state
  mobileMenuOpen: boolean = false;
sidebarOpen: boolean = false;
isMobile: boolean = false;
  getUserData() {
    this.userData = this.authService.getUser();
    console.log(this.userData);
  }
  handleProfileClick() {
    // Handle profile click
    console.log('Profile clicked');
  }
  ngOnInit(): void {
    this.getUserData()
    this.checkScreenSize();
  
  // Listen for screen size changes
  window.addEventListener('resize', () => {
    this.checkScreenSize();
  });
  }

  isloggedIn(){
    this.authService.isLoggedIn()
  }
  logout() {
    // Implement logout logic here
    console.log('Logging out...');
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // 768px is the md breakpoint in Tailwind
  }
  
  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}