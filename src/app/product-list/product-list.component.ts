import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productos: Product[] = [];
  filteredProductos: Product[] = [];
  filterText: string = '';
  filterMinPrice: number | null = null;
  filterMaxPrice: number | null = null;
  currentPage: number = 1;
  pageSize: number = 12;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    if (this.isAuthenticated() && this.isAdmin()) {
      this.productService.getProductosPaginado(this.currentPage, this.pageSize).subscribe(
        response => {
          this.productos = response.productos;
          this.totalItems = response.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          this.filterProductos();
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      this.productService.getProductosActivosPaginado(this.currentPage, this.pageSize).subscribe(
        response => {
          this.productos = response.productos;
          this.totalItems = response.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          this.filterProductos();
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  filterProductos(): void {
    this.filteredProductos = this.productos.filter(product =>
      product.nombre.toLowerCase().includes(this.filterText.toLowerCase()) &&
      (this.filterMinPrice === null || product.precio >= this.filterMinPrice) &&
      (this.filterMaxPrice === null || product.precio <= this.filterMaxPrice)
    );
  }

  onFilterChange(): void {
    this.filterProductos();
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

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProductos();
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
