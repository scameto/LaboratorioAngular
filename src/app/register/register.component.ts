import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  message: string | null = null;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.register(this.registerForm.value).subscribe(
      data => {
        console.log('User registered successfully!', data);
        this.message = 'Registro exitoso. Redirigiendo a la página de inicio de sesión.';
        this.error = null;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error => {
        console.error('Error registering user', error);
        this.error = 'Error al registrar usuario. Por favor, inténtelo de nuevo.';
        this.message = null;
      }
    );
  }
}
