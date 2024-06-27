import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-user-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsuariosPaginados(this.currentPage, this.pageSize).subscribe(response => {
      this.usuarios = response.usuarios;
      this.totalItems = response.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    });
  }

  cambiarEstadoUsuario(user: Usuario): void {
    if (user.enabled) {
      this.userService.disableUser(user.id).subscribe(
        () => {
          user.enabled = false;
          this.loadUsers(); // Recargar la lista después de cambiar el estado
        },
        (error) => {
          console.error('Error al desactivar al usuario:', error);
        }
      );
    } else {
      this.userService.enableUser(user.id).subscribe(
        () => {
          user.enabled = true;
          this.loadUsers(); // Recargar la lista después de cambiar el estado
        },
        (error) => {
          console.error('Error al activar al usuario:', error);
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
}
