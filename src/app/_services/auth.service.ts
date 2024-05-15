import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  
  private mockUser = {
    username: 'admin',
    password: 'password'
  };
  constructor() {
    // Initialize authentication state based on localStorage
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }


  
  login(username: string, password: string): boolean {
    // Mock authentication logic
    if (username === this.mockUser.username && password === this.mockUser.password) {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true'); // Store authentication state in sessionStorage

      return true; // Authentication successful
    } else {
      return false; // Authentication failed
    }
  }

  // TO BE DONE
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    window.close();

  }

  isLoggedInUser(): boolean {
    return this.isAuthenticated;
  }
}