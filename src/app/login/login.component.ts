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
      console.log('Login form is valid');
      this.userService.login({ email: this.email, password: this.password }).subscribe({
        next: response => {
          console.log('Response from server:', response);
          localStorage.setItem('telefono', response.telefono);
          localStorage.setItem('emailU', response.nombre);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
        
          console.log('Login successful', response);
          this.router.navigate(['/listar']);
        },
        error: error => {
          console.error('Login failed', error);
          alert('Credenciales inválidas. Por favor, intente nuevamente.');
        }
      });
    } else {
      console.log('Login form is invalid');
    }
  }

}
