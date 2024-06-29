import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { CarritoService } from '../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;

  confirmType: 'eliminar' | 'activar' | null = null;

  constructor(private productService: ProductService,
              private authService: AuthService, 
              private cartService: CarritoService, 
              private toastr: ToastrService) {}

  ngOnInit(): void {}

  onPedir(): void {
    this.cartService.agregarAlCarrito(this.product);
    console.log(`Pedido realizado para el producto: ${this.product.nombre}`);
  }

  onEliminar() {
    this.confirmType = 'eliminar';
    this.confirmDialog.message = '¿Está seguro de que desea eliminar este producto?';
    this.confirmDialog.show();
  }

  onActivar() {
    this.confirmType = 'activar';
    this.confirmDialog.message = '¿Está seguro de que desea activar este producto?';
    this.confirmDialog.show();
  }

  handleConfirm(confirmed: boolean) {
    if (confirmed) {
      if (this.confirmType === 'eliminar') {
        this.productService.deleteProduct(this.product.id).subscribe(
          () => {
            console.log('Producto eliminado');
            window.location.reload();
          },
          (error) => {
            console.error('Error al eliminar el producto', error);
          }
        );
      } else if (this.confirmType === 'activar') {
        // Lógica para activar el producto
        // Supongo que tienes un método para esto en tu servicio de productos
        this.productService.activateProducto(this.product.id).subscribe(
          () => {
            console.log('Producto activado');
            window.location.reload();
          },
          (error) => {
            console.error('Error al activar el producto', error);
          }
        );
      }
    }
    this.confirmType = null;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }
}
