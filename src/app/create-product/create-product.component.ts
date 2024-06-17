// src/app/create-product/create-product.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {
  product: Product = new Product(0, '', '', '', 0);
  selectedFile: File | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.product.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.productService.createProduct(this.product).subscribe(() => {
      this.router.navigate(['/productos/listar']);
    });
  }
}
