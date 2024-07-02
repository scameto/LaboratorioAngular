import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { Insumo } from '../models/insumo';
import { ProductService } from '../services/product.service';
import { InsumoService } from '../services/insumo.service';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  insumos: Insumo[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private insumoService: InsumoService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: [null, Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      productoInsumos: this.fb.array([], [this.minInsumos(1), this.validateInsumos])
    });
  }

  ngOnInit(): void {
    this.insumoService.getInsumosActivos().subscribe(data => {
      this.insumos = data;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type.match('image.*')) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({ imagen: reader.result as string });
        this.productForm.get('imagen')?.setErrors(null);
      };
      reader.readAsDataURL(file);
    } else {
      this.productForm.patchValue({ imagen: null });
      this.productForm.get('imagen')?.setErrors({ incorrect: true });
    }
    this.productForm.get('imagen')?.markAsTouched();
    console.log(this.productForm.value.imagen);
  }

  addInsumo() {
    const insumo = this.fb.group({
      insumoId: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
    this.productInsumos.push(insumo);
  }

  removeInsumo(index: number) {
    this.productInsumos.removeAt(index);
  }

  get productInsumos(): FormArray {
    return this.productForm.get('productoInsumos') as FormArray;
  }

  validateInsumos(control: AbstractControl): { [key: string]: boolean } | null {
    const formArray = control as FormArray;
    for (let group of formArray.controls) {
      if (!group.get('insumoId')?.value) {
        return { invalidInsumo: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = new Product(
        0,
        this.productForm.value.nombre,
        this.productForm.value.descripcion,
        this.productForm.value.imagen,
        this.productForm.value.precio,
        this.productForm.value.productoInsumos
      );

      this.productService.createProduct(newProduct).subscribe(() => {
        this.router.navigate(['/productos/listar']);
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  private minInsumos(min: number) {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const formArray = control as FormArray;
      if (formArray.length < min) {
        return { minInsumos: true };
      }
      return null;
    };
  }
}
