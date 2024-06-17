import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InsumoService } from '../services/insumo.service';
import { Insumo } from '../models/insumo';

@Component({
  selector: 'app-create-insumo',
  templateUrl: './create-insumo.component.html',
  styleUrls: ['./create-insumo.component.scss']
})
export class CreateInsumoComponent {
  newInsumo: Insumo = {
    id: 0,
    nombre: '',
    descripcion: '',
    unidad_medida: ''
  };

  constructor(private insumoService: InsumoService, private router: Router) { }

  createInsumo(): void {
    this.insumoService.createInsumo(this.newInsumo).subscribe(() => {
      this.router.navigate(['/insumos/listar']);
    });
  }
}
