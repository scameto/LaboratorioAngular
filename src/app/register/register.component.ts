import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
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
        this.toastr.success('Registro exitoso. Redirigiendo a la página de inicio de sesión.');
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 400) {
          this.toastr.error('El correo electrónico ya está en uso.');
        } else {
          this.toastr.error('Error al registrar usuario. Por favor, inténtelo de nuevo.');
        }
      }
    );
  }
}
