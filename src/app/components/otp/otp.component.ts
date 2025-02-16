import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  standalone: false,
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  email: string = '';
  timeLeft: number = 60;
  interval: any;
  resendDisabled: boolean = true;
  verifyDisabled: boolean = false; // Disable verify when OTP expires
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: PlayerService, private router: Router) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit() {
    this.email = localStorage.getItem('tempEmail') || '';
    this.startTimer();
  }

  startTimer() {
    this.timeLeft = 60;
    this.resendDisabled = true;
    this.verifyDisabled = false; 
    this.errorMessage = ''; 

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.resendDisabled = false;
        this.verifyDisabled = true;
        this.errorMessage = 'OTP has expired. Please request a new OTP.';
        clearInterval(this.interval);
      }
    }, 1000);
  }

  onVerifyOtp() {
    if (this.otpForm.invalid || this.verifyDisabled) return;

    const otp = this.otpForm.value.otp;
    this.authService.verifyOtp(this.email, otp).subscribe(
      () => {
        this.errorMessage = '';
        alert('OTP verified successfully! now you are good to go :)');
        this.router.navigate(['/trades']);
      },
      () => {
        this.errorMessage = 'Invalid OTP. Please try again.';
      }
    );
  }

  onResendOtp() {
    this.authService.resendOtp(this.email).subscribe(
      () => {
        alert('New OTP sent!');
        this.startTimer();
      },
      () => {
        this.errorMessage = 'Failed to resend OTP. Try again later.';
      }
    );
  }
}
