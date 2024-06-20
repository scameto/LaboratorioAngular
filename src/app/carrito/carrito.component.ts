import { Component } from '@angular/core';
import { CarritoService } from '../services/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  articulosCarrito$ = this.carritoService.carrito$;
  totalCarrito: number = 0;
  message: string | null = null;
  error: string | null = null;
  fechaRetiro: string = '';

  constructor(private carritoService: CarritoService) {
    this.articulosCarrito$.subscribe(items => {
      this.totalCarrito = items.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
    });
  }

  onEliminar(producto: any) {
    this.carritoService.eliminarDelCarrito(producto);
  }

  onAumentarCantidad(articulo: any) {
    this.carritoService.actualizarCantidad(articulo.producto, articulo.cantidad + 1);
  }

  onDisminuirCantidad(articulo: any) {
    if (articulo.cantidad > 1) {
      this.carritoService.actualizarCantidad(articulo.producto, articulo.cantidad - 1);
    }
  }

  finalizarPedido() {
    const fechaPedido = new Date().toISOString().split('T')[0];
    const pedido = {
      fechaPedido,
      fechaRetiro: this.fechaRetiro,
      articulos: this.carritoService.getCarrito(),
      total: this.totalCarrito,
      estado: 'pendiente',
    };

    // Guardar el pedido en localStorage
    this.carritoService.guardarPedido(pedido);

    this.carritoService.limpiarCarrito();
    this.message = 'Pedido finalizado con éxito.';
    this.error = null;
  }
}
