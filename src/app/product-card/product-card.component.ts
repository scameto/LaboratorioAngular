// src/app/product-card/product-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;

  constructor(private productService: ProductService,private authService: AuthService) { }

  ngOnInit(): void {
  }

  onPedir(): void {
    // Aquí puedes manejar la lógica cuando se hace clic en el botón "Pedir"
    console.log(`Pedido realizado para el producto: ${this.product.nombre}`);
  }

  onEliminar() {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.productService.deleteProduct(this.product.id).subscribe(
        () => {
          console.log('Producto eliminado');
          // Aquí puedes añadir lógica para actualizar la lista de productos en el componente padre
        },
        (error) => {
          console.error('Error al eliminar el producto', error);
        }
      );
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }

}
