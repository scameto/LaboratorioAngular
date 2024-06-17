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
      precio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const productId = +(this.route.snapshot.paramMap.get('id') ?? 0);
    if (productId) {
      this.productService.getProductoById(productId).subscribe(product => {
        this.product = product;
        this.updateProductForm.patchValue(product);
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSave(): void {
    if(this.product){
      const updatedProduct: Product = {
        ...this.product,
        ...this.updateProductForm.value,
        imagen: this.product.imagen // Placeholder for now
      };

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          updatedProduct.imagen = reader.result as string;
          this.productService.updateProducto(updatedProduct).subscribe(() => {
            //this.router.navigate(['/']);
          });
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        this.productService.updateProducto(updatedProduct).subscribe(() => {
          //this.router.navigate(['/']);
        });
      }
      this.router.navigate(['/productos/listar']);
    }
    else{
      console.warn('this.product es null o undefined');
    }
  }
}

