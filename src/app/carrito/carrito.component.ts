import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from '../services/pedidos.service';
import { Pedido } from '../models/pedido';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  articulosCarrito: any[] = [];
  totalCarrito: number = 0;
  fechaRetiro: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private pedidoService: PedidoService
  ) {
    this.cargarCarrito();
    this.calcularTotalCarrito();
  }

  private cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.articulosCarrito = JSON.parse(carritoGuardado);
    }
  }

  private guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.articulosCarrito));
  }

  private calcularTotalCarrito() {
    this.totalCarrito = this.articulosCarrito.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
  }

  onEliminar(producto: any) {
    const index = this.articulosCarrito.findIndex(item => item.producto.id === producto.id);
    if (index !== -1) {
      this.articulosCarrito.splice(index, 1);
      this.guardarCarrito();
      this.calcularTotalCarrito();
    }
  }

  onAumentarCantidad(articulo: any) {
    const productoExistente = this.articulosCarrito.find(item => item.producto.id === articulo.producto.id);
    if (productoExistente) {
      productoExistente.cantidad += 1;
      this.guardarCarrito();
      this.calcularTotalCarrito();
    }
  }

  onDisminuirCantidad(articulo: any) {
    const productoExistente = this.articulosCarrito.find(item => item.producto.id === articulo.producto.id);
    if (productoExistente && productoExistente.cantidad > 1) {
      productoExistente.cantidad -= 1;
      this.guardarCarrito();
      this.calcularTotalCarrito();
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

    if (!this.authService.isAuthenticated()) {
      this.toastr.error('Usuario no autenticado.');
      return;
    }

    const articulos = this.articulosCarrito.map(articulo => ({
      productoId: articulo.producto.id,
      cantidad: articulo.cantidad
    }));

    const userId = Number(localStorage.getItem('id')); 

    const pedido: Pedido = new Pedido(0,new Date(), fechaRetiroDate,'Pendiente', userId, articulos)

    this.pedidoService.createPedido(pedido).subscribe(
      response => {
        this.limpiarCarrito();
        this.toastr.success('Pedido finalizado con éxito.');
      },
      error => {
        this.toastr.error('Hubo un problema al finalizar el pedido.');
      }
    );
    window.location.reload()
  }

  limpiarCarrito() {
    this.articulosCarrito = [];
    this.guardarCarrito();
    //localStorage.removeItem('carrito');
    this.calcularTotalCarrito();
    
  }
}
