import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(token: string): void {
    localStorage.setItem('token', token);
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
