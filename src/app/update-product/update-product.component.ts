import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  updateProductForm: FormGroup;
  selectedFile: File | null = null;
  product: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.updateProductForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const productId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    if (productId) {
      this.productService.getProductoById(productId).subscribe(product => {
        this.product = product;
        this.updateProductForm.patchValue(product);
        if (product.imagen) {
          this.updateProductForm.patchValue({ imagen: null });
          this.updateProductForm.get('imagen')?.setErrors({ incorrect: true });
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type.match('image.*')) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.updateProductForm.patchValue({ imagen: reader.result as string });
          this.updateProductForm.get('imagen')?.setErrors(null);
        };
        reader.readAsDataURL(file);
      } else {
        this.updateProductForm.patchValue({ imagen: null });
        this.updateProductForm.get('imagen')?.setErrors({ incorrect: true });
      }
      this.updateProductForm.get('imagen')?.markAsTouched();
    } else {
      this.updateProductForm.patchValue({ imagen: null });
      this.updateProductForm.get('imagen')?.setErrors({ incorrect: true });
    }
  }

  onSave(): void {
    if(this.updateProductForm.valid && this.product){
      const updatedProduct: Product = {
        ...this.product,
        ...this.updateProductForm.value,
        imagen: this.product.imagen
      };

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          updatedProduct.imagen = reader.result as string;
          this.productService.updateProducto(updatedProduct).subscribe(() => {
            this.router.navigate(['/productos/listar']);
          });
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.productService.updateProducto(updatedProduct).subscribe(() => {
          this.router.navigate(['/productos/listar']);
        });
      }
    } else {
      this.updateProductForm.markAllAsTouched(); // To ensure validation messages are displayed
    }
  }
}
