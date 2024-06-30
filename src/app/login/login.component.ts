import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  login2(form: any): void {
    if (form.valid) {
      this.userService.login({ email: this.email, password: this.password }).subscribe({
        next: response => {
          localStorage.setItem('id', response.id);
          localStorage.setItem('telefono', response.telefono);
          localStorage.setItem('emailU', response.nombre);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          this.router.navigate(['/productos/listar']);
          this.toastr.success('Inicio de sesión exitoso, bienvenido');
        },
        error: error => {
          if (error.status === 403) {
            this.toastr.error('La cuenta está deshabilitada. Por favor, contacte al administrador.');
          } else {
            this.toastr.error('Credenciales inválidas. Por favor, intente nuevamente.');
          }
        }
      });
    }
  }
}
