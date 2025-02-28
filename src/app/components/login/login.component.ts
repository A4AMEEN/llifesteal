import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessages: string = ''; // Holds individual error messages

  constructor(private fb: FormBuilder, private authService: PlayerService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          Swal.fire({
            title: '🏆 Login Successful!',
            text: 'Welcome, Explore! Time to Trade 🚀',
            imageUrl: 'assets/icons8-minecraft-24.png', // Replace with a Minecraft-style success icon
            imageHeight: 80,
            background: '#2B2B2B', // Dark theme
            color: '#39FF14', // Minecraft Green
            confirmButtonColor: '#3C873A',
            confirmButtonText: 'Enter the World 🌍',
            customClass: {
              popup: 'minecraft-popup',
              title: 'minecraft-title',
              confirmButton: 'minecraft-button'
            },
            showClass: {
              popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOut'
            }
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },
        error: () => {
          Swal.fire({
            title: '☠ Oof! Login Failed!',
            text: 'Invalid Email or Password! Try again...',
            imageUrl: 'assets/icons8-minecraft-24.png', // Replace with a Minecraft-style error icon
            imageHeight: 80,
            background: '#2B2B2B',
            color: '#FF3131', // Minecraft Red
            confirmButtonColor: '#C70039',
            confirmButtonText: 'Retry 🔄',
            customClass: {
              popup: 'minecraft-popup',
              title: 'minecraft-title',
              confirmButton: 'minecraft-button'
            },
            showClass: {
              popup: 'animate__animated animate__shakeX'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOut'
            }
          });
        }
      });
    }
  }
}
