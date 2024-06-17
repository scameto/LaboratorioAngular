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

  constructor(private insumoService: InsumoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.insumoService.getInsumos().subscribe((data: Insumo[]) => {
      this.insumos = data;
    });
  }

  onEliminar(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.insumoService.deleteInsumo(id).subscribe(
        () => {
          console.log('Insumo eliminado');
        },
        (error) => {
          console.error('Error al eliminar el insumo', error);
        }
      );
    }
    window.location.reload();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'ADMIN';
  }
}
