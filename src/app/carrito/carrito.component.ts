import { Component } from '@angular/core';
import { CarritoService } from '../services/cart.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  articulosCarrito$ = this.carritoService.carrito$;
  totalCarrito: number = 0;
  fechaRetiro: string = '';

  constructor(private carritoService: CarritoService, private userService: UserService, private toastr: ToastrService) {
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
    const fechaRetiroDate = new Date(this.fechaRetiro);
    const fechaActualDate = new Date();
    fechaActualDate.setHours(0, 0, 0, 0);

    if (!this.fechaRetiro) {
      this.toastr.error('La fecha de retiro es requerida.');
      return;
    }

    if (fechaRetiroDate <= fechaActualDate) {
      this.toastr.error('La fecha de retiro debe ser mayor que la fecha actual.');
      return;
    }

    const pedido = {
      fechaPedido,
      fechaRetiro: this.fechaRetiro,
      articulos: this.carritoService.getCarrito(),
      total: this.totalCarrito,
      estado: 'pendiente',
      usuario: this.userService.getUsuarioAutenticado()
    };

    this.carritoService.guardarPedido(pedido).subscribe(
      response => {
        this.carritoService.limpiarCarrito();
        this.toastr.success('Pedido finalizado con éxito.');
      },
      error => {
        this.toastr.error('Error al finalizar el pedido.');
      }
    );
  }
}
