import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoSubject = new BehaviorSubject<any[]>([]);
  carrito$ = this.carritoSubject.asObservable();
  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient){};

  agregarAlCarrito(producto: any) {
    const carrito = this.carritoSubject.getValue();
    const productoExistente = carrito.find(item => item.producto.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ producto, cantidad: 1 });
    }

    this.carritoSubject.next(carrito);
    this.actualizarLocalStorage();
  }

  eliminarDelCarrito(producto: any) {
    const carrito = this.carritoSubject.getValue();
    const index = carrito.findIndex(item => item.producto.id === producto.id);

    if (index !== -1) {
      carrito.splice(index, 1);
      this.carritoSubject.next(carrito);
      this.actualizarLocalStorage();
    }
  }

  actualizarCantidad(producto: any, cantidad: number) {
    const carrito = this.carritoSubject.getValue();
    const productoExistente = carrito.find(item => item.producto.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad = cantidad;
      this.carritoSubject.next(carrito);
      this.actualizarLocalStorage();
    }
  }

  limpiarCarrito() {
    this.carritoSubject.next([]);
    this.actualizarLocalStorage();
  }

  getCarrito() {
    return this.carritoSubject.getValue();
  }

  private actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carritoSubject.getValue()));
  }

  guardarPedido(pedido: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, pedido, { headers });
  }
}
