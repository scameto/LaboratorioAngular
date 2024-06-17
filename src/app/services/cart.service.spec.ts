import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ArticuloCarrito {
  producto: any;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private articulosCarrito: ArticuloCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ArticuloCarrito[]>([]);

  carrito$ = this.carritoSubject.asObservable();

  agregarAlCarrito(producto: any) {
    const articuloExistente = this.articulosCarrito.find(item => item.producto.id === producto.id);
    if (articuloExistente) {
      articuloExistente.cantidad++;
    } else {
      this.articulosCarrito.push({ producto, cantidad: 1 });
    }
    this.carritoSubject.next(this.articulosCarrito);
  }

  eliminarDelCarrito(producto: any) {
    const indiceArticulo = this.articulosCarrito.findIndex(item => item.producto.id === producto.id);
    if (indiceArticulo > -1) {
      this.articulosCarrito.splice(indiceArticulo, 1);
      this.carritoSubject.next(this.articulosCarrito);
    }
  }

  actualizarCantidad(producto: any, cantidad: number) {
    const articuloExistente = this.articulosCarrito.find(item => item.producto.id === producto.id);
    if (articuloExistente) {
      articuloExistente.cantidad = cantidad;
      this.carritoSubject.next(this.articulosCarrito);
    }
  }

  limpiarCarrito() {
    this.articulosCarrito = [];
    this.carritoSubject.next(this.articulosCarrito);
  }
}
