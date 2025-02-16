import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 // Import the service
import { PlayerService } from '../../../services/player.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: false,
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authForm: FormGroup;
  errorMessages: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: PlayerService // Inject the service
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      adminCode: ['', [Validators.required]] // Admin code field
    });
  }

  onLogin() {
    if (this.authForm.valid) {
      const { email, password, adminCode } = this.authForm.value;

      this.authService.adminLogin(email, password, adminCode)
        .pipe(
          catchError(error => {
            this.errorMessages = error.message;
            return throwError(() => error);
          })
        )
        .subscribe({
          next: (response) => {
            alert('Admin login successful!');
            this.router.navigate(['/admin-dashboard']);
          },
          error: (err) => {
            this.errorMessages = err.message;
          }
        });
    }
  }
}