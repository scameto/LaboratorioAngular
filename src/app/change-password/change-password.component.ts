import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service'; // Asegúrate de que la ruta sea correcta

@Component({
  standalone: true,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.changePasswordForm = this.fb.group({
      id: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const data = {
        id: this.changePasswordForm.value.id,
        oldPassword: this.changePasswordForm.value.oldPassword,
        newPassword: this.changePasswordForm.value.newPassword
      };
      this.userService.changePassword(data).subscribe({
        next: (response) => {
          this.message = 'Contraseña actualizada correctamente.';
          this.error = null;
        },
        error: (err) => {
          this.error = 'Ocurrió un error. Por favor, inténtalo de nuevo.';
          this.message = null;
          console.error(err); // Log para ver el error
        }
      });
    }
  }
}
