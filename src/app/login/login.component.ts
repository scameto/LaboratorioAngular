import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  login2(form: any): void {
    if (form.valid) {
      this.userService.login({ email: this.email, password: this.password }).subscribe({
        next: response => {
          localStorage.setItem('telefono', response.telefono);
          localStorage.setItem('emailU', response.nombre);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/productos/listar']);
        },
        error: error => {
          if (error.status === 403) {
            alert('La cuenta está deshabilitada. Por favor, contacte al administrador.');
          } else {
            alert('Credenciales inválidas. Por favor, intente nuevamente.');
          }
        }
      });
    }
  }
}
