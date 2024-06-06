import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private apiUrl = `http://localhost:3000/cuenta`;

  constructor(private http:HttpClient) { }

/*   getUsuario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  } */
}
