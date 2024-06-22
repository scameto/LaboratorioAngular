import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductoInsumo } from '../models/producto-insumo';
import { ProductService } from '../services/product.service';
import { InsumoService } from '../services/insumo.service';
import { Insumo } from '../models/insumo';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  product: Product;
  insumos: Insumo[] = [];
  selectedFile: File | null = null;

  constructor(
    private productService: ProductService,
    private insumoService: InsumoService,
    private router: Router
  ) {
    this.product = new Product(0, '', '', '', 0, []);
  }

  ngOnInit(): void {
    this.insumoService.getInsumos().subscribe(data => {
      this.insumos = data;
    });
  }

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

  addInsumo() {
    this.product.productoInsumos.push({ insumoId: this.insumos[0].id, cantidad: 0 });
  }

  removeInsumo(index: number) {
    this.product.productoInsumos.splice(index, 1);
  }

  onSubmit() {
    this.productService.createProduct(this.product).subscribe(() => {
      this.router.navigate(['/productos/listar']);
    });
  }
}
