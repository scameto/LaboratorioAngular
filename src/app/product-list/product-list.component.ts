import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  token: any = '';
  productos: any[] = [];
  constructor(private productService: ProductService, private http:HttpClient) {}

  ngOnInit(){
    this.obtenerToken();
    this.loadProductos();

  }

  obtenerToken() {
    // Obtener el token del localStorage
    this.token = localStorage.getItem('token');

    if (this.token) {
      console.log('Token obtenido:', this.token);
    } else {
      console.error('No se encontró ningún token en el localStorage.');
    }
  }

  loadProductos(): void {
    this.productService.getProductos(this.token).subscribe(
      (data: any[]) => {
        this.productos = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  decodeBase64(base64String: string): string {
    return atob(base64String);
  }
}
