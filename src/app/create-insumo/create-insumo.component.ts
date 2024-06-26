import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsumoService } from '../services/insumo.service';
import { Insumo } from '../models/insumo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-insumo',
  templateUrl: './create-insumo.component.html',
  styleUrls: ['./create-insumo.component.scss']
})
export class CreateInsumoComponent implements OnInit {
  insumoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private insumoService: InsumoService,
    private router: Router
  ) {
    this.insumoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      unidad_medida: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  createInsumo(): void {
    if (this.insumoForm.valid) {
      const newInsumo: Insumo = this.insumoForm.value;
      newInsumo.id = 0;
      newInsumo.isDeleted = false;
      this.insumoService.createInsumo(newInsumo).subscribe(() => {
        this.router.navigate(['/insumos/listar']);
      });
    } else {
      this.insumoForm.markAllAsTouched();
    }
  }
}
