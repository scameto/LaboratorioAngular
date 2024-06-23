import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `http://localhost:3000/productos`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  getProductosPaginado(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginado?page=${page}&pageSize=${pageSize}`);
  }

  getProductosActivosPaginado(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/activos/paginado?page=${page}&pageSize=${pageSize}`);
  }

  getProductoById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }

  activateProducto(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/activar/${id}`, {});
  }

  updateProducto(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
}
