import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authService: AuthService, private router: Router) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  isUser(): boolean {
    return this.authService.getUserRole() === 'USER';
  }

  isPanadero(): boolean {
    return this.authService.getUserRole() === 'PANADERO';
  }
}
