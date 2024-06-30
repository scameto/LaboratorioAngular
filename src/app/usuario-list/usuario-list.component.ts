import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Usuario } from '../models/usuario';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  filterEmail: string = '';
  filterRole: string = '';
  filterTelefono: string = '';
  confirmType: 'deshabilitar' | 'habilitar' | null = null;
  userToChange!: Usuario;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsuariosPaginados(this.currentPage, this.pageSize).subscribe(response => {
      this.usuarios = response.usuarios;
      this.totalItems = response.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.filterUsuarios();
    });
  }

  filterUsuarios(): void {
    this.filteredUsuarios = this.usuarios.filter(usuario => 
      usuario.email.toLowerCase().includes(this.filterEmail.toLowerCase()) &&
      (this.filterRole === '' || usuario.role === this.filterRole) &&
      usuario.telefono.includes(this.filterTelefono)
    );
  }

  onFilterChange(): void {
    this.filterUsuarios();
  }

  cambiarEstadoUsuario(user: Usuario): void {
    this.userToChange = user;
    this.confirmType = user.enabled ? 'deshabilitar' : 'habilitar';
    this.confirmDialog.message = user.enabled 
      ? '¿Está seguro de que desea deshabilitar este usuario?' 
      : '¿Está seguro de que desea habilitar este usuario?';
    this.confirmDialog.show();
  }

  handleConfirm(confirmed: boolean) {
    if (confirmed) {
      if (this.confirmType === 'deshabilitar') {
        this.userService.disableUser(this.userToChange.id).subscribe(
          () => {
            this.userToChange.enabled = false;
            this.loadUsers();
          },
          (error) => {
            console.error('Error al desactivar al usuario:', error);
          }
        );
      } else if (this.confirmType === 'habilitar') {
        this.userService.enableUser(this.userToChange.id).subscribe(
          () => {
            this.userToChange.enabled = true;
            this.loadUsers();
          },
          (error) => {
            console.error('Error al activar al usuario:', error);
          }
        );
      }
    }
    this.confirmType = null;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers(); // Cargar usuarios de la página seleccionada
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  cambiarRolUsuario(user: Usuario, newRole: string): void {
    this.userService.changeUserRole(user.id, newRole).subscribe(
      () => {
        user.role = newRole;
        this.toastr.success('Rol de usuario cambiado correctamente');
      },
      (error) => {
        console.error('Error al cambiar el rol del usuario:', error);
        this.toastr.error('Error al cambiar el rol del usuario');
      }
    );
  }

  onRoleChange(event: Event, user: Usuario): void {
    const selectElement = event.target as HTMLSelectElement;
    const newRole = selectElement.value;
    this.cambiarRolUsuario(user, newRole);
  }
}
