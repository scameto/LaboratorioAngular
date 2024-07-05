import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  private apiUrl = 'http://localhost:3000/pedidos'; // Cambia esta URL por la URL de tu backend

  constructor(private http: HttpClient) {}



  obtenerPedidos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
  actualizarPedido(pedidoActualizado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${pedidoActualizado.id}`, pedidoActualizado);
  }
}
