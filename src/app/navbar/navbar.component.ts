import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CarritoService } from '../services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  totalArticulosCarrito = 0;


  constructor(private authService: AuthService, private router: Router, private carritoService: CarritoService) {
    this.carritoService.carrito$.subscribe(items => {
      this.totalArticulosCarrito = items.reduce((total, item) => total + item.cantidad, 0);
    });
  }

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

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }
}
