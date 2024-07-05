import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  private apiUrl = `http://localhost:3000/pedidos`;

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  getPedidosPaginado(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginado?page=${page}&pageSize=${pageSize}`);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  createPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  deletePedido(id: number): Observable<Pedido> {
    return this.http.delete<Pedido>(`${this.apiUrl}/${id}`);
  }

  updatePedido(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${pedido.id}`, pedido);
  }

  getPedidosByUserId(userId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${userId}`);
  }
}
