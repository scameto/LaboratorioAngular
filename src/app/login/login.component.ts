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

  login(): void {
    this.userService.login({ email: this.email, password: this.password }).subscribe(response => {
      localStorage.setItem('token', response.token);
      console.log('Login successful', response);
      // Redirige al usuario a la página principal o a una página específica
      this.router.navigate(['/products']);
    }, error => {
      console.error('Login failed', error);
      alert('Credenciales inválidas. Por favor, intente nuevamente.');
    });
  }
  login2(form: any): void {
    if (form.valid) {
      console.log('Login form is valid');
      this.userService.login({ email: this.email, password: this.password }).subscribe({
        next: response => {
          console.log('Response from server:', response);
          localStorage.setItem('token', response.token);
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
