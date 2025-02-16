  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { PlayerService } from '../../services/player.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    standalone:false,
    styleUrls: ['./signup.component.css']
  })
  export class SignupComponent {
    signupForm: FormGroup;
    errorMessage: string = '';
    linkedUsers: string[] = []; // Store linked usernames
    usernameNotLinked: boolean = false; // Track if username is not linked

    constructor(private fb: FormBuilder, private playerService: PlayerService, private router: Router) {
      this.signupForm = this.fb.group({
        InGameName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      });

      this.loadLinkedUsers(); // Fetch linked usernames on component load
    }

    // Fetch usernames from the API
    loadLinkedUsers() {
      this.playerService.getLinkedUsers().subscribe(
        (response) => {
          this.linkedUsers = Object.values(response) as string[]; // Extract only names
          console.log('Linked User Names:', this.linkedUsers);
        },
        (error) => {
          console.error('Failed to fetch linked users:', error);
        }
      );
    }

    onSignup() {
      if (this.signupForm.invalid) return;

      const userData = this.signupForm.value;
      console.log('Entered User Data:', userData);

      // Check if the entered username exists in the API data
      if (!this.linkedUsers.includes(userData.InGameName)) {
        console.error('Error: Username not linked!');
        this.usernameNotLinked = true; // Set error flag to true
        alert("Bro please link your account in Discord");
        return;
      } else {
        this.usernameNotLinked = false; // Reset error flag if username is found
      }

      // Proceed with signup if username exists
      this.playerService.signup(userData).subscribe(
        (response) => {
          //console.log('Signup successful:', response);
          localStorage.setItem('tempEmail', userData.email);
          // Navigate to the OTP verification page
          this.router.navigate(['/otp']);
        },
        (error) => {
          if (error.error ) {
            this.errorMessage = error.error.error; // Capture error message from API
          }
          //console.error('Signup failed:', error);
        }
      );
    }
  }
