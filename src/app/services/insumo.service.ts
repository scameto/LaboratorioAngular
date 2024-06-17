import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insumo } from '../models/insumo';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {
  private apiUrl = 'http://localhost:3000/insumos'; // Ajustar según la URL de tu API

  constructor(private http: HttpClient) { }

  getInsumos(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(`${this.apiUrl}/`);
  }

  deleteInsumo(id: number): Observable<Insumo> {
    return this.http.delete<Insumo>(`${this.apiUrl}/${id}`);
  }

  createInsumo(insumo: Insumo): Observable<Insumo> {
    return this.http.post<Insumo>(this.apiUrl, insumo);
  }

}
