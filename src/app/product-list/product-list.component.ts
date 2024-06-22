import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  productos: Product[] = [];
  constructor(private authService: AuthService, private productService: ProductService, private http:HttpClient) {}

  ngOnInit(){
    
    this.loadProductos();
  }

  loadProductos(): void {
    if(this.isAuthenticated() && this.isAdmin()){
      this.productService.getProductos().subscribe(
        (data: any[]) => {
          this.productos = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
    else{
      this.productService.getProductosActivos().subscribe(
        (data: any[]) => {
          this.productos = data;
          console.log(data);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  decodeBase64(base64String: string): string {
    return atob(base64String);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
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
