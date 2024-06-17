import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `http://localhost:3000/usuarios`;

  constructor(private http: HttpClient) { }

  // Registro de nuevo usuario
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Inicio de sesión de usuario
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Cambio de contraseña de usuario
  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, data);
  }

  // Recuperación de contraseña de usuario
  forgotPassword(email: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, {email});
  }

  // Habilitar usuario
  enableUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/enable-user`, { id: userId });
  }

  // Deshabilitar usuario
  disableUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/disable-user`, { id: userId });
  }
  
  // Obtener perfil del usuario actual
  getUserProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }
}
