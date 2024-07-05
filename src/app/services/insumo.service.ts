import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insumo } from '../models/insumo';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  private apiUrl = 'http://localhost:3000/insumos';

  constructor(private http: HttpClient) { }

  getInsumos(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(`${this.apiUrl}/`);
  }

  getInsumosActivos(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(`${this.apiUrl}/activos`);
  }

  getInsumosPaginado(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/paginado`, { params });
  }
  
  restoreInsumo(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/restore/${id}`, {});
  }

  deleteInsumo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createInsumo(insumo: Insumo): Observable<Insumo> {
    return this.http.post<Insumo>(this.apiUrl, insumo);
  }

  getInsumoById(id: number): Observable<Insumo> {
    return this.http.get<Insumo>(`${this.apiUrl}/${id}`);
  }

  getInsumosByIds(ids: number[]): Observable<Insumo[]> {
    const params = new HttpParams().set('ids', ids.join(','));
    return this.http.get<Insumo[]>(`${this.apiUrl}/batch`, { params });
  }
}
