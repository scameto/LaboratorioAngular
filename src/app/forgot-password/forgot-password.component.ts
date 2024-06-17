import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.userService.forgotPassword(this.forgotPasswordForm.value.email)
        .subscribe({
          next: (response) => {
            this.message = 'Se ha enviado un enlace para restablecer la contraseña a tu correo.';
            this.error = null;
          },
          error: (err) => {
            this.error = 'Ocurrió un error. Por favor, inténtalo de nuevo.';
            this.message = null;
          }
        });
    }
  }
}
