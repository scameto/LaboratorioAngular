import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `http://localhost:3000/productos`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
   /*  const headers = new HttpHeaders({
      'authorization': token
    });
 */
    return this.http.get(`${this.apiUrl}/`);
  }

  
}
