import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  resetLink: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.userService.forgotPassword(this.forgotPasswordForm.value.email)
        .subscribe({
          next: (response) => {
            this.toastr.success('Se ha enviado un enlace para restablecer la contraseña a tu correo.');
            this.resetLink = response.resetLink; //guardo el link para restablecer
          },
          error: (err) => {
            this.toastr.error('Profavor introduzca un correo electronico valido');
          }
        });
    }
  }
}
