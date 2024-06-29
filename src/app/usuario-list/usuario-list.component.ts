import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-user-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  filteredUsuarios: Usuario[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  filterEmail: string = '';
  filterRole: string = '';
  filterTelefono: string = '';

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
    if (user.enabled) {
      this.userService.disableUser(user.id).subscribe(
        () => {
          user.enabled = false;
          this.toastr.success('Usuario deshabilitado correctamente');
          this.loadUsers(); // Recargar la lista después de cambiar el estado
        },
        (error) => {
          console.error('Error al desactivar al usuario:', error);
          this.toastr.error('Error al deshabilitar el usuario');
        }
      );
    } else {
      this.userService.enableUser(user.id).subscribe(
        () => {
          user.enabled = true;
          this.toastr.success('Usuario habilitado correctamente');
          this.loadUsers(); // Recargar la lista después de cambiar el estado
        },
        (error) => {
          console.error('Error al activar al usuario:', error);
          this.toastr.error('Error al habilitar el usuario');
        }
      );
    }
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