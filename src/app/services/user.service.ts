import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usuario: Usuario | null = null; 

  private apiUrl = `http://localhost:3000/usuarios`;

  constructor(private http: HttpClient, private router: Router) { }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  getUsuariosPaginados(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginado?page=${page}&pageSize=${pageSize}`);
  }

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

  changeUserRole(id: number, newRole: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/role`, { id, newRole });
  }
  
  //resetear password
  resetPassword(data: { id: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }


  getUser(){
    const email = localStorage.getItem('emailU');
    const telefono = localStorage.getItem('telefono');
    const role = localStorage.getItem('role');

  }
  // Obtener usuario autenticado
  getUsuarioAutenticado(): Usuario | null {
    const email = localStorage.getItem('emailU');
    const telefono = localStorage.getItem('telefono');
    const role = localStorage.getItem('role');

    if (email && telefono && role) {
      return { email, telefono, role } as Usuario;
    }
    return null;
  }


  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('emailU');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('emailU');
    localStorage.removeItem('telefono');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}
