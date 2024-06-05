// src/app/product-card/product-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

  onPedir(): void {
    // Aquí puedes manejar la lógica cuando se hace clic en el botón "Pedir"
    console.log(`Pedido realizado para el producto: ${this.product.nombre}`);
  }

}
