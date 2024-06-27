import { Component, OnInit } from '@angular/core';
import { InsumoService } from '../services/insumo.service';
import { Insumo } from '../models/insumo';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-insumo-list',
  templateUrl: './insumo-list.component.html',
  styleUrls: ['./insumo-list.component.scss']
})
export class InsumoListComponent implements OnInit {
  insumos: Insumo[] = [];
  filteredInsumos: Insumo[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  filterNombre: string = '';

  constructor(private insumoService: InsumoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadInsumos();
  }

  loadInsumos(): void {
    this.insumoService.getInsumosPaginado(this.currentPage, this.pageSize).subscribe(response => {
      this.insumos = response.insumos;
      this.totalItems = response.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.filterInsumos();
    });
  }

  filterInsumos(): void {
    this.filteredInsumos = this.insumos.filter(insumo =>
      insumo.nombre.toLowerCase().includes(this.filterNombre.toLowerCase())
    );
  }

  onFilterChange(): void {
    this.filterInsumos();
  }

  onEliminar(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este insumo?')) {
      this.insumoService.deleteInsumo(id).subscribe(
        () => {
          console.log('Insumo eliminado');
          this.loadInsumos(); // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el insumo', error);
        }
      );
    }
  }

  onRestaurar(id: number): void {
    if (confirm('¿Está seguro de que desea restaurar este insumo?')) {
      this.insumoService.restoreInsumo(id).subscribe(
        () => {
          console.log('Insumo restaurado');
          this.loadInsumos(); // Recargar la lista después de restaurar
        },
        (error) => {
          console.error('Error al restaurar el insumo', error);
        }
      );
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadInsumos(); // Cargar insumos de la página seleccionada
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
