import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private tokenKey = 'authToken';
  private userKey = 'userData';
  private apiUrl = 'https://backend-rosy-eight-77.vercel.app';
  private linkedApiUrl = 'http://api.mallulifesteal.fun/api/linked';
  private apiKey = 'mallu-public-api-key';
  private adminTokenKey = 'adminToken';
  private isBrowser: boolean;

  // Hardcoded admin credentials
  private adminCredentials: { email: string; password: string; code: string }[] = [
    { email: 'shakthi@lifesteal.com', password: 'password', code: '122333' },
    { email: 'practice@lifesteal.com', password: 'password', code: '122333' },
    { email: 'fearxlifesteal@gmail.com', password: 'password', code: '122333' },
  ];

  constructor(
    private router: Router, 
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Save user data
  setUser(user: any) {
    if (this.isBrowser) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/playerUsers`);
  }

  // Get user data
  getUser(): any | null {
    if (!this.isBrowser) {
      return null;
    }
    const user = localStorage.getItem(this.userKey);
    console.log(user);
    
    return user ? JSON.parse(user) : null;
  }

  // Save token
  setToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  // Get token
  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const token = this.getToken();
    return token !== null && token !== '';
  }

  isAdminLoggedIn(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const token = this.getAdminToken();
    console.log("token", token);
    
    return token !== null && token !== '';
  }

  private generateAdminToken(email: string): string {
    return btoa(`admin-${email}-${Date.now()}`);
  }

  adminLogin(email: string, password: string, adminCode: string): Observable<any> {
    return new Observable(observer => {
      const admin = this.adminCredentials.find(
        admin => admin.email === email && 
                 admin.password === password && 
                 admin.code === adminCode
      );

      if (admin) {
        const adminToken = this.generateAdminToken(email);
        this.setAdminToken(adminToken);
        this.setUser({ email, role: 'admin' });

        observer.next({ 
          success: true, 
          token: adminToken, 
          role: 'admin',
          user: { email, role: 'admin' }
        });
      } else {
        observer.error(new Error('Invalid admin credentials'));
      }
      observer.complete();
    });
  }

  setAdminToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem(this.adminTokenKey, token);
    }
  }

  getAdminToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem(this.adminTokenKey);
  }

  isAdmin(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const user = this.getUser();
    const token = this.getAdminToken();
    return user?.role === 'admin' && token !== null && token !== '';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.setToken(response.token);
        this.setUser(response.user);
        console.log("response", response);
      }),
      catchError(error => {
        return throwError(() => new Error(error.error.message || 'Login failed'));
      })
    );
  }

  logout(): Observable<any> {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }

    return of(true);
  }

  adminLogout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('adminToken');
    }
    this.router.navigate(['/admin/auth']);
  }

  // Signup request
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // Get linked users
  getLinkedUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/linked-users`);
  }

  // Verify OTP
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-otp`, { email, otp }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.setUser(response.user);
        }
      })
    );
  }

  // Resend OTP
  resendOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/resend-otp`, { email });
  }
}